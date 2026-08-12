import { useEffect, useRef, useState, useCallback } from "react";

interface VideoPlayerProps {
  src: string;
  poster: string;
  featured?: boolean;
}

export default function VideoPlayer({ src, poster, featured = false }: VideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const hideControlsTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [hovered, setHovered] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(false);

  /* ── Fullscreen state sync ── */
  useEffect(() => {
    const onFsChange = () => {
      const fs =
        !!document.fullscreenElement ||
        !!(document as unknown as { webkitFullscreenElement: Element | null }).webkitFullscreenElement;
      setIsFullscreen(fs);
    };
    document.addEventListener("fullscreenchange", onFsChange);
    document.addEventListener("webkitfullscreenchange", onFsChange);

    const video = videoRef.current;
    if (video) {
      const onWebkitFs = () => setIsFullscreen(true);
      const onWebkitFsEnd = () => setIsFullscreen(false);
      video.addEventListener("webkitbeginfullscreen", onWebkitFs);
      video.addEventListener("webkitendfullscreen", onWebkitFsEnd);
      return () => {
        document.removeEventListener("fullscreenchange", onFsChange);
        document.removeEventListener("webkitfullscreenchange", onFsChange);
        video.removeEventListener("webkitbeginfullscreen", onWebkitFs);
        video.removeEventListener("webkitendfullscreen", onWebkitFsEnd);
      };
    }
    return () => {
      document.removeEventListener("fullscreenchange", onFsChange);
      document.removeEventListener("webkitfullscreenchange", onFsChange);
    };
  }, []);

  /* ── Playback events ── */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      setProgress(video.duration ? (video.currentTime / video.duration) * 100 : 0);
    };
    const onLoadedMetadata = () => setDuration(video.duration);
    const onEnded = () => { setPlaying(false); setStarted(false); };

    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("loadedmetadata", onLoadedMetadata);
    video.addEventListener("ended", onEnded);
    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      video.removeEventListener("ended", onEnded);
    };
  }, []);

  /* ── Auto-hide controls in fullscreen after 3s of inactivity ── */
  const resetHideTimer = useCallback(() => {
    setShowControls(true);
    if (hideControlsTimer.current) clearTimeout(hideControlsTimer.current);
    hideControlsTimer.current = setTimeout(() => setShowControls(false), 3000);
  }, []);

  useEffect(() => {
    if (!isFullscreen) {
      if (hideControlsTimer.current) clearTimeout(hideControlsTimer.current);
      setShowControls(false);
    }
  }, [isFullscreen]);

  /* ── Actions ── */
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setPlaying(true);
      setStarted(true);
    } else {
      video.pause();
      setPlaying(false);
    }
    if (isFullscreen) resetHideTimer();
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const bar = progressRef.current;
    const video = videoRef.current;
    if (!bar || !video) return;
    const rect = bar.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    video.currentTime = ratio * video.duration;
  };

  const handleSpeedToggle = () => {
    const video = videoRef.current;
    if (!video) return;
    const newSpeed = speed === 1 ? 1.25 : 1;
    video.playbackRate = newSpeed;
    setSpeed(newSpeed);
  };

  const handleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    if (isFullscreen) {
      if (document.exitFullscreen) document.exitFullscreen();
      else if ((document as unknown as { webkitExitFullscreen?: () => void }).webkitExitFullscreen)
        (document as unknown as { webkitExitFullscreen: () => void }).webkitExitFullscreen();
    } else {
      if (container.requestFullscreen) {
        container.requestFullscreen();
      } else if ((container as unknown as { webkitRequestFullscreen?: () => void }).webkitRequestFullscreen) {
        (container as unknown as { webkitRequestFullscreen: () => void }).webkitRequestFullscreen();
      } else if ((video as unknown as { webkitEnterFullscreen?: () => void }).webkitEnterFullscreen) {
        /* iOS Safari fallback — opens native player */
        (video as unknown as { webkitEnterFullscreen: () => void }).webkitEnterFullscreen();
      }
    }
  };

  /* ── Touch: tap to show controls in fullscreen ── */
  const handleContainerTouch = () => {
    if (isFullscreen) resetHideTimer();
  };

  const fmt = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const borderColor = featured ? "rgba(59,130,246,0.7)" : "rgba(59,130,246,0.3)";
  const glowColor = featured
    ? "0 0 40px rgba(59,130,246,0.4), 0 0 80px rgba(59,130,246,0.15)"
    : "0 0 24px rgba(59,130,246,0.2), 0 0 50px rgba(59,130,246,0.08)";

  /* Controls visibility logic:
     - Normal mode: visible when hovered OR video is paused/not started
     - Fullscreen mode: visible when showControls (resets on activity) OR paused */
  const controlsVisible = isFullscreen
    ? (showControls || !playing)
    : (hovered || !playing);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        borderRadius: isFullscreen ? 0 : 16,
        overflow: "hidden",
        border: isFullscreen ? "none" : `1.5px solid ${borderColor}`,
        boxShadow: isFullscreen ? "none" : glowColor,
        background: "#000",
        aspectRatio: isFullscreen ? undefined : "16/9",
        cursor: "pointer",
        ...(isFullscreen ? { height: "100%", display: "flex", alignItems: "center", justifyContent: "center" } : {}),
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={() => { if (isFullscreen) resetHideTimer(); }}
      onTouchStart={handleContainerTouch}
      onClick={togglePlay}
    >
      {/* Video element */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        preload="metadata"
        playsInline
        style={{
          width: "100%",
          height: isFullscreen ? "100%" : "100%",
          display: "block",
          objectFit: isFullscreen ? "contain" : "cover",
        }}
        onClick={(e) => e.stopPropagation()}
      />

      {/* Big play button overlay — shown before first play or when paused */}
      {(!started || !playing) && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: started ? "rgba(0,0,0,0.35)" : "rgba(0,0,0,0.15)",
            transition: "background 0.2s ease",
          }}
        >
          <div style={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            background: "rgba(59,130,246,0.9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 32px rgba(59,130,246,0.7), 0 0 60px rgba(59,130,246,0.3)",
            transform: hovered ? "scale(1.1)" : "scale(1)",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
          }}>
            <svg width="28" height="28" fill="#fff" viewBox="0 0 24 24" style={{ marginLeft: 4 }}>
              <polygon points="5,3 19,12 5,21" />
            </svg>
          </div>
        </div>
      )}

      {/* Controls bar — shown when started */}
      {started && (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: isFullscreen ? "20px 24px 24px" : "12px 16px 14px",
            background: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, transparent 100%)",
            display: "flex",
            flexDirection: "column",
            gap: isFullscreen ? 12 : 8,
            opacity: controlsVisible ? 1 : 0,
            transition: "opacity 0.3s ease",
            pointerEvents: controlsVisible ? "auto" : "none",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Progress bar */}
          <div
            ref={progressRef}
            onClick={handleProgressClick}
            style={{
              width: "100%",
              height: isFullscreen ? 5 : 4,
              background: "rgba(255,255,255,0.2)",
              borderRadius: 3,
              cursor: "pointer",
              position: "relative",
            }}
          >
            <div style={{
              width: `${progress}%`,
              height: "100%",
              background: "#3b82f6",
              borderRadius: 3,
              boxShadow: "0 0 8px rgba(59,130,246,0.8)",
              transition: "width 0.1s linear",
            }} />
            <div style={{
              position: "absolute",
              top: "50%",
              left: `${progress}%`,
              transform: "translate(-50%, -50%)",
              width: isFullscreen ? 14 : 12,
              height: isFullscreen ? 14 : 12,
              borderRadius: "50%",
              background: "#fff",
              boxShadow: "0 0 6px rgba(59,130,246,0.8)",
            }} />
          </div>

          {/* Bottom row: play/pause + time + speed + fullscreen */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {/* Play/Pause */}
            <button
              onClick={(e) => { e.stopPropagation(); togglePlay(); }}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 4,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                flexShrink: 0,
              }}
            >
              {playing ? (
                <svg width={isFullscreen ? 22 : 18} height={isFullscreen ? 22 : 18} fill="#fff" viewBox="0 0 24 24">
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                <svg width={isFullscreen ? 22 : 18} height={isFullscreen ? 22 : 18} fill="#fff" viewBox="0 0 24 24">
                  <polygon points="5,3 19,12 5,21" />
                </svg>
              )}
            </button>

            {/* Time */}
            <span style={{
              fontSize: isFullscreen ? 14 : 12,
              color: "rgba(255,255,255,0.8)",
              fontVariantNumeric: "tabular-nums",
              flexShrink: 0,
            }}>
              {fmt(currentTime)} / {fmt(duration)}
            </span>

            <div style={{ flex: 1 }} />

            {/* Speed */}
            <button
              onClick={(e) => { e.stopPropagation(); handleSpeedToggle(); }}
              style={{
                background: speed === 1.25 ? "rgba(59,130,246,0.3)" : "rgba(255,255,255,0.12)",
                border: speed === 1.25 ? "1px solid rgba(59,130,246,0.6)" : "1px solid rgba(255,255,255,0.2)",
                borderRadius: 6,
                color: "#fff",
                fontSize: isFullscreen ? 13 : 12,
                fontWeight: 600,
                padding: isFullscreen ? "4px 10px" : "3px 8px",
                cursor: "pointer",
                transition: "background 0.2s, border 0.2s",
                fontFamily: "inherit",
                flexShrink: 0,
              }}
            >
              {speed === 1 ? "1x" : "1.25x"}
            </button>

            {/* Fullscreen toggle */}
            <button
              onClick={handleFullscreen}
              title={isFullscreen ? "Salir de pantalla completa" : "Pantalla completa"}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 4,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                flexShrink: 0,
                opacity: 0.85,
              }}
            >
              {isFullscreen ? (
                /* Compress icon */
                <svg width={isFullscreen ? 20 : 17} height={isFullscreen ? 20 : 17} fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <polyline points="4 14 10 14 10 20" />
                  <polyline points="20 10 14 10 14 4" />
                  <line x1="10" y1="14" x2="3" y2="21" />
                  <line x1="21" y1="3" x2="14" y2="10" />
                </svg>
              ) : (
                /* Expand icon */
                <svg width="17" height="17" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <polyline points="15 3 21 3 21 9" />
                  <polyline points="9 21 3 21 3 15" />
                  <line x1="21" y1="3" x2="14" y2="10" />
                  <line x1="3" y1="21" x2="10" y2="14" />
                </svg>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

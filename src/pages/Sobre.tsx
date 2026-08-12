import { useEffect, useRef, useState } from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

/* ============================================================
   Canvas Particles — hero sections
   ============================================================ */
function ParticleCanvas({ isMobile }: { isMobile: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const count = isMobile ? 20 : 40;
    const colors = ["#ffffff", "#93c5fd", "#60a5fa"];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1 + 1,
      speed: Math.random() * 0.5 + 0.3,
      opacity: Math.random() * 0.2 + 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
      drift: (Math.random() - 0.5) * 0.3,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        p.y -= p.speed;
        p.x += p.drift;
        if (p.y < -4) { p.y = canvas.height + 4; p.x = Math.random() * canvas.width; }
        if (p.x < -4 || p.x > canvas.width + 4) { p.x = Math.random() * canvas.width; }
      }
      ctx.globalAlpha = 1;
      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animRef.current);
    };
  }, [isMobile]);

  return (
    <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }} />
  );
}

/* ============================================================
   Hero Sobre
   ============================================================ */
function HeroSobre() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section style={{
      minHeight: "100vh",
      background: "#0a0a0a",
      paddingTop: 68,
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Aurora bg */}
      <div className="aurora-section" style={{ position: "absolute", inset: 0, opacity: 0.4, zIndex: 0 }} />

      {/* Particles */}
      <ParticleCanvas isMobile={isMobile} />

      {/* Ambient glow top-right reforzado */}
      <div style={{
        position: "absolute",
        top: -100,
        right: -80,
        width: 500,
        height: 500,
        background: "radial-gradient(circle, rgba(59,130,246,0.20) 0%, transparent 70%)",
        filter: "blur(80px)",
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: 0,
      }} />

      <div style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: isMobile ? "32px 20px 60px" : "60px 24px",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: "center",
        gap: isMobile ? 32 : 64,
        minHeight: "calc(100vh - 68px)",
        position: "relative",
        zIndex: 1,
      }}>
        {/* Photo first on mobile */}
        {isMobile && (
          <div style={{ position: "relative", display: "flex", justifyContent: "center", width: "100%" }} className="hero-animate-media">
            <div style={{
              position: "absolute",
              width: "70%", height: "70%",
              top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
              background: "rgba(59,130,246,0.25)",
              filter: "blur(60px)",
              borderRadius: "50%",
              zIndex: 0,
            }} />
            <img
              src="/foto-sobre-nueva.png"
              alt="Dueño de Núcleo Web"
              style={{ width: 200, objectFit: "cover", borderRadius: 16, position: "relative", zIndex: 1 }}
            />
          </div>
        )}

        {/* Left - Text */}
        <div style={{ flex: isMobile ? "none" : "0 0 55%", maxWidth: isMobile ? "100%" : "55%", textAlign: isMobile ? "center" : "left" }}>
          <div className="hero-animate-badge" style={{ marginBottom: 20, display: "flex", justifyContent: isMobile ? "center" : "flex-start" }}>
            <span className="badge-blue">Sobre Núcleo Web</span>
          </div>

          <h1 className="hero-animate-title" style={{
            fontSize: isMobile ? "clamp(28px, 8vw, 40px)" : "clamp(32px, 4vw, 50px)",
            fontWeight: 800,
            color: "#fff",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            marginBottom: 20,
            textShadow: "0 0 40px rgba(59,130,246,0.3), 0 0 80px rgba(59,130,246,0.15)",
          }}>
            Diseño web con<br />
            <span className="gradient-text-blue">propósito real</span>
          </h1>

          <p className="hero-animate-desc" style={{
            fontSize: 16,
            color: "#a1a1aa",
            lineHeight: 1.7,
            marginBottom: 32,
          }}>
            Acá podés conocer quién está detrás de Núcleo Web, por qué se creó y cuál es la visión que mueve cada proyecto.
          </p>

          <div className="hero-animate-btn" style={{ display: "flex", justifyContent: isMobile ? "center" : "flex-start" }}>
            <a href="#contacto" className="btn-primary">Agendá una llamada</a>
          </div>
        </div>

        {/* Right - Photo (Desktop) */}
        {!isMobile && (
          <div style={{
            flex: "0 0 45%",
            maxWidth: "45%",
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }} className="hero-animate-media">
            {/* Glow behind */}
            <div style={{
              position: "absolute",
              width: "80%", height: "80%",
              background: "rgba(59,130,246,0.22)",
              filter: "blur(80px)",
              borderRadius: "50%",
              zIndex: 0,
            }} />
            {/* Trapezoid container */}
            <div style={{
              position: "relative",
              zIndex: 1,
              clipPath: "polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%)",
              width: "100%",
              maxWidth: 380,
            }}>
              <img
                src="/foto-sobre-nueva.png"
                alt="Dueño de Núcleo Web"
                style={{
                  width: "100%",
                  height: 480,
                  objectFit: "cover",
                  objectPosition: "top center",
                  display: "block",
                }}
              />
              {/* Overlay gradient at edges */}
              <div style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(135deg, rgba(59,130,246,0.12) 0%, transparent 50%, rgba(0,0,0,0.2) 100%)",
              }} />
            </div>
          </div>
        )}
      </div>

      {/* Horizontal light line to next section */}
      <div style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 1,
        background: "linear-gradient(90deg, transparent 0%, rgba(59,130,246,0.25) 30%, rgba(147,197,253,0.4) 50%, rgba(59,130,246,0.25) 70%, transparent 100%)",
        pointerEvents: "none",
        zIndex: 2,
      }} />
    </section>
  );
}

/* ============================================================
   Sobre Mí Section
   ============================================================ */
function SobreMiSection() {
  const [isMobile, setIsMobile] = useState(false);
  const lineRef = useRef<HTMLDivElement>(null);
  const [lineVisible, setLineVisible] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const el = lineRef.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) { setLineVisible(true); obs.disconnect(); }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const stats = [
    { num: "+20", label: "páginas realizadas" },
    { num: "+1", label: "año en diseño web" },
    { num: "+200", label: "h estudiando estrategia web" },
  ];

  return (
    <section style={{
      padding: isMobile ? "60px 20px" : "100px 24px",
      background: "#060608",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Aurora sutil */}
      <div className="aurora-section" style={{ position: "absolute", inset: 0, opacity: 0.25, zIndex: 0 }} />
      {/* Ambient right bottom */}
      <div style={{
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 400,
        height: 400,
        background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)",
        filter: "blur(60px)",
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: 0,
      }} />
      <div style={{
        maxWidth: 1200,
        margin: "0 auto",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        gap: isMobile ? 40 : 64,
        alignItems: isMobile ? "stretch" : "center",
        position: "relative",
        zIndex: 1,
      }}>
        {/* Left - Text */}
        <div style={{ flex: isMobile ? "none" : "0 0 55%", maxWidth: isMobile ? "100%" : "55%" }}>
          <span className="section-label animate-on-scroll">Mi historia</span>
          <h2 className="animate-on-scroll" style={{
            fontSize: "clamp(24px, 3vw, 36px)",
            fontWeight: 700,
            color: "#fff",
            marginBottom: 24,
            lineHeight: 1.2,
          }}>
            ¿Quién está detrás?
          </h2>

          <p className="animate-on-scroll animate-para delay-1" style={{
            fontSize: 15,
            color: "#a1a1aa",
            lineHeight: 1.8,
            marginBottom: 28,
          }}>Tengo 18 años y desde chico me obsesionó la idea de construir algo propio. A los 14 un libro me cambió la forma de ver el dinero y los negocios, y desde entonces no paré. A los 17 dejé la UTU porque entendí que lo que quería no se conseguía siguiendo un camino tradicional, y me lancé. Vendí tazas automezcladoras, artículos varios e intenté con todo. Nada funcionó hasta que llegué al diseño web.
          Mandé más de 2000 mensajes sin vender nada, pero en vez de cambiar de rubro me pregunté por qué no estaba funcionando. Decidí meterle foco real: aprender la plataforma, entender la estrategia y dominar el diseño. De a poco llegaron los primeros clientes, y hoy sigo creciendo con cada proyecto.</p>

          {/* Animated horizontal line */}
          <div
            ref={lineRef}
            style={{
              height: 1,
              background: "rgba(59,130,246,0.3)",
              marginBottom: 28,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {lineVisible && (
              <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: 60,
                height: "100%",
                background: "linear-gradient(90deg, transparent, #93c5fd, transparent)",
                animation: "lightSweep 1.5s ease-out forwards",
              }} />
            )}
          </div>

          {/* Stats row — 3 stats */}
          <div className="animate-on-scroll delay-2" style={{
            display: "flex",
            gap: isMobile ? 8 : 16,
            marginBottom: 32,
          }}>
            {stats.map((s, i) => (
              <div key={i} style={{
                flex: 1,
                textAlign: "center",
                padding: isMobile ? "16px 10px" : "20px 16px",
                background: "rgba(59,130,246,0.05)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(59,130,246,0.15)",
                borderRadius: 12,
                position: "relative",
                overflow: "hidden",
              }}>
                {i > 0 && (
                  <div style={{
                    position: "absolute",
                    top: "20%",
                    left: 0,
                    width: 1,
                    height: "60%",
                    background: "rgba(59,130,246,0.2)",
                  }} />
                )}
                <div className="gradient-text-stat" style={{ fontSize: isMobile ? 24 : 36, fontWeight: 800, lineHeight: 1, marginBottom: 4 }}>{s.num}</div>
                <div style={{ fontSize: isMobile ? 11 : 12, color: "#a1a1aa", letterSpacing: "0.04em" }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Quote glassmorphism — left border 3px azul */}
          <div className="animate-on-scroll delay-2" style={{
            background: "rgba(255,255,255,0.03)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderLeft: "3px solid #3b82f6",
            borderRadius: 8,
            padding: "16px 20px",
            boxShadow: "0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
            position: "relative",
          }}>
            <p style={{
              fontSize: 15,
              color: "#d4d4d8",
              fontStyle: "italic",
              lineHeight: 1.7,
            }}>
              "Mi trabajo no es venderte cualquier web, sino ayudarte a construir la que realmente tenga sentido para tu negocio."
            </p>
          </div>
        </div>

        {/* Right - Photo working */}
        <div style={{ flex: isMobile ? "none" : "0 0 45%", maxWidth: isMobile ? "100%" : "45%", position: "relative" }}>
          {/* Ambient glow behind photo */}
          <div style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            height: "80%",
            background: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)",
            filter: "blur(40px)",
            borderRadius: "50%",
            pointerEvents: "none",
            zIndex: 0,
          }} />
          <div className="animate-on-scroll animate-img delay-1" style={{ position: "relative", zIndex: 1 }}>
            <img
              src="/foto-trabajando-nueva.png"
              alt="Trabajando en diseño web"
              style={{
                width: "100%",
                borderRadius: 16,
                objectFit: "cover",
                display: "block",
                boxShadow: "0 0 40px rgba(59,130,246,0.15), 0 20px 60px rgba(0,0,0,0.5)",
              }}
            />
            <div style={{
              position: "absolute",
              inset: 0,
              borderRadius: 16,
              border: "1px solid rgba(59,130,246,0.15)",
              pointerEvents: "none",
            }} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Historia Section
   ============================================================ */
function HistoriaSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section style={{
      padding: isMobile ? "60px 20px" : "100px 24px",
      background: "#0a0a0a",
      position: "relative",
      overflow: "hidden",
    }} id="contacto">
      {/* Ambient glow bottom-left */}
      <div style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        width: 400,
        height: 400,
        background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)",
        filter: "blur(60px)",
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: 0,
      }} />
      <div style={{
        maxWidth: 1200,
        margin: "0 auto",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        gap: isMobile ? 32 : 80,
        alignItems: isMobile ? "stretch" : "center",
        position: "relative",
        zIndex: 1,
      }}>
        {/* LEFT — Text column */}
        <div style={{ flex: isMobile ? "none" : "0 0 55%", maxWidth: isMobile ? "100%" : "55%", position: "relative" }}>
          {!isMobile && (
            <div style={{
              position: "absolute",
              left: -28,
              top: 0,
              bottom: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
              <div style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: "#3b82f6",
                boxShadow: "0 0 16px rgba(59,130,246,0.8)",
                flexShrink: 0,
                marginTop: 8,
              }} />
              <div style={{
                width: 2,
                flex: 1,
                background: "linear-gradient(to bottom, #3b82f6 0%, rgba(59,130,246,0.2) 100%)",
                marginTop: 6,
              }} />
            </div>
          )}

          {/* Logo */}
          <div className="animate-on-scroll" style={{ marginBottom: 12 }}>
            <img src="/logo-sin-fondo.png" alt="Núcleo Web" style={{ height: 40, objectFit: "contain", opacity: 0.7 }} />
          </div>

          {/* Date */}
          <div className="animate-on-scroll" style={{ marginBottom: 8 }}>
            <span className="gradient-text-date" style={{ fontSize: 28, fontWeight: 800, lineHeight: 1, display: "block" }}>
              01 / 10 / 2025
            </span>
          </div>

          <span className="section-label animate-on-scroll" style={{ textAlign: "left", display: "block" }}>El negocio</span>

          <h2 className="animate-on-scroll" style={{
            fontSize: "clamp(24px, 3vw, 36px)",
            fontWeight: 700,
            color: "#fff",
            marginBottom: 28,
            textAlign: "left",
            lineHeight: 1.2,
          }}>
            Cómo nació Núcleo Web
          </h2>

          {/* Mobile only: image appears here, between title and paragraph */}
          {isMobile && (
            <div style={{ marginBottom: 28, position: "relative" }}>
              <img
                src="/imagen-historia.webp"
                alt="La historia de Núcleo Web"
                style={{
                  width: "100%",
                  height: 220,
                  borderRadius: 16,
                  objectFit: "cover",
                  objectPosition: "center",
                  display: "block",
                  boxShadow: "0 0 30px rgba(59,130,246,0.2), 0 10px 40px rgba(0,0,0,0.5)",
                }}
              />
              <div style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(10,10,10,0.3), transparent)",
                borderRadius: 16,
                pointerEvents: "none",
              }} />
              <div style={{ position: "absolute", inset: 0, borderRadius: 16, border: "1px solid rgba(59,130,246,0.2)", pointerEvents: "none" }} />
            </div>
          )}

          <p className="animate-on-scroll animate-para delay-1" style={{
            fontSize: 15,
            color: "#a1a1aa",
            lineHeight: 1.8,
            marginBottom: 32,
          }}>Núcleo Web nació el 1 de octubre de 2025, aunque el camino empezó unos meses antes. El negocio arrancó con un socio, más de 2000 mensajes enviados y cero ventas. Después de separarnos, estuve dos meses formándome en serio: aprendí Framer, descubrí el desarrollo con inteligencia artificial y herramientas como Replit, y empecé a enfocarme en estrategia, estructura, diseño y marca. Núcleo Web se creó porque el diseño web me llamó desde el primer momento. Venía del diseño gráfico y, cuando vi las animaciones, los efectos y la forma de comunicar una marca en una web, supe que era lo mío. El propósito hoy es claro: crear páginas web que realmente le sirvan al negocio, con diseño que se destaque y una estrategia que convierta.</p>

          <div className="animate-on-scroll delay-2" style={{ textAlign: "left" }}>
            <a href="https://wa.link/z137l0" target="_blank" rel="noreferrer" className="btn-primary">
              Hablemos de tu web
            </a>
          </div>
        </div>

        {/* RIGHT — Desktop image only */}
        {!isMobile && (
          <div style={{ flex: "0 0 40%", maxWidth: "40%", position: "relative" }}>
            {/* Glow */}
            <div style={{
              position: "absolute",
              inset: -30,
              background: "radial-gradient(circle at center, rgba(59,130,246,0.15) 0%, transparent 70%)",
              filter: "blur(30px)",
              borderRadius: "50%",
              pointerEvents: "none",
              zIndex: 0,
            }} />
            <div className="animate-on-scroll animate-img delay-1" style={{ position: "relative", zIndex: 1 }}>
              <img
                src="/imagen-historia.webp"
                alt="La historia de Núcleo Web"
                style={{
                  width: "100%",
                  borderRadius: 20,
                  objectFit: "cover",
                  display: "block",
                  boxShadow: "0 0 40px rgba(59,130,246,0.2), 0 20px 60px rgba(0,0,0,0.5)",
                }}
              />
              <div style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(10,10,10,0.3), transparent 60%)",
                borderRadius: 20,
                pointerEvents: "none",
              }} />
              <div style={{
                position: "absolute",
                inset: 0,
                borderRadius: 20,
                border: "1px solid rgba(59,130,246,0.2)",
                boxShadow: "0 0 30px rgba(59,130,246,0.15)",
                pointerEvents: "none",
              }} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ============================================================
   TikTok Section
   ============================================================ */
function TikTokSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const TIKTOK_LINK = "https://www.tiktok.com/@joelwebs?_r=1&_t=ZS-97PXFXHkOGL";

  const leftCovers = [
    { src: "/tiktok/tiktok-1.png", rotate: -6, size: 130, offset: { top: 40, left: 0 } },
    { src: "/tiktok/tiktok-2.png", rotate: 4, size: 150, offset: { top: 200, left: 30 } },
    { src: "/tiktok/tiktok-3.png", rotate: -3, size: 120, offset: { top: 380, left: 10 } },
  ];

  const rightCovers = [
    { src: "/tiktok/tiktok-4.png", rotate: 6, size: 140, offset: { top: 20, right: 0 } },
    { src: "/tiktok/tiktok-5.png", rotate: -5, size: 125, offset: { top: 210, right: 25 } },
    { src: "/tiktok/tiktok-6.png", rotate: 3, size: 145, offset: { top: 370, right: 5 } },
  ];

  return (
    <section style={{
      padding: isMobile ? "80px 20px 60px" : "120px 24px",
      background: "#060608",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Glow central */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 600,
        height: 400,
        background: "radial-gradient(ellipse, rgba(59,130,246,0.12) 0%, transparent 70%)",
        filter: "blur(60px)",
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: 0,
      }} />

      {/* Aurora sutil */}
      <div className="aurora-section" style={{ position: "absolute", inset: 0, opacity: 0.2, zIndex: 0 }} />

      {/* Desktop covers left */}
      {!isMobile && leftCovers.map((c, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: c.offset.top,
            left: c.offset.left,
            width: c.size,
            transform: `rotate(${c.rotate}deg)`,
            zIndex: 1,
            pointerEvents: "none",
          }}
        >
          <img
            src={c.src}
            alt=""
            style={{
              width: "100%",
              borderRadius: 12,
              border: "1.5px solid rgba(59,130,246,0.35)",
              boxShadow: "0 0 20px rgba(59,130,246,0.2), 0 8px 32px rgba(0,0,0,0.6)",
              display: "block",
            }}
          />
        </div>
      ))}

      {/* Desktop covers right */}
      {!isMobile && rightCovers.map((c, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: c.offset.top,
            right: c.offset.right,
            width: c.size,
            transform: `rotate(${c.rotate}deg)`,
            zIndex: 1,
            pointerEvents: "none",
          }}
        >
          <img
            src={c.src}
            alt=""
            style={{
              width: "100%",
              borderRadius: 12,
              border: "1.5px solid rgba(59,130,246,0.35)",
              boxShadow: "0 0 20px rgba(59,130,246,0.2), 0 8px 32px rgba(0,0,0,0.6)",
              display: "block",
            }}
          />
        </div>
      ))}

      {/* CTA Central */}
      <div style={{
        maxWidth: 520,
        margin: "0 auto",
        textAlign: "center",
        position: "relative",
        zIndex: 2,
      }}>
        <div className="animate-on-scroll" style={{ marginBottom: 16, display: "flex", justifyContent: "center" }}>
          <span className="badge-blue">TikTok</span>
        </div>

        <h2 className="animate-on-scroll" style={{
          fontSize: "clamp(24px, 3vw, 36px)",
          fontWeight: 800,
          color: "#fff",
          marginBottom: 16,
          lineHeight: 1.2,
          letterSpacing: "-0.02em",
        }}>
          También muestro el proceso<br />en TikTok
        </h2>

        <p className="animate-on-scroll animate-para delay-1" style={{
          fontSize: 15,
          color: "#a1a1aa",
          lineHeight: 1.75,
          marginBottom: 32,
        }}>
          Comparto proyectos, ideas y procesos de diseño web para que puedas ver cómo trabajo más allá del resultado final.
        </p>

        <div className="animate-on-scroll delay-2">
          <a
            href={TIKTOK_LINK}
            target="_blank"
            rel="noreferrer"
            className="btn-primary"
          >
            Ver mi TikTok
          </a>
        </div>

        {/* Mobile: fila horizontal de 3 portadas */}
        {isMobile && (
          <div style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            marginTop: 40,
            overflowX: "auto",
            paddingBottom: 8,
          }}>
            {["/tiktok/tiktok-1.png", "/tiktok/tiktok-2.png", "/tiktok/tiktok-3.png"].map((src, i) => (
              <img
                key={i}
                src={src}
                alt=""
                style={{
                  width: 90,
                  flexShrink: 0,
                  borderRadius: 10,
                  border: "1.5px solid rgba(59,130,246,0.35)",
                  boxShadow: "0 0 16px rgba(59,130,246,0.2)",
                  opacity: 0.85,
                  transform: i === 1 ? "translateY(-8px)" : "translateY(0)",
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default function Sobre() {
  useScrollAnimation();

  return (
    <>
      <HeroSobre />
      <SobreMiSection />
      <HistoriaSection />
      <TikTokSection />
    </>
  );
}

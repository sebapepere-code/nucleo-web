import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import AnimatedCard from "../components/AnimatedCard";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

function ParticleCanvas({ isMobile }: { isMobile: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const count = isMobile ? 20 : 50;
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
        if (p.y < -4) {
          p.y = canvas.height + 4;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -4 || p.x > canvas.width + 4) {
          p.x = Math.random() * canvas.width;
        }
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
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}

/* ============================================================
   Hero Section
   ============================================================ */
function HeroSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const imageBlock = (
    <div
      style={{
        display: "flex",
        alignItems: isMobile ? "flex-end" : "center",
        justifyContent: "center",
        position: "relative",
        flex: isMobile ? undefined : "0 0 45%",
        maxWidth: isMobile ? undefined : "45%",
        width: isMobile ? "100%" : undefined,
        alignSelf: isMobile ? "stretch" : undefined,
      }}
      className="hero-animate-media"
    >
      {/* Ambient glow */}
      <div style={{
        position: "absolute",
        bottom: isMobile ? 0 : "auto",
        top: isMobile ? "auto" : -80,
        right: isMobile ? -20 : -80,
        width: isMobile ? 300 : 500,
        height: isMobile ? 300 : 500,
        background: "radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)",
        filter: "blur(60px)",
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: 0,
      }} />
      <img
        src="/foto-hero.png"
        alt="Diseñador web"
        className="hero-img-entry pt-[0px]"
        style={{
          width: isMobile ? 275 : "100%",
          maxWidth: isMobile ? 275 : 480,
          objectFit: "contain",
          position: "relative",
          zIndex: 1,
          filter: "drop-shadow(0 0 40px rgba(59,130,246,0.3))",
          display: "block",
        }}
      />
    </div>
  );

  return (
    <section style={{
      minHeight: "100svh",
      background: "#0a0a0a",
      position: "relative",
      overflow: "hidden",
      paddingTop: 68,
    }}>
      {/* Aurora section bg */}
      <div className="aurora-section" style={{
        position: "absolute",
        inset: 0,
        opacity: 0.5,
        zIndex: 0,
      }} />
      {/* Canvas particles */}
      <ParticleCanvas isMobile={isMobile} />
      {/* Ambient glow bottom-left */}
      <div style={{
        position: "absolute",
        bottom: 60,
        left: -40,
        width: 200,
        height: 200,
        background: "radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)",
        filter: "blur(50px)",
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: 0,
      }} />
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: isMobile ? "32px 20px 0" : "60px 24px",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: "center",
          justifyContent: isMobile ? "space-between" : "center",
          gap: isMobile ? 16 : 48,
          minHeight: "calc(100svh - 68px)",
          position: "relative",
          zIndex: 1,
        }}
        className="pb-[0px]">
        {/* Left - Content */}
        <div style={{ flex: isMobile ? "none" : "0 0 55%", maxWidth: isMobile ? "100%" : "55%", textAlign: isMobile ? "center" : "left" }}>
          <div className="hero-animate-badge" style={{ marginBottom: 20, display: "flex", justifyContent: isMobile ? "center" : "flex-start" }}>
            <span className="badge-blue">
              <span style={{ width: 6, height: 6, background: "#3b82f6", borderRadius: "50%", boxShadow: "0 0 8px #3b82f6", display: "inline-block" }} />
              Diseño web premium
            </span>
          </div>

          <h1 className="hero-animate-title" style={{
            fontSize: isMobile ? "clamp(32px, 9vw, 42px)" : "clamp(36px, 5vw, 62px)",
            fontWeight: 800,
            color: "#fff",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            marginBottom: 20,
            textShadow: "0 0 40px rgba(59,130,246,0.3), 0 0 80px rgba(59,130,246,0.15)",
          }}>
            Webs que <span className="gradient-text-blue">convierten</span><br />
            visitas en <span className="gradient-text-blue">clientes</span>
          </h1>

          <p className="hero-animate-desc" style={{
            fontSize: isMobile ? 15 : "clamp(15px, 1.5vw, 18px)",
            color: "#a1a1aa",
            maxWidth: isMobile ? "100%" : 480,
            lineHeight: 1.7,
            marginBottom: 32,
          }}>
            Soy diseñador web y creo páginas con diseño premium y estrategia real, para que tu negocio convierta visitas en clientes.
          </p>

          <div className="hero-animate-btn" style={{ display: "flex", justifyContent: isMobile ? "center" : "flex-start" }}>
            <Link to="/portafolio" className="btn-primary">
              Ver portafolio
            </Link>
          </div>
        </div>

        {/* Image — desktop right, mobile below text */}
        {imageBlock}
      </div>
      {/* Horizontal light line between hero and next section */}
      <div style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 1,
        background: "linear-gradient(90deg, transparent 0%, rgba(59,130,246,0.3) 30%, rgba(147,197,253,0.5) 50%, rgba(59,130,246,0.3) 70%, transparent 100%)",
        pointerEvents: "none",
        zIndex: 2,
      }} />
    </section>
  );
}

/* ============================================================
   Diferenciales Section
   ============================================================ */
function DiferencialesSection() {
  const cards = [
    {
      num: "01",
      icon: (
        <div style={{ width: 48, height: 48, background: "rgba(59,130,246,0.12)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(59,130,246,0.2)" }}>
          <svg width="24" height="24" fill="none" stroke="#3b82f6" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10"/><path d="M12 8l4 4-4 4M8 12h8"/>
          </svg>
        </div>
      ),
      title: "Diseño con estrategia avanzada",
      text: "Antes de escribir una línea de código, analizo tu negocio, tu público y tu objetivo. Cada sección tiene un propósito claro para convertir.",
    },
    {
      num: "02",
      icon: (
        <div style={{ width: 48, height: 48, background: "rgba(59,130,246,0.12)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(59,130,246,0.2)" }}>
          <svg width="24" height="24" fill="none" stroke="#3b82f6" strokeWidth="2" viewBox="0 0 24 24">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
        </div>
      ),
      title: "Diseño que transmite tu marca",
      text: "Tu web no va a parecer una plantilla. Cada detalle visual está pensado para que comunique exactamente quién sos y qué ofrecés.",
    },
    {
      num: "03",
      icon: (
        <div style={{ width: 48, height: 48, background: "rgba(59,130,246,0.12)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(59,130,246,0.2)" }}>
          <svg width="24" height="24" fill="none" stroke="#3b82f6" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        </div>
      ),
      title: "Asesoramiento real",
      text: "Te oriento con honestidad sobre qué tipo de web te conviene, qué debería incluir y cuánto sentido tiene invertir según tu negocio, tus objetivos y tu etapa actual.",
    },
  ];

  return (
    <section style={{ padding: "100px 24px", background: "#060608", position: "relative", overflow: "hidden" }}>
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 500,
        height: 500,
        background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)",
        filter: "blur(60px)",
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: 0,
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <h2 className="section-title animate-on-scroll" style={{ fontSize: "clamp(28px, 4vw, 40px)" }}>
            Por qué Núcleo Web
          </h2>
          <p className="section-subtitle animate-on-scroll animate-para delay-1">
            Tres razones que marcan la diferencia.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 24,
        }}>
          {cards.map((card, i) => (
            <AnimatedCard key={i} className={`animate-on-scroll delay-${i}`} style={{ padding: "36px 28px" }}>
              <div style={{ position: "relative" }}>
                <span
                  className="gradient-text-num"
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    fontSize: 80,
                    fontWeight: 900,
                    lineHeight: 1,
                    fontFamily: "Inter, sans-serif",
                    userSelect: "none",
                  }}
                >
                  {card.num}
                </span>
                <div style={{ marginBottom: 20 }}>{card.icon}</div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 12, position: "relative" }}>
                  {card.title}
                </h3>
                <p style={{ fontSize: 14, color: "#a1a1aa", lineHeight: 1.75, position: "relative" }}>
                  {card.text}
                </p>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Proceso Section
   ============================================================ */
function ProcesoSection() {
  // Ícono 3D pendiente para "Pago inicial": cuando exista, poner su ruta en icon3d (ej. "/paso-pago.png").
  const steps: { num: string; icon3d: string | null; title: string; desc: string }[] = [
    {
      num: "01",
      icon3d: "/paso1-llamada.png",
      title: "Primer contacto",
      desc: "Agendamos una llamada o completás un formulario para conocer tu negocio, tus necesidades y tus objetivos.",
    },
    {
      num: "02",
      icon3d: "/paso2-analisis.png",
      title: "Análisis y propuesta",
      desc: "Analizo tu caso y preparo una propuesta con el alcance, los tiempos y el precio del proyecto.",
    },
    {
      num: "03",
      icon3d: null,
      title: "Pago inicial",
      desc: "Para comenzar, abonás el 50 % del presupuesto acordado.",
    },
    {
      num: "04",
      icon3d: "/paso3-formulario.png",
      title: "Planificación",
      desc: "Completamos el formulario de planificación y, según el proyecto, preparo un boceto para mostrarte cómo quedaría la web.",
    },
    {
      num: "05",
      icon3d: "/paso4-desarrollo.png",
      title: "Desarrollo",
      desc: "Desarrollo la web y podés seguir el avance y solicitar revisiones durante el proceso.",
    },
    {
      num: "06",
      icon3d: "/paso5-entrega.png",
      title: "Revisión y entrega",
      desc: "Revisás la web y solicitás hasta 150 cambios. Cuando estés conforme con el resultado final, abonás el 50 % restante y realizo la entrega.",
    },
  ];

  const iconoPago = (activo: boolean) => (
    <div style={{
      width: 60, height: 60, display: "flex", alignItems: "center", justifyContent: "center",
      filter: activo ? "drop-shadow(0 0 12px rgba(59,130,246,0.5))" : "none",
      transition: "filter 0.4s ease",
    }}>
      <svg width="46" height="46" fill="none" stroke="#3b82f6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <rect x="2" y="5" width="20" height="14" rx="2.5" />
        <line x1="2" y1="10" x2="22" y2="10" />
        <line x1="6" y1="15" x2="10" y2="15" />
      </svg>
    </div>
  );

  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const el = sectionRef.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const sectionHeight = el.offsetHeight;
      const viewH = window.innerHeight;
      const scrolled = -rect.top;
      const scrollable = sectionHeight - viewH;
      if (scrollable <= 0) return;
      const progress = Math.max(0, Math.min(1, scrolled / scrollable));
      const idx = Math.min(steps.length - 1, Math.floor(progress * steps.length));
      setCurrent(idx);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMobile, steps.length]);

  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) setCurrent((p) => Math.min(p + 1, steps.length - 1));
      else setCurrent((p) => Math.max(p - 1, 0));
    }
  };

  if (isMobile) {
    return (
      <section className="aurora-section" style={{ padding: "100px 0", overflow: "hidden", position: "relative" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", marginBottom: 48 }}>
          <div style={{ textAlign: "center" }}>
            <h2 className="section-title" style={{ fontSize: "clamp(28px, 4vw, 40px)" }}>
              Cómo trabajo
            </h2>
            <p className="section-subtitle">
              De la primera llamada a la entrega final.
            </p>
          </div>
        </div>

        <div style={{ padding: "0 24px" }}>
          <div className="swipe-carousel" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
            <div className="swipe-track" style={{ transform: `translateX(calc(-${current * 85}vw - ${current * 16}px))` }}>
              {steps.map((step, i) => (
                <div key={i} style={{ minWidth: "85vw", marginRight: 16 }}>
                  <div className={i === current ? "glass-card-blue" : "glass-card"} style={{ padding: "28px 24px", position: "relative", overflow: "hidden" }}>
                    <span style={{ position: "absolute", top: 10, right: 16, fontSize: 60, fontWeight: 900, color: "rgba(59,130,246,0.06)", lineHeight: 1, userSelect: "none" }}>{step.num}</span>
                    {step.icon3d ? (
                      <img src={step.icon3d} alt={step.title} style={{ width: 60, height: 60, objectFit: "contain", marginBottom: 14, mixBlendMode: "screen" }} />
                    ) : (
                      <div style={{ marginBottom: 14 }}>{iconoPago(i === current)}</div>
                    )}
                    <h3 style={{ fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 12 }}>{step.title}</h3>
                    <p style={{ fontSize: 14, color: "#a1a1aa", lineHeight: 1.75 }}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 24 }}>
            {steps.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)} style={{
                width: current === i ? 24 : 8, height: 8, borderRadius: 4,
                background: current === i ? "#3b82f6" : "#27272a",
                border: "none", cursor: "pointer",
                transition: "width 0.3s ease, background 0.3s ease", padding: 0,
                boxShadow: current === i ? "0 0 12px rgba(59,130,246,0.6)" : "none",
              }} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <div ref={sectionRef} style={{ height: `${steps.length * 100}vh`, position: "relative" }}>
      <div style={{
        position: "sticky",
        top: 0,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        overflow: "hidden",
        padding: "0 24px",
      }} className="aurora-section">
        {/* Side ambient glows */}
        <div style={{ position: "absolute", top: "30%", left: -80, width: 300, height: 300, background: "radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)", filter: "blur(60px)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "30%", right: -80, width: 300, height: 300, background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)", filter: "blur(60px)", borderRadius: "50%", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", marginBottom: 40 }}>
          <div style={{ textAlign: "center" }}>
            <h2 className="section-title" style={{ fontSize: "clamp(28px, 4vw, 40px)" }}>Cómo trabajo</h2>
            <p className="section-subtitle" style={{ marginTop: 12 }}>De la primera llamada a la entrega final.</p>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", marginBottom: 32 }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {steps.map((step, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", flex: 1, gap: 8 }}>
                <div style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  width: 32, height: 32, borderRadius: "50%",
                  background: i <= current ? "#3b82f6" : "#1f1f1f",
                  border: `2px solid ${i <= current ? "#3b82f6" : "#2a2a2a"}`,
                  color: i <= current ? "#fff" : "#555",
                  fontSize: 12, fontWeight: 700, flexShrink: 0,
                  transition: "all 0.4s ease",
                  boxShadow: i <= current ? "0 0 16px rgba(59,130,246,0.5)" : "none",
                }}>
                  {i < current ? (
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
                  ) : step.num}
                </div>
                {i < steps.length - 1 && (
                  <div style={{
                    flex: 1, height: 2, borderRadius: 1, overflow: "hidden",
                    background: "#1f1f1f", position: "relative",
                    boxShadow: i < current ? "0 0 8px rgba(59,130,246,0.5)" : "none",
                  }}>
                    {i < current && (
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, #3b82f6, #60a5fa)" }} />
                    )}
                    {i === current && (
                      <div style={{
                        position: "absolute", inset: 0, height: "100%", width: "40px",
                        background: "linear-gradient(to right, transparent, #93c5fd, transparent)",
                        backgroundSize: "100% 300%",
                        animation: "electricFlow 1.5s linear infinite",
                      }} />
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Cards — fixed formula: offset = (100% + gap) / N */}
        <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", overflow: "hidden" }}>
          <div style={{
            display: "flex",
            gap: 20,
            transition: "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            transform: `translateX(calc(-${current} * (100% + 20px) / ${steps.length}))`,
          }}>
            {steps.map((step, i) => (
              <div
                key={i}
                className={i === current ? "glass-card-blue" : "glass-card"}
                style={{
                  flex: `0 0 calc((100% - ${(steps.length - 1) * 20}px) / ${steps.length})`,
                  minWidth: 0,
                  padding: "24px 20px",
                  position: "relative",
                  transition: "transform 0.4s ease, opacity 0.4s ease",
                  transform: i === current ? "scale(1)" : "scale(0.97)",
                  opacity: i === current ? 1 : 0.45,
                  overflow: "hidden",
                }}
              >
                <span style={{
                  position: "absolute", top: 10, right: 14,
                  fontSize: 56, fontWeight: 900,
                  color: i === current ? "rgba(59,130,246,0.1)" : "rgba(255,255,255,0.025)",
                  lineHeight: 1, transition: "color 0.4s ease", userSelect: "none",
                }}>{step.num}</span>
                {step.icon3d ? (
                  <img
                    src={step.icon3d}
                    alt={step.title}
                    style={{
                      width: 60, height: 60, objectFit: "contain", marginBottom: 12,
                      mixBlendMode: i === current ? "screen" : "normal",
                      filter: i === current ? "drop-shadow(0 0 12px rgba(59,130,246,0.5))" : "none",
                      transition: "filter 0.4s ease",
                    }}
                  />
                ) : (
                  <div style={{ marginBottom: 12 }}>{iconoPago(i === current)}</div>
                )}
                <h3 style={{ fontSize: 16, fontWeight: 700, color: i === current ? "#fff" : "#555", marginBottom: 10, transition: "color 0.4s ease" }}>{step.title}</h3>
                <p style={{ fontSize: 13, color: i === current ? "#a1a1aa" : "#333", lineHeight: 1.75, transition: "color 0.4s ease" }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ maxWidth: 1200, margin: "18px auto 0", width: "100%", display: "flex", justifyContent: "flex-end" }}>
          <span style={{ fontSize: 13, color: "#555", letterSpacing: "0.05em" }}>
            <span style={{ color: "#3b82f6", fontWeight: 700 }}>{String(current + 1).padStart(2, "0")}</span>
            {" / "}{String(steps.length).padStart(2, "0")}
          </span>
        </div>

        {current === 0 && (
          <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, opacity: 0.5, animation: "bounce 1.5s ease-in-out infinite" }}>
            <span style={{ fontSize: 11, color: "#555", letterSpacing: "0.08em", textTransform: "uppercase" }}>Scrolleá</span>
            <svg width="16" height="16" fill="none" stroke="#555" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 5v14M5 12l7 7 7-7" /></svg>
          </div>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   Servicios Section — qué puedo hacer (reemplaza a los precios)
   ============================================================ */
function ServiciosSection() {
  const [cols, setCols] = useState(4);

  useEffect(() => {
    const check = () => setCols(window.innerWidth < 768 ? 1 : window.innerWidth < 1150 ? 2 : 4);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const iconBox = (paths: React.ReactNode) => (
    <div style={{ width: 48, height: 48, background: "rgba(59,130,246,0.12)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(59,130,246,0.2)" }}>
      <svg width="24" height="24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        {paths}
      </svg>
    </div>
  );

  const cards: { icon: React.ReactNode; title: string; lead?: string; text: string }[] = [
    {
      icon: iconBox(<><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></>),
      title: "Diseño visual personalizado",
      text: "Una web con identidad propia, alineada con tu marca y diseñada para diferenciarte.",
    },
    {
      icon: iconBox(<><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></>),
      title: "Estrategia y estructura",
      text: "Analizo tu negocio, tu público y tus objetivos para definir las secciones y el recorrido que mejor respondan a lo que buscás conseguir.",
    },
    {
      icon: iconBox(<><rect x="2" y="4" width="14" height="10" rx="2"/><line x1="6" y1="18" x2="12" y2="18"/><rect x="17" y="8" width="5" height="12" rx="1"/></>),
      title: "Diseño adaptable",
      text: "Una experiencia cuidada y funcional en celulares, tablets y computadoras.",
    },
    {
      icon: iconBox(<><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></>),
      title: "Funcionalidades a medida",
      text: "Filtros avanzados por precio, color o talle, según el negocio, y otras funciones adaptadas a cada proyecto.",
    },
    {
      icon: iconBox(<><rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/></>),
      title: "Sistemas y paneles administrativos",
      text: "Paneles para gestionar productos o servicios y sistemas personalizados según las necesidades del proyecto.",
    },
    {
      icon: iconBox(<><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></>),
      title: "Integraciones y automatizaciones",
      lead: "Conectá tu web con las herramientas que utiliza tu negocio.",
      text: "Integración de formularios, servicios externos y funcionalidades que faciliten procesos y mejoren la experiencia de tus clientes.",
    },
    {
      icon: iconBox(<><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></>),
      title: "Desarrollo a medida",
      lead: "¿Tenés una idea diferente? Podemos hacerla realidad.",
      text: "Trabajo con HTML, CSS y JavaScript para desarrollar funcionalidades personalizadas que se adapten a las necesidades de tu negocio. Contame tu idea y vemos cómo llevarla a cabo.",
    },
  ];

  const gap = 24;

  return (
    <section style={{ padding: "100px 24px", background: "#0a0a0a", position: "relative", overflow: "hidden" }} id="servicios">
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 500,
        height: 500,
        background: "radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)",
        filter: "blur(60px)",
        borderRadius: "50%",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <h2 className="section-title animate-on-scroll" style={{ fontSize: "clamp(28px, 4vw, 40px)" }}>
            Qué puedo hacer por tu negocio
          </h2>
          <p className="section-subtitle animate-on-scroll animate-para delay-1">
            Lo que desarrollo, adaptado a lo que tu proyecto necesita.
          </p>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap }}>
          {cards.map((card, i) => (
            <AnimatedCard
              key={i}
              className={`animate-on-scroll delay-${i % 4}`}
              style={{ padding: "36px 28px", flex: `0 0 calc((100% - ${(cols - 1) * gap}px) / ${cols})`, minWidth: 0 }}
            >
              <div style={{ marginBottom: 20 }}>{card.icon}</div>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 12 }}>
                {card.title}
              </h3>
              {card.lead && (
                <p style={{ fontSize: 14, color: "#d4d4d8", fontWeight: 500, lineHeight: 1.6, marginBottom: 8 }}>
                  {card.lead}
                </p>
              )}
              <p style={{ fontSize: 14, color: "#a1a1aa", lineHeight: 1.75 }}>
                {card.text}
              </p>
            </AnimatedCard>
          ))}
        </div>

        <div className="animate-on-scroll" style={{ marginTop: 48, display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
          <div style={{ width: 120, height: 1, background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.5), transparent)" }} />
          <p style={{ fontSize: 15, color: "#d4d4d8", lineHeight: 1.7, textAlign: "center", fontWeight: 500 }}>
            Cada proyecto se define según sus necesidades, complejidad y alcance.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Contacto Section
   ============================================================ */
function ContactoSection() {
  return (
    <section id="contacto" style={{
      padding: "120px 24px",
      background: "linear-gradient(to bottom, #0a0a0a, #060608)",
      textAlign: "center",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Big glow behind the card */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 600,
        height: 400,
        background: "radial-gradient(ellipse, rgba(59,130,246,0.18) 0%, transparent 70%)",
        filter: "blur(80px)",
        borderRadius: "50%",
        pointerEvents: "none",
      }} />
      {/* Second glow for depth */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 300,
        height: 200,
        background: "radial-gradient(ellipse, rgba(147,197,253,0.12) 0%, transparent 70%)",
        filter: "blur(40px)",
        borderRadius: "50%",
        pointerEvents: "none",
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 680, margin: "0 auto" }}>
        {/* Premium card */}
        <div style={{
          background: "rgba(255,255,255,0.03)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(59,130,246,0.25)",
          borderRadius: 24,
          padding: "56px 40px",
          boxShadow: "0 0 60px rgba(59,130,246,0.12), 0 0 120px rgba(59,130,246,0.05), inset 0 1px 0 rgba(255,255,255,0.06)",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Top shimmer line */}
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent 0%, rgba(59,130,246,0.6) 30%, rgba(147,197,253,0.8) 50%, rgba(59,130,246,0.6) 70%, transparent 100%)" }} />
          {/* Glow behind title */}
          <div style={{ position: "absolute", top: -40, left: "50%", transform: "translateX(-50%)", width: 300, height: 200, background: "radial-gradient(ellipse, rgba(59,130,246,0.15) 0%, transparent 70%)", filter: "blur(30px)", pointerEvents: "none" }} />

          <div className="animate-on-scroll" style={{ marginBottom: 20, display: "flex", justifyContent: "center" }}>
            <span className="badge-blue">
              <span style={{ width: 6, height: 6, background: "#3b82f6", borderRadius: "50%", boxShadow: "0 0 8px #3b82f6", display: "inline-block" }} />
              Consultá gratis
            </span>
          </div>

          <h2 className="section-title animate-on-scroll" style={{
            marginBottom: 20,
            fontSize: "clamp(24px, 4vw, 38px)",
            textShadow: "0 0 40px rgba(59,130,246,0.3), 0 0 80px rgba(59,130,246,0.15)",
            position: "relative",
          }}>
            ¿Querés saber qué web<br />te conviene?
          </h2>

          <p className="section-subtitle animate-on-scroll animate-para delay-1" style={{ marginBottom: 36, maxWidth: 480, margin: "0 auto 36px" }}>
            Hablemos por WhatsApp, veo tu negocio y te digo qué tipo de página tiene más sentido hacer, qué debería incluir y cómo podríamos enfocarla para comunicar mejor tu propuesta.
          </p>

          <div className="animate-on-scroll delay-2" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
            <a
              href="https://wa.link/z137l0"
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
              style={{
                fontSize: 17,
                padding: "16px 36px",
                borderRadius: 12,
                boxShadow: "0 0 32px rgba(59,130,246,0.5), 0 0 64px rgba(59,130,246,0.2)",
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Hablar por WhatsApp
            </a>
            <span style={{ fontSize: 13, color: "#52525b", letterSpacing: "0.03em" }}>
              Respuesta directa por WhatsApp
            </span>
          </div>

          {/* Animated lines at bottom of card */}
          <div style={{ display: "flex", justifyContent: "center", gap: 10, height: 32, marginTop: 36 }}>
            {[0, 1, 2, 3, 4].map((j) => (
              <div key={j} className="electric-line" style={{ width: 1.5, height: "100%" }} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Inicio() {
  useScrollAnimation();

  return (
    <>
      <HeroSection />
      <DiferencialesSection />
      <ProcesoSection />
      {/* Las secciones de precios (PreciosSection y NuevoPreciosSection) están ocultas
          y guardadas en src/pages/planes/SeccionesPrecios.tsx — ver el README de esa carpeta. */}
      <ServiciosSection />
      <ContactoSection />
    </>
  );
}

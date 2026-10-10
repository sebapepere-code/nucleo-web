/* Secciones de precios retiradas de la web pública.
   Se conservan para poder restaurarlas: ver README.md en esta carpeta. */
import { Link } from "react-router-dom";

/* ============================================================
   Precios Section
   ============================================================ */
export function PreciosSection() {
  const plans = [
    {
      name: "Profesional",
      price: "$500 – $700",
      featured: false,
      badge: null,
      benefits: [
        "Landing page estratégica o página institucional",
        "Diseño moderno y personalizado",
        "Estructura pensada para comunicar tu propuesta con claridad",
        "Entrega en 5 a 10 días hábiles",
        "Formulario de análisis previo al desarrollo",
        "Revisión y ajustes incluidos",
      ],
      audience: "Tenés un negocio o emprendimiento, querés una presencia digital clara y llamativa, y buscás una web que en el futuro se pueda escalar.",
      btnStyle: "outline",
    },
    {
      name: "Pro",
      price: "$800 – $1500",
      featured: true,
      badge: "Más elegido",
      benefits: [
        "Página web completa con múltiples secciones",
        "Diseño visual premium e impactante",
        "Análisis del público objetivo en profundidad",
        "Estrategia de estructura avanzada",
        "Inicio impactante y único",
        "Mayor dedicación de tiempo y detalle en cada sección",
        "Entrega en 7 a 14 días hábiles",
        "Revisiones incluidas",
      ],
      audience: "Ya tenés presencia en redes sociales o una base de contactos, querés mejorar tu conversión o mostrar tu propuesta de manera más clara y profesional.",
      btnStyle: "primary",
    },
    {
      name: "Plus",
      price: "$1500+",
      featured: false,
      badge: null,
      benefits: [
        "Proceso completo y extendido",
        "Llamadas de seguimiento durante el desarrollo",
        "Diseño visual de nivel superior, animaciones avanzadas y secciones únicas",
        "Estrategia y análisis del negocio muy detallados",
        "Sistemas complejos si los necesitás (catálogos, paneles, automatizaciones)",
        "Inicio impactante y único, desarrollado con más tiempo y recursos",
        "Entrega en 15 a 30 días hábiles",
        "Soporte post-entrega incluido",
      ],
      audience: "Ya tenés un volumen importante de tráfico digital, querés escalar tu marca, potenciar tus ventas o reemplazar una web que ya no está dando resultados.",
      btnStyle: "outline",
    },
  ];

  return (
    <section style={{ padding: "100px 24px", background: "#0a0a0a", position: "relative", overflow: "hidden" }} id="precios">
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        height: 400,
        background: "radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)",
        filter: "blur(60px)",
        borderRadius: "50%",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <h2 className="section-title animate-on-scroll" style={{ fontSize: "clamp(28px, 4vw, 40px)" }}>
            Elegí tu plan
          </h2>
          <p className="section-subtitle animate-on-scroll animate-para delay-1">
            Cada plan está diseñado para un momento específico de tu negocio.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 16,
          alignItems: "start",
        }}>
          {plans.map((plan, i) => (
            <div key={i} className={`animate-on-scroll delay-${i} ${plan.featured ? "price-card-featured" : ""}`}>
              {plan.badge && (
                <div style={{ textAlign: "center", marginBottom: 12 }}>
                  <span style={{
                    display: "inline-flex", alignItems: "center", gap: 6,
                    background: "rgba(59,130,246,0.1)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(59,130,246,0.4)",
                    color: "#60a5fa",
                    fontSize: 12, fontWeight: 600,
                    padding: "5px 14px", borderRadius: 100,
                    boxShadow: "0 0 16px rgba(59,130,246,0.3)",
                  }}>
                    <span style={{ width: 5, height: 5, background: "#3b82f6", borderRadius: "50%", boxShadow: "0 0 6px #3b82f6" }} />
                    {plan.badge}
                  </span>
                </div>
              )}

              <div style={{
                background: plan.featured ? "rgba(59,130,246,0.08)" : "rgba(255,255,255,0.03)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: plan.featured ? "1px solid rgba(59,130,246,0.3)" : "1px solid rgba(255,255,255,0.08)",
                borderRadius: 16,
                padding: "22px",
                position: "relative",
                overflow: "hidden",
                boxShadow: plan.featured
                  ? "0 0 20px rgba(59,130,246,0.3), 0 0 60px rgba(59,130,246,0.1), inset 0 1px 0 rgba(255,255,255,0.05)"
                  : "0 0 20px rgba(59,130,246,0.06), 0 0 40px rgba(59,130,246,0.02), inset 0 1px 0 rgba(255,255,255,0.04)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.6), transparent)", zIndex: 1 }} />
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 80, background: "linear-gradient(to bottom, rgba(59,130,246,0.06), transparent)", pointerEvents: "none" }} />

                <h3 style={{ fontSize: 19, fontWeight: 700, color: "#fff", marginBottom: 6 }}>{plan.name}</h3>
                <p className="gradient-text-price" style={{ fontSize: 28, fontWeight: 800, marginBottom: 18, lineHeight: 1 }}>{plan.price}</p>

                <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.3), transparent)", marginBottom: 18 }} />

                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 9, marginBottom: 20 }}>
                  {plan.benefits.map((b, j) => (
                    <li key={j} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                      <svg width="14" height="14" fill="none" stroke="#3b82f6" strokeWidth="2.5" viewBox="0 0 24 24" style={{ flexShrink: 0, marginTop: 2 }}>
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span style={{ fontSize: 13, color: "#a1a1aa", lineHeight: 1.5 }}>{b}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contacto"
                  className={plan.btnStyle === "primary" ? "btn-primary" : "btn-outline"}
                  style={{ width: "100%", textAlign: "center" }}
                >
                  Quiero este plan
                </a>
              </div>

              <div style={{ display: "flex", justifyContent: "center", gap: 10, height: 40, padding: "4px 0" }}>
                {[0, 1, 2].map((j) => (
                  <div key={j} className="electric-line" style={{ width: 1.5, height: "100%" }} />
                ))}
              </div>

              <div style={{
                background: "rgba(255,255,255,0.03)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 12,
                padding: "16px 20px",
                boxShadow: "0 4px 24px rgba(0,0,0,0.4), 0 0 20px rgba(59,130,246,0.04), inset 0 1px 0 rgba(255,255,255,0.05)",
              }}>
                <p style={{ fontSize: 11, color: "#60a5fa", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>
                  Este plan es para vos si:
                </p>
                <p style={{ fontSize: 13, color: "#a1a1aa", lineHeight: 1.65 }}>
                  {plan.audience}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Nueva Precios Section — 2 planes
   ============================================================ */
export function NuevoPreciosSection() {
  const plans = [
    {
      name: "Plan profesional",
      price: "USD 400",
      featured: false,
      badge: null,
      benefits: [
        "Diseño moderno y personalizado",
        "Estructura para comunicar propuesta",
        "Hasta 3 páginas",
        "Revisión y ajustes incluidos",
        "Entrega en 3 a 7 días hábiles",
      ],
      audience: "Tenés un negocio o emprendimiento y querés presencia digital. Buscás una web clara, llamativa y que en el futuro pueda crecer. No tenés web todavía o la que tenés no te representa.",
    },
    {
      name: "Plan Pro",
      price: "USD 800",
      featured: true,
      badge: "Más elegido",
      benefits: [
        "Diseño visual premium y diferencial",
        "Hasta 5 páginas",
        "Diseño estratégico orientado a conversión",
        "Estudio de la competencia",
        "Formulario de análisis previo al desarrollo",
        "Análisis extenso del negocio y del público",
        "Estructura orientada a convertir visitas en clientes",
        "Diseño que transmite la identidad de la marca",
        "Sistemas complejos si se necesitan",
        "Entrega en 7 a 12 días hábiles.",
      ],
      audience: "Ya tenés presencia en redes o una base de contactos. Querés mejorar tu conversión o mostrar tu propuesta de forma más profesional. Buscás potenciar tus ventas con una web que cierre clientes.",
    },
  ];

  return (
    <section style={{ padding: "100px 24px", background: "#0a0a0a", position: "relative", overflow: "hidden" }} id="precios">
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

      <div style={{ maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <h2 className="section-title animate-on-scroll" style={{ fontSize: "clamp(28px, 4vw, 40px)" }}>
            Elegí tu plan
          </h2>
          <p className="section-subtitle animate-on-scroll animate-para delay-1">
            Cada plan está diseñado para un momento específico de tu negocio.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 20,
          alignItems: "start",
        }}>
          {plans.map((plan, i) => (
            <div key={i} className={`animate-on-scroll delay-${i} ${plan.featured ? "price-card-featured" : ""}`}>
              {plan.badge && (
                <div style={{ textAlign: "center", marginBottom: 12 }}>
                  <span style={{
                    display: "inline-flex", alignItems: "center", gap: 6,
                    background: "rgba(59,130,246,0.1)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(59,130,246,0.4)",
                    color: "#60a5fa",
                    fontSize: 12, fontWeight: 600,
                    padding: "5px 14px", borderRadius: 100,
                    boxShadow: "0 0 16px rgba(59,130,246,0.3)",
                  }}>
                    <span style={{ width: 5, height: 5, background: "#3b82f6", borderRadius: "50%", boxShadow: "0 0 6px #3b82f6" }} />
                    {plan.badge}
                  </span>
                </div>
              )}

              <div style={{
                background: plan.featured ? "rgba(59,130,246,0.08)" : "rgba(255,255,255,0.03)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: plan.featured ? "1.5px solid rgba(59,130,246,0.5)" : "1px solid rgba(255,255,255,0.08)",
                borderRadius: 16,
                padding: "24px",
                position: "relative",
                overflow: "hidden",
                boxShadow: plan.featured
                  ? "0 0 32px rgba(59,130,246,0.35), 0 0 80px rgba(59,130,246,0.12), inset 0 1px 0 rgba(255,255,255,0.05)"
                  : "0 0 20px rgba(59,130,246,0.06), inset 0 1px 0 rgba(255,255,255,0.04)",
              }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.6), transparent)", zIndex: 1 }} />
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 80, background: "linear-gradient(to bottom, rgba(59,130,246,0.07), transparent)", pointerEvents: "none" }} />

                <h3 style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 6 }}>{plan.name}</h3>
                <p className="gradient-text-price" style={{ fontSize: 32, fontWeight: 800, marginBottom: 18, lineHeight: 1 }}>{plan.price}</p>

                <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.3), transparent)", marginBottom: 18 }} />

                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
                  {plan.benefits.map((b, j) => (
                    <li key={j} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                      <svg width="14" height="14" fill="none" stroke="#3b82f6" strokeWidth="2.5" viewBox="0 0 24 24" style={{ flexShrink: 0, marginTop: 2 }}>
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span style={{ fontSize: 13, color: "#a1a1aa", lineHeight: 1.5 }}>{b}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to={plan.name === "Plan Pro" ? "/planes/pro" : "/planes/profesional"}
                  className={plan.featured ? "btn-primary" : "btn-outline"}
                  style={{
                    width: "100%",
                    textAlign: "center",
                    boxShadow: plan.featured ? "0 0 24px rgba(59,130,246,0.4)" : undefined,
                  }}
                >
                  Ver explicación del plan
                </Link>
              </div>

              <div style={{ display: "flex", justifyContent: "center", gap: 10, height: 40, padding: "4px 0" }}>
                {[0, 1, 2].map((j) => (
                  <div key={j} className="electric-line" style={{ width: 1.5, height: "100%" }} />
                ))}
              </div>

              <div style={{
                background: "rgba(255,255,255,0.03)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 12,
                padding: "16px 20px",
                boxShadow: "0 4px 24px rgba(0,0,0,0.4), 0 0 20px rgba(59,130,246,0.04), inset 0 1px 0 rgba(255,255,255,0.05)",
              }}>
                <p style={{ fontSize: 11, color: "#60a5fa", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>
                  Este plan es para vos si:
                </p>
                <p style={{ fontSize: 13, color: "#a1a1aa", lineHeight: 1.65 }}>
                  {plan.audience}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

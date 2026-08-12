import VideoPlayer from "../../components/VideoPlayer";

export default function PlanPro() {
  return (
    <section style={{
      minHeight: "100vh",
      background: "#0a0a0a",
      paddingTop: 68,
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Ambient glow — more prominent for Pro */}
      <div style={{
        position: "absolute",
        top: 80,
        left: "50%",
        transform: "translateX(-50%)",
        width: 700,
        height: 500,
        background: "radial-gradient(ellipse, rgba(59,130,246,0.18) 0%, transparent 70%)",
        filter: "blur(80px)",
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: 0,
      }} />
      <div style={{
        position: "absolute",
        top: 0,
        right: -100,
        width: 400,
        height: 400,
        background: "radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)",
        filter: "blur(60px)",
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: 0,
      }} />

      <div style={{
        maxWidth: 760,
        margin: "0 auto",
        padding: "60px 24px 80px",
        position: "relative",
        zIndex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: 32,
      }}>
        {/* Badge */}
        <span style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          background: "rgba(59,130,246,0.1)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(59,130,246,0.5)",
          color: "#60a5fa",
          fontSize: 13,
          fontWeight: 600,
          padding: "6px 14px",
          borderRadius: 100,
          boxShadow: "0 0 16px rgba(59,130,246,0.3)",
        }}>
          <span style={{ width: 6, height: 6, background: "#3b82f6", borderRadius: "50%", boxShadow: "0 0 8px #3b82f6" }} />
          Plan Pro · Más elegido
        </span>

        {/* Title */}
        <h1 style={{
          fontSize: "clamp(28px, 5vw, 48px)",
          fontWeight: 800,
          color: "#fff",
          lineHeight: 1.1,
          letterSpacing: "-0.03em",
          textShadow: "0 0 40px rgba(59,130,246,0.3)",
          margin: 0,
        }}>
          ¿El Plan Pro{" "}
          <span style={{
            background: "linear-gradient(135deg, #ffffff 0%, #93c5fd 50%, #3b82f6 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            es para vos?
          </span>
        </h1>

        {/* Description */}
        <p style={{
          fontSize: 16,
          color: "#a1a1aa",
          lineHeight: 1.75,
          maxWidth: 580,
          margin: 0,
        }}>
          En este video te explico cuándo tiene sentido elegir este plan, qué lo diferencia del Plan Profesional y qué incluye a nivel de estrategia, diseño y sistemas.
        </p>

        {/* Video */}
        <div style={{ width: "100%" }}>
          <VideoPlayer
            src="/planes/video-pro.mp4"
            poster="/planes/poster-pro.png"
            featured={true}
          />
        </div>

        {/* WhatsApp button */}
        <a
          href="https://wa.link/z137l0"
          target="_blank"
          rel="noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            background: "#3b82f6",
            color: "#fff",
            fontWeight: 600,
            fontSize: 16,
            padding: "14px 32px",
            borderRadius: 10,
            textDecoration: "none",
            transition: "box-shadow 0.2s ease, transform 0.2s ease",
            boxShadow: "0 0 32px rgba(59,130,246,0.5), 0 0 60px rgba(59,130,246,0.15)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow = "0 0 48px rgba(59,130,246,0.8), 0 0 80px rgba(59,130,246,0.3)";
            (e.currentTarget as HTMLElement).style.transform = "scale(1.03)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow = "0 0 32px rgba(59,130,246,0.5), 0 0 60px rgba(59,130,246,0.15)";
            (e.currentTarget as HTMLElement).style.transform = "scale(1)";
          }}
        >
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.122 1.526 5.856L.057 23.882a.5.5 0 0 0 .614.612l6.126-1.589A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.935 9.935 0 0 1-5.036-1.365l-.36-.214-3.736.969.998-3.63-.236-.376A9.935 9.935 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
          </svg>
          Hablar por WhatsApp
        </a>

        {/* Help text */}
        <p style={{
          fontSize: 14,
          color: "#71717a",
          margin: 0,
          lineHeight: 1.6,
        }}>
          Si tu caso no encaja perfecto en un plan, puedo hacerte una cotización personalizada según lo que necesitás.
        </p>
      </div>
    </section>
  );
}

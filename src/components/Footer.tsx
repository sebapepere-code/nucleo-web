import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer style={{
      background: "#0d0d0d",
      borderTop: "1px solid #1f1f1f",
      padding: "60px 24px 32px",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Top */}
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 48,
          justifyContent: "space-between",
          marginBottom: 48,
        }}>
          {/* Brand */}
          <div style={{ maxWidth: 280 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <img src="/logo-sin-fondo.png" alt="Núcleo Web" style={{ height: 36 }} />
              <span style={{ fontWeight: 700, fontSize: 18, color: "#fff" }}>Núcleo Web</span>
            </div>
            <p style={{ color: "#a1a1aa", fontSize: 14, lineHeight: 1.7 }}>
              Webs con diseño premium y estrategia real.
            </p>
          </div>

          {/* Links */}
          <div>
            <p style={{ color: "#fff", fontWeight: 600, fontSize: 14, marginBottom: 16 }}>Páginas</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { to: "/", label: "Inicio" },
                { to: "/portafolio", label: "Portafolio" },
                { to: "/sobre", label: "Sobre el negocio" },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  style={{ color: "#a1a1aa", fontSize: 14, textDecoration: "none", transition: "color 0.2s ease" }}
                  onMouseEnter={(e) => { (e.target as HTMLElement).style.color = "#3b82f6"; }}
                  onMouseLeave={(e) => { (e.target as HTMLElement).style.color = "#a1a1aa"; }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p style={{ color: "#fff", fontWeight: 600, fontSize: 14, marginBottom: 16 }}>Contacto</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <a
                href="https://wa.me/TUNUMERO"
                style={{ color: "#a1a1aa", fontSize: 14, textDecoration: "none", transition: "color 0.2s ease" }}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.color = "#3b82f6"; }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.color = "#a1a1aa"; }}
              >WhatsApp </a>
              <a
                href="mailto:tucorreo@gmail.com"
                style={{ color: "#a1a1aa", fontSize: 14, textDecoration: "none", transition: "color 0.2s ease" }}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.color = "#3b82f6"; }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.color = "#a1a1aa"; }}
              >
                Email 
              </a>
            </div>
          </div>

          {/* Social */}
          <div>
            <p style={{ color: "#fff", fontWeight: 600, fontSize: 14, marginBottom: 16 }}>Redes</p>
            <div style={{ display: "flex", gap: 16 }}>
              <a
                href="https://tiktok.com/@nucleoweb"
                target="_blank"
                rel="noreferrer"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 8,
                  background: "#1f1f1f",
                  border: "1px solid #27272a",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "border-color 0.2s ease, background 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "#3b82f6";
                  el.style.background = "rgba(59,130,246,0.1)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "#27272a";
                  el.style.background = "#1f1f1f";
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.81a8.28 8.28 0 004.85 1.55V6.91a4.86 4.86 0 01-1.08-.22z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div style={{
          borderTop: "1px solid #1f1f1f",
          paddingTop: 24,
          textAlign: "center",
          color: "#a1a1aa",
          fontSize: 13,
        }}>
          © 2025 Núcleo Web. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}

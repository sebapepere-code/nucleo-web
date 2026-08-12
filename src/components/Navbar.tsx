import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 900);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const links = [
    { to: "/", label: "Inicio" },
    { to: "/portafolio", label: "Portafolio" },
    { to: "/sobre", label: "Sobre el negocio" },
  ];

  return (
    <>
      <nav style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: scrolled ? "rgba(10,10,10,0.92)" : "rgba(10,10,10,0.7)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid #1f1f1f",
        transition: "background 0.3s ease",
      }}>
        <div style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          height: 68,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          {/* Logo */}
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", flexShrink: 0 }}>
            <img
              src="/logo-sin-fondo.png"
              alt="Núcleo Web"
              style={{ height: 36, width: 36, objectFit: "contain" }}
            />
            <span style={{ fontWeight: 700, fontSize: 18, color: "#fff", letterSpacing: "-0.02em" }}>
              Núcleo Web
            </span>
          </Link>

          {/* Desktop Nav */}
          {!isMobile && (
            <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  style={{
                    color: pathname === link.to ? "#3b82f6" : "#a1a1aa",
                    fontWeight: 500,
                    fontSize: 15,
                    textDecoration: "none",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => { (e.target as HTMLElement).style.color = "#3b82f6"; }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.color = pathname === link.to ? "#3b82f6" : "#a1a1aa";
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}

          {/* Right side */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {!isMobile && (
              <a
                href="https://wa.link/z137l0"
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
                style={{ fontSize: 14, padding: "10px 20px", borderRadius: 8 }}
              >
                Agendá una llamada
              </a>
            )}

            {/* Hamburger */}
            {isMobile && (
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 8,
                  display: "flex",
                  flexDirection: "column",
                  gap: 5,
                  zIndex: 1001,
                }}
                aria-label="Menú"
              >
                <span style={{
                  display: "block",
                  width: 24,
                  height: 2,
                  background: "#fff",
                  borderRadius: 2,
                  transition: "transform 0.3s ease, opacity 0.3s ease",
                  transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none",
                }} />
                <span style={{
                  display: "block",
                  width: 24,
                  height: 2,
                  background: "#fff",
                  borderRadius: 2,
                  opacity: menuOpen ? 0 : 1,
                  transition: "opacity 0.3s ease",
                }} />
                <span style={{
                  display: "block",
                  width: 24,
                  height: 2,
                  background: "#fff",
                  borderRadius: 2,
                  transition: "transform 0.3s ease",
                  transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none",
                }} />
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobile && (
        <div style={{
          position: "fixed",
          inset: 0,
          zIndex: 999,
          background: "rgba(10,10,10,0.98)",
          backdropFilter: "blur(20px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 32,
          transition: "opacity 0.3s ease, transform 0.3s ease",
          opacity: menuOpen ? 1 : 0,
          transform: menuOpen ? "translateX(0)" : "translateX(100%)",
          pointerEvents: menuOpen ? "all" : "none",
        }}>
          <img src="/logo-sin-fondo.png" alt="Núcleo Web" style={{ height: 60, marginBottom: 8 }} />
          <p style={{ color: "#a1a1aa", fontSize: 14 }}>Núcleo Web</p>

          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              style={{
                color: pathname === link.to ? "#3b82f6" : "#fff",
                fontSize: 28,
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              {link.label}
            </Link>
          ))}

          <a
            href="https://wa.link/z137l0"
            target="_blank"
            rel="noreferrer"
            className="btn-primary"
            style={{ marginTop: 16 }}
            onClick={() => setMenuOpen(false)}
          >
            Agendá una llamada
          </a>
        </div>
      )}
    </>
  );
}

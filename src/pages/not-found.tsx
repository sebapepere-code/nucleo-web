import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0a",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
    }}>
      <div style={{ textAlign: "center" }}>
        <p style={{ fontSize: 100, fontWeight: 800, color: "rgba(59,130,246,0.1)", lineHeight: 1, marginBottom: 0 }}>404</p>
        <h1 style={{ fontSize: 32, fontWeight: 700, color: "#fff", marginBottom: 16 }}>
          Página no encontrada
        </h1>
        <p style={{ color: "#a1a1aa", marginBottom: 32 }}>
          La página que buscás no existe.
        </p>
        <Link to="/">
          <button className="btn-primary" style={{ fontFamily: "inherit", cursor: "pointer" }}>
            Volver al inicio
          </button>
        </Link>
      </div>
    </div>
  );
}

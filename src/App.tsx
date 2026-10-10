import { BrowserRouter, Routes, Route, Navigate, useParams, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Inicio from "@/pages/Inicio";
import Sobre from "@/pages/Sobre";
import Portafolio, { CategoriaPortafolio, ProyectoIndividual, CATEGORIAS_ANTERIORES } from "@/pages/Portafolio";
// Planes ocultos de la web pública. Para restaurarlos, ver src/pages/planes/README.md
// import PlanProfesional from "@/pages/planes/PlanProfesional";
// import PlanPro from "@/pages/planes/PlanPro";
import NotFound from "@/pages/not-found";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function CategoriaWrapper() {
  const { categoria } = useParams<{ categoria: string }>();
  const nueva = categoria ? CATEGORIAS_ANTERIORES[categoria] : undefined;
  if (nueva) return <Navigate to={`/portafolio/${nueva}`} replace />;
  return <CategoriaPortafolio categoria={categoria ?? ""} />;
}

function ProyectoWrapper() {
  const { categoria, proyecto } = useParams<{ categoria: string; proyecto: string }>();
  return <ProyectoIndividual categoria={categoria ?? ""} proyecto={proyecto ?? ""} />;
}

function AppRoutes() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <ScrollToTop />
      <Navbar />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/portafolio" element={<Portafolio />} />
          <Route path="/portafolio/:categoria" element={<CategoriaWrapper />} />
          <Route path="/portafolio/:categoria/:proyecto" element={<ProyectoWrapper />} />
          {/* Planes ocultos de la web pública. Para restaurarlos, ver src/pages/planes/README.md */}
          {/* <Route path="/planes/profesional" element={<PlanProfesional />} /> */}
          {/* <Route path="/planes/pro" element={<PlanPro />} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "") || "/";
  return (
    <BrowserRouter basename={base}>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

/* ============================================================
   Carousel — real images with browser frame
   ============================================================ */
const CAROUSEL_LEFT = [
  "/portafolio/carrusel/anillo-nova.png",
  "/portafolio/carrusel/auriculares-lynq.png",
  "/portafolio/carrusel/gym.png",
  "/portafolio/carrusel/inmobiliaria.png",
];

const CAROUSEL_RIGHT = [
  "/portafolio/carrusel/laptop-nexus.png",
  "/portafolio/carrusel/robot.png",
  "/portafolio/carrusel/starbucks.png",
  "/portafolio/carrusel/yate.png",
];

function ImageCard({ src, showDots = false }: { src: string; showDots?: boolean }) {
  return (
    <div style={{
      borderRadius: 10,
      overflow: "hidden",
      border: "1px solid rgba(59,130,246,0.2)",
      boxShadow: "0 0 20px rgba(59,130,246,0.1)",
      background: "#0d1117",
      flexShrink: 0,
    }}>
      {showDots && (
        <div style={{
          height: 26,
          background: "rgba(255,255,255,0.04)",
          borderBottom: "1px solid rgba(59,130,246,0.15)",
          display: "flex",
          alignItems: "center",
          padding: "0 10px",
          gap: 5,
        }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#ff5f57" }} />
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#febc2e" }} />
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#28c840" }} />
        </div>
      )}
      <img
        src={src}
        alt=""
        style={{ width: "100%", display: "block", objectFit: "contain", height: 180, background: "#0d1117" }}
      />
    </div>
  );
}

function VerticalCarousel({ srcs, direction }: { srcs: string[]; direction: "up" | "down" }) {
  const doubled = [...srcs, ...srcs];
  return (
    <div style={{ height: 520, overflow: "hidden", position: "relative" }}>
      <div
        className={direction === "up" ? "carousel-track-up" : "carousel-track-down"}
        style={{ display: "flex", flexDirection: "column", gap: 16 }}
      >
        {doubled.map((src, i) => (
          <ImageCard key={i} src={src} showDots={false} />
        ))}
      </div>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 80, background: "linear-gradient(to bottom, #0a0a0a, transparent)", pointerEvents: "none", zIndex: 1 }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 80, background: "linear-gradient(to top, #0a0a0a, transparent)", pointerEvents: "none", zIndex: 1 }} />
    </div>
  );
}

function HorizontalCarouselRow({ srcs, direction, slow }: { srcs: string[]; direction: "left" | "right"; slow?: boolean }) {
  const doubled = [...srcs, ...srcs];
  return (
    <div style={{ overflow: "hidden", position: "relative" }}>
      <div
        className={direction === "left" ? "carousel-track-left" : "carousel-track-right"}
        style={{ display: "flex", gap: 12, width: "max-content", animationDuration: slow ? "22.5s" : undefined }}
      >
        {doubled.map((src, i) => (
          <div key={i} style={{ flexShrink: 0, width: 195 }}>
            <div style={{
              borderRadius: 8,
              overflow: "hidden",
              border: "1px solid rgba(59,130,246,0.2)",
              background: "#0d1117",
              boxShadow: "0 0 12px rgba(59,130,246,0.08)",
            }}>
              <img src={src} alt="" style={{ width: "100%", display: "block", objectFit: "contain", height: 124, background: "#0d1117" }} />
            </div>
          </div>
        ))}
      </div>
      <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: 40, background: "linear-gradient(to right, #0a0a0a, transparent)", pointerEvents: "none", zIndex: 1 }} />
      <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: 40, background: "linear-gradient(to left, #0a0a0a, transparent)", pointerEvents: "none", zIndex: 1 }} />
    </div>
  );
}

/* ============================================================
   Hero Portafolio
   ============================================================ */
function HeroPortafolio() {
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
      <div style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: isMobile ? "32px 20px 60px" : "60px 24px",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: "center",
        gap: isMobile ? 32 : 64,
        minHeight: "calc(100vh - 68px)",
      }}>
        <div style={{ flex: isMobile ? "none" : "0 0 45%", maxWidth: isMobile ? "100%" : "45%", textAlign: isMobile ? "center" : "left" }}>
          <div className="hero-animate-badge" style={{ marginBottom: 20, display: "flex", justifyContent: isMobile ? "center" : "flex-start" }}>
            <span className="badge-blue">Portafolio</span>
          </div>

          <h1 className="hero-animate-title" style={{
            fontSize: isMobile ? "clamp(28px, 8vw, 40px)" : "clamp(32px, 4vw, 52px)",
            fontWeight: 800,
            color: "#fff",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            marginBottom: 20,
          }}>
            Explorá mis<br />
            <span className="gradient-text-blue">proyectos</span>
          </h1>

          <p className="hero-animate-desc" style={{
            fontSize: 16,
            color: "#a1a1aa",
            lineHeight: 1.7,
            marginBottom: 32,
          }}>
            Acá podés ver algunos de los proyectos que diseñé, cada uno con una idea, una estrategia y un objetivo claro.
          </p>

          <div className="hero-animate-btn" style={{ display: "flex", justifyContent: isMobile ? "center" : "flex-start" }}>
            <a
              href="#proyectos"
              className="btn-primary"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("proyectos")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Ver webs
            </a>
          </div>
        </div>

        <div style={{
          flex: isMobile ? "none" : "0 0 55%",
          maxWidth: isMobile ? "100%" : "55%",
          width: "100%",
          position: "relative",
        }} className="hero-animate-media">
          <div style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(circle at center, rgba(59,130,246,0.12) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />
          {isMobile ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 12, position: "relative", zIndex: 1 }}>
              <HorizontalCarouselRow srcs={CAROUSEL_LEFT} direction="left" slow />
              <HorizontalCarouselRow srcs={CAROUSEL_RIGHT} direction="right" slow />
            </div>
          ) : (
            <div style={{ display: "flex", gap: 16, position: "relative", zIndex: 1 }}>
              <div style={{ flex: 1 }}>
                <VerticalCarousel srcs={CAROUSEL_LEFT} direction="up" />
              </div>
              <div style={{ flex: 1 }}>
                <VerticalCarousel srcs={CAROUSEL_RIGHT} direction="down" />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Categorias Section — cinematic cover cards
   ============================================================ */
const CATEGORIAS = [
  {
    label: "Páginas institucionales",
    caption: "Webs para negocios reales",
    to: "/portafolio/institucionales",
    cover: "/portafolio/portadas-categorias/institucionales.png",
  },
  {
    label: "Landing pages",
    caption: "Páginas enfocadas en convertir",
    to: "/portafolio/landing-pages",
    cover: "/portafolio/portadas-categorias/landing-pages.png",
  },
  {
    label: "Proyectos propios",
    caption: "Ideas propias llevadas a la web",
    to: "/portafolio/proyectos-propios",
    cover: "/portafolio/portadas-categorias/proyectos-propios.png",
  },
  {
    label: "Propuestas",
    caption: "Webs diseñadas para perfiles reales",
    to: "/portafolio/propuestas",
    cover: "/portafolio/portadas-categorias/propuestas.png",
  },
];

function CategoriaCard({
  categoria,
  isMobile,
}: {
  categoria: (typeof CATEGORIAS)[number];
  isMobile: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const active = hovered && !isMobile;

  return (
    <Link
      to={categoria.to}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "block",
        textDecoration: "none",
        textAlign: "left",
        transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        transform: active ? "translateY(-6px)" : "translateY(0)",
      }}
    >
      {/* Nombre de la categoria */}
      <div style={{ marginBottom: 14, display: "flex", alignItems: "baseline", gap: 12 }}>
        <h3 style={{
          fontSize: isMobile ? 19 : 22,
          fontWeight: 700,
          letterSpacing: "-0.02em",
          color: active ? "#60a5fa" : "#fff",
          transition: "color 0.3s ease",
        }}>
          {categoria.label}
        </h3>
        <span style={{
          flex: 1,
          height: 1,
          background: `linear-gradient(to right, ${active ? "rgba(59,130,246,0.55)" : "rgba(59,130,246,0.18)"}, transparent)`,
          transition: "background 0.3s ease",
        }} />
      </div>

      {/* Portada cinematografica */}
      <div style={{
        position: "relative",
        borderRadius: 14,
        overflow: "hidden",
        border: `1px solid ${active ? "rgba(59,130,246,0.55)" : "rgba(59,130,246,0.16)"}`,
        background: "#0d1117",
        boxShadow: active
          ? "0 0 48px rgba(59,130,246,0.28), 0 20px 60px rgba(0,0,0,0.6)"
          : "0 4px 24px rgba(0,0,0,0.5)",
        transition: "border-color 0.35s ease, box-shadow 0.35s ease",
      }}>
        <img
          src={categoria.cover}
          alt={categoria.label}
          loading="lazy"
          style={{
            width: "100%",
            display: "block",
            aspectRatio: "16 / 9",
            objectFit: "cover",
            objectPosition: "top center",
            transform: active ? "scale(1.05)" : "scale(1)",
            transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />

        {/* Degradado inferior */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(to top, rgba(10,10,10,${active ? 0.82 : 0.9}) 0%, rgba(10,10,10,0.25) 42%, transparent 70%)`,
          transition: "background 0.35s ease",
          pointerEvents: "none",
        }} />

        {/* Velo azul en hover */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 50% 120%, rgba(59,130,246,0.32) 0%, transparent 62%)",
          opacity: active ? 1 : 0,
          transition: "opacity 0.4s ease",
          pointerEvents: "none",
        }} />

        {/* Pie de la portada */}
        <div style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          padding: isMobile ? "16px 18px" : "20px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}>
          <p style={{
            fontSize: isMobile ? 13 : 14,
            color: active ? "#e4e4e7" : "#a1a1aa",
            fontWeight: 500,
            transition: "color 0.3s ease",
          }}>
            {categoria.caption}
          </p>

          <span style={{
            flexShrink: 0,
            width: 36,
            height: 36,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: `1px solid ${active ? "rgba(59,130,246,0.8)" : "rgba(59,130,246,0.28)"}`,
            background: active ? "rgba(59,130,246,0.9)" : "rgba(10,10,10,0.55)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            transition: "background 0.3s ease, border-color 0.3s ease, transform 0.3s ease",
            transform: active ? "translateX(3px)" : "translateX(0)",
          }}>
            <svg width="15" height="15" fill="none" stroke={active ? "#fff" : "#60a5fa"} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" style={{ transition: "stroke 0.3s ease" }}>
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

function CategoriasSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section id="proyectos" style={{ padding: isMobile ? "80px 20px 100px" : "100px 24px 140px", background: "#0a0a0a", position: "relative", overflow: "hidden" }}>
      {/* Ambient glow */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 500,
        height: 300,
        background: "radial-gradient(ellipse, rgba(59,130,246,0.12) 0%, transparent 70%)",
        filter: "blur(60px)",
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: 0,
      }} />
      {/* Subtle grid background */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: "linear-gradient(rgba(59,130,246,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.03) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
        pointerEvents: "none",
        zIndex: 0,
      }} />

      <div style={{ maxWidth: 1160, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <h2 className="section-title animate-on-scroll" style={{ marginBottom: 16, fontSize: "clamp(24px, 3vw, 36px)", textAlign: "center" }}>
          Explorá los proyectos
        </h2>

        <p className="animate-on-scroll animate-para delay-1" style={{
          fontSize: 15,
          color: "#a1a1aa",
          lineHeight: 1.7,
          textAlign: "center",
          maxWidth: 560,
          margin: "0 auto 56px",
        }}>
          Cuatro formas de trabajo, cada una con su propio objetivo. Entrá a la que quieras ver.
        </p>

        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
          gap: isMobile ? 40 : 48,
        }}>
          {CATEGORIAS.map((cat, i) => (
            <div key={cat.to} className={`animate-on-scroll delay-${Math.min(i, 3)}`}>
              <CategoriaCard categoria={cat} isMobile={isMobile} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Portafolio() {
  useScrollAnimation();

  return (
    <>
      <HeroPortafolio />
      <CategoriasSection />
    </>
  );
}

/* ============================================================
   Project data
   ============================================================ */
interface Project {
  title: string;
  img: string;
  link: string | null;
  desktopOnly?: boolean;
  comingSoon?: boolean;
}

const PROJECTS: Record<string, Project[]> = {
  institucionales: [
    { title: "Inmobiliaria", img: "/portafolio/institucionales/inmobiliaria.png", link: "https://real-estate-design.replit.app/" },
    { title: "Neumáticos", img: "/portafolio/institucionales/neumaticos.png", link: "https://vite-deploy-helper.replit.app/" },
    { title: "Perfumes árabes", img: "/portafolio/institucionales/perfumes-arabes.png", link: "https://perfumes-arabes-kohl.vercel.app/" },
  ],
  "landing-pages": [
    { title: "Barbería", img: "/portafolio/landing-pages/barberia.png", link: "https://asset-organizer-sebapepere.replit.app/" },
    { title: "Clínica dental", img: "/portafolio/landing-pages/clinica-dental.png", link: "https://clinic-landing-page-sebapepere.replit.app/" },
    { title: "Clínica dermatológica", img: "/portafolio/landing-pages/clinica-dermatologica.png", link: "https://web-clinica-dermatologica.replit.app/" },
    { title: "Gym", img: "/portafolio/landing-pages/gym.png", link: "https://gym-landing-page.replit.app/#" },
    { title: "Pizza VIP", img: "/portafolio/landing-pages/pizza-vip.png", link: "https://pizza-vip.replit.app/" },
  ],
  "proyectos-propios": [
    { title: "Anillo Nova", img: "/portafolio/proyectos-propios/anillo-nova.png", link: null, comingSoon: true },
    { title: "Aurevia club de viajes", img: "/portafolio/proyectos-propios/aurevia-club-de-viajes.png", link: "https://vt.tiktok.com/ZSQwRfQob/" },
    { title: "Auriculares LYNQ", img: "/portafolio/proyectos-propios/auriculares-lynq.png", link: "https://vt.tiktok.com/ZSQwRLqWw/", desktopOnly: true },
    { title: "JBL", img: "/portafolio/proyectos-propios/jbl.png", link: "https://vt.tiktok.com/ZSQwRdbAM/", desktopOnly: true },
    { title: "Laptop Nexus", img: "/portafolio/proyectos-propios/laptop-nexus.png", link: "https://vt.tiktok.com/ZSQwRjj6Y/", desktopOnly: true },
    { title: "Robot", img: "/portafolio/proyectos-propios/robot.png", link: "https://sebapepere-code.github.io/titan-ai/", desktopOnly: true },
    { title: "Starbucks", img: "/portafolio/proyectos-propios/starbucks.png", link: "https://starbuks-psi.vercel.app/", desktopOnly: true },
    { title: "Yate de lujo", img: "/portafolio/proyectos-propios/yate.png", link: "https://yate-de-lujo.vercel.app/", desktopOnly: true },
  ],
};

const CATEGORY_META: Record<string, { title: string; description: string }> = {
  institucionales: {
    title: "Páginas institucionales",
    description: "Webs completas desarrolladas para negocios reales. Con estrategia, diseño personalizado y enfoque en el objetivo del cliente.",
  },
  "landing-pages": {
    title: "Landing pages",
    description: "Páginas de conversión diseñadas para capturar la atención y convertir visitas en contactos o ventas.",
  },
  "proyectos-propios": {
    title: "Proyectos propios",
    description: "Webs ficticias, rediseños y páginas de marcas conocidas desarrolladas para explorar estilos, técnicas y nuevas ideas.",
  },
  propuestas: {
    title: "Propuestas",
    description: "Páginas que diseñé para perfiles reales de Instagram, con el objetivo de mostrarles una propuesta personalizada. Entrá a cada una para ver el análisis que hice antes de desarrollarla.",
  },
};

/* ============================================================
   Propuestas — data
   ============================================================ */
interface AnalisisBloque {
  titulo: string;
  texto: string;
  pasos?: string[];
  recorrido?: string[];
}

interface Propuesta {
  slug: string;
  nombre: string;
  rubro: string;
  handle: string;
  instagram: string;
  web: string;
  /** Proporción real de la captura del perfil, para no recortarla ni provocar layout shift. */
  perfilRatio: string;
  resumen: string;
  bloques: AnalisisBloque[];
  cierre?: string;
}

const PROPUESTAS: Propuesta[] = [
  {
    slug: "etina-beauty",
    nombre: "Etina Beauty",
    rubro: "Curso de extensiones de pestañas",
    handle: "@etinabeauty",
    instagram: "https://www.instagram.com/etinabeauty/",
    web: "https://etina-beauty.vercel.app/",
    perfilRatio: "632 / 267",
    resumen: "Una estructura enfocada en conversión para un curso que ya tenía todo el valor, pero no la presentación.",
    bloques: [
      {
        titulo: "El análisis",
        texto: "Antes de diseñar la página, analicé la propuesta actual de Etina Beauty, el curso online, cómo están presentando la oferta y principalmente a qué tipo de persona buscan llegar.",
      },
      {
        titulo: "La conclusión",
        texto: "A partir de eso, llegué a la conclusión de que no hacía falta agregar más información, sino ordenar y presentar de una manera mucho más atractiva todo el valor que ya tiene el curso: la formación profesional, la certificación, el acompañamiento, las técnicas de pestañas y también la parte de negocio.",
      },
      {
        titulo: "La estructura",
        texto: "Por eso planteé una estructura enfocada en conversión:",
        pasos: [
          "Un VSL que genere interés y explique la transformación",
          "Testimonios en video para generar confianza",
          "Una sección de diferenciales para reforzar el valor del curso",
          "Preguntas frecuentes para resolver objeciones",
          "Un CTA directo a la compra",
        ],
      },
      {
        titulo: "El diseño",
        texto: "A nivel visual, busqué adaptar la estética femenina y sofisticada de la marca a una experiencia más premium y moderna, utilizando una base blanca, violetas suaves, imágenes de la mentora y del propio curso, junto con elementos decorativos sutiles.",
      },
      {
        titulo: "El recorrido",
        texto: "La idea fue que cada sección tenga un propósito dentro del proceso de decisión y que la persona pase naturalmente de:",
        recorrido: ["me interesa", "confío", "entiendo el valor", "quiero hacerlo"],
      },
    ],
  },
  {
    slug: "tomy-lalanne",
    nombre: "Tomy Lalanne",
    rubro: "Mentoría de e-commerce",
    handle: "@tomylalanne",
    instagram: "https://www.instagram.com/tomylalanne/",
    web: "https://tomy-lalanne-landing.vercel.app/",
    perfilRatio: "616 / 226",
    resumen: "Una landing negra y dorada pensada para convertir el tráfico de Instagram en llamadas agendadas.",
    bloques: [
      {
        titulo: "El análisis",
        texto: "Antes de desarrollar la web, analicé el perfil, su modelo de negocio, el tipo de contenido que publica y, sobre todo, el público al que busca atraer: jóvenes interesados en emprender con e-commerce, generar mucho dinero y alcanzar una mayor libertad financiera.",
      },
      {
        titulo: "El contexto",
        texto: "También tuve en cuenta que actualmente concentra su captación principalmente en Instagram, que utiliza sus propios resultados y los de sus alumnos como principal elemento de autoridad y que no contaba con una web que organizara y potenciara todo ese proceso.",
      },
      {
        titulo: "La conclusión",
        texto: "A partir de eso, llegué a la conclusión de que lo más conveniente era crear una landing page estratégica y enfocada en conversión, en lugar de una web tradicional.",
      },
      {
        titulo: "La estructura",
        texto: "Por eso estructuré la página de esta manera:",
        pasos: [
          "Un VSL que presenta la propuesta desde el primer momento",
          "Casos de éxito para generar confianza",
          "Una sección que explica de forma clara cómo funciona el programa",
          "Preguntas frecuentes para eliminar objeciones",
          "Un llamado a la acción orientado a agendar una llamada",
        ],
      },
      {
        titulo: "El diseño",
        texto: "A nivel visual, elegí una estética negra y dorada, premium y sofisticada, porque está directamente relacionada con la percepción de éxito, crecimiento y alto nivel que transmite su marca personal.",
      },
    ],
    cierre: "De esta manera, tanto el contenido como la estructura y el diseño trabajan en conjunto para transformar el tráfico que llega desde Instagram en personas interesadas y preparadas para dar el siguiente paso.",
  },
  {
    slug: "sofi-y-flor",
    nombre: "Sofi y Flor",
    rubro: "Estudio contable digital",
    handle: "@sf.estudiocontabledigital",
    instagram: "https://www.instagram.com/sf.estudiocontabledigital/",
    web: "https://sf-estudio-contable.vercel.app/",
    perfilRatio: "635 / 256",
    resumen: "Una web simple y clara para un rubro que muchas veces se siente complejo o distante.",
    bloques: [
      {
        titulo: "El análisis",
        texto: "Antes de estructurar la web, analicé el posicionamiento del estudio, los servicios que ofrece, el tipo de cliente al que se dirige y, sobre todo, las dudas y necesidades que tiene ese público al momento de buscar asesoramiento contable.",
      },
      {
        titulo: "La conclusión",
        texto: "A partir de eso, entendí que la web no tenía que limitarse a mostrar los servicios, sino transmitir confianza, cercanía y claridad desde el primer momento, porque estamos hablando de un rubro que muchas veces puede sentirse complejo o distante.",
      },
      {
        titulo: "La estructura",
        texto: "Por eso planteé una estructura simple y fácil de recorrer, con el contenido organizado de manera que:",
        pasos: [
          "Primero genere confianza",
          "Después explique claramente qué pueden resolver",
          "Y finalmente lleve a la persona a tomar acción",
        ],
      },
      {
        titulo: "El diseño",
        texto: "A nivel visual, mantuve la identidad que ya tienen en redes, pero llevándola a una experiencia más profesional, limpia y moderna, buscando que todo lo que aparece en la página tenga una función concreta y que el diseño acompañe el mensaje en lugar de competir con él.",
      },
    ],
  },
  {
    slug: "jota-arevalo",
    nombre: "Jota Arévalo",
    rubro: "Créditos hipotecarios",
    handle: "@jotaarevalofinanzas",
    instagram: "https://www.instagram.com/jotaarevalofinanzas/",
    web: "https://jota-arevalo-landing.vercel.app/",
    perfilRatio: "645 / 254",
    resumen: "Confianza, experiencia y claridad: los tres factores que necesita alguien antes de pedir un crédito.",
    bloques: [
      {
        titulo: "El análisis",
        texto: "Para hacer esta web, primero analicé el rubro, el modelo de negocio, el contenido que Jota publica en Instagram y, sobre todo, qué necesita sentir una persona antes de confiarle una decisión financiera tan importante como un crédito hipotecario.",
      },
      {
        titulo: "La conclusión",
        texto: "A partir de eso, llegué a la conclusión de que había que desarrollar una landing enfocada en generar confianza y convertir visitas en conversaciones por WhatsApp.",
      },
      {
        titulo: "La estructura",
        texto: "Por eso estructuré la página siguiendo el recorrido natural del potencial cliente:",
        pasos: [
          "Primero explicarle claramente qué puede conseguir con Jota",
          "Después mostrarle cómo funciona el proceso",
          "Demostrarle que otras personas ya confiaron en él",
          "Reforzar su autoridad mostrando su experiencia y trayectoria",
          "Terminar con un CTA directo y sin fricciones",
        ],
      },
      {
        titulo: "El diseño",
        texto: "En cuanto al diseño, me basé en su identidad de azul, amarillo y blanco y busqué una estética moderna, profesional y limpia, utilizando fotografías reales, jerarquía visual, espacios amplios y elementos minimalistas.",
      },
    ],
    cierre: "De esta forma, tanto el contenido como la estructura y el diseño están pensados específicamente para transmitir confianza, experiencia y claridad, que son los tres factores más importantes para que una persona que está buscando un crédito se anime a dar el siguiente paso.",
  },
  {
    slug: "danprodits",
    nombre: "Dani Cervantes",
    rubro: "Edición de video de alta retención",
    handle: "@danprodits",
    instagram: "https://www.instagram.com/danprodits/",
    web: "https://danprodits-landing.vercel.app/",
    perfilRatio: "614 / 235",
    resumen: "Dark mode premium con acentos rojos para despegarlo del concepto de editor barato.",
    bloques: [
      {
        titulo: "El punto de partida",
        texto: "Para armar esta propuesta, arranqué analizando a fondo la marca de Dan, su presencia en Instagram y el dolor de su cliente ideal, llegando a la conclusión de que él no vende simple edición, sino un sistema integral de alto valor (la Fórmula NOEC) para creadores y emprendedores que necesitan escalar su autoridad sin perder tiempo.",
      },
      {
        titulo: "La estrategia",
        texto: "A partir de ahí, definí que la mejor estrategia era una estructura web 100% orientada a la conversión:",
        pasos: [
          "Un Hero con un VSL que vaya directo al grano",
          "Pura prueba social",
          "La explicación de su metodología",
          "Un cierre sin fricciones directo al calendario",
        ],
      },
      {
        titulo: "El diseño",
        texto: "Elegí respaldar todo este embudo con un diseño visual premium y minimalista en dark mode, usando acentos rojos y detalles sutiles de glassmorphism, porque es exactamente la estética elegante y de alta gama que necesitamos para proyectar autoridad instantánea, despegarlo del concepto de “editor barato” y convencer a ese cliente high-ticket de que somos la opción definitiva para su negocio.",
      },
    ],
  },
  {
    slug: "grecco-editor",
    nombre: "Grecco Editor",
    rubro: "Edición de video",
    handle: "@grecco.editor",
    instagram: "https://www.instagram.com/grecco.editor/",
    web: "https://grecco-editor.vercel.app/",
    perfilRatio: "617 / 217",
    resumen: "Una web que funciona como herramienta de conversión, no como un portfolio más.",
    bloques: [
      {
        titulo: "El análisis",
        texto: "Antes de diseñar la web analicé su Instagram, el tipo de contenido que publica, los servicios que ofrece, la forma en la que actualmente consigue clientes y, sobre todo, a quién está dirigido su trabajo.",
      },
      {
        titulo: "La conclusión",
        texto: "Llegué a la conclusión de que la web tenía que funcionar principalmente como una herramienta de conversión y no simplemente como un portfolio, porque actualmente la comunicación depende mucho del contacto por Instagram y correo.",
      },
      {
        titulo: "La estructura",
        texto: "Por eso planteé una estructura corta y estratégica:",
        pasos: [
          "Primero presentamos a Felipe y dejamos claro qué hace",
          "Después mostramos directamente las ediciones de sus clientes y testimonios para generar confianza",
          "Luego explicamos sus servicios, proceso y diferenciales",
          "Y finalmente llevamos al visitante al contacto",
        ],
      },
      {
        titulo: "El diseño",
        texto: "A nivel visual opté por una estética negra, minimalista y cinematográfica, con blanco y un amarillo inspirado en su propio cabello, utilizando videos, texturas y elementos gráficos para que la identidad de la web esté alineada con lo que él hace y, al mismo tiempo, no compita con sus ediciones.",
      },
    ],
    cierre: "En conjunto, tanto el contenido como la estructura y el diseño están pensados para que alguien que llegue desde Instagram entienda rápidamente quién es, vea la calidad de su trabajo, tenga motivos para confiar en él y pueda contactarlo con la menor fricción posible.",
  },
];

const propuestaBySlug = (slug: string) => PROPUESTAS.find((p) => p.slug === slug);

const propuestaPortada = (slug: string) => `/portafolio/propuestas/${slug}/portada.png`;
const propuestaPerfil = (slug: string) => `/portafolio/propuestas/${slug}/perfil.png`;

/* ============================================================
   Desktop Only Modal
   ============================================================ */
function DesktopOnlyModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.8)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        zIndex: 9000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#0f0f0f",
          border: "1px solid rgba(59,130,246,0.4)",
          borderRadius: 16,
          padding: "32px 28px",
          maxWidth: 340,
          width: "100%",
          textAlign: "center",
          boxShadow: "0 0 40px rgba(59,130,246,0.2), 0 0 80px rgba(59,130,246,0.08)",
        }}
      >
        <div style={{
          width: 48, height: 48,
          background: "rgba(59,130,246,0.1)",
          border: "1px solid rgba(59,130,246,0.3)",
          borderRadius: 12,
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 20px",
        }}>
          <svg width="22" height="22" fill="none" stroke="#3b82f6" strokeWidth="2" viewBox="0 0 24 24">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
          </svg>
        </div>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 12 }}>
          Solo para computadora
        </h3>
        <p style={{ fontSize: 14, color: "#a1a1aa", lineHeight: 1.7, marginBottom: 24 }}>
          Esta página está hecha solo para computadora. Abrila desde una PC para verla correctamente.
        </p>
        <button
          onClick={onClose}
          className="btn-primary"
          style={{ width: "100%", border: "none" }}
        >
          Entendido
        </button>
      </div>
    </div>
  );
}

/* ============================================================
   Project Card
   ============================================================ */
function ProjectCard({
  project,
  isMobile,
  isPropio,
  onDesktopOnly,
}: {
  project: Project;
  isMobile: boolean;
  isPropio: boolean;
  onDesktopOnly: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    if (project.comingSoon || !project.link) return;
    if (
      isPropio &&
      project.desktopOnly &&
      isMobile &&
      (project.title === "Robot" || project.title === "Starbucks")
    ) {
      onDesktopOnly();
      return;
    }
    window.open(project.link, "_blank", "noreferrer");
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#0d0d0d",
        border: `1px solid ${hovered && !project.comingSoon ? "rgba(59,130,246,0.5)" : "rgba(59,130,246,0.15)"}`,
        borderRadius: 12,
        overflow: "hidden",
        cursor: project.comingSoon ? "default" : "pointer",
        transition: "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
        transform: hovered && !project.comingSoon ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered && !project.comingSoon
          ? "0 8px 32px rgba(59,130,246,0.2), 0 0 0 1px rgba(59,130,246,0.15)"
          : "0 2px 12px rgba(0,0,0,0.4)",
      }}
    >
      <div style={{ position: "relative", overflow: "hidden" }}>
        <img
          src={project.img}
          alt={project.title}
          style={{
            width: "100%",
            display: "block",
            objectFit: "cover",
            height: 200,
            transition: "transform 0.4s ease",
            transform: hovered && !project.comingSoon ? "scale(1.04)" : "scale(1)",
          }}
        />
        {project.comingSoon && (
          <div style={{
            position: "absolute", inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{
              background: "rgba(59,130,246,0.15)",
              border: "1px solid rgba(59,130,246,0.4)",
              color: "#60a5fa",
              fontSize: 12, fontWeight: 600,
              padding: "6px 14px", borderRadius: 100,
              backdropFilter: "blur(8px)",
            }}>
              Próximamente
            </span>
          </div>
        )}
      </div>

      <div style={{ padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <p style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>
          {project.title}
        </p>
        {!project.comingSoon && (
          <svg
            width="14" height="14" fill="none"
            stroke={hovered ? "#3b82f6" : "#555"}
            strokeWidth="2" viewBox="0 0 24 24"
            style={{ flexShrink: 0, transition: "stroke 0.2s ease" }}
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   Propuesta Card — grid de la categoria Propuestas
   ============================================================ */
function PropuestaCard({ propuesta, isMobile }: { propuesta: Propuesta; isMobile: boolean }) {
  const [hovered, setHovered] = useState(false);
  const active = hovered && !isMobile;

  return (
    <Link
      to={`/portafolio/propuestas/${propuesta.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "block",
        textDecoration: "none",
        background: "#0d0d0d",
        border: `1px solid ${active ? "rgba(59,130,246,0.5)" : "rgba(59,130,246,0.15)"}`,
        borderRadius: 14,
        overflow: "hidden",
        transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
        transform: active ? "translateY(-5px)" : "translateY(0)",
        boxShadow: active
          ? "0 12px 40px rgba(59,130,246,0.22), 0 0 0 1px rgba(59,130,246,0.14)"
          : "0 2px 12px rgba(0,0,0,0.4)",
      }}
    >
      <div style={{ position: "relative", overflow: "hidden" }}>
        <img
          src={propuestaPortada(propuesta.slug)}
          alt={propuesta.nombre}
          loading="lazy"
          style={{
            width: "100%",
            display: "block",
            aspectRatio: "16 / 9",
            objectFit: "cover",
            objectPosition: "top center",
            transform: active ? "scale(1.05)" : "scale(1)",
            transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(10,10,10,0.75) 0%, transparent 55%)",
          pointerEvents: "none",
        }} />
        <span style={{
          position: "absolute",
          top: 12,
          left: 12,
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.04em",
          color: "#60a5fa",
          background: "rgba(10,10,10,0.7)",
          border: "1px solid rgba(59,130,246,0.3)",
          borderRadius: 100,
          padding: "5px 11px",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}>
          {propuesta.handle}
        </span>
      </div>

      <div style={{ padding: "16px 18px 18px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 6 }}>
          <p style={{ fontSize: 16, fontWeight: 700, color: "#fff", letterSpacing: "-0.01em" }}>
            {propuesta.nombre}
          </p>
          <svg
            width="15" height="15" fill="none"
            stroke={active ? "#3b82f6" : "#555"}
            strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"
            style={{ flexShrink: 0, transition: "stroke 0.25s ease, transform 0.25s ease", transform: active ? "translateX(3px)" : "none" }}
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </div>
        <p style={{ fontSize: 13, color: "#71717a", marginBottom: 10 }}>{propuesta.rubro}</p>
        <p style={{ fontSize: 13.5, color: "#a1a1aa", lineHeight: 1.65 }}>{propuesta.resumen}</p>
      </div>
    </Link>
  );
}

/* ============================================================
   Category Page
   ============================================================ */
export function CategoriaPortafolio({ categoria }: { categoria: string }) {
  useScrollAnimation();
  const [isMobile, setIsMobile] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const meta = CATEGORY_META[categoria];
  const projects = PROJECTS[categoria];
  const isPropio = categoria === "proyectos-propios";
  const isPropuestas = categoria === "propuestas";

  if (!meta || (!projects && !isPropuestas)) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", paddingTop: 68 }}>
        <p style={{ color: "#a1a1aa" }}>Categoría no encontrada</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", paddingTop: 68 }}>
      {showModal && <DesktopOnlyModal onClose={() => setShowModal(false)} />}

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 24px" }}>
        <Link
          to="/portafolio"
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            color: "#a1a1aa", fontSize: 14, cursor: "pointer",
            marginBottom: 48, textDecoration: "none", transition: "color 0.2s ease",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#3b82f6"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#a1a1aa"; }}
        >
          ← Volver al portafolio
        </Link>

        <h1 className="animate-on-scroll" style={{
          fontSize: "clamp(28px, 4vw, 48px)",
          fontWeight: 800, color: "#fff",
          marginBottom: 16, letterSpacing: "-0.02em",
        }}>
          {meta.title}
        </h1>

        <p className="animate-on-scroll animate-para delay-1" style={{
          fontSize: 16, color: "#a1a1aa",
          lineHeight: 1.7, maxWidth: 600, marginBottom: 64,
        }}>
          {meta.description}
        </p>

        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 24,
        }}>
          {isPropuestas
            ? PROPUESTAS.map((propuesta, i) => (
                <div key={propuesta.slug} className={`animate-on-scroll delay-${Math.min(i, 3)}`}>
                  <PropuestaCard propuesta={propuesta} isMobile={isMobile} />
                </div>
              ))
            : projects.map((project, i) => (
                <div key={i} className={`animate-on-scroll delay-${Math.min(i, 3)}`}>
                  <ProjectCard
                    project={project}
                    isMobile={isMobile}
                    isPropio={isPropio}
                    onDesktopOnly={() => setShowModal(true)}
                  />
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   Propuesta — media clickeable (perfil + portada)
   ============================================================ */
function MediaLink({
  href,
  src,
  alt,
  label,
  hint,
  icon,
  ratio,
  isMobile,
}: {
  href: string;
  src: string;
  alt: string;
  label: string;
  hint: string;
  icon: "instagram" | "external";
  ratio: string;
  isMobile: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const active = hovered && !isMobile;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "block",
        textDecoration: "none",
        transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        transform: active ? "translateY(-5px)" : "translateY(0)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <span style={{
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: active ? "#60a5fa" : "#71717a",
          transition: "color 0.3s ease",
        }}>
          {label}
        </span>
        <span style={{
          flex: 1,
          height: 1,
          background: `linear-gradient(to right, ${active ? "rgba(59,130,246,0.5)" : "rgba(59,130,246,0.14)"}, transparent)`,
          transition: "background 0.3s ease",
        }} />
      </div>

      <div style={{
        position: "relative",
        borderRadius: 14,
        overflow: "hidden",
        border: `1px solid ${active ? "rgba(59,130,246,0.55)" : "rgba(59,130,246,0.16)"}`,
        background: "#0d1117",
        boxShadow: active
          ? "0 0 44px rgba(59,130,246,0.26), 0 18px 50px rgba(0,0,0,0.6)"
          : "0 4px 22px rgba(0,0,0,0.5)",
        transition: "border-color 0.35s ease, box-shadow 0.35s ease",
      }}>
        <img
          src={src}
          alt={alt}
          loading="lazy"
          style={{
            width: "100%",
            display: "block",
            aspectRatio: ratio,
            objectFit: "cover",
            objectPosition: "top center",
            transform: active ? "scale(1.04)" : "scale(1)",
            transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />

        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0.15) 45%, transparent 68%)",
          pointerEvents: "none",
        }} />

        <div style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 50% 120%, rgba(59,130,246,0.3) 0%, transparent 60%)",
          opacity: active ? 1 : 0,
          transition: "opacity 0.4s ease",
          pointerEvents: "none",
        }} />

        <div style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          padding: isMobile ? "14px 16px" : "16px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
        }}>
          <span style={{
            fontSize: isMobile ? 13 : 13.5,
            fontWeight: 600,
            color: active ? "#fff" : "#d4d4d8",
            transition: "color 0.3s ease",
          }}>
            {hint}
          </span>

          <span style={{
            flexShrink: 0,
            width: 34,
            height: 34,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: `1px solid ${active ? "rgba(59,130,246,0.85)" : "rgba(59,130,246,0.3)"}`,
            background: active ? "rgba(59,130,246,0.92)" : "rgba(10,10,10,0.6)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            transition: "background 0.3s ease, border-color 0.3s ease",
          }}>
            {icon === "instagram" ? (
              <svg width="15" height="15" fill="none" stroke={active ? "#fff" : "#60a5fa"} strokeWidth="2" viewBox="0 0 24 24" style={{ transition: "stroke 0.3s ease" }}>
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            ) : (
              <svg width="15" height="15" fill="none" stroke={active ? "#fff" : "#60a5fa"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" style={{ transition: "stroke 0.3s ease" }}>
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            )}
          </span>
        </div>
      </div>
    </a>
  );
}

/* ============================================================
   Propuesta — bloque de analisis
   ============================================================ */
function BloqueAnalisis({ bloque, index, isMobile }: { bloque: AnalisisBloque; index: number; isMobile: boolean }) {
  return (
    <div className="animate-on-scroll" style={{ position: "relative", paddingLeft: isMobile ? 0 : 78 }}>
      {/* Numero grande */}
      {!isMobile && (
        <span style={{
          position: "absolute",
          left: 0,
          top: -8,
          fontSize: 46,
          fontWeight: 800,
          lineHeight: 1,
          letterSpacing: "-0.04em",
          color: "transparent",
          WebkitTextStroke: "1px rgba(59,130,246,0.32)",
          userSelect: "none",
        }}>
          {String(index + 1).padStart(2, "0")}
        </span>
      )}

      <h3 style={{
        fontSize: isMobile ? 18 : 20,
        fontWeight: 700,
        color: "#fff",
        letterSpacing: "-0.015em",
        marginBottom: 12,
        display: "flex",
        alignItems: "center",
        gap: 10,
      }}>
        {isMobile && (
          <span style={{ fontSize: 13, fontWeight: 700, color: "#3b82f6" }}>
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
        {bloque.titulo}
      </h3>

      <p style={{
        fontSize: isMobile ? 15 : 15.5,
        color: "#a1a1aa",
        lineHeight: 1.8,
      }}>
        {bloque.texto}
      </p>

      {/* Pasos numerados */}
      {bloque.pasos && (
        <div style={{ marginTop: 22, display: "flex", flexDirection: "column", gap: 10 }}>
          {bloque.pasos.map((paso, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 14,
                padding: isMobile ? "13px 15px" : "14px 18px",
                borderRadius: 10,
                border: "1px solid rgba(59,130,246,0.14)",
                background: "linear-gradient(to right, rgba(59,130,246,0.06), rgba(59,130,246,0.015))",
              }}
            >
              <span style={{
                flexShrink: 0,
                width: 24,
                height: 24,
                borderRadius: "50%",
                background: "rgba(59,130,246,0.14)",
                border: "1px solid rgba(59,130,246,0.35)",
                color: "#60a5fa",
                fontSize: 11.5,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 1,
              }}>
                {i + 1}
              </span>
              <span style={{ fontSize: isMobile ? 14 : 14.5, color: "#d4d4d8", lineHeight: 1.6 }}>
                {paso}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Recorrido en chips */}
      {bloque.recorrido && (
        <div style={{
          marginTop: 22,
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: isMobile ? 8 : 10,
        }}>
          {bloque.recorrido.map((etapa, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: isMobile ? 8 : 10 }}>
              <span style={{
                fontSize: isMobile ? 13 : 14,
                fontWeight: 600,
                color: "#fff",
                padding: isMobile ? "8px 14px" : "10px 18px",
                borderRadius: 100,
                border: "1px solid rgba(59,130,246,0.3)",
                background: "rgba(59,130,246,0.09)",
                whiteSpace: "nowrap",
              }}>
                {etapa}
              </span>
              {i < bloque.recorrido!.length - 1 && (
                <svg width="14" height="14" fill="none" stroke="#3b82f6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" style={{ flexShrink: 0, opacity: 0.7 }}>
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ============================================================
   Propuesta — pagina individual
   ============================================================ */
function PropuestaIndividual({ propuesta }: { propuesta: Propuesta }) {
  useScrollAnimation();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 900);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", paddingTop: 68, position: "relative", overflow: "hidden" }}>
      {/* Glow ambiental superior */}
      <div style={{
        position: "absolute",
        top: -80,
        left: "50%",
        transform: "translateX(-50%)",
        width: 900,
        height: 480,
        background: "radial-gradient(ellipse, rgba(59,130,246,0.13) 0%, transparent 70%)",
        filter: "blur(70px)",
        pointerEvents: "none",
        zIndex: 0,
      }} />
      {/* Grid sutil */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 700,
        backgroundImage: "linear-gradient(rgba(59,130,246,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.03) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
        maskImage: "linear-gradient(to bottom, #000 0%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, #000 0%, transparent 100%)",
        pointerEvents: "none",
        zIndex: 0,
      }} />

      <div style={{ maxWidth: 1080, margin: "0 auto", padding: isMobile ? "48px 20px 80px" : "72px 24px 120px", position: "relative", zIndex: 1 }}>
        <Link
          to="/portafolio/propuestas"
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            color: "#a1a1aa", fontSize: 14, cursor: "pointer",
            marginBottom: isMobile ? 36 : 48, textDecoration: "none", transition: "color 0.2s ease",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#3b82f6"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#a1a1aa"; }}
        >
          ← Volver a las propuestas
        </Link>

        {/* Encabezado */}
        <div style={{ marginBottom: isMobile ? 44 : 64 }}>
          <div className="animate-on-scroll" style={{ marginBottom: 20 }}>
            <span className="badge-blue">Propuesta</span>
          </div>

          <h1 className="animate-on-scroll delay-1" style={{
            fontSize: isMobile ? "clamp(30px, 9vw, 42px)" : "clamp(40px, 5vw, 60px)",
            fontWeight: 800,
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
            marginBottom: 14,
          }}>
            <span className="gradient-text-blue">{propuesta.nombre}</span>
          </h1>

          <div className="animate-on-scroll delay-2" style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
            marginBottom: 20,
          }}>
            <span style={{ fontSize: isMobile ? 14 : 15, color: "#a1a1aa" }}>{propuesta.rubro}</span>
            <span style={{ width: 3, height: 3, borderRadius: "50%", background: "#3f3f46" }} />
            <span style={{ fontSize: isMobile ? 14 : 15, color: "#60a5fa", fontWeight: 500 }}>{propuesta.handle}</span>
          </div>

          <p className="animate-on-scroll animate-para delay-3" style={{
            fontSize: isMobile ? 15 : 16.5,
            color: "#d4d4d8",
            lineHeight: 1.75,
            maxWidth: 620,
          }}>
            {propuesta.resumen}
          </p>
        </div>

        {/* Perfil + portada, ambos clickeables */}
        <div className="animate-on-scroll" style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1.3fr 1fr",
          gap: isMobile ? 32 : 32,
          alignItems: "start",
          marginBottom: isMobile ? 64 : 96,
        }}>
          <MediaLink
            href={propuesta.web}
            src={propuestaPortada(propuesta.slug)}
            alt={`Página diseñada para ${propuesta.nombre}`}
            label="La página que diseñé"
            hint="Entrar a la página"
            icon="external"
            ratio="16 / 9"
            isMobile={isMobile}
          />

          <MediaLink
            href={propuesta.instagram}
            src={propuestaPerfil(propuesta.slug)}
            alt={`Perfil de Instagram de ${propuesta.nombre}`}
            label="El perfil que analicé"
            hint="Ver el perfil"
            icon="instagram"
            ratio={propuesta.perfilRatio}
            isMobile={isMobile}
          />
        </div>

        {/* Analisis */}
        <div style={{ maxWidth: 760 }}>
          <div className="animate-on-scroll" style={{ marginBottom: isMobile ? 36 : 48 }}>
            <span style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#3b82f6",
              display: "block",
              marginBottom: 14,
            }}>
              El análisis
            </span>
            <h2 style={{
              fontSize: isMobile ? "clamp(24px, 7vw, 30px)" : "clamp(28px, 3.4vw, 38px)",
              fontWeight: 800,
              color: "#fff",
              lineHeight: 1.2,
              letterSpacing: "-0.025em",
            }}>
              Por qué la diseñé así
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? 40 : 52 }}>
            {propuesta.bloques.map((bloque, i) => (
              <BloqueAnalisis key={i} bloque={bloque} index={i} isMobile={isMobile} />
            ))}
          </div>

          {/* Cierre destacado */}
          {propuesta.cierre && (
            <div className="animate-on-scroll" style={{
              marginTop: isMobile ? 44 : 60,
              padding: isMobile ? "24px 22px" : "32px 34px",
              borderRadius: 16,
              border: "1px solid rgba(59,130,246,0.22)",
              background: "linear-gradient(135deg, rgba(59,130,246,0.09) 0%, rgba(59,130,246,0.02) 100%)",
              boxShadow: "0 0 40px rgba(59,130,246,0.07)",
              position: "relative",
            }}>
              <span style={{
                position: "absolute",
                top: isMobile ? 14 : 18,
                left: isMobile ? 20 : 26,
                fontSize: 52,
                lineHeight: 1,
                color: "rgba(59,130,246,0.18)",
                fontWeight: 800,
                userSelect: "none",
              }}>
                “
              </span>
              <p style={{
                fontSize: isMobile ? 15.5 : 17,
                color: "#e4e4e7",
                lineHeight: 1.8,
                fontWeight: 500,
                position: "relative",
                paddingLeft: isMobile ? 18 : 26,
              }}>
                {propuesta.cierre}
              </p>
            </div>
          )}
        </div>

        {/* CTA final */}
        <div className="animate-on-scroll" style={{
          marginTop: isMobile ? 64 : 96,
          paddingTop: isMobile ? 44 : 56,
          borderTop: "1px solid #1f1f1f",
          textAlign: "center",
        }}>
          <h3 style={{
            fontSize: isMobile ? 20 : 24,
            fontWeight: 700,
            color: "#fff",
            marginBottom: 12,
            letterSpacing: "-0.02em",
          }}>
            ¿Querés una propuesta así para tu negocio?
          </h3>
          <p style={{ fontSize: 15, color: "#a1a1aa", lineHeight: 1.7, marginBottom: 28, maxWidth: 460, margin: "0 auto 28px" }}>
            Escribime y analizamos juntos qué necesita tu marca.
          </p>
          <a
            href="https://wa.link/eyf9h6"
            target="_blank"
            rel="noreferrer"
            className="btn-primary"
            style={{ display: "inline-block" }}
          >
            Agendá una llamada
          </a>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   Project Individual
   ============================================================ */
export function ProyectoIndividual({ categoria, proyecto }: { categoria: string; proyecto: string }) {
  const propuesta = categoria === "propuestas" ? propuestaBySlug(proyecto) : undefined;

  if (propuesta) {
    return <PropuestaIndividual propuesta={propuesta} />;
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", paddingTop: 68 }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "80px 24px" }}>
        <Link
          to={`/portafolio/${categoria}`}
          style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#a1a1aa", fontSize: 14, cursor: "pointer", marginBottom: 48, textDecoration: "none", transition: "color 0.2s ease" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#3b82f6"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#a1a1aa"; }}
        >
          ← Volver al portafolio
        </Link>
        <h1 style={{ fontSize: 40, fontWeight: 800, color: "#fff", marginBottom: 16 }}>
          {proyecto.replace(/-/g, " ")}
        </h1>
        <p style={{ color: "#a1a1aa", fontSize: 15, lineHeight: 1.7, marginBottom: 48 }}>
          Descripción del proyecto próximamente.
        </p>
      </div>
    </div>
  );
}

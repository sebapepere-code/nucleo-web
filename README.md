# Núcleo Web

Sitio web de la agencia **Núcleo Web**. SPA construida con React 19 + Vite + TypeScript.
Estilos en CSS puro (`src/index.css`) — sin librerías de UI ni Tailwind.

## Desarrollo

```bash
npm install
npm run dev
```

## Build de producción

```bash
npm run build      # genera dist/
npm run preview    # sirve el build localmente
```

## Deploy en Vercel

El repo está listo para Vercel sin configuración adicional:

- **Framework preset:** Vite
- **Build command:** `npm run build`
- **Output directory:** `dist`

`vercel.json` incluye el rewrite de SPA para que las rutas internas
(por ejemplo `/portafolio/propuestas/etina-beauty`) funcionen al recargar.

## Estructura

```
src/
  App.tsx              Router principal
  main.tsx             Entrada React
  index.css            Todos los estilos globales
  components/          Navbar, Footer, VideoPlayer, AnimatedCard
  hooks/               useScrollAnimation, use-mobile
  pages/               Inicio, Sobre, Portafolio, planes/, not-found
public/                Imágenes, videos y assets estáticos
```

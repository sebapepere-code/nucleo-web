import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Configuración limpia y autónoma. El sitio es una SPA de Vite + React.
// Sin dependencias de Replit ni variables de entorno obligatorias:
// Vercel (o cualquier host) puede correr `vite build` sin configuración extra.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
    },
    dedupe: ["react", "react-dom"],
  },
});

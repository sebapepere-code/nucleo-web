# Planes y precios (ocultos)

Desde octubre de 2026 la web no muestra precios: cada proyecto se cotiza después de
conocer el caso. Todo lo relacionado con los planes quedó guardado acá, sin borrar.

## Qué hay guardado

| Pieza | Dónde |
| --- | --- |
| Sección «Elegí tu plan» con Plan profesional (USD 400) y Plan Pro (USD 800) | `SeccionesPrecios.tsx` → `NuevoPreciosSection` |
| Sección de precios anterior (Profesional / Pro / Plus) | `SeccionesPrecios.tsx` → `PreciosSection` |
| Página explicativa del Plan profesional | `PlanProfesional.tsx` |
| Página explicativa del Plan Pro | `PlanPro.tsx` |
| Videos y portadas de los videos | `public/planes/` |

Ninguna de estas piezas está enlazada ni tiene ruta activa.

## Cómo restaurarlos

1. **Sección de precios en Inicio** — en `src/pages/Inicio.tsx`:
   - importar `import { NuevoPreciosSection } from "./planes/SeccionesPrecios";`
   - renderizar `<NuevoPreciosSection />` en lugar de (o junto a) `<ServiciosSection />`.
2. **Páginas de cada plan** — en `src/App.tsx`, descomentar los dos `import` de
   `PlanProfesional` / `PlanPro` y las dos `<Route path="/planes/...">`.
   Los botones «Ver explicación del plan» de `NuevoPreciosSection` ya apuntan a esas rutas.

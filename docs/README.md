# Estructura del sitio GRIMATS

Breve guía para mantener y desplegar el sitio.

Estructura recomendada:

- `index.html` — Página principal (raíz).
- `pages/` (opcional) — Subpáginas organizadas si lo prefieres.
- `css/` — Hojas de estilo (ej. `css/grimats-subpages.css`).
- `js/` — Scripts frontend reutilizables.
- `assets/images/` — Todas las imágenes (afiches, logos, thumbs, placeholders).
- `docs/` — Documentación de mantenimiento.
- `scripts/` — Scripts de utilidad (ej. `update-sitemap.ps1`).

Actualizar imágenes:

1. Reemplaza el afiche en `assets/images/` conservando el nombre de archivo para no romper enlaces.
2. Si cambias rutas, actualiza los `src` en las páginas HTML.

Actualizar sitemap:

Ejecuta `scripts/update-sitemap.ps1` y configura la variable `$BaseUrl` al inicio del script.

Buenas prácticas:

- Usa rutas relativas desde la raíz para facilitar despliegues estáticos.
- Versiona cambios: `git add . && git commit -m "chore: reorganizar assets"`.
- Mantén placeholders en `assets/images/` con nombres claros (ej. `pending-poster.svg`).


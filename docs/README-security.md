# Recomendaciones de seguridad para GitHub Pages

Este sitio está alojado en GitHub Pages, por lo que no es necesario usar archivos .htaccess ni web.config para seguridad.

## Lo que sí conviene hacer
- Mantener HTTPS activado desde la configuración de GitHub Pages.
- Activar "Enforce HTTPS" cuando esté disponible.
- Mantener las meta tags de seguridad y privacidad en los HTML.
- Evitar cargar scripts o recursos desde fuentes no confiables.
- No guardar secretos ni claves en el frontend.

## Qué ya quedó aplicado en las páginas
- Content-Security-Policy
- Referrer-Policy
- Permissions-Policy

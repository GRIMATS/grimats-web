# Validaciones realmente ejecutadas

Fecha: 2026-09-17.

| Prueba | Resultado | Alcance |
|---|---|---|
| Sintaxis de catálogo y JavaScript | Aprobada | `node --check` |
| Recursos, enlaces relativos y anclas | Aprobada | Seis páginas principales, comprobación del sistema de archivos |
| IDs, H1 y atributos alt | Aprobada | Sin IDs duplicados; un H1 por página |
| Presentación adaptable | Aprobada | 320, 390, 768, 1024, 1440 px; seis páginas; 30 escenarios |
| Carga de imágenes | Aprobada | Incluidas las de carga diferida, forzada en la comprobación |
| Consola | Aprobada | Cero excepciones JS en las suites |
| Precios de planes | Aprobada | 90, 205, 455, 905 en las cuatro propuestas |
| Simulador | Aprobada | 90 → 100 → 105 → 150; mismo médico/espacio separado: 135; bases 205 y 455 |
| Entrada inválida | Aprobada | Rechaza negativos; bloquea consulta de estimado obsoleto; recupera al corregir |
| Red Clínica | Aprobada | Muestra referencia 905; no convierte 20+ en cupo ilimitado/exacto |
| Pantalla conceptual | Aprobada | Resumen, agenda y pacientes |
| Recorrido | Aprobada | Cuatro pasos de atención |
| Contacto | Aprobada | Diálogo, texto del plan, URL codificada, cierre y Escape; no se envió mensaje |
| Menú móvil | Aprobada | Apertura/cierre, aria-expanded y Escape |
| Archivo autocontenido | Aprobada | Selector → cuatro marcas → división → selector; móvil, anclas y simulador |
| Navegación HTTP del ZIP | Pendiente | Políticas del navegador bloquean URL local y file:// en este entorno |
| Producción, backend y datos reales | No ejecutada | Fuera de alcance |
| Safari, Firefox y dispositivos físicos | No ejecutada | Se usó Chromium headless |

## Método de renderizado
Las páginas convencionales se leyeron del disco y sus CSS, JavaScript e imágenes se incrustaron sin cambiar la lógica. Se inyectó ese HTML en Chromium con Playwright para tomar capturas y accionar los controles. Esto permitió verificar la presentación y comportamiento pese a la restricción de navegación local del contenedor. El HTML autocontenido entregado utiliza esa misma representación y su enrutador se probó efectivamente entre las seis páginas.

La validación estática verificó cada destino relativo del paquete normal. No se confunde esta comprobación con una prueba de publicación en Vercel, GitHub Pages o grimats.com.

Reporte estructurado: `validaciones.json`.

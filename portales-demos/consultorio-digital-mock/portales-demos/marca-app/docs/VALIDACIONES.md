# Validaciones realmente ejecutadas

Fecha: 2026-09-17.

| Prueba | Resultado |
|---|---|
| Seis páginas × 1440, 768, 390 y 320 px | 24 escenarios sin desbordamiento horizontal |
| Carga de imágenes | Correcta en los 24 escenarios |
| Marcas seleccionadas | Solo OrbisMed, Clynia, Nexomed y Mediora |
| Orden del selector y navegación | Igual al ranking adjunto |
| Rutas y anclas locales | Sin destinos faltantes en la comprobación estática |
| HTML | Un H1 por página, sin identificadores duplicados, imágenes con atributo alt |
| Sintaxis JavaScript | Aprobada con node --check |
| Catálogo de planes | Igual al catálogo del HTML anterior |
| Vista Agenda / Recepción / Pacientes y llamada simulada | Aprobada en las cuatro páginas de producto |
| Filtros de planes | Dos planes por grupo y sin cambios en sus precios |
| Estimador | US$90 base; +1 médico US$100; +1 administrativo US$105; +1 espacio US$150; cantidad inválida rechazada |
| Red Clínica | US$905 base y adicionales sujetos a cotización |
| Diálogo, barra de comparación y menú móvil | Apertura, cierre y navegación aprobados |
| Archivo HTML autocontenido | Navegación de las seis páginas y anclas aprobada |
| Excepciones JavaScript durante pruebas | Ninguna registrada |

Se inspeccionaron capturas de las cuatro páginas de producto, el selector y la división, además de vistas móviles.

## Entorno y límites
Se utilizó Chromium del contenedor con renderizado de los mismos documentos HTML y recursos incorporados, mediante `set_content`, y navegación real del iframe `srcdoc` de la versión autocontenida. El entorno bloquea la apertura directa de file:// por política administrativa; no se certifica una prueba de apertura nativa del ZIP extraído en Windows ni del sitio publicado. Las rutas del paquete separado se validaron estáticamente y corresponden a los mismos documentos del HTML autocontenido.

No se enviaron mensajes, no se probaron WhatsApp ni enlaces externos, y no se validó backend, pagos, disponibilidad clínica real, Safari, Firefox o dispositivos físicos. La prueba móvil se hizo mediante tamaños de pantalla emulados.

# Arquitectura del demo

## Páginas
- `salud-propuestas.html`: selector visual de las cuatro alternativas.
- `g-salud.html`: propuesta para la división especializada. Mantiene el nombre del archivo público solicitado.
- `propuestas/cliniva.html`: dirección humana; coral y menta.
- `propuestas/atria-salud.html`: dirección institucional; composición centrada y azules.
- `propuestas/medinexa.html`: dirección tecnológica; portada oscura y turquesa.
- `propuestas/saluvia.html`: dirección natural; tonos cálidos, verde y tipografía editorial.

## Recursos
`assets/salud-demo.css` contiene estilos compartidos y reglas por `data-brand`.
`assets/salud-demo.js` contiene navegación móvil, vistas conceptuales de aplicación, recorrido de atención, planes, simulador, complementos y contacto.
`assets/catalogo-gsalud.js` contiene las capacidades y tarifas comunes. No hace peticiones externas.
`assets/identidades/` contiene símbolos y nombres extraídos de las imágenes del usuario, favicons y las láminas originales en WebP como referencia.
`assets/vistas/` contiene capturas reales del renderizado de las cuatro portadas, usadas como previsualización del selector.

No hay React, npm, módulos ES, backend, APIs, bases de datos ni compilación requerida. Las páginas usan rutas relativas y scripts clásicos. No se incluyen archivos de fuentes; se usan las tipografías disponibles en el dispositivo.

## Versión de un solo archivo
La entrega adicional `GSalud_Demo_Interactivo.html` incorpora las seis páginas, imágenes, CSS y JavaScript. Un iframe `srcdoc` y un enrutador local permiten navegar sin extraer recursos. Los mensajes de navegación se aceptan únicamente desde ese iframe y solo para las seis rutas incluidas. No se utiliza un sitio externo para cargar el demo.

## Separación entre demo y publicación
`integracion/GRIMATS_tarjeta_gsalud.html` es un fragmento de contenido, no una portada completa ni un archivo para abrir como página final. Sirve para adaptar la tarjeta G-Salud de la página corporativa reutilizando sus estilos existentes. La portada real de GRIMATS no fue modificada.

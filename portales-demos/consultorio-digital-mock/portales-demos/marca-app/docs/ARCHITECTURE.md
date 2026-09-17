# Arquitectura del paquete actualizado

## Rutas
- `demo-marcas-salud.html`: selector ordenado OrbisMed, Clynia, Nexomed, Mediora.
- `g-salud.html`: división de salud; identidades de la plataforma actualizadas.
- `propuestas/orbismed.html`: ecosistema conectado; azul marino, turquesa y órbitas.
- `propuestas/clynia.html`: claridad, confianza y símbolo entrelazado; navy, aqua y acento melocotón.
- `propuestas/nexomed.html`: conectividad, azul eléctrico y nodos.
- `propuestas/mediora.html`: evolución digital; azul, turquesa y píxeles.

## Recursos compartidos
`assets/ganadores-estilos.css`: estilos base preservados y ajustes de las identidades seleccionadas.
`assets/ganadores-catalogo.js`: catálogo comercial preservado y datos de las cuatro marcas.
`assets/ganadores-interacciones.js`: navegación, simulaciones, planes, estimador y diálogo de contacto.
`assets/marcas/`: símbolo, nombre, composición horizontal y favicon de cada marca. Derivados de las imágenes suministradas, no logotipos inventados ni sustitutos tipográficos.

No hay dependencias externas, fuentes de terceros, compilación ni backend. Las rutas son relativas.

## HTML autocontenido
`Demo_GSalud_Ganadores.html`, entregado aparte, incorpora las mismas seis páginas y recursos. El enrutador utiliza un iframe local `srcdoc`, valida que los mensajes provengan de su propio iframe y restringe las rutas a las páginas incluidas. No carga un sitio externo.

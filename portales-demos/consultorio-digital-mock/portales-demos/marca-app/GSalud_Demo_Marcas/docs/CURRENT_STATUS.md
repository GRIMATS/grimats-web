# Estado actual — paquete demo G-Salud

Última actualización: 2026-09-17.
Estado: **prototipo construido y validado en el entorno disponible; despliegue no realizado**.
Rama/commit: no aplican; no hay repositorio Git montado.

## Entregado
Selector, cuatro páginas de marca, propuesta de división `g-salud.html`, imágenes derivadas de las referencias del usuario, estilos, catálogo común, interacciones, instrucciones, fragmento para la tarjeta corporativa y documentación de transferencia. Existe una entrega adicional HTML autocontenida de las seis páginas.

## Validaciones ejecutadas
- Sintaxis JavaScript con `node --check`.
- Referencias locales, archivos, anclas, identificadores duplicados, un H1 por página y alternativas textuales de imágenes.
- Renderizado de las seis páginas en Chromium a 320, 390, 768, 1024 y 1440 px: 30 escenarios, sin desbordamiento horizontal y con las imágenes cargadas.
- Inspección visual de capturas de las cuatro propuestas, el selector y la división.
- Filtros y cuatro tarifas; navegación de la aplicación conceptual; recorrido de atención; simulador y entradas inválidas; tratamiento de Red Clínica; acordeones; contacto y menú móvil.
- Navegación del archivo autocontenido entre las seis páginas, selector de marca, regreso a G-Salud, anclas y controles en móvil.
- Cero excepciones JavaScript registradas durante esas pruebas.

Detalle: `validaciones.json` y `VALIDACIONES.md`.

## Limitaciones de la prueba
El navegador del contenedor bloquea las URL `file://` y el servidor local por política administrativa. Se renderizaron los mismos archivos con recursos incrustados y se probó el enrutador de la versión autocontenida. Las rutas del paquete convencional se comprobaron estáticamente, no mediante una navegación HTTP real. No se verificó hosting, dispositivos físicos, Safari, Firefox, enlaces externos ni sistema clínico real.

## Pendiente
Elegir identidad, aprobar ajustes finales, confirmar oferta/condiciones y disponibilidad funcional, revisar marca/dominio y realizar validación de staging antes de reemplazar el archivo público.

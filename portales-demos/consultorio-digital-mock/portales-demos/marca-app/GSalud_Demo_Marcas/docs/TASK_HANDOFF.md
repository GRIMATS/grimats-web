# Transferencia de tarea

## 1. Identificación
Proyecto: G-Salud / demo de arquitectura de marca. Tarea: DEMO-001. Fecha: 2026-09-17. Origen: ChatGPT. Destino: siguiente sesión/Codex. Rama y commit: no aplican, sin repositorio montado.

## 2. Objetivo
Comparar cuatro marcas de una aplicación independiente respaldada por la división G-Salud de GRIMATS.

## 3. Resultado esperado
Seis páginas navegables, cuatro identidades aplicadas, información comercial común, página de división, interacciones y documentación. Alcanzado en el ámbito del demo. Integración pública pendiente.

## 4. Estado actual
Prototipo construido y validado por los métodos documentados; pendiente de decisión de identidad y despliegue. No se asigna porcentaje al producto clínico.

## 5. Trabajo realizado
Se crearon las seis páginas, assets, catálogo, interacciones, recursos gráficos, documentación y fragmento corporativo. Ningún archivo del sitio en producción fue reemplazado. Se entregó además GSalud_Demo_Interactivo.html.

## 6. Trabajo en proceso
Ningún flujo backend. Este es un demo estático. La selección de nombre y la conversión a una página pública final siguen abiertas.

## 7. Qué falta
Elegir identidad; confirmar fuentes comerciales y alcance técnico; validar marca/dominio; revisar repositorio oficial; integrar en staging; probar navegación y publicación; desplegar tras aprobación.

## 8. Bloqueos
No hay código pendiente para utilizar el demo en un navegador con JavaScript. El entorno de pruebas bloqueó navegación HTTP local y file://; se usó inyección del HTML autocontenido. El código fuente del sitio y repositorio real no se montó. Las plantillas adjuntas no contienen estado técnico verificable.

## 9. Decisiones
Jerarquía: GRIMATS → G-Salud → marca independiente. Firma de la aplicación: Powered by G-Salud. Tarifas: corte público del 17-09-2026. Cuatro alternativas, no cuatro productos. No inventar alcance para 20+, portal o migración.

## 10. Restricciones
No sobrescribir index.html. Mantener g-salud.html en la integración final. No enviar mensajes ni publicar automáticamente. No introducir datos reales, claves, credenciales o llamadas al backend. No reutilizar precios viejos del chat sin nueva aprobación.

## 11. Validaciones
Ver VALIDACIONES.md y validaciones.json. Sí: sintaxis, rutas estáticas, 30 anchuras/páginas, renderizado, controles, cálculos y navegación del autocontenido. No: producción, navegador físico, backend ni HTTP local real.

## 12. Datos de prueba
Pacientes ficticios Ana Martínez, Carlos Peña y Natalia Santos. Cuenta ficticia Dra. Isabel R. Caso de cálculo: plan 90 + 1 médico 10 + 1 administrativo 5 + 1 espacio 45 = 150. Un médico repetido entre espacios no aumenta el campo de médicos únicos.

## 13. Próxima acción inmediata
Abrir el demo y obtener la selección del usuario. Antes de integrar en el sitio, recuperar el repositorio oficial y leer sus documentos vigentes; ejecutar git status y revisar commits. No tratar estos documentos del demo como estado oficial de la app.

## 14. Pasos posteriores
Preparar marca final, dominio o ruta independiente, contenido cliente definitivo, contacto/condiciones, enlace desde la división y tarjeta corporativa. Publicar solo tras validación y autorización.

## 15. Documentos que debe leer el siguiente contexto
AGENTS.md; docs/PROJECT_CONTEXT.md; docs/CURRENT_STATUS.md; docs/DECISIONS.md; docs/BACKLOG.md; docs/ARCHITECTURE.md; docs/SEGURIDAD.md; docs/GESTIONDATOS.md; docs/FUENTES_Y_ALCANCE.md; docs/VALIDACIONES.md; docs/WORKLOG.md; esta transferencia.

## 16. Instrucción al receptor
Conserva las cuatro variantes hasta que el usuario elija. No renombres ni borres páginas del sitio real por asumir que este prototipo ya fue aprobado. Distingue catálogo público, redacción de propuesta y evidencia de implementación.

## 17. Cierre
Resumen: demo completo para evaluar la nueva arquitectura de marca; pendiente de nombre final e integración pública.
Mensaje sugerido de commit futuro, no ejecutado: `feat(marketing): add G-Salud division and independent clinical brand demo`.

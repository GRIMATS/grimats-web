# Seguridad y límites

- Solo datos ficticios visibles. No hay historias clínicas, documentos privados, cuentas, claves ni credenciales reales.
- Ningún formulario envía información. No existen cookies, localStorage, sessionStorage, servicios de análisis, píxeles ni llamadas `fetch`/XHR.
- Los números del simulador viven únicamente en memoria y en sus controles. No se almacenan.
- WhatsApp y correo son salidas comerciales explícitas. Se abre un enlace o cliente de correo; no se envían mensajes automáticamente. Se advierte no compartir información clínica.
- Los enlaces externos en una pestaña nueva incluyen `rel="noopener noreferrer"`. Los mensajes del contacto se construyen con codificación de URL.
- El catálogo local se escapa antes de insertarse en el marcado; los campos numéricos se validan como enteros con límites. Se evita mostrar una mensualidad válida ante un dato inválido.
- Todas las páginas principales incluyen `noindex,nofollow,noarchive`. Esto no es autenticación ni control de acceso. Un demo publicado sigue siendo accesible a quien tenga su dirección.
- La firma “Powered by G-Salud” describe la arquitectura comercial propuesta, no una certificación. No se afirma certificación HIPAA, aprobación DGII ni cumplimiento regulatorio auditado.
- Los gráficos no incluyen información identificable de pacientes. Los nombres de la pantalla son inventados como datos de prueba.

## Antes de publicar
Validar políticas, términos comerciales, autenticidad de los destinos y tratamiento de datos en el sitio final. Implementar las cabeceras de seguridad apropiadas en el hosting. No publicar este prototipo como acceso clínico ni aceptar información médica en sus canales de demostración.

El repositorio de la aplicación y sus controles RLS, Auth o Storage no fueron consultados ni modificados en esta tarea; están fuera del alcance del paquete estático.

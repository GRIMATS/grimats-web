# AGENT.md

Este archivo define las directrices principales para mantener y evolucionar este proyecto web de Grimats.

## 1) Conectar Google Tag Manager

Toda página del sitio debe incorporar correctamente el contenedor de Google Tag Manager siguiendo este orden estricto:

### 1.1 Código en la sección <head>

Pegar este bloque lo más arriba posible dentro de la sección `<head>` de cada página:

```html
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-THL42TV5');</script>
<!-- End Google Tag Manager -->
```

### 1.2 Código justo después de la apertura de <body>

Pegar este bloque inmediatamente después de la etiqueta de apertura `<body>`:

```html
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-THL42TV5"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
```

### 1.3 Reglas de cumplimiento

- Usar siempre el ID de contenedor `GTM-THL42TV5` salvo indicación explícita de cambio.
- Mantener el orden correcto: primero el script en `<head>`, luego el noscript en `<body>`.
- No duplicar el bloque de Tag Manager en la misma página.
- Cuando se cree una nueva página, verificar que el snippet esté insertado en la estructura base y no solo en una vista aislada.
- Si el sitio usa plantillas o layouts reutilizables, agregar el contenedor en el punto central para que todas las páginas lo hereden.

## 2) Principios generales del proyecto

- Mantener el sitio limpio, rápido y compatible con navegadores modernos.
- Priorizar accesibilidad, SEO básico y experiencia de usuario.
- Evitar cambios visuales o funcionales sin validar impacto en diseño y estructura.
- Usar HTML semántico y mantener consistencia en estilos, textos y estructura de páginas.

## 3) Buenas prácticas para futuras modificaciones

- Documentar cambios importantes en el proyecto.
- Revisar que los scripts externos no rompan el render inicial de la página.
- Mantener los nombres de archivos y rutas consistentes.
- Probar visualmente los cambios en el navegador antes de publicar.

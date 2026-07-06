# Life, Liberty & Love — lifelibertyandlove.com

Sitio reconstruido desde cero a partir del contenido recuperado del antiguo Joomla/K2.

- **43 artículos** migrados con fechas, categorías, imágenes y URLs originales (`/item/slug/`) preservadas para SEO.
- **Generador**: Eleventy 2 · **Panel de contenido**: Decap CMS (`/admin/`) · **Hosting**: Netlify (gratis) · **Comentarios**: Giscus.

## Comandos
```bash
npm install     # instalar dependencias
npm start       # servidor local en http://localhost:8080
npm run build   # generar el sitio en _site/
```

En Windows: doble clic en `probar-sitio-local.bat` (ver `docs/PROBAR-EN-LOCAL.md`).
```
```

## Estructura
```
src/
  posts/          43 artículos en Markdown (los que edita el cliente)
  _includes/      plantillas (base, post, tarjetas, divisor "leaf")
  css/style.css   sistema de diseño completo
  js/site.js      menú móvil + buscador y filtros del blog
  admin/          Decap CMS (panel del cliente)
  static/         imágenes optimizadas (33MB → 7,5MB)
  _redirects      redirecciones 301 de las URLs antiguas
docs/
  DESPLIEGUE.md   guía paso a paso para ponerla en live (ES)
  CLIENT-GUIDE.md guía para el cliente final (EN)
```

# Guía de despliegue — lifelibertyandlove.com

Stack: **Eleventy** (generador estático) + **Decap CMS** (panel de contenido) + **Netlify** (hosting gratuito) + **Giscus** (comentarios gratuitos).

Coste total de alojamiento: **0 €/mes**. Solo se paga el dominio (~12 €/año si hay que renovarlo).

---

## 1. Probar el sitio en local (opcional)

```bash
npm install
npm start        # abre http://localhost:8080
npm run build    # genera la carpeta _site
```

## 2. Subir el código a GitHub

1. Crea una cuenta gratuita en https://github.com si no tienes.
2. Crea un repositorio nuevo (p. ej. `lifelibertyandlove`), **privado o público**, sin README.
3. Desde la carpeta del proyecto:

```bash
git init
git add .
git commit -m "Sitio inicial"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/lifelibertyandlove.git
git push -u origin main
```

> Importante: el panel del cliente (Decap CMS) guarda cada entrada nueva como un commit en este repositorio. GitHub es la "base de datos" del blog.

## 3. Desplegar en Netlify

1. Crea una cuenta gratuita en https://netlify.com (puedes entrar con GitHub).
2. **Add new site → Import an existing project → GitHub** y elige el repositorio.
3. Netlify detecta el `netlify.toml` automáticamente (build: `npm run build`, publish: `_site`). Pulsa **Deploy**.
4. En 1-2 minutos tendrás el sitio en una URL tipo `https://algo.netlify.app`.

## 4. Conectar el dominio lifelibertyandlove.com

1. En Netlify: **Domain management → Add a domain** → escribe `lifelibertyandlove.com`.
2. En el registrador del dominio (GoDaddy, Namecheap…), cambia los **nameservers** a los que Netlify te indique (opción recomendada) o crea los registros DNS que te muestre.
3. Netlify activa **HTTPS automático** (certificado gratuito) en unos minutos.

## 5. Activar el panel del cliente (Decap CMS)

1. En Netlify: **Site configuration → Identity → Enable Identity**.
2. En **Identity → Registration**, selecciona **Invite only** (para que nadie más pueda registrarse).
3. En **Identity → Services → Git Gateway → Enable Git Gateway**.
4. En la pestaña **Identity → Invite users**, invita el email del cliente.
5. El cliente recibe un email, crea su contraseña, y ya puede entrar en:
   **https://lifelibertyandlove.com/admin/**

## 6. Activar los formularios (contacto + suscripción)

Los formularios usan **Netlify Forms** (100 envíos/mes gratis):

1. Tras el primer deploy, en Netlify verás **Forms → contact** y **subscribe**.
2. En **Forms → Settings → Form notifications**, añade una notificación por email al correo del cliente para que reciba cada mensaje/alta.
3. Los suscriptores quedan guardados en Netlify (exportables a CSV).

> **Mejora recomendada**: si el cliente quiere enviar newsletters de verdad, conectar el formulario a MailerLite o Mailchimp (ambos con plan gratuito). Basta con reemplazar el formulario por el embed del proveedor, o exportar el CSV de Netlify periódicamente. Dime cuál usa y lo integro.

## 7. Activar los comentarios (Giscus)

Los comentarios usan GitHub Discussions (gratis, sin publicidad, sin base de datos):

1. En el repositorio de GitHub: **Settings → Features → marca "Discussions"**.
2. Instala la app en el repo: https://github.com/apps/giscus
3. Ve a https://giscus.app, escribe el repositorio y copia los valores generados
   (`data-repo`, `data-repo-id`, `data-category-id`).
4. Pégalos en `src/_includes/layouts/post.njk` (están marcados con `REPLACE_ME`).
5. Haz commit y push — Netlify redespliega solo.

> Alternativa sin GitHub para los lectores: los visitantes comentan iniciando sesión con su cuenta de GitHub. Si el público del blog no es técnico y esto es una barrera, puedo cambiarlo por Hyvor Talk (de pago) o desactivar comentarios.

## 8. Ciclo de vida normal

- El cliente publica desde `/admin/` → Decap hace commit en GitHub → Netlify reconstruye y publica en ~1 minuto. **El cliente nunca toca código.**
- Cualquier cambio de diseño lo haces tú editando el repo y haciendo push.

## Por qué Netlify (criterio usabilidad / sencillez / calidad-precio)

| | Netlify | Hosting compartido (SiteGround…) | WordPress.com |
|---|---|---|---|
| Precio | **0 €/mes** | 3-10 €/mes | 4-8 €/mes |
| HTTPS | Automático | Manual/incluido | Incluido |
| Velocidad | CDN global, sitio estático ultrarrápido | Media | Media |
| Mantenimiento | Ninguno (no hay PHP ni BD que actualizar) | Actualizaciones | Actualizaciones plugins |
| Panel cliente | Decap CMS incluido | Requiere CMS | Nativo |
| Seguridad | No hay nada que hackear (HTML estático) | Riesgo CMS | Riesgo plugins |

Alternativa equivalente si algún día hiciera falta: **Cloudflare Pages** (también gratis; los formularios habría que moverlos a Formspree).

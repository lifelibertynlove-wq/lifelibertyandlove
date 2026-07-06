# Despliegue paso a paso — lifelibertyandlove.com

Guía detallada, clic a clic, **sin instalar nada en tu PC**. Todo se hace desde el navegador.

**Necesitarás**: un email (para las cuentas), el zip `repo-listo-github.zip`, y acceso al panel del registrador del dominio (GoDaddy, Namecheap…). Tiempo total: 30–45 minutos.

**Sobre la versión portable**: sí, contiene el proyecto completo y sirve como base, **pero al repositorio nunca deben subirse** las carpetas `node_modules/` ni `tools/` (Netlify instala las dependencias por su cuenta en la nube, y el `node.exe` no pinta nada en el repo). El `.gitignore` ya las excluye por si algún día usas git, y para que no haya riesgo de error te he preparado `repo-listo-github.zip`: contiene exactamente lo que hay que subir, dividido en dos tandas porque GitHub solo admite 100 archivos por subida web.

---

## PARTE 1 — Crear la cuenta de GitHub y el repositorio

GitHub será la "base de datos" del blog: cada entrada que el cliente publique desde su panel se guarda aquí automáticamente.

1. Ve a **https://github.com** → **Sign up**.
2. Introduce email, contraseña y un nombre de usuario. Verifica el email.
3. Una vez dentro, arriba a la derecha pulsa el icono **+** → **New repository**.
4. Rellena:
   - **Repository name**: `lifelibertyandlove`
   - **Visibility**: `Private` (recomendado; funciona igual con Netlify)
   - ❌ NO marques "Add a README file" (importante: el repo debe nacer vacío)
5. Pulsa **Create repository**. Verás una página de repo vacío. Déjala abierta.

## PARTE 2 — Subir el código (2 tandas, desde el navegador)

Antes: descomprime `repo-listo-github.zip` en tu escritorio. Verás `tanda-1` (75 archivos: proyecto y plantillas) y `tanda-2` (62 archivos: imágenes).

**Tanda 1:**

1. En la página del repo vacío, pulsa el enlace **"uploading an existing file"** (en el texto central).
2. Abre la carpeta `tanda-1` en el Explorador de Windows, selecciona **TODO su contenido** (Ctrl+E o Ctrl+A) — es decir, los archivos y carpetas de dentro, no la carpeta `tanda-1` en sí — y **arrástralo** a la zona de GitHub que dice "Drag files here".
3. Espera a que la lista muestre los archivos cargados (debe indicar ~75 files, incluidos `.eleventy.js` y `.gitignore`; si el Explorador no los muestra, activa Vista → Elementos ocultos).
4. Abajo, en "Commit changes", escribe `Proyecto inicial` y pulsa **Commit changes**.

**Tanda 2:**

1. Ya en el repo, pulsa **Add file → Upload files** (botón arriba a la derecha de la lista de archivos).
2. Abre la carpeta `tanda-2`, selecciona la carpeta **`src`** que hay dentro y arrástrala a GitHub. (GitHub la fusionará con la carpeta `src` ya existente — es lo correcto.)
3. Commit: `Imágenes del sitio` → **Commit changes**.
4. Verificación: entra en `src` → `static` → `images` dentro del repo; debes ver las imágenes.

> Alternativa si algún día instalas Git o GitHub Desktop: `git clone`, copiar los archivos y `git push`. Para hoy, la vía web es suficiente y no requiere nada.

## PARTE 3 — Desplegar en Netlify

1. Ve a **https://app.netlify.com/signup** → **Sign up with GitHub** (así quedan conectados de un clic) → **Authorize Netlify**.
2. En el panel de Netlify: **Add new site → Import an existing project**.
3. Elige **GitHub**. La primera vez pedirá instalar "Netlify" en tu GitHub: pulsa **Install**, selecciona tu usuario y autoriza acceso al repositorio `lifelibertyandlove` (opción "Only select repositories" → elígelo).
4. De vuelta en Netlify, haz clic en el repositorio **lifelibertyandlove**.
5. Pantalla de configuración: Netlify lee el `netlify.toml` del repo y rellena solo:
   - Build command: `npm run build`
   - Publish directory: `_site`
   No cambies nada. Pulsa **Deploy lifelibertyandlove** (o "Deploy site").
6. Verás el deploy "Building…" (1–2 min). Cuando ponga **Published**, pulsa la URL tipo `https://algo-aleatorio.netlify.app` → tu sitio ya está en internet. Navega y comprueba portada, blog y un artículo.

> Si el deploy falla (raro): entra en el deploy → "Deploy log" y mándame el error; casi siempre es un archivo que faltó por subir en las tandas.

Opcional: en **Site configuration → Site details → Change site name** puedes poner `lifelibertyandlove.netlify.app` como URL provisional.

## PARTE 4 — Conectar el dominio lifelibertyandlove.com

1. En Netlify: **Domain management → Add a domain** (o "Set up a custom domain").
2. Escribe `lifelibertyandlove.com` → **Verify** → como el dominio ya tiene dueño (el cliente), pulsa **Add domain** igualmente.
3. Netlify te ofrecerá dos vías. La recomendada: **Netlify DNS**:
   - Pulsa "Set up Netlify DNS" → te dará **4 nameservers** (tipo `dns1.p03.nsone.net`).
   - Entra en el panel del registrador del dominio (donde se compró: GoDaddy, Namecheap, IONOS…) → sección **Nameservers** → sustituye los actuales por los 4 de Netlify → guarda.
   - La propagación tarda de minutos a 24 h (normalmente <1 h).
4. Netlify añadirá también `www.lifelibertyandlove.com` como alias automáticamente.
5. **HTTPS**: en Domain management → HTTPS, Netlify emite el certificado solo cuando el DNS propaga. Si no se activa solo, pulsa "Verify DNS configuration" → "Provision certificate". Gratis y renovación automática.

> ⚠️ Si el dominio gestiona el **email del cliente** (registros MX), avísame antes de cambiar nameservers: habría que copiar los registros MX en Netlify DNS para no cortar el correo, o usar la vía alternativa (registro A/CNAME sin cambiar nameservers). Es 5 minutos, pero hay que hacerlo en el orden correcto.

## PARTE 5 — Activar el panel del cliente (/admin)

1. En Netlify: **Site configuration → Identity → Enable Identity**.
2. Dentro de Identity → **Registration** → selecciona **Invite only** → Save. (Evita que desconocidos se registren.)
3. Baja a **Services → Git Gateway → Enable Git Gateway**. (Esto permite que el panel escriba en GitHub sin que el cliente tenga cuenta de GitHub.)
4. Ve a la pestaña **Integrations → Identity** (o el botón "Invite users" dentro de Identity) → **Invite users** → escribe el email del cliente → Send.
5. El cliente recibe un email "You've been invited to join…" → clic en **Accept the invite** → le lleva al sitio, donde define su contraseña.
6. A partir de ahí, el cliente entra siempre por **https://lifelibertyandlove.com/admin/**.

**Prueba tú primero**: invítate a ti mismo también, entra en `/admin/`, crea una entrada de prueba, publícala, comprueba que aparece en el blog en ~1 minuto, y bórrala desde el propio panel.

## PARTE 6 — Formularios (contacto + suscripción)

1. En Netlify: pestaña **Forms** → verás `contact` y `subscribe` detectados tras el primer deploy.
2. **Forms → Settings & usage → Form notifications → Add notification → Email notification**:
   - Event: New form submission · Form: `contact` · Email: el del cliente.
   - Repite para `subscribe`.
3. Los datos quedan también guardados en la pestaña Forms (exportables a CSV con un botón).
4. Prueba: envía un mensaje desde `/contact/` del sitio ya publicado y comprueba que llega la notificación.

Plan gratuito: 100 envíos/mes, de sobra para este blog.

## PARTE 7 — Comentarios (Giscus)

1. En GitHub, dentro del repo: **Settings → General → Features → marca "Discussions"**.
2. Instala la app de Giscus en el repo: **https://github.com/apps/giscus** → Install → selecciona el repositorio.
3. Ve a **https://giscus.app** → en "Repositorio" escribe `TU_USUARIO/lifelibertyandlove` → elige la categoría **Announcements** (o crea "Comments") → mapping "pathname" (ya preseleccionado).
4. Abajo te genera un bloque `<script>` con tres valores: `data-repo`, `data-repo-id` y `data-category-id`. Cópialos.
5. Edítalo directamente en GitHub (sin nada en local): en el repo abre `src/_includes/layouts/post.njk` → icono del **lápiz** (Edit) → sustituye los tres `REPLACE_ME` por tus valores → **Commit changes**.
6. Netlify detecta el commit y redespliega solo (~1 min). Abre cualquier artículo y verás la caja de comentarios al final.

> Nota: para comentar, los lectores inician sesión con una cuenta de GitHub. Si crees que eso es una barrera para el público del blog, dímelo y valoramos alternativas.

## PARTE 8 — Checklist final de entrega

- [ ] `https://lifelibertyandlove.com` carga con candado (HTTPS) y también `www.`
- [ ] Portada, blog, buscador, filtros y 3–4 artículos al azar se ven bien (también desde el móvil)
- [ ] Una URL antigua redirige: prueba `lifelibertyandlove.com/blog.html` → debe llevar a `/blog/`
- [ ] Formulario de contacto probado y notificación recibida
- [ ] Formulario de suscripción probado
- [ ] Comentarios visibles al final de un artículo
- [ ] Cliente invitado, ha entrado en `/admin/` y ha publicado una entrada de prueba
- [ ] Entregada la guía `CLIENT-GUIDE.md` al cliente
- [ ] (Pendiente de decidir) Conexión del formulario de suscripción a Mailchimp/MailerLite

## Mantenimiento futuro

- **Contenido**: siempre desde `/admin/` (el cliente). Cero código.
- **Diseño/estructura**: editas los archivos del repo — o directamente en GitHub web con el lápiz, o en local con la versión portable y subiendo los archivos cambiados por "Upload files" (GitHub reemplaza los existentes).
- **Costes**: 0 €/mes. Solo la renovación anual del dominio.
- **Copia de seguridad**: el repo de GitHub ES la copia de seguridad completa (contenido + diseño + imágenes), con historial de versiones infinito.

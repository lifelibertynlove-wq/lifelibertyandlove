# Probar el sitio en local — instrucciones detalladas (Windows)

Con esto verás el sitio completo en tu navegador, funcionando exactamente igual que en producción, antes de subir nada a internet.

---

## Requisito único: Node.js (solo la primera vez)

1. Ve a **https://nodejs.org** y descarga la versión **LTS** (botón verde).
2. Ejecuta el instalador y pulsa *Siguiente* en todo (opciones por defecto). No hace falta marcar nada extra.
3. Cierra cualquier ventana de terminal que tuvieras abierta (para que se refresque el PATH).

> ¿Cómo sé si ya lo tengo? Abre `cmd` y escribe `node --version`. Si responde algo como `v20.x.x` o `v22.x.x`, ya está instalado.

## Arrancar el sitio

1. Descomprime `lifelibertyandlove-sitio.zip` donde quieras (p. ej. `C:\proyectos\`).
2. Entra en la carpeta `site` (donde están `package.json`, `src`, y el archivo **`probar-sitio-local.bat`**).
3. Haz **doble clic en `probar-sitio-local.bat`**.

El script hace todo solo:

| Paso | Qué hace | Cuándo |
|---|---|---|
| 1 | Comprueba que Node.js está instalado (y te avisa si no) | Siempre |
| 2 | Ejecuta `npm install` para descargar las dependencias | Solo la **primera vez** (1-2 min) |
| 3 | Arranca el servidor local y abre `http://localhost:8080` en tu navegador | Siempre (arranca en segundos) |

## Mientras el servidor está en marcha

- **Recarga automática**: si editas cualquier archivo de `src/` (un artículo en `src/posts/`, el CSS, una plantilla…) y guardas, el navegador se recarga solo con el cambio. Ideal para retocar diseño o revisar textos.
- Puedes navegar por todo: portada, blog con buscador y filtros, los 43 artículos, About, Contact…
- La ventana negra (consola) debe **quedarse abierta**; es el servidor.

## Detener el servidor

- Pulsa `Ctrl + C` en la ventana negra (y confirma con `S` si pregunta), o simplemente **cierra la ventana**.

## Qué NO funciona en local (y es normal)

| Elemento | Por qué | Dónde sí funciona |
|---|---|---|
| Formularios de contacto/suscripción | Los procesa Netlify en su servidor | En el sitio ya desplegado |
| Comentarios (Giscus) | Requiere el repositorio de GitHub configurado | Tras el paso 7 de DESPLIEGUE.md |
| Panel `/admin/` | Requiere Netlify Identity activado | Tras el paso 5 de DESPLIEGUE.md |

Todo lo demás (diseño, navegación, artículos, buscador, filtros, imágenes) es idéntico al sitio final.

## Problemas frecuentes

- **"Node.js no está instalado"** → instala Node LTS desde nodejs.org y vuelve a ejecutar el .bat.
- **El navegador se abre antes que el servidor y da error** → espera 2-3 segundos y recarga la página (F5).
- **El puerto 8080 está ocupado** → cierra la otra aplicación que lo use, o ejecuta en `cmd` dentro de la carpeta: `npx eleventy --serve --port=8081` y abre `http://localhost:8081`.
- **Errores raros tras mover la carpeta** → borra la carpeta `node_modules` y vuelve a ejecutar el .bat (reinstalará limpio).

## En Mac o Linux

No uses el .bat; en una terminal dentro de la carpeta del proyecto:

```bash
npm install   # solo la primera vez
npm start     # abre http://localhost:8080
```


---

# Opción PORTABLE (sin instalar Node.js)

Si tu PC no permite instalar programas, usa el paquete **lifelibertyandlove-portable.zip**, que ya incluye:

- `tools/node/node.exe` — Node.js v22.23.1 portable (no se instala, no requiere permisos de administrador, no toca el registro ni el PATH del sistema).
- `node_modules/` — todas las dependencias ya descargadas (no hace falta `npm install` ni internet).
- `probar-sitio-portable.bat` — arranca todo con doble clic.

## Pasos

1. Descomprime `lifelibertyandlove-portable.zip` (p. ej. en `C:\proyectos\` o en tu escritorio).
2. Entra en la carpeta `site`.
3. Doble clic en **`probar-sitio-portable.bat`** → se abre `http://localhost:8080` con el sitio.

## Procedencia y verificación del binario

El `node.exe` incluido es el **binario oficial de Node.js** republicado en el registro npm como paquete `node-win-x64` (proyecto node-bin-gen). Datos para verificarlo (también en `tools/node/ORIGEN.txt`):

- Versión: v22.23.1 win-x64
- SHA-256: `f8d162c0641dcee512132f3bcf8a68169c7ecb852efd8e1a46c9fec5a0f469ed`
- Comprobable contra la lista oficial `https://nodejs.org/dist/v22.23.1/SHASUMS256.txt` desde cualquier equipo con acceso.
- En Windows puedes calcular el hash con: `certutil -hashfile tools\node\node.exe SHA256`

> Nota: si la descarga de Node está bloqueada por política de tu empresa (y no por un problema técnico), confirma con IT antes de ejecutar binarios portables en el equipo corporativo.

---

# Opción SIN NADA (ver el sitio con doble clic)

Si solo quieres **ver y navegar** el sitio (sin editar en vivo), usa **vista-previa-sin-instalar.zip**:

1. Descomprímelo.
2. Doble clic en `index.html`.

Es el sitio ya generado con rutas relativas: funciona directamente en el navegador, sin servidor, sin Node, sin permisos. Portada, blog, buscador, filtros y los 43 artículos operan al 100%. La única diferencia con la opción portable es que no hay recarga automática al editar archivos (es una "foto" del sitio, no un entorno de desarrollo).

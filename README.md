# AVHUB

**AVHUB is your assessor for AV projects in an easy, helpful, and handy APP.**

AVHUB es el punto de encuentro de las herramientas AV profesionales: una única app, pensada para el móvil y el uso táctil, que reúne el cálculo de pantallas, la configuración de hardware, las novedades del sector y las herramientas de contenido interactivo.

- Web: https://avhub.mediaservi.com
- Estado: **beta-3 · mockup de estructura** (la rama `main` mantiene la landing provisional hasta el lanzamiento).
- Licencia: GPL-3.0 (ver `LICENSE`).

---

## Secciones

| Pestaña | Icono | Función | Acceso directo |
|---|---|---|---|
| [P1] **AVHUB** | `icon-home.svg` | HOME: entrada de la petición por texto, voz (micrófono), audio subido o botones de filtrado. | https://avhub.mediaservi.com |
| [P2] **SCREEN** | `icon-screen.svg` | Calculador de pantallas: una o varias, sala inmersiva, LED o proyección (fusión de SCREENCALC y SCREENBOX). | https://screencalc.mediaservi.com |
| [P3] **HARDWARE** | `icon-hardware.svg` | Selección del hardware necesario y recomendado; las peticiones se acumulan en un borrador y **CALCULA PROYECTO** genera un informe único en PDF de proyecto técnico. | https://hardware.mediaservi.com |
| [P4] **NEWS** | `icon-news.svg` | Novedades, próximos cursos de formación y ofertas. | https://news.mediaservi.com |
| [P5] **VJSHOW** | `icon-vjshow.svg` | Visuales reactivos al audio para una o varias pantallas, incluidas salas inmersivas. | https://vjshow.mediaservi.com |
| [P6] **MSGAME** | `icon-joystick.svg` | Mediaservi Game System: videojuegos en cartuchos para una o varias pantallas con el móvil como mando (parte de VJSHOW). | https://vjshow.mediaservi.com |

Cuando todo esté unificado, cada subdominio abrirá la app directamente en su pestaña.

## Estructura de pantallas

- **Móvil:** la app se mueve entre páginas del tamaño de la pantalla (deslizar o flechas ‹ ›). La página 1 contiene la pestaña fija [MS1] con la barra [P1]…[P6]; las páginas siguientes muestran los bloques de resultados [BLA]…[BLF] y son las únicas con scroll vertical. Se respeta la *safety zone* superior del dispositivo.
- **Pantalla grande:** la pestaña fija queda a la izquierda y la zona de resultados a la derecha muestra tantos bloques como permita el espacio, con scroll de bloques.
- **Zonas de anuncios:** [ADS ZONE 1] y [ADS ZONE 2], puntos de inserción localizados que se activan o desactivan desde el panel de administrador.
- **Cabecera [HEA]:** logo (sin enlace), idioma, descargar app, información (README / descargar) y acceso de administrador.

## Identidad visual

### Tipografía
- **Inter Bold** — botones y títulos de sección.
- **Inter Regular** — textos, menús y descripciones.

### Paleta

| Muestra | Nombre | Hex | Uso |
|---|---|---|---|
| ![#00ff04](https://placehold.co/24x24/00ff04/00ff04.png) | **Verde eléctrico** (Energy Green) | `#00ff04` | Estados activos y seleccionados, contornos de iconos principales, indicadores ON, pasos activos, alertas críticas de hardware y textos destacados. Evoca los LED de *Signal Present*. |
| ![#9900ff](https://placehold.co/24x24/9900ff/9900ff.png) | **Violeta neón** (Cyber Violet) | `#9900ff` | Acento de marca, degradados premium, submenús secundarios y rellenos translúcidos. Atmósfera inmersiva y creativa. |
| ![#2A2A2A](https://placehold.co/24x24/2A2A2A/2A2A2A.png) | **Gris neutrón** (Hardware Gray) | `#2A2A2A` | Chasis de la app en modo oscuro: paneles, barras de navegación, tarjetas y contenedores, con acabado tipo aluminio anodizado de rack técnico. |

## Idiomas

Castellano (predeterminado), English, Català, Galego, Euskara y Português, traducidos de forma nativa sin servicios externos. La selección es transversal: una vez elegida se aplica a todas las apps hasta que el usuario la cambie.

## Estructura del repositorio

```
AVHUB
 ┣ index.html          landing provisional (main)
 ┣ mockup/index.html   maqueta navegable de la nueva app (beta)
 ┣ assets
 ┃ ┣ icons/            iconos de sección (SVG)
 ┃ ┗ audio/
 ┗ docs/screencalc/    conocimiento técnico heredado de SCREENCALC
```

## Avisos

- ⚠️ APP experimental con motor IA que puede cometer errores. Verifique los resultados con su método de cálculo habitual.
- Las propuestas se calculan automáticamente y deben contrastarse con un técnico antes de acometer cualquier proyecto.

## Versiones

- **beta-3** — El botón de administrador del mockup abre el panel de administrador publicado (acceso solo del propietario con su cuenta de Google).
- **beta-2** — Mockup navegable de la estructura (móvil y pantalla grande), cabecera con idioma/descarga/info/admin, pestañas P1–P6, bloques BLA–BLF y zonas de anuncios. README con identidad visual.
- **beta-1** — Conocimiento y referencias acumuladas de SCREENCALC en `docs/screencalc`.

---

Un proyecto de [mediaservi.com](https://mediaservi.com).

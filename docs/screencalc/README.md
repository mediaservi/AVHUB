# Conocimiento acumulado de SCREENCALC (para la migración a AVHUB)

Carpeta de referencia creada el 2026-11-07. **No contiene datos del catálogo ni su origen** (son confidenciales: el catálogo es el corazón de la app).
Estado de SCREENCALC al copiar: `main` = v4.24 (versión pública aprobada), repositorio `mediaservi/SCREENCALC`, página https://mediaservi.github.io/SCREENCALC/.

## Reglas de trabajo (propietario: Josep, responder SIEMPRE en español)
- Cambios estrictamente los solicitados: no tocar estructura, estética ni otros aspectos que no se pidan.
- Los datos salen siempre en vivo del catálogo real: nunca datos de muestra o locales (solo último recurso sin conexión).
- Solo se usa el catálogo de modelos (ni hierros ni la hoja de electrónicas antigua: hay motor propio de electrónica).
- El catálogo debe ir oculto/cifrado/integrado en el dispositivo: nadie debe poder imprimir una hoja tipo Excel ni replicarla. **Nunca mencionar el origen de los datos en ningún texto** (UI, README, comentarios, logs).
- Cada petición = versión nueva: subir versión en el archivo, changelog en cabecera, README actualizado (descripción, funciones, versión, cambios; licencia GPL-3.0).
- **Nueva regla (2026-11-07): en SCREENCALC y en AVHUB NO se sube a `main`; se crean betas numeradas en cada repositorio** (`beta-1`, `beta-2`…). `main` solo con orden expresa del propietario.
- Cuando el propietario dice «toma nota… aún no lo ejecutes»: solo anotar (ver `PENDIENTES.md`).
- Commits terminan con las líneas `Co-Authored-By: Claude …` y `Claude-Session: …` indicadas por el entorno.

## Arquitectura de SCREENCALC (v4.24)
- Un único `index.html`: React 18 + Babel Standalone + Tailwind CDN (config con paleta corporativa), PWA (`manifest.json`, `sw.js`).
- Paleta: `#73ac44`, `#00a792`, `#0f584c` (verde oscuro: cabeceras), `#ccff00` (lima: parpadeos, logo, resaltados).
- Iconos: máscaras CSS `.ic-<nombre>` (PNG/SVG embebidos en base64) con helper `<Ic n="…"/>`; stock/order/brochure/warning son SVG.
- Datos: se descarga solo el catálogo de modelos (URL montada en ejecución desde partes base64), se guarda cifrado (AES-GCM, clave derivada en código = ofuscación, no seguridad real) en `localStorage`; `cargarRef` para el botón de descarga offline. Una web estática no puede ocultar del todo el enlace: protección real = no publicar la hoja en abierto y servirla con Apps Script autenticado.
- Integridad de filas: se descartan sin referencia, clase distinta de INSTALL/RENTAL, tipo distinto de INDOOR/OUTDOOR/ESCAPARATE, NOSHOW. (Hubo un fallo grave: cabinets de exterior listados al pedir interior → auditoría y filtros.)
- Motor de lenguaje natural (`parseSolicitud`): lee tipo/clase/medidas/pitch/nits/distancia/resolución/electrónica/mediaserver; «pantalla 4K de interior» sin medidas → menor pantalla que alcance la resolución (por defecto UFIX-COB-0.9, 360×202 cm, 3840×2160).
- Prioridad de modelos: stock primero; INSTALL/INDOOR SMD UfixAvant; protegido: HOB UfixAvant o COB UfixCOB; INSTALL/ESCAPARATE Slimfix; INSTALL/OUTDOOR Jfix (JFIXII y luego JFIX-K). Pregunta «protegido» (espacio público).
- Cosido de cable (AUTO/VERTICAL/HORIZ.), esquema de conexiones y potencias, PDF de 2 páginas (versión lite y completa; comprobar siempre).
- Simulación: pantalla con cotas, figura de 1,75 m, botón SIMULAR CONTENIDO, elevación desde el suelo con botones ▲▼ (10 cm), distancias de visionado.
- Idiomas (v4.22): traducción nativa por diccionario de frases (`i18n/d*.txt`: es|en|ca|gl|eu|pt) + motor que traduce nodos de texto y atributos con MutationObserver; el lenguaje natural se normaliza al vocabulario castellano con léxicos por idioma (`engine_tail.js`); micrófono (`SpeechRecognition`) y transcripción de audio (Whisper en el navegador) usan el idioma elegido. Reglas: frases largas primero, entradas `^` = solo nodo exacto. Traducciones hechas por IA: pendientes de revisión por nativos (eu/gl/ca).
- Disclaimers vigentes: «*Estas propuestas se calculan automáticamente por IA que puede cometer fallos. Verifique estos cálculos mediante su método habitual o contrastando con un técnico. Algunas electrónicas menos recientes pueden tener limitaciones entre columnas que invalidarían esta propuesta de conectividad.» y «⚠️ APP experimental con motor IA que puede cometer errores. Verifique los resultados con su método de cálculo habitual.»

## Lecciones técnicas
- Reemplazos globales con regex sobre el HTML pueden romper selectores `@media print` (nombres Tailwind dentro de `<style>`): verificar siempre el PDF (2 páginas).
- `s.replace('', x, 1)` inserta al principio del archivo: validar índices antes de cortar/pegar bloques.
- `atob` sobre partes base64 partidas falla: unir primero y decodificar después.
- Playwright: redirigir la salida a fichero; nunca `pkill -f` con un patrón que esté en el propio comando; compilar con Babel (`tests/compile_check.js`) tras cada cambio.
- Tailwind CLI tarda ~200 s al reconstruir el CSS de pruebas.
- Sandbox: CDN bloqueados (no se puede verificar el modo offline completo).

## Contenido de esta carpeta
- `PENDIENTES.md` — cambios anotados y sin ejecutar.
- `i18n/` — diccionarios y motor de traducción (reutilizable en AVHUB).
- `tests/` — scripts de Playwright (layout, PDF, flujo 4K, auditoría de textos sin traducir, lenguaje natural). Requieren el catálogo local de pruebas (no incluido).
- `assets/` — logo SCREENCALC (blanco/lima y verde), isotipo/favicon, iconos de app, paleta y `warning.svg`.
- `manifest.json`, `sw.js` — PWA.

## Fuente de referencia de producto (decisión del propietario)
El fabricante **Traulux** (https://traulux.net/led/) manda: gama completa e información de cabinets. Si falta imagen/dato/material se completa desde allí; en el futuro podría sustituir al catálogo actual. Búsqueda por referencia: `https://traulux.net/buscar/?q=<REFERENCIA>`.

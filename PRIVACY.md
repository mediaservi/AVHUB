# AVHUB · Política de privacidad

*Última revisión: 24 de noviembre de 2026. Redactada a partir de una revisión del código y de los servicios que usa realmente la aplicación.*

## Responsable

El autor del proyecto: mediaservi.com, proyecto personal de un desarrollador particular (persona física) residente en España. Contacto para cualquier asunto de privacidad: mediaservibcn@gmail.com.

## Lo esencial

- **No hay registro de usuarios, ni publicidad, ni seguimiento.** Solo un **contador de visitas anónimo y sin cookies** (más abajo).
- La aplicación **no instala cookies propias**.
- Tus ajustes se guardan **en tu propio navegador** (almacenamiento local) y no se envían al autor.
- Aparte de ese recuento anónimo, el único dato que llega al autor es el que envías tú, voluntariamente, con el **botón rojo de aviso de fallos**.

## Avisos de fallo

Si usas el botón rojo, se envía: tu descripción, el correo que indiques (opcional), las capturas que adjuntes, la dirección de la página, el tamaño de la pantalla y el tipo de navegador.

- **Para qué:** entender y corregir el fallo y, si dejas un correo, responderte.
- **Base jurídica:** tu consentimiento al enviarlo (art. 6.1.a del RGPD).
- **Conservación:** el tiempo necesario para resolver el fallo y, como máximo, 24 meses.
- **Quién lo ve:** solo el autor. Se recibe a través de Google (Apps Script y Gmail), que actúa como proveedor; puede implicar transferencias internacionales amparadas por las garantías que ofrece Google.
- No envíes datos personales de otras personas ni información sensible en un aviso.

## Contador de visitas anónimo (sin cookies)

Para saber si una campaña funciona (por ejemplo, cuántas visitas llegan desde un enlace publicado en LinkedIn), la portada de AVHUB lleva un **contador de visitas mínimo y anónimo**. Al abrirla envía **solo** esto:

- el sitio y la página visitada (por ejemplo, `avhub.mediaservi.com` y `/`);
- las etiquetas de campaña que lleve el enlace, si las lleva: `utm_source`, `utm_campaign` y `utm_content`;
- el **dominio** de la web de procedencia (por ejemplo, `linkedin.com`), nunca la dirección completa.

Y **no** envía ni guarda: cookies, identificadores, huellas del navegador, direcciones IP, idioma, pantalla ni ningún dato tuyo. No escribe nada en tu navegador y no permite reconocerte entre una visita y otra. La petición sale sin credenciales (`credentials: 'omit'`), así que tampoco viajan cookies de otros servicios. El autor recibe la fecha y los datos de arriba en una hoja de cálculo de su panel (Google Apps Script y Google Sheets, como proveedor); Google, como cualquier servidor, ve la dirección IP de la conexión, pero el contador no tiene acceso a ella y no la guarda.

- **Para qué:** contar visitas y saber qué enlaces funcionan. Nada más.
- **Base jurídica:** interés legítimo en conocer, de forma agregada y anónima, el uso de la portada de AVHUB (art. 6.1.f del RGPD). Al no usar cookies ni acceder a tu dispositivo, no requiere aviso de consentimiento.
- **Conservación:** los recuentos se guardan un máximo de 24 meses.
- **Si no quieres contar:** activa «Do Not Track» o «Global Privacy Control» en tu navegador y el contador no envía nada. Activo desde el 24-11-2026; en el panel solo quedan recuentos por día.

## Servicios externos que intervienen

Como cualquier web, al abrirla tu navegador se conecta a los servicios que la hacen funcionar. Cada uno recibe, como mínimo, tu dirección IP:

| Servicio | Para qué | Datos que puede tratar |
|---|---|---|
| GitHub Pages (GitHub, Inc.) | alojamiento de la web | dirección IP y datos técnicos de la conexión, que GitHub registra por seguridad |
| Google Apps Script y Gmail (Google) | leer textos y datos comunes de la familia, recibir los avisos de fallo y el contador de visitas anónimo | dirección IP; en un aviso de fallo, lo que tú escribas, el correo que indiques (opcional), las capturas que adjuntes, la dirección de la página, el tamaño de pantalla y el tipo de navegador |

Esos proveedores aplican sus propias políticas de privacidad y el autor no tiene acceso a sus registros.

## Tus derechos

Puedes pedir el acceso, la rectificación o la supresión de tus datos, limitar u oponerte a su tratamiento, pedir su portabilidad y retirar tu consentimiento escribiendo a mediaservibcn@gmail.com. Si crees que no se han atendido, puedes reclamar ante la Agencia Española de Protección de Datos (www.aepd.es) o ante la autoridad de tu país.

## Menores

La aplicación no está dirigida a recoger datos de menores y no los solicita.

## Cambios

Si cambian los tratamientos, se actualizará este documento y su fecha.

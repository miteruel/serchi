# Editor de cursos

Guía para los profesores de Liberanimo que crean cursos como el minicurso
*Esperanto en 7 tagoj*.

## Entrar

Abre **`/editor.html`** en la web (por ejemplo `https://serchi.ejemplo.org/editor.html`)
y escribe la clave de moderador, la misma del foro (`FORUM_MODERATOR_KEY`). El editor
funciona en las dos versiones del servidor, Node y Delphi.

## Crear un curso

1. Escribe el título, elige en qué idioma van las explicaciones (español o inglés) y
   pulsa **Crear curso**. Queda como **borrador**: nadie lo ve hasta que lo publiques.
2. Rellena la **presentación**, un par de frases que salen bajo el título.
3. Pulsa **Añadir lección** para cada día del curso. Cada lección tiene:
   - un **título**, normalmente en esperanto (*Saluton!*), y un **subtítulo** con lo
     que se aprende (*Saludar y presentarse*);
   - una **imagen** (PNG, JPEG, WebP o GIF de hasta 2 MB) y una frase que la describa
     para quien no la ve;
   - **bloques**, que se añaden con los botones de abajo y se ordenan con ↑ y ↓;
   - el **reto del día**, una pequeña tarea para hacer en casa.
4. Pulsa **Vista previa** para ver el curso tal como quedará, sin publicarlo.
5. Pulsa **Guardar**. Cuando esté listo, marca **Publicado** y vuelve a guardar. El
   curso aparece en `/kurso/<dirección>` y en la lista de cursos, `/kursoj`.

## Los bloques

| Bloque | Qué escribir |
|---|---|
| **Palabras** | Una palabra por línea: `esperanto = traducción`. Por ejemplo `pomo = manzana`. |
| **Texto** | Una explicación. |
| **Regla** | Una regla corta, que sale destacada en amarillo. |
| **Ejercicio** | Las preguntas, una por línea, y las soluciones, una por línea y en el mismo orden. Las soluciones quedan ocultas hasta que se pulsa «Ver soluciones». |
| **Diálogo** | Una frase por línea: `esperanto = traducción`. Las frases se alternan entre dos personajes. |

En los textos (presentación, texto, regla, ejercicios y reto) se puede escribir:
- `**negrita**` para resaltar algo;
- `{{esperanto}}` para las palabras o frases en esperanto: salen en verde y, si alguien
  las graba, con el botón 🔊.

## Sonido

Las palabras de los bloques *Palabras* y *Diálogo* y lo escrito entre `{{ }}` aparecen
en la página [Graba el minicurso](../public/grabar.html) (`/grabar.html`) cuando el
curso está publicado. Cuando un moderador aprueba una grabación, el botón 🔊 sale
también en tu curso. Si una palabra ya estaba grabada para el minicurso, se usa la
misma grabación.

## Cosas a saber

- **Guardar:** el editor avisa si intentas salir con cambios sin guardar.
- **Imágenes:** al quitar o cambiar la imagen de una lección, la anterior se borra al
  guardar.
- **Borrar un curso** lo elimina con sus lecciones e imágenes; no se puede deshacer.
  Las copias de seguridad diarias (ver [DESPLIEGUE.md](DESPLIEGUE.md)) incluyen los
  cursos.
- **Progreso de los alumnos:** el progreso por días y el nombre del diploma se guardan
  en el navegador de cada alumno, no en el servidor.

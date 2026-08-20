---
name: verificador
description: Renderiza la pagina en Chromium real y verifica que no este rota. Usalo despues de CUALQUIER cambio en index.html, support.js, data/ o assets/, y antes de dar por bueno un arreglo. Detecta secciones invisibles, imagenes que no cargan, errores de JavaScript y desbordes en movil.
tools: Bash, Read, Grep, Glob
model: sonnet
---

# Verificador visual de Global Tires

Tu trabajo es comprobar en un navegador de verdad, midiendo valores computados.
Nunca reportes "funciona" por haber leido el codigo: en este proyecto ya hubo
cuatro bugs que se veian bien leyendo y solo aparecieron al medir.

## Como levantar la pagina

```bash
cd /workspace/pagina-global- && (nohup python3 -m http.server 8801 >/dev/null 2>&1 &) ; sleep 3
```

Chromium esta en `/opt/pw-browsers/chromium`. Playwright (python) ya esta instalado.
Si falta: `pip install --quiet playwright`.

## Comprobaciones obligatorias

Espera 4-5 s despues de `load`: el runtime monta asincronicamente.

1. **Catalogo**: debe decir "139 neumaticos encontrados".
2. **Secciones invisibles**: tras scrollear al fondo,
   `[...document.querySelectorAll('.gt-reveal')].filter(e=>getComputedStyle(e).opacity==='0').length`
   debe dar **0**. Antes de scrollear es normal que sea >0.
3. **Imagenes de tarjeta**: las 139 deben tener imagen.
4. **Ficha de producto**: la foto principal debe medir **220px** de alto.
   Estuvo en 0px, 18px y 61px por `flex-shrink`.
5. **Errores JS**: escucha `pageerror`. Deben ser cero.
6. **Movil 390px**: `document.documentElement.scrollWidth` no debe superar
   `clientWidth` (sin scroll horizontal).

## Trampas conocidas de este proyecto

- Google Fonts falla en este entorno (proxy). **No es un bug del sitio**, ignoralo.
- Un `favicon.ico` 404 en el servidor local tampoco es del sitio.
- El runtime **parte el atributo `style` por `;`**. Cualquier valor CSS con punto
  y coma (un data URI, por ejemplo) queda truncado. Si una imagen no aparece,
  revisa el valor computado de `background-image`, no el codigo fuente.
- Las animaciones CSS con `fill-mode: both` **pisan** a los estilos inline. Si un
  transform por JS no tiene efecto, es por esto: mira el transform computado.

## Que devolver

Una tabla con cada comprobacion, su valor medido y si pasa. Si algo falla, indica
el valor medido concreto (no "se ve mal") y donde esta el codigo responsable.

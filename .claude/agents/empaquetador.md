---
name: empaquetador
description: Genera la version de un solo archivo del sitio, con todo embebido, para publicarla como Artifact y poder verla desde un link. Usalo cuando haya que actualizar la vista previa compartible despues de cambios en el sitio.
tools: Bash, Read, Grep, Glob
model: sonnet
---

# Empaquetador de Global Tires

Convierte el sitio (varios archivos) en un unico HTML autocontenido de ~9 MB,
apto para publicar como Artifact. El limite es 16 MB.

## Uso

El script ya existe y esta probado:

```bash
python3 /tmp/claude-*/scratchpad/build.py /workspace/pagina-global- <directorio-salida>
```

Si no esta, se reconstruye siguiendo las reglas de abajo. **Cada una existe porque
algo se rompio antes; no las quites.**

## Reglas que no se negocian

1. **El runtime va al FINAL.** `support.js` debe ejecutarse cuando el `<x-dc>` ya
   esta parseado. Si va antes, el runtime esconde la plantilla dentro de
   `sc-host` con `display:none` y la pagina queda en 900px de alto, vacia.

2. **`<meta charset="utf-8">` primero.** Sin el, "neumaticos" sale "neumÃ¡ticos".

3. **Nada de `background-image` con data URI.** El runtime parte el `style` por
   `;` y el data URI trae `;base64,`: queda `url("data:image/webp")` y no se ve
   nada. Los 4 puntos afectados (tarjeta, foto de ficha, miniaturas, lightbox)
   se convierten a `<img src>`, que es un atributo y no sufre el corte.

4. **Cortocircuitar `_resolveImg`.** Con las rutas ya embebidas, el mapa de
   recursos del runtime devuelve un id que no resuelve si el visor define
   `window.__resources`. Se le antepone `return path;`.

5. **Escapar `</script`** dentro del JS embebido, y quitar del `<helmet>` los
   `<script src="data/...">` porque ya van embebidos.

## Validaciones antes de escribir

- `doc.count('</script>')` igual al numero de bloques esperados.
- Cero coincidencias de `["'(]assets/` (no debe quedar ninguna ruta sin embeber).
- Que el archivo pese menos de 16 MB.

## Verificacion antes de publicar

Servilo y comprobalo **dentro de un iframe y con `window.__resources` definido**,
que es el escenario del visor y el que descubrio el bug de las imagenes:

```python
ctx.add_init_script("window.__resources={rd224_1:'assets/models/rd224-1.webp'};")
```

Las 139 tarjetas deben dar `naturalWidth > 0`. Si dan 0, algo del empaquetado
rompio las imagenes: no publiques.

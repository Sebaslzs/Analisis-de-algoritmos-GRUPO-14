# Tareas del equipo

Les dejo esto para que trabajemos al mismo tiempo sin pisarnos los archivos. Cada uno edita solo lo suyo. El contrato de abajo ya está en el código: impórtenlo y no lo reescriban en otro archivo.

Si hace falta cambiar una firma, lo hablamos primero. La cambia quien es dueño de ese archivo y los demás adaptan su propio código.

## Contrato

Paciente:

```javascript
{ id, nombre, costo, beneficio }
```

`costo` entero mayor que 0. `beneficio` entero mayor o igual que 0. `capacidad` entero mayor o igual que 0. En los ejemplos, dejen la capacidad en 30 o menos para que la tabla quepa en la página.

`src/algoritmo/mochila.js` — esto lo hago yo.

```javascript
resolverAsignacion(pacientes, capacidad)
// => { beneficioTotal, costoTotal, seleccionados, tabla }
```

`tabla` tiene `pacientes.length + 1` filas y `capacidad + 1` columnas. `seleccionados` es la lista de pacientes elegidos, con los mismos objetos de la entrada.

`src/datos/validar.js` — Brayan, esto es tuyo.

```javascript
validarEntrada(pacientes, capacidad)
// => { valido, errores }
```

`errores` es una lista de textos. Esta función no calcula la mochila.

`src/datos/ejemplos.js` — Brayan, esto también es tuyo.

```javascript
ESCENARIOS // { id, archivo }
cargarEjemplo(id) // fetch del JSON y devuelve { nombre, capacidad, pacientes }
```

Cuando agregues un JSON, agrega también una entrada en `ESCENARIOS`. La ruta del archivo es desde la raíz del proyecto, porque `fetch` se resuelve contra `index.html`.

`src/ui/tabla.js` — Miguel, esto es tuyo.

```javascript
renderizarTabla(contenedor, tabla)
```

## Archivos de cada uno

Yo me quedo con:

- `src/algoritmo/mochila.js`
- `tests/mochila.test.js`
- `package.json`
- README, bloques `<!-- SEBASTIAN -->`

No toco HTML, CSS, JSON ni `src/datos/`.

Brayan, estos son los tuyos:

- `src/datos/validar.js`
- `src/datos/ejemplos.js`
- `ejemplos/`
- `docs/casos-de-prueba.md`
- README, bloques `<!-- BRAYAN -->`

No toques `mochila.js` ni `src/ui/`.

Miguel, estos son los tuyos:

- `index.html`
- `src/ui/app.js`
- `src/ui/tabla.js`
- `src/ui/estilos.css`
- README, bloques `<!-- MIGUEL -->`

No toques la fórmula, los JSON ni `validar.js`.

El README lo compartimos por bloques. Escribe solo dentro de tus comentarios y deja quietos los de los demás.

## Qué falta por hacer

Yo me encargo de:

- Llenar `tabla` con los casos base y la recurrencia que dejé en el README.
- Reconstruir `seleccionados`, `beneficioTotal` y `costoTotal`.
- Ampliar `tests/mochila.test.js` con el caso que Brayan resuelva a mano, capacidad 0, un paciente que no cabe y la lista vacía. El test que ya está solo fija la forma de la respuesta; lo dejo pasando.
- Completar mi bloque del algoritmo en el README y pegar el enlace de mi video.

Brayan, te falta:

- Completar el enunciado en el README.
- Mantener `ejemplos/turno-corto.json` y sumar `turno-lleno.json` y `no-alcanza.json`, registrados en `ESCENARIOS`.
- En `validar.js`, rechazar costo no entero o menor o igual que 0, beneficio negativo o no entero, y capacidad negativa o no entera.
- Resolver `turno-corto` a mano en `docs/casos-de-prueba.md`.
- Escribir los resultados numéricos de los tres escenarios en el README y pegar el enlace de tu video.

Miguel, te falta:

- El formulario de capacidad y de pacientes (nombre, costo, beneficio), más un control para cargar un id de `ESCENARIOS`.
- Al calcular: llamar `validarEntrada` y, si `valido` es verdadero, llamar `resolverAsignacion`.
- Mostrar beneficio total, costo usado, pacientes elegidos y la tabla. Resalta la celda `tabla[n][capacidad]`.
- Usar `renderizarTabla` para la tabla.
- Completar "Cómo ejecutarlo" y pegar el enlace de tu video.

Dejé `src/ui/app.js` importando las tres piezas y cargando `turno-corto`. Miguel, puedes armar la página sobre ese archivo sin esperar a que yo termine la mochila: por ahora devuelve ceros.

## Orden

1. Brayan, publica pronto la tabla a mano de `turno-corto`. Con eso yo escribo la prueba y Miguel tiene el primer escenario.
2. Lo demás lo hacemos en paralelo, cada uno en su carpeta.
3. Al final, Miguel, confirma que la página llama a `resolverAsignacion` ya implementada. Brayan, compara los tres JSON con los números del README.

## Videos

Cada uno graba entre 3 y 5 minutos. En el video explica su aporte y demuestra que conoce la solución: problema, algoritmo, recurrencia, estados, casos base, implementación y resultados.

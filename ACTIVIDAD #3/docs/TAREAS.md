# Tareas del equipo

Sebastián López, Brayan y Miguel trabajan a la vez. Cada uno edita solo sus archivos. El contrato de abajo ya está en el código: se importa y no se reescribe en otro archivo.

Si hace falta cambiar una firma, se acuerda en el grupo y la modifica quien es dueño de ese archivo. Los otros adaptan su propio código.

## Contrato

Paciente:

```javascript
{ id, nombre, costo, beneficio }
```

`costo` entero mayor que 0. `beneficio` entero mayor o igual que 0. `capacidad` entero mayor o igual que 0. En los ejemplos, dejar la capacidad en 30 o menos para que la tabla quepa en la página.

`src/algoritmo/mochila.js` — dueño: Sebastián López

```javascript
resolverAsignacion(pacientes, capacidad)
// => { beneficioTotal, costoTotal, seleccionados, tabla }
```

`tabla` tiene `pacientes.length + 1` filas y `capacidad + 1` columnas. `seleccionados` es la lista de pacientes elegidos, con los mismos objetos de la entrada.

`src/datos/validar.js` — dueño: Brayan

```javascript
validarEntrada(pacientes, capacidad)
// => { valido, errores }
```

`errores` es una lista de textos. Esta función no calcula la mochila.

`src/datos/ejemplos.js` — dueño: Brayan

```javascript
ESCENARIOS // { id, archivo }
cargarEjemplo(id) // fetch del JSON y devuelve { nombre, capacidad, pacientes }
```

Al agregar un JSON, se agrega una entrada en `ESCENARIOS`. La ruta del archivo es desde la raíz del proyecto, porque `fetch` se resuelve contra `index.html`.

`src/ui/tabla.js` — dueño: Miguel

```javascript
renderizarTabla(contenedor, tabla)
```

## Archivos de cada uno

Sebastián López

- `src/algoritmo/mochila.js`
- `tests/mochila.test.js`
- `package.json`
- README, bloques `<!-- SEBASTIAN -->`

No edita HTML, CSS, JSON ni `src/datos/`.

Brayan

- `src/datos/validar.js`
- `src/datos/ejemplos.js`
- `ejemplos/`
- `docs/casos-de-prueba.md`
- README, bloques `<!-- BRAYAN -->`

No edita `mochila.js` ni `src/ui/`.

Miguel

- `index.html`
- `src/ui/app.js`
- `src/ui/tabla.js`
- `src/ui/estilos.css`
- README, bloques `<!-- MIGUEL -->`

No edita la fórmula, los JSON ni `validar.js`.

`README.md` se comparte por bloques. Cada persona escribe dentro de sus comentarios y deja intactos los de los otros.

## Qué falta por hacer

Sebastián López

- Llenar `tabla` con los casos base y la recurrencia descritos en el README.
- Reconstruir `seleccionados`, `beneficioTotal` y `costoTotal`.
- Ampliar `tests/mochila.test.js` con el caso que Brayan resuelva a mano, capacidad 0, un paciente que no cabe y la lista vacía. El test que ya está solo fija la forma de la respuesta; hay que dejarlo pasando.
- Completar su bloque del algoritmo en el README y pegar el enlace del video.

Brayan

- Completar el enunciado en el README.
- Mantener `ejemplos/turno-corto.json` y sumar `turno-lleno.json` y `no-alcanza.json`, registrados en `ESCENARIOS`.
- En `validar.js`, rechazar costo no entero o menor o igual que 0, beneficio negativo o no entero, y capacidad negativa o no entera.
- Resolver `turno-corto` a mano en `docs/casos-de-prueba.md`.
- Escribir los resultados numéricos de los tres escenarios en el README y pegar el enlace del video.

Miguel

- Formulario de capacidad y de pacientes (nombre, costo, beneficio), más un control para cargar un id de `ESCENARIOS`.
- Al calcular: llamar `validarEntrada` y, si `valido` es verdadero, llamar `resolverAsignacion`.
- Mostrar beneficio total, costo usado, pacientes elegidos y la tabla. Resaltar la celda `tabla[n][capacidad]`.
- Usar `renderizarTabla` para la tabla.
- Completar "Cómo ejecutarlo" y pegar el enlace del video.

`src/ui/app.js` ya importa las tres piezas y carga `turno-corto`. La página puede construirse sobre ese archivo sin esperar a que la mochila deje de devolver ceros.

## Orden

1. Brayan publica pronto la tabla a mano de `turno-corto`. Con eso Sebastián escribe la prueba y Miguel tiene el primer escenario.
2. El resto avanza en paralelo, cada quien en su carpeta.
3. Al final Miguel comprueba que la página llama a `resolverAsignacion` real y Brayan compara los tres JSON con los números del README.

## Videos

Mínimo 3 minutos y máximo 5 por persona. En el video se explica el aporte propio y se demuestra que se conoce la solución: problema, algoritmo, recurrencia, estados, casos base, implementación y resultados.

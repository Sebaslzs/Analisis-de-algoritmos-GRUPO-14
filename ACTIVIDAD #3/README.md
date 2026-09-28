# Asignación de recursos de UCI

Desarrollo del examen 3 de Análisis de Algoritmos (programación dinámica). Grupo 14.

Integrantes: Sebastián López, Brayan y Miguel.

Entrega: repositorio Git, antes del sábado 10 de octubre de 2026. Cada persona graba su propia sustentación, de 3 a 5 minutos, y pega el enlace en su bloque de videos.

El reparto de archivos y la regla para no pisarse el trabajo están en [docs/TAREAS.md](docs/TAREAS.md).

## Problema

<!-- BRAYAN -->

En un turno, la UCI dispone de una capacidad entera de recurso (horas-cama). Cada paciente en espera pide una cantidad entera de ese recurso y tiene un beneficio clínico entero: la prioridad de atenderlo ahora. Hay que elegir un subconjunto de pacientes que no pase de la capacidad y que maximice la suma de beneficios. Un paciente entra completo o no entra. El recurso no se fracciona.

Brayan amplía esta sección: qué representa el recurso, qué representa el beneficio y por qué revisar todos los subconjuntos deja de servir cuando la lista de pacientes crece.

## Algoritmo

<!-- SEBASTIAN -->

Mochila 0/1. Cada paciente es un objeto que se toma o se deja.

Estado: `dp[i][c]` es el máximo beneficio usando solo los primeros `i` pacientes, con capacidad disponible `c`.

Casos base: `dp[0][c] = 0` para toda capacidad, y `dp[i][0] = 0` para todo paciente. Sin pacientes o sin capacidad el beneficio es 0.

Recurrencia, con el paciente `i` (índice `i - 1` en la lista), costo `w` y beneficio `b`:

- Si `w` cabe en `c`: `dp[i][c] = max(dp[i - 1][c], dp[i - 1][c - w] + b)`.
- Si `w` no cabe: `dp[i][c] = dp[i - 1][c]`.

La respuesta está en `dp[n][capacidad]`. Para saber quién entra, se recorre la tabla hacia atrás: si `dp[i][c]` es mayor que `dp[i - 1][c]`, el paciente `i` fue elegido y la capacidad baja en `w`.

La función compartida vive en `src/algoritmo/mochila.js`:

```javascript
resolverAsignacion(pacientes, capacidad)
```

- Entrada: `pacientes` es una lista de `{ id, nombre, costo, beneficio }`. `costo` y `beneficio` son enteros. `capacidad` es un entero mayor o igual que 0.
- Salida: `{ beneficioTotal, costoTotal, seleccionados, tabla }`.
- `tabla[i][c]` corresponde a `dp[i][c]`. Tiene `pacientes.length + 1` filas y `capacidad + 1` columnas.

Hoy la función arma la tabla en ceros y devuelve listas vacías. Sebastián completa el llenado, la reconstrucción y explica aquí cómo quedó implementada.

## Cómo ejecutarlo

<!-- MIGUEL -->

Hace falta Node.js para las pruebas y un servidor estático para la página. Los módulos de JavaScript no cargan al abrir `index.html` con doble clic.

```bash
npm test
npx serve .
```

Abrir la dirección que imprima el servidor. También sirve la extensión Live Server sobre `index.html`.

Miguel completa esta sección cuando la página tenga el formulario, la lista de pacientes elegidos y la tabla.

## Resultados

<!-- BRAYAN -->

Pendiente. Brayan anota, para cada escenario de `ejemplos/`, la capacidad, el beneficio total, el costo usado y los pacientes seleccionados. El detalle a mano del caso `turno-corto` va en [docs/casos-de-prueba.md](docs/casos-de-prueba.md).

## Videos de sustentación

Cada video cubre el problema, el algoritmo, la recurrencia y los estados, los casos base, la implementación o la aplicación, los resultados y el aporte de quien habla.

<!-- SEBASTIAN -->

- Sebastián López: enlace pendiente.

<!-- BRAYAN -->

- Brayan: enlace pendiente.

<!-- MIGUEL -->

- Miguel: enlace pendiente.

## Aportes

<!-- SEBASTIAN -->

- Sebastián López: algoritmo, pruebas de `resolverAsignacion` y esta sección del README.

<!-- BRAYAN -->

- Brayan: enunciado, escenarios JSON, validación, casos a mano y resultados.

<!-- MIGUEL -->

- Miguel: página, formulario, dibujo de la tabla y puesta en marcha.

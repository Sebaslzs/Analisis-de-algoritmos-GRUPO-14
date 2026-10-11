# Asignación de recursos de UCI

Desarrollo del examen 3 de Análisis de Algoritmos (programación dinámica). Grupo 14.

Integrantes: Sebastián López, Brayan y Miguel.

Entrega: repositorio Git, antes del sábado 10 de octubre de 2026. La sustentación queda enlazada al final de este archivo.

## Problema

<!-- BRAYAN -->

En un turno, la UCI dispone de una capacidad entera de recurso (horas-cama). Cada paciente en espera pide una cantidad entera de ese recurso y tiene un beneficio clínico entero: la prioridad de atenderlo ahora. Hay que elegir un subconjunto de pacientes que no pase de la capacidad y que maximice la suma de beneficios. Un paciente entra completo o no entra. El recurso no se fracciona.

La capacidad representa el total de horas-cama disponibles para el turno; el costo de cada paciente es la cantidad de esas horas que ocuparía. El beneficio es una puntuación de prioridad definida para este ejercicio, no una recomendación clínica real. Cada paciente se atiende completo o queda para otro turno, por lo que el problema corresponde a mochila 0/1.

Para `n` pacientes hay `2^n` subconjuntos posibles. Revisarlos uno por uno escala exponencialmente: al agregar un paciente, se duplica la cantidad de combinaciones. Por ejemplo, 10 pacientes dan 1.024 subconjuntos y 30 dan más de mil millones. Por eso se usa programación dinámica, que reutiliza resultados para subproblemas de prefijos de pacientes y capacidades; su tabla tiene `(n + 1)(capacidad + 1)` estados.

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

En `resolverAsignacion` armo `tabla` con ceros, así quedan los casos base, y después recorro cada paciente y cada capacidad aplicando la recurrencia. Para obtener `seleccionados` vuelvo desde `dp[n][capacidad]` hacia la primera fila: si el valor de la celda es mayor que el de la fila anterior, ese paciente entra y resto su costo. Si las dos celdas son iguales, no lo tomo, así que en un empate me quedo con los pacientes que aparecen primero en la lista. `beneficioTotal` es `dp[n][capacidad]` y `costoTotal` es la suma de los costos elegidos.

## Cómo ejecutarlo

<!-- MIGUEL -->

Hace falta Node.js para las pruebas y un servidor estático para la página. Los módulos de JavaScript no cargan al abrir `index.html` con doble clic.

```bash
npm test
python -m http.server 3000
```

Abrir http://127.0.0.1:3000. También sirve `npx serve .` si se prefiere ese servidor.

La página incluye un formulario para la capacidad del turno, un selector de escenarios predefinidos, una lista editable de pacientes con nombre, costo y beneficio, y un botón para calcular la solución. Al procesar la entrada, se muestra el beneficio total, el costo usado, los pacientes elegidos y la tabla de programación dinámica con la celda final resaltada.

## Resultados

<!-- BRAYAN -->

Los resultados de los escenarios son:

| Escenario | Capacidad | Beneficio total | Costo usado | Pacientes seleccionados |
|---|---:|---:|---:|---|
| `turno-corto` | 5 | 7 | 5 | p1 y p2 (óptimo empatado con p2 y p4) |
| `turno-lleno` | 10 | 17 | 10 | p1 y p2 |
| `no-alcanza` | 6 | 8 | 5 | p2 |

La resolución manual completa de `turno-corto`, incluida la tabla `dp[i][c]`, está en [docs/casos-de-prueba.md](docs/casos-de-prueba.md).

## Video de sustentación

https://correoitmedu-my.sharepoint.com/:v:/g/personal/brayanenriquez250112_correo_itm_edu_co/IQCCqnAMn1GSSJ2HMndWTC8FAfX5n0_KuCG1QaTrl6orf-g

## Aportes

- Sebastián López: algoritmo, pruebas de `resolverAsignacion` y la sección del algoritmo en este README.
- Brayan: enunciado, escenarios JSON, validación, caso resuelto a mano y resultados.
- Miguel: página, formulario, dibujo de la tabla y puesta en marcha.

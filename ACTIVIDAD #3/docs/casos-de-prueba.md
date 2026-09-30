# Casos de prueba

## Turno corto resuelto a mano

La capacidad es 5. Los pacientes disponibles son:

| Índice | ID | Costo | Beneficio |
|---:|---|---:|---:|
| 1 | p1 | 2 | 3 |
| 2 | p2 | 3 | 4 |
| 3 | p3 | 4 | 5 |
| 4 | p4 | 2 | 3 |

`dp[i][c]` representa el mayor beneficio posible usando los primeros `i` pacientes y una capacidad `c`. Las filas corresponden a `i` y las columnas a `c`.

| `i \\ c` | 0 | 1 | 2 | 3 | 4 | 5 |
|---:|---:|---:|---:|---:|---:|---:|
| 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 1 (p1) | 0 | 0 | 3 | 3 | 3 | 3 |
| 2 (p2) | 0 | 0 | 3 | 4 | 4 | 7 |
| 3 (p3) | 0 | 0 | 3 | 4 | 5 | 7 |
| 4 (p4) | 0 | 0 | 3 | 4 | 6 | 7 |

El óptimo es `dp[4][5] = 7`. Una selección óptima es `p1` y `p2`: consume `2 + 3 = 5` unidades y obtiene beneficio `3 + 4 = 7`. También existe un empate con `p2` y `p4`, que igualmente consume 5 y obtiene beneficio 7; el algoritmo puede devolver una de las dos selecciones óptimas según su regla de reconstrucción.

## Validación de entradas

- `capacidad` debe ser un entero mayor o igual que 0.
- `pacientes` debe ser una lista de objetos.
- En cada paciente, `costo` debe ser un entero mayor que 0 y `beneficio` un entero mayor o igual que 0.
- Una lista vacía es válida: no hay pacientes que asignar y el beneficio máximo es 0.

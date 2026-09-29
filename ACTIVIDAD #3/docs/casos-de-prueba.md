# Casos de prueba

Brayan, completa este archivo. Yo uso el caso que resuelvas a mano como prueba del algoritmo, y Miguel lo carga en la página.

Formato de cada escenario, igual al JSON:

- `nombre`: texto del turno
- `capacidad`: entero mayor o igual que 0, recomendado hasta 30 para que la tabla se vea en pantalla
- `pacientes`: lista de `{ id, nombre, costo, beneficio }`
- `costo` y `beneficio`: enteros. `costo` mayor que 0. `beneficio` mayor o igual que 0

Para el caso `turno-corto`, escribe la tabla `dp[i][c]` completa, el beneficio óptimo, el costo usado y los `id` elegidos.

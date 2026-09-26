# MediRuta — Traslado óptimo entre centros de salud

> Grupo 14 · Análisis de Algoritmos · ITM 2026-2

MediRuta calcula una ruta de menor tiempo entre dos centros de salud de una red ficticia. La interfaz consume una API FastAPI, y el backend calcula la ruta con Dijkstra sobre tiempos de traslado no negativos.

## Problema y solución

Una remisión puede requerir trasladar a una persona entre IPS. Dada una red de centros conectados y el tiempo estimado de cada traslado, se busca la secuencia de centros cuyo tiempo total sea mínimo. En el modelo, cada centro es un nodo, cada conexión es una arista y sus minutos son el peso. El MVP trata la red como no dirigida.

La aplicación carga los centros desde JSON, permite elegir origen y destino, presenta el tiempo y la secuencia calculada, y resalta en el grafo las conexiones de la ruta. El dataset es ficticio y sirve únicamente para la actividad académica; no debe usarse para decisiones clínicas ni traslados reales.

Más detalle: [definición del problema](docs/problema.md) y [explicación de Dijkstra](docs/algoritmo-dijkstra.md).

## Requisitos

- Python 3.10 o posterior.
- Navegador moderno (Chrome, Edge o Firefox).
- PowerShell en Windows, o una terminal equivalente.

## Ejecutar y probar el backend

Desde la raíz del repositorio, prepara el entorno e instala dependencias:

```powershell
cd "ACTIVIDAD #2/backend"
py -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
```

Si PowerShell bloquea la activación del entorno, ejecuta una vez en esa terminal `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass` y vuelve a activar el entorno.

Corre las pruebas automatizadas desde `ACTIVIDAD #2/backend`:

```powershell
python -m pytest -v
```

Las pruebas revisan `/health`, el contenido de `/graph`, la ruta conocida H1→H3→H5 (26 minutos), origen igual a destino, nodo inexistente y ausencia de ruta en un grafo desconectado.

Inicia la API, también desde `ACTIVIDAD #2/backend`:

```powershell
python -m uvicorn app.main:app --reload
```

La API queda en `http://127.0.0.1:8000`. Comprueba `http://127.0.0.1:8000/health` y abre `http://127.0.0.1:8000/docs` para probar los endpoints interactivamente.

También se pueden probar las rutas desde PowerShell:

```powershell
Invoke-RestMethod http://127.0.0.1:8000/health
Invoke-RestMethod http://127.0.0.1:8000/graph
Invoke-RestMethod -Method Post -Uri http://127.0.0.1:8000/shortest-path -ContentType "application/json" -Body '{"origen":"H1","destino":"H5"}'
```

Para H1 a H5, el resultado esperado es `camino: [H1, H3, H5]`, `tiempo_total: 26` y `encontrado: true`.

## Ejecutar y probar el frontend

Deja la API encendida. En una segunda terminal, desde la raíz del repositorio, sirve la carpeta web:

```powershell
py -m http.server 5500 --directory "ACTIVIDAD #2/frontend"
```

Abre `http://127.0.0.1:5500`. No abras `index.html` con `file://`: el navegador necesita servirlo por HTTP para que las llamadas a la API funcionen correctamente.

Prueba el flujo completo:

1. Espera a que se carguen los ocho centros y las conexiones en el grafo.
2. Selecciona `IPS Centro Norte (H1)` como origen y `Hospital Universitario (H5)` como destino.
3. Pulsa **Calcular ruta**. Debe mostrar 26 minutos, la secuencia H1 → H3 → H5 y esas conexiones/nodos resaltados en coral.
4. Cambia origen y destino; el resultado anterior debe limpiarse. Prueba H2 como origen y H2 como destino: debe indicar 0 minutos y una sola parada.
5. Con el backend apagado, recarga: la interfaz debe explicar que no pudo conectar con la API, en vez de quedarse en una pantalla vacía.
6. Repite en una ventana angosta o en el emulador móvil del navegador: controles, resultado y grafo deben permanecer legibles.

## Video de sustentación

Link: *(pendiente de agregar)*

## Integrantes

| Integrante | Rol |
|---|---|
| Sebastián | Algoritmo Dijkstra + modelo del grafo |
| Brayan | API backend + datos + tests |
| Ema | Frontend + visualización |
| Miguel | Documentación, README, video |

Ver [docs/roles.md](docs/roles.md).

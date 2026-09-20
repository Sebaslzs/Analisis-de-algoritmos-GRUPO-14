# MediRuta — Traslado óptimo entre centros de salud

> Grupo 14 · Análisis de Algoritmos · ITM 2026-2

## Descripción del problema

*(Pendiente — ver [docs/problema.md](docs/problema.md))*

## Solución

Aplicación web básica que modela una red de IPS/hospitales como un **grafo ponderado** y calcula la ruta de traslado más rápida con el algoritmo de **Dijkstra**.

## Algoritmo de grafos utilizado

**Dijkstra** (camino más corto con pesos positivos = minutos de traslado).

Explicación detallada: [docs/algoritmo-dijkstra.md](docs/algoritmo-dijkstra.md)

## Cómo ejecutar

```bash
# Backend (cuando esté listo)
cd backend
python -m venv .venv
# Windows:
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Abrir `frontend/index.html` en el navegador (o servir con un servidor estático local).

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

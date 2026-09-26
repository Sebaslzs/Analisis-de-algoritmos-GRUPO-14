# Algoritmo de Dijkstra

## Qué resuelve

En un grafo con pesos **no negativos**, Dijkstra encuentra el camino de **menor costo** desde un nodo origen hasta un destino (o hasta todos los demás nodos).

## Por qué aplica a MediRuta

La red de IPS se modela así:

| Dominio | Grafo |
|---------|--------|
| Centro de salud | Nodo |
| Traslado entre sedes | Arista |
| Minutos de viaje | Peso (≥ 0) |

Buscamos la ruta más rápida entre dos centros. Como los tiempos no son negativos, Dijkstra es adecuado (no hace falta Bellman-Ford).

## Idea del algoritmo

1. Marcar la distancia del origen como `0` y la del resto como ∞.
2. Usar una **cola de prioridad** para sacar siempre el nodo con menor distancia provisional.
3. Relajar sus vecinos: si llegar por ese nodo mejora el costo, actualizar distancia y predecesor.
4. Repetir hasta procesar el destino (o vaciar la cola).
5. Reconstruir el camino siguiendo los predecesores desde el destino hasta el origen.

### Pseudocódigo

```
dijkstra(G, origen, destino):
    dist[origen] ← 0
    dist[v] ← ∞  para el resto
    prev[v] ← nulo
    cola ← {(0, origen)}

    mientras cola no vacía:
        (d, u) ← extraer mínimo de cola
        si d > dist[u]: continuar
        si u = destino: terminar
        para cada (v, peso) vecino de u:
            si dist[u] + peso < dist[v]:
                dist[v] ← dist[u] + peso
                prev[v] ← u
                insertar (dist[v], v) en cola

    reconstruir camino con prev
    retornar (camino, dist[destino])
```

## Complejidad

Con cola de prioridad binaria (`heapq` en Python):

**O((V + E) log V)**

- `V` = número de centros (nodos)
- `E` = número de conexiones (aristas, contando ambos sentidos en el grafo no dirigido)

Cada extracción/inserción en el heap cuesta O(log V); se hacen en el orden de V + E operaciones.

## Implementación en el proyecto

| Pieza | Archivo |
|-------|---------|
| Carga JSON → adyacencia | `backend/app/graph/loader.py` |
| Dijkstra | `backend/app/graph/dijkstra.py` |
| Dataset | `data/centros_salud.json` |

Salida de la función:

```text
{ "camino": [...], "tiempo_total": minutos, "encontrado": true|false }
```

Casos borde:

- Origen = destino → camino `[origen]`, tiempo `0`
- Nodo inexistente o sin ruta → `encontrado: false`

## Ejemplo con el dataset

**Origen:** H1 — IPS Centro Norte  
**Destino:** H5 — Hospital Universitario

Algunas rutas posibles:

| Ruta | Minutos |
|------|---------|
| H1 → H4 → H5 | 18 + 9 = **27** |
| H1 → H3 → H5 | 12 + 14 = **26** |
| H1 → H7 → H4 → H5 | 8 + 16 + 9 = **33** |

Dijkstra elige la óptima:

```text
camino: H1 → H3 → H5
tiempo_total: 26
encontrado: true
```

Es decir: Centro Norte → Hospital Occidente → Hospital Universitario, en **26 minutos**.

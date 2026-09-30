from __future__ import annotations

import heapq
from typing import Any


def dijkstra(
    graph: dict[str, Any],
    origen: str,
    destino: str,
) -> dict[str, Any]:
    adyacencia: dict[str, list[tuple[str, float]]] = graph.get("adyacencia", {})

    if origen not in adyacencia or destino not in adyacencia:
        return {"camino": [], "tiempo_total": None, "encontrado": False}

    if origen == destino:
        return {"camino": [origen], "tiempo_total": 0.0, "encontrado": True}

    dist: dict[str, float] = {nodo: float("inf") for nodo in adyacencia}
    prev: dict[str, str | None] = {nodo: None for nodo in adyacencia}
    dist[origen] = 0.0
    heap: list[tuple[float, str]] = [(0.0, origen)]

    while heap:
        d_actual, u = heapq.heappop(heap)
        if d_actual > dist[u]:
            continue
        if u == destino:
            break
        for v, peso in adyacencia.get(u, []):
            nueva = d_actual + peso
            if nueva < dist[v]:
                dist[v] = nueva
                prev[v] = u
                heapq.heappush(heap, (nueva, v))

    if dist[destino] == float("inf"):
        return {"camino": [], "tiempo_total": None, "encontrado": False}

    camino: list[str] = []
    actual: str | None = destino
    while actual is not None:
        camino.append(actual)
        actual = prev[actual]
    camino.reverse()

    return {
        "camino": camino,
        "tiempo_total": dist[destino],
        "encontrado": True,
    }

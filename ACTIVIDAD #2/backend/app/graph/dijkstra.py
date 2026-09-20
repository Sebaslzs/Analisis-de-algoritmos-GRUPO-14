"""
Algoritmo de Dijkstra — camino más corto con pesos no negativos.

Ownership: Sebastián
"""

from typing import Any


def dijkstra(
    graph: dict[str, Any],
    origen: str,
    destino: str,
) -> dict[str, Any]:
    """
    Calcula el camino de menor tiempo entre origen y destino.

    Debe retornar algo equivalente a:
    {
        "camino": ["H1", "H3", "H5"],
        "tiempo_total": 42.0,
        "encontrado": True,
    }

    Stub: implementar Dijkstra.
    """
    raise NotImplementedError("Pendiente: implementación de Dijkstra (Sebastián)")

"""Carga del JSON a lista de adyacencia ponderada."""

from __future__ import annotations

import json
from collections import defaultdict
from pathlib import Path
from typing import Any


def load_graph(path: str | Path) -> dict[str, Any]:
    """Lee el dataset y arma nodos, aristas y adyacencia (grafo no dirigido)."""
    path = Path(path)
    with path.open(encoding="utf-8") as f:
        data = json.load(f)

    nodos = data.get("nodos", [])
    aristas = data.get("aristas", [])
    adyacencia: dict[str, list[tuple[str, float]]] = defaultdict(list)

    for nodo in nodos:
        adyacencia[nodo["id"]]

    for arista in aristas:
        u = arista["from"]
        v = arista["to"]
        w = float(arista["minutos"])
        adyacencia[u].append((v, w))
        adyacencia[v].append((u, w))

    return {
        "nodos": nodos,
        "aristas": aristas,
        "adyacencia": dict(adyacencia),
    }

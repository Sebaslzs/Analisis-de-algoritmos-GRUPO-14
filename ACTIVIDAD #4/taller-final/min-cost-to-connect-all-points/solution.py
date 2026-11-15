# 1584. Min Cost to Connect All Points
# Familia: grafos (árbol de recubrimiento mínimo) — Prim denso
# Modelo: grafo completo no dirigido; peso = distancia de Manhattan.
# Tiempo O(n^2), espacio O(n), con n = len(points).

from typing import List


class Solution:
    def minCostConnectPoints(self, points: List[List[int]]) -> int:
        n = len(points)
        INF = float("inf")
        min_dist = [INF] * n      # arista más barata que conecta cada punto con el árbol
        en_arbol = [False] * n
        min_dist[0] = 0           # el árbol empieza en el punto 0
        total = 0

        for _ in range(n):
            # Elegir el punto fuera del árbol con la arista más barata hacia él.
            u = -1
            for i in range(n):
                if not en_arbol[i] and (u == -1 or min_dist[i] < min_dist[u]):
                    u = i

            en_arbol[u] = True
            total += min_dist[u]

            # Actualizar las aristas que salen del nuevo punto del árbol.
            xu, yu = points[u]
            for v in range(n):
                if not en_arbol[v]:
                    costo = abs(xu - points[v][0]) + abs(yu - points[v][1])
                    if costo < min_dist[v]:
                        min_dist[v] = costo

        return total

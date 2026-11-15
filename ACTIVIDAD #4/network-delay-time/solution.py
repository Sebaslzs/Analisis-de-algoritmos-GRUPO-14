# 743. Network Delay Time
# Familia: grafos (Dijkstra)
# Modelo: grafo dirigido y ponderado (pesos >= 0), nodos 1..n.
# Tiempo O((n + m) log n), espacio O(n + m), con m = len(times).

import heapq
from typing import List


class Solution:
    def networkDelayTime(self, times: List[List[int]], n: int, k: int) -> int:
        # Lista de adyacencia: adj[u] = [(v, w), ...]
        adj = [[] for _ in range(n + 1)]
        for u, v, w in times:
            adj[u].append((v, w))

        INF = float("inf")
        dist = [INF] * (n + 1)
        dist[k] = 0
        heap = [(0, k)]  # (distancia tentativa, nodo)

        while heap:
            d, u = heapq.heappop(heap)
            if d > dist[u]:
                continue  # entrada vieja: ya se encontró algo mejor
            for v, w in adj[u]:
                nd = d + w
                if nd < dist[v]:
                    dist[v] = nd
                    heapq.heappush(heap, (nd, v))

        # Hay que esperar al nodo que más tarda.
        respuesta = max(dist[1:])
        return -1 if respuesta == INF else respuesta

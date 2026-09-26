"""Pruebas de rutas conocidas y casos borde de la API MediRuta."""

from fastapi.testclient import TestClient

from app.graph.dijkstra import dijkstra
from app.main import app


client = TestClient(app)


def test_health():
    response = client.get("/health")

    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_graph_returns_dataset():
    response = client.get("/graph")
    body = response.json()

    assert response.status_code == 200
    assert len(body["nodos"]) == 8
    assert len(body["aristas"]) > 0


def test_dijkstra_ruta_conocida():
    response = client.post(
        "/shortest-path", json={"origen": "H1", "destino": "H5"}
    )

    assert response.status_code == 200
    assert response.json() == {
        "origen": "H1",
        "destino": "H5",
        "camino": ["H1", "H3", "H5"],
        "tiempo_total": 26.0,
        "encontrado": True,
        "mensaje": None,
    }


def test_dijkstra_origen_igual_destino():
    response = client.post(
        "/shortest-path", json={"origen": "H2", "destino": "H2"}
    )

    assert response.status_code == 200
    assert response.json()["camino"] == ["H2"]
    assert response.json()["tiempo_total"] == 0.0
    assert response.json()["encontrado"] is True


def test_dijkstra_nodo_inexistente():
    response = client.post(
        "/shortest-path", json={"origen": "H1", "destino": "H99"}
    )

    assert response.status_code == 200
    assert response.json()["camino"] == []
    assert response.json()["tiempo_total"] is None
    assert response.json()["encontrado"] is False


def test_dijkstra_sin_ruta():
    graph = {"adyacencia": {"A": [("B", 3.0)], "B": [("A", 3.0)], "C": []}}

    result = dijkstra(graph, "A", "C")

    assert result == {"camino": [], "tiempo_total": None, "encontrado": False}

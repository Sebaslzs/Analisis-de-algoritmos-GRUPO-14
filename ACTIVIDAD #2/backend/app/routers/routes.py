"""
Endpoints de la API.

Ownership: Brayan
"""

from fastapi import APIRouter

from app.models import ShortestPathRequest, ShortestPathResponse

router = APIRouter()


@router.get("/health")
def health():
    return {"status": "ok"}


@router.get("/graph")
def get_graph():
    """Devuelve nodos y aristas para visualización. Stub."""
    return {
        "nodos": [],
        "aristas": [],
        "mensaje": "Pendiente: cargar dataset (Brayan + Sebastián)",
    }


@router.post("/shortest-path", response_model=ShortestPathResponse)
def shortest_path(body: ShortestPathRequest) -> ShortestPathResponse:
    """Calcula la ruta óptima con Dijkstra. Stub."""
    return ShortestPathResponse(
        origen=body.origen,
        destino=body.destino,
        camino=[],
        tiempo_total=None,
        encontrado=False,
        mensaje="Pendiente: conectar loader + Dijkstra",
    )

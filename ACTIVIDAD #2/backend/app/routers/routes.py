from pathlib import Path

from fastapi import APIRouter

from app.graph.dijkstra import dijkstra
from app.graph.loader import load_graph
from app.models import ShortestPathRequest, ShortestPathResponse

router = APIRouter()
DATA_PATH = Path(__file__).resolve().parents[3] / "data" / "centros_salud.json"
GRAPH = load_graph(DATA_PATH)


@router.get("/health")
def health():
    return {"status": "ok"}


@router.get("/graph")
def get_graph():
    return {
        "nodos": GRAPH["nodos"],
        "aristas": GRAPH["aristas"],
    }


@router.post("/shortest-path", response_model=ShortestPathResponse)
def shortest_path(body: ShortestPathRequest) -> ShortestPathResponse:
    result = dijkstra(GRAPH, body.origen, body.destino)
    mensaje = None
    if not result["encontrado"]:
        mensaje = "No existe una ruta entre los centros indicados."

    return ShortestPathResponse(
        origen=body.origen,
        destino=body.destino,
        camino=result["camino"],
        tiempo_total=result["tiempo_total"],
        encontrado=result["encontrado"],
        mensaje=mensaje,
    )

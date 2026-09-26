"""
Schemas Pydantic (nodo, arista, request/response).

Ownership compartido: Brayan (API) / Sebastián (modelo de grafo).
"""

from pydantic import BaseModel, Field


class Nodo(BaseModel):
    id: str
    nombre: str
    especialidades: list[str] = Field(default_factory=list)


class Arista(BaseModel):
    from_id: str = Field(alias="from")
    to_id: str = Field(alias="to")
    minutos: float

    model_config = {"populate_by_name": True}


class ShortestPathRequest(BaseModel):
    origen: str
    destino: str


class ShortestPathResponse(BaseModel):
    origen: str
    destino: str
    camino: list[str]
    tiempo_total: float | None
    encontrado: bool
    mensaje: str | None = None

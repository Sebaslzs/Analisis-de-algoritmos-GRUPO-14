"""
MediRuta — API FastAPI.

Ownership: Brayan
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import routes

app = FastAPI(
    title="MediRuta",
    description="Rutas óptimas de traslado entre centros de salud (Dijkstra)",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(routes.router)


@app.get("/")
def root():
    return {"message": "MediRuta API — ver /docs"}

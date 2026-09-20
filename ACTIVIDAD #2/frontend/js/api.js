/**
 * Llamadas al backend MediRuta.
 * Ownership: Ema
 */

const API_BASE = "http://127.0.0.1:8000";

async function fetchGraph() {
  const res = await fetch(`${API_BASE}/graph`);
  if (!res.ok) throw new Error(`GET /graph → ${res.status}`);
  return res.json();
}

async function fetchShortestPath(origen, destino) {
  const res = await fetch(`${API_BASE}/shortest-path`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ origen, destino }),
  });
  if (!res.ok) throw new Error(`POST /shortest-path → ${res.status}`);
  return res.json();
}

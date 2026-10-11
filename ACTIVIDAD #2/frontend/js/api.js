const API_BASE = "http://127.0.0.1:8000";

async function readResponse(res, endpoint) {
  if (!res.ok) {
    let detail = "";
    try {
      const body = await res.json();
      detail = body.detail ? `: ${body.detail}` : "";
    } catch {}
    throw new Error(`${endpoint} respondió ${res.status}${detail}`);
  }
  return res.json();
}

async function fetchGraph() {
  const res = await fetch(`${API_BASE}/graph`);
  return readResponse(res, "GET /graph");
}

async function fetchShortestPath(origen, destino) {
  const res = await fetch(`${API_BASE}/shortest-path`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ origen, destino }),
  });
  return readResponse(res, "POST /shortest-path");
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character]);
}

function renderGraph(graph, camino = []) {
  const container = document.getElementById("graph-container");
  if (!container) return;

  const nodos = graph?.nodos || [];
  const aristas = graph?.aristas || [];
  const centerX = 450;
  const centerY = 270;
  const positions = new Map();
  const pathNodes = new Set(camino);
  const pathEdges = new Set(camino.slice(1).map((id, index) => [camino[index], id].sort().join("|")));

  nodos.forEach((nodo, index) => {
    const angle = -Math.PI / 2 + (2 * Math.PI * index) / nodos.length;
    positions.set(nodo.id, {
      x: centerX + Math.cos(angle) * 320,
      y: centerY + Math.sin(angle) * 205,
    });
  });

  const edgeMarkup = aristas.map((arista) => {
    const start = positions.get(arista.from);
    const end = positions.get(arista.to);
    if (!start || !end) return "";
    const key = [arista.from, arista.to].sort().join("|");
    const active = pathEdges.has(key);
    const midX = (start.x + end.x) / 2;
    const midY = (start.y + end.y) / 2;
    return `
      <g class="edge${active ? " edge-active" : ""}">
        <line x1="${start.x}" y1="${start.y}" x2="${end.x}" y2="${end.y}" />
        <rect class="edge-label-bg" x="${midX - 20}" y="${midY - 12}" width="40" height="23" rx="6" />
        <text class="edge-label" x="${midX}" y="${midY + 4}">${escapeHtml(arista.minutos)}′</text>
      </g>`;
  }).join("");

  const nodeMarkup = nodos.map((nodo) => {
    const point = positions.get(nodo.id);
    const isPath = pathNodes.has(nodo.id);
    const isOrigin = camino.length > 0 && nodo.id === camino[0];
    const isDestination = camino.length > 1 && nodo.id === camino[camino.length - 1];
    const classes = ["node", isPath ? "node-active" : "", isOrigin ? "node-origin" : "", isDestination ? "node-destination" : ""]
      .filter(Boolean).join(" ");
    return `
      <g class="${classes}" transform="translate(${point.x} ${point.y})">
        <title>${escapeHtml(nodo.id)} — ${escapeHtml(nodo.nombre)}</title>
        <circle r="27" />
        <text text-anchor="middle" dominant-baseline="central">${escapeHtml(nodo.id)}</text>
      </g>`;
  }).join("");

  container.innerHTML = nodos.length
    ? `<svg class="network-svg" viewBox="0 0 900 540" role="img" aria-label="Grafo de centros de salud con ${nodos.length} nodos y ${aristas.length} conexiones">${edgeMarkup}${nodeMarkup}</svg>`
    : '<p class="stub">La API no devolvió centros para dibujar.</p>';

  const key = document.getElementById("graph-key");
  if (key) {
    key.innerHTML = nodos.map((nodo) => `
      <li><span class="center-marker" aria-hidden="true">${escapeHtml(nodo.id)}</span><span>${escapeHtml(nodo.nombre)}</span></li>
    `).join("");
  }

  const count = document.getElementById("graph-count");
  if (count) count.textContent = `${nodos.length} centros · ${aristas.length} conexiones`;
}

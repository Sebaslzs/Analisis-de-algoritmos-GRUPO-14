/**
 * Visualización del grafo y resaltado de ruta.
 * Ownership: Ema
 */

function renderGraph(nodos, aristas, camino = []) {
  const container = document.getElementById("graph-container");
  if (!container) return;

  // Stub: reemplazar por vis.js / Cytoscape / canvas.
  container.innerHTML = `
    <p class="stub">
      Stub de visualización — ${nodos.length} nodos, ${aristas.length} aristas,
      camino: [${camino.join(" → ") || "ninguno"}]
    </p>
  `;
}

function highlightPath(camino) {
  // Stub: resaltar nodos/aristas del camino en la vista.
  console.log("Resaltar camino:", camino);
}

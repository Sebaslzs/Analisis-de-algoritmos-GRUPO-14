document.addEventListener("DOMContentLoaded", () => {
  const selOrigen = document.getElementById("origen");
  const selDestino = document.getElementById("destino");
  const form = document.getElementById("route-form");
  const btn = document.getElementById("btn-calcular");
  const texto = document.getElementById("resultado-texto");
  const lista = document.getElementById("resultado-camino");
  let graph = null;

  function showError(error) {
    texto.textContent = `No se pudo completar la operación: ${error.message}. Verifica que el backend esté activo en http://127.0.0.1:8000.`;
    texto.classList.add("result-error");
  }

  function clearResult() {
    texto.textContent = "Elige los centros para calcular el traslado.";
    texto.classList.remove("result-error", "result-success");
    lista.replaceChildren();
    if (graph) renderGraph(graph);
  }

  function populateSelect(select, nodos, placeholder) {
    select.replaceChildren(new Option(placeholder, ""));
    for (const nodo of nodos) {
      select.add(new Option(`${nodo.nombre} (${nodo.id})`, nodo.id));
    }
    select.disabled = false;
  }

  async function initialize() {
    try {
      graph = await fetchGraph();
      if (!Array.isArray(graph.nodos) || !Array.isArray(graph.aristas)) {
        throw new Error("La respuesta de /graph no tiene el formato esperado");
      }
      populateSelect(selOrigen, graph.nodos, "Selecciona un centro");
      populateSelect(selDestino, graph.nodos, "Selecciona un centro");
      btn.disabled = false;
      texto.textContent = "Elige los centros para calcular el traslado.";
      renderGraph(graph);
    } catch (error) {
      showError(error);
      containerError(error);
    }
  }

  function containerError(error) {
    const container = document.getElementById("graph-container");
    container.innerHTML = `<p class="stub result-error">No se pudo cargar el grafo: ${escapeHtml(error.message)}</p>`;
  }

  form?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const origen = selOrigen.value;
    const destino = selDestino.value;
    try {
      btn.disabled = true;
      btn.querySelector("span:first-child").textContent = "Calculando…";
      texto.classList.remove("result-error", "result-success");
      texto.textContent = "Buscando el menor tiempo de traslado…";
      const data = await fetchShortestPath(origen, destino);
      if (data.encontrado) {
        const tiempos = Number(data.tiempo_total);
        texto.textContent = `Tiempo total estimado: ${Number.isInteger(tiempos) ? tiempos : tiempos.toFixed(1)} min`;
        texto.classList.add("result-success");
        lista.replaceChildren(...data.camino.map((id) => {
          const nodo = graph.nodos.find((item) => item.id === id);
          const item = document.createElement("li");
          item.textContent = nodo ? `${nodo.nombre} (${nodo.id})` : id;
          return item;
        }));
        renderGraph(graph, data.camino);
      } else {
        texto.textContent = data.mensaje || "No existe una ruta entre esos centros.";
        texto.classList.add("result-error");
        lista.replaceChildren();
        renderGraph(graph);
      }
    } catch (error) {
      showError(error);
    } finally {
      btn.disabled = false;
      btn.querySelector("span:first-child").textContent = "Calcular ruta";
    }
  });

  selOrigen.addEventListener("change", clearResult);
  selDestino.addEventListener("change", clearResult);
  initialize();
});

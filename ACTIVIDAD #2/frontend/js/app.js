/**
 * UI principal: selects, botón calcular, resultados.
 * Ownership: Ema
 */

document.addEventListener("DOMContentLoaded", () => {
  const selOrigen = document.getElementById("origen");
  const selDestino = document.getElementById("destino");
  const btn = document.getElementById("btn-calcular");
  const texto = document.getElementById("resultado-texto");
  const lista = document.getElementById("resultado-camino");

  // Stub: cargar grafo al iniciar cuando la API esté lista.
  texto.textContent = "Frontend listo (stub). Conectar API cuando Brayan/Sebastián terminen el backend.";

  btn?.addEventListener("click", async () => {
    const origen = selOrigen?.value;
    const destino = selDestino?.value;
    if (!origen || !destino) {
      texto.textContent = "Selecciona origen y destino.";
      return;
    }
    try {
      const data = await fetchShortestPath(origen, destino);
      if (data.encontrado) {
        texto.textContent = `Tiempo total: ${data.tiempo_total} min`;
        lista.innerHTML = (data.camino || [])
          .map((id) => `<li>${id}</li>`)
          .join("");
        renderGraph([], [], data.camino || []);
        highlightPath(data.camino || []);
      } else {
        texto.textContent = data.mensaje || "No hay ruta.";
        lista.innerHTML = "";
      }
    } catch (err) {
      texto.textContent = `Error: ${err.message}`;
    }
  });
});

export function renderizarTabla(contenedor, tabla) {
  if (!contenedor) {
    return;
  }

  const datos = Array.isArray(tabla) ? tabla : [];
  const capacidades = datos[0]?.length ? datos[0].length - 1 : 0;

  contenedor.replaceChildren();

  if (datos.length === 0) {
    contenedor.textContent = "Sin datos para mostrar.";
    return;
  }

  const tablaHtml = document.createElement("table");
  tablaHtml.className = "tabla-dp";

  const thead = document.createElement("thead");
  const filaCabecera = document.createElement("tr");
  const celdaTitulo = document.createElement("th");
  celdaTitulo.textContent = "i \\ c";
  filaCabecera.appendChild(celdaTitulo);

  for (let capacidad = 0; capacidad <= capacidades; capacidad += 1) {
    const th = document.createElement("th");
    th.textContent = String(capacidad);
    filaCabecera.appendChild(th);
  }

  thead.appendChild(filaCabecera);
  tablaHtml.appendChild(thead);

  const tbody = document.createElement("tbody");

  datos.forEach((fila, indiceFila) => {
    const tr = document.createElement("tr");
    const etiqueta = document.createElement("th");
    etiqueta.textContent = String(indiceFila);
    tr.appendChild(etiqueta);

    fila.forEach((valor, indiceColumna) => {
      const td = document.createElement("td");
      td.textContent = String(valor);

      if (indiceFila === datos.length - 1 && indiceColumna === fila.length - 1) {
        td.classList.add("destacada");
      }

      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  });

  tablaHtml.appendChild(tbody);
  contenedor.appendChild(tablaHtml);
}

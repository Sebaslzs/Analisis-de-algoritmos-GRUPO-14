// Dueño: integración
// renderizarComparacion(contenedor, resultado, total) -> tabla con los 3 criterios greedy
// Consume la salida de compararCriterios() (src/comparador.js, de Brayan)

const CRITERIOS = [
	{
		clave: "horaFin",
		nombre: "Hora de finalización",
		descripcion: "Prioriza las citas que terminan primero",
		optimo: true
	},
	{
		clave: "horaInicio",
		nombre: "Hora de inicio",
		descripcion: "Prioriza las citas que empiezan primero",
		optimo: false
	},
	{
		clave: "duracion",
		nombre: "Duración",
		descripcion: "Prioriza las citas más cortas",
		optimo: false
	}
];

function escapeHtml(valor) {
	return String(valor ?? "")
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;");
}

export function renderizarComparacion(contenedor, resultado, total) {
	if (!contenedor || !resultado) return;

	const cantidades = CRITERIOS.map((c) => resultado[c.clave]?.cantidad ?? 0);
	const maximo = Math.max(0, ...cantidades);

	const filas = CRITERIOS.map((criterio, indice) => {
		const datos = resultado[criterio.clave] || { cantidad: 0, solicitudes: [] };
		const ganador = cantidades[indice] === maximo && maximo > 0;
		const ids = datos.solicitudes.map((s) => escapeHtml(s.id)).join(", ") || "—";

		return `<tr class="${ganador ? "fila-ganadora" : ""}">
			<td>
				<strong>${escapeHtml(criterio.nombre)}</strong>
				${criterio.optimo ? '<span class="etiqueta etiqueta-optimo">óptimo garantizado</span>' : ""}
				<small>${escapeHtml(criterio.descripcion)}</small>
			</td>
			<td class="celda-cantidad">${datos.cantidad}${ganador ? ' <span class="check">★</span>' : ""}</td>
			<td class="celda-ids">${ids}</td>
		</tr>`;
	}).join("");

	contenedor.innerHTML = `<div class="comparacion-panel">
		<div class="comparacion-cabecera">
			<h2>Comparación de criterios greedy</h2>
			<span class="resumen">${total} solicitud${total === 1 ? "" : "es"} · ordenadas con Merge Sort propio</span>
		</div>

		<table class="tabla-comparacion">
			<thead>
				<tr><th>Criterio de ordenamiento</th><th>Citas atendidas</th><th>Solicitudes aceptadas</th></tr>
			</thead>
			<tbody>${filas}</tbody>
		</table>

		<p class="comparacion-nota">
			Solo <strong>hora de finalización</strong> garantiza el máximo para <em>cualquier</em> entrada;
			los otros dos pueden acertar en casos concretos, pero no siempre.
			Un caso claro: una cita larga que empiece antes que todas (por ejemplo 06:30–15:00)
			es la primera que toma el criterio por hora de inicio, y con ella pierde todas las cortas que abarca.
		</p>
	</div>`;
}

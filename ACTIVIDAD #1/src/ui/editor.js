// Dueño: integración
// renderizarEditor(contenedor, solicitudes, acciones) -> formulario de carga + lista editable
// Permite cambiar los datos de entrada sin tocar src/datos/solicitudes.js

const JORNADA_INICIO = 7 * 60;
const JORNADA_FIN = 18 * 60;

function escapeHtml(valor) {
	return String(valor ?? "")
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;");
}

function aMinutos(hora) {
	const partes = String(hora || "").split(":").map(Number);
	if (partes.length !== 2 || Number.isNaN(partes[0]) || Number.isNaN(partes[1])) return NaN;
	return partes[0] * 60 + partes[1];
}

/**
 * Propone el siguiente ID libre con el formato Snn.
 */
export function siguienteId(solicitudes) {
	let maximo = 0;
	for (const s of solicitudes) {
		const numero = parseInt(String(s.id).replace(/\D/g, ""), 10);
		if (!Number.isNaN(numero) && numero > maximo) maximo = numero;
	}
	return "S" + String(maximo + 1).padStart(2, "0");
}

/**
 * Valida una solicitud nueva contra las ya cargadas.
 * @returns {Object} { valida, error, aviso, solicitud }
 */
export function validarSolicitud(datos, solicitudes) {
	const id = String(datos.id || "").trim();
	const servicio = String(datos.servicio || "").trim();
	const profesional = String(datos.profesional || "").trim();
	const inicio = String(datos.inicio || "").trim();
	const fin = String(datos.fin || "").trim();

	if (!id) return { valida: false, error: "El ID no puede estar vacío." };
	if (solicitudes.some((s) => String(s.id) === id)) {
		return { valida: false, error: `Ya existe una solicitud con el ID ${id}.` };
	}
	if (!servicio) return { valida: false, error: "Indica el servicio (ej: Pediatría)." };

	const minInicio = aMinutos(inicio);
	const minFin = aMinutos(fin);
	if (Number.isNaN(minInicio) || Number.isNaN(minFin)) {
		return { valida: false, error: "Completa la hora de inicio y la de fin." };
	}
	if (minFin <= minInicio) {
		return { valida: false, error: "La hora de fin debe ser posterior a la de inicio." };
	}

	let aviso = "";
	if (minInicio < JORNADA_INICIO || minFin > JORNADA_FIN) {
		aviso = "Solicitud agregada. Ojo: los algoritmos la tienen en cuenta, "
			+ "pero la grilla de la Variante B solo dibuja de 07:00 a 18:00.";
	}

	return {
		valida: true,
		aviso,
		solicitud: { id, profesional: profesional || "—", servicio, inicio, fin }
	};
}

export function renderizarEditor(contenedor, solicitudes, acciones = {}) {
	if (!contenedor) return;

	const filas = solicitudes.map((s) => `<li>
			<span class="editor-id">${escapeHtml(s.id)}</span>
			<span class="editor-servicio">${escapeHtml(s.servicio)}</span>
			<span class="editor-horario">${escapeHtml(s.inicio)} – ${escapeHtml(s.fin)}</span>
			<span class="editor-profesional">${escapeHtml(s.profesional)}</span>
			<button type="button" class="editor-quitar" data-id="${escapeHtml(s.id)}" title="Eliminar ${escapeHtml(s.id)}">✕</button>
		</li>`).join("");

	contenedor.innerHTML = `<div class="editor">
		<div class="editor-cabecera">
			<h2>Datos de entrada · ${solicitudes.length} solicitud${solicitudes.length === 1 ? "" : "es"}</h2>
			<div class="editor-botones">
				<button type="button" class="btn-sec" data-accion="restaurar">Restaurar ejemplo</button>
				<button type="button" class="btn-sec" data-accion="vaciar">Vaciar</button>
			</div>
		</div>

		<form class="editor-form">
			<label>ID<input name="id" value="${escapeHtml(siguienteId(solicitudes))}" /></label>
			<label>Servicio<input name="servicio" placeholder="Ej: Pediatría" /></label>
			<label>Profesional<input name="profesional" placeholder="Opcional" /></label>
			<label>Inicio<input name="inicio" type="time" step="300" value="07:00" /></label>
			<label>Fin<input name="fin" type="time" step="300" value="08:00" /></label>
			<button type="submit" class="btn-add">Agregar</button>
		</form>

		<p class="editor-msg" hidden></p>

		<ul class="editor-lista">${filas || '<li class="editor-vacio">No hay solicitudes cargadas.</li>'}</ul>
	</div>`;

	const formulario = contenedor.querySelector(".editor-form");
	const mensaje = contenedor.querySelector(".editor-msg");

	function mostrarMensaje(texto, tipo) {
		mensaje.textContent = texto;
		mensaje.className = "editor-msg editor-msg-" + tipo;
		mensaje.hidden = !texto;
	}

	formulario.addEventListener("submit", (evento) => {
		evento.preventDefault();
		const datos = Object.fromEntries(new FormData(formulario).entries());
		const resultado = validarSolicitud(datos, solicitudes);

		if (!resultado.valida) {
			mostrarMensaje(resultado.error, "error");
			return;
		}
		if (acciones.onAgregar) acciones.onAgregar(resultado.solicitud, resultado.aviso);
	});

	contenedor.querySelectorAll(".editor-quitar").forEach((boton) => {
		boton.addEventListener("click", () => {
			if (acciones.onEliminar) acciones.onEliminar(boton.dataset.id);
		});
	});

	contenedor.querySelectorAll("[data-accion]").forEach((boton) => {
		boton.addEventListener("click", () => {
			if (boton.dataset.accion === "restaurar" && acciones.onRestaurar) acciones.onRestaurar();
			if (boton.dataset.accion === "vaciar" && acciones.onVaciar) acciones.onVaciar();
		});
	});

	return { mostrarMensaje };
}

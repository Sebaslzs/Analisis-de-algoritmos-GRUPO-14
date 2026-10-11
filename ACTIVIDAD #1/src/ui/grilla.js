// Dueño: Miguel
// renderizarGrilla(contenedor, resultado) -> pinta la grilla hora x consultorio


	const JORNADA_INICIO = 7 * 60;
	const JORNADA_FIN = 18 * 60;
	const SLOT = 30;

	function aMinutos(hora) {
		const partes = String(hora || "00:00").split(":").map(Number);
		return partes[0] * 60 + partes[1];
	}

	function obtenerInicio(solicitud) {
		return solicitud.inicio !== undefined ? solicitud.inicio : solicitud.horaInicio;
	}

	function obtenerFin(solicitud) {
		return solicitud.fin !== undefined ? solicitud.fin : solicitud.horaFin;
	}

	function escapeHtml(valor) {
		return String(valor || "")
			.replaceAll("&", "&amp;")
			.replaceAll("<", "&lt;")
			.replaceAll(">", "&gt;")
			.replaceAll('"', "&quot;");
	}

	function crearSolicitud(solicitud, clase, detalle) {
		const inicioHora = obtenerInicio(solicitud);
		const finHora = obtenerFin(solicitud);
		const inicio = Math.max(JORNADA_INICIO, aMinutos(inicioHora));
		const fin = Math.min(JORNADA_FIN, aMinutos(finHora));
		if (fin <= inicio) return "";

		const top = ((inicio - JORNADA_INICIO) / SLOT) * 100 / 22;
		const alto = ((fin - inicio) / SLOT) * 100 / 22;
		return `<article class="evento ${clase}" style="top:${top}%;height:${alto}%" title="${escapeHtml(detalle)}">
			<strong>${escapeHtml(solicitud.id)}</strong>
			<span>${escapeHtml(solicitud.servicio)}</span>
			<small>${escapeHtml(inicioHora)}–${escapeHtml(finHora)}</small>
		</article>`;
	}

	function normalizarConsultorios(resultado) {
		if (Array.isArray(resultado.consultorios) && resultado.consultorios.length) {
			return resultado.consultorios.map((consultorio) => {
				return Array.isArray(consultorio) ? consultorio : consultorio.solicitudes || [];
			});
		}
		return [Array.isArray(resultado.aceptadas) ? resultado.aceptadas : []];
	}

	export function renderizarGrilla(contenedor, resultado) {
		if (!contenedor || !resultado) return;

		const consultorios = normalizarConsultorios(resultado);
		const rechazadas = Array.isArray(resultado.rechazadas) ? resultado.rechazadas : [];
		const horas = [];
		for (let minutos = JORNADA_INICIO; minutos < JORNADA_FIN; minutos += SLOT) {
			horas.push(`${String(Math.floor(minutos / 60)).padStart(2, "0")}:${String(minutos % 60).padStart(2, "0")}`);
		}

		const columnas = consultorios.map((solicitudes, indice) => {
			const eventos = solicitudes.map((solicitud) => crearSolicitud(
				solicitud,
				"evento-aceptado",
				`${solicitud.profesional || "Solicitud"}: ${obtenerInicio(solicitud)}–${obtenerFin(solicitud)}`
			)).join("");
			return `<section class="columna-consultorio">
				<h3>Consultorio ${indice + 1}</h3>
				<div class="pista">${horas.map(() => "<i></i>").join("")}${eventos}</div>
			</section>`;
		}).join("");

		const rechazos = rechazadas.map((item) => {
			const solicitud = item.solicitud || item;
			return crearSolicitud(solicitud, "evento-rechazado", item.motivo || "Solicitud rechazada");
		}).join("");

		contenedor.innerHTML = `<div class="grilla-panel">
			<div class="grilla-cabecera">
				<div class="titulo-grilla"><span class="punto punto-aceptado"></span><strong>${escapeHtml(resultado.nombre || "Asignación")}</strong></div>
				<span class="resumen">${consultorios.length} consultorio${consultorios.length === 1 ? "" : "s"} · ${rechazadas.length} rechazada${rechazadas.length === 1 ? "" : "s"}</span>
			</div>
			<div class="grilla-tabla" style="--cantidad-consultorios:${consultorios.length}">
				<div class="escala-tiempo">${horas.map((hora) => `<span>${hora}</span>`).join("")}</div>
				<div class="columnas">${columnas}</div>
			</div>
			<div class="rechazadas ${rechazadas.length ? "" : "vacia"}">
				<strong>Rechazadas</strong>
				${rechazadas.length ? `<div class="rechazos-lista">${rechazos}</div>` : "<span> Ninguna</span>"}
			</div>
		</div>`;
	}


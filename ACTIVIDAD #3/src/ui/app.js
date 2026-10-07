import { resolverAsignacion } from "../algoritmo/mochila.js";
import { validarEntrada } from "../datos/validar.js";
import { ESCENARIOS, cargarEjemplo } from "../datos/ejemplos.js";
import { renderizarTabla } from "./tabla.js";

const app = document.querySelector("#app");

if (!app) {
  throw new Error("No se encontró el contenedor #app.");
}

const escenarioInicial = ESCENARIOS[0]?.id ?? "turno-corto";

app.innerHTML = `
  <section class="panel">
    <h1>Asignación de recursos de UCI</h1>
    <div class="form-grid">
      <label>
        <span>Capacidad</span>
        <input id="capacidad" type="number" min="0" step="1" value="5" />
      </label>
      <label>
        <span>Escenario</span>
        <select id="escenario"></select>
      </label>
    </div>
    <div class="acciones">
      <button id="cargar-escenario" type="button">Cargar ejemplo</button>
      <button id="agregar-paciente" type="button" class="secondary">Agregar paciente</button>
      <button id="calcular" type="button" class="primary">Calcular</button>
    </div>
  </section>

  <section class="panel">
    <h2>Pacientes</h2>
    <div id="lista-pacientes" class="lista-pacientes"></div>
  </section>

  <section class="panel">
    <h2>Resultado</h2>
    <div id="errores" class="errores" aria-live="polite"></div>
    <div class="resultado-grid">
      <div class="resultado-item">
        <span>Beneficio total</span>
        <strong id="beneficio-total">0</strong>
      </div>
      <div class="resultado-item">
        <span>Costo usado</span>
        <strong id="costo-total">0</strong>
      </div>
    </div>
    <div class="seleccionados">
      <h3>Pacientes elegidos</h3>
      <ul id="seleccionados"></ul>
    </div>
    <div class="tabla-wrapper">
      <h3>Tabla DP</h3>
      <div id="tabla-dp"></div>
    </div>
  </section>
`;

const capacidadInput = document.querySelector("#capacidad");
const escenarioSelect = document.querySelector("#escenario");
const listaPacientes = document.querySelector("#lista-pacientes");
const erroresBox = document.querySelector("#errores");
const beneficioTotal = document.querySelector("#beneficio-total");
const costoTotal = document.querySelector("#costo-total");
const seleccionadosList = document.querySelector("#seleccionados");
const tablaContainer = document.querySelector("#tabla-dp");

function poblarEscenarios() {
  escenarioSelect.innerHTML = ESCENARIOS.map(
    (escenario) => `<option value="${escenario.id}">${escenario.id}</option>`
  ).join("");
  escenarioSelect.value = escenarioInicial;
}

function crearFilaPaciente(paciente = {}) {
  const fila = document.createElement("div");
  fila.className = "fila-paciente";

  const id = paciente.id ?? `p${Date.now()}-${Math.random().toString(16).slice(2)}`;
  fila.dataset.id = id;

  const nombreInput = document.createElement("input");
  nombreInput.type = "text";
  nombreInput.value = paciente.nombre ?? "";
  nombreInput.placeholder = "Nombre";
  nombreInput.className = "campo nombre";

  const costoInput = document.createElement("input");
  costoInput.type = "number";
  costoInput.min = "1";
  costoInput.step = "1";
  costoInput.value = Number.isInteger(paciente.costo) ? paciente.costo : "";
  costoInput.placeholder = "Costo";
  costoInput.className = "campo costo";

  const beneficioInput = document.createElement("input");
  beneficioInput.type = "number";
  beneficioInput.min = "0";
  beneficioInput.step = "1";
  beneficioInput.value = Number.isInteger(paciente.beneficio) ? paciente.beneficio : "";
  beneficioInput.placeholder = "Beneficio";
  beneficioInput.className = "campo beneficio";

  const botonEliminar = document.createElement("button");
  botonEliminar.type = "button";
  botonEliminar.textContent = "Eliminar";
  botonEliminar.className = "boton-eliminar";
  botonEliminar.addEventListener("click", () => fila.remove());

  fila.append(nombreInput, costoInput, beneficioInput, botonEliminar);
  return fila;
}

function renderPacientes(pacientes) {
  listaPacientes.innerHTML = "";

  if (!Array.isArray(pacientes) || pacientes.length === 0) {
    listaPacientes.appendChild(crearFilaPaciente());
    return;
  }

  pacientes.forEach((paciente) => {
    listaPacientes.appendChild(crearFilaPaciente(paciente));
  });
}

function leerPacientesDesdeFormulario() {
  const pacientes = [];
  const filas = listaPacientes.querySelectorAll(".fila-paciente");

  filas.forEach((fila, indice) => {
    const nombre = fila.querySelector(".nombre").value.trim();
    const costoValor = Number.parseInt(fila.querySelector(".costo").value, 10);
    const beneficioValor = Number.parseInt(fila.querySelector(".beneficio").value, 10);

    const tieneDatos = nombre || !Number.isNaN(costoValor) || !Number.isNaN(beneficioValor);
    if (!tieneDatos) {
      return;
    }

    pacientes.push({
      id: fila.dataset.id || `p${indice + 1}`,
      nombre: nombre || `Paciente ${indice + 1}`,
      costo: Number.isInteger(costoValor) ? costoValor : 0,
      beneficio: Number.isInteger(beneficioValor) ? beneficioValor : 0,
    });
  });

  return pacientes;
}

function mostrarErrores(errores) {
  erroresBox.innerHTML = "";

  if (!errores || errores.length === 0) {
    return;
  }

  errores.forEach((mensaje) => {
    const item = document.createElement("p");
    item.textContent = mensaje;
    erroresBox.appendChild(item);
  });
}

function mostrarResultado(resultado) {
  beneficioTotal.textContent = String(resultado.beneficioTotal ?? 0);
  costoTotal.textContent = String(resultado.costoTotal ?? 0);

  const seleccionados = Array.isArray(resultado.seleccionados) && resultado.seleccionados.length > 0
    ? resultado.seleccionados.map((paciente) => paciente.nombre || paciente.id)
    : ["Ninguno"];

  seleccionadosList.innerHTML = seleccionados.map((nombre) => `<li>${nombre}</li>`).join("");
  renderizarTabla(tablaContainer, resultado.tabla);
}

async function cargarEscenarioActual() {
  const idSeleccionado = escenarioSelect.value;

  try {
    const datos = await cargarEjemplo(idSeleccionado);
    capacidadInput.value = datos.capacidad ?? 0;
    renderPacientes(datos.pacientes ?? []);
    mostrarErrores([]);
  } catch (error) {
    mostrarErrores([error.message]);
  }
}

function calcular() {
  const pacientes = leerPacientesDesdeFormulario();
  const capacidad = Number.parseInt(capacidadInput.value, 10);

  const validacion = validarEntrada(pacientes, capacidad);
  mostrarErrores(validacion.errores);

  if (!validacion.valido) {
    beneficioTotal.textContent = "0";
    costoTotal.textContent = "0";
    seleccionadosList.innerHTML = "<li>Ninguno</li>";
    renderizarTabla(tablaContainer, []);
    return;
  }

  const resultado = resolverAsignacion(pacientes, capacidad);
  mostrarResultado(resultado);
}

document.querySelector("#cargar-escenario").addEventListener("click", cargarEscenarioActual);
document.querySelector("#agregar-paciente").addEventListener("click", () => {
  listaPacientes.appendChild(crearFilaPaciente());
});
document.querySelector("#calcular").addEventListener("click", calcular);
escenarioSelect.addEventListener("change", cargarEscenarioActual);

poblarEscenarios();
cargarEscenarioActual();

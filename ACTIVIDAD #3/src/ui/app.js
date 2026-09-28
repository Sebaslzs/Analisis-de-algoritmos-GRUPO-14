import { resolverAsignacion } from "../algoritmo/mochila.js";
import { validarEntrada } from "../datos/validar.js";
import { ESCENARIOS, cargarEjemplo } from "../datos/ejemplos.js";

const app = document.querySelector("#app");

cargarEjemplo(ESCENARIOS[0].id).then((datos) => {
  const validacion = validarEntrada(datos.pacientes, datos.capacidad);
  const resultado = resolverAsignacion(datos.pacientes, datos.capacidad);
  app.textContent = validacion.valido
    ? `Ejemplo cargado. Beneficio temporal: ${resultado.beneficioTotal}`
    : validacion.errores.join(" ");
});

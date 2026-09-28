import assert from "node:assert/strict";
import test from "node:test";
import { resolverAsignacion } from "../src/algoritmo/mochila.js";

test("la respuesta respeta el contrato", () => {
  const pacientes = [{ id: "p1", nombre: "Ana", costo: 2, beneficio: 3 }];
  const resultado = resolverAsignacion(pacientes, 5);

  assert.equal(typeof resultado.beneficioTotal, "number");
  assert.equal(typeof resultado.costoTotal, "number");
  assert.ok(Array.isArray(resultado.seleccionados));
  assert.equal(resultado.tabla.length, pacientes.length + 1);
  assert.equal(resultado.tabla[0].length, 6);
});

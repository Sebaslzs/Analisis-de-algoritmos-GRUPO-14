import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { resolverAsignacion } from "../src/algoritmo/mochila.js";

const ejemplosDir = join(dirname(fileURLToPath(import.meta.url)), "..", "ejemplos");

function cargarEjemplo(nombre) {
  return JSON.parse(readFileSync(join(ejemplosDir, nombre), "utf8"));
}

function ids(resultado) {
  return resultado.seleccionados.map((paciente) => paciente.id);
}

test("la respuesta respeta el contrato", () => {
  const pacientes = [{ id: "p1", nombre: "Ana", costo: 2, beneficio: 3 }];
  const resultado = resolverAsignacion(pacientes, 5);

  assert.equal(typeof resultado.beneficioTotal, "number");
  assert.equal(typeof resultado.costoTotal, "number");
  assert.ok(Array.isArray(resultado.seleccionados));
  assert.equal(resultado.tabla.length, pacientes.length + 1);
  assert.equal(resultado.tabla[0].length, 6);
});

test("turno corto coincide con la tabla resuelta a mano", () => {
  const datos = cargarEjemplo("turno-corto.json");
  const resultado = resolverAsignacion(datos.pacientes, datos.capacidad);

  assert.deepEqual(resultado.tabla, [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 3, 3, 3, 3],
    [0, 0, 3, 4, 4, 7],
    [0, 0, 3, 4, 5, 7],
    [0, 0, 3, 4, 6, 7],
  ]);
  assert.equal(resultado.beneficioTotal, 7);
  assert.equal(resultado.costoTotal, 5);
  assert.deepEqual(ids(resultado), ["p1", "p2"]);
});

test("turno lleno elige p1 y p2", () => {
  const datos = cargarEjemplo("turno-lleno.json");
  const resultado = resolverAsignacion(datos.pacientes, datos.capacidad);

  assert.equal(resultado.beneficioTotal, 17);
  assert.equal(resultado.costoTotal, 10);
  assert.deepEqual(ids(resultado), ["p1", "p2"]);
});

test("no alcanza y solo entra p2", () => {
  const datos = cargarEjemplo("no-alcanza.json");
  const resultado = resolverAsignacion(datos.pacientes, datos.capacidad);

  assert.equal(resultado.beneficioTotal, 8);
  assert.equal(resultado.costoTotal, 5);
  assert.deepEqual(ids(resultado), ["p2"]);
});

test("capacidad 0 no atiende a nadie", () => {
  const pacientes = [{ id: "p1", nombre: "Ana", costo: 2, beneficio: 3 }];
  const resultado = resolverAsignacion(pacientes, 0);

  assert.equal(resultado.beneficioTotal, 0);
  assert.equal(resultado.costoTotal, 0);
  assert.deepEqual(resultado.seleccionados, []);
  assert.equal(resultado.tabla.length, 2);
  assert.equal(resultado.tabla[0].length, 1);
});

test("un paciente que no cabe queda por fuera", () => {
  const pacientes = [{ id: "p1", nombre: "Ana", costo: 5, beneficio: 9 }];
  const resultado = resolverAsignacion(pacientes, 3);

  assert.equal(resultado.beneficioTotal, 0);
  assert.equal(resultado.costoTotal, 0);
  assert.deepEqual(resultado.seleccionados, []);
  assert.deepEqual(resultado.tabla[1], [0, 0, 0, 0]);
});

test("la lista vacía deja el beneficio en cero", () => {
  const resultado = resolverAsignacion([], 4);

  assert.equal(resultado.beneficioTotal, 0);
  assert.equal(resultado.costoTotal, 0);
  assert.deepEqual(resultado.seleccionados, []);
  assert.deepEqual(resultado.tabla, [[0, 0, 0, 0, 0]]);
});

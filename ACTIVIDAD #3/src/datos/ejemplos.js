export const ESCENARIOS = [
  { id: "turno-corto", archivo: "ejemplos/turno-corto.json" },
  { id: "turno-lleno", archivo: "ejemplos/turno-lleno.json" },
  { id: "no-alcanza", archivo: "ejemplos/no-alcanza.json" },
];

export async function cargarEjemplo(id) {
  const escenario = ESCENARIOS.find((item) => item.id === id);
  if (!escenario) {
    throw new Error(`Ejemplo desconocido: ${id}`);
  }

  const respuesta = await fetch(escenario.archivo);
  if (!respuesta.ok) {
    throw new Error(`No se pudo cargar ${escenario.archivo}`);
  }

  return respuesta.json();
}

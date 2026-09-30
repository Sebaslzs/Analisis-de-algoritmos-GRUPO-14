export function resolverAsignacion(pacientes, capacidad) {
  const lista = Array.isArray(pacientes) ? pacientes : [];
  const tope = Number.isInteger(capacidad) && capacidad > 0 ? capacidad : 0;
  const tabla = Array.from({ length: lista.length + 1 }, () => Array(tope + 1).fill(0));

  // Tamaño de la tabla listo. Aquí se llena la recurrencia y la reconstrucción.
  return {
    beneficioTotal: 0,
    costoTotal: 0,
    seleccionados: [],
    tabla,
  };
}

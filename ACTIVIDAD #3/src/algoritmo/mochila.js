export function resolverAsignacion(pacientes, capacidad) {
  const lista = Array.isArray(pacientes) ? pacientes : [];
  const tope = Number.isInteger(capacidad) && capacidad > 0 ? capacidad : 0;
  const n = lista.length;
  const tabla = Array.from({ length: n + 1 }, () => Array(tope + 1).fill(0));

  for (let i = 1; i <= n; i += 1) {
    const paciente = lista[i - 1];
    const peso = paciente.costo;
    const beneficio = paciente.beneficio;

    for (let c = 1; c <= tope; c += 1) {
      const sinTomar = tabla[i - 1][c];
      if (peso <= c) {
        tabla[i][c] = Math.max(sinTomar, tabla[i - 1][c - peso] + beneficio);
      } else {
        tabla[i][c] = sinTomar;
      }
    }
  }

  const seleccionados = [];
  let restante = tope;

  for (let i = n; i >= 1; i -= 1) {
    if (tabla[i][restante] > tabla[i - 1][restante]) {
      const paciente = lista[i - 1];
      seleccionados.push(paciente);
      restante -= paciente.costo;
    }
  }

  seleccionados.reverse();

  return {
    beneficioTotal: tabla[n][tope],
    costoTotal: seleccionados.reduce((suma, paciente) => suma + paciente.costo, 0),
    seleccionados,
    tabla,
  };
}

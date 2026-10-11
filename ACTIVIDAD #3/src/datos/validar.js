export function validarEntrada(pacientes, capacidad) {
  const errores = [];

  if (!Number.isInteger(capacidad) || capacidad < 0) {
    errores.push("La capacidad debe ser un entero mayor o igual que 0.");
  }

  if (!Array.isArray(pacientes)) {
    errores.push("Los pacientes deben proporcionarse en una lista.");
  } else {
    pacientes.forEach((paciente, indice) => {
      const etiqueta = `El paciente ${indice + 1}`;

      if (!paciente || typeof paciente !== "object" || Array.isArray(paciente)) {
        errores.push(`${etiqueta} debe ser un objeto válido.`);
        return;
      }

      if (!Number.isInteger(paciente.costo) || paciente.costo <= 0) {
        errores.push(`${etiqueta}: el costo debe ser un entero mayor que 0.`);
      }

      if (!Number.isInteger(paciente.beneficio) || paciente.beneficio < 0) {
        errores.push(`${etiqueta}: el beneficio debe ser un entero mayor o igual que 0.`);
      }
    });
  }

  return { valido: errores.length === 0, errores };
}

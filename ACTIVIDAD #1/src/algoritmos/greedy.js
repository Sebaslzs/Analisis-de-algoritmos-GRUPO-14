// Dueño: Sebastián
// Algoritmos Voraces (Greedy) para asignación de consultorios E.S.E.

// El ordenamiento usa el mergeSort propio de Brayan, NO el .sort() nativo de JavaScript.
import { mergeSort } from './ordenamiento.js';

/**
 * Convierte un valor de hora (número o string "HH:MM") a un número flotante en horas.
 * Ejemplo: "08:30" -> 8.5, 9 -> 9.0
 */
export function convertirAHoraDecimal(hora) {
  if (typeof hora === 'number') return hora;
  if (typeof hora === 'string') {
    if (hora.includes(':')) {
      const [hh, mm] = hora.split(':').map(Number);
      return hh + (mm / 60);
    }
    return parseFloat(hora);
  }
  return 0;
}

/**
 * Extrae horaInicio / inicio de una solicitud.
 */
export function obtenerInicio(solicitud) {
  const v = solicitud.horaInicio !== undefined ? solicitud.horaInicio : solicitud.inicio;
  return convertirAHoraDecimal(v);
}

/**
 * Extrae horaFin / fin de una solicitud.
 */
export function obtenerFin(solicitud) {
  const v = solicitud.horaFin !== undefined ? solicitud.horaFin : solicitud.fin;
  return convertirAHoraDecimal(v);
}

/**
 * Variante A — Selección de Intervalos (Interval Scheduling)
 * Maximiza el número de solicitudes atendidas en un solo consultorio.
 *
 * @param {Array} solicitudes Lista de objetos solicitud
 * @returns {Object} { aceptadas, rechazadas, totalAceptadas, totalRechazadas }
 */
export function seleccionIntervalos(solicitudes) {
  if (!Array.isArray(solicitudes) || solicitudes.length === 0) {
    return { aceptadas: [], rechazadas: [], totalAceptadas: 0, totalRechazadas: 0 };
  }

  // 1. Ordenamiento por hora de fin ascendente (Criterio Greedy óptimo).
  //    mergeSort devuelve un arreglo nuevo, no modifica el original.
  const copia = mergeSort(solicitudes, (a, b) => obtenerFin(a) - obtenerFin(b));

  const aceptadas = [];
  const rechazadas = [];
  let ultimaHoraFin = -Infinity;

  // 2. Selección voraz de intervalos compatibles
  for (const s of copia) {
    const inicio = obtenerInicio(s);
    if (inicio >= ultimaHoraFin) {
      aceptadas.push(s);
      ultimaHoraFin = obtenerFin(s);
    } else {
      rechazadas.push(s);
    }
  }

  return {
    aceptadas,
    rechazadas,
    totalAceptadas: aceptadas.length,
    totalRechazadas: rechazadas.length
  };
}

/**
 * Variante B — Particionamiento de Intervalos (Interval Partitioning)
 * Minimiza el número de consultorios necesarios para atender TODAS las solicitudes.
 *
 * @param {Array} solicitudes Lista de objetos solicitud
 * @returns {Object} { consultorios, totalConsultorios, profundidadMaxima }
 */
export function particionamiento(solicitudes) {
  if (!Array.isArray(solicitudes) || solicitudes.length === 0) {
    return { consultorios: [], totalConsultorios: 0, profundidadMaxima: 0 };
  }

  // 1. Ordenamiento por hora de inicio ascendente
  const copia = mergeSort(solicitudes, (a, b) => obtenerInicio(a) - obtenerInicio(b));

  const consultorios = [];

  // 2. Asignación voraz al primer consultorio libre
  for (const s of copia) {
    const inicio = obtenerInicio(s);
    const fin = obtenerFin(s);
    let asignado = false;

    for (const c of consultorios) {
      if (c.ultimaHoraFin <= inicio) {
        c.solicitudes.push(s);
        c.ultimaHoraFin = fin;
        asignado = true;
        break;
      }
    }

    if (!asignado) {
      consultorios.push({
        id: consultorios.length + 1,
        solicitudes: [s],
        ultimaHoraFin: fin
      });
    }
  }

  // 3. Cálculo de la profundidad máxima (cota inferior teórica)
  const profundidadMaxima = calcularProfundidadMaxima(copia);

  return {
    consultorios,
    totalConsultorios: consultorios.length,
    profundidadMaxima
  };
}

/**
 * Calcula la profundidad máxima (máximo número de intervalos superpuestos simultáneamente).
 */
export function calcularProfundidadMaxima(solicitudes) {
  const eventos = [];
  for (const s of solicitudes) {
    eventos.push({ tiempo: obtenerInicio(s), tipo: 1 });  // Entrada
    eventos.push({ tiempo: obtenerFin(s), tipo: -1 });   // Salida
  }

  // Si coinciden en tiempo, las salidas (-1) se procesan antes que las entradas (+1)
  const ordenados = mergeSort(eventos, (a, b) => {
    if (a.tiempo !== b.tiempo) return a.tiempo - b.tiempo;
    return a.tipo - b.tipo;
  });

  let profundidadActual = 0;
  let maxProfundidad = 0;

  for (const e of ordenados) {
    profundidadActual += e.tipo;
    if (profundidadActual > maxProfundidad) {
      maxProfundidad = profundidadActual;
    }
  }

  return maxProfundidad;
}

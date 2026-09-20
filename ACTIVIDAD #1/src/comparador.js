// Dueño: Brayan
// compararCriterios(solicitudes) -> corre los tres criterios y devuelve las métricas de cada uno


import { mergeSort } from "./algoritmos/ordenamiento.js";

function aMinutos(hora) {
    const [horas, minutos] = hora
        .split(":")
        .map(Number);

    return (horas * 60) + minutos;
}

function seleccionarSolicitudes(solicitudesOrdenadas) {

    const aceptadas = [];

    let ultimoFin = -1;

    for (const solicitud of solicitudesOrdenadas) {

        const inicio = aMinutos(
            solicitud.inicio
        );

        const fin = aMinutos(
            solicitud.fin
        );

        if (inicio >= ultimoFin) {

            aceptadas.push(
                solicitud
            );

            ultimoFin = fin;
        }
    }

    return aceptadas;
}

export function porHoraFin(solicitudes) {

    const ordenadas = mergeSort(
        solicitudes,
        (a, b) =>
            aMinutos(a.fin) -
            aMinutos(b.fin)
    );

    return seleccionarSolicitudes(
        ordenadas
    );
}

export function porHoraInicio(solicitudes) {

    const ordenadas = mergeSort(
        solicitudes,
        (a, b) =>
            aMinutos(a.inicio) -
            aMinutos(b.inicio)
    );

    return seleccionarSolicitudes(
        ordenadas
    );
}

export function porDuracion(solicitudes) {

    const ordenadas = mergeSort(

        solicitudes,
        (a, b) => {

            const duracionA =
                aMinutos(a.fin) -
                aMinutos(a.inicio);

            const duracionB =
                aMinutos(b.fin) -
                aMinutos(b.inicio);

            return duracionA - duracionB;
        }
    );

    return seleccionarSolicitudes(
        ordenadas
    );
}

export function compararCriterios(solicitudes) {

    const resultadoHoraFin =
        porHoraFin(solicitudes);
    const resultadoHoraInicio =
        porHoraInicio(solicitudes);

    const resultadoDuracion =
        porDuracion(solicitudes);

    return {
        horaFin: {
            cantidad: resultadoHoraFin.length,
            solicitudes: resultadoHoraFin

        },

        horaInicio: {
            cantidad: resultadoHoraInicio.length,
            solicitudes: resultadoHoraInicio
        },

        duracion: {
            cantidad: resultadoDuracion.length,
            solicitudes: resultadoDuracion
        }
    };
}
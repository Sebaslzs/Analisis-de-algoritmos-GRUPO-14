// Dueño: Brayan
// mergeSort(arreglo, comparador) -> mergesort propio, genérico, con conteo de comparaciones

let comparaciones = 0;

export function reiniciarComparaciones() {
    comparaciones = 0;
}

export function obtenerComparaciones() {
    return comparaciones;
}

export function mergeSort(arreglo, comparador) {

    if (arreglo.length <= 1) {
        return [...arreglo];
    }

    const mitad = Math.floor(arreglo.length / 2);

    const izquierda = mergeSort(
        arreglo.slice(0, mitad),
        comparador
    );

    const derecha = mergeSort(
        arreglo.slice(mitad),
        comparador
    );

    return mezclar(
        izquierda,
        derecha,
        comparador
    );
}

function mezclar(
    izquierda,
    derecha,
    comparador
) {
    const resultado = [];

    let i = 0;
    let j = 0;

    while (
        i < izquierda.length &&
        j < derecha.length
    ) {
        comparaciones++;

        if (
            comparador(
                izquierda[i],
                derecha[j]
            ) <= 0
        ) {
            resultado.push(
                izquierda[i]
            );
            i++;
        } else {
            resultado.push(
                derecha[j]
            );
            j++;
        }
    }

    while (i < izquierda.length) {
        resultado.push(
            izquierda[i]
        );
        i++;
    }
    
    while (j < derecha.length) {
        resultado.push(
            derecha[j]
        );
        j++;
    }

    return resultado;
}

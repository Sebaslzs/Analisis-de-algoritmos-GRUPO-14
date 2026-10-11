function crearPanel(titulo) {

    const panel = document.createElement("div");

    panel.className = "panel";

    const encabezado =
        document.createElement("h2");

    encabezado.textContent = titulo;

    panel.appendChild(encabezado);

    return panel;
}

export function renderizarPendientes(
    contenedor,
    solicitudes
) {

    contenedor.innerHTML = "";

    const panel = crearPanel(
        "Solicitudes Pendientes"
    );

    const lista =
        document.createElement("ul");

    solicitudes.forEach(
        solicitud => {

            const item =
                document.createElement("li");

            item.textContent =
                `${solicitud.id} | `
                + `${solicitud.servicio} | `
                + `${solicitud.inicio} - `
                + `${solicitud.fin}`;

            lista.appendChild(item);
        }
    );

    panel.appendChild(lista);

    contenedor.appendChild(
        panel
    );
}

export function renderizarAceptadas(
    contenedor,
    solicitudes
) {

    contenedor.innerHTML = "";

    const panel = crearPanel(
        "Solicitudes Aceptadas"
    );

    const lista =
        document.createElement("ul");

    solicitudes.forEach(
        solicitud => {

            const item =
                document.createElement("li");

            item.textContent =
                `✅ ${solicitud.id} | `
                + `${solicitud.inicio} - `
                + `${solicitud.fin}`;

            lista.appendChild(item);
        }
    );

    panel.appendChild(lista);

    contenedor.appendChild(
        panel
    );
}

export function renderizarRechazadas(
    contenedor,
    solicitudes
) {

    contenedor.innerHTML = "";

    const panel = crearPanel(
        "Solicitudes Rechazadas"
    );

    const lista =
        document.createElement("ul");

    solicitudes.forEach(
        solicitud => {

            const item =
                document.createElement("li");

            item.textContent =
                `❌ ${solicitud.id} | `
                + `${solicitud.inicio} - `
                + `${solicitud.fin}`;

            lista.appendChild(item);
        }
    );

    panel.appendChild(lista);

    contenedor.appendChild(
        panel
    );
}

export function renderizarResultado(
    contenedorPendientes,
    contenedorAceptadas,
    contenedorRechazadas,
    pendientes,
    aceptadas,
    rechazadas
) {

    renderizarPendientes(
        contenedorPendientes,
        pendientes
    );

    renderizarAceptadas(
        contenedorAceptadas,
        aceptadas
    );

    renderizarRechazadas(
        contenedorRechazadas,
        rechazadas
    );
}
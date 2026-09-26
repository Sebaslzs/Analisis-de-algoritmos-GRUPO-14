# Problema: traslado óptimo entre centros de salud

> Documento de alcance y problema, actualizado por Miguel. La red y los tiempos de este MVP son ficticios y solo tienen fines académicos.

## Contexto

En una ciudad, los pacientes a menudo deben moverse entre Instituciones Prestadoras de Salud (IPS) u hospitales: por remisión a una especialidad, por saturación de camas o por una emergencia que requiere un nivel de atención distinto.

Cada traslado tiene un **costo estimado en tiempo** (minutos entre sedes). Para este MVP se usa un dataset pequeño y ficticio; sus tiempos no corresponden a tráfico medido ni deben usarse para orientar traslados reales.

## Problema a resolver

Dada una **red de centros de salud** conectados por vías (o corredores de traslado) con tiempos estimados:

> Encontrar la **ruta de menor tiempo total** desde un centro de origen hasta un centro de destino.

Opcionalmente (extensión): si el usuario indica una **especialidad** requerida (p. ej. cardiología), elegir el destino como la IPS más cercana (en tiempo) que ofrezca esa especialidad.

## Modelado como grafo

| Concepto del dominio | Elemento del grafo |
|---|---|
| IPS / hospital / clínica | **Nodo** (vértice) |
| Vía o corredor de traslado entre dos sedes | **Arista** |
| Tiempo estimado de traslado (minutos) | **Peso** de la arista (positivo) |
| Secuencia óptima de sedes a recorrer | **Camino más corto** |

El grafo se trata como **no dirigido** en el MVP: si A se conecta con B en *t* minutos, B se conecta con A en el mismo tiempo. El cargador crea ambas direcciones para cada arista del JSON.

## Algoritmo seleccionado

**Dijkstra**, porque:

1. Los pesos (minutos) son **no negativos**.
2. Necesitamos el camino de **mínimo costo** desde un origen hacia un destino (o hacia varios candidatos).
3. Es un algoritmo clásico de grafos, fácil de explicar en la sustentación y de evidenciar en el código.

Complejidad esperada con cola de prioridad: **O((V + E) log V)**, donde *V* es el número de centros y *E* el número de conexiones.

## Entradas y salidas de la solución

**Entrada (usuario):**

- Centro de origen (id).
- Centro de destino (id), o especialidad (extensión).

**Salida (sistema):**

- Lista ordenada de centros (ids/nombres) que forman la ruta.
- Tiempo total estimado en minutos.
- Visualización del grafo con la ruta resaltada.

## Alcance del MVP

Incluye:

- Dataset estático en JSON (`data/centros_salud.json`).
- Backend que carga el grafo y expone el cálculo de camino más corto.
- Frontend que permite elegir origen/destino, muestra nombres e identificadores de la ruta y resalta nodos y aristas del camino en el grafo.
- Casos de prueba para una ruta conocida, origen igual a destino, nodo inexistente y grafo sin ruta.

No incluye (fuera de alcance académico):

- Login, historias clínicas, base de datos.
- Tráfico en tiempo real ni mapas de calles completos.
- App móvil nativa.

## Criterio de éxito

1. El uso de Dijkstra es **evidente** en el código y en la demo.
2. Para H1 → H5, la ruta mínima del dataset es H1 → H3 → H5 y el costo es 26 minutos.
3. Para origen igual a destino, el resultado contiene ese único nodo y cuesta 0 minutos.
4. Para un nodo desconocido o dos componentes sin conexión, la API responde `encontrado: false`; la interfaz informa que no hay ruta.
5. La interfaz explica errores de conexión con la API y se puede usar en escritorio y móvil.
6. El `README.md` y la sustentación cubren problema, algoritmo, ejecución, implementación, pruebas y resultados.

## Revisión grupal

Documento base a cargo de **Miguel**. El grupo debe revisar y acordar:

- [ ] Nombres y cantidad de IPS del dataset (~8–12).
- [ ] Especialidades de ejemplo (si se implementa la extensión).
- [ ] Que el enunciado del video coincida con este documento.

Última revisión grupal: *(fecha pendiente)*

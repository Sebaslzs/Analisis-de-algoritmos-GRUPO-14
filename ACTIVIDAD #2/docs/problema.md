# Problema: traslado óptimo entre centros de salud

## Contexto

En una ciudad, los pacientes a menudo deben moverse entre Instituciones Prestadoras de Salud (IPS) u hospitales: por remisión a una especialidad, por saturación de camas o por una emergencia que requiere un nivel de atención distinto.

Cada traslado tiene un **costo en tiempo** (minutos de desplazamiento entre sedes). Elegir mal la ruta puede retrasar la atención y saturar trayectos innecesarios.

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

El grafo se trata como **no dirigido** en el MVP: si A se conecta con B en *t* minutos, B se conecta con A en el mismo tiempo (salvo que el dataset defina lo contrario).

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
- Frontend que permite elegir origen/destino y muestra resultado + grafo.

No incluye (fuera de alcance académico):

- Login, historias clínicas, base de datos.
- Tráfico en tiempo real ni mapas de calles completos.
- App móvil nativa.

## Criterio de éxito

1. El uso de Dijkstra es **evidente** en el código y en la demo.
2. Para un par origen–destino con camino existente, la ruta y el costo coinciden con el camino óptimo del grafo.
3. Si no hay camino, el sistema lo indica de forma clara.
4. El `README.md` y el video cubren: problema, algoritmo, funcionamiento, implementación y resultados.

## Revisión grupal

Documento base a cargo de **Miguel**. El grupo debe revisar y acordar:

- [ ] Nombres y cantidad de IPS del dataset (~8–12).
- [ ] Especialidades de ejemplo (si se implementa la extensión).
- [ ] Que el enunciado del video coincida con este documento.

Última revisión grupal: *(fecha pendiente)*

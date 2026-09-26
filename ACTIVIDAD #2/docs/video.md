# Guion y checklist del video de sustentación

Duración sugerida: 5–8 minutos. El video debe mostrar el sistema ejecutándose y distinguir claramente entre datos ficticios de demostración y tiempos reales.

## Guion

### 1. Problema y alcance (45–60 s)

“MediRuta resuelve un problema de traslado entre centros de salud: dada una IPS de origen y otra de destino, queremos encontrar el recorrido con menor tiempo estimado. Esta demostración utiliza una red ficticia; no representa rutas viales ni debe usarse para decisiones clínicas.”

Explicar el modelo: centro = nodo, conexión = arista y minutos estimados = peso. El MVP considera conexiones no dirigidas.

### 2. Algoritmo (60–90 s)

Explicar Dijkstra: la distancia inicial del origen es cero, las demás son infinitas; en cada iteración se procesa el centro con menor distancia conocida y se actualizan sus vecinos si se encuentra un tiempo menor. Al terminar, los predecesores reconstruyen la ruta. Es válido porque los pesos son no negativos. Con cola de prioridad, la complejidad es O((V + E) log V).

### 3. Ejemplo calculado (45–60 s)

Usar H1 (IPS Centro Norte) como origen y H5 (Hospital Universitario) como destino. Comparar al menos dos alternativas: H1→H3→H5 cuesta 12 + 14 = 26 minutos; H1→H4→H5 cuesta 18 + 9 = 27 minutos. La ruta óptima del dataset es H1→H3→H5, con 26 minutos.

### 4. Demostración de la aplicación (90–150 s)

Mostrar, en este orden:

1. `/docs` de FastAPI o `/health` para evidenciar que la API está activa.
2. MediRuta cargada con los ocho centros y las conexiones ponderadas.
3. Selección H1 → H5; calcular la ruta y señalar tiempo, nombres e identificadores, y conexiones resaltadas.
4. Caso H2 → H2, que debe devolver cero minutos y una sola parada.
5. Cambiar una selección para mostrar que el resultado anterior se limpia.

### 5. Cierre (30–45 s)

Resumir que el frontend consume la API, que Dijkstra calcula el camino sobre el grafo cargado desde JSON y que las pruebas cubren rutas conocidas y casos borde. Presentar las responsabilidades de los integrantes según [roles.md](roles.md).

## Preparación técnica

- Instalar dependencias y confirmar que `python -m pytest -v` pasa.
- Mantener el backend y el servidor estático del frontend en terminales separadas.
- Probar previamente H1 → H5 y H2 → H2.
- Cerrar pestañas/notificaciones, revisar audio y resolución, y grabar el flujo completo una vez antes de publicar.
- No mostrar información real de pacientes ni presentar los tiempos ficticios como datos operativos.

## Checklist pre-entrega

- [ ] El problema, el modelo del grafo y el alcance ficticio quedan claros.
- [ ] Se explica por qué aplica Dijkstra y se menciona la complejidad.
- [ ] El ejemplo H1 → H5 demuestra por qué 26 minutos es menor que 27.
- [ ] La interfaz muestra nodos, aristas, costo total y ruta resaltada.
- [ ] Se demuestra un caso borde y la salida de pruebas automatizadas.
- [ ] Las responsabilidades de los integrantes coinciden con la entrega.
- [ ] El video está publicado y el enlace funciona.
- [ ] El enlace publicado se agrega a este documento y al `README.md`.

## Link del video

Pendiente de grabación y publicación. Agregar aquí el enlace público cuando esté disponible.

# Asignación Óptima de Consultorios — Algoritmo Greedy

**Examen 1 — Análisis de Algoritmos · ITM**
**Integrantes:** Sebastián · Brayan · Miguel

> **Nota sobre commits:** algunos aportes de Sebastián aparecen en el historial de Git como `HOSPITAL - Portatil Apoyo03`, porque se subieron desde el equipo Apoyo 03. Son commits del mismo integrante.

---

## ¿Qué es este proyecto?

Aplicación web que resuelve dos problemas reales de asignación de consultorios para una E.S.E. (Empresa Social del Estado), utilizando **Algoritmos Voraces (Greedy)**:

| Variante | Pregunta | Resultado |
|----------|----------|-----------|
| **A — Selección de Intervalos** | Si solo hay **1 consultorio libre**, ¿cuál es el máximo de citas que se pueden atender sin solapamiento? | Subconjunto óptimo de solicitudes aceptadas y rechazadas |
| **B — Particionamiento de Intervalos** | Para atender **todas** las solicitudes, ¿cuántos consultorios se necesitan como mínimo? | Distribución de citas en N consultorios con grilla visual |

Además incluye una tercera vista, **Comparación de criterios**, que ejecuta la Variante A con los tres criterios de ordenamiento posibles (hora de fin, hora de inicio y duración) para evidenciar cuál es el óptimo y por qué.

Las solicitudes **se editan desde la propia interfaz**: el conjunto de 15 citas de `src/datos/solicitudes.js` es solo el punto de partida, no un resultado fijo. Todo se recalcula al vuelo con los datos que cargues.

---

## Cómo probarlo

### Requisitos previos
- Un navegador web moderno (Chrome, Firefox, Edge).
- Un servidor local para servir archivos con soporte de ES Modules.

### Opción 1 — VS Code con Live Server (recomendada)
1. Abre la carpeta del proyecto en VS Code.
2. Instala la extensión **Live Server** si no la tienes.
3. Clic derecho sobre `index.html` → **Open with Live Server**.

### Opción 2 — Servidor con Python
```bash
# En la raíz del proyecto:
python -m http.server 8000
# Luego abre http://localhost:8000 en el navegador
```

### Opción 3 — Servidor con Node.js
```bash
npx serve .
```

> **Nota:** Abrir `index.html` directamente como archivo (`file://`) **no funcionará** porque el proyecto usa ES Modules (`import`/`export`), que requieren un servidor HTTP.

---

## Uso de la aplicación

### Cargar los datos de entrada

Al abrir `index.html` aparece arriba el panel **Datos de entrada** con las 15 solicitudes de ejemplo. Desde ahí puedes:

- **Agregar** una solicitud: ID (se propone el siguiente libre), servicio, profesional (opcional), hora de inicio y hora de fin.
- **Eliminar** cualquier solicitud con el botón ✕ de su fila.
- **Restaurar ejemplo** para volver al conjunto original, o **Vaciar** para empezar de cero.

El formulario valida que la hora de fin sea posterior a la de inicio, que el ID no esté repetido y que el servicio no quede vacío. Si cargas una cita fuera del horario 07:00–18:00 se agrega igual —los algoritmos la tienen en cuenta— pero avisa que la grilla de la Variante B no la dibujará, porque esa vista solo cubre la jornada.

Cualquier cambio en los datos recalcula de inmediato la vista que estés viendo.

### Ejecutar los algoritmos

1. **"Variante A (1 Consultorio)"** — Selección de Intervalos:
   - Se mostrarán tres paneles: Pendientes, Aceptadas (✅) y Rechazadas (❌).
   - Arriba se indica cuántas citas se aceptaron y cuántas se rechazaron.
2. **"Variante B (N Consultorios)"** — Particionamiento de Intervalos:
   - Se dibuja una grilla visual hora × consultorio (07:00–18:00, bloques de 30 min).
   - Cada columna representa un consultorio y cada bloque de color es una cita asignada.
   - Arriba se indica el total de consultorios requeridos y la profundidad máxima.
3. **"Comparar criterios"** — tabla con los tres criterios de ordenamiento:
   - Cuántas citas atiende cada uno y qué solicitudes acepta.
   - Con el conjunto de ejemplo el resultado es **8 / 7 / 6**: ordenar por hora de fin atiende 8 citas, por hora de inicio 7 y por duración 6. Solo el primero garantiza el máximo para *cualquier* entrada.

---

## Pruebas

| Archivo | Qué prueba | Cómo abrirlo |
|---------|------------|---------------|
| [`pruebas/test-greedy.html`](pruebas/test-greedy.html) | Conversión de horas, selección de intervalos, particionamiento, casos borde | Abrir con Live Server |
| [`pruebas/test-ordenamiento.html`](pruebas/test-ordenamiento.html) | MergeSort propio y comparación de 3 criterios greedy | Abrir con Live Server |
| [`demos/demo-grilla.html`](demos/demo-grilla.html) | Visualización independiente de la grilla con datos de prueba | Abrir con Live Server |
| [`demos/demo-paneles.html`](demos/demo-paneles.html) | Paneles de solicitudes pendientes/aceptadas/rechazadas | Abrir con Live Server |

---

## Estructura del proyecto

```
/
├── index.html                      ← Página principal (integración final)
├── README.md                       ← Este archivo
├── plan.md                         ← Plan teórico: pseudocódigo, demostraciones y análisis
├── CONTEXTO.md                     ← Contexto, roles y cronograma del equipo
├── src/
│   ├── algoritmos/
│   │   ├── greedy.js               ← Algoritmos Greedy (Variante A y B)
│   │   └── ordenamiento.js         ← MergeSort genérico con conteo de comparaciones
│   ├── comparador.js               ← Comparador de 3 criterios de ordenamiento
│   ├── ui/
│   │   ├── grilla.js               ← Grilla visual hora × consultorio
│   │   ├── grilla.css              ← Estilos de la grilla
│   │   ├── paneles.js              ← Paneles de solicitudes (pendientes/aceptadas/rechazadas)
│   │   ├── editor.js               ← Formulario y lista editable de datos de entrada
│   │   └── comparacion.js          ← Tabla comparativa de los 3 criterios greedy
│   └── datos/
│       └── solicitudes.js          ← Dataset de 15 solicitudes de ejemplo
├── pruebas/
│   ├── test-greedy.html            ← Tests unitarios del algoritmo greedy
│   ├── test-ordenamiento.html      ← Tests del MergeSort y comparador
│   └── casos.js                    ← Casos de prueba reutilizables
└── demos/
    ├── demo-grilla.html            ← Demo independiente de la grilla
    └── demo-paneles.html           ← Demo independiente de los paneles
```

---

## Tecnologías

- **HTML5 + CSS3 + JavaScript (ES Modules)** — Sin frameworks ni dependencias externas.
- **Algoritmos implementados desde cero** — El MergeSort propio de `src/algoritmos/ordenamiento.js` es el que ordena dentro de `greedy.js`, tanto en la Variante A como en la B y en el cálculo de la profundidad máxima. En el código de la aplicación no se usa el `.sort()` nativo de JavaScript.

---

## Documentación teórica

El análisis formal del algoritmo (pseudocódigo, complejidad O(n log n), demostraciones de optimalidad por *Greedy Stays Ahead* y *Cota Inferior por Profundidad Máxima*) se encuentra en [`plan.md`](plan.md).

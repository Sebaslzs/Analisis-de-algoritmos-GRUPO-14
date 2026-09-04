# Analisis-de-algoritmos-GRUPO-14

**Examen 1 — Análisis de Algoritmos · ITM**
**Integrantes:** Sebastián · Brayan · Miguel · Emanuel
**Entrega:** miércoles 2 de septiembre de 2026

## Descripción del problema

*(Emanuel)*

Una E.S.E. recibe cada día una lista de solicitudes de uso de consultorio (profesional, servicio, hora de inicio y hora de fin). Hoy la coordinación las asigna a ojo. El proyecto responde dos preguntas:

1. Si solo hay **un consultorio libre**, ¿qué subconjunto de solicitudes permite atender la **mayor cantidad** de ellas?
2. Para atender **todas** las solicitudes del día, ¿cuál es el **mínimo número de consultorios** necesario?

## Solución propuesta

*(Sebastián)*

Para resolver los dos requerimientos de la E.S.E., se aplican dos enfoques basados en la técnica de **Algoritmos Voraces (Greedy)**:

1. **Pregunta 1 — Maximización en 1 consultorio libre (Variante A - Selección de Intervalos):**
   - **Objetivo:** Atender el mayor número posible de citas en un único consultorio disponible sin solapamientos.
   - **Estrategia Greedy:** Priorizar siempre la solicitud cuya hora de finalización sea la más temprana entre las compatibles.
   - **Salida:** Un subconjunto óptimo de solicitudes aceptadas y la lista de solicitudes rechazadas.

2. **Pregunta 2 — Minimización de consultorios para atender todas las solicitudes (Variante B - Particionamiento de Intervalos):**
   - **Objetivo:** Asignar **todas** las solicitudes del día utilizando la menor cantidad de consultorios requerida.
   - **Estrategia Greedy:** Procesar las solicitudes ordenadas por hora de inicio ascendente. Asignar la solicitud al primer consultorio existente que esté libre en ese momento. Si todos están ocupados, habilitar un nuevo consultorio.
   - **Salida:** Un listado de consultorios creados con las solicitudes asignadas a cada uno y el número mínimo total de consultorios necesarios.

Ambos algoritmos garantizan respuestas **óptimas globales** mediante decisiones **locales voraces**, con una complejidad temporal eficiente de \(\mathcal{O}(n \log n)\).

---

## Explicación del algoritmo

*(Sebastián)*

### 1. Variante A — Selección de Intervalos (Interval Scheduling)

#### Descripción y Pseudocódigo
Dado un conjunto de \(n\) solicitudes \(S = \{s_1, s_2, \dots, s_n\}\) donde cada solicitud tiene hora de inicio \(inicio(s_i)\) y hora de fin \(fin(s_i)\):

```text
Algoritmo SeleccionIntervalos(solicitudes):
    1. Ordenar solicitudes por fin(s) ascendente.
    2. aceptadas ← []
    3. ultimaHoraFin ← -infinity
    4. Para cada s en solicitudes ordenadas:
           Si inicio(s) >= ultimaHoraFin:
               Agregar s a aceptadas
               ultimaHoraFin ← fin(s)
    5. Retornar aceptadas
```

#### Análisis de Complejidad
- **Tiempo:** Ordenamiento \(\mathcal{O}(n \log n)\) + Recorrido voraz lineal \(\mathcal{O}(n)\) = \(\mathcal{O}(n \log n)\).
- **Espacio:** \(\mathcal{O}(n)\) para almacenar el subconjunto de respuesta.

#### Demostración de Optimalidad (Argumento de Intercambio / *Greedy Stays Ahead*)
**Teorema:** El conjunto de solicitudes seleccionadas por el algoritmo voraz \(G = \{g_1, g_2, \dots, g_k\}\) tiene el tamaño máximo posible.

**Demostración (por inducción):**
Sea \(O = \{o_1, o_2, \dots, o_m\}\) una solución óptima cualquiera ordenada por hora de finalización. Debemos probar que \(k = m\).

Demostraremos por inducción que para todo \(i \le k\), la hora de finalización del \(i\)-ésimo elemento voraz es menor o igual a la del \(i\)-ésimo elemento óptimo:
\[
fin(g_i) \le fin(o_i)
\]

1. **Caso base (\(i = 1\)):**
   El algoritmo voraz elige \(g_1\) con la hora de finalización más temprana de todo el conjunto. Por lo tanto, \(fin(g_1) \le fin(o_1)\).

2. **Paso inductivo:**
   Asumimos que para \(i = r - 1\), se cumple \(fin(g_{r-1}) \le fin(o_{r-1})\).
   Dado que \(o_r\) es compatible con \(o_{r-1}\) en la solución óptima:
   \[
   inicio(o_r) \ge fin(o_{r-1}) \ge fin(g_{r-1})
   \]
   Esto implica que \(o_r\) es una solicitud válida disponible para ser elegida por el algoritmo voraz en el paso \(r\). Como el algoritmo voraz selecciona el intervalo disponible con la menor hora de finalización:
   \[
   fin(g_r) \le fin(o_r)
   \]

3. **Conclusión:**
   Si existiera un elemento \(o_{k+1}\) en la solución óptima, por el paso inductivo tendríamos \(inicio(o_{k+1}) \ge fin(o_k) \ge fin(g_k)\). Esto significaría que \(o_{k+1}\) habría sido elegible por el algoritmo voraz después de \(g_k\), contradiciendo que el algoritmo se detuvo en \(g_k\). Por lo tanto, \(k = m\) y la solución voraz es óptima. \(\blacksquare\)

---

### 2. Variante B — Particionamiento de Intervalos (Interval Partitioning)

#### Descripción y Pseudocódigo
Dado el conjunto de solicitudes \(S\), queremos asignarlas a la menor cantidad de consultorios posible:

```text
Algoritmo ParticionamientoIntervalos(solicitudes):
    1. Ordenar solicitudes por inicio(s) ascendente.
    2. consultorios ← []  // Lista de consultorios
    3. Para cada s en solicitudes ordenadas:
           asignado ← Falso
           Para cada c en consultorios:
               Si c.ultimaHoraFin <= inicio(s):
                   Agregar s a c
                   c.ultimaHoraFin ← fin(s)
                   asignado ← Verdadero
                   Romper ciclo
           Si no asignado:
               Crear nuevo consultorio c_nuevo con s
               c_nuevo.ultimaHoraFin ← fin(s)
               Agregar c_nuevo a consultorios
    4. Retornar consultorios
```

#### Análisis de Complejidad
- **Tiempo:** Ordenamiento \(\mathcal{O}(n \log n)\) + Búsqueda/Asignación \(\mathcal{O}(n \cdot d)\) donde \(d\) es el número de consultorios.
- **Espacio:** \(\mathcal{O}(n)\) para la distribución de consultorios.

#### Demostración de Optimalidad (Cota Inferior por Profundidad Máxima \(d\))
**Definición (Profundidad):** La *profundidad* \(d\) de un conjunto de intervalos es el número máximo de intervalos mutuamente traslapados en cualquier punto del tiempo.

**Teorema:** El número de consultorios utilizado por el algoritmo voraz es exactamente igual a la profundidad máxima \(d\), la cual representa una cota inferior insuperable para cualquier solución válida.

**Demostración:**
1. **Cota Inferior:** Si en un instante determinado del tiempo hay \(d\) solicitudes superpuestas entre sí, se requieren **al menos** \(d\) consultorios independientes para atenderlas simultáneamente. Por lo tanto, cualquier solución requiere \(\text{Consultorios} \ge d\).
2. **Cota del Voraz:** Supongamos que el algoritmo voraz abre un nuevo consultorio \(d'\). Esto ocurre al procesar una solicitud \(s_k\) porque **todos** los \(d' - 1\) consultorios existentes ya estaban ocupados por solicitudes cuyo inicio era \(\le inicio(s_k)\) y cuya finalización es \(> inicio(s_k)\).
3. Por ende, en el momento \(inicio(s_k)\), existen exactamente \(d'\) solicitudes superpuestas simultáneamente (las \(d'-1\) anteriores más \(s_k\)).
4. Esto implica que la profundidad del conjunto de datos es al menos \(d'\) (\(d \ge d'\)).
5. Puesto que el total de consultorios asignados por el algoritmo voraz no excede la profundidad máxima \(d\) (\(d' \le d\)) y ninguna solución puede usar menos de \(d\), el algoritmo voraz usa exactamente \(d\) consultorios y es **estrictamente óptimo**. \(\blacksquare\)

---

## Grilla hora × consultorio

*(Miguel)*

La visualización está implementada en [`src/ui/grilla.js`](src/ui/grilla.js) y [`src/ui/grilla.css`](src/ui/grilla.css). `renderizarGrilla(contenedor, resultado)` acepta tanto la salida de `seleccionIntervalos` como la de `particionamiento`: reconoce solicitudes con `inicio`/`fin` o `horaInicio`/`horaFin`, y consultorios representados como arreglos o como objetos con la propiedad `solicitudes`.

La demo autónoma se abre directamente en el navegador desde [`demos/demo-grilla.html`](demos/demo-grilla.html). Presenta tres criterios lado a lado, la jornada de 07:00 a 18:00 en bloques de 30 minutos, solicitudes aceptadas en color y rechazadas en gris.

### Prueba realizada

Se verificó la integración cargando `greedy.js` con solicitudes reales y enviando el resultado de `particionamiento` a la grilla. El resultado esperado es una columna por consultorio, todos los intervalos visibles y ningún error de JavaScript. También se verificó la demo independiente y la vista responsive en navegador.

## Trabajo futuro

*(Miguel)*

La grilla mantiene la jornada fija definida por el contrato. Quedan fuera de alcance las recurrencias, las vistas semana/mes/año, los filtros por entidad, la autenticación y la persistencia en base de datos.

## Link al video

*(Sebastián)*

[Ver video explicativo del proyecto en YouTube / Loom](https://youtube.com) *(Pendiente de grabación final por el equipo)*.

---

## Estructura del proyecto

```
/
├── index.html                      ← Sebastián (integración final)
├── README.md                       ← cada uno escribe su sección
├── CONTEXTO.md                     ← contexto y plan de trabajo del equipo
├── src/
│   ├── algoritmos/
│   │   ├── greedy.js               ← Sebastián
│   │   └── ordenamiento.js         ← Brayan
│   ├── comparador.js               ← Brayan
│   ├── ui/
│   │   ├── grilla.js               ← Miguel
│   │   ├── grilla.css              ← Miguel
│   │   └── paneles.js              ← Emanuel
│   └── datos/
│       └── solicitudes.js          ← Emanuel
├── pruebas/
│   ├── test-greedy.html            ← Sebastián
│   ├── test-ordenamiento.html      ← Brayan
│   └── casos.js                    ← Emanuel
└── demos/
    ├── demo-grilla.html            ← Miguel
    └── demo-paneles.html           ← Emanuel
```

Ver `CONTEXTO.md` para el plan de trabajo completo, roles, cronograma y contrato de datos.

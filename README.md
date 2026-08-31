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

Pendiente.

## Explicación del algoritmo

*(Sebastián)*

Dos algoritmos greedy con demostración de optimalidad:

- **Variante A — Selección de intervalos:** ordena por hora de finalización ascendente y toma cada solicitud que no se solape con la última aceptada. Maximiza el número de atenciones en un solo consultorio.
- **Variante B — Particionamiento de intervalos:** ordena por hora de inicio ascendente y reutiliza consultorios ya liberados, abriendo uno nuevo solo si es necesario. Minimiza el número de consultorios para atender todas las solicitudes.

El detalle completo, incluyendo el argumento de intercambio y la cota inferior, está en `CONTEXTO.md`.

## Ordenamiento implementado y comparación de criterios

*(Brayan)*

Pendiente. Incluye un `mergeSort` propio (sin `.sort()` nativo) y la comparación entre tres criterios de selección: fin más temprano (óptimo), inicio más temprano y duración más corta (ambos no óptimos, con contraejemplo).

## Cómo ejecutar el proyecto

*(Miguel)*

Pendiente.

## Resultados obtenidos

*(Emanuel)*

Pendiente.

## Trabajo futuro

*(Miguel)*

Fuera de alcance para este examen: recurrencias, vistas semana/mes/año, filtros por entidad, autenticación y persistencia en base de datos.

## Link al video

*(Sebastián)*

Pendiente.

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

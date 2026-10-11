# Roles del equipo — Grupo 14

Proyecto: **MediRuta** (traslado óptimo entre centros de salud con Dijkstra).

La calificación del examen es **individual**. Cada integrante debe dejar evidencia clara en el historial de Git (commits propios) y dominar la solución en la sustentación.

---

## Resumen de ownership

| Integrante | Ownership principal | Carpetas / archivos principales |
|---|---|---|
| **Sebastián** | Núcleo del algoritmo + modelo del grafo | `backend/app/graph/`, parte de `backend/app/models.py`, `docs/algoritmo-dijkstra.md` |
| **Brayan** | API backend + datos + tests | `backend/app/main.py`, `backend/app/routers/`, `data/`, `backend/requirements.txt`, `backend/tests/` |
| **Miguel** | Frontend, visualización, documentación y video | `frontend/`, `README.md`, `docs/problema.md`, `docs/roles.md`, `docs/video.md`, `.gitignore` |

---

## Detalle por integrante

### Sebastián — Algoritmo y grafo

- Implementar `dijkstra.py` (camino más corto con pesos positivos).
- Implementar `loader.py` (JSON → estructura de grafo).
- Documentar el algoritmo en `docs/algoritmo-dijkstra.md` (pasos, complejidad, ejemplo).
- Cubrir casos borde: origen = destino, sin ruta, grafo con un solo nodo.

### Brayan — API y datos

- Definir y mantener `data/centros_salud.json` (~8–12 IPS + aristas con minutos).
- Levantar FastAPI: endpoints `/health`, `/graph`, `/shortest-path`.
- Configurar CORS para que el frontend pueda consumir la API.
- Escribir tests en `backend/tests/test_dijkstra.py` que validen rutas conocidas.
- Mantener `requirements.txt`.

### Miguel — Frontend, docs, entrega y video

- Pantalla para elegir origen y destino; consumir la API (`js/api.js`).
- Dibujar el grafo y **resaltar la ruta** calculada (`js/graph-view.js`).
- Mostrar tiempo total y lista de centros; estilos y usabilidad desktop/móvil.
- Mantener `README.md` alineado con las pautas (problema, solución, algoritmo, link del video).
- Redactar/actualizar `docs/problema.md`, `docs/roles.md`, `docs/video.md`.
- Coordinar fecha de grabación y checklist pre-entrega.
- Asegurar que el repositorio esté listo antes del **domingo 27 de septiembre de 2026**.

---

## Convención de commits

Prefijos sugeridos:

| Prefijo | Uso |
|---|---|
| `feat(algo):` | Cambios en Dijkstra / modelo de grafo |
| `feat(api):` | Endpoints, schemas, CORS |
| `feat(ui):` | Frontend y visualización |
| `feat(data):` | Dataset JSON |
| `test:` | Pruebas |
| `docs:` | README y documentos en `docs/` |
| `chore:` | `.gitignore`, stubs, configuración |

Ejemplos:

```text
feat(algo): implementar Dijkstra con cola de prioridad
feat(api): endpoint POST /shortest-path
feat(ui): resaltar camino en el grafo
docs: agregar enunciado del problema de salud
```

**Reglas:**

1. Commitear con frecuencia (varios commits pequeños > un commit gigante).
2. Trabajar preferentemente en los archivos de tu ownership.
3. Si necesitas tocar un archivo de otra persona, avisar al grupo antes.
4. No subir secretos, `.env`, ni carpetas `venv` / `__pycache__` (ya están en `.gitignore`).
5. No subir `pautas.md` (está en `.gitignore`; es material interno del grupo).

---

## Sustentación (todos)

Aunque Miguel coordina el video, **los tres** deben poder explicar:

1. El problema de salud planteado.
2. Cómo se modela como grafo.
3. Cómo funciona Dijkstra (a alto nivel, con el ejemplo del dataset).
4. Qué parte implementó cada uno.

Guion y checklist: [video.md](video.md).

---

## Revisión grupal de este documento

- [x] Roles confirmados por los 3 integrantes
- [x] Ownership de carpetas sin solapamientos conflictivos
- [x] Convención de commits acordada

Última revisión grupal: 26 de septiembre de 2026

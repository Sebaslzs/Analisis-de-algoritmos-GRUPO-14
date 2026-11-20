# 79. Word Search
# Familia: backtracking
# Qué se elige: una celda vecina no usada que coincida con la siguiente letra.
# Qué se deshace: se restaura la celda marcada cuando el camino falla.
# Tiempo O(m*n*4^L), espacio O(L), con L = len(word).

class Solution:
    def exist(self, board: List[List[str]], word: str) -> bool:
        filas = len(board)
        columnas = len(board[0]) if filas else 0

        def buscar(fila: int, columna: int, posicion: int) -> bool:
            if posicion == len(word):
                return True
            if (
                fila < 0
                or fila >= filas
                or columna < 0
                or columna >= columnas
                or board[fila][columna] != word[posicion]
            ):
                return False

            letra = board[fila][columna]
            board[fila][columna] = "#"

            for df, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                if buscar(fila + df, columna + dc, posicion + 1):
                    board[fila][columna] = letra
                    return True

            board[fila][columna] = letra
            return False

        for fila in range(filas):
            for columna in range(columnas):
                if buscar(fila, columna, 0):
                    return True

        return False

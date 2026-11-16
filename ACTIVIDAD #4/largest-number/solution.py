class Solution:

    def va_primero(self, a, b):
        return a + b > b + a

    def ajustar_heap(self, datos, n, pos):
        mayor = pos
        izquierda = 2 * pos + 1
        derecha = 2 * pos + 2

        if izquierda < n and self.va_primero(datos[izquierda], datos[mayor]):
            mayor = izquierda

        if derecha < n and self.va_primero(datos[derecha], datos[mayor]):
            mayor = derecha

        if mayor != pos:
            datos[pos], datos[mayor] = datos[mayor], datos[pos]
            self.ajustar_heap(datos, n, mayor)

    def ordenar_heap(self, datos):
        n = len(datos)

        for i in range(n // 2 - 1, -1, -1):
            self.ajustar_heap(datos, n, i)

        for i in range(n - 1, 0, -1):
            datos[0], datos[i] = datos[i], datos[0]
            self.ajustar_heap(datos, i, 0)

        datos.reverse()

    def largestNumber(self, nums):
        datos = [str(num) for num in nums]

        self.ordenar_heap(datos)

        resultado = "".join(datos)

        if resultado[0] == "0":
            return "0"

        return resultado
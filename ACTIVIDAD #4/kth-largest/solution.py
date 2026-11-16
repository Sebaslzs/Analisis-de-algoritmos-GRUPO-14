class Solution:

    def subir(self, heap, pos):
        while pos > 0:
            padre = (pos - 1) // 2

            if heap[padre] <= heap[pos]:
                break

            heap[padre], heap[pos] = heap[pos], heap[padre]
            pos = padre

    def bajar(self, heap, pos):
        n = len(heap)

        while True:
            menor = pos
            izquierda = 2 * pos + 1
            derecha = 2 * pos + 2

            if izquierda < n and heap[izquierda] < heap[menor]:
                menor = izquierda

            if derecha < n and heap[derecha] < heap[menor]:
                menor = derecha

            if menor == pos:
                break

            heap[pos], heap[menor] = heap[menor], heap[pos]
            pos = menor

    def agregar(self, heap, valor):
        heap.append(valor)
        self.subir(heap, len(heap) - 1)

    def reemplazar_raiz(self, heap, valor):
        heap[0] = valor
        self.bajar(heap, 0)

    def findKthLargest(self, nums, k):
        heap = []

        for num in nums:

            if len(heap) < k:
                self.agregar(heap, num)

            elif num > heap[0]:
                self.reemplazar_raiz(heap, num)

        return heap[0]
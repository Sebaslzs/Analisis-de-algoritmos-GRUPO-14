# 134. Gas Station
# Familia: greedy
# Criterio: si el tanque acumulado baja, descartar el tramo desde el inicio anterior
#            y probar una nueva salida. El recorrido circular exige verificar el total.
# Tiempo O(n), espacio O(1).

class Solution:
    def canCompleteCircuit(self, gas: List[int], cost: List[int]) -> int:
        tanque = 0
        tanque_total = 0
        inicio = 0

        for i in range(len(gas)):
            diferencia = gas[i] - cost[i]
            tanque += diferencia
            tanque_total += diferencia

            if tanque < 0:
                inicio = i + 1
                tanque = 0

        if tanque_total < 0:
            return -1

        return inicio

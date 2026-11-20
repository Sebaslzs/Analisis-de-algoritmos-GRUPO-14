# 300. Longest Increasing Subsequence
# Familia: programación dinámica
# Estado: dp[i] = longitud de la subsecuencia creciente más larga que termina en nums[i].
# Tiempo O(n^2), espacio O(n).

class Solution:
    def lengthOfLIS(self, nums: List[int]) -> int:
        if not nums:
            return 0

        dp = [1] * len(nums)

        for i in range(1, len(nums)):
            for j in range(i):
                if nums[j] < nums[i]:
                    dp[i] = max(dp[i], dp[j] + 1)

        return max(dp)

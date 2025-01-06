// Summary the problem:
// Write a function to calculate the sum of numbers from 1 to n
// Input: 0 < n < 2^53 - 1
// Output: The sum of numbers from 1 to n

/**
 * This is a formula for calculating the sum of numbers from 1 to n
 ** Time complexity: directly use formula --> constant time --> O(1)
 ** Space complexity: no extra space used --> constant space --> O(1)
 ** Pros: Extremely fast and efficient ( O(1) time complexity ) and minimal space complexity ( O(1) space complexity )
 ** Cons: Need to know the formula to apply it
 *
 * @param number The number to calculate the sum of numbers from 1 to n
 * @returns The sum of numbers from 1 to n
 *
 */
function sum_to_n_a(number: number): number {
  return (number * (number + 1)) / 2;
}

/**
 * This is divide and conquer algorithm for calculating the sum of numbers from 1 to n
 ** Time complexity: for each loop, the calculated range is divided by 2 --> O(log(n))
 ** Space complexity: because of the divided to n / 2 range, recursion is called by O(log(n))
 ** Pros: This is an better approach to calculate instead of using the loop
 ** Cons:
 ** - Need to know concept of divide and conquer
 ** - Because of the recursion, it can cause stack overflow if the number is too large
 *
 * @param number The number to calculate the sum of numbers from 1 to n
 * @returns The sum of numbers from 1 to n
 *
 */
function sum_to_n_b(number: number): number {
  function calculateRangeSum(start: number, end: number): number {
    if (start === end) {
      return start;
    }
    const mid = Math.floor((start + end) / 2);
    return calculateRangeSum(start, mid) + calculateRangeSum(mid + 1, end);
  }
  return calculateRangeSum(0, number);
}

/**
 * This is a recursive function for calculating the sum of numbers from 1 to n
 ** Time complexity: loop run n times --> execute n times -->  O(n)
 ** Space complexity: no extra space is used except variables -->  O(1)
 ** Pros: Easy to understand and implement
 ** Cons: This is not the most efficient way
 ** - Stack overflow can occur if the number is too large
 *
 * @param number The number to calculate the sum of numbers from 1 to n
 * @returns The sum of numbers from 1 to n
 *
 */
function sum_to_n_c(number: number): number {
  let sum = 0;
  for (let num = 1; num <= number; num++) {
    sum += num;
  }
  return sum;
}

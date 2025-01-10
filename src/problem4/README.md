# Sum of Numbers from 1 to N (TypeScript)

This project provides different methods to calculate the sum of numbers from 1 to `n`. You can calculate the sum using a direct formula, divide-and-conquer approach, or a simple loop.

## Available Methods

1. **`sum_to_n_a`** - Uses a direct mathematical formula to calculate the sum.
2. **`sum_to_n_b`** - Implements a divide-and-conquer algorithm using recursion.
3. **`sum_to_n_c`** - Uses a simple iterative approach to calculate the sum.

## Time Complexity and Space Complexity

- **`sum_to_n_a`**:

  - Time complexity: `O(1)` (constant time, due to direct formula).
  - Space complexity: `O(1)` (constant space, no extra space used).
  - Pros: Extremely fast and efficient.
  - Cons: Requires knowledge of the formula.

- **`sum_to_n_b`**:

  - Time complexity: `O(log(n))` (due to divide-and-conquer approach).
  - Space complexity: `O(log(n))` (due to recursion stack).
  - Pros: Efficient for large numbers (up to `10^9`).
  - Cons: Recursion can cause stack overflow for very large numbers.

- **`sum_to_n_c`**:
  - Time complexity: `O(n)` (loop runs `n` times).
  - Space complexity: `O(1)` (no extra space).
  - Pros: Simple and easy to understand.
  - Cons: Not the most efficient approach for large `n` (up to `10^6`).

## How to Run

1. Clone this repository or copy the TypeScript file(s) to your local machine.

2. Make sure you have **Node.js** and **TypeScript** installed. You can check this by running the following commands:
   ```bash
   node -v
   tsc -v
   ```
3. If TypeScript is not installed, you can install it globally using npm:

   ```
   npm install -g typescript
   ```

4. To compile and run the TypeScript file:
   - Compile the TypeScript file:
     ```
     tsc solution.ts
     ```
   - This will generate a solution.js file. Run the JavaScript file:
     ```
     node solution.js
     ```

## Example Usage

```
console.log(sum_to_n_a(10)); // Output: 55
console.log(sum_to_n_b(10)); // Output: 55
console.log(sum_to_n_c(10)); // Output: 55
```

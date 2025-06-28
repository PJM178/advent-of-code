// URL: https://adventofcode.com/2015/day/16
import fs from "fs";

const input = fs.readFileSync("./input.txt", "utf-8").trim();
const lines = input.split("\n");

// Part 1
// Using recursion
function uniqueCombinations(data: string[], liters: number) {
  const result: number[][] = [];
  const nums = data.map(Number);

  function backtrack(start: number, current: number[], total: number) {
    if (total === liters) {
      result.push([...current]);

      return;
    }

    for (let i = start; i < nums.length; i++) {
      if (total + nums[i] > liters) continue;

      current.push(i);

      backtrack(i + 1, current, total + nums[i]);

      current.pop();
    }
  }

  backtrack(0, [], 0);

  return result.length;
}

const combinations = uniqueCombinations(lines, 150);

console.log("Number of combinations: " + combinations);

// Alternative DFS-style
function uniqueCombinationsDFS(data: string[], liters: number): number[][] {
  const result: number[][] = [];
  const nums = data.map(Number);
  const stack: { combo: number[]; sum: number; start: number }[] = [];

  stack.push({ combo: [], sum: 0, start: 0 });

  while (stack.length > 0) {
    const { combo, sum, start } = stack.pop()!;

    if (sum === liters) {
      result.push(combo);

      continue;
    }

    for (let i = start; i < nums.length; i++) {
      const newSum = sum + nums[i];

      if (newSum <= liters) {
        stack.push({
          combo: [...combo, i],
          sum: newSum,
          start: i + 1,
        });
      }
    }
  }

  return result;
}

// Part 2
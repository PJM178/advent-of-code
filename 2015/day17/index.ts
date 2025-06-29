// URL: https://adventofcode.com/2015/day/16
import fs from "fs";

const input = fs.readFileSync("./input.txt", "utf-8").trim();
const lines = input.split("\n");

// Part 1
// Using recursion
function uniqueCombinations(data: string[], liters: number, constraint?: number): number[][] {
  const result: number[][] = [];
  const nums = data.map(Number);

  function backtrack(start: number, current: number[], total: number) {
    if (total === liters) {
      if (constraint) {
        if (current.length === constraint) {
          result.push([...current]);
        }
      } else {
        result.push([...current]);
      }

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

  return result;
}

const combinations = uniqueCombinations(lines, 150);

console.log("Number of combinations: " + combinations.length);

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
const part2Input = uniqueCombinations(lines, 150);

function minimumNumber(containers: number[][]): number {
  let num = Infinity;

  for (const container of containers) {
    if (container.length < num) {
      num = container.length;
    }
  }

  return num;
}

const part2Result = uniqueCombinations(lines, 150, minimumNumber(part2Input));

console.log("Number of times you can fill minimum number of containers you need to have 150 liter capacity: " + part2Result.length);

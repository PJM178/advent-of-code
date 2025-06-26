// URL: https://adventofcode.com/2015/day/15
import fs from "fs";

const input = fs.readFileSync("./input.txt", "utf-8").trim();
const lines = input.split("\n");

// Part 1
interface Properties {
  capacity: number;
  durability: number;
  flavor: number;
  texture: number;
  calories: number;
}

type Ingredients = Record<string, Properties>;

function formatData(lines: string[]): Ingredients {
  const obj: Ingredients = {};

  for (const line of lines) {
    const ingredient = line.split(":");
    const properties = ingredient[1].split(",");

    const propObj: Properties = {
      capacity: 0,
      durability: 0,
      flavor: 0,
      texture: 0,
      calories: 0,
    };

    for (const prop of properties) {
      const split = prop.trim().split(" ");

      propObj[split[0] as keyof Properties] = Number(split[1]);
    }

    obj[ingredient[0]] = propObj;
  }

  return obj;
}

const data = formatData(lines);

function findMaxScore(ingredients: Ingredients, totalAmount: number): { maxScore: number, allocation: Record<string, number> } {
  const names = Object.keys(ingredients);
  const n = names.length;
  let maxScore = 0;
  let bestAllocation: number[] = [];

  // Simulate nested loops with indices
  const indices = Array(n - 1).fill(0);

  while (true) {
    // Sum of indices
    const sum = indices.reduce((a, b) => a + b, 0);

    if (sum <= totalAmount) {
      // Last allocation index can be gotten from the sum of indices minus the total ingredient amount
      // Note that the total will be the max amount each time - first iteration is [0, 0, 0, 100]
      const allocation = [...indices, totalAmount - sum];
      const totals: Properties = {
        capacity: 0, durability: 0, flavor: 0, texture: 0, calories: 0,
      };

      for (let i = 0; i < n; i++) {
        const prop = ingredients[names[i]];
        const amount = allocation[i];
        totals.capacity += prop.capacity * amount;
        totals.durability += prop.durability * amount;
        totals.flavor += prop.flavor * amount;
        totals.texture += prop.texture * amount;
        totals.calories += prop.calories * amount;
      }

      if (
        totals.capacity > 0 &&
        totals.durability > 0 &&
        totals.flavor > 0 &&
        totals.texture > 0
      ) {
        const score =
          totals.capacity *
          totals.durability *
          totals.flavor *
          totals.texture;

        if (score > maxScore) {
          maxScore = score;
          bestAllocation = [...allocation];
        }
      }
    }

    // Move to next combination
    let i = indices.length - 1;

    while (i >= 0) {
      indices[i]++;
      const partialSum = indices.slice(0, i + 1).reduce((a, b) => a + b, 0);
 
      if (partialSum <= totalAmount) {
        for (let j = i + 1; j < indices.length; j++) {
          indices[j] = 0;
        }

        break;
      }

      i--;
    }

    if (i < 0) break;
  }

  const result: Record<string, number> = {};
  names.forEach((name, i) => {
    result[name] = bestAllocation[i];
  });

  return { maxScore, allocation: result };
}

const score = findMaxScore(data, 100);

console.log("Total score of the highest scoring cookie: " + score.maxScore + " - " + Array.from(Object.entries(score.allocation).map((e) => e.join(", "))).join("; "));

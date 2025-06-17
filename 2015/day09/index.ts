// URL: https://adventofcode.com/2015/day/9
import fs from "fs";

const input = fs.readFileSync("./input.txt", "utf-8").trim();
const lines = input.split("\n");
const testData = lines.slice(lines.length - 3, lines.length);

// Part 1
function getPermutations(arr: string[]) {
  const result: string[][] = [];

  function permute(current: string[], remaining: string[]) {
    if (remaining.length === 0) {
      result.push(current);

      return;
    }

    for (let i = 0; i < remaining.length; i++) {
      const next = remaining.slice(0, i).concat(remaining.slice(i + 1));

      permute(current.concat(remaining[i]), next);
    }
  }

  permute([], arr);

  return result;
}

function uniqueValuesToArray(arr: string[]): string[] {
  const result: string[] = [];

  for (const el of arr) {
    const split = el.split(" ");
    const arr = [split[0], split[2]];

    for (const el of arr) {
      if (!result.includes(el)) {
        result.push(el);
      }
    }
  }

  return result;
}

function calculatePairDistances(arr: string[]): Map<string, number> {
  const result = new Map<string, number>();

  for (const el of arr) {
    const split = el.split(" ");
    const arr = [split[0], split[2]].join(",");
    const arrReversed = [split[2], split[0]].join(",");
    const value = split[4];

    result.set(arr, Number(value));
    result.set(arrReversed, Number(value));
  }

  return result;
}

function solveTSP(arr: string[], shortest: boolean): { route: string[], distance: number } {
  const permutations = getPermutations(uniqueValuesToArray(arr));
  const pairDistances = calculatePairDistances(arr);
  let distance = shortest ? Infinity : 0;
  let route = arr;

  for (const arr of permutations) {
    let currentDistance = 0;

    for (let i = 0; i < arr.length; i++) {
      const pairDistance = pairDistances.get([arr[i], arr[i + 1]].join(","));
      currentDistance += pairDistance ?? 0;
    }

    if (shortest ? currentDistance < distance : currentDistance > distance) {
      distance = currentDistance;
      route = arr;
    }
  }

  return { route: route, distance: distance };
}

const result = solveTSP(lines, true);

console.log(`The route ${result.route.join(" -> ")} is the shortest route with the distance of ${result.distance}`);

// Part 2

const resultLongest = solveTSP(lines, false);

console.log(`The route ${resultLongest.route.join(" -> ")} is the longest route with the distance of ${resultLongest.distance}`);
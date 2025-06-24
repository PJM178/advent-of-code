// URL: https://adventofcode.com/2015/day/13
import fs from "fs";

const input = fs.readFileSync("./input.txt", "utf-8").trim();
const lines = input.split("\n");

function formatData(data: string[]): Record<string, Record<string, number>> {
  let previousName = data[0].split(" ")[0];
  const object: Record<string, Record<string, number>> = {};
  object[previousName] = {};

  for (let i = 0; i < data.length; i++) {
    const splittedLine = data[i].split(" ");

    if (previousName === splittedLine[0]) {
      const newObject: Record<string, number> = {};

      if (splittedLine[2] === "lose") {
        newObject[splittedLine[splittedLine.length - 1].split(".")[0]] = Number(-splittedLine[3]);
      } else {
        newObject[splittedLine[splittedLine.length - 1].split(".")[0]] = Number(splittedLine[3]);
      }

      object[previousName] = { ...object[previousName], ...newObject };
    } else {
      const key = splittedLine[0];
      const newObject: Record<string, number> = {};

      if (splittedLine[2] === "lose") {
        newObject[splittedLine[splittedLine.length - 1].split(".")[0]] = Number(-splittedLine[3]);
      } else {
        newObject[splittedLine[splittedLine.length - 1].split(".")[0]] = Number(splittedLine[3]);
      }

      object[key] = { ...newObject };
    }

    previousName = splittedLine[0];
  }

  return object;
}

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

function seatingHappiness(data: Record<string, Record<string, number>>): number {
  let currentHighestHappiness = Number.NEGATIVE_INFINITY;
  const keys = Object.keys(data);
  const permutations = getPermutations(keys);

  for (const arr of permutations) {
    let happiness = 0;

    for (let i = 0; i < arr.length; i++) {
      let sum = 0;

      if (i === arr.length - 1) {
        sum += data[arr[i]][arr[0]];
        sum += data[arr[0]][arr[arr.length - 1]];
        happiness += sum;

        continue;
      }

      sum += data[arr[i]][arr[i + 1]];
      sum += data[arr[i + 1]][arr[i]];
      happiness += sum;
    }

    if (happiness > currentHighestHappiness) {
      currentHighestHappiness = happiness;
    }
  }

  return currentHighestHappiness;
}

const data = formatData(lines);

const totalHappiness = seatingHappiness(data);

console.log("Maximum seating order happiness: " + totalHappiness);

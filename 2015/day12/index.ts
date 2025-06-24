// URL: https://adventofcode.com/2015/day/12
import fs from "fs";

const input = fs.readFileSync("./input.txt", "utf-8").trim();
const parsedData = JSON.parse(input);

// Part 1
function travelTree(data: JSON, unallowedStrings?: string[]): number {
  let sum = 0;

  Object.values(data).forEach((v) => {
    if (typeof v === "number") {
      sum += v;
    }

    if (typeof v === "object" && v !== null) {
      if (unallowedStrings) {
        if (Object.values(v).some((item) => unallowedStrings.includes(item as string)) && !Array.isArray(v)) {
          return;
        }
      }

      sum += travelTree(v, unallowedStrings);
    }
  })

  return sum;
}

const sum = travelTree(parsedData);

console.log("Sum of all numbers in the object: " + sum);

// Part 2
const illegalStrings = ["red"];

const sumPart2 = travelTree(parsedData, illegalStrings);

console.log(`Sum of all numbers in the object without sub-object containing ${illegalStrings.join(", ")}: ` + sumPart2);

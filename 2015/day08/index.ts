// URL: https://adventofcode.com/2015/day/8
import fs from "fs";

const input = fs.readFileSync("./input.txt", "utf-8").trim();
const lines = input.split("\n");

// Part 1
function characterNumber(lines: string[], doubleEscape?: boolean): number {
  let count = 0;

  for (const string of lines) {
    const rawString = String.raw`${string}`;
    const rawStringLength = rawString.length;
    const interpretedString = eval(rawString);
    const interpretedStringLength = interpretedString.length;
    if (doubleEscape) {
      const replaced1 = rawString.replace(/\\/g, '\\\\');
      const replaced3 = replaced1.replace(/"/g, '\\"');
      const replaced4 = `"${replaced3}"`;

      count += replaced4.length - rawStringLength;
    } else {
      count += rawStringLength - interpretedStringLength;
    }
  }

  return count;
}

const numberOfCharacters = characterNumber(lines);

console.log("Total number of specific characters in the file: " + numberOfCharacters);

// Part 2
const numberOfCharactersPart2 = characterNumber(lines, true);

console.log("Total number of specific characters in the file part 2: " + numberOfCharactersPart2);

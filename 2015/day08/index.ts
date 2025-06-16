// URL: https://adventofcode.com/2015/day/8
import fs from "fs";

const input = fs.readFileSync("./input.txt", "utf-8").trim();
const lines = input.split("\n");

// Part 1
function characterNumber(lines: string[]): number {
  let count = 0;

  for (const string of lines) {
    const rawString = String.raw`${string}`;
    const rawStringLength = rawString.length;
    const interpretedString = eval(rawString);
    const interpretedStringLength = interpretedString.length;
  
    count += rawStringLength - interpretedStringLength;
  }

  return count;
}

const numberOfCharacters = characterNumber(lines);

console.log("Total number of specific characters in the file: " + numberOfCharacters);

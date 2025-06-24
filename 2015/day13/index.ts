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
      object[key] = {};
    }

    previousName = splittedLine[0];
  }

  return object;
}

const data = formatData(lines);

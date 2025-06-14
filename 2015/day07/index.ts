// URL: https://adventofcode.com/2015/day/6
import fs from "fs";

const input = fs.readFileSync("./input.txt", "utf-8").trim();
const lines = input.split("\n");

// Part 1
const wires = new Map();

const operators = ["AND", "LSHIFT", "RSHIFT", "NOT", "OR"];

function initializeWires(lines: string[]) {
  const wires = new Map();

  for (let i = 0; i < lines.length; i++) {
    const splittedLine = lines[i].split(" ");

    splittedLine.forEach((e) => {
      if (isNaN(Number(e)) && !operators.includes(e) && e !== "->") {
        wires.set(e, null);
      }
    });
  }

  return wires;
}

function signalToWire(lines: string[], wire: string) {
  const wires = initializeWires(lines);

  if (!wires.has(wire)) {
    console.log(`Wire ${wire} not found in data.`);

    return;
  }

  while (!wires.get(wire)) {
    for (let i = 0; i < lines.length; i++) {
      const splittedLine = lines[i].split(" ");

      if (splittedLine.length === 3) {
        if (!isNaN(Number(splittedLine[0])) && !wires.get(splittedLine[2])) {
          wires.set(splittedLine[2], splittedLine[0]);
        } else if (wires.get(splittedLine[0]) && !wires.get(splittedLine[2])) {
          wires.set(splittedLine[2], wires.get(splittedLine[0]));
        }
      }
    }

    break;
  }

  console.log(`Signal provided to wire ${wire}: ` + wires.get(wire));
}

signalToWire(lines, "a");

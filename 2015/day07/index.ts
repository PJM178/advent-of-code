// URL: https://adventofcode.com/2015/day/7
import fs from "fs";

const input = fs.readFileSync("./input.txt", "utf-8").trim();
const lines = input.split("\n");

// Part 1
const wires = new Map();

const operators = ["AND", "LSHIFT", "RSHIFT", "NOT", "OR"];

const operatorsObject = {
  "NOT": (x: number) => (x != null ? ~x : null),
  "AND": (x: number, y: number) => (x != null && y != null ? x & y : null),
  "OR": (x: number, y: number) => (x != null && y != null ? x | y : null),
  "LSHIFT": (x: number, y: number) => (x != null && y != null ? x << y : null),
  "RSHIFT": (x: number, y: number) => (x != null && y != null ? x >> y : null),
};

function initializeWires(lines: string[], overrideValue?: { key: string, value: number }[]) {
  const wires = new Map();

  for (let i = 0; i < lines.length; i++) {
    const splittedLine = lines[i].split(" ");

    splittedLine.forEach((e) => {
      if (isNaN(Number(e)) && !operators.includes(e) && e !== "->") {
        wires.set(e, null);
      }
    });
  }

  if (overrideValue) {
    overrideValue.forEach(({ key, value }) => {
      wires.set(key, value);
    })
  }

  return wires;
}

function signalToWire(lines: string[], wire: string, overrideValue?: { key: string, value: number }[]) {
  const wires = initializeWires(lines, overrideValue);

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
      } else if (splittedLine.length === 4) {
        const wire = wires.get(splittedLine[1]);

        if (wire && !wires.get(splittedLine[3])) {
          wires.set(splittedLine[3], ~wire);
        }
      } else {
        const wire1 = Number(splittedLine[0]) ? Number(splittedLine[0]) : wires.get(splittedLine[0]);
        const wire2 = Number(splittedLine[2]) ? Number(splittedLine[2]) : wires.get(splittedLine[2]);
        const productLine = wires.get(splittedLine[4]);

        if (wire1 !== null && wire2 !== null && !productLine) {
          wires.set(splittedLine[4], operatorsObject[splittedLine[1] as keyof typeof operatorsObject] ? operatorsObject[splittedLine[1] as keyof typeof operatorsObject](wire1, wire2) : null);
        }
      }
    }
  }

  console.log(`Signal provided to wire ${wire}: ` + wires.get(wire));

  return wires.get(wire);
}

signalToWire(lines, "a");

// Part 2

const signalToWireA = signalToWire(lines, "a");

signalToWire(lines, "a", [{ key: "b", value: signalToWireA }]);

// URL: https://adventofcode.com/2015/day/19
import fs from "fs";

const input = fs.readFileSync("./input.txt", "utf-8").trim();
const lines = input.split("\n");

// Part 1
interface Data {
  replacements: { from: string, to: string }[];
  start: string;
}

function formatData(rawData: string[]): Data {
  const data = {
    replacements: [...rawData.slice(0, rawData.length - 2).map((d) => ({ from: d.split(" ")[0], to: d.split(" ")[2] }))],
    start: rawData[rawData.length - 1],
  };

  return data;
}

const formattedData = formatData(lines);

function replaceMolecules(data: Data) {
  const molecules: string[] = [];

  for (const el of data.replacements) {
    const startMolecule = [...data.start.split(/(?=[A-Z])/)];

    for (let i = 0; i < startMolecule.length; i++) {
      if (startMolecule[i] === el.from) {
        const molecule = [...startMolecule]
        molecule[i] = el.to;

        if (!molecules.includes(molecule.join(""))) {
          molecules.push(molecule.join(""));
        }
      }
    }
  }

  return molecules;
}

const result = replaceMolecules(formattedData);

console.log("Distinct molecules: " + result.length);

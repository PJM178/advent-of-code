// URL: https://adventofcode.com/2015/day/19
import fs from "fs";

const input = fs.readFileSync("./input.txt", "utf-8").trim();
const lines = input.split("\n");

// Part 1
interface Data {
  replacements: { from: string, to: string[] }[];
  start: string;
}

function formatData(rawData: string[]): Data {
  const data = {
    replacements: [...rawData.slice(0, rawData.length - 2).map((d) => ({ from: d.split(" ")[0], to: d.split(" ")[2].split(/(?=[A-Z])/) }))],
    start: rawData[rawData.length - 1],
  };

  return data;
}

const formattedData = formatData(lines);

function replaceMolecules(data: Data) {
  const molecules: string[][] = [];

  for (const el of data.replacements) {
    const startMolecule = [...data.start.split(/(?=[A-Z])/)];

    for (let i = 0; i < startMolecule.length; i++) {
      if (startMolecule[i] === el.from) {
        const molecule = [...startMolecule];
        molecule[i] = el.to.join("");

        if (!molecules.map((m) => m.join("")).includes(molecule.join(""))) {
          molecules.push(molecule);
        }
      }
    }
  }
  console.log(molecules);
  return molecules;
}

const result = replaceMolecules(formattedData);

console.log("Distinct molecules: " + result.length);

// Part 2 - some sort of reverse search here I think to work backwards towards "e" for each molecule combinations fo each "e"
function makeMolecule(data: Data, times: number = 4) {
  const inputs = data.replacements.filter((e) => e.from === "e");
  const testedCombinations = new Set<string>();
  const timesRan = 0;
  console.log(inputs);
  while (true) {

    if (timesRan === times) {
      break;
    }
  }
}

console.log(makeMolecule(formattedData));

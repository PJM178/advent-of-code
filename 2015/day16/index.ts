// URL: https://adventofcode.com/2015/day/16
import fs from "fs";

const input = fs.readFileSync("./input.txt", "utf-8").trim();
const lines = input.split("\n");

// Part 1
interface Aunt {
  name: string,
  properties: Partial<typeof correctAuntProperties>;
}

const correctAuntProperties = {
  children: 3,
  cats: 7,
  samoyeds: 2,
  pomeranians: 3,
  akitas: 0,
  vizslas: 0,
  goldfish: 5,
  trees: 3,
  cars: 2,
  perfumes: 1,
};

function formatData(lines: string[]): Aunt[] {
  const auntArray: Aunt[] = [];

  for (const aunt of lines) {
    const splitAunt = aunt.split(",");
    const auntName = splitAunt[0].split(":")[0];
    const auntObject: Aunt = {
      name: auntName,
      properties: {},
    }

    splitAunt.forEach((s, i) => {
      const string = s.trim();

      if (i === 0) {
        const splitString = string.split(":");
        auntObject.name = splitString[0];
        auntObject.properties[splitString[1].trim() as keyof typeof correctAuntProperties] = Number(splitString[2]);
      } else {
        const splitString = string.split(":");
        auntObject.properties[splitString[0].trim() as keyof typeof correctAuntProperties] = Number(splitString[1]);
      }
    });

    auntArray.push(auntObject);
  }

  return auntArray;
}

const dataPart1 = formatData(lines);

function findAunt(data: Aunt[], correctAuntProps: typeof correctAuntProperties): Aunt {
  const auntKeys = Object.entries(correctAuntProps);
  let correctAunt: Aunt = {
    name: "",
    properties: {

    }
  };

  for (let i = 0; i < data.length; i++) {
    let isTrue = [];

    for (const aunt of auntKeys) {
      if ((data[i].properties as any)[aunt[0]] === aunt[1] || (data[i].properties as any)[aunt[0]] === undefined) {
        isTrue.push(true);
      }
    }

    if (isTrue.length === auntKeys.length) {
      correctAunt = data[i];
    }
  }

  return correctAunt;
}

const theAunt = findAunt(dataPart1, correctAuntProperties);

console.log("The aunt that gave the gift: " + theAunt.name);

// Part 2
function findAuntPart2(data: Aunt[], correctAuntProps: typeof correctAuntProperties): Aunt {
  const auntKeys = Object.entries(correctAuntProps);
  let correctAunt: Aunt = {
    name: "",
    properties: {

    }
  };

  for (let i = 0; i < data.length; i++) {
    let isTrue = [];

    for (const aunt of auntKeys) {
      if (aunt[0] === "cats" || aunt[0] === "trees" || aunt[0] === "pomeranians" || aunt[0] === "goldfish") {
        if (aunt[0] === "cats" || aunt[0] === "trees") {
          if ((data[i].properties as any)[aunt[0]] > aunt[1] || (data[i].properties as any)[aunt[0]] === undefined) {
            isTrue.push(true);
          }
        } else {
          if ((data[i].properties as any)[aunt[0]] < aunt[1] || (data[i].properties as any)[aunt[0]] === undefined) {
            isTrue.push(true);
          }
        }
      } else if ((data[i].properties as any)[aunt[0]] === aunt[1] || (data[i].properties as any)[aunt[0]] === undefined) {
        isTrue.push(true);
      }
    }

    if (isTrue.length === auntKeys.length) {
      correctAunt = data[i];
    }
  }

  return correctAunt;
}

const theActualAunt = findAuntPart2(dataPart1, correctAuntProperties);

console.log("The actual aunt that gave the gift: " + theActualAunt.name);

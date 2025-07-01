// URL: https://adventofcode.com/2015/day/18
import fs from "fs";

const input = fs.readFileSync("./input.txt", "utf-8").trim();
const lines = input.split("\n");

// Part 1
function getNeighbour(data: string[], iOperation: number, jOperation: number): string {
  if (iOperation < 0 || jOperation < 0 || iOperation > data.length - 1 || jOperation > data.length - 1) {
    return ".";
  }

  return data[iOperation][jOperation];
}

function handleLights(data: string[], timesToRepeat: number, cornersOn: boolean): string[] {
  let finalResult = data;

  for (let r = 0; r < timesToRepeat; r++) {
    let result = finalResult;
    let intermediateryResult = [];

    for (let i = 0; i < result.length; i++) {
      let currentStringData = result[i].split("");

      for (let j = 0; j < result[i].length; j++) {
        if (cornersOn) {
          const isCorner = (i === 0 && j === 0) || (i === result.length - 1 && j === result[i].length - 1) ||
            (i === 0 && j === result[i].length - 1) || (i === result.length - 1 && j === 0);

          if (isCorner) {
            currentStringData[j] = "#";
            
            continue;
          }
        }

        const lightState = result[i][j];

        // Neighbours clockwise starting from top left
        const neighbours = [
          getNeighbour(result, i - 1, j - 1), getNeighbour(result, i - 1, j), getNeighbour(result, i - 1, j + 1),
          getNeighbour(result, i, j + 1), getNeighbour(result, i + 1, j + 1), getNeighbour(result, i + 1, j),
          getNeighbour(result, i + 1, j - 1), getNeighbour(result, i, j - 1),
        ];

        const filteredNeighbours = neighbours.filter((n) => n === "#");

        // Handle state
        if (lightState === "#") {
          if (filteredNeighbours.length === 2 || filteredNeighbours.length === 3) {
            // On here
            currentStringData[j] = lightState;
          } else {
            // Off here
            currentStringData[j] = ".";
          }
        } else {
          if (filteredNeighbours.length === 3) {
            // On here
            currentStringData[j] = "#";
          }
        }
      }

      intermediateryResult.push(currentStringData.join(""));
    }

    finalResult = intermediateryResult;
  }

  return finalResult;
}

function calculateLights(data: string[], toCalculate: string): number {
  let num = 0;

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      if (data[i][j] === toCalculate) {
        num++;
      }
    }
  }

  return num;
}

const result = handleLights(lines, 100, false);

console.log("Lights on after repeating the process 100 times: " + calculateLights(result, "#"));

// Part 2
function formatLights(data: string[]): string[] {
  for (let i = 0; i < data.length; i++) {
    let currentStringData = data[i].split("");

    for (let j = 0; j < data[i].length; j++) {
      const isCorner = (i === 0 && j === 0) || (i === data.length - 1 && j === data[i].length - 1) ||
        (i === 0 && j === data[i].length - 1) || (i === data.length - 1 && j === 0);

      if (isCorner) {
        currentStringData[j] = "#";

        data[i] = currentStringData.join("");
      }
    }
  }

  return data;
}

const resultPart2 = handleLights(formatLights(lines), 100, true);

console.log("Lights on after repeating the process 100 times with corners always being on: " + calculateLights(resultPart2, "#"));

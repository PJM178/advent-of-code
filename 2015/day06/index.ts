// URL: https://adventofcode.com/2015/day/6
import fs from "fs";

const input = fs.readFileSync("./input.txt", "utf-8").trim();
const lines = input.split("\n");

// Part 1
const rows = 1000;
const cols = 1000;

function initializeGrid(rows: number, cols: number) {
  const grid = [];

  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      row.push(0);
    }
    grid.push(row);
  }

  return grid;
};

function matrixOperation(grid: number[][], coords: { start: number[], end: number[] }, operation: "on" | "off" | "toggle", part: "1" | "2") {
  for (let i = coords.start[0]; i <= coords.end[0]; i++) {
    for (let j = coords.start[1]; j <= coords.end[1]; j++) {
      if (operation === "on") {
        if (part === "1") {
          grid[i][j] = 1;
        } else {
          grid[i][j] += 1;
        }
      } else if (operation === "off") {
        if (part === "1") {
          grid[i][j] = 0;
        } else {
          grid[i][j] = grid[i][j] > 0 ? grid[i][j] - 1 : 0;
        }
      } else {
        if (part === "1") {
          grid[i][j] = !grid[i][j] ? 1 : 0;
        } else {
          grid[i][j] += 2;
        }
      }
    }
  }

  return grid;
};

function handleGridLights(lines: string[], grid: number[][], part: "1" | "2") {
  for (const line of lines) {
    const splittedLine = line.split(" ");

    if (splittedLine[0] === "toggle") {
      const coords = {
        start: splittedLine[1].split(",").map(Number),
        end: splittedLine[3].split(",").map(Number),
      };

      grid = matrixOperation(grid, coords, "toggle", part);
    } else if (splittedLine[1] === "on") {
      const coords = {
        start: splittedLine[2].split(",").map(Number),
        end: splittedLine[4].split(",").map(Number),
      };

      grid = matrixOperation(grid, coords, "on", part);
    } else {
      const coords = {
        start: splittedLine[2].split(",").map(Number),
        end: splittedLine[4].split(",").map(Number),
      };

      grid = matrixOperation(grid, coords, "off", part);
    }
  }

  return grid;
};

function calculateLightsOn(grid: number[][], part: "1" | "2") {
  let lightsOn = 0;

  if (part === "1") {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (grid[i][j]) {
          lightsOn++;
        }
      }
    }
  } else {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        lightsOn += grid[i][j];
      }
    }
  }

  console.log("Number of lights on: " + lightsOn);
}

const grid = handleGridLights(lines, initializeGrid(rows, cols), "1");

calculateLightsOn(grid, "1");

// Part 2

const grid2 = handleGridLights(lines, initializeGrid(rows, cols), "2");

calculateLightsOn(grid2, "2");

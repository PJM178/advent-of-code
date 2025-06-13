// URL: https://adventofcode.com/2015/day/6
import fs from "fs";

const input = fs.readFileSync("./input.txt", "utf-8").trim();
const lines = input.split("\n");

const rows = 1000;
const cols = 1000;

function initializeGrid(rows: number, cols: number) {
  const grid = [];

  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      row.push(false);
    }
    grid.push(row);
  }

  return grid;
};

function matrixOperation(grid: boolean[][], coords: { start: number[], end: number[] }, operation: "on" | "off" | "toggle") {
  for (let i = coords.start[0]; i <= coords.end[0]; i++) {
    for (let j = coords.start[1]; j <= coords.end[1]; j++) {
      if (operation === "on") {
        grid[i][j] = true;
      } else if (operation === "off") {
        grid[i][j] = false;
      } else {
        grid[i][j] = !grid[i][j];
      }
    }
  }

  return grid;
};

function handleGridLights(lines: string[], grid: boolean[][]) {
  for (const line of lines) {
    const splittedLine = line.split(" ");

    if (splittedLine[0] === "toggle") {
      const coords = {
        start: splittedLine[1].split(",").map(Number),
        end: splittedLine[3].split(",").map(Number),
      };

      grid = matrixOperation(grid, coords, "toggle");
    } else if (splittedLine[1] === "on") {
      const coords = {
        start: splittedLine[2].split(",").map(Number),
        end: splittedLine[4].split(",").map(Number),
      };

      grid = matrixOperation(grid, coords, "on");
    } else {
      const coords = {
        start: splittedLine[2].split(",").map(Number),
        end: splittedLine[4].split(",").map(Number),
      };

      grid = matrixOperation(grid, coords, "off");
    }
  }

  return grid;
};

function calculateLightsOn(grid: boolean[][]) {
  let lightsOn = 0;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j]) {
        lightsOn++;
      }
    }
  }

  console.log("Number of lights on: " + lightsOn);
}

const grid = handleGridLights(lines, initializeGrid(rows, cols));

calculateLightsOn(grid);

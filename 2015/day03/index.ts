// URL: https://adventofcode.com/2015/day/3
import fs from "fs";

const input = fs.readFileSync("./input.txt", "utf-8").trim();

// Part 1
function calculateHousesServed() {
  const visitedCoordinates = new Set();
  let coordinates = [0, 0];
  visitedCoordinates.add(coordinates.join(","));

  const movement = {
    ">": [1, 0],
    "v": [0, -1],
    "<": [-1, 0],
    "^": [0, 1],
  };

  for (const move of input) {
    const coord = movement[move as keyof typeof movement];

    for (let i = 0; i < coordinates.length; i++) {
      coordinates[i] += coord[i];
    }

    visitedCoordinates.add(coordinates.join(","));
  }

  console.log("Unique houses visited: " + visitedCoordinates.size);
}

calculateHousesServed();

// Part 2
function calculateHousesServedHelper() {
  const visitedCoordinates = new Set();
  let santaCoordinates = [0, 0];
  let roboCoordinates = [0, 0];
  visitedCoordinates.add(santaCoordinates.join(","));

  const movement = {
    ">": [1, 0],
    "v": [0, -1],
    "<": [-1, 0],
    "^": [0, 1],
  };

  for (let i = 0; i < input.length; i++) {
    const coord = movement[input[i] as keyof typeof movement];

    if (i % 2 === 0) {
      for (let i = 0; i < santaCoordinates.length; i++) {
        santaCoordinates[i] += coord[i];
      }

      visitedCoordinates.add(santaCoordinates.join(","));
    } else {
      for (let i = 0; i < santaCoordinates.length; i++) {
        roboCoordinates[i] += coord[i];
      }

      visitedCoordinates.add(roboCoordinates.join(","));
    }
  }

  console.log("Unique houses visited by Santa and the helper: " + visitedCoordinates.size);
}

calculateHousesServedHelper();

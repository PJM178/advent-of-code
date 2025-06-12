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

  console.log("Unique houses visited: " +  visitedCoordinates.size);
}

calculateHousesServed();

// Part 2

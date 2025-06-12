// URL: https://adventofcode.com/2015/day/1
import fs from "fs";

const input = fs.readFileSync("./input.txt", "utf-8").trim();

// Part 1
function calculateFloor() {
  let floor = 0;
  const floorUp = "(";
  const floorDown = ")";

  for (let i = 0; i < input.length; i++) {
    if (input[i] === floorUp) {
      floor += 1;
    } else if (input[i] === floorDown) {
      floor -= 1;
    }
  }

  console.log("Floor: " + floor);
}

calculateFloor();

// Part 2
function basementPositionInInputData() {
  let floor = 0;
  const floorUp = "(";
  const floorDown = ")";
  let basementPosition = 0;

  for (let i = 0; i < input.length; i++) {
    if (input[i] === floorUp) {
      floor += 1;
    } else if (input[i] === floorDown) {
      floor -= 1;
    }

    if (floor < 0) {
      basementPosition = i + 1;

      break;
    }
  }

  console.log("Basement position: " + basementPosition);
}

basementPositionInInputData();

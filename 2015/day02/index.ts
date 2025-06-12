// URL: https://adventofcode.com/2015/day/2
import fs from "fs";

const input = fs.readFileSync("./input.txt", "utf-8").trim();
const lines = input.split("\n");

// Part 1
function calculateCuboidSurfaceArea(l: number, w: number, h: number) {
  const surfaceArea = 2 * ((l * w) + (l * h) + (w * h));
  const smallestSide = Math.min((l * w), (l * h), (w * h));

  return { area: surfaceArea, smallestSide: smallestSide };
}

function calculatePaperNeeded() {
  let paperAmount = 0;

  for (let i = 0; i < lines.length; i++) {
    const [l, w, h] = lines[i].split("x").map(Number);
    const { area, smallestSide } = calculateCuboidSurfaceArea(l, w, h);

    paperAmount += (area + smallestSide);
  }

  console.log("Paper needed: " + paperAmount + " square feet");
}

calculatePaperNeeded();

// Part 2
function findTwoSmallest(arr: number[]) {
  let min1 = Infinity;
  let min2 = Infinity;

  for (const num of arr) {
    if (num < min1) {
      min2 = min1;
      min1 = num;
    } else if (num < min2) {
      min2 = num;
    }
  }

  return [min1, min2];
}

function calculateRibbonNeeded() {
  let ribbonNeeded = 0;

  for (let i = 0; i < lines.length; i++) {
    const [l, w, h] = lines[i].split("x").map(Number);
    const [min1, min2] = findTwoSmallest([l, w, h])
    const present = 2 * min1 + 2 * min2;
    const ribbon = l * w * h;

    ribbonNeeded += (present + ribbon);
  }

  console.log("Ribbon needed: " + ribbonNeeded + " feet");
}

calculateRibbonNeeded();

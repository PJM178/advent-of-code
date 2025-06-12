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

// URL: https://adventofcode.com/2015/day/14
import fs from "fs";

const input = fs.readFileSync("./input.txt", "utf-8").trim();
const lines = input.split("\n");

// Part 1
interface DataObject {
  speed: number;
  duration: number;
  rest: number;
  traveled: number;
  isResting: boolean;
  cycle: number;
  points: number;
}

function formatData(data: string[]) {
  const dataObject: Record<string, DataObject> = {};

  for (let i = 0; i < data.length; i++) {
    const parameterObject: DataObject = {
      speed: 0,
      duration: 0,
      rest: 0,
      traveled: 0,
      isResting: false,
      cycle: 0,
      points: 0,
    };
    const splittedLine = data[i].split(" ");
    parameterObject["speed"] = Number(splittedLine[3]);
    parameterObject["duration"] = Number(splittedLine[6]);
    parameterObject["rest"] = Number(splittedLine[splittedLine.length - 2]);
    parameterObject["traveled"] = 0;

    dataObject[splittedLine[0]] = parameterObject;
  }

  return dataObject;
}

const data = formatData(lines);

function calculateDistanceTraveled(data: DataObject, flightDuration: number): number {
  const cycles = Math.floor(flightDuration / (data.duration + data.rest));
  const leftOverDuration = flightDuration - (data.duration + data.rest) * cycles;
  data.traveled = cycles * data.speed * data.duration;

  if (leftOverDuration > data.duration) {
    data.traveled += data.speed * data.duration;
  } else {
    data.traveled += data.speed * leftOverDuration;
  }

  return data.traveled;
}

function flyingDistance(data: Record<string, DataObject>, flightDuration: number): [string, DataObject] {
  // Calculate the traveled value
  Object.entries(data).forEach(([k, v]) => {
    data[k].traveled = calculateDistanceTraveled(v, flightDuration);
  });

  const entries = Object.entries(data);
  const [winner, object] = entries.reduce((maxEntry, currentEntry) => {
    return currentEntry[1].traveled > maxEntry[1].traveled ? currentEntry : maxEntry;
  });

  return [winner, object];
}

const winningDistance = flyingDistance(data, 2503);

console.log("The distance the winning reindeer has travelled: " + winningDistance[0] + ", " + winningDistance[1].traveled);

// Part 2
function allocatePoints(data: Record<string, DataObject>, flightDuration: number): [string, DataObject] {
  const keys = Object.keys(data);

  for (let i = 0; i < flightDuration; i++) {
    let maxValue = 0;

    for (const key of keys) {
      const obj = data[key];
      obj.cycle++;

      if (obj.cycle <= obj.duration) {
        obj.traveled += obj.speed;
      } else {
        if (obj.cycle === (obj.rest + obj.duration)) {
          obj.cycle = 0;
        }
      }

      if (obj.traveled > maxValue) {
        maxValue = obj.traveled;
      }
    }

    for (const key of keys) {
      const obj = data[key];

      if (obj.traveled === maxValue) {
        obj.points++;
      }
    }
  }

  const entries = Object.entries(data);
  const [winner, object] = entries.reduce((maxEntry, currentEntry) => {
    return currentEntry[1].points > maxEntry[1].points ? currentEntry : maxEntry;
  });

  return [winner, object];
}

const dataPart2 = formatData(lines);

const winningPoints = allocatePoints(dataPart2, 2503);

console.log("The points the winning reindeer has: " + winningPoints[0] + ", " + winningPoints[1].points);

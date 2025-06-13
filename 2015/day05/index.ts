// URL: https://adventofcode.com/2015/day/5
import fs from "fs";

const input = fs.readFileSync("./input.txt", "utf-8").trim();
const lines = input.split("\n");

// Part 1
function checkTwiceInRowCharacters(str: string): boolean {
  let previousC = "";

  for (const c of str) {
    if (previousC === c) {
      return true;
    }

    previousC = c;
  }

  return false;
}

function checkIfContainsVowels(str: string): boolean {
  let vowelNumber = 0;
  const vowels = "aeiou";

  for (const c of str) {
    if (vowels.includes(c)) {
      vowelNumber += 1;

      if (vowelNumber === 3) {
        return true;
      }
    }
  }

  return false;
}

function checkIfNotContainString(str: string): boolean {
  const bannedStrings = ["ab", "cd", "pq", "xy"];

  for (const string of bannedStrings) {
    if (str.includes(string)) {
      return false;
    }
  }

  return true;
}

function calculateNiceStrings(strings: string[]) {
  let niceStrings = 0;

  for (const string of strings) {
    if (checkIfNotContainString(string) && checkTwiceInRowCharacters(string) && checkIfContainsVowels(string)) {
      niceStrings += 1;
    }
  }

  console.log("Number of nice strings: " + niceStrings);
}

calculateNiceStrings(lines);

// Part 2
function checkIfCombinationAppearsTwice(str: string): boolean {
  let combination = "";

  for (let i = 0; i < str.length; i++) {
    if (i < (str.length - 1)) {
      combination = str[i] + str[i + 1];
      const splitStr = str.split(combination).join("");

      if (splitStr.length <= (str.length - 4)) {
        return true;
      }
    }
  }

  return false;
};

function checkRepeatStrings(str: string): boolean {
  let combination = "";

  for (let i = 0; i < str.length; i++) {
    if (i < (str.length - 2)) {
      combination = str[i] + str[i + 1] + str[i + 2];

      if (combination[0] === combination[2]) {
        return true;
      }
    } else {
      break;
    }
  }

  return false;
}

function calculateNiceStringsPart2(strings: string[]) {
  let niceStrings = 0;

  for (const string of strings) {
    if (checkIfCombinationAppearsTwice(string) && checkRepeatStrings(string)) {
      niceStrings += 1;
    }
  }

  console.log("Number of nice strings modified: " + niceStrings);
}

calculateNiceStringsPart2(lines);

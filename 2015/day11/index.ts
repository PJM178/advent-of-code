// URL: https://adventofcode.com/2015/day/11

// Part 1
const oldPassword = "hxbxwxba";
const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i));

function checkStraightLetters(input: string, count: number, alphabet: string[]): boolean {
  outer:
  for (let i = 0; i < input.length; i++) {
    if ((i + count) < input.length) {
      const inputIndex = alphabet.indexOf(input[i]);

      for (let j = 0; j < count; j++) {
        if (input[i + j] !== alphabet[inputIndex + j]) {
          continue outer;
        }
      }

      return true;
    } else {
      break;
    }
  }

  return false;
}

function checkIllegalCharacters(input: string, letters: string[]): boolean {
  for (let i = 0; i < input.length; i++) {
    if (letters.includes(input[i])) {
      return true;
    }
  }

  return false;
}

function checkNonOverlappingPairs(input: string, count: number): boolean {
  let pairs: string[] = [];

  for (let i = 0; i < input.length - 1; i++) {
    if (input[i] === input[i + 1]) {
      let pair = input[i] + input[i + 1];

      if (input[i - 1] === input[i] && input[i - 2] !== input[i]) {
        continue;
      }

      pairs.push(pair);
    }

    if (pairs.length === count) {
      return true;
    }
  }

  return false;
}

function handleNewPassword(oldPassword: string, alphabet: string[]) {
  let newPassword = oldPassword.split("");

  firstWhile:
  while (true) {
    for (let i = (newPassword.length - 1); i >= 0; i--) {
      if ((checkStraightLetters(newPassword.join(""), 3, alphabet) && !checkIllegalCharacters(newPassword.join(""), ["i", "o", "l"]) && checkNonOverlappingPairs(newPassword.join(""), 2))) {
        break firstWhile;
      }

      const alphabetIndex = alphabet.indexOf(newPassword[i]);

      if (alphabetIndex === (alphabet.length - 1)) {
        newPassword[i] = alphabet[0];
      } else {
        newPassword[i] = alphabet[alphabetIndex + 1];

        break;
      }
    }
  }

  return newPassword.join("");
}

const newPassword = handleNewPassword("hxbxwxba", alphabet);

console.log("Santa's new password: " + newPassword);

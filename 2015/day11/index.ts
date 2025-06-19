// URL: https://adventofcode.com/2015/day/11

// Part 1
const oldPassword = "hxbxwxba";
const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i));
console.log(alphabet);
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
};

function checkNonOverlappingPairs(input: string, count: number): boolean {
  let pairs: string[] = [];
  let pair = "";

  for (let i = 0; i < input.length - 1; i++) {
    if (input[i] === input[i + 1]) {
      let pair = input[i] + input[i + 1];

      if (!pairs.includes(pair)) {
        pairs.push(pair);
      }
    }

    if (pairs.length === count) {
      return true;
    }
  }

  return false;
}
console.log(checkNonOverlappingPairs("aabaaddc", 2));
console.log(checkStraightLetters("aabaaddc,", 3, alphabet));

function handleNewPassword(oldPassword: string) {

}

const newPassword = handleNewPassword(oldPassword);

console.log("Santa's new password: " + newPassword);

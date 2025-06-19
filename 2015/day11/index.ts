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

console.log(checkStraightLetters("aabdc,", 3, alphabet));

function handleNewPassword(oldPassword: string) {

}

const newPassword = handleNewPassword(oldPassword);

console.log("Santa's new password: " + newPassword);

// URL: https://adventofcode.com/2015/day/4
import crypto from 'crypto';

// Part 1
function findStringsMD5Hashed(key: string, startsWithAmount: number) {
  let followingNumber = 1;

  while (true) {
    const hash = crypto.createHash('md5').update(key +  followingNumber).digest("hex");

    if (hash.split("", startsWithAmount).some((e) => e !== "0")) {
      followingNumber += 1;

      continue;
    } else {
      break;
    }
  }

  console.log("Lowest number starting with '00000': " + followingNumber);
}

findStringsMD5Hashed("ckczppom", 5);

// URL: https://adventofcode.com/2015/day/10

// Part 1
function lookAndSay(str: string, count: number): string {
  if (str.length === 0) return "";

  let newNumber1 = "";
  let newNumber2 = "";

  for (let i = 0; i < count; i++) {
    if (i === 0) {
      let prevNum = str[0];
      let amountOfPrevNum = 0;

      for (let j = 0; j < str.length; j++) {
        if (prevNum === str[j]) {
          amountOfPrevNum++;
        } else {
          newNumber1 += String(amountOfPrevNum) + String(prevNum);
          prevNum = str[j];
          amountOfPrevNum = 1;
        }
      }

      newNumber1 += String(amountOfPrevNum) + String(prevNum);
    } else if (i % 2 === 0) {
      let prevNum = newNumber2[0];
      let amountOfPrevNum = 0;

      for (let j = 0; j < newNumber2.length; j++) {
        if (prevNum === newNumber2[j]) {
          amountOfPrevNum++;
        } else {
          newNumber1 += String(amountOfPrevNum) + String(prevNum);
          prevNum = newNumber2[j];
          amountOfPrevNum = 1;
        }
      }

      newNumber1 += String(amountOfPrevNum) + String(prevNum);
      newNumber2 = "";
    } else {
      let prevNum = newNumber1[0];
      let amountOfPrevNum = 0;

      for (let j = 0; j < newNumber1.length; j++) {
        if (prevNum === newNumber1[j]) {
          amountOfPrevNum++;
        } else {
          newNumber2 += String(amountOfPrevNum) + String(prevNum);
          prevNum = newNumber1[j];
          amountOfPrevNum = 1;
        }
      }

      newNumber2 += String(amountOfPrevNum) + String(prevNum);
      newNumber1 = "";
    }
  }

  return newNumber1.length === 0 ? newNumber2 : newNumber1;
};

const result = lookAndSay("1113222113", 40);

console.log(`Length of the result: ${result.length}`);

// Part 2

const resultPart2 = lookAndSay("1113222113", 50);

console.log(`Length of the part 2 result: ${resultPart2.length}`);

/**
 * @author Gahlouzi Saif Eddine <gahlouzi.saif.93@gmail.com>
 * Coins Collected = 40
 **/

const regex = /0/gi;

getLength = (number) => {
  return `${number}`.replace(regex, "").length;
};
play = (currentNumber) => {
  if (getLength(currentNumber) === 1) return 0;

  let digits = `${currentNumber}`.split("").map((element) => parseInt(element));
  let cost = Number.MAX_VALUE;
  let element = 0;

  const xor = digits.reduce(
    (accumulator, currentValue) => accumulator ^ currentValue
  );
  //xor of digits is already 0 so you are in disadvantage
  if (xor === 0) return parseInt(`${currentNumber}`.slice(1));

  digits.forEach((digit) => {
    if (
      cost > Math.abs((xor ^ digit) - digit) &&
      digit > Math.abs(xor ^ digit)
    ) {
      cost = Math.abs((xor ^ digit) - digit);
      element = digit;
    }
  });
  return parseInt(
    `${currentNumber}`.replace(`${element}`, `${element - cost}`)
  );
};

module.exports = play;

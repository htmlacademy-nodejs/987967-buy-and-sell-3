'use strict';

const fs = require(`fs`);
const chalk = require(`chalk`);

const getRandomInt = (min, max) => {
  const minInt = Math.ceil(min);
  const maxInt = Math.floor(max);

  return Math.floor(Math.random() * (maxInt - minInt) + minInt);
};

const getRandomElement = (array) => array[getRandomInt(0, array.length - 1)];

const getRandomElements = (array, count) =>
  new Array(count).fill(``).map(() => getRandomElement(array));

const removeElementFromArray = (array, index) => array.filter((it, i) => i !== index);

const getRandomUniqueElements = (array, count) => {
  let truncatedArray = array.slice();
  return new Array(count).fill(``).map(() => {
    const index = getRandomInt(0, truncatedArray.length - 1);
    const element = truncatedArray[index];
    truncatedArray = removeElementFromArray(truncatedArray, index);

    return element;
  });
};

const getRandomBoolean = () => Math.random() > 0.5;

const readContent = async (filename) => {
  try {
    const content = await fs.promises.readFile(filename, `utf-8`);
    return content.trim().split(`\n`);
  } catch (err) {
    console.error(chalk.red(err));
    return [];
  }
};

module.exports = {
  getRandomInt,
  getRandomElement,
  getRandomElements,
  getRandomUniqueElements,
  getRandomBoolean,
  readContent,
};

'use strict';

const getRandomInt = (min, max) => {
  const minInt = Math.ceil(min);
  const maxInt = Math.floor(max);

  return Math.floor(Math.random() * (maxInt - minInt) + minInt);
};

const getRandomElement = array => array[getRandomInt(0, array.length - 1)];

const getRandomElements = (array, count) =>
  new Array(count).map(() => getRandomElement(array));

const removeElement = (array, index) => {
  const result = array.slice();

  if (index >= array.length) {
    return result
  }

  switch (index) {
    case 0:
      result.shift();
      return result;

    case array.length - 1:
      result.pop();
      return result;

    default:
      return result.filter((it, i) => i !== index)
  }
};

const getRandomUniqueElements = (array, count) => {
  let truncatedArray = array.slice();
  return new Array(count).map(() => {
      const index = getRandomInt(0, truncatedArray.length - 1);
      const element = truncatedArray[index];
      truncatedArray = removeElement(truncatedArray, index);

      return element;
    });
};

const getRandomBoolean = () => Math.random() > 0.5;

module.exports = {
  getRandomInt: getRandomInt,
  getRandomElement: getRandomElement,
  getRandomElements: getRandomElements,
  getRandomUniqueElements: getRandomUniqueElements,
  getRandomBoolean: getRandomBoolean,
}

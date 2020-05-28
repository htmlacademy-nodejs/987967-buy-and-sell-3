'use strict';

const fs = require(`fs`);
const path = require(`path`);
const chalk = require(`chalk`);
const {MOCK_FILE_NAME, ROOT_FOLDER} = require(`./const`);

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

const sendResponse = (status, message, res) => {
  const template = `
    <!Doctype html>
      <html lang="ru">
      <head>
        <title>987967-buy-and-sell-3</title>
      </head>
      <body>${message}</body>
    </html>`.trim();

  res.statusCode = status;
  res.writeHead(status, {
    "content-type": `text/html; charset=utf-8`
  });
  res.end(template);
};

const getMockOffers = async () => {
  const mockFile = path.resolve(getRootFolder(__dirname), MOCK_FILE_NAME);
  let offers = [];
  try {
    offers = JSON.parse(await fs.promises.readFile(mockFile, `utf-8`));
  } catch (err) {
    offers = [];
  }

  return offers;
};
const getMockTitles = async () => await getMockOffers().map((it) => it.title);
const getTitleList = (titles) => `<ul>${titles.map((it) => `<li>${it}</li>`).join(`\n`)}</ul>`;
const getRootFolder = (currentPath) => currentPath.replace(RegExp(`${ROOT_FOLDER}.+`), ROOT_FOLDER);

module.exports = {
  getRandomInt,
  getRandomElement,
  getRandomElements,
  getRandomUniqueElements,
  getRandomBoolean,
  readContent,
  sendResponse,
  getMockOffers,
  getMockTitles,
  getTitleList,
  getRootFolder,
};

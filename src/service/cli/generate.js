'use strict';

const {
  getRandomBoolean,
  getRandomUniqueElements,
  getRandomInt,
  getRandomElement,
  readContent
} = require(`../utils`);

const fs = require(`fs`);
const chalk = require(`chalk`);
const {nanoid} = require(`nanoid`);
const {ExitCode, MOCK_FILE_NAME, MAX_ID_LENGTH} = require(`../const`);

const DEFAULT_COUNT = 1;
const MAX_COUNT = 1000;
const ERROR_MESSAGE = `Не больше ${MAX_COUNT} объявлений`;
const FileMessage = {
  ERROR: `Can't write data to file...`,
  SUCCESS: `Operation success. File created.`,
};

const OfferType = {
  OFFER: `offer`,
  SALE: `sale`,
};

const SumRestrict = {
  MIN: 1000,
  MAX: 100000,
};

const DescriptionLength = {
  MIN: 1,
  MAX: 5,
};

const CommentLength = {
  MIN: 0,
  MAX: 3,
};

const PictureNumber = {
  MIN: 1,
  MAX: 16,
};

const DataFileName = {
  TITLE: `titles.txt`,
  DESCRIPTION: `sentences.txt`,
  CATEGORY: `categories.txt`,
  COMMENT: `comments.txt`,
};

const generateComments = (data) => {
  const comments = getRandomUniqueElements(data, getRandomInt(CommentLength.MIN, CommentLength.MAX));
  return comments.map((it) => ({
    id: nanoid(MAX_ID_LENGTH),
    text: it
  }));
};

const generateOffer = ({titles, descriptions, categories, comments}) => ({
  id: nanoid(MAX_ID_LENGTH),
  title: getRandomElement(titles),
  picture: `item${getRandomInt(PictureNumber.MIN, PictureNumber.MAX)}.jpg`.replace(/m(\d)\./, `m0$1.`),
  description: getRandomUniqueElements(descriptions, getRandomInt(DescriptionLength.MIN, DescriptionLength.MAX)).join(`\n`),
  type: getRandomBoolean() ? OfferType.OFFER : OfferType.SALE,
  sum: getRandomInt(SumRestrict.MIN, SumRestrict.MAX),
  category: getRandomElement(categories),
  comments: generateComments(comments),
});

const generate = (count, data) => Array(count).fill(``).map(() => generateOffer(data));

const createMockFile = async (count) => {
  try {
    const data = {
      titles: await readContent(`./data/${DataFileName.TITLE}`),
      descriptions: await readContent(`./data/${DataFileName.DESCRIPTION}`),
      categories: await readContent(`./data/${DataFileName.CATEGORY}`),
      comments: await readContent(`./data/${DataFileName.COMMENT}`),
    };

    await fs.promises.writeFile(MOCK_FILE_NAME, JSON.stringify(generate(count, data)));
    console.info(chalk.green(FileMessage.SUCCESS));
    return ExitCode.SUCCESS;
  } catch (err) {
    console.error(chalk.red(FileMessage.ERROR));
    return ExitCode.ERROR;
  }
};

module.exports = {
  name: `--generate`,
  async run(arg) {
    const [param] = arg;
    const offerCount = parseInt(param, 10) || DEFAULT_COUNT;

    if (offerCount > MAX_COUNT) {
      console.error(chalk.red(ERROR_MESSAGE));
      return ExitCode.ERROR;
    }

    return await createMockFile(offerCount);
  }
};

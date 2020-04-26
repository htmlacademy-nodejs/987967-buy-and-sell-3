'use strict';

const {getRandomBoolean, getRandomUniqueElements, getRandomInt, getRandomElement} = require(`../../utils`);
const fs = require(`fs`);

const DEFAULT_COUNT = 1;
const MAX_COUNT = 1000;
const ERROR_MESSAGE = `Не больше 1000 объявлений`;
const MOCK_FILE_NAME = `mocks.json`;
const FileMessage = {
  ERROR: `Can't write data to file...`,
  SUCCESS: `Operation success. File created.`,
};

const TITLES = [
  `Продам книги Стивена Кинга.`,
  `Продам новую приставку Sony Playstation 5.`,
  `Продам отличную подборку фильмов на VHS.`,
  `Куплю антиквариат.`,
  `Куплю породистого кота.`,
  `Продам коллекцию журналов «Огонёк».`,
  `Отдам в хорошие руки подшивку «Мурзилка».`,
  `Продам советскую посуду.Почти не разбита.`,
  `Куплю детские санки.`,
];

const DESCRIPTIONS = [
  `Товар в отличном состоянии.`,
  `Пользовались бережно и только по большим праздникам.,`,
  `Продаю с болью в сердце...`,
  `Бонусом отдам все аксессуары.`,
  `Даю недельную гарантию.`,
  `Если товар не понравится — верну всё до последней копейки.`,
  `Это настоящая находка для коллекционера!`,
  `Если найдёте дешевле — сброшу цену.`,
  `Таких предложений больше нет!`,
  `Две страницы заляпаны свежим кофе.`,
  `При покупке с меня бесплатная доставка в черте города.`,
  `Кажется, что это хрупкая вещь.`,
  `Мой дед не мог её сломать.`,
  `Кому нужен этот новый телефон, если тут такое...`,
  `Не пытайтесь торговаться.Цену вещам я знаю.`,
];

const OfferType = {
  OFFER: `offer`,
  SALE: `sale`,
};

const SumRestrict = {
  MIN: 1000,
  MAX: 100000,
};

const CATEGORIES = [
  `Книги`,
  `Разное`,
  `Посуда`,
  `Игры`,
  `Животные`,
  `Журналы`,
];

const generateOffer = () => ({
  title: getRandomElement(TITLES),
  picture: `item${getRandomInt(1, 16)}.jpg`.replace(/m(\d)\./, `m0$1.`),
  description: getRandomUniqueElements(DESCRIPTIONS, getRandomInt(1, 5)),
  type: getRandomBoolean() ? OfferType.OFFER : OfferType.SALE,
  sum: getRandomInt(SumRestrict.MIN, SumRestrict.MAX),
  category: getRandomElement(CATEGORIES),
});

const generate = (count) => Array(count).fill(``).map(() => generateOffer());

module.exports = {
  name: `--generate`,
  run(arg, onComplite) {
    const [param] = arg;
    const offerCount = parseInt(param, 10) || DEFAULT_COUNT;

    if (offerCount > MAX_COUNT) {
      console.log(ERROR_MESSAGE);
      onComplite(false);
    } else {
      fs.writeFile(MOCK_FILE_NAME, JSON.stringify(generate(offerCount)), (err) => {
        if (err) {
          console.err(FileMessage.ERROR);
          onComplite(false);
        } else {
          console.log(FileMessage.SUCCESS);
          onComplite(true);
        }
      });
    }
  }
};

/**
 * @file Домашка по FP ч. 2
 *
 * Подсказки:
 * Метод get у инстанса Api – каррированый
 * GET / https://animals.tech/{id}
 *
 * GET / https://api.tech/numbers/base
 * params:
 * – number [Int] – число
 * – from [Int] – из какой системы счисления
 * – to [Int] – в какую систему счисления
 *
 * Иногда промисы от API будут приходить в состояние rejected, (прямо как и API в реальной жизни)
 * Ответ будет приходить в поле {result}
 */
import {
  length,
  lte,
  and,
  gte,
  not,
  equals,
  all,
  prop,
  modulo,
  multiply,
  tap,
} from 'ramda';
import Api from '../tools/api';

const api = new Api();

const getTransformedNumber = api.get('https://api.tech/numbers/base');
const getAnimalById = (id) => {
  return api.get(`https://animals.tech/${id}`, '');
};

const isValid = (value) => {
  const valLength = length(value);
  const isCorrectLenght = and(lte(valLength)(10))(gte(valLength)(2));
  const valNum = Number(value);
  const isNumber = not(Number.isNaN(valNum));
  const isPositive = gte(valNum, 0);
  const allCorrect = all(equals(true))([isCorrectLenght, isNumber, isPositive]);
  return new Promise((resolve, reject) => {
    allCorrect ? resolve(value) : reject('ValidationError');
  });
};

const processSequence = async ({
  value,
  writeLog,
  handleSuccess,
  handleError,
}) => {
  try {
    // 1. Берем строку N. Пишем изначальную строку в writeLog
    writeLog(value);

    // 2. Строка валидируется, в случае ошибки валидации вызвать
    // handleError с 'ValidationError' строкой в качестве аргумента.
    const validValue = await isValid(value);

    // 3. Привести строку к числу, округлить к ближайшему целому с точностью до единицы, записать в writeLog.
    const integerValue = Math.round(Number(validValue));

    writeLog(integerValue);

    // 4. C помощью API /numbers/base перевести из 10-й системы счисления в двоичную, результат записать в writeLog
    const { result } = await getTransformedNumber({
      from: 10,
      to: 2,
      number: integerValue,
    });
    writeLog(result);

    // 5. Взять кол-во символов в полученном от API числе записать в writeLog
    const binaryValueLength = length(result);
    writeLog(binaryValueLength);

    // 6. Возвести в квадрат с помощью Javascript записать в writeLog
    const squaredValue = multiply(binaryValueLength, binaryValueLength);
    writeLog(squaredValue);

    // 7. Взять остаток от деления на 3, записать в writeLog
    const remainderValue = modulo(squaredValue, 3);
    writeLog(`Остаток от деления ${squaredValue} на 3: ${remainderValue}`);

    // 8. C помощью API /animals.tech/id/name получить случайное животное используя полученный остаток в качестве id
    const animal = await getAnimalById(remainderValue);
    writeLog(prop('result')(animal));

    // 9. Завершить цепочку вызовом handleSuccess в который в качестве аргумента положить результат полученный на предыдущем шаге
    handleSuccess(prop('result')(animal));
  } catch (error) {
    handleError(error);
  }
};

export default processSequence;

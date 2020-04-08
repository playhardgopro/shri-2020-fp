/**
 * @file Домашка по FP ч. 1
 *
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */
import {
  compose,
  allPass,
  anyPass,
  propEq,
  __,
  not,
  eqProps,
  prop,
  equals,
  and,
} from 'ramda';

//#region shapes
const isStar = propEq('star');
const isSquare = propEq('square');
const isTriangle = propEq('triangle');
const isCircle = propEq('circle');
//#endregion

//#region green
const isStarGreen = isStar('green');
const isSquareGreen = isSquare('green');
const isTriangleGreen = isTriangle('green');
const isCircleGreen = isCircle('green');
//#endregion

//#region orange
const isStarOrange = isStar('orange');
const isSquareOrange = isSquare('orange');
const isTriangleOrange = isTriangle('orange');
const isCircleOrange = isCircle('orange');
//#endregion

//#region white
const isStarWhite = isStar('white');
const isSquareWhite = isSquare('white');
const isTriangleWhite = isTriangle('white');
const isCircleWhite = isCircle('white');
//#endregion

//#region red
const isStarRed = isStar('red');
const isSquareRed = isSquare('red');
const isTriangleRed = isTriangle('red');
const isCircleRed = isCircle('red');
//#endregion

//#region blue
const isStarBlue = isStar('blue');
const isSquareBlue = isSquare('blue');
const isTriangleBlue = isTriangle('blue');
const isCircleBlue = isCircle('blue');
//#endregion

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = (obj) => {
  const redStarAndGreenSquare = allPass([
    isStarRed,
    isSquareGreen,
    isTriangleWhite,
    isCircleWhite,
  ]);
  return redStarAndGreenSquare(obj);
};

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = (obj) => {
  console.log(obj, 'obj');

  const isQueenOfSpades = allPass([isStarGreen, isSquareGreen]);
  console.log(isQueenOfSpades(obj), 'isStar');
  return isQueenOfSpades(obj);
};

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = () => false;

// 4. Синий круг, красная звезда, оранжевый квадрат
export const validateFieldN4 = (obj) => {
  const blueCircleAndRedStarAndOrangeSquare = allPass([
    isCircleBlue,
    isStarRed,
    isSquareOrange,
  ]);
  return blueCircleAndRedStarAndOrangeSquare(obj);
};

// 5. Три фигуры одного любого цвета кроме белого.
export const validateFieldN5 = () => false;

// 6. Две зеленые фигуры (одна из них треугольник), еще одна любая красная.
export const validateFieldN6 = () => false;

// 7. Все фигуры оранжевые.
export const validateFieldN7 = (obj) => {
  const everyIsOrange = allPass([
    isStarOrange,
    isSquareOrange,
    isTriangleOrange,
    isCircleOrange,
  ]);
  return everyIsOrange(obj);
};

// 8. Не красная и не белая звезда.
export const validateFieldN8 = (obj) => {
  const whiteOrRedStar = anyPass([isStarRed, isStarWhite]);
  return not(whiteOrRedStar(obj));
};

// 9. Все фигуры зеленые.
export const validateFieldN9 = (obj) => {
  const everyIsGreen = allPass([
    isStarGreen,
    isSquareGreen,
    isTriangleGreen,
    isCircleGreen,
  ]);
  return everyIsGreen(obj);
};

// 10. Треугольник и квадрат одного цвета (не белого)
export const validateFieldN10 = (obj) => {
  const triangleColor = prop('triangle', obj);
  const squareColor = prop('square', obj);
  const triangleAndSquareHaveSameColor = equals(triangleColor, squareColor);
  const triangleColorIsNotWhite = not(equals(triangleColor, 'white'));

  return and(triangleAndSquareHaveSameColor, triangleColorIsNotWhite);
};

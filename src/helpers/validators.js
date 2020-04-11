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
  allPass,
  anyPass,
  propEq,
  not,
  prop,
  equals,
  and,
  values,
  filter,
  all,
  lte,
  length,
  compose,
  __,
  any,
} from 'ramda';

//#region shapes
const isStar = propEq('star');
const isSquare = propEq('square');
const isTriangle = propEq('triangle');
const isCircle = propEq('circle');
//#endregion

//#region green
const isGreen = (shape) => shape === 'green';
const isStarGreen = isStar('green');
const isSquareGreen = isSquare('green');
const isTriangleGreen = isTriangle('green');
const isCircleGreen = isCircle('green');
//#endregion

//#region orange
const isOrange = (shape) => shape === 'orange';
const isStarOrange = isStar('orange');
const isSquareOrange = isSquare('orange');
const isTriangleOrange = isTriangle('orange');
const isCircleOrange = isCircle('orange');
//#endregion

//#region white
// const isWhite = (shape) => shape === 'white';
const isStarWhite = isStar('white');
// const isSquareWhite = isSquare('white');
const isTriangleWhite = isTriangle('white');
const isCircleWhite = isCircle('white');
//#endregion

//#region red
const isRed = (shape) => shape === 'red';
const isStarRed = isStar('red');
// const isSquareRed = isSquare('red');
// const isTriangleRed = isTriangle('red');
// const isCircleRed = isCircle('red');
//#endregion

//#region blue
const isBlue = (shape) => shape === 'blue';
// const isStarBlue = isStar('blue');
// const isSquareBlue = isSquare('blue');
// const isTriangleBlue = isTriangle('blue');
const isCircleBlue = isCircle('blue');
//#endregion

const isLength = compose(equals, length);

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = (shapes) => {
  const redStarAndGreenSquare = allPass([
    isStarRed,
    isSquareGreen,
    isTriangleWhite,
    isCircleWhite,
  ]);
  return redStarAndGreenSquare(shapes);
};

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = (shapes) =>
  compose(lte(2), length, values, filter(equals('green')))(shapes);

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = (shapes) => {
  const colorsOfAllShapes = values(shapes);
  return isLength(filter(isRed, colorsOfAllShapes))(
    length(filter(isBlue, colorsOfAllShapes))
  );
};

// 4. Синий круг, красная звезда, оранжевый квадрат
export const validateFieldN4 = (shapes) => {
  const blueCircleAndRedStarAndOrangeSquare = allPass([
    isCircleBlue,
    isStarRed,
    isSquareOrange,
  ]);
  return blueCircleAndRedStarAndOrangeSquare(shapes);
};

// 5. Три фигуры одного любого цвета кроме белого.
export const validateFieldN5 = (shapes) => {
  const colorsOfAllShapes = values(shapes);
  const filteredByColor = filter(__, colorsOfAllShapes);
  const threeGreenShapes = isLength(filteredByColor(isGreen))(3);
  const threeRedShapes = isLength(filteredByColor(isRed))(3);
  const threeBlueShapes = isLength(filteredByColor(isBlue))(3);
  const threeOrangeShapes = isLength(filteredByColor(isOrange))(3);
  return any(equals(true))([
    threeGreenShapes,
    threeBlueShapes,
    threeOrangeShapes,
    threeRedShapes,
  ]);
};

// 6. Две зеленые фигуры (одна из них треугольник), еще одна любая красная.
export const validateFieldN6 = (shapes) => {
  const colorsOfAllShapes = values(shapes);
  const greenTriangle = isTriangleGreen(shapes);
  const oneRedShape = isLength(filter(isRed, colorsOfAllShapes))(1);
  const twoGreenShapes = isLength(filter(isGreen, colorsOfAllShapes))(2);
  return all(equals(true))([greenTriangle, twoGreenShapes, oneRedShape]);
};

// 7. Все фигуры оранжевые.
export const validateFieldN7 = (shapes) => {
  const everyIsOrange = allPass([
    isStarOrange,
    isSquareOrange,
    isTriangleOrange,
    isCircleOrange,
  ]);
  return everyIsOrange(shapes);
};

// 8. Не красная и не белая звезда.
export const validateFieldN8 = (shapes) => {
  const whiteOrRedStar = anyPass([isStarRed, isStarWhite]);
  return not(whiteOrRedStar(shapes));
};

// 9. Все фигуры зеленые.
export const validateFieldN9 = (shapes) => {
  const everyIsGreen = allPass([
    isStarGreen,
    isSquareGreen,
    isTriangleGreen,
    isCircleGreen,
  ]);
  return everyIsGreen(shapes);
};

// 10. Треугольник и квадрат одного цвета (не белого)
export const validateFieldN10 = (shapes) => {
  const triangleColor = prop('triangle', shapes);
  const squareColor = prop('square', shapes);
  const triangleAndSquareHaveSameColor = equals(triangleColor, squareColor);
  const triangleColorIsNotWhite = not(equals(triangleColor, 'white'));

  return and(triangleAndSquareHaveSameColor, triangleColorIsNotWhite);
};

/**
 * make all Math static methods accessible without namespace
 */
Object.getOwnPropertyNames(Math).forEach(k => (globalThis[k] = Math[k]));

import { apply } from './fp.js';
import { colinear } from './math.js';

const X = Symbol('X');
const O = Symbol('O');
const _ = Symbol('_');

const vec3 = (x, y, z) => [x, y, z];

/**
 * 3D board indexed [x][y][z]
 * prettier-ignore
 */
const board = [
  [
    [X, _, _],
    [O, _, _],
    [_, _, _]
  ],
  [
    [_, _, _],
    [O, X, _],
    [_, _, _]
  ],
  [
    [_, _, _],
    [O, _, _],
    [_, _, X]
  ]
];

/**
 * get all coordinates for some symbol
 */
const getCoordsFor = (board, symbol) =>
  board.reduce(
    (p, c, x) =>
      c.reduce(
        (p, c, y) =>
          c.reduce((p, c, z) => (c === symbol ? [...p, vec3(x, y, z)] : p), p),
        p
      ),
    []
  );

/**
 * nCr - choose k-sized combinations from xs, or n choose k
 */
const choose = (xs, k) =>
  k <= 0 || k > xs.length
    ? []
    : k === xs.length
    ? [xs]
    : k === 1
    ? xs.map(x => [x])
    : Array.from({ length: xs.length - k + 1 }).reduce(
        (p, _, i) => [
          ...p,
          ...choose(xs.slice(i + 1), k - 1).map(ys => [xs[i], ...ys])
        ],
        []
      );

/**
 * 1. get coordinates for the specified symbol
 * 2. generate all possible triples of coordinates without repetition (nCr)
 * 3. check if any triple is colinear; if yes, the symbol wins
 */
const hasWinner = (board, symbol) =>
  choose(getCoordsFor(board, symbol), 3).some(apply(colinear));

const main = () => {
  console.log(hasWinner(board, X));
  console.log(hasWinner(board, O));
};

main();

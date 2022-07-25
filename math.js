const sub = (a, b) => {
  const scalar = typeof b === 'number';
  return a.map((c, i) => c - (scalar ? b : b[i]));
};
const dot = (a, b) => a.reduce((p, c, i) => p + c * b[i], 0);
const mag = a => hypot(a[0], a[1], a[2]);
const dist = (a, b) => mag(sub(a, b));

/**
 * 3 vectors are colinear if the absolute value of the quotient
 * of the dot product of AB and AC and the product of their magnitudes
 * is equal to one:
 *
 * |dot(AB, AC) / (|AB| * |AC|)| = 1
 *
 * 3 is an arbitrary magic constant accounting for rounding errors
 */
export const colinear = (a, b, c) =>
  1 - abs(dot(sub(a, b), sub(a, c)) / (dist(a, b) * dist(a, c))) <
  3 * Number.EPSILON;

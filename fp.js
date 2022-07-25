export const curry =
  fn =>
  (...args) =>
    args.length >= fn.length
      ? fn(...args)
      : (...next) => curry(fn)(...args, ...next);

export const apply = curry((fn, args) => fn(...args));

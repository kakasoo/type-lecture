namespace CodeSpace {
  type DeepMerge<T extends object, P extends object> = {
    [key in keyof T | keyof P]: key extends keyof T
      ? key extends keyof P
        ? T[key] extends object
          ? P[key] extends object
            ? DeepMerge<T[key], P[key]>
            : T[key]
          : T[key]
        : T[key]
      : key extends keyof P
        ? P[key]
        : never;
  };

  type Answer1 = DeepMerge<{ a: 1 }, { b: 2 }>;
  type Answer2 = DeepMerge<{ a: { b: 1 } }, { a: { c: 2 } }>;

  const case1: Answer2 = {
    a: {
      b: 1,
      c: 2,
    },
  };

  const case2: Answer2 = {
    a: {
      c: 2,
    },
  };

  const case3: Answer2 = {
    a: {
      b: 1,
    },
  };
}

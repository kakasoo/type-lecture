namespace CodeSpace {
  /**
   * 객체를 합성한다.
   */
  type DeepMerge<T extends object, P extends object> = {
    [key in keyof T | keyof P]: key extends keyof T ? T[key] : key extends keyof P ? P[key] : never;
  };

  type Answer1 = DeepMerge<{ a: 1 }, { b: 2 }>;
  type Answer2 = DeepMerge<{ a: { b: 1 } }, { a: { c: 2 } }>;
}

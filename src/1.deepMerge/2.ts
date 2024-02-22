namespace CodeSpace {
  /**
   * 객체를 합성한다.
   *
   * 경우의 수
   *
   * - T[key]가 있고, P[key]가 없을 때 : 무조건 T[key] 우선시
   *
   * - T[key]가 있고, P[key]도 있을 때
   * 		- T[key]가 객체가 아닌 경우, P[key]가 객체가 아닌 경우 : T[key]를 우선시한다.
   * 		- T[key]가 객체가 아닌 경우, P[key]가 객체인 경우 : T[key]를 우선시한다.
   * 		- T[key]가 객체인 경우, P[key]가 객체가 아닌 경우 : T[key]를 우선시한다.
   * 		- T[key]가 객체인 경우, P[key]도 객체인 경우 : T[key], P[key]의 객체를 병합한다.
   *
   * - T[key]가 없고, P[key]가 있을 때 : 무조건 P[key] 우선시
   */
  type DeepMerge<T extends object, P extends object> = {
    [key in keyof T | keyof P]: key extends keyof T ? T[key] : key extends keyof P ? P[key] : never;
  };

  type Answer1 = DeepMerge<{ a: 1 }, { b: 2 }>;
  type Answer2 = DeepMerge<{ a: { b: 1 } }, { a: { c: 2 } }>;
}

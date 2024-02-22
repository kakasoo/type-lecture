namespace CodeSpace {
  /**
   * 중첩된 객체를 합성한다.
   */
  type DeepMerge<T extends object, P extends object> = {
    [key in keyof T | keyof P]: any;
  };
}

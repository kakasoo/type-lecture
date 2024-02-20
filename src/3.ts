/**
 * 사실 이 타입은 직접 구현하지 않아도 이미 타입스크립트 유틸리티 타입에 존재했음.
 * 그런데, keyof 로 명시되어 있지 않다 보니 잘못된 키를 넣어도 개발자가 파악할 수 없음.
 */
namespace CodeSpace {
  type Employee = {
    id: number;
    name: string;
    gender: "M" | "F";
    job: string;
  };

  //    type MyOmit<T extends object, K extends keyof T> = {
  //     [key in keyof T as key extends K ? never : key]: T[key];
  //   };

  /**
   * @example
   * ```ts
   * type Student = {
   *   id: number;
   *   name: string;
   *   gender: "M" | "F";
   * };
   * ```
   */
  type Student = Omit<Employee, "job">;
}

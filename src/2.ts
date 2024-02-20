/**
 * MyOmit과 같이, key 타입에 `as`를 써서 키에 대한 필터링이 가능하고, 이를 통해 아까의 타입을 구현할 수 있음.
 */
namespace CodeSpace {
  type Employee = {
    id: number;
    name: string;
    gender: "M" | "F";
    job: string;
  };

  type MyOmit<T extends object, K extends keyof T> = {
    [key in keyof T as key extends K ? never : key]: T[key];
  };

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
  type Student = MyOmit<Employee, "job">;
}

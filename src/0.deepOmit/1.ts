/**
 * 간단한 타입 하나를 구현할 수 있다면, 번거로운 타입 재정의들을 생략할 수 있게 됨.
 */
namespace CodeSpace {
  type Employee = {
    id: number;
    name: string;
    gender: "M" | "F";
    job: string;
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

  type MyOmit<T, K> = any;
}

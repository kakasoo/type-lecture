/**
 * 어떤 두 타입이 한 프로퍼티를 제외하고 전부 동일한 경우, 일일히 구현하기 번거로움
 */
namespace CodeSpace {
  type Employee = {
    id: number;
    name: string;
    gender: "M" | "F";
    job: string;
  };

  type Student = {
    id: number;
    name: string;
    gender: "M" | "F";
  };
}

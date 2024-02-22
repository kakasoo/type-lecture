/**
 * 다시 DeepOmit 구현하기
 */
namespace CodeSpace {
  /**
   * 사회적 기업
   */
  type SocialEnterprise = {
    name: string;
    address: string;
    registrationNumber: number;
    socialResponsibility: string;
  };

  /**
   * 사회적 기업에서 일하는 직원
   */
  type SocialEnterpriseEmployee = {
    id: number;
    name: string;
    gender: "M" | "F";
    job: string;
    company: SocialEnterprise;
  };

  type EnterpriseEmployee = DeepOmit<SocialEnterpriseEmployee, "company.registrationNumber">;
  const enterpriseEmployee: EnterpriseEmployee = {
    id: 0,
    name: "",
    gender: "M",
    job: "",
    company: {
      name: "",
      address: "",
      registrationNumber: 0,
      socialResponsibility: "", // 에러가 발생하지 않는다 = Omit 되지 않았다.
    },
  };

  /**
   * 최소한 Omit 정도로 동작하게끔 미리 구현
   */
  type DeepOmit<T extends object, K extends DeepObjectKeys<T>> = {
    [key in keyof T as key extends K ? never : key]: T[key];
  };

  /**
   * 일단 `DeepOmit`에서 키가 추론될 수 있게 하는 타입을 만들고 이름을 `DeepObjectKeys` 라고 명명하자!
   *
   * - 두번째 타입 파라미터 P를 keyof T로 명시하고 keyof T를 기본 타입으로 대입한다.
   * - 이렇게 하는 이유는,
   * - 타입 구현 부분에 있는 `P extends any` 부분을 통해 각 유니온 타입이 분리되어 조건부 타입을 타기 때문
   */
  type DeepObjectKeys<T extends object, P extends keyof T = keyof T> = P extends string
    ? T[P] extends ValueType // T[P]가 객체가 아니라면 키를 수집한다.
      ? P
      : T[P] extends object // T[P]가 객체라면 재귀적으로 순회하며 `P.` 문자열 다음으로 붙여준다.
        ? `${P}.${DeepObjectKeys<T[P]>}`
        : never
    : never;

  type ValueType = number | boolean | string | null | undefined | symbol | bigint | Date;
}

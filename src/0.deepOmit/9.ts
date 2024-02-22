/**
 * DeepOmit 구현하기에 앞서 DeepObjectKeys부터 구현하기
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

  type EnterpriseEmployee = DeepOmit<SocialEnterpriseEmployee, "company.socialResponsibility">;
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

  type DeepOmit<T extends object, K extends DeepObjectKeys<T>> = any;

  /**
   * 일단 `DeepOmit`에서 키가 추론될 수 있게 하는 타입을 만들고 이름을 `DeepObjectKeys` 라고 명명하자!
   *
   * - 두번째 타입 파라미터 P를 keyof T로 명시하고 keyof T를 기본 타입으로 대입한다.
   * - 이렇게 하는 이유는,
   * - 타입 구현 부분에 있는 `P extends string` 부분을 통해 각 유니온 타입이 분리되어 조건부 타입을 타기 때문
   */
  type DeepObjectKeys<T extends object, P extends keyof T = keyof T> = P extends string ? 1 : 2;
}

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
   */
  type DeepObjectKeys<T extends object> = any;
}

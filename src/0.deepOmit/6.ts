/**
 * Omit을 이용해서 중첩된 객체 내부의 키 프로퍼티를 제거하려면?
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

  /**
   * 이렇게 표현할 수는 없을까 싶지만, Omit에서는 이런 식의 키 제거를 지원하지 않는다.
   */
  type EnterpriseEmployee = Omit<SocialEnterpriseEmployee, "company.socialResponsibility">;
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
}

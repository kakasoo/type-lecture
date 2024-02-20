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
   * 일반 기업에서 일하는 직원을 아래와 같이 표현 가능한데, 조금 아쉽다.
   */
  type Enterprise = Omit<SocialEnterprise, "socialResponsibility">;
  type EnterpriseEmployee = {
    id: number;
    name: string;
    gender: "M" | "F";
    job: string;
    company: Enterprise;
  };
}

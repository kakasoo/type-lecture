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
   * SocialEnterpriseEmployee의 company 인터페이스에서, socialResponsibility 프로퍼티만 제거하여 정의하고 싶다면?
   */
  type EnterpriseEmployee = any;
}

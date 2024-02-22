/**
 * 다시 DeepOmit 구현하기 (완성)
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
      socialResponsibility: "", // 빨간 줄이 나오는 걸 보면 완성한 것을 알 수 있다!
    },
  };

  type GetMember<T extends string, First extends string> = T extends `${First}.${infer Rest}` ? Rest : never;
  /**
   * 최소한 Omit 정도로 동작하게끔 미리 구현
   *
   * 제외되지 않은 key만 존재하게끔 하되, T[key]가 object 라면 그 내부에서 아직 제외해야 할 키가 있을 수 있다.
   */
  type DeepOmit<T extends object, K extends DeepObjectKeys<T>> = {
    [key in keyof T as key extends K ? never : key]: T[key] extends object
      ? key extends string // key가 문자열임을 보장하기 위해 조건부 타입을 추가
        ? /**
           * DeepObjectKeys<T>로 만들어진 stirng union 타입 중에 `${key}.${string}`이 있을 수 있기 때문에,
           * `${key}.${string}`에서 `${key}` 부분을 제외한 다음 부분을 DeepOmit<T[key], ?>에 넘겨주어야 한다.
           *
           * 1. 즉, `.`로 이어진 문자일 경우 앞의 문자가 `${key}`일 경우에 뒤의 키만을 뽑아야 한다.
           * 2. 만약 그렇지 않다면, ( = `${key}.` 을 포함하는 문자열 타입이 아니라면 ) 그냥 아무것도 안 뺀 객체를 주면 된다.
           */
          DeepOmit<T[key], GetMember<K, key> extends DeepObjectKeys<T[key]> ? GetMember<K, key> : never>
        : never
      : T[key];
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

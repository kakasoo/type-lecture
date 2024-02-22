/**
 * DeepPick 구현하기
 *
 * DeepOmit이 이미 구현되어 있다면.
 */
namespace CodeSpace {
  type GetMember<T extends string, First extends string> = T extends `${First}.${infer Rest}` ? Rest : never;

  type DeepObjectKeys<T extends object, P extends keyof T = keyof T> = P extends string
    ? T[P] extends ValueType
      ? P
      : T[P] extends object
        ? `${P}.${DeepObjectKeys<T[P]>}`
        : never
    : never;

  type ValueType = number | boolean | string | null | undefined | symbol | bigint | Date;

  type DeepOmit<T extends object, K extends DeepObjectKeys<T>> = {
    [key in keyof T as key extends K ? never : key]: T[key] extends object
      ? key extends string
        ? T[key] extends Date // Date는 객체긴 하지만 DeepOmit 재귀를 탈 필요는 없으므로 예외 처리
          ? T[key]
          : DeepOmit<T[key], GetMember<K, key> extends DeepObjectKeys<T[key]> ? GetMember<K, key> : never>
        : never
      : T[key];
  };

  type DeepPick = any;
}

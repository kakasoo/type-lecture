/**
 * DeepPick 구현하기
 */
namespace CodeSpace {
  type GetMember<T extends string, First extends string> = T extends `${First}.${infer Rest}` ? Rest : never;

  /**
   * DeepOmit에서 구현한 것과 달리
   * T[P]가 객체 타입인 경우 `${P}` | `${P}.${DeepObjectKeys<T[P]>}`가 아닌,
   * `${P}.${DeepObjectKeys<T[P]>}` 만으로 추론되게 한다.
   */
  type DeepObjectKeys<T extends object, P extends keyof T = keyof T> = P extends string
    ? T[P] extends ValueType
      ? P
      : T[P] extends object
        ? `${P}` | `${P}.${DeepObjectKeys<T[P]>}`
        : never
    : never;

  type DeepObjectKeysIsObject<T extends object, P extends keyof T = keyof T> = P extends string
    ? T[P] extends ValueType
      ? never
      : T[P] extends object
        ? `${P}` | `${P}.${DeepObjectKeysIsObject<T[P]>}`
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

  type DeepPick<T extends object, K extends DeepObjectKeys<T>> = DeepOmit<
    T,
    Exclude<
      DeepObjectKeys<T>,
      | K // 이것 외에 지운다고 가정했던 코드에서,
      | "K에 명시된 키가 객체를 가리키며 부모 객체가 존재할 경우 부모 객체도 지워서는 안 된다." // 이것도 제외하고 지워야 한다.
    >
  >;

  type a = DeepObjectKeysIsObject<NestedObject>;

  interface NestedObject {
    propertyA: string;
    propertyB: number;
    propertyC: {
      propertyD: boolean;
      propertyE: {
        propertyF: string;
        propertyG: {
          propertyH: number;
          propertyI: {
            propertyJ: boolean;
            propertyK: Date;
            propertyL: bigint;
          };
        };
      };
    };
  }

  /**
   * propertyB는 추론된다.
   * propertyC.propertyE.propertyG.propertyI.propertyL는 안 된다.
   *
   * propertyC.propertyE.propertyG.propertyI.propertyL를 넣을 때 그 외의 모든 것을 DeepOmit하는 코드가, PropertyC까지 Omit해서 부모 객체가 사라졌기 떄문
   */
  type Answer1 = DeepPick<NestedObject, "propertyC.propertyE.propertyG.propertyI.propertyL" | "propertyB">;
  const a1: Answer1 = {
    propertyB: 1,
    propertyC: {
      propertyE: {
        propertyG: {
          propertyI: {
            propertyL: 1n,
          },
        },
      },
    },
  };
}

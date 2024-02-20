type _KeyOfElement<T extends object> = T extends Array<infer E> ? keyof E : keyof T;

/**
 * 타입 작성의 중복을 줄이고자 DeepOmit 구현
 */
type _ObjectToKey<T extends object, P extends _KeyOfElement<T> = _KeyOfElement<T>> = P extends string
  ? T[P] extends (number | boolean | string | Date)[]
    ? P
    : T[P] extends object
      ? `${P}.${_ObjectToKey<T[P]>}` | `${P}`
      : P
  : never;

type DeepOmitHelper<T extends string, First extends string> = T extends `${First}.${infer Rest}` ? Rest : never;

/**
 * 객체의 깊이 상관 없이 Omit 하며, 배열을 만날 경우 배열의 요소의 키를 제거하는 `Omit` 타입.
 *
 * @example
 *
 * ```typescript
 * type Question = {
 *  title: string;
 *  writer: {
 *   id: number;
 *   name: string;
 *   nickname: {
 *     createdAt: string;
 *     value: string;
 *   };
 *  };
 * };
 *
 * // Only remove `wirter.nickname.createdAt` property.
 * type Answer1 = DeepOmit<Question, 'writer.nickname.createdAt'>;
 * ```
 */
type DeepOmit<T extends object, OuterKey extends _ObjectToKey<T>> = {
  [K in keyof T as K extends OuterKey ? never : K]: T[K] extends object
    ? K extends string // 아래에서 DeepOmitHelper의 타입 파라미터로 넘기기 위해 반드시 string인지 체크가 필요하다.
      ? T[K] extends Array<infer E>
        ? E extends object
          ? DeepOmit<
              E,
              DeepOmitHelper<OuterKey, K> extends _ObjectToKey<E, _KeyOfElement<E>>
                ? DeepOmitHelper<OuterKey, K>
                : never
            >[]
          : T[K]
        : DeepOmit<
            T[K],
            DeepOmitHelper<OuterKey, K> extends _ObjectToKey<T[K], _KeyOfElement<T[K]>>
              ? DeepOmitHelper<OuterKey, K>
              : never
          >
      : never
    : T[K];
};

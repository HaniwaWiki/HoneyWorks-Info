import type { Ref } from 'vue';

export type MaybeRef<T> = T | Ref<T>;

export type Refs<T extends object> = { [K in keyof T]: Ref<T[K]> };

export type MaybeRefs<T extends object> = { [K in keyof T]: MaybeRef<T[K]> };

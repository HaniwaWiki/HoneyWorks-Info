import type { Ref } from 'vue';
import { ref, watchEffect } from 'vue';

// syntactic sugar to use async function in computed
export default function asyncComputed<T>(
  fn: () => Promise<T>,
  defaultValue: T,
): Ref<T> {
  const value = ref(defaultValue) as Ref<T>;
  watchEffect(async () => {
    value.value = await fn();
  });
  return value;
}

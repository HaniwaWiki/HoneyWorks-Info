import { MaybeRef } from '@/types/vue/ref';
import { computed, unref } from 'vue';

export function useSort<T>(
  items: MaybeRef<T[]>,
  key: MaybeRef<((t: T) => number) | keyof T>
) {
  const getVal = computed(() => (item: T) => {
    const k = unref(key);
    return typeof k === 'function' ? k(item) : (item[k] as number);
  });
  return computed(() => {
    return unref(items).sort((a, b) => getVal.value(a) - getVal.value(b));
  });
}

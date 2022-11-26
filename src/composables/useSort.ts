import { computed, unref } from 'vue';
import type { MaybeRef } from '@/types/vue/ref';

// sort ref data by comparator function or key.
export function useSort<T>(
  items: MaybeRef<T[]>,
  key: MaybeRef<((t: T) => number) | keyof T>,
) {
  const getVal = computed(() => (item: T) => {
    const k = unref(key);
    return typeof k === 'function' ? k(item) : (item[k] as number);
  });
  return computed(() => {
    return unref(items).sort((a, b) => getVal.value(a) - getVal.value(b));
  });
}

import { computed, unref } from 'vue';
import { MaybeRef } from '@/types/ref';

// filter data by keyword
// letter case is ignored
function filter<T>(items: MaybeRef<T[]>, keyword: MaybeRef<string>): T[] {
  return unref(items).filter((item, i) =>
    unref(keyword)
      .split(' ')
      .every((word) =>
        JSON.stringify(item).toLowerCase().includes(word.toLowerCase())
      )
  );
}

export function useFilter<T>(items: MaybeRef<T[]>, keyword: MaybeRef<string>) {
  return computed(() => filter(items, keyword));
}

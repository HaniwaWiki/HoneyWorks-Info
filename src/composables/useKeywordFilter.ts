import { computed, unref } from 'vue';
import type { MaybeRef } from '@/types/vue/ref';

// filter data by keyword
// letter case is ignored
function filter<T>(items: MaybeRef<T[]>, keyword: MaybeRef<string>): T[] {
  return unref(items).filter(item =>
    unref(keyword)
      .split(' ')
      .every(word =>
        JSON.stringify(item).toLowerCase().includes(word.toLowerCase()),
      ),
  );
}

export function useKeywordFilter<T>(
  items: MaybeRef<T[]>,
  keyword: MaybeRef<string>,
) {
  return computed(() => filter(items, keyword));
}

import type { Ref } from 'vue';
import { computed, ref, unref, watch } from 'vue';
import type { MaybeRef } from '@/types/vue/ref';

// paginate all data
export function usePagination<T>(
  data: MaybeRef<T[]>,
  pageSize: MaybeRef<number>,
  // you can pass pre-created ref of 'page' into function or not
  // if page isn't passed in, a new ref(1) will be created and assigned to page
  page?: Ref<number>,
) {
  const pageCount = computed(() =>
    Math.ceil(unref(data).length / unref(pageSize)),
  );
  const _page = page ?? ref(3);
  const paginatedData = computed(() => {
    const start = (_page.value - 1) * unref(pageSize);
    const end = start + unref(pageSize);
    return unref(data).slice(start, end);
  });

  // after data changes, reset page to 1
  watch(data, () => {
    _page.value = 1;
  });

  // after page changes, scroll to top
  watch(_page, () =>
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    }),
  );
  return { pageCount, page: _page, paginatedData };
}

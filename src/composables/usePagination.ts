import type { Ref } from 'vue';
import { computed, ref, unref, watch } from 'vue';
import type { MaybeRef } from '@/types/vue/ref';

type UsePaginationParam<T> = {
  data: MaybeRef<T[]>;
  pageSize: MaybeRef<number>;
  // you can pass pre-created ref of 'page' into function or not
  // if page isn't passed in, a new ref(1) will be created and assigned to page
  page?: Ref<number>;
  // dependencies of data
  // if deps changed, page will be reset to 1
  // if deps isn't passed in, page will be reset to 1 when data changed
  deps?: Ref[];
};

// paginate all data
export function usePagination<T>({
  data,
  pageSize,
  page: _page,
  deps = [ref(data), ref(pageSize)],
}: UsePaginationParam<T>) {
  const pageCount = computed(() =>
    Math.ceil(unref(data).length / unref(pageSize)),
  );
  const page = _page ?? ref(1);
  const paginatedData = computed(() => {
    const start = (page.value - 1) * unref(pageSize);
    const end = start + unref(pageSize);
    return unref(data).slice(start, end);
  });

  // after data's deps change, reset page to 1
  watch(deps, () => page.value = 1);

  // after page changes, scroll to top
  watch(page, () =>
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    }),
  );
  return { pageCount, page, paginatedData };
}

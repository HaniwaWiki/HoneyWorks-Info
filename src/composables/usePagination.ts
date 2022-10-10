import { computed, Ref, ref, unref, watch } from 'vue';
import { MaybeRef } from '@/types/ref';

// paginate all data
export function usePagination<T>(
  data: MaybeRef<T[]>,
  pageSize: MaybeRef<number>
) {
  const pageCount = computed(() =>
    Math.ceil(unref(data).length / unref(pageSize))
  );
  const page = ref(1);
  const paginatedData = computed(() => {
    const start = (page.value - 1) * unref(pageSize);
    const end = start + unref(pageSize);
    return unref(data).slice(start, end);
  });

  // after data changes, reset page to 1
  watch(data, () => {
    page.value = 1;
  });

  // after page changes, scroll to top
  watch(page, () =>
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  );
  return { pageCount, page, paginatedData };
}

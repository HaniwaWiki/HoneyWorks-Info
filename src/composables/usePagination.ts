import { computed, Ref, ref, watch } from 'vue';

// page local data
export function usePagination<T>(data: Ref<T[]>, pageSize: Ref<number>) {
  const pageCount = computed(() => data.value.length / pageSize.value);
  const page = ref(1);
  const paginatedData = computed(() => {
    const start = (page.value - 1) * pageSize.value;
    const end = start + pageSize.value;
    return data.value.slice(start, end);
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

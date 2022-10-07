import { computed, Ref, ref, watch } from 'vue';

// paginate all data
export function usePagination<T>(data: Ref<T[]>, pageSize: Ref<number>) {
  const pageCount = computed(() =>
    Math.ceil(data.value.length / pageSize.value)
  );
  const page = ref(1);
  const paginatedData = computed(() => {
    const start = (page.value - 1) * pageSize.value;
    const end = start + pageSize.value;
    return data.value.slice(start, end);
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

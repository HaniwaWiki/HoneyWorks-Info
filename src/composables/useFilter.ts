import { Ref, ref, watch } from 'vue';

// filter data by keyword
// letter case is ignored
async function filter<T>(items: Ref<T[]>, keyword: Ref<string>): Promise<T[]> {
  return items.value.filter((item, i) =>
    keyword.value
      .split(' ')
      .every((word) =>
        JSON.stringify(item).toLowerCase().includes(word.toLowerCase())
      )
  );
}

export function useFilter<T>(items: Ref<T[]>, keyword: Ref<string>) {
  const filteredData = ref(items.value) as Ref<T[]>;

  // after items or keyword changes, filter data
  watch([items, keyword], async () => {
    filteredData.value = await filter(items, keyword);
  });

  return filteredData;
}

// composable of getCollection
import { getCollection } from '@/api/common';
import { APITypeName } from '@/types/HWPL';
import { Ref, ref, unref, watchEffect } from 'vue';
import { MaybeRef } from '@/types/vue/ref';

export function useCollection<Name extends keyof APITypeName>(
  collectionName: MaybeRef<Name>,
  filter: MaybeRef<Partial<APITypeName[Name]>> = ref({}),
  version: MaybeRef<string | number> = ref('latest')
) {
  const collection = ref([]) as Ref<APITypeName[Name][]>;
  const loading = ref(true);

  // use a watch function to fetch data from backend
  watchEffect(() =>
    getCollection(unref(collectionName), unref(filter), unref(version)).then(
      (data) => {
        collection.value = data;
        loading.value = false;
      }
    )
  );

  return { collection, loading };
}

// composable of getCollection, but return only first item
export function useFirstOfCollection<Name extends keyof APITypeName>(
  collectionName: MaybeRef<Name>,
  filter: MaybeRef<Partial<APITypeName[Name]>> = ref({}),
  version: MaybeRef<string | number> = ref('latest')
) {
  const item = ref(null) as Ref<APITypeName[Name] | null>;
  const loading = ref(true);

  // fetch data from backend
  watchEffect(() =>
    getCollection(unref(collectionName), unref(filter), unref(version)).then(
      (data) => {
        item.value = data[0] || null;
        loading.value = false;
      }
    )
  );

  return { item, loading };
}

import type { Ref } from 'vue';
import { ref, unref, watchEffect } from 'vue';
import { getCollection } from '@/api/getCollection';
import type { CollectionTypeName } from '@/types/HWPL';
import type { MaybeRef } from '@/types/vue/ref';

// composable of getCollection
export function useCollection<
  Name extends keyof CollectionTypeName,
  Collection extends CollectionTypeName[Name],
>(
  collectionName: MaybeRef<Name>,
  filter: MaybeRef<Partial<Collection>> = ref({}),
  version: MaybeRef<string | number> = ref('latest'),
) {
  const collection = ref([]) as Ref<Collection[]>;
  const loading = ref(true);

  // use a watch function to fetch data from backend
  watchEffect(() =>
    getCollection(unref(collectionName), unref(filter), unref(version)).then(
      (data) => {
        collection.value = data;
        loading.value = false;
      },
    ),
  );

  return { collection, loading };
}

// composable of getCollection, but return only first item
export function useFirstOfCollection<
  Name extends keyof CollectionTypeName,
  Collection extends CollectionTypeName[Name],
>(
  collectionName: MaybeRef<Name>,
  filter: MaybeRef<Partial<Collection>> = ref({}),
  version: MaybeRef<string | number> = ref('latest'),
) {
  const item = ref(null) as Ref<CollectionTypeName[Name] | null>;
  const loading = ref(true);

  // fetch data from backend
  watchEffect(() =>
    getCollection(unref(collectionName), unref(filter), unref(version)).then(
      (data) => {
        item.value = data[0] || null;
        loading.value = false;
      },
    ),
  );

  return { item, loading };
}

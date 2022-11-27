import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { SortBy } from '@/views/Info/CharacterCards/CharacterCardList/helper/useSortCharacterCards';

export const useCharacterCardListViewStore = defineStore('characterCardListView', () => {
  const keyword = ref('');
  const sortBy = ref<SortBy>('Default');
  const showImage = ref(false);
  const showEvolved = ref(false);

  return { keyword, sortBy, showImage, showEvolved };
});

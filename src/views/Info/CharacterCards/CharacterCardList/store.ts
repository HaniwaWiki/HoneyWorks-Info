import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { CharacterCardSortBy } from '@/views/Info/CharacterCards/CharacterCardList/helper/useSortCharacterCards';

export const useCharacterCardListViewStore = defineStore('characterCardListView', () => {
  const keyword = ref('');
  const sortBy = ref<CharacterCardSortBy>('Default');
  const page = ref(1);
  const showImage = ref(false);
  const showEvolved = ref(false);

  return { keyword, sortBy, page, showImage, showEvolved };
});

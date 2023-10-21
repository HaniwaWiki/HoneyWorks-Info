import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCharacterCardListViewStore = defineStore('sceneCardListView', () => {
  const keyword = ref('');
  const page = ref(1);
  return { keyword, page };
});

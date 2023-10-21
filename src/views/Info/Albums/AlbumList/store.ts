import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAlbumListViewStore = defineStore('albumListView', () => {
  const keyword = ref('');
  const page = ref(1);
  return { keyword, page };
});

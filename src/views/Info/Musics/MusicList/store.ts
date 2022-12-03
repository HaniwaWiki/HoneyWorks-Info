import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMusicListViewStore = defineStore('musicListView', () => {
  const keyword = ref('');
  const page = ref(1);
  return { keyword, page };
});

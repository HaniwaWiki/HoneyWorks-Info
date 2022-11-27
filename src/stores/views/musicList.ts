import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMusicListViewStore = defineStore('musicListView', () => {
  const keyword = ref('');
  return { keyword };
});

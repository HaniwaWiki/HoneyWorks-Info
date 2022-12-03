import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { GachaInfoSortBy } from '@/views/Info/Gachas/GachaList/helper/useSortGachaBoxInfoList';

export const useGachaListViewStore = defineStore('gachaListView', () => {
  const keyword = ref('');
  const sortBy = ref<GachaInfoSortBy>('StartAt');
  const page = ref(1);
  return { keyword, sortBy, page };
});

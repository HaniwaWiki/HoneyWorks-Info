import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { MusicInfoSortBy } from '@/views/Info/Musics/MusicList/helper/useSortMusicList';

export const useMusicListViewStore = defineStore('musicListView', () => {
  const keyword = ref('');
  const sortBy = ref<MusicInfoSortBy>('Id');
  const page = ref(1);
  return { keyword, sortBy, page };
});

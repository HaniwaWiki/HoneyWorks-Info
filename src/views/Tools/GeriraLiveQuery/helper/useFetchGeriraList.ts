import type { Ref } from 'vue';
import { computed, onMounted, ref } from 'vue';
import axios from '@/utils/request';
import type { GeriraInfo } from '@/views/Tools/GeriraLiveQuery/helper/type';
import { parseRss } from '@/views/Tools/GeriraLiveQuery/helper/parseRss';
import { parseGerira } from '@/views/Tools/GeriraLiveQuery/helper/parseGerira';
import { getBaseUrls } from '@/api/baseUrls';

export function useFetchGeriraList() {
  const { rssHubBaseUrl } = getBaseUrls();
  const geriraList = ref<GeriraInfo[]>([]);
  const loading = ref(true);
  const url = `${rssHubBaseUrl}/twitter/keyword/%E3%82%B2%E3%83%AA%E3%83%A9%E3%83%A9%E3%82%A4%E3%83%96`;

  async function loadData() {
    loading.value = true;
    const random = Math.random();
    // use different url to avoid browser cache
    const randomizedUrl = `${url}?random=${random}`;
    const res = await axios.get(randomizedUrl, { cache: false });
    const rss = parseRss(res.data);
    geriraList.value = rss
      .map(parseGerira)
      .filter(r => r !== null) as GeriraInfo[];
    loading.value = false;
  }

  onMounted(loadData);

  return { geriraList, loading, refresh: loadData };
}

export function isExpired(gerira: GeriraInfo): boolean {
  return new Date().getTime() > gerira.endTime.getTime();
}

export function useGeriraFilter(geriraList: Ref<GeriraInfo[]>) {
  return computed(() =>
    geriraList.value.filter(gerira => !isExpired(gerira)),
  );
}

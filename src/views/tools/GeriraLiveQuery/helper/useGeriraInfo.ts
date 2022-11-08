import { onMounted, ref } from 'vue';
import axios from '@/utils/request';
import { GeriraInfo } from '@/views/tools/GeriraLiveQuery/helper/type';
import { parseRss } from '@/views/tools/GeriraLiveQuery/helper/parseRss';
import { parseGerira } from '@/views/tools/GeriraLiveQuery/helper/parseGerira';

const rssHubBase = 'https://rsshub.honeyworks.info';

export function useGeriraInfo() {
  const geriraInfo = ref<GeriraInfo[]>([]);
  const loading = ref(true);
  const url = `${rssHubBase}/twitter/keyword/%E3%82%B2%E3%83%AA%E3%83%A9%E3%83%A9%E3%82%A4%E3%83%96`;

  async function loadData() {
    loading.value = true;
    const random = Math.random();
    // use different url to avoid cache
    const randomizedUrl = `${url}?random=${random}`;
    const res = await axios.get(randomizedUrl);
    const rss = parseRss(res.data);
    geriraInfo.value = rss
      .map(parseGerira)
      .filter((r) => r !== null) as GeriraInfo[];
    loading.value = false;
  }

  onMounted(loadData);

  return { geriraInfo, loading, refresh: loadData };
}

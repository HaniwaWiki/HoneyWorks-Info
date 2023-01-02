import { getBaseUrls } from '@/api/baseUrls';
import { storage } from '@/utils/storage';
import { VERSION_PREFIX } from '@/utils/storage/prefixes';
import axios from '@/utils/request';
import { clearRequestCache } from '@/utils/request/cache';

/*
  check for api updates
  if API is not latest, invalidate all request caches
 */
export async function checkForUpdates() {
  const localApiVersion = await storage.getItem(`${VERSION_PREFIX}api/content`);

  const { staticApiBaseUrl } = getBaseUrls();
  const random = Math.random();
  const url = `${staticApiBaseUrl}/Version.json?random=${random}`;
  const res = await axios.get(url, { cache: false });
  const currentVersionTime = new Date((res.data.MasterVersion ?? 0) * 1000).toLocaleString();
  const remoteApiVersion = JSON.stringify(res.data);
  if (remoteApiVersion === localApiVersion) {
    // eslint-disable-next-line no-console
    console.log(`API is up to date! (version: ${currentVersionTime})`);
    return;
  }
  // eslint-disable-next-line no-console
  console.log(`new API detected, clearing request cache...(version: ${currentVersionTime})`);
  await clearRequestCache();
  await storage.setItem(`${VERSION_PREFIX}api/content`, remoteApiVersion);
}

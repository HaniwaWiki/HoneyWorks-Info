import type { RssInfo } from '@/views/Tools/GeriraLiveQuery/helper/type';

export function parseRss(xmlStr: string): RssInfo[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlStr, 'application/xml');
  const items = Array.from(doc.querySelectorAll('item'));
  return items.map((item) => {
    const title = item.querySelector('title')!.textContent!;
    const description = item.querySelector('description')!.textContent!;
    const link = item.querySelector('link')!.textContent!;
    const pubDate = new Date(item.querySelector('pubDate')!.textContent!);
    return {
      title,
      description,
      link,
      pubDate,
    };
  });
}

import type { GeriraInfo, RssInfo } from '@/views/Tools/GeriraLiveQuery/helper/type';
import { removeHtmlTags } from '@/utils/removeHtmlTags';

/**
 * fix geriraTimeLimit to current timestamp
 * the core of algorithm is "Twitter pubDate < gerira end date <= Twitter pubDate + 1hr"
 */
function fixGeriraEndTimeZone(geriraEndTimeText: string, pubdate: Date): Date {
  const fixedPubDate = new Date(pubdate);
  const minute = Number(geriraEndTimeText.split(':')[1]);
  if (minute <= fixedPubDate.getMinutes())
    fixedPubDate.setHours(fixedPubDate.getHours() + 1);

  fixedPubDate.setMinutes(minute);
  return fixedPubDate;
}

const geriraExpireTime = {
  1: 60 * 60 * 1000,
  2: 45 * 60 * 1000,
  3: 30 * 60 * 1000,
};

export function parseGerira({
  description,
  pubDate,
}: RssInfo): GeriraInfo | null {
  const now = new Date();
  const msg = removeHtmlTags(description);

  // check gerira tag
  if (!msg.includes('#ゲリラライブ'))
    return null;

  // check whether expired by (now - pubdate)
  if (now.getTime() - pubDate.getTime() > geriraExpireTime[1])
    return null;

  // get gerira level
  const geriraLvExecArray = /Lv(\d)/.exec(description);
  if (!geriraLvExecArray)
    return null;

  const level = Number(geriraLvExecArray[1]) as GeriraInfo['level'];

  // get gerira id
  const geriraIdExecArray = /ゲリラ招待ID:(\d+)/.exec(description);
  if (!geriraIdExecArray)
    return null;

  const roomId = geriraIdExecArray[1];

  // get gerira end time
  const geriraEndTimeExecArray = /期限:([\d :/]+)/.exec(description);
  if (!geriraEndTimeExecArray)
    return null;

  const geriraEndTimeText = geriraEndTimeExecArray[1];
  const endTime = fixGeriraEndTimeZone(geriraEndTimeText, pubDate);

  return {
    level,
    roomId,
    endTime,
  };
}

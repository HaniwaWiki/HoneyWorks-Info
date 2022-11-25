import type { Dictionary } from '@/types/common';

type DateTimeFormats = Dictionary<Dictionary<Intl.DateTimeFormatOptions>>;

const commonDateTimeFormats: Dictionary<Intl.DateTimeFormatOptions> = {
  date: {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  },
  time: {
    hour: 'numeric',
    minute: 'numeric',
  },
  short: {
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  },
};

export const datetimeFormats: DateTimeFormats = {
  en: {
    ...commonDateTimeFormats,
    long: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      weekday: 'short',
      hour: 'numeric',
      minute: 'numeric',
    },
  },
  ja: {
    ...commonDateTimeFormats,
    long: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      weekday: 'short',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    },
  },
  zh_Hans: {
    ...commonDateTimeFormats,
    long: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      weekday: 'short',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    },
  },
};

/*
  Weblate gives language code like 'zh_Hans', but `Intl.DateTimeFormat` only accepts 'zh-Hans'.
  The workaround is to wrap `Intl.DateTimeFormat` to correct this.
 */
const correctMap: Dictionary<string> = {
  zh_Hans: 'zh-Hans',
};

const oldDateTimeFormat = Intl.DateTimeFormat;

// @ts-expect-error see comments before correctMap
Intl.DateTimeFormat = function (locale: string, ...args: any[]) {
  if (locale in correctMap)
    locale = correctMap[locale];

  return oldDateTimeFormat(locale, ...args);
};
Intl.DateTimeFormat.supportedLocalesOf = oldDateTimeFormat.supportedLocalesOf;

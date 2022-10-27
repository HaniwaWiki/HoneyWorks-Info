import { Dictionary } from '@/types/common';
import { supportedLocaleMap } from '@/i18n/supportedLocales';

type DateTimeFormats = Dictionary<Dictionary<Intl.DateTimeFormatOptions>>;

export const datetimeFormats: DateTimeFormats = {
  en: {
    short: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    },
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
    short: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    },
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
    short: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    },
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
// @ts-ignore
// eslint-disable-next-line func-names
Intl.DateTimeFormat = function (locale: string, ...args: any[]) {
  if (locale in correctMap) {
    // eslint-disable-next-line no-param-reassign
    locale = correctMap[locale];
  }
  return oldDateTimeFormat(locale, ...args);
};
Intl.DateTimeFormat.supportedLocalesOf = oldDateTimeFormat.supportedLocalesOf;

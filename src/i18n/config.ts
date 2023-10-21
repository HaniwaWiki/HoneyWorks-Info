import type { LocaleConfig } from '../types/i18n';
import en_i18n from './locale/en.json';
import ja_i18n from './locale/ja.json';
import zh_hans_i18n from './locale/zh_Hans.json';

export const localeConfigs: LocaleConfig[] = [
  {
    id: 'en',
    name: 'English',
    content: en_i18n,
  },
  {
    id: 'ja',
    name: '日本語',
    content: ja_i18n,
  },
  {
    id: 'zh_Hans',
    name: '简体中文',
    content: zh_hans_i18n,
  },
];

export const defaultLocale = 'en';

export const supportedLocales = localeConfigs.map(config => config.id);

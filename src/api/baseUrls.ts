import { isDevelopment } from '@/config';

export const supportedServers = ['jp', 'cn'] as const;
export type SupportedServer = typeof supportedServers[number];
export const defaultServer = 'jp';

let _server: SupportedServer = defaultServer;
export function setBaseUrlsByServer(newServer: SupportedServer) {
  _server = newServer;
}

type BaseUrlCollection = {
  staticApiBaseUrl: string;
  apiBaseUrl: string;
  assetsBaseUrl: string;
  localeBaseUrl: string;
  rssHubBaseUrl: string;
};

const baseUrlCollections: Record<SupportedServer, BaseUrlCollection> = {
  jp: {
    staticApiBaseUrl: 'https://static-api-jp.honeyworks.info/api',
    apiBaseUrl: 'https://api-jp.honeyworks.info/api',
    assetsBaseUrl: 'https://assets-jp.honeyworks.info/assets',
    localeBaseUrl: isDevelopment ? '/locale' : 'https://i18n-jp.honeyworks.info/locale',
    rssHubBaseUrl: 'https://rsshub-jp.honeyworks.info',
  },
  cn: {
    staticApiBaseUrl: 'https://honeyworks-info-cn.lyh543.cn/api',
    apiBaseUrl: 'https://api-jp.honeyworks.info/api',
    assetsBaseUrl: 'https://honeyworks-info-cn.lyh543.cn/assets',
    localeBaseUrl: isDevelopment ? '/locale' : 'https://honeyworks-info-cn.lyh543.cn/locale',
    rssHubBaseUrl: 'https://rsshub-jp.honeyworks.info',
  },
};

export function getBaseUrls() {
  return baseUrlCollections[_server];
}

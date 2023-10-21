export const supportedServers = ['jp', 'cn', 'cn-nas'] as const;
export type SupportedServer = typeof supportedServers[number];
export const defaultServer = 'jp';

let _server: SupportedServer = defaultServer;
export function setBaseUrlsByServer(newServer: SupportedServer) {
  _server = newServer;
}

type BaseUrlCollection = {
  staticApiBaseUrl: string;
  assetsBaseUrl: string;
  rssHubBaseUrl: string;
};

const baseUrlCollections: Record<SupportedServer, BaseUrlCollection> = {
  'jp': {
    staticApiBaseUrl: 'https://static-api-jp.honeyworks.info/api',
    assetsBaseUrl: 'https://assets-jp.honeyworks.info/assets',
    rssHubBaseUrl: 'https://rsshub-jp.honeyworks.info',
  },
  'cn': {
    staticApiBaseUrl: 'https://honeyworks-info-cn.lyh543.cn/api',
    assetsBaseUrl: 'https://honeyworks-info-cn.lyh543.cn/assets',
    rssHubBaseUrl: 'https://rsshub-jp.honeyworks.info',
  },
  'cn-nas': {
    staticApiBaseUrl: 'https://honeyworks-info-cn-nas.lyh543.cn/api',
    assetsBaseUrl: 'https://honeyworks-info-cn-nas.lyh543.cn/assets',
    rssHubBaseUrl: 'https://rsshub-jp.honeyworks.info',
  },
};

export function getBaseUrls() {
  return baseUrlCollections[_server];
}

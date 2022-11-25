export const isDevelopment = process.env.NODE_ENV === 'development';

export function getBaseUrls() {
  return {
    staticApiBaseUrl: `https://static-api-jp.honeyworks.info/api`,
    apiBaseUrl: `https://api-jp.honeyworks.info/api`,
    assetsBaseUrl: 'https://assets-jp.honeyworks.info/assets',
    localeBaseUrl: isDevelopment
      ? '/locale'
      : 'https://i18n-jp.honeyworks.info/locale',
    rssHubBaseUrl: 'https://rsshub-jp.honeyworks.info',
  };
}

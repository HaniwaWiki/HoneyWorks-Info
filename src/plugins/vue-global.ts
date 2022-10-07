/* eslint-disable no-param-reassign */
import Vue from 'vue';
import { getCharacterCardImageUrl } from '@/utils/assetUtils/url/characterCard';
import { getSceneCardImageUrl } from '@/utils/assetUtils/url/sceneCard';
import { getCharacterImageUrl } from '@/utils/assetUtils/url/character';

// fixme: bindGlobal does work, but JetBrains IDEs cannot recognize it.
declare module 'vue' {
  interface ComponentCustomProperties {
    getCharacterImageUrl: typeof getCharacterImageUrl;
    getCharacterCardImageUrl: typeof getCharacterCardImageUrl;
    getSceneCardImageUrl: typeof getSceneCardImageUrl;
  }
}

const bindGlobal = {
  install(app: Vue.App<Element>) {
    app.config.globalProperties.getCharacterImageUrl = getCharacterImageUrl;
    app.config.globalProperties.getCharacterCardImageUrl =
      getCharacterCardImageUrl;
    app.config.globalProperties.getSceneCardImageUrl = getSceneCardImageUrl;
  },
};

export default bindGlobal;

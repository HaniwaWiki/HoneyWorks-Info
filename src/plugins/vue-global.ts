/* eslint-disable no-param-reassign */
import Vue from 'vue';
import { getCharacterCardImageUrl } from '@/utils/assetUtils/url/characterCard';
import { getSceneCardImageUrl } from '@/utils/assetUtils/url/sceneCard';

// fixme: bindGlobal does work in Vue.js, but JetBrains IDEs cannot recognize it.
declare module 'vue' {
  interface ComponentCustomProperties {
    getCharacterCardImageUrl: typeof getCharacterCardImageUrl;
    getSceneCardImageUrl: typeof getSceneCardImageUrl;
  }
}

const bindGlobal = {
  install(app: Vue.App<Element>) {
    app.config.globalProperties.getCharacterCardImageUrl =
      getCharacterCardImageUrl;
    app.config.globalProperties.getSceneCardImageUrl = getSceneCardImageUrl;
  },
};

export default bindGlobal;

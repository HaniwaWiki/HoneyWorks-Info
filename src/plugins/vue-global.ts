import type Vue from 'vue';
import { getCharacterCardImageUrl } from '@/utils/hwpl/CharacterCard/url';
import { getSceneCardImageUrls } from '@/utils/hwpl/SceneCard/url';

// fixme: bindGlobal does work in Vue.js, but JetBrains IDEs cannot recognize it.
declare module 'vue' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface ComponentCustomProperties {
    getCharacterCardImageUrl: typeof getCharacterCardImageUrl;
    getSceneCardImageUrl: typeof getSceneCardImageUrls;
  }
}

const bindGlobal = {
  install(app: Vue.App<Element>) {
    app.config.globalProperties.getCharacterCardImageUrl
      = getCharacterCardImageUrl;
    app.config.globalProperties.getSceneCardImageUrl = getSceneCardImageUrls;
  },
};

export default bindGlobal;

<script setup lang='ts'>
import { onMounted, ref } from 'vue';
import { getSceneCardImageUrls } from '../../utils/hwpl/SceneCard/url';
import VideoPlayer from '../base/VideoPlayer.vue';
import { dynamicSceneCardResourceOption } from '../base/ResourceTabs/Resource';
import { getGachaImageUrls } from '../../utils/hwpl/Gacha/url';
import type { GachaBoxInfo } from '../../composables/hwpl/useGachaBoxInfoList';
import { getCharacterCardImageUrl } from '../../utils/hwpl/CharacterCard/url';
import type { CharacterCard } from '../../types/HWPL/CharacterCard';
import asyncComputed from '../../utils/asyncComputed';

type Props = {
  gachaBoxInfo: GachaBoxInfo;
  preferDynamicImage?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  preferDynamicImage: false,
});

const backgroundUrl = ref('');
const backgroundIsDynamic = ref(false);

const logoUrl = asyncComputed(async () => {
  const { logo } = await getGachaImageUrls(props.gachaBoxInfo.Id);
  return logo ?? '';
}, '');

async function updateBackgroundByCharacterCard(characterCard?: CharacterCard) {
  // if character or scene card doesn't exist, don't update
  if (!characterCard?.RankUpSceneCardId)
    return '';

  const sceneCardImages = await getSceneCardImageUrls(characterCard.RankUpSceneCardId);
  backgroundIsDynamic.value = !!(props.preferDynamicImage && sceneCardImages.dynamic);
  backgroundUrl.value = backgroundIsDynamic.value
    ? sceneCardImages.dynamic!
    : sceneCardImages.static;
  return backgroundUrl.value;
}

// show background of the first character card
// use gacha image as fallback (only the earliest gacha doesn't have character card)
onMounted(async () => {
  const url = await updateBackgroundByCharacterCard(props.gachaBoxInfo.CharacterCards[0]);
  if (!url) {
    backgroundUrl.value = (await getGachaImageUrls(props.gachaBoxInfo.Id)).background || '';
    backgroundIsDynamic.value = false;
  }
});
</script>

<template>
  <div class="position-relative">
    <VideoPlayer
      v-if="backgroundIsDynamic"
      v-bind="dynamicSceneCardResourceOption"
      :url="backgroundUrl"
    />
    <v-img
      v-else
      :src="backgroundUrl"
      :aspect-ratio="16 / 9"
      cover
    />
    <img
      v-if="logoUrl"
      :src="logoUrl"
      alt="logo"
      class="logo"
    >
    <div class="icons-wrapper">
      <img
        v-for="characterCard in props.gachaBoxInfo.CharacterCards"
        :key="characterCard.Id"
        v-ripple.prevent
        class="hwpl-icon elevation-4"
        :src="getCharacterCardImageUrl({ Id: characterCard.Id, icon: true })"
        :alt="characterCard.Name"
        @click.prevent="updateBackgroundByCharacterCard(characterCard)"
      >
    </div>
  </div>
</template>

<style lang='scss' scoped>
.icons-wrapper {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.logo {
  position: absolute;
  width: 40%;
  bottom: 0;
  left: 0;
}

.hwpl-icon {
  position: relative;
  margin-right: 1%;
  margin-bottom: 1%;
  width: 16%;
}
</style>

<script setup lang='ts'>
import { computed, onMounted, ref } from 'vue';
import { getSceneCardImageUrls } from '../../utils/hwpl/SceneCard/url';
import VideoPlayer from '../base/VideoPlayer.vue';
import { dynamicSceneCardResourceOption } from '../base/ResourceTabs/Resource';
import { getGachaImageUrls } from '../../utils/hwpl/Gacha/url';
import type { GachaBoxInfo } from '../../composables/hwpl/useGachaBoxInfoList';
import { getCharacterCardImageUrl } from '../../utils/hwpl/CharacterCard/url';
import type { CharacterCard } from '../../types/HWPL/CharacterCard';

type Props = {
  gachaBoxInfo: GachaBoxInfo;
  preferDynamicImage?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  preferDynamicImage: false,
});

const backgroundUrl = ref('');
const backgroundIsDynamic = computed(() => backgroundUrl.value.endsWith('.mp4'));

async function setBackgroundByCharacterCard(characterCard?: CharacterCard) {
  // use gacha image as fallback
  // currently, only the first gacha doesn't have character card
  if (characterCard === undefined) {
    backgroundUrl.value = (await getGachaImageUrls(props.gachaBoxInfo.Id)).background || '';
  }
  else {
    const sceneCardImages = await getSceneCardImageUrls(characterCard.RankUpSceneCardId!);
    backgroundUrl.value = props.preferDynamicImage && sceneCardImages.dynamic
      ? sceneCardImages.dynamic
      : sceneCardImages.static;
  }
}
// show background of the first character card
onMounted(() => setBackgroundByCharacterCard(props.gachaBoxInfo.CharacterCards[0]));
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
    <div class="icons-wrapper">
      <img
        v-for="characterCard in props.gachaBoxInfo.CharacterCards"
        :key="characterCard.Id"
        v-ripple.prevent
        class="hwpl-icon elevation-4"
        :src=" getCharacterCardImageUrl({ Id: characterCard.Id, icon: true })"
        :alt="characterCard.Name"
        @click.prevent="setBackgroundByCharacterCard(characterCard)"
      >
    </div>
  </div>
</template>

<style lang='scss' scoped>
.icons-wrapper {
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: flex-end;
}

.hwpl-icon {
  position: relative;
  margin-right: 1%;
  margin-bottom: 1%;
  width: 20%;
  height: 20%;
}
</style>

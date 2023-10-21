<script setup lang="ts">
import { emit } from 'process';
import { computed, onMounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import type { SceneCardInfo } from '@/composables/hwpl/useSceneCardInfoList';
import SceneCardDetailGeneral from '@/views/Info/SceneCards/SceneCardDetail/helper/SceneCardDetailGeneral.vue';
import HwplSceneCardImage from '@/components/hwpl/HwplSceneCardImage.vue';
const props = defineProps<{
  sceneList?: SceneCardInfo[];
}>();

const { t } = useI18n();
</script>

<template>
  <v-card :title="$t('album.scene_cards')">
    <v-row>
      <v-col
        v-for="(item, i) in props.sceneList"
        :key="i"
        cols="4"
        :value="item"
      >
        <HwplSceneCardImage :scene-id="item.ItemId" :name="item.Name" />
      </v-col>
    </v-row>
  </v-card>
</template>

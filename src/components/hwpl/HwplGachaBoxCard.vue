<script setup lang='ts'>
import { computed } from 'vue';
import type { RouteLocationRaw } from 'vue-router';
import type { GachaBoxInfo } from '../../composables/hwpl/useGachaBoxInfoList';
import HwplGachaBoxCardImageWithLogo from './HwplGachaBoxCardImage.vue';

type Props = {
  gachaBoxInfo: GachaBoxInfo;
  toDetail?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  toDetail: false,
});

const to = computed<RouteLocationRaw | undefined>(() => props.toDetail
  ? {
      name: 'Gacha Detail',
      params: { id: props.gachaBoxInfo.Id },
    }
  : undefined);
</script>

<template>
  <v-card :to="to">
    <HwplGachaBoxCardImageWithLogo
      :gacha-box-info="gachaBoxInfo"
      prefer-dynamic-image
    />
    <v-card-title>
      {{ gachaBoxInfo.Name }}
    </v-card-title>
    <v-card-subtitle class="pb-2 text-wrap">
      {{ $d(gachaBoxInfo.Term.StartAt * 1000, 'normal') }} ~ {{ $d(gachaBoxInfo.Term.EndedAt * 1000, 'normal') }}
    </v-card-subtitle>
  </v-card>
</template>

<style lang='scss'>
</style>

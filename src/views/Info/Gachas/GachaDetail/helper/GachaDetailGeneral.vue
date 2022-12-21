<script setup lang="ts">
import { computed, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
import type { VuetifyListItem } from '../../../../../types/vuetify/listItem';
import type { GachaBoxInfo } from '../../../../../composables/hwpl/useGachaBoxInfoList';

const props = defineProps<{
  gachaBoxInfo: GachaBoxInfo | null;
}>();

const { gachaBoxInfo } = toRefs(props);

const { d, t } = useI18n();

const listItems = computed<VuetifyListItem[]>(() => {
  if (!gachaBoxInfo.value)
    return [];

  return [
    {
      prependIcon: 'mdi-music-accidental-sharp',
      title: gachaBoxInfo.value?.Id,
      subtitle: t('gacha.id'),
    },
    {
      prependIcon: 'mdi-inbox',
      title: gachaBoxInfo.value?.Name,
      subtitle: t('gacha.title'),
    },
    {
      prependIcon: 'mdi-clock-outline',
      title: d(gachaBoxInfo.value.Term.StartAt * 1000, 'long'),
      subtitle: t('gacha.start_at'),
    },
    {
      prependIcon: 'placeholder',
      title: d(gachaBoxInfo.value.Term.EndedAt * 1000, 'long'),
      subtitle: t('gacha.end_at'),
    },
  ];
});
</script>

<template>
  <v-card :title="$t('gacha.general')">
    <v-list
      class="icon-primary"
      :items="listItems"
      color="primary"
      item-props
      lines="two"
    >
      <template #title="{ title }">
        <div class="text-pre-wrap" v-text="title" />
      </template>
    </v-list>
  </v-card>
</template>

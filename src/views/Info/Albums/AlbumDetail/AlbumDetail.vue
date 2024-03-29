<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { computed, onMounted, onUpdated, unref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { useNearbyPage } from './useNearbyPage';
import AlbumDetailSkill from './helper/AlbumDetailSkill.vue';
import helperGetSceneCardList from './helper/helperGetSceneCardList.vue';
import { useAlbumInfoList } from '@/composables/hwpl/useAlbumInfoList';
import { getAlbumUrl } from '@/utils/hwpl/Album/url';
import AppScaffold from '@/components/app/AppScaffold/AppScaffold.vue';
const route = useRoute();
const albumCardId = computed(() => Number(route.params.id));
const { t, d } = useI18n();

const { loading, albumInfoList } = useAlbumInfoList();

const album = computed(() =>
  albumInfoList.value.find(album => album.Id === albumCardId.value),
);

const inforList = computed(() => {
  if (album.value?.Type) {
    return [
      {
        prependIcon: 'mdi-music-accidental-sharp',
        text: album.value?.Id,
        subtitle: t('album.id'),
      },
      {
        prependIcon: 'mdi-text-short',
        text: album.value?.Name,
        subtitle: t('album.name'),
      },
      {
        prependIcon: 'mdi-syllabary-hiragana',
        text: album.value?.HiraganaName,
        subtitle: t('album.hiragana_name'),
      },
      {
        prependIcon: 'mdi-calendar',
        text: d(new Date(album.value.VersionId * 1000), 'long'),
        subtitle: t('album.version_id'),
      },
      {
        prependIcon: 'mdi-image-area',
        text: t(`album.type_${album.value?.Type}`),
        subtitle: t('album.type'),
      },
    ];
  }
  return [];
});

const nearbyPage = useNearbyPage(albumCardId);
</script>

<template>
  <AppScaffold
    :title="album?.Name"
    :subtitle="album?.HiraganaName"
    :nearby-page="nearbyPage"
  >
    <v-card>
      <v-img
        :src="getAlbumUrl(album?.ThumbnailImageIdentifier ?? 0)"
        :aspect-ratio="16 / 9"
      />
    </v-card>

    <v-card :title="$t('album.general')">
      <v-list>
        <v-list-item
          v-for="(item, i) in inforList"
          :key="i"
          :value="item"
          color="primary"
          item-props
          lines="two"
          :prepend-icon="item.prependIcon"
        >
          <v-list-item-title>
            {{ item.text }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ item.subtitle }}
          </v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </v-card>

    <AlbumDetailSkill
      :skill1="album?.Skill1Id"
      :skill2="album?.Skill2Id"
      :skill3="album?.Skill3Id"
      :scene-count="album?.SceneCount"
    />

    <helperGetSceneCardList :scene-list="album?.SceneCardInfo" />
  </AppScaffold>
</template>

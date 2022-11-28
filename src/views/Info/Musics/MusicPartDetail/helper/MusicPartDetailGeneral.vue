<script setup lang="ts">
import { computed, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
import type { VuetifyListItem } from '../../../../../types/vuetify/listItem';
import type { MdiIcons } from '../../../../../types/mdi';
import type { MusicPart } from '../../../../../types/HWPL/MusicPart';
import type { Song } from '../../../../../types/HWPL/Song';
import type { Singer } from '../../../../../types/HWPL/Singer';
import type { Music } from '../../../../../types/HWPL/Music';
import type { MusicalScore } from '../../../../../types/HWPL/MusicalScore';
import { formatSeconds } from '../../../../../utils/time';

const props = defineProps<{
  musicPart: MusicPart | null;
  music: Music | null;
  song: Song | null;
  singer: Singer | null;
  musicalScores: MusicalScore[];
}>();

const { music, musicPart, song, singer, musicalScores } = toRefs(props);

const { d, t } = useI18n();

const listItems = computed<VuetifyListItem[]>(() => [
  {
    prependIcon: 'mdi-music-accidental-sharp',
    title: musicPart.value?.Id,
    subtitle: t('music_part.id'),
  },
  {
    prependIcon: 'mdi-music',
    title: song.value?.Name,
    subtitle: t('music_part.song_name'),
  },
  {
    prependIcon: 'mdi-place_holder' as MdiIcons,
    title: song.value?.HiraganaName,
    subtitle: t('music_part.song_hiragana_name'),
  },
  {
    prependIcon: 'mdi-music-note',
    title: musicPart.value?.Name,
    subtitle: t('music_part.part_name'),
  },
  {
    prependIcon: 'mdi-microphone-variant',
    title: singer.value?.Name,
    subtitle: t('music_part.singer_name'),
  },
  {
    prependIcon: 'mdi-place_holder' as MdiIcons,
    title: song.value?.Composer,
    subtitle: t('music_part.composer'),
  },
  {
    prependIcon: 'mdi-place_holder' as MdiIcons,
    title: song.value?.Songwriter,
    subtitle: t('music_part.songwriter'),
  },
  {
    prependIcon: 'mdi-timer-play',
    title: musicalScores.value.length > 0 ? formatSeconds(musicalScores.value[0].MusicTime) : '',
    subtitle: t('music_part.music_time'),
  },
  {
    prependIcon: 'mdi-calendar',
    title: music.value ? d(new Date(music.value.VersionId * 1000), 'long') : '',
    subtitle: t('music_part.updated_at'),
  },
  // {
  //   prependIcon: 'mdi-account-voice',
  //   title: character.value?.VoiceActor,
  //   subtitle: t('character.character_voice'),
  // },
  // {
  //   prependIcon: 'mdi-human-male-height',
  //   title: character.value?.Height,
  //   subtitle: t('character.height'),
  // },
  // {
  //   prependIcon: 'mdi-cake-variant',
  //   title: parseCharacterBirthday(character.value).join('/'),
  //   subtitle: t('character.birthday'),
  // },
  // {
  //   prependIcon: 'mdi-star-david',
  //   title: character.value?.Constellation,
  //   subtitle: t('character.constellation'),
  // },
  // {
  //   prependIcon: 'mdi-water',
  //   title: character.value?.BloodType,
  //   subtitle: t('character.blood_type'),
  // },
  // { type: 'divider', inset: true },
  // {
  //   prependIcon: 'mdi-text-long',
  //   title: character.value?.Description.replaceAll('<br>', '\n'),
  //   subtitle: t('character.description'),
  // },
]);
</script>

<template>
  <v-card :title="$t('music_part.general')">
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

<script setup lang="ts">
import { computed, ref } from 'vue';
import type { Skill } from '@/types/HWPL/Skill';
import { getSkillInfo } from '@/utils/hwpl/Skill';
import HwplTagGroup from '@/components/hwpl/HwplTag/HwplTagGroup.vue';
import type { Tag } from '@/types/HWPL/Tag';
import { useFirstOfCollection } from '@/composables/useCollection';
import HwplAlbumSkillTypeIcon from '@/assets/skill_icon/HwplAlbumSkillTypeIcon.vue';

const props = defineProps<{
  skillDetail: Skill | undefined;
  sceneCount: number | undefined;
}>();

const selectedLevel = ref(1);

const skillName = computed(() => props.skillDetail?.Name);

const skillInfo = computed(() =>
  props.skillDetail
    ? getSkillInfo(props.skillDetail!, selectedLevel.value)
    : undefined,
);

const tagList = computed(() =>
  props.skillDetail?.Arg7 === undefined || props.skillDetail?.Arg7 === null
    ? undefined
    : props.skillDetail?.Arg7.split(',').map(Number),
);

const result = computed(() =>
  tagList.value === undefined
    ? undefined
    : tagList.value!.map(item => useFirstOfCollection('Tags', { Id: item })),
);

// console.log(tagInfoList);
</script>

<template>
  <v-card>
    <template #title>
      <span v-t="'global.skill'" class="mr-10" />
      <span>{{ skillName }}</span>
    </template>

    <div class="px-4">
      <div class="text-caption">
        <span v-t="'skill.skill_level'" class="mr-2" />
        <span>{{ selectedLevel }}</span>
      </div>
      <v-slider
        v-if="skillInfo?.type !== 90"
        v-model="selectedLevel"
        prepend-icon="mdi-star"
        thumb-label
        color="primary"
        :min="1"
        :max="sceneCount"
        :step="1"
      />
    </div>
    <v-list class="icon-primary" color="primary" item-props lines="two">
      <v-list-item prepend-icon="mdi-shield-plus" :subtitle="$t('skill.type')">
        <template #title>
          <div class="d-flex">
            <span>
              {{ skillInfo?.translated_type }}
            </span>
            <div class="d-flex mx-1">
              <HwplAlbumSkillTypeIcon
                v-if="skillDetail"
                class="d-inline"
                :skill-type="skillDetail"
              />
            </div>
          </div>
        </template>
      </v-list-item>

      <v-list-item prepend-icon="mdi-text" :subtitle="$t('skill.description')">
        <template #title>
          <!-- eslint-disable-next-line -->
          <div class="text-pre-wrap" v-html="skillInfo?.description" />
        </template>
      </v-list-item>

      <v-list-item prepend-icon="mdi-tag" :subtitle="$t('global.tags')">
        <template #title>
          <!-- <HwplTagGroup v-if="skillDetail" :tag-ids="skillDetail.Arg7" /> -->
          <div v-if="result" class="hwpl-tag-group">
            <v-chip
              v-for="tag in result"
              :key="tag.item.value?.Id"
              :item="tag.item"
            >
              {{ tag.item.value?.Name }}
            </v-chip>
          </div>
          <div v-else class="hwpl-tag-group">
            {{ $t("album.no_tag") }}
          </div>
        </template>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<style class="scss" scoped>
.hwpl-tag-group {
  display: flex;
  flex-flow: wrap;
}
</style>

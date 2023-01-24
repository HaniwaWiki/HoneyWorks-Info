<script setup lang="ts">
import { computed, ref } from 'vue';
import type { Skill } from '@/types/HWPL/Skill';
import { getSkillInfo } from '@/utils/hwpl/Skill';
import HwplTagGroup from '@/components/hwpl/HwplTag/HwplTagGroup.vue';
import type { Tag } from '@/types/HWPL/Tag';
import { useFirstOfCollection } from '@/composables/useCollection';
const props = defineProps<{
  skillDetail: Skill | undefined;
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
  <span v-t="'global.skill'" class="mr-10" />
  <span>{{ skillName }}</span>
  <div class="px-4">
    <div class="text-caption">
      <span v-t="'skill.skill_level'" class="mr-2" />
      <span>{{ selectedLevel }}</span>
    </div>
    <v-slider
      v-model="selectedLevel"
      prepend-icon="mdi-star"
      thumb-label
      color="primary"
      :min="1"
      :max="5"
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
            <HwplSkillTypeIcon
              v-if="skillInfo"
              class="d-inline"
              :skill-type="skillInfo.type"
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
        <div class="hwpl-tag-group">
          <v-chip
            v-for="tag in result"
            :key="tag.item.value?.Id"
            :item="tag.item"
          >
            {{ tag.item.value?.Name }}
          </v-chip>
        </div>
      </template>
    </v-list-item>
  </v-list>
</template>

<style class="scss" scoped>
.hwpl-tag-group {
  display: flex;
  flex-flow: wrap;
}
</style>

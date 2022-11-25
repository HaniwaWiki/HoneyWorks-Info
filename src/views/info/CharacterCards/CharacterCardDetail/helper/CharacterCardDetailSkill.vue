<script setup lang="ts">
import { computed, ref } from 'vue';
import type { CharacterCard } from '@/types/HWPL/CharacterCard';
import { useCollection } from '@/composables/useCollection';
import { getSkillInfo } from '@/utils/hwpl/Skill';

const props = defineProps<{
  characterCard: CharacterCard | null;
}>();

const selectedLevel = ref(1);

const skills = useCollection('Skills');
const skill = computed(() =>
  skills.collection.value.find(s => s.Id === props.characterCard?.SkillId),
);

const skillName = computed(() => skill.value?.Name);
const skillInfo = computed(() =>
  skill.value ? getSkillInfo(skill.value!, selectedLevel.value) : undefined,
);
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
        v-model="selectedLevel"
        prepend-icon="mdi-star"
        thumb-label
        color="primary"
        :min="1"
        :max="5"
        :step="1"
      />
    </div>
    <!-- eslint-disable-next-line -->
    <v-list class="icon-primary" color="primary" item-props lines="two">
      <v-list-item
        prepend-icon="mdi-shield-plus"
        :title="skillInfo?.translated_type"
        :subtitle="$t('skill.type')"
      />
      <v-list-item prepend-icon="mdi-text" :subtitle="$t('skill.description')">
        <template #title>
          <!-- eslint-disable-next-line -->
          <div class="text-pre-wrap" v-html="skillInfo?.description" />
        </template>
      </v-list-item>
    </v-list>
  </v-card>
</template>

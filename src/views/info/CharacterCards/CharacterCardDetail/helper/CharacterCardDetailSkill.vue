<template>
  <v-card :title="'Skill&nbsp;&nbsp;&nbsp;&nbsp;' + skillName">
    <div class="px-4">
      <div class="text-caption">Skill Level</div>
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
        :title="skillInfo?.type"
        subtitle="Type"
      />
      <v-list-item prepend-icon="mdi-text" subtitle="Description">
        <template #title>
          <!-- eslint-disable-next-line -->
          <div class="text-pre-wrap" v-html="skillInfo?.description" />
        </template>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script setup lang="ts">
import { CharacterCard } from '@/types/HWPL/CharacterCard';
import { computed, ref } from 'vue';
import { useCollection } from '@/composables/useCollection';
import { getSkillInfo } from '@/utils/hwpl/Skill/common';

const props = defineProps<{
  characterCard: CharacterCard | null;
}>();

const selectedLevel = ref(1);

const skills = useCollection('Skills');
const skill = computed(() =>
  skills.collection.value.find((s) => s.Id === props.characterCard?.SkillId)
);

const skillName = computed(() => skill.value?.Name);
const skillInfo = computed(() =>
  skill.value ? getSkillInfo(skill.value!, selectedLevel.value) : undefined
);
</script>

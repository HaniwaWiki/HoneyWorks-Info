<script setup lang="ts">
import { computed, ref } from 'vue';
import helperGetSkillDetail from './helperGetSkillDetail.vue';
import { useCollection } from '@/composables/useCollection';

const props = defineProps<{
  skill1: number | undefined;
  skill2: number | undefined;
  skill3: number | undefined;
}>();

const skills = useCollection('Skills');

const skill1Detail = computed(() =>
  skills.collection.value.find(
    (skill: { Id: number | undefined; }) => skill.Id === props.skill1,
  ),
);
const skill2Detail = computed(() =>
  skills.collection.value.find(
    (skill: { Id: number | undefined; }) => skill.Id === props.skill2,
  ),
);
const skill3Detail = computed(() =>
  skills.collection.value.find(
    (skill: { Id: number | undefined; }) => skill.Id === props.skill3,
  ),
);
</script>

<template>
  <v-card :title="$t('album.skill_info')">
    <v-container v-if="skill1Detail">
      <helperGetSkillDetail :skill-detail="skill1Detail" />
    </v-container>
    <v-divider />
    <v-container v-if="skill2Detail">
      <helperGetSkillDetail :skill-detail="skill2Detail" />
    </v-container>
    <v-divider />
    <v-container v-if="skill3Detail">
      <helperGetSkillDetail :skill-detail="skill3Detail" />
    </v-container>
  </v-card>
</template>

import { ref, Ref } from 'vue';
import { useTranslation } from '@/composables/useTranslation';

export function translateSkillType(type: number): Ref<string> {
  return useTranslation(`skill.typename.${type}`);
}

// todo: translate skill description
export function translateSkillDescription(skillId: number): Ref<string> {
  return ref(skillId.toString());
}

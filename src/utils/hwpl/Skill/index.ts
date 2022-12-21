import type { Skill } from '@/types/HWPL/Skill';
import { getSkillInfoHelper } from '@/utils/hwpl/Skill/skillInfoHelper';
import type { SkillInfo } from '@/utils/hwpl/Skill/types';
import {
  translateSkillDescription,
  translateSkillType,
} from '@/utils/hwpl/Skill/translate';

export function getSkillInfo(skill: Skill, level: number): SkillInfo {
  const helper = getSkillInfoHelper(skill.Class);

  return {
    type: skill.Class,
    translated_type: translateSkillType(skill.Class).value,
    description: helper.substituteDescriptionArgs(
      skill.Description,
      skill,
      level,
    ),
    translated_description: helper.substituteDescriptionArgs(
      translateSkillDescription(skill.Id).value,
      skill,
      level,
    ),
    tagIds: helper.getTagIds(skill),
  };
}

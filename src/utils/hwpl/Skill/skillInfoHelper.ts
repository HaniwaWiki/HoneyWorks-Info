import { Skill } from '@/types/HWPL/Skill';
import { calculateValues, replaceValues } from '@/utils/hwpl/Skill/helper';
import { SkillInfoHelper } from '@/utils/hwpl/Skill/types';
import { translateSkillDescription } from '@/utils/hwpl/Skill/translate';
import { useTranslation } from '@/composables/useTranslation';

const skillInfoHelperMap: { [skillClass: number]: SkillInfoHelper } = {
  1: {
    substituteDescriptionArgs: (description, skill, level) =>
      replaceValues(
        description,
        calculateValues(
          [skill.Arg1, skill.Arg3, skill.Arg5],
          [skill.Arg2, skill.Arg4, skill.Arg6],
          level
        )
      ),
    getTagIds: (skill) => skill.Arg7.split(',').map(Number),
  },

  11: {
    substituteDescriptionArgs: (description, skill, level) =>
      replaceValues(
        description,
        calculateValues(
          [skill.Arg1, skill.Arg3],
          [skill.Arg2, skill.Arg4],
          level
        )
      ),
    getTagIds: () => [],
  },

  21: {
    substituteDescriptionArgs: (description, skill, level) =>
      replaceValues(
        description,
        calculateValues([skill.Arg1], [skill.Arg2], level)
      ),
    getTagIds: () => [],
  },

  31: {
    substituteDescriptionArgs: (description, skill, level) =>
      replaceValues(
        description,
        calculateValues([skill.Arg1], [skill.Arg2], level)
      ),
    getTagIds: () => [],
  },

  32: {
    substituteDescriptionArgs: (description, skill, level) =>
      replaceValues(
        description,
        calculateValues([skill.Arg1], [skill.Arg2], level)
      ),
    getTagIds: () => [],
  },

  40: {
    substituteDescriptionArgs: (description, skill, level) =>
      replaceValues(
        description,
        calculateValues([skill.Arg1], [skill.Arg2], level)
      ),
    getTagIds: () => [],
  },

  41: {
    substituteDescriptionArgs: (description, skill, level) =>
      replaceValues(
        description,
        calculateValues(
          [skill.Arg1, skill.Arg3],
          [skill.Arg2, skill.Arg4],
          level
        )
      ),
    getTagIds: () => [],
  },

  42: {
    substituteDescriptionArgs: (description, skill, level) =>
      replaceValues(
        description,
        calculateValues([skill.Arg1], [skill.Arg2], level)
      ),
    getTagIds: () => [],
  },

  90: {
    substituteDescriptionArgs: (description, skill, level) =>
      replaceValues(description, [skill.Arg1, skill.Arg2, skill.Arg3]),
    getTagIds: () => [],
  },
};

const defaultSkillInfoHelper: SkillInfoHelper = {
  substituteDescriptionArgs: (description: string) =>
    useTranslation('global.unknown').value,
  getTagIds: () => [],
};

export function getSkillInfoHelper(
  skillClass: Skill['Class']
): SkillInfoHelper {
  return skillInfoHelperMap[skillClass] || defaultSkillInfoHelper;
}

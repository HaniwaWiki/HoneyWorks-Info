import { Skill } from '@/types/HWPL/Skill';
import {
  calculateValues,
  replaceValues,
} from '@/utils/hwpl/Skill/SkillClass/helper';
import { sk } from 'vuetify/locale';

export function getClass1SkillInfo(skill: Skill, level: number): SkillInfo {
  return {
    type: 'Stat Bonus',
    description: replaceValues(
      skill.Description,
      calculateValues(
        [skill.Arg1, skill.Arg3, skill.Arg5],
        [skill.Arg2, skill.Arg4, skill.Arg6],
        level
      )
    ),
    tagIds: skill.Arg7.split(',').map(Number),
  };
}

export function getClass11SkillInfo(skill: Skill, level: number): SkillInfo {
  return {
    type: 'Score Bonus',
    description: replaceValues(
      skill.Description,
      calculateValues([skill.Arg1, skill.Arg3], [skill.Arg2, skill.Arg4], level)
    ),
  };
}

export function getClass21SkillInfo(skill: Skill, level: number): SkillInfo {
  return {
    type: 'PERFECT Support',
    description: replaceValues(
      skill.Description,
      calculateValues([skill.Arg1], [skill.Arg2], level)
    ),
  };
}

export function getClass31SkillInfo(skill: Skill, level: number): SkillInfo {
  return {
    type: 'Life Restore',
    description: replaceValues(
      skill.Description,
      calculateValues([skill.Arg1], [skill.Arg2], level)
    ),
  };
}

export function getClass32SkillInfo(skill: Skill, level: number): SkillInfo {
  return {
    type: 'Avoid Damage',
    description: replaceValues(
      skill.Description,
      calculateValues([skill.Arg1], [skill.Arg2], level)
    ),
  };
}

export function getClass40SkillInfo(skill: Skill, level: number): SkillInfo {
  return {
    type: 'Experience Bonus',
    description: replaceValues(
      skill.Description,
      calculateValues([skill.Arg1], [skill.Arg2], level)
    ),
  };
}

export function getClass41SkillInfo(skill: Skill, level: number): SkillInfo {
  return {
    type: 'Combo Bonus',
    description: replaceValues(
      skill.Description,
      calculateValues([skill.Arg1, skill.Arg3], [skill.Arg2, skill.Arg4], level)
    ),
  };
}

export function getClass42SkillInfo(skill: Skill, level: number): SkillInfo {
  return {
    type: 'Combo Support',
    description: replaceValues(
      skill.Description,
      calculateValues([skill.Arg1], [skill.Arg2], level)
    ),
  };
}

export function getClass90SkillInfo(skill: Skill, level: number): SkillInfo {
  return {
    type: 'Platinum Skill',
    description: replaceValues(skill.Description, [
      skill.Arg1,
      skill.Arg2,
      skill.Arg3,
    ]),
  };
}

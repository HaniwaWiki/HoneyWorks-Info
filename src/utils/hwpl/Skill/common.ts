import { Skill } from '@/types/HWPL/Skill';
import {
  getClass11SkillInfo,
  getClass1SkillInfo,
  getClass21SkillInfo,
  getClass31SkillInfo,
  getClass32SkillInfo,
  getClass40SkillInfo,
  getClass41SkillInfo,
  getClass42SkillInfo,
  getClass90SkillInfo,
} from '@/utils/hwpl/Skill/SkillClass/skillClasses';

export function getSkillInfo(skill: Skill, level: number): SkillInfo {
  switch (skill.Class) {
    case 1:
      return getClass1SkillInfo(skill, level);
    case 11:
      return getClass11SkillInfo(skill, level);
    case 21:
      return getClass21SkillInfo(skill, level);
    case 31:
      return getClass31SkillInfo(skill, level);
    case 32:
      return getClass32SkillInfo(skill, level);
    case 40:
      return getClass40SkillInfo(skill, level);
    case 41:
      return getClass41SkillInfo(skill, level);
    case 42:
      return getClass42SkillInfo(skill, level);
    case 90:
      return getClass90SkillInfo(skill, level);
    default:
      return {
        type: 'Unknown',
        description: skill.Description,
      };
  }
}

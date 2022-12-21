import type { Skill } from '@/types/HWPL/Skill';

// skill information passed to page
export type SkillInfo = {
  type: Skill['Class'];
  translated_type: string;
  description: string;
  translated_description: string;
  tagIds: number[];
};

// helper to calculate skill information
// different types of skill has different helper
export type SkillInfoHelper = {
  // substitute {0} and {1} in description with calculated values
  // notice that description can be both Japanese or translated version
  substituteDescriptionArgs: (
    description: string,
    // don't use skill.Description here
    skill: Omit<Skill, 'Description'>,
    level: number
  ) => string;

  // get tag ids of skill
  getTagIds: (skill: Skill) => number[];
};

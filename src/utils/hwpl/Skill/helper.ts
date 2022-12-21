// given base values, current level and addition values for every level up, calculate current values
import { removeHtmlTags } from '@/utils/removeHtmlTags';

export function calculateValuesAtLevel(
  baseValue: (string | number)[],
  additionValue: (string | number)[],
  level: number,
): number[] {
  return baseValue.map(
    (value, index) => Number(value) + Number(additionValue[index]) * (level - 1),
  );
}

// replace {0} in template to first value, {1} in template to second value, etc.
export function replaceValuesInTemplate(
  template: string,
  values: (string | number)[],
): string {
  return removeHtmlTags(template).replace(
    /\{(\d+)}/g,
    (_, index) => `<span class="text-red">${values[index]}</span>`,
  );
}

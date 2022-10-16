// given base values, current level and addition values for every level up, calculate current values
export function calculateValues(
  baseValue: (string | number)[],
  additionValue: (string | number)[],
  level: number
): number[] {
  return baseValue.map(
    (value, index) => Number(value) + Number(additionValue[index]) * (level - 1)
  );
}

// replace {0} with first value, {1} with second value, etc.
export function replaceValues(
  template: string,
  values: (string | number)[]
): string {
  return (
    template
      // remove HTML-tag-like content to prevent XSS attack
      .replace(/<.*?>/, '')
      .replace(
        /\{(\d+)}/g,
        (_, index) => `<span class="text-red">${values[index]}</span>`
      )
  );
}

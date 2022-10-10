import { Character } from '@/types/HWPL/Character';

export function parseCharacterBirthday(
  character: Character | null | undefined
): [number, number] {
  if (!character) {
    return [0, 0];
  }
  const birthday = character.Birthday;
  const [, month, day] = /(\d+)月(\d+)日/.exec(birthday) ?? [];
  return [Number(month), Number(day)];
}

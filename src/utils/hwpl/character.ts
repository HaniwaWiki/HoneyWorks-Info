import { Character } from '@/types/HWPL/Character';

export function parseCharacterBirthday({
  Birthday,
}: Character): [number, number] {
  const [, month, day] = /(\d+)月(\d+)日/.exec(Birthday) ?? [];
  return [Number(month), Number(day)];
}

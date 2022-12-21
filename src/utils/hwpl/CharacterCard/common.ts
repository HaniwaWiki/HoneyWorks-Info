import type { CharacterCard } from '@/types/HWPL/CharacterCard';

export function parseCharacterCardName(
  characterCard: CharacterCard | undefined | null,
): [string, string] {
  if (!characterCard)
    return ['', ''];

  const name = characterCard.Name;
  const [, cardName, characterName] = /【(.*)】(.*)/.exec(name) ?? [];
  return [cardName, characterName];
}

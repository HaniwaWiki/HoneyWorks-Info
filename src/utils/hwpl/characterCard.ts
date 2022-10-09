import { CharacterCard } from '@/types/HWPL/CharacterCard';

export function parseCharacterCardName({ Name }: CharacterCard) {
  const [, cardName, characterName] = /【(.*)】(.*)/.exec(Name) ?? [];
  return [cardName, characterName];
}

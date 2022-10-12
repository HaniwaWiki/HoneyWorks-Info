import { CharacterCard } from '@/types/HWPL/CharacterCard';
import { computed, Ref } from 'vue';

export function parseCharacterCardName(
  characterCard: CharacterCard | undefined | null
): [string, string] {
  if (!characterCard) {
    return ['', ''];
  }
  const name = characterCard.Name;
  const [, cardName, characterName] = /【(.*)】(.*)/.exec(name) ?? [];
  return [cardName, characterName];
}

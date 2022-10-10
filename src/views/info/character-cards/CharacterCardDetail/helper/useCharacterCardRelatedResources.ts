import { CharacterCard } from '@/types/HWPL/CharacterCard';
import { Resource } from '@/components/base/ResourceTabs/types';
import { ref, Ref } from 'vue';

export function useCharacterCardRelatedResources(
  characterCard: Ref<CharacterCard | null>
): Ref<Resource[]> {
  return ref([]);
}

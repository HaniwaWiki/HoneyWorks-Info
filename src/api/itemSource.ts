import {
  ItemSource,
  ItemSourceAggregateInformation,
} from '@/types/HWPL/extra/ItemSource';
import axios from '../utils/request';

export async function getItemSource(itemId: number): Promise<ItemSource> {
  const response = await axios.get(`/extra/ItemSource/${itemId}.json`);
  return response.data;
}

export async function getItemSourceAggregateInformation(): Promise<
  ItemSourceAggregateInformation[]
> {
  const response = await axios.get(
    `/extra/ItemSource/aggregateInformation.json`
  );
  return response.data;
}

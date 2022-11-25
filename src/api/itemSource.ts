import {
  ItemSource,
  ItemSourceAggregateInformation,
} from '@/types/HWPL/extra/ItemSource';
import { getBaseUrls } from '@/config';
import axios from '../utils/request';

export async function getItemSource(itemId: number): Promise<ItemSource> {
  const { staticApiBaseUrl } = getBaseUrls();
  const response = await axios.get(
    `${staticApiBaseUrl}/extra/ItemSource/${itemId}.json`
  );
  return response.data;
}

export async function getItemSourceAggregateInformation(): Promise<
  ItemSourceAggregateInformation[]
> {
  const { staticApiBaseUrl } = getBaseUrls();
  const response = await axios.get(
    `${staticApiBaseUrl}/extra/ItemSource/aggregateInformation.json`
  );
  return response.data;
}

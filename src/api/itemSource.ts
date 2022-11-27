import axios from '../utils/request';
import type {
  ItemSource,
  ItemSourceAggregateInformation,
} from '@/types/HWPL/extra/ItemSource';
import { getBaseUrls } from '@/utils/baseUrlList';

export async function getItemSource(itemId: number): Promise<ItemSource> {
  const { staticApiBaseUrl } = getBaseUrls();
  const response = await axios.get(
    `${staticApiBaseUrl}/extra/ItemSource/${itemId}.json`,
  );
  return response.data;
}

export async function getItemSourceAggregateInformation(): Promise<
  ItemSourceAggregateInformation[]
> {
  const { staticApiBaseUrl } = getBaseUrls();
  const response = await axios.get(
    `${staticApiBaseUrl}/extra/ItemSource/aggregateInformation.json`,
  );
  return response.data;
}

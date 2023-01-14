import type { ElementOf } from '@vueuse/core';
import type { VDataTable } from 'vuetify/lib/labs/VDataTable/index';

export type VDataTableProps = InstanceType<typeof VDataTable>['$props'];
type DataTableHeaderInternal = ElementOf<Exclude<VDataTableProps['headers'], undefined | any[][]>>;

export type DataTableHeader<T> = DataTableHeaderInternal & { key: keyof T; };
export type DataTableSortBy<T> = ElementOf<VDataTableProps['sortBy']> & { key: keyof T; };

import type { MdiIcons } from '@/types/mdi';

// see https://github.com/vuetifyjs/vuetify/blob/next/packages/vuetify/src/components/VList/VListItem.tsx#L64
type ListItem = {
  prependIcon?: MdiIcons | 'placeholder';
  prependAvatar?: string;
  title?: string | number;
  subtitle?: string | number;
  appendIcon?: MdiIcons;
  appendAvatar?: string;
};

type SubHeaderItem = {
  type: 'subheader';
  title: string | number;
  inset?: boolean;
};

type DividerItem = {
  type: 'divider';
  inset?: boolean;
};

export type VuetifyListItem = ListItem | SubHeaderItem | DividerItem;

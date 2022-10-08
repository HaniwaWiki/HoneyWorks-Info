import { MdiIcons } from '@/types/mdi';

type ListItem = {
  prependIcon?: MdiIcons;
  prependAvatar?: string;
  title?: string | number;
  subtitle?: string | number;
};

type SubHeaderItem = {
  type: 'subheader';
  title: string | number;
};

type DividerItem = {
  type: 'divider';
  inset?: boolean;
};

export type VuetifyListItem = ListItem | SubHeaderItem | DividerItem;

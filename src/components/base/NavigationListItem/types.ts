import type { MdiIcons } from '@/types/mdi';

export type NavigationListItemProp = {
  title: string;
  icon?: MdiIcons;
  // inner href will be handled by vue-router
  // outer href will be handled by browser
  href?: string;
  subItems?: NavigationListItemProp[] | null;
};

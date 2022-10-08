import { MdiIcons } from '@/types/mdi';

export type CascadeListItemProp = {
  title: string;
  icon?: MdiIcons;
  // inner href will be handled by vue-router
  // outer href will be handled by browser
  href?: string;
  subItems?: CascadeListItemProp[] | null;
};

export type CascadeListItemProp = {
  title: string;
  icon?: string;
  // inner href will be handled by vue-router
  // outer href will be handled by browser
  href?: string;
  subItems?: CascadeListItemProp[] | null;
};

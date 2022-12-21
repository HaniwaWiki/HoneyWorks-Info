// v-col default columns on mobile
export const defaultCols = 12;
// v-col default columns on desktop
export const defaultMdCols = 8;

// default cols:
// 12, if screen < md
// 8, if screen >= md
// sm, lg and xl are for fine-grained control
export type VuetifyColsProps = {
  // columns on common mobile (default)
  cols?: number | string;
  sm?: number | string;
  // columns on common desktop (>= md)
  md?: number | string;
  lg?: number | string;
  xl?: number | string;
};

export const vuetifyColsDefault = {
  cols: defaultCols,
  sm: undefined,
  md: defaultMdCols,
  lg: undefined,
  xl: undefined,
};

import { ComponentObjectPropsOptions } from 'vue';

// v-col default columns on mobile
export const defaultCols = 12;
// v-col default columns on desktop
export const defaultMdCols = 8;

// default cols:
// 12, if screen < md
// 8, if screen >= md
export const vuetifyColProps: ComponentObjectPropsOptions = {
  // columns on common mobile (default)
  cols: {
    type: [Number, String],
    default: defaultCols,
  },
  // sm, lg and xl are for fine-grained control
  sm: {
    type: [Number, String],
    default: undefined,
  },
  // columns on common desktop (>= md)
  md: {
    type: [Number, String],
    default: defaultMdCols,
  },
  lg: {
    type: [Number, String],
    default: undefined,
  },
  xl: {
    type: [Number, String],
    default: undefined,
  },
};

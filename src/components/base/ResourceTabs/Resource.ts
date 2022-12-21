import type { RouteLocationRaw } from 'vue-router';

export type Resource = {
  name: string;
  key: string;
  url: string;
  // link to the resource page
  to?: RouteLocationRaw;
  options?: {
    width?: string;
    height?: string;
    // video options
    controls?: boolean;
    muted?: boolean;
    loop?: boolean;
    autoplay?: boolean;
  };
};

export const videoResourceOption: Resource['options'] = {
  controls: true,
};

export const dynamicSceneCardResourceOption: Resource['options'] = {
  muted: true,
  loop: true,
  autoplay: true,
};

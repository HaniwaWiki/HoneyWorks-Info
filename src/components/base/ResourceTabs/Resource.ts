import { RouteLocationRaw } from 'vue-router';

export type Resource = {
  name: string;
  url: string;
  // link to the resource page
  to?: RouteLocationRaw;
  options?: {
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

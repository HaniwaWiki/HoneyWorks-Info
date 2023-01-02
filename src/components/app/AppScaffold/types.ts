import type { RouteLocationRaw } from 'vue-router';

export type NearbyPage = {
  prevTitle?: string;
  prevTo?: RouteLocationRaw;
  nextTitle?: string;
  nextTo?: RouteLocationRaw;
};

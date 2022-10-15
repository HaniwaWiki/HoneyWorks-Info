import { RouteRecordRaw } from 'vue-router';

const infoRoutes: RouteRecordRaw[] = [
  {
    name: 'Character List',
    path: '/info/characters',
    component: () => import('@/views/info/Characters/CharacterList.vue'),
  },
  {
    name: 'Character Detail',
    path: '/info/characters/:id',
    component: () => import('@/views/info/Characters/CharacterDetail.vue'),
  },
  {
    name: 'Character Card List',
    path: '/info/character-cards',
    component: () =>
      import(
        '@/views/info/CharacterCards/CharacterCardList/CharacterCardList.vue'
      ),
  },
  {
    name: 'Character Card Detail',
    path: '/info/character-cards/:id',
    component: () =>
      import(
        '@/views/info/CharacterCards/CharacterCardDetail/CharacterCardDetail.vue'
      ),
  },
  {
    name: 'Music Part List',
    path: '/info/music-parts',
    component: () => import('@/views/info/MusicParts/MusicPartList.vue'),
  },
  {
    name: 'Music Part Detail',
    path: '/info/music-parts/:id',
    component: () => import('@/views/info/MusicParts/MusicPartDetail.vue'),
  },
  {
    name: 'Scene Card List',
    path: '/info/scene-cards',
    component: () => import('@/views/info/SceneCards/SceneCardList.vue'),
  },
  {
    name: 'Scene Card Detail',
    path: '/info/scene-cards/:id',
    component: () => import('@/views/info/SceneCards/SceneCardDetail.vue'),
  },
  {
    name: 'Event List',
    path: '/info/events',
    component: () => import('@/views/info/events/EventList.vue'),
  },
  {
    name: 'Event Detail',
    path: '/info/events/:id',
    component: () => import('@/views/info/events/EventDetail.vue'),
  },
];

export default infoRoutes;

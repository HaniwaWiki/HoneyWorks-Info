import type { RouteRecordRaw } from 'vue-router';

const infoRoutes: RouteRecordRaw[] = [
  {
    name: 'Character List',
    path: '/info/characters',
    component: () => import('@/views/Info/Characters/CharacterList.vue'),
  },
  {
    name: 'Character Detail',
    path: '/info/characters/:id',
    component: () => import('@/views/Info/Characters/CharacterDetail.vue'),
  },
  {
    name: 'Character Card List',
    path: '/info/character-cards',
    component: () =>
      import(
        '@/views/Info/CharacterCards/CharacterCardList/CharacterCardList.vue'
      ),
  },
  {
    name: 'Character Card Detail',
    path: '/info/character-cards/:id',
    component: () =>
      import(
        '@/views/Info/CharacterCards/CharacterCardDetail/CharacterCardDetail.vue'
      ),
  },
  {
    name: 'Music List',
    path: '/info/musics',
    component: () => import('@/views/Info/Musics/MusicList/MusicList.vue'),
  },
  {
    name: 'Music Part Detail',
    path: '/info/music-parts/:id',
    component: () => import('@/views/Info/Musics/MusicPartDetail.vue'),
  },
  {
    name: 'Scene Card List',
    path: '/info/scene-cards',
    component: () => import('@/views/Info/SceneCards/SceneCardList.vue'),
  },
  {
    name: 'Scene Card Detail',
    path: '/info/scene-cards/:id',
    component: () => import('@/views/Info/SceneCards/SceneCardDetail.vue'),
  },
  {
    name: 'Event List',
    path: '/info/Events',
    component: () => import('@/views/Info/Events/EventList.vue'),
  },
  {
    name: 'Event Detail',
    path: '/info/Events/:id',
    component: () => import('@/views/Info/Events/EventDetail.vue'),
  },
];

export default infoRoutes;

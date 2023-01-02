import type { RouteRecordRaw } from 'vue-router';

const infoRoutes: RouteRecordRaw[] = [
  {
    name: 'Character List',
    path: '/info/characters',
    component: () => import('@/views/Info/Characters/CharacterList/CharacterList.vue'),
  },
  {
    name: 'Character Detail',
    path: '/info/characters/:id',
    component: () => import('@/views/Info/Characters/CharacterDetail/CharacterDetail.vue'),
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
    component: () => import('@/views/Info/Musics/MusicPartDetail/MusicPartDetail.vue'),
  },
  {
    name: 'Scene Card List',
    path: '/info/scene-cards',
    component: () => import('@/views/Info/SceneCards/SceneCardList/SceneCardList.vue'),
  },
  {
    name: 'Scene Card Detail',
    path: '/info/scene-cards/:id',
    component: () => import('@/views/Info/SceneCards/SceneCardDetail/SceneCardDetail.vue'),
  },
  {
    name: 'Gacha List',
    path: '/info/gachas',
    component: () => import('@/views/Info/Gachas/GachaList/GachaList.vue'),
  },
  {
    name: 'Gacha Detail',
    path: '/info/gachas/:id',
    component: () => import('@/views/Info/Gachas/GachaDetail/GachaDetail.vue'),
  },
  {
    name: 'Event List',
    path: '/info/events',
    component: () => import('@/views/Info/Events/EventList/EventList.vue'),
  },
  {
    name: 'Event Detail',
    path: '/info/events/:id',
    component: () => import('@/views/Info/Events/EventDetail/EventDetail.vue'),
  },
];

export default infoRoutes;

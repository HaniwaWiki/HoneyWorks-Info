import { useI18n } from 'vue-i18n';
import type { Ref } from 'vue';
import { computed } from 'vue';
import type { NavigationListItemProp } from '@/components/base/NavigationListItem/types';

export function useNavigationDrawerList(): Ref<NavigationListItemProp[]> {
  const { t } = useI18n();

  return computed(() => [
    { title: t('global.honeyworks_official_links'), icon: 'mdi-link', href: '/official-websites' },
    {
      title: t('global.information'),
      icon: 'mdi-information-outline',
      subItems: [
        { title: t('global.characters'), href: '/info/characters' },
        { title: t('global.character_cards'), href: '/info/character-cards' },
        { title: t('global.musics'), href: '/info/musics' },
        { title: t('global.music_parts'), href: `${window.location.origin}/music-part.html` },
        { title: t('global.scene_cards'), href: '/info/scene-cards' },
        { title: t('global.events'), href: '/info/events' },
      ],
    },
    {
      title: t('global.tools'),
      icon: 'mdi-hammer',
      subItems: [
        { title: t('global.hwpl_calendar'), href: '/tools/calendar' },
        {
          title: t('global.gerira_live_query'),
          href: '/tools/gerira-live-query',
        },
      ],
    },
    { title: t('global.settings'), icon: 'mdi-cog', href: '/settings' },
    { title: t('global.about_us'), icon: 'mdi-account', href: '/about' },
  ]);
}


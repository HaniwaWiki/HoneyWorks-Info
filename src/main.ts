import { createApp } from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';
import bindGlobal from './plugins/vue-global';
import router from './router';
import { i18n } from '@/i18n';
import './styles/layout.scss';

loadFonts();

const app = createApp(App);
app.use(vuetify);
app.use(router);
app.use(i18n);
app.use(bindGlobal);
app.mount('#app');

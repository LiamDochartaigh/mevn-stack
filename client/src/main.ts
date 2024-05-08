import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import vuetify from './plugins/vuetify';
import userService from './services/userService';
import 'reflect-metadata';

async function initializeApp() {
    const app = createApp(App);
    const pinia = createPinia();

    app.use(pinia);
    app.use(router);
    app.use(vuetify);

    await userService.validateUser();

    app.mount('#app');
}

initializeApp();
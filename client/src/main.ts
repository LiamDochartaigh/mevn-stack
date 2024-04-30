import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import vuetify from './plugins/vuetify';
import userService from './services/userService';
import 'reflect-metadata';

const pinia = createPinia();

const app = createApp(App);
app.use(pinia);
app.use(router);
app.use(vuetify);
app.mount('#app');

userService.validateUser();

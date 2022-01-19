import { createApp } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import makeServer from './server';
import App from './App.vue';
import router from './router';
import './style/main.css';

makeServer();
createApp(App).use(router).use(VueAxios, axios).mount('#app');

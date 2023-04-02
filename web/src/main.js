import { createApp } from 'vue'
import ArcoVue from '@arco-design/web-vue';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import App from './App.vue'
import router from './router'

import '@arco-design/web-vue/dist/arco.css';

const app = createApp(App)

app.use(router);
app.use(ArcoVue);
app.use(ArcoVueIcon);

app.mount('#app')

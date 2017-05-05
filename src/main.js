import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [{ path: '/:status', component: App }]
});

new Vue({
  router,
  el: '#app',
  render: h => h(App)
});

import 'core-js/stable';
import Vue from 'vue';
import App from './App';
import router from './router';
import CoreuiVue from '@coreui/vue';
import { iconsSet as icons } from './assets/icons/icons.js';
import store from './store';
import '@babel/polyfill';
import vmodal from 'vue-js-modal';
import 'vue-js-modal/dist/styles.css';

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (localStorage.isAuthenticated) {
      document.title = to.meta.title;
      next();
      return;
    }
    next('login');
  } else if (localStorage.isAuthenticated && to.path.includes('login')) {
    document.title = 'Dashboard';
    next('dashboard');
  } else {
    next();
  }
  document.title = to.meta.title;
});

Vue.config.performance = true;
Vue.use(CoreuiVue);
Vue.prototype.$log = console.log.bind(console);

new Vue({
  el: '#app',
  router,
  store,
  icons,
  vmodal,
  template: '<App/>',
  components: {
    App,
  },
});

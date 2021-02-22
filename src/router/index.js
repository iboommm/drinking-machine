import { createRouter, createWebHashHistory } from 'vue-router';

import LoginPage from '../views/LoginPage.vue';
import NotFoundPage from '../views/NotFoundPage.vue';

const routes = [
  {
    path: '/',
    redirect: () => {
      return 'home';
    },
  },
  {
    path: '/login',
    component: LoginPage,
    meta: {
      title: 'Login',
    },
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Admin/HomePage.vue'),
    meta: {
      requiresAuth: true,
      title: 'Dashboard',
    },
  },
  {
    path: '/sign-out',
    name: 'Sign out',
    component: () => import('../views/SignOutPage.vue'),
    meta: {
      requiresAuth: true,
      title: 'Sign out',
    },
  },
  {
    path: '/:catchAll(.*)',
    component: NotFoundPage,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (localStorage.isAuthenticated) {
      next();
    }
    next('/login');
  } else if (localStorage.isAuthenticated && to.path.includes('login')) {
    next('home');
  } else {
    next();
  }
  document.title = to.meta.title;
});

export default router;

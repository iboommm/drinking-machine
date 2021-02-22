import Vue from 'vue';
import Router from 'vue-router';

const TheContainer = () => import('@/containers/TheContainer');

const Dashboard = () => import('@/views/Dashboard');
const Login = () => import('@/views/pages/Login');

const Machine = () => import('@/views/machine/List');
const Category = () => import('@/views/category/List');
const Items = () => import('@/views/items/List');

Vue.use(Router);

export default new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes(),
});

function configRoutes() {
  return [
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        title: 'Sign in',
      },
    },
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: TheContainer,
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard,
          meta: {
            requiresAuth: true,
            title: 'Dashboard',
          },
        },
        {
          path: 'machine',
          name: 'Machine',
          component: Machine,
          meta: {
            requiresAuth: true,
            title: 'Machine',
          },
        },
        {
          path: 'category',
          name: 'Category',
          component: Category,
          meta: {
            requiresAuth: true,
            title: 'Category',
          },
        },
        {
          path: 'items',
          name: 'Items',
          component: Items,
          meta: {
            requiresAuth: true,
            title: 'Items',
          },
        },
      ],
    },
  ];
}

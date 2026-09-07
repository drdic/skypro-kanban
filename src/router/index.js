import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import CardView from '../views/CardView.vue'
import AddCardView from '../views/AddCardView.vue'
import ExitView from '../views/ExitView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import AppLayout from '../layout/AppLayout.vue'

const redirectQuery = window.location.search
if (redirectQuery.startsWith('?/')) {
  const restoredPath = redirectQuery.slice(2).replace(/~and~/g, '&')
  window.history.replaceState(null, '', import.meta.env.BASE_URL + restoredPath)
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      component: AppLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView,
          children: [
            {
              path: '/card/add',
              component: AddCardView,
            },
            {
              path: '/card/:id',
              component: CardView,
            },
            {
              path: 'exit',
              component: ExitView,
            },
          ],
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: '/login',
          name: 'login',
          component: LoginView,
        },
        {
          path: '/register',
          name: 'register',
          component: RegisterView,
        },
      ],
    },
    {
          path: '/:pathMatch(.*)*',
          name: 'not-found',
          component: NotFoundView,
        },
  ],
})

router.beforeEach((to) => {
  const token = localStorage.getItem('token')

  if (to.meta.requiresAuth && !token) {
    return { name: 'login' }
  }

  return true
})

export default router

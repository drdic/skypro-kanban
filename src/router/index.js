import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import CardView from '../views/CardView.vue'
import AddCardView from '../views/AddCardView.vue'
import ExitView from '../views/ExitView.vue'
import NotFoundView from '../views/NotFoundView.vue'

// Восстановление исходного пути после редиректа 404.html (SPA на GitHub Pages)
const redirectQuery = window.location.search
if (redirectQuery.startsWith('?/')) {
  const restoredPath = redirectQuery.slice(2).replace(/~and~/g, '&')
  window.history.replaceState(null, '', import.meta.env.BASE_URL + restoredPath)
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true },
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
  {
    path: '/card/:id',
    name: 'card',
    component: CardView,
    meta: { requiresAuth: true },
  },
  {
    path: '/add',
    name: 'add',
    component: AddCardView,
    meta: { requiresAuth: true },
  },
  {
    path: '/exit',
    name: 'exit',
    component: ExitView,
    meta: { requiresAuth: true },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundView,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated')

  if (to.meta.requiresAuth && !isAuthenticated) {
    return { name: 'login' }
  }

  return true
})

export default router

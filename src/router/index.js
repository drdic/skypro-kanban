import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import CardView from '../views/CardView.vue'
import AddCardView from '../views/AddCardView.vue'
import ExitView from '../views/ExitView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true } // Защищенный маршрут
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/card/:id',
      name: 'card',
      component: CardView,
      meta: { requiresAuth: true }
    },
    {
      path: '/add',
      name: 'add',
      component: AddCardView,
      meta: { requiresAuth: true }
    },
    {
      path: '/exit',
      name: 'exit',
      component: ExitView,
      meta: { requiresAuth: true }
    },
    // Страница 404 должна быть последней
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView
    }
  ]
})

// Навигационный guard для защиты маршрутов
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated')

  if (to.meta.requiresAuth && !isAuthenticated) {
    // Если маршрут защищен и пользователь не авторизован
    next('/login')
  } else {
    // Иначе продолжаем навигацию
    next()
  }
})

export default router

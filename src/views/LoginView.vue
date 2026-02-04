<template>
  <div class="login">
    <h2>Вход</h2>
    <form @submit.prevent="login">
      <input type="email" placeholder="Email" v-model="email">
      <input type="password" placeholder="Пароль" v-model="password">
      <button type="submit">Войти</button>
    </form>
    <router-link to="/register">Регистрация</router-link>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter()

const login = () => {
  localStorage.setItem('isAuthenticated', 'true')
  router.push('/')
}
</script>

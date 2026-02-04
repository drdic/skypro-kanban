<template>
  <div class="register">
    <h2>Регистрация</h2>
    <form @submit.prevent="register">
      <input type="text" placeholder="Имя" v-model="name">
      <input type="email" placeholder="Email" v-model="email">
      <input type="password" placeholder="Пароль" v-model="password">
      <button type="submit">Зарегистрироваться</button>
    </form>
    <router-link to="/login">Вход</router-link>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const name = ref('')
const email = ref('')
const password = ref('')
const router = useRouter()

const register = () => {
  localStorage.setItem('isAuthenticated', 'true')
  router.push('/')
}
</script>

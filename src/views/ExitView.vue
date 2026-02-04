<template>
  <div class="exit-modal">
    <h2>Выход</h2>
    <p>Вы уверены, что хотите выйти?</p>
    <button @click="logout">Да, выйти</button>
    <router-link to="/">Отмена</router-link>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const logout = () => {
  localStorage.removeItem('isAuthenticated')
  router.push('/login')
}
</script>

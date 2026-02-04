<template>
  <div class="card">
    <h2>Карточка ID: {{ cardId }}</h2>
    <p>Страница просмотра/редактирования карточки</p>
    <router-link to="/">На главную</router-link>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const cardId = route.params.id
</script>

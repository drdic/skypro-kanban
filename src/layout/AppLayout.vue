<template>
  <div class="wrapper">
    <RouterView />
  </div>
</template>

<script setup>
import { provide, ref, reactive } from 'vue'
import { RouterView } from 'vue-router'

const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem('user') || 'null')
  } catch {
    return null
  }
}

const user = ref(getStoredUser())
const board = reactive({ tasks: [] })

function setUser(value) {
  user.value = value
  localStorage.setItem('user', JSON.stringify(value))
  localStorage.setItem('token', value.token)
}

function removeUser() {
  user.value = null
  localStorage.removeItem('user')
  localStorage.removeItem('token')
}

provide('auth', { user, setUser, removeUser })
provide('boardData', { board })
</script>

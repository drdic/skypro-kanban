<template>
  <div class="wrapper">
    <RouterView />
    <BaseToast :toasts="toasts" @close="removeToast" />
  </div>
</template>

<script setup>
import { provide, ref, reactive } from 'vue'
import { RouterView } from 'vue-router'
import BaseToast from '@/components/BaseToast.vue'

const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem('user') || 'null')
  } catch {
    return null
  }
}

const user = ref(getStoredUser())
const board = reactive({ tasks: [] })

const toasts = ref([])
let toastId = 0

const removeToast = (id) => {
  toasts.value = toasts.value.filter((toast) => toast.id !== id)
}

const showToast = (message, type = 'success') => {
  const id = ++toastId
  toasts.value.push({ id, message, type })
  setTimeout(() => removeToast(id), 4000)
}

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
provide('notifications', { showToast })
</script>

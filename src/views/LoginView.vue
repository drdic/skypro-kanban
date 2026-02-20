<template>
  <div class="login-container">
    <div class="login-card">
      <h2 class="login-title">Вход</h2>
      <form @submit.prevent="login" class="login-form">
        <div class="form-group">
          <input
            type="email"
            placeholder="Email"
            v-model="email"
            id="email-input"
            name="email"
            required
          >
        </div>
        <div class="form-group">
          <input
            type="password"
            placeholder="Пароль"
            v-model="password"
            id="password-input"
            name="password"
            required
          >
        </div>
        <button type="submit" class="login-button">Войти</button>
      </form>
      <router-link to="/register" class="register-link">
        Регистрация
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

console.log('LoginView loaded')

const email = ref('')
const password = ref('')
const router = useRouter()

const login = () => {
  console.log('Logging in...')
  localStorage.setItem('isAuthenticated', 'true')
  router.push('/')
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 20px;
}

.login-card {
  background: white;
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.login-title {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
  font-size: 28px;
}

.login-form {
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group input {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
  transition: border-color 0.3s;
}

.form-group input:focus {
  outline: none;
  border-color: #4a6fa5;
  box-shadow: 0 0 0 3px rgba(74, 111, 165, 0.1);
}

.login-button {
  width: 100%;
  padding: 14px;
  background-color: #4a6fa5;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-button:hover {
  background-color: #3a5a8a;
}

.register-link {
  display: block;
  text-align: center;
  color: #4a6fa5;
  text-decoration: none;
  font-size: 16px;
}

.register-link:hover {
  text-decoration: underline;
}
</style>

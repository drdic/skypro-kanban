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

const email = ref('')
const password = ref('')
const router = useRouter()

const login = () => {
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
  background: var(--color-bg-content);
  padding: 20px;
}

.login-card {
  background: var(--color-bg-white);
  border-radius: 10px;
  padding: 40px 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  border: 0.7px solid var(--color-border);
}

.login-title {
  text-align: center;
  color: var(--color-text-primary);
  margin-bottom: 30px;
  font-size: 24px;
  font-weight: 600;
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
  border: 1px solid var(--color-border);
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.3s;
  box-sizing: border-box;
}

.form-group input:focus {
  outline: none;
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px rgba(86, 94, 239, 0.1);
}

.login-button {
  width: 100%;
  padding: 14px;
  background-color: var(--color-accent);
  color: var(--color-text-white);
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-button:hover {
  background-color: var(--color-accent-hover);
}

.register-link {
  display: block;
  text-align: center;
  color: var(--color-accent);
  text-decoration: none;
  font-size: 14px;
}

.register-link:hover {
  text-decoration: underline;
}
</style>

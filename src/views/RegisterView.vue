<template>
  <div class="register-container">
    <div class="register-card">
      <h2 class="register-title">Регистрация</h2>
      <form @submit.prevent="register" class="register-form">
        <div class="form-group">
          <input
            type="text"
            placeholder="Имя"
            v-model="name"
            id="name-input"
            name="name"
            required
          >
        </div>
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
        <button type="submit" class="register-button">Зарегистрироваться</button>
      </form>
      <router-link to="/login" class="login-link">
        Уже есть аккаунт? Войдите
      </router-link>
    </div>
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

<style scoped>
.register-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--color-bg-content);
  padding: 20px;
}

.register-card {
  background: var(--color-bg-white);
  border-radius: 10px;
  padding: 40px 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  border: 0.7px solid var(--color-border);
}

.register-title {
  text-align: center;
  color: var(--color-text-primary);
  margin-bottom: 30px;
  font-size: 24px;
  font-weight: 600;
}

.register-form {
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

.register-button {
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

.register-button:hover {
  background-color: var(--color-accent-hover);
}

.login-link {
  display: block;
  text-align: center;
  color: var(--color-accent);
  text-decoration: none;
  font-size: 14px;
}

.login-link:hover {
  text-decoration: underline;
}
</style>

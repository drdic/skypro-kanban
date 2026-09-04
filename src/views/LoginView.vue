<template>
  <div class="login-container">
    <div class="login-card">
      <h2 class="login-title">Вход</h2>
      <form @submit.prevent="login" class="login-form">
        <div class="form-group">
          <input
            type="email"
            placeholder="Email"
            v-model="loginInput"
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
        <p v-if="error" class="login-error">{{ error }}</p>
        <button type="submit" class="login-button" :disabled="isLoading">
          {{ isLoading ? 'Вход...' : 'Войти' }}
        </button>
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
import { signIn } from '../services/auth.js'

const loginInput = ref('')
const password = ref('')
const isLoading = ref(false)
const error = ref('')
const router = useRouter()

const login = async () => {
  error.value = ''
  isLoading.value = true
  try {
    const user = await signIn({
      login: loginInput.value,
      password: password.value,
    })
    localStorage.setItem('token', user.token)
    localStorage.setItem('user', JSON.stringify(user))
    router.push('/')
  } catch (err) {
    error.value = err.message
  } finally {
    isLoading.value = false
  }
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

.login-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.login-error {
  color: #e53e3e;
  font-size: 14px;
  margin-bottom: 15px;
  text-align: center;
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

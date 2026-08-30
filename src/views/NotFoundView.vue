<template>
  <div class="not-found-view">
    <div class="not-found-view__container">
      <div class="not-found-view__content">
        <div class="error-image">
          <img :src="errorImage" alt="404 - Страница не найдена" class="error-img">
        </div>

        <h1 class="error-title">Страница не найдена</h1>

        <p class="error-description">
          Запрашиваемая страница не существует или была перемещена.
          Проверьте правильность URL или вернитесь на главную.
        </p>

        <div class="error-actions">
          <router-link to="/" class="btn btn-primary">
            Вернуться на главную
          </router-link>
          <button class="btn btn-secondary" @click="goBack">Вернуться назад</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import errorImage from '@/assets/images/404.jpg'

const router = useRouter()

const goBack = () => {
  router.back()
}
</script>

<style scoped>
.not-found-view {
  min-height: 100vh;
  background: var(--color-bg-content);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.not-found-view__container {
  width: 100%;
  max-width: 700px;
}

.not-found-view__content {
  background: var(--color-bg-white);
  border-radius: 10px;
  border: 0.7px solid var(--color-border);
  padding: 40px 60px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.error-image {
  margin-bottom: 30px;
}

.error-img {
  max-width: 400px;
  width: 100%;
  height: auto;
  border-radius: 12px;
}

.error-title {
  font-size: 32px;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 20px;
}

.error-description {
  font-size: 16px;
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: 40px;
}

.error-actions {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  padding: 14px 32px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
}

.btn-primary {
  background: var(--color-accent);
  color: var(--color-text-white);
}

.btn-primary:hover {
  background: var(--color-accent-hover);
}

.btn-secondary {
  background: transparent;
  color: var(--color-accent);
  border: 0.7px solid var(--color-accent);
}

.btn-secondary:hover {
  background: var(--color-bg-content);
}

@media (max-width: 480px) {
  .error-actions {
    flex-direction: column;
  }

  .btn {
    width: 100%;
  }
}
</style>

<template>
  <div class="not-found-view">
    <div class="not-found-view__container">
      <!-- Основной контент -->
      <div class="not-found-view__content">
        <!-- Изображение 404 -->
        <div class="error-image">
          <img :src="errorImage" alt="404 - Страница не найдена" class="error-img">
        </div>

        <!-- Заголовок -->
        <h1 class="error-title">Страница не найдена</h1>

        <!-- Описание -->
        <p class="error-description">
          Запрашиваемая страница не существует или была перемещена.
          Проверьте правильность URL или вернитесь на главную.
        </p>

        <!-- Кнопки действий -->
        <div class="error-actions">
          <router-link to="/" class="btn btn-primary">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M15.8333 9.16667H5.92248L9.42248 5.66667L8.33331 4.58334L2.91665 10L8.33331 15.4167L9.42248 14.3333L5.92248 10.8333H15.8333V9.16667Z" fill="currentColor"/>
            </svg>
            Вернуться на главную
          </router-link>

          <button class="btn btn-secondary" @click="goBack">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M8.33331 15.8333L2.49998 10L8.33331 4.16667L9.16665 5L4.66665 9.16667H17.5V10.8333H4.66665L9.16665 15L8.33331 15.8333Z" fill="currentColor"/>
            </svg>
            Вернуться назад
          </button>
        </div>

        <!-- Техническая информация -->
        <div class="error-tech-info">
          <p class="tech-note">
            <strong>Техническая информация:</strong> Эта страница отображается благодаря маршруту
            <code>/:pathMatch(.*)*</code> в router/index.js, который перехватывает все несуществующие адреса.
          </p>
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
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.not-found-view__container {
  width: 100%;
  max-width: 800px;
}

.not-found-view__content {
  background: white;
  border-radius: 24px;
  padding: 60px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.error-image {
  margin-bottom: 40px;
}

.error-img {
  max-width: 400px;
  width: 100%;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.error-title {
  font-size: 36px;
  font-weight: 700;
  color: #333;
  margin-bottom: 20px;
}

.error-description {
  font-size: 18px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 40px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.error-actions {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-bottom: 40px;
}

.btn {
  padding: 16px 32px;
  border: none;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  text-decoration: none;
  min-width: 200px;
}

.btn-primary {
  background: #4a6fa5;
  color: white;
}

.btn-primary:hover {
  background: #3a5a8a;
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(74, 111, 165, 0.3);
}

.btn-secondary {
  background: #f0f0f0;
  color: #333;
}

.btn-secondary:hover {
  background: #e0e0e0;
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.btn svg {
  width: 20px;
  height: 20px;
}

.error-tech-info {
  padding: 20px;
  background: #f0f7ff;
  border-radius: 12px;
  border-left: 4px solid #4a6fa5;
  max-width: 700px;
  margin: 0 auto;
}

.tech-note {
  margin: 0;
  color: #555;
  font-size: 14px;
  line-height: 1.5;
}

.tech-note code {
  background: #e9ecef;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  color: #d63384;
}

@media (max-width: 768px) {
  .error-title {
    font-size: 28px;
  }

  .error-description {
    font-size: 16px;
  }

  .error-actions {
    flex-direction: column;
    align-items: center;
  }

  .btn {
    width: 100%;
    max-width: 300px;
  }

  .not-found-view__content {
    padding: 40px 20px;
  }
}

@media (max-width: 480px) {
  .error-title {
    font-size: 24px;
  }
}
</style>

<template>
  <div class="card-view">
    <div class="card-view__container">
      <!-- Шапка с навигацией -->
      <div class="card-view__header">
        <router-link to="/" class="card-view__back">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Назад к доске
        </router-link>
      </div>

      <!-- Основной контент -->
      <div class="card-view__content">
        <!-- Заголовок с ID -->
        <div class="card-view__title-block">
          <h1 class="card-view__title">
            Просмотр карточки
            <span class="card-view__id">ID: {{ cardId }}</span>
          </h1>
          <div class="card-view__status">
            <span class="status-badge status-processing">В работе</span>
          </div>
        </div>

        <!-- Информация о карточке -->
        <div class="card-view__info">
          <div class="card-view__section">
            <h3 class="card-view__section-title">Название задачи</h3>
            <p class="card-view__task-title">Разработка нового функционала Kanban доски</p>
          </div>

          <div class="card-view__section">
            <h3 class="card-view__section-title">Описание</h3>
            <div class="card-view__description">
              <p>Необходимо реализовать систему перетаскивания карточек между колонками, добавление новых карточек и редактирование существующих.</p>
              <p>Срок выполнения: до конца недели.</p>
            </div>
          </div>

          <div class="card-view__section">
            <h3 class="card-view__section-title">Детали</h3>
            <div class="card-view__details">
              <div class="detail-item">
                <span class="detail-label">Создана:</span>
                <span class="detail-value">15.02.2024</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Исполнитель:</span>
                <span class="detail-value">Иван Иванов</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Приоритет:</span>
                <span class="detail-value priority-high">Высокий</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Кнопки действий -->
        <div class="card-view__actions">
          <button class="btn btn-primary" @click="editCard">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M11.3333 1.99996C11.5083 1.82496 11.7163 1.68729 11.9447 1.59463C12.173 1.50196 12.4173 1.45605 12.6633 1.45951C12.9093 1.46296 13.152 1.5157 13.3773 1.61463C13.6027 1.71357 13.8059 1.8567 13.975 2.03574C14.144 2.21478 14.2756 2.42604 14.3622 2.65685C14.4488 2.88766 14.4887 3.13339 14.4795 3.37957C14.4703 3.62576 14.4122 3.86753 14.3087 4.09104C14.2051 4.31456 14.0582 4.51538 13.8767 4.68163L6.44333 12.115L2 13.3333L3.21833 8.88996L10.6667 1.99996H11.3333Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Редактировать
          </button>
          <button class="btn btn-secondary" @click="goBack">
            Отмена
          </button>
          <button class="btn btn-danger" @click="deleteCard">
            Удалить
          </button>
        </div>

        <!-- Техническая информация (для демонстрации критерия) -->
        <div class="card-view__tech-info">
          <p class="tech-note">
            <strong>Техническая информация:</strong> ID карточки <code>{{ cardId }}</code> получен из URL
            через <code>useRoute().params.id</code>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const cardId = route.params.id

const editCard = () => {
  console.log('Редактирование карточки ID:', cardId)
  // В реальном приложении здесь будет переход в режим редактирования
}

const goBack = () => {
  router.push('/')
}

const deleteCard = () => {
  if (confirm(`Удалить карточку ${cardId}?`)) {
    console.log('Удаление карточки ID:', cardId)
    router.push('/')
  }
}
</script>

<style scoped>
.card-view {
  min-height: 100vh;
  background: #f5f7fa;
  padding: 20px;
}

.card-view__container {
  max-width: 800px;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.card-view__header {
  padding: 20px 30px;
  border-bottom: 1px solid #eaeaea;
  background: #fafafa;
}

.card-view__back {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #4a6fa5;
  text-decoration: none;
  font-weight: 500;
  font-size: 14px;
  transition: color 0.2s;
}

.card-view__back:hover {
  color: #3a5a8a;
}

.card-view__back svg {
  width: 20px;
  height: 20px;
}

.card-view__content {
  padding: 30px;
}

.card-view__title-block {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 2px solid #f0f0f0;
}

.card-view__title {
  font-size: 28px;
  font-weight: 600;
  color: #333;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 12px;
}

.card-view__id {
  background: #4a6fa5;
  color: white;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 20px;
  font-weight: 500;
}

.card-view__status {
  display: flex;
  gap: 8px;
}

.status-badge {
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
}

.status-processing {
  background: #fff3cd;
  color: #856404;
  border: 1px solid #ffeaa7;
}

.card-view__section {
  margin-bottom: 30px;
}

.card-view__section-title {
  font-size: 18px;
  font-weight: 600;
  color: #555;
  margin-bottom: 12px;
}

.card-view__task-title {
  font-size: 20px;
  font-weight: 500;
  color: #333;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #4a6fa5;
}

.card-view__description {
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
  color: #555;
  line-height: 1.6;
}

.card-view__description p {
  margin: 8px 0;
}

.card-view__details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.detail-label {
  font-size: 14px;
  color: #777;
}

.detail-value {
  font-size: 16px;
  font-weight: 500;
  color: #333;
}

.priority-high {
  color: #dc3545;
  font-weight: 500;
}

.card-view__actions {
  display: flex;
  gap: 15px;
  margin-top: 40px;
  padding-top: 30px;
  border-top: 1px solid #eaeaea;
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.btn-primary {
  background: #4a6fa5;
  color: white;
}

.btn-primary:hover {
  background: #3a5a8a;
  transform: translateY(-2px);
}

.btn-secondary {
  background: #f0f0f0;
  color: #333;
}

.btn-secondary:hover {
  background: #e0e0e0;
}

.btn-danger {
  background: #fff;
  color: #dc3545;
  border: 1px solid #dc3545;
}

.btn-danger:hover {
  background: #dc3545;
  color: white;
}

.card-view__tech-info {
  margin-top: 30px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #28a745;
}

.tech-note {
  margin: 0;
  color: #555;
  font-size: 14px;
}

.tech-note code {
  background: #e9ecef;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  color: #d63384;
}

@media (max-width: 768px) {
  .card-view__title-block {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }

  .card-view__actions {
    flex-direction: column;
  }

  .btn {
    width: 100%;
  }
}
</style>

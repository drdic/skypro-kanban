<template>
  <div class="card-modal">
    <div class="card-modal__overlay" @click="goBack"></div>

    <div class="card-modal__content">
      <div class="card-modal__header">
        <a href="#" class="card-modal__close" @click.prevent="goBack">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </a>
        <div class="card-modal__title-group">
          <h3 class="card-modal__title">Просмотр карточки</h3>
          <span class="card-modal__id">ID: {{ cardId }}</span>
        </div>
        <div class="card-modal__status">
          <span class="status-badge _orange">В работе</span>
        </div>
      </div>

      <div class="card-modal__body">
        <div class="card-modal__block">
          <label class="card-modal__label">Название задачи</label>
          <div class="card-modal__input">
            <p>Разработка нового функционала Kanban доски</p>
          </div>
        </div>

        <div class="card-modal__block">
          <label class="card-modal__label">Описание</label>
          <div class="card-modal__textarea">
            <p>
              Необходимо реализовать систему перетаскивания карточек между колонками, добавление
              новых карточек и редактирование существующих.
            </p>
            <p>Срок выполнения: до конца недели.</p>
          </div>
        </div>

        <div class="card-modal__block">
          <label class="card-modal__label">Детали</label>
          <div class="card-modal__details">
            <div class="detail">
              <span class="detail-label">Создана:</span>
              <span class="detail-value">15.02.2024</span>
            </div>
            <div class="detail">
              <span class="detail-label">Исполнитель:</span>
              <span class="detail-value">Иван Иванов</span>
            </div>
            <div class="detail">
              <span class="detail-label">Приоритет:</span>
              <span class="detail-value priority-high">Высокий</span>
            </div>
          </div>
        </div>
      </div>

      <div class="card-modal__footer">
        <button class="btn btn-primary" @click="editCard">Редактировать</button>
        <button class="btn btn-secondary" @click="goBack">Отмена</button>
        <button class="btn btn-danger" @click="deleteCard">Удалить</button>
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
}

const goBack = () => {
  router.back()
}

const deleteCard = () => {
  if (confirm(`Удалить карточку ${cardId}?`)) {
    console.log('Удаление карточки ID:', cardId)
    router.push('/')
  }
}
</script>

<style scoped>
.card-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.card-modal__overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
}

.card-modal__content {
  position: relative;
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  animation: modalAppear 0.3s ease;
}

@keyframes modalAppear {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card-modal__header {
  padding: 25px 30px;
  border-bottom: 1px solid #e9ecef;
  display: flex;
  align-items: center;
  gap: 15px;
}

.card-modal__close {
  color: #94a6be;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
}

.card-modal__close:hover {
  color: #333;
}

.card-modal__title-group {
  flex: 1;
}

.card-modal__title {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #000;
}

.card-modal__id {
  font-size: 14px;
  color: #94a6be;
  margin-top: 4px;
  display: block;
}

.card-modal__status {
  flex-shrink: 0;
}

.status-badge {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
}

.status-badge._orange {
  background: rgba(255, 165, 0, 0.1);
  color: #ff8c00;
  border: 1px solid rgba(255, 165, 0, 0.3);
}

.card-modal__body {
  padding: 30px;
}

.card-modal__block {
  margin-bottom: 25px;
}

.card-modal__label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #000;
  margin-bottom: 10px;
}

.card-modal__input,
.card-modal__textarea,
.card-modal__details {
  background: #f8fafd;
  border: 1px solid #eaeef6;
  border-radius: 8px;
  padding: 15px;
}

.card-modal__input p,
.card-modal__textarea p {
  margin: 0;
  color: #333;
  line-height: 1.5;
}

.card-modal__textarea p + p {
  margin-top: 10px;
}

.card-modal__details {
  display: grid;
  gap: 12px;
}

.detail {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.detail-label {
  font-size: 14px;
  color: #94a6be;
}

.detail-value {
  font-size: 14px;
  color: #333;
  font-weight: 500;
}

.priority-high {
  color: #ff4d4d;
}

.card-modal__footer {
  padding: 20px 30px;
  border-top: 1px solid #e9ecef;
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.btn-primary {
  background: #565eef;
  color: white;
}

.btn-primary:hover {
  background: #454de0;
}

.btn-secondary {
  background: #f8fafd;
  color: #333;
  border: 1px solid #eaeef6;
}

.btn-secondary:hover {
  background: #eaeef6;
}

.btn-danger {
  background: white;
  color: #ff4d4d;
  border: 1px solid #ff4d4d;
}

.btn-danger:hover {
  background: #ff4d4d;
  color: white;
}

@media (max-width: 576px) {
  .card-modal__content {
    width: 95%;
  }

  .card-modal__header {
    flex-wrap: wrap;
    gap: 10px;
  }

  .card-modal__footer {
    flex-direction: column;
  }

  .btn {
    width: 100%;
  }
}
</style>

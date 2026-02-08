<template>
  <div class="add-card-view">
    <div class="add-card-view__container">
      <div class="add-card-view__header">
        <router-link to="/" class="add-card-view__back">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M19 12H5M12 19L5 12L12 5"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Назад к доске
        </router-link>
      </div>

      <div class="add-card-view__content">
        <h1 class="add-card-view__title">Добавить новую задачу</h1>

        <form @submit.prevent="addCard" class="add-card-form">
          <div class="form-group">
            <label for="taskTitle" class="form-label">Название задачи *</label>
            <input
              type="text"
              id="taskTitle"
              v-model="task.title"
              class="form-input"
              placeholder="Введите название задачи"
              required
            />
          </div>

          <div class="form-group">
            <label for="taskDescription" class="form-label">Описание</label>
            <textarea
              id="taskDescription"
              v-model="task.description"
              class="form-textarea"
              rows="4"
              placeholder="Опишите задачу подробнее..."
            ></textarea>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="taskStatus" class="form-label">Статус</label>
              <select id="taskStatus" v-model="task.status" class="form-select">
                <option value="backlog">Бэклог</option>
                <option value="processing">В работе</option>
                <option value="done">Готово</option>
                <option value="basket">Корзина</option>
              </select>
            </div>

            <div class="form-group">
              <label for="taskPriority" class="form-label">Приоритет</label>
              <select id="taskPriority" v-model="task.priority" class="form-select">
                <option value="low">Низкий</option>
                <option value="medium">Средний</option>
                <option value="high">Высокий</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label for="taskAssignee" class="form-label">Исполнитель</label>
            <input
              type="text"
              id="taskAssignee"
              v-model="task.assignee"
              class="form-input"
              placeholder="Введите имя исполнителя"
            />
          </div>

          <div class="form-group">
            <label for="taskDeadline" class="form-label">Срок выполнения</label>
            <input type="date" id="taskDeadline" v-model="task.deadline" class="form-input" />
          </div>

          <div class="add-card-actions">
            <button type="submit" class="btn btn-primary">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M8 1V15M1 8H15"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Создать задачу
            </button>
            <button type="button" class="btn btn-secondary" @click="cancel">Отмена</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const task = ref({
  title: '',
  description: '',
  status: 'backlog',
  priority: 'medium',
  assignee: '',
  deadline: '',
})

const addCard = () => {
  console.log('Создание новой задачи:', task.value)

  alert(`Задача "${task.value.title}" создана!`)
  router.push('/')
}

const cancel = () => {
  router.push('/')
}
</script>

<style scoped>
.add-card-view {
  min-height: 100vh;
  background: #f5f7fa;
  padding: 20px;
}

.add-card-view__container {
  max-width: 800px;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.add-card-view__header {
  padding: 20px 30px;
  border-bottom: 1px solid #eaeaea;
  background: #fafafa;
}

.add-card-view__back {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #4a6fa5;
  text-decoration: none;
  font-weight: 500;
  font-size: 14px;
  transition: color 0.2s;
}

.add-card-view__back:hover {
  color: #3a5a8a;
}

.add-card-view__back svg {
  width: 20px;
  height: 20px;
}

.add-card-view__content {
  padding: 30px;
}

.add-card-view__title {
  font-size: 28px;
  font-weight: 600;
  color: #333;
  margin: 0 0 30px 0;
  padding-bottom: 20px;
  border-bottom: 2px solid #f0f0f0;
}

.add-card-form {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
}

.form-label {
  font-size: 16px;
  font-weight: 500;
  color: #555;
}

.form-label::after {
  content: '*';
  color: #dc3545;
  margin-left: 4px;
}

.form-label:has(+ :not(:required))::after {
  content: '';
}

.form-input,
.form-textarea,
.form-select {
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  font-family: inherit;
  transition: all 0.2s;
  background: white;
}

.form-input:focus,
.form-textarea:focus,
.form-select:focus {
  outline: none;
  border-color: #4a6fa5;
  box-shadow: 0 0 0 3px rgba(74, 111, 165, 0.1);
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
}

.form-select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23555' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 16px center;
  padding-right: 40px;
}

.add-card-actions {
  display: flex;
  gap: 15px;
  margin-top: 30px;
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

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
    gap: 25px;
  }

  .add-card-actions {
    flex-direction: column;
  }

  .btn {
    width: 100%;
  }
}
</style>

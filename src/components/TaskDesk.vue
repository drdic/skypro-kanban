<template>
  <div class="container">
    <div class="main__block">
      <div v-if="isLoading" class="loading-state">
        <div class="loader" aria-label="Загрузка"></div>
        <p>Данные загружаются</p>
      </div>

      <div v-else-if="error" class="error-state">
        <p class="error-state__text">{{ error }}</p>
        <button class="error-state__retry _hover01" @click="loadTasks">
          Попробовать снова
        </button>
      </div>

      <div v-else-if="!hasTasks" class="empty-state">
        <p class="empty-state__title">Новых задач нет</p>
        <p class="empty-state__hint">Создайте первую задачу, чтобы начать работу</p>
        <router-link to="/add" class="empty-state__link _hover01">
          Создать задачу
        </router-link>
      </div>

      <div v-else class="main__content">
        <TaskColumn title="Без статуса">
          <TaskCard v-for="task in noStatusTasks" :key="task.id" :task="task" />
        </TaskColumn>

        <TaskColumn title="Нужно сделать">
          <TaskCard v-for="task in todoTasks" :key="task.id" :task="task" />
        </TaskColumn>

        <TaskColumn title="В работе">
          <TaskCard v-for="task in inProgressTasks" :key="task.id" :task="task" />
        </TaskColumn>

        <TaskColumn title="Тестирование">
          <TaskCard v-for="task in testingTasks" :key="task.id" :task="task" />
        </TaskColumn>

        <TaskColumn title="Готово">
          <TaskCard v-for="task in doneTasks" :key="task.id" :task="task" />
        </TaskColumn>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed, inject } from 'vue'
import { useRouter } from 'vue-router'
import { getTasks } from '../services/kanban.js'
import TaskColumn from './TaskColumn.vue'
import TaskCard from './TaskCard.vue'

export default {
  name: 'TaskDesk',
  components: {
    TaskColumn,
    TaskCard,
  },
  setup() {
    const { board } = inject('boardData')
    const { removeUser } = inject('auth')
    const { showToast } = inject('notifications')
    const router = useRouter()
    const isLoading = ref(true)
    const error = ref('')

    const getThemeColor = (topic) => {
      const themeMap = {
        'Web Design': 'orange',
        Research: 'green',
        Copywriting: 'purple',
      }
      return themeMap[topic] || 'orange'
    }

    const statusMap = {
      'Без статуса': 'no-status',
      'Нужно сделать': 'todo',
      'В работе': 'in-progress',
      Тестирование: 'testing',
      Готово: 'done',
    }

    const adaptTasks = (taskList) => {
      return taskList.map((task) => ({
        id: task._id,
        title: task.title,
        category: task.topic,
        theme: getThemeColor(task.topic),
        date: task.date,
      }))
    }

    const hasTasks = computed(() => board.tasks.length > 0)

    const noStatusTasks = computed(() =>
      adaptTasks(board.tasks.filter((task) => statusMap[task.status] === 'no-status')),
    )
    const todoTasks = computed(() =>
      adaptTasks(board.tasks.filter((task) => statusMap[task.status] === 'todo')),
    )
    const inProgressTasks = computed(() =>
      adaptTasks(board.tasks.filter((task) => statusMap[task.status] === 'in-progress')),
    )
    const testingTasks = computed(() =>
      adaptTasks(board.tasks.filter((task) => statusMap[task.status] === 'testing')),
    )
    const doneTasks = computed(() =>
      adaptTasks(board.tasks.filter((task) => statusMap[task.status] === 'done')),
    )

    const loadTasks = async () => {
      isLoading.value = true
      error.value = ''
      try {
        board.tasks = await getTasks()
      } catch (err) {
        if (err.status === 401) {
          removeUser()
          showToast('Сессия истекла, войдите снова', 'error')
          router.push({ name: 'login' })
          return
        }
        error.value = err.message
        showToast(err.message, 'error')
      } finally {
        isLoading.value = false
      }
    }

    onMounted(loadTasks)

    return {
      isLoading,
      error,
      loadTasks,
      hasTasks,
      noStatusTasks,
      todoTasks,
      inProgressTasks,
      testingTasks,
      doneTasks,
    }
  },
}
</script>

<style scoped>
.main__block {
  width: 100%;
  margin: 0 auto;
  padding: 25px 0 49px;
}

.main__content {
  width: 100%;
  display: flex;
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  min-height: 300px;
  font-size: 18px;
  font-weight: 500;
  color: var(--color-text-secondary);
}

.loading-state p {
  animation: loader-text-pulse 1.6s ease-in-out infinite;
}

.loader {
  position: relative;
  width: 64px;
  height: 64px;
}

.loader::before,
.loader::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 3px solid transparent;
}

.loader::before {
  border-top-color: var(--color-accent);
  border-right-color: var(--color-accent);
  animation: loader-spin 1s linear infinite;
}

.loader::after {
  border-bottom-color: var(--color-text-secondary);
  border-left-color: var(--color-text-secondary);
  animation: loader-spin 1.6s linear infinite reverse;
}

@keyframes loader-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes loader-text-pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.45;
  }
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  min-height: 300px;
  text-align: center;
}

.empty-state__title {
  font-size: 20px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.empty-state__hint {
  font-size: 14px;
  color: var(--color-text-secondary);
}

.empty-state__link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  padding: 0 20px;
  margin-top: 8px;
  border-radius: 4px;
  background-color: var(--color-accent);
  color: var(--color-text-white);
  font-size: 14px;
  font-weight: 500;
}

.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  min-height: 300px;
  text-align: center;
}

.error-state__text {
  font-size: 16px;
  color: #e53e3e;
}

.error-state__retry {
  height: 30px;
  padding: 0 20px;
  border: 0.7px solid var(--color-accent);
  border-radius: 4px;
  background: transparent;
  color: var(--color-accent);
  font-size: 14px;
  font-weight: 500;
}

@media screen and (max-width: 1200px) {
  .main__block {
    width: 100%;
    margin: 0 auto;
    padding: 40px 0 64px;
  }

  .main__content {
    display: block;
  }
}
</style>

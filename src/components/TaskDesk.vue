<template>
  <div class="container">
    <div class="main__block">
      <div v-if="isLoading" class="loading-state">
        <div class="loader" aria-label="Загрузка"></div>
        <p>Данные загружаются</p>
      </div>

      <div v-else-if="!hasTasks" class="empty-state">
        <p>Задач нет</p>
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
import { ref, onMounted, computed } from 'vue'
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
    const isLoading = ref(true)
    const tasksData = ref([])

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
      'Тестирование': 'testing',
      'Готово': 'done',
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

    const hasTasks = computed(() => tasksData.value.length > 0)

    const noStatusTasks = computed(() =>
      adaptTasks(
        tasksData.value.filter((task) => statusMap[task.status] === 'no-status'),
      ),
    )
    const todoTasks = computed(() =>
      adaptTasks(
        tasksData.value.filter((task) => statusMap[task.status] === 'todo'),
      ),
    )
    const inProgressTasks = computed(() =>
      adaptTasks(
        tasksData.value.filter(
          (task) => statusMap[task.status] === 'in-progress',
        ),
      ),
    )
    const testingTasks = computed(() =>
      adaptTasks(
        tasksData.value.filter((task) => statusMap[task.status] === 'testing'),
      ),
    )
    const doneTasks = computed(() =>
      adaptTasks(
        tasksData.value.filter((task) => statusMap[task.status] === 'done'),
      ),
    )

    const loadTasks = async () => {
      isLoading.value = true
      try {
        tasksData.value = await getTasks()
      } catch (error) {
        // При ошибке авторизации возвращаем на логин
        if (error.status === 401) {
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          window.location.href = import.meta.env.BASE_URL + 'login'
        }
      } finally {
        isLoading.value = false
      }
    }

    onMounted(loadTasks)

    return {
      isLoading,
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
  gap: 16px;
  min-height: 300px;
  font-size: 18px;
  font-weight: 500;
  color: var(--color-text-secondary);
}

.loading-state p {
  animation: loader-text-pulse 1.6s ease-in-out infinite;
}

.loader {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 4px solid var(--color-border-light);
  border-top-color: var(--color-accent);
  animation: loader-spin 0.9s linear infinite;
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
  align-items: center;
  justify-content: center;
  min-height: 300px;
  font-size: 18px;
  font-weight: 500;
  color: var(--color-text-secondary);
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

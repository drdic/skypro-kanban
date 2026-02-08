<template>
  <div class="container">
    <div class="main__block">
      <div v-if="isLoading" class="loading-state">
        <div class="loader"></div>
        <p>Данные загружаются...</p>
      </div>

      <div v-else-if="!hasTasks" class="empty-state">
        <div class="empty-icon">📋</div>
        <h3 class="empty-title">Задач нет</h3>
        <p class="empty-description">Создайте первую задачу</p>
      </div>

      <div v-else class="main__content">
        <TaskColumn title="Без статуса">
          <Task v-for="task in noStatusTasks" :key="task.id" :task="task" />
        </TaskColumn>

        <TaskColumn title="Нужно сделать">
          <Task v-for="task in todoTasks" :key="task.id" :task="task" />
        </TaskColumn>

        <TaskColumn title="В работе">
          <Task v-for="task in inProgressTasks" :key="task.id" :task="task" />
        </TaskColumn>

        <TaskColumn title="Тестирование">
          <Task v-for="task in testingTasks" :key="task.id" :task="task" />
        </TaskColumn>

        <TaskColumn title="Готово">
          <Task v-for="task in doneTasks" :key="task.id" :task="task" />
        </TaskColumn>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { theme } from '../theme.js'
import { tasks } from './mocks/tasks.js'
import TaskColumn from './TaskColumn.vue'
import Task from './Task.vue'

export default {
  name: 'TaskDesk',
  components: {
    TaskColumn,
    Task,
  },
  setup() {
    const isLoading = ref(true)
    const tasksData = ref([])

    const hasTasks = computed(() => tasksData.value && tasksData.value.length > 0)

    const getThemeColor = (topic) => {
      const themeMap = {
        'Web Design': 'orange',
        Research: 'green',
        Copywriting: 'purple',
      }
      return themeMap[topic] || 'orange'
    }

    const adaptTasks = (tasks) => {
      return tasks.map((task) => ({
        title: task.title,
        category: task.topic,
        theme: getThemeColor(task.topic),
        date: task.date,
      }))
    }

    const noStatusTasks = computed(() =>
      adaptTasks(tasksData.value.filter((task) => task.status === 'no-status')),
    )
    const todoTasks = computed(() =>
      adaptTasks(tasksData.value.filter((task) => task.status === 'todo')),
    )
    const inProgressTasks = computed(() =>
      adaptTasks(tasksData.value.filter((task) => task.status === 'in-progress')),
    )
    const testingTasks = computed(() =>
      adaptTasks(tasksData.value.filter((task) => task.status === 'testing')),
    )
    const doneTasks = computed(() =>
      adaptTasks(tasksData.value.filter((task) => task.status === 'done')),
    )

    onMounted(() => {
      setTimeout(() => {
        tasksData.value = tasks
        isLoading.value = false
      }, 2000)
    })

    return {
      isLoading,
      hasTasks,
      noStatusTasks,
      todoTasks,
      inProgressTasks,
      testingTasks,
      doneTasks,
      theme,
    }
  },
}
</script>

<style scoped>
.container {
  min-height: 100vh;
  background: #eaeef6;
}

.main__block {
  min-height: calc(100vh - 70px);
  display: flex;
  flex-direction: column;
}

.loading-state {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  width: 100%;
}

.loader {
  width: 50px;
  height: 50px;
  border: 4px solid #94a6be;
  border-top: 4px solid #565eef;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

.empty-state {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  width: 100%;
  background: #eaeef6;
  border-radius: 8px;
  text-align: center;
  color: #333333;
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 16px;
  opacity: 0.5;
}

.empty-title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #000000;
}

.empty-description {
  font-size: 16px;
  color: #666666;
}

.main__content {
  display: flex;
  width: 100%;
  gap: 20px;
  min-height: 400px;
  background: #eaeef6;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

<template>
  <div class="container">
    <div class="main__block">
      <!-- Состояние загрузки с анимацией -->
      <div v-if="isLoading" class="loading-state">
        <div class="loader"></div>
        <p>Данные загружаются...</p>
      </div>

      <!-- Пустое состояние после загрузки -->
      <div v-else-if="!hasTasks" class="empty-state">
        <div class="empty-icon">📋</div>
        <h3 class="empty-title">Задач нет</h3>
        <p class="empty-description">Создайте первую задачу</p>
      </div>

      <!-- Основной контент после загрузки -->
      <div v-else class="main__content">
        <!-- Колонка "Без статуса" -->
        <TaskColumn title="Без статуса">
          <Task v-for="task in noStatusTasks" :key="task.id" :task="task" />
        </TaskColumn>

        <!-- Колонка "Нужно сделать" -->
        <TaskColumn title="Нужно сделать">
          <Task v-for="task in todoTasks" :key="task.id" :task="task" />
        </TaskColumn>

        <!-- Колонка "В работе" -->
        <TaskColumn title="В работе">
          <Task v-for="task in inProgressTasks" :key="task.id" :task="task" />
        </TaskColumn>

        <!-- Колонка "Тестирование" -->
        <TaskColumn title="Тестирование">
          <Task v-for="task in testingTasks" :key="task.id" :task="task" />
        </TaskColumn>

        <!-- Колонка "Готово" -->
        <TaskColumn title="Готово">
          <Task v-for="task in doneTasks" :key="task.id" :task="task" />
        </TaskColumn>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { theme } from '../theme.js' // <-- ИМПОРТИРУЕМ ТЕМУ
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
    // Состояние загрузки
    const isLoading = ref(true)
    const tasksData = ref([])

    // Проверка на наличие задач
    const hasTasks = computed(() => tasksData.value && tasksData.value.length > 0)

    // Преобразуем topic в theme для цвета
    const getThemeColor = (topic) => {
      const themeMap = {
        'Web Design': 'orange',
        Research: 'green',
        Copywriting: 'purple',
      }
      return themeMap[topic] || 'orange'
    }

    // Адаптируем задачи для компонента Task
    const adaptTasks = (tasks) => {
      return tasks.map((task) => ({
        title: task.title,
        category: task.topic,
        theme: getThemeColor(task.topic),
        date: task.date,
      }))
    }

    // Фильтруем задачи по статусам
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

    // Имитация загрузки
    onMounted(() => {
      setTimeout(() => {
        // Для теста можно сделать пустой массив:
        //tasksData.value = [] // ← для проверки пустого состояния
        tasksData.value = tasks // ← обычное состояние
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
      theme, // <-- ДОБАВЛЯЕМ ТЕМУ В RETURN
    }
  },
}
</script>

<style scoped>
.loading-state {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 400px;
  gap: 20px;
}

.loader {
  width: 50px;
  height: 50px;
  border: 4px solid v-bind('theme.colors.textMuted');
  border-top: 4px solid v-bind('theme.colors.primary');
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.empty-state {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 400px;
  text-align: center;
  color: v-bind('theme.colors.textSecondary');
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
  color: v-bind('theme.colors.textPrimary');
}

.empty-description {
  font-size: 16px;
}

.main__content {
  display: flex;
  width: 100%;
  gap: 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>

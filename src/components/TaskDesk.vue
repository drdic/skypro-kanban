<template>
  <div class="task-desk">
    <!-- Состояние загрузки -->
    <div v-if="isLoading" class="loading-state">
      <div class="loader"></div>
      <p class="loader__text">Загрузка задач...</p>
    </div>

    <!-- Сообщение при пустом массиве -->
    <div v-else-if="!isLoading && tasksData.length === 0" class="empty-state">
      <div class="empty-state__icon">📋</div>
      <p class="empty-state__text">Задач нет</p>
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
</template>

<script>
import { ref, onMounted, computed } from 'vue'
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
        // Для теста пустого состояния:
        //tasksData.value = [] // Раскомментируйте для теста "Задач нет"
        tasksData.value = tasks // Оставьте для нормальной работы
        isLoading.value = false
      }, 2000)
    })

    return {
      isLoading,
      tasksData,
      noStatusTasks,
      todoTasks,
      inProgressTasks,
      testingTasks,
      doneTasks,
    }
  },
}
</script>

<style lang="scss" scoped>
@use '@/assets/variables.scss' as *;

.task-desk {
  flex: 1;
  padding: 24px;
  min-height: calc(100vh - 80px);
}

.loading-state {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  gap: 20px;
}

.loader {
  width: 60px;
  height: 60px;
  border: 4px solid transparent;
  border-top: 4px solid $blue;
  border-right: 4px solid $blue;
  border-radius: 50%;
  animation: spin 1s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 5px;
    left: 5px;
    right: 5px;
    bottom: 5px;
    border: 3px solid transparent;
    border-top: 3px solid $blue-dark;
    border-radius: 50%;
    animation: spin 1.5s linear infinite reverse;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}

.loader__text {
  color: $gray-dark;
  font-size: 18px;
  font-weight: 500;
  animation: pulse 1.5s ease-in-out infinite;

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.6;
    }
  }
}

.empty-state {
  text-align: center;
  padding: 80px 20px;
  background-color: $white;
  border-radius: $border-radius;
  box-shadow: $box-shadow;
  max-width: 500px;
  margin: 60px auto;
  border: 2px dashed $gray;

  &__icon {
    font-size: 64px;
    margin-bottom: 20px;
    opacity: 0.7;
  }

  &__text {
    font-size: 24px;
    color: $gray-dark;
    margin-bottom: 30px;
    font-weight: 500;
  }

  &__button {
    background: linear-gradient(135deg, $blue, $blue-dark);
    color: white;
    border: none;
    padding: 14px 32px;
    border-radius: $border-radius;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba($blue, 0.2);

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 6px 20px rgba($blue, 0.3);
    }

    &:active {
      transform: translateY(-1px);
    }
  }
}

.main__content {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;

  @media (max-width: 1400px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}
</style>

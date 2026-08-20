<template>
  <div class="container">
    <div class="main__block">
      <!-- Состояние загрузки -->
      <div v-if="isLoading" class="loading-state">
        <p>Данные загружаются</p>
      </div>

      <!-- Основной контент после загрузки -->
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
import { tasks } from './mocks/tasks.js'
import TaskColumn from './TaskColumn.vue'
import TaskCard from './TaskCard.vue'

export default {
  name: 'TaskDesk',
  components: {
    TaskColumn,
    TaskCard,
  },
  setup() {
    // Состояние загрузки
    const isLoading = ref(true)
    const tasksData = ref([])

    // Преобразуем topic в theme для цвета
    const getThemeColor = (topic) => {
      const themeMap = {
        'Web Design': 'orange',
        Research: 'green',
        Copywriting: 'purple',
      }
      return themeMap[topic] || 'orange'
    }

    // Адаптируем задачи для компонента TaskCard
    const adaptTasks = (taskList) => {
      return taskList.map((task) => ({
        id: task.id,
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
        tasksData.value = tasks
        isLoading.value = false
      }, 2000)
    })

    return {
      isLoading,
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
.loading-state {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  font-size: 18px;
  font-weight: 500;
  color: #94a6be;
}
</style>

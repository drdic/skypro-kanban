<template>
  <div class="container">
    <div class="main__block">
      <!-- Состояние загрузки -->
      <div v-if="isLoading" class="loading-state">
        <p>Данные загружаются...</p>
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
    // Состояние загрузки (критерий 6)
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

    // Адаптируем задачи для компонента Task
    const adaptTasks = (tasks) => {
      return tasks.map((task) => ({
        title: task.title,
        category: task.topic,
        theme: getThemeColor(task.topic),
        date: task.date,
      }))
    }

    // Фильтруем задачи по статусам (критерии 4-5)
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

    // Имитация загрузки (критерии 7-8)
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
  height: 200px;
  font-size: 18px;
  color: #666;
  background-color: #eaeef6;
  border-radius: 10px;
}

.main__content {
  display: flex;
  width: 100%;
  gap: 20px;
}
</style>

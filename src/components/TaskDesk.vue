<template>
  <div class="container">
    <div class="main__block">
      <p v-if="isLoading" class="simple-loading">Данные загружаются...</p>

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
import { tasks } from './mocks/tasks.js'
import TaskColumn from './TaskColumn.vue'
import Task from './Task.vue'

export default {
  name: 'TaskDesk',
  components: { TaskColumn, Task },
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
.simple-loading {
  text-align: center;
  font-size: 18px;
  color: #666;
  padding: 40px 0;
  margin: 0;
}

.main__content {
  display: flex;
  width: 100%;
}
</style>

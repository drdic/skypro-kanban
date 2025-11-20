<template>
  <div class="container">
    <div class="main__block">
      <div class="main__content">
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
import { tasks } from './mocks/tasks.js'
import TaskColumn from './TaskColumn.vue'
import Task from './Task.vue'

export default {
  name: 'TaskDesk',
  components: {
    TaskColumn,
    Task,
  },
  data() {
    return {
      tasksData: tasks,
    }
  },
  computed: {
    noStatusTasks() {
      return this.adaptTasks(this.tasksData.filter((task) => task.status === 'no-status'))
    },
    todoTasks() {
      return this.adaptTasks(this.tasksData.filter((task) => task.status === 'todo'))
    },
    inProgressTasks() {
      return this.adaptTasks(this.tasksData.filter((task) => task.status === 'in-progress'))
    },
    testingTasks() {
      return this.adaptTasks(this.tasksData.filter((task) => task.status === 'testing'))
    },
    doneTasks() {
      return this.adaptTasks(this.tasksData.filter((task) => task.status === 'done'))
    },
  },
  methods: {
    adaptTasks(tasks) {
      return tasks.map((task) => ({
        title: task.title,
        category: task.topic,
        theme: this.getThemeColor(task.topic),
        date: task.date,
      }))
    },
    getThemeColor(topic) {
      const themeMap = {
        'Web Design': 'orange',
        Research: 'green',
        Copywriting: 'purple',
      }
      return themeMap[topic] || 'orange'
    },
  },
}
</script>

<template>
  <div class="main__block">
    <div class="main__content">
      <TaskColumn title="Без статуса">
        <Task 
          v-for="(task, index) in tasks.noStatus" 
          :key="index" 
          :task="task" 
        />
      </TaskColumn>
      
      <TaskColumn title="Нужно сделать">
        <Task 
          v-for="(task, index) in tasks.todo" 
          :key="index" 
          :task="task" 
        />
      </TaskColumn>
      
      <TaskColumn title="В работе">
        <Task 
          v-for="(task, index) in tasks.inProgress" 
          :key="index" 
          :task="task" 
        />
      </TaskColumn>
      
      <TaskColumn title="Тестирование">
        <Task 
          v-for="(task, index) in tasks.testing" 
          :key="index" 
          :task="task" 
        />
      </TaskColumn>
      
      <TaskColumn title="Готово">
        <Task 
          v-for="(task, index) in tasks.done" 
          :key="index" 
          :task="task" 
        />
      </TaskColumn>
    </div>
  </div>
</template>

<script>
import TaskColumn from './TaskColumn.vue'
import Task from './Task.vue'

export default {
  name: 'TaskDesk',
  components: {
    TaskColumn,
    Task
  },
  data() {
    return {
      tasks: {
        noStatus: [
          { title: 'Название задачи', category: 'Web Design', theme: 'orange', date: '30.10.23' },
          { title: 'Название задачи', category: 'Research', theme: 'green', date: '30.10.23' },
          { title: 'Название задачи', category: 'Web Design', theme: 'orange', date: '30.10.23' },
          { title: 'Название задачи', category: 'Copywriting', theme: 'purple', date: '30.10.23' },
          { title: 'Название задачи', category: 'Web Design', theme: 'orange', date: '30.10.23' }
        ],
        todo: [
          { title: 'Название задачи', category: 'Research', theme: 'green', date: '30.10.23' }
        ],
        inProgress: [
          { title: 'Название задачи', category: 'Research', theme: 'green', date: '30.10.23' },
          { title: 'Название задачи', category: 'Copywriting', theme: 'purple', date: '30.10.23' },
          { title: 'Название задачи', category: 'Web Design', theme: 'orange', date: '30.10.23' }
        ],
        testing: [
          { title: 'Название задачи', category: 'Research', theme: 'green', date: '30.10.23' }
        ],
        done: [
          { title: 'Название задачи', category: 'Research', theme: 'green', date: '30.10.23' }
        ]
      }
    }
  }
}
</script>
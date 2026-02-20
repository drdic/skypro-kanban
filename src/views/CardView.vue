<template>
  <div>
    <TaskModal :task="task" />
  </div>
</template>

<script setup>
import TaskModal from '@/components/TaskModal.vue';
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const task = computed(() => {
  const tasks = JSON.parse(localStorage.getItem('tasks') || '[]')
  const taskId = Number(route.params.id)
  const foundTask = tasks.find((t) => t.id === taskId)

  console.log('CardView - route.params.id:', route.params.id)
  console.log('CardView - taskId:', taskId)
  console.log('CardView - foundTask:', foundTask)

  return foundTask || {
    id: 0,
    title: 'Задача не найдена',
    topic: '',
    description: '',
    date: '',
    status: ''
  };
});
</script>


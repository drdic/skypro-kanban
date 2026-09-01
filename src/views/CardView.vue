<template>
  <div>
    <TaskModal :task-id="taskId" />
  </div>
</template>

<script setup>
import TaskModal from '@/components/TaskModal.vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const taskId = computed(() => route.params.id)
</script>

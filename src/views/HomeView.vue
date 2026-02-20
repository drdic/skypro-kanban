<template>
  <div class="wrapper">
    <BaseHeader />
    <main class="main">
      <TaskDesk />
    </main>
  </div>
</template>

<script>
import BaseHeader from '@/components/BaseHeader.vue'
import TaskDesk from '@/components/TaskDesk.vue'

export default {
  name: 'HomeView',
  components: {
    BaseHeader,
    TaskDesk,
  },
}
</script>

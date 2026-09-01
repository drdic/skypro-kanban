<template>
  <div class="wrapper">
    <BaseHeader />
    <main class="main">
      <keep-alive>
        <TaskDesk />
      </keep-alive>
    </main>
    <router-view />
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

<style scoped>
.main {
  width: 100%;
  min-height: 100vh;
  background-color: var(--color-bg-content);
}
</style>

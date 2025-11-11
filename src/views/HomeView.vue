<template>
  <div class="wrapper">
    <div class="container">
      <BaseHeader />
      <main class="main">
        <TaskDesk />
      </main>
    </div>
    <TaskModal />
    <NewCardModal />
    <ExitModal />
  </div>
</template>

<script>
import BaseHeader from '@/components/BaseHeader.vue'
import TaskDesk from '@/components/TaskDesk.vue'
import TaskModal from '@/components/TaskModal.vue'
import NewCardModal from '@/components/NewCardModal.vue'
import ExitModal from '@/components/ExitModal.vue'

export default {
  name: 'HomeView',
  components: {
    BaseHeader,
    TaskDesk,
    TaskModal,
    NewCardModal,
    ExitModal
  }
}
</script>
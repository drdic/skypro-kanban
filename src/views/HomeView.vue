<template>
  <div class="wrapper">
    <!-- Временно используем упрощенный заголовок -->
    <BaseHeader />
    <main class="main">
      <TaskDesk />
    </main>
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
//import BaseHeaderSimple from '@/components/BaseHeaderSimple.vue'

export default {
  name: 'HomeView',
  components: {
    //BaseHeaderSimple,
    BaseHeader,
    TaskDesk,
    TaskModal,
    NewCardModal,
    ExitModal,
  },
}
</script>

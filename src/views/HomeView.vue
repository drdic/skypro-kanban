<template>
  <div class="wrapper">
    <BaseHeader />
    <main class="main">
      <div class="container">
        <TaskBoard />
      </div>
    </main>
    <!-- Попапы пока оставляем здесь по заданию -->
    <div class="pop-exit" id="popExit">
      <!-- Код попапа выхода -->
    </div>
    <div class="pop-new-card" id="popNewCard">
      <!-- Код попапа создания задачи -->
    </div>
    <div class="pop-browse" id="popBrowse">
      <!-- Код попапа просмотра задачи -->
    </div>
  </div>
</template>

<script>
import BaseHeader from '@/components/BaseHeader.vue'
import TaskBoard from '@/components/TaskBoard.vue'
import ExitModal from '@/components/ExitModal.vue'
import NewCardModal from '@/components/NewCardModal.vue'
import TaskCard from '@/components/TaskCard.vue'
import TaskColumn from '@/components/TaskColumn.vue'
import TaskModal from '@/components/TaskModal.vue'
// ... импорты остальных компонентов

export default {
  name: 'HomeView',
  components: {
    BaseHeader,
    TaskBoard,
    ExitModal,
    NewCardModal,
    TaskCard,
    TaskColumn,
    TaskModal,
    // ... регистрация компонентов
  },
}
</script>

<style>
@import '@/assets/main.css';
</style>

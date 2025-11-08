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

export default {
  name: 'HomeView',
  components: {
    BaseHeader,
    TaskBoard,
  },
}
</script>

<style>
@import '@/assets/main.css';
</style>

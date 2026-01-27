<template>
  <div class="task-column">
    <div class="task-column__header">
      <h3 class="task-column__title">{{ title }}</h3>
    </div>
    <div class="task-column__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TaskColumn',
  props: ['title'],
}
</script>

<style lang="scss" scoped>
@use '@/assets/variables.scss' as *;

.task-column {
  background-color: $white;
  border-radius: $border-radius;
  box-shadow: $box-shadow;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 500px;
  max-height: 80vh;

  &__header {
    padding: 16px 20px;
    background-color: $gray-light;
    border-bottom: 2px solid $gray;
  }

  &__title {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: $gray-darker;
  }

  &__content {
    padding: 16px;
    flex-grow: 1;
    overflow-y: auto;

    // Стили для скроллбара внутри колонки
    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background: $gray-medium;
      border-radius: 3px;
    }
  }
}
</style>

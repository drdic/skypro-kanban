<template>
  <div class="task-column" :class="getColumnClass()">
    <div class="task-column__header">
      <h3 class="task-column__title">{{ title }}</h3>
      <span class="task-column__count">
        <slot></slot>
      </span>
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
  methods: {
    getColumnClass() {
      const columnMap = {
        'Без статуса': 'task-column--no-status',
        'Нужно сделать': 'task-column--todo',
        'В работе': 'task-column--in-progress',
        Тестирование: 'task-column--testing',
        Готово: 'task-column--done',
      }
      return columnMap[this.title] || ''
    },
  },
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
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }

  &__header {
    padding: 16px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid transparent;
  }

  &__title {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
  }

  &__count {
    background-color: rgba(255, 255, 255, 0.2);
    color: $white;
    font-size: 14px;
    font-weight: 600;
    padding: 4px 10px;
    border-radius: 12px;
    min-width: 24px;
    text-align: center;
  }

  &__content {
    padding: 16px;
    flex-grow: 1;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-track {
      background: rgba(0, 0, 0, 0.05);
      border-radius: 3px;
    }

    &::-webkit-scrollbar-thumb {
      background: rgba(0, 0, 0, 0.2);
      border-radius: 3px;

      &:hover {
        background: rgba(0, 0, 0, 0.3);
      }
    }
  }

  // Стили для разных типов колонок
  &--no-status {
    .task-column__header {
      background-color: lighten($gray, 15%);
      border-bottom-color: $gray;

      .task-column__title {
        color: $gray-darker;
      }

      .task-column__count {
        background-color: $gray-dark;
      }
    }
  }

  &--todo {
    .task-column__header {
      background-color: lighten($orange, 35%);
      border-bottom-color: $orange;

      .task-column__title {
        color: darken($orange, 20%);
      }

      .task-column__count {
        background-color: $orange;
      }
    }
  }

  &--in-progress {
    .task-column__header {
      background-color: lighten($blue, 35%);
      border-bottom-color: $blue;

      .task-column__title {
        color: darken($blue, 20%);
      }

      .task-column__count {
        background-color: $blue;
      }
    }
  }

  &--testing {
    .task-column__header {
      background-color: lighten(#9c27b0, 40%);
      border-bottom-color: #9c27b0;

      .task-column__title {
        color: darken(#9c27b0, 10%);
      }

      .task-column__count {
        background-color: #9c27b0;
      }
    }
  }

  &--done {
    .task-column__header {
      background-color: lighten($green, 40%);
      border-bottom-color: $green;

      .task-column__title {
        color: darken($green, 20%);
      }

      .task-column__count {
        background-color: $green;
      }
    }
  }
}
</style>

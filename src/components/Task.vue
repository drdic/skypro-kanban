<template>
  <div class="task-card">
    <div class="task-card__header">
      <div :class="['task-card__category', `task-card__category--${task.theme}`]">
        <span>{{ task.category }}</span>
      </div>
      <button class="task-card__menu-btn">
        <div class="menu-dot"></div>
        <div class="menu-dot"></div>
        <div class="menu-dot"></div>
      </button>
    </div>
    <div class="task-card__content">
      <h4 class="task-card__title">{{ task.title }}</h4>
      <div class="task-card__date">
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
          <!-- SVG код оставляем как есть -->
          <g clip-path="url(#clip0_1_415)">
            <path
              d="M10.5625 2.03125H2.4375C1.7644 2.03125 1.21875 2.5769 1.21875 3.25V10.5625C1.21875 11.2356 1.7644 11.7812 2.4375 11.7812H10.5625C11.2356 11.7812 11.7812 11.2356 11.7812 10.5625V3.25C11.7812 2.5769 11.2356 2.03125 10.5625 2.03125Z"
              stroke="#94A6BE"
              stroke-width="0.8"
              stroke-linejoin="round"
            />
            <path
              d="M11.7812 4.0625H1.21875M3.25 1.21875V2.03125V1.21875ZM9.75 1.21875V2.03125V1.21875Z"
              stroke="#94A6BE"
              stroke-width="0.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_1_415">
              <rect width="13" height="13" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <span>{{ task.date }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Task',
  props: {
    task: Object,
  },
}
</script>

<style lang="scss" scoped>
@use '@/assets/variables.scss' as *;

.task-card {
  background-color: $white;
  border: 1px solid $gray;
  border-radius: $border-radius;
  padding: 16px;
  margin-bottom: 12px;
  transition: $transition;
  cursor: pointer;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
    border-color: $blue;
  }

  &:last-child {
    margin-bottom: 0;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 12px;
  }

  &__category {
    padding: 4px 12px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 500;

    &--orange {
      background-color: rgba($orange, 0.1);
      color: $orange;
    }

    &--green {
      background-color: rgba($green, 0.1);
      color: $green;
    }

    &--purple {
      background-color: rgba(#9c27b0, 0.1);
      color: #9c27b0;
    }
  }

  &__menu-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    display: flex;
    flex-direction: column;
    gap: 2px;

    &:hover .menu-dot {
      background-color: $gray-dark;
    }
  }

  .menu-dot {
    width: 4px;
    height: 4px;
    background-color: $gray-medium;
    border-radius: 50%;
  }

  &__content {
    .task-card__title {
      margin: 0 0 8px 0;
      font-size: 16px;
      font-weight: 600;
      color: $gray-darker;
      line-height: 1.4;
    }

    .task-card__date {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
      color: $gray-dark;

      svg {
        flex-shrink: 0;
      }
    }
  }
}
</style>

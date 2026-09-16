<template>
  <div class="toasts">
    <transition-group name="toast">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="toast"
        :class="`toast_${toast.type}`"
        role="status"
      >
        <span class="toast__text">{{ toast.message }}</span>
        <button type="button" class="toast__close" @click="$emit('close', toast.id)">
          &#10006;
        </button>
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: 'BaseToast',
  props: {
    toasts: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['close'],
}
</script>

<style scoped>
.toasts {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 20;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 340px;
}

.toast {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 14px;
  border-radius: 8px;
  background-color: var(--color-bg-white);
  border: 0.7px solid var(--color-border);
  box-shadow: 0 10px 30px var(--color-shadow-popup);
  font-size: 14px;
  line-height: 20px;
  color: var(--color-text-primary);
}

.toast_success {
  border-left: 3px solid var(--color-green-text);
}

.toast_error {
  border-left: 3px solid #e53e3e;
}

.toast__text {
  flex: 1;
}

.toast__close {
  border: none;
  background: transparent;
  color: var(--color-text-secondary);
  font-size: 12px;
  line-height: 1;
  cursor: pointer;
}

.toast__close:hover {
  color: var(--color-text-primary);
}

.toast-enter-active,
.toast-leave-active {
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

@media screen and (max-width: 495px) {
  .toasts {
    top: auto;
    bottom: 16px;
    right: 16px;
    left: 16px;
    max-width: none;
  }
}
</style>

<template>
  <!-- Используем v-if из глобального состояния -->
  <div v-if="isExitModalOpen" class="container">
    <div class="pop-exit">
      <div class="pop-exit__container">
        <div class="pop-exit__block">
          <div class="pop-exit__ttl">
            <h2>Выйти из аккаунта?</h2>
          </div>
          <form class="pop-exit__form" id="formExit" action="#">
            <div class="pop-exit__form-group">
              <!-- Используем функцию из глобального состояния -->
              <button class="pop-exit__exit-yes _hover01" @click="closeExitModal">
                <a href="#">Да, выйти</a>
              </button>
              <button class="pop-exit__exit-no _hover03" @click="closeExitModal">
                <a href="#">Нет, остаться</a>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { inject } from 'vue'

export default {
  name: 'ExitModal',
  setup() {
    // Получаем состояние и функции из App.vue
    const { isExitModalOpen, closeExitModal } = inject('exitModal')

    return {
      isExitModalOpen,
      closeExitModal
    }
  }
}
</script>

<template>
  <header class="header">
    <div class="container">
      <div class="header__block">
        <div class="header__logo _show _light">
          <a href="#" target="_self"><img src="/assets/images/logo.png" alt="logo" /></a>
        </div>
        <div class="header__logo _dark">
          <a href="#" target="_self"><img src="/assets/images/logo_dark.png" alt="logo" /></a>
        </div>
        <nav class="header__nav" ref="headerNav">
          <button class="header__btn-main-new _hover01" id="btnMainNew">
            <a href="#popNewCard">Создать новую задачу</a>
          </button>
          <a href="#" class="header__user _hover02" @click.prevent="togglePopup">Ivan Ivanov</a>
          <div v-if="isPopupOpen" class="header__pop-user-set pop-user-set">
            <p class="pop-user-set__name">Ivan Ivanov</p>
            <p class="pop-user-set__mail">ivan.ivanov@gmail.com</p>
            <div class="pop-user-set__theme">
              <p>Темная тема</p>
              <input type="checkbox" class="checkbox" name="checkbox" />
            </div>
            <button type="button" class="_hover03" @click="closePopup">
              <a href="#popExit" @click="closePopup">Выйти</a>
            </button>
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue'

export default {
  name: 'BaseHeader',
  setup() {
    const isPopupOpen = ref(false)
    const headerNav = ref(null)

    const togglePopup = () => {
      isPopupOpen.value = !isPopupOpen.value
    }

    const closePopup = () => {
      isPopupOpen.value = false
    }

    const handleClickOutside = (event) => {
      if (headerNav.value && !headerNav.value.contains(event.target)) {
        closePopup()
      }
    }

    onMounted(() => {
      document.addEventListener('click', handleClickOutside)
    })

    onBeforeUnmount(() => {
      document.removeEventListener('click', handleClickOutside)
    })

    return {
      isPopupOpen,
      headerNav,
      togglePopup,
      closePopup,
    }
  },
}
</script>

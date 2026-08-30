<template>
  <header class="header">
    <div class="container">
      <div class="header__block">
        <div class="header__logo _show _light">
          <a href="#" target="_self"
            ><img :src="`${baseUrl}assets/images/logo.png`" alt="logo"
          /></a>
        </div>
        <div class="header__logo _dark">
          <a href="#" target="_self"
            ><img :src="`${baseUrl}assets/images/logo_dark.png`" alt="logo"
          /></a>
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
    const baseUrl = import.meta.env.BASE_URL

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
      baseUrl,
      togglePopup,
      closePopup,
    }
  },
}
</script>

<style scoped>
.header {
  width: 100%;
  margin: 0 auto;
  background-color: var(--color-bg-white);
}

.header__block {
  height: 70px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  position: relative;
  top: 0;
  left: 0;
  padding: 0 10px;
}

.header__logo img {
  width: 85px;
}

.header__nav {
  max-width: 290px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header__btn-main-new {
  width: 178px;
  height: 30px;
  border-radius: 4px;
  background-color: var(--color-accent);
  color: var(--color-text-white);
  border: none;
  font-size: 14px;
  line-height: 1;
  font-weight: 500;
  margin-right: 20px;
}

.header__btn-main-new a {
  color: var(--color-text-white);
}

.header__user {
  height: 20px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  line-height: 20px;
  color: var(--color-accent);
}

.header__user::after {
  content: '';
  display: block;
  width: 6px;
  height: 6px;
  border-radius: 1px;
  border-left: 1.9px solid var(--color-accent);
  border-bottom: 1.9px solid var(--color-accent);
  transform: rotate(-45deg);
  margin: -6px 0 0 5px;
  padding: 0;
}

.header__pop-user-set {
  display: block;
  position: absolute;
  top: 61px;
  right: 0;
  width: 213px;
  height: 205px;
  border-radius: 10px;
  border: 0.7px solid var(--color-border-light);
  background: var(--color-bg-white);
  box-shadow: 0px 10px 39px 0px var(--color-shadow-popup);
  padding: 34px;
  text-align: center;
  z-index: 2;
}

.pop-user-set__name {
  color: var(--color-text-primary);
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  letter-spacing: -0.14px;
  margin-bottom: 4px;
}

.pop-user-set__mail {
  color: var(--color-text-secondary);
  font-size: 14px;
  line-height: 21px;
  letter-spacing: -0.14px;
  margin-bottom: 10px;
}

.pop-user-set__theme {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
}

.pop-user-set__theme p {
  color: var(--color-text-primary);
  font-size: 14px;
  line-height: 21px;
  letter-spacing: -0.14px;
}

.pop-user-set__theme input[type='checkbox'] {
  position: relative;
  width: 24px;
  height: 13px;
  border-radius: 100px;
  background: var(--color-bg-content);
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

.pop-user-set__theme input[type='checkbox']::before {
  content: '';
  position: absolute;
  top: 1px;
  left: 1px;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background-color: var(--color-text-secondary);
  transition: 0.5s;
}

.pop-user-set__theme input:checked[type='checkbox']::before {
  left: 12px;
}

.pop-user-set button {
  width: 72px;
  height: 30px;
  background: transparent;
  color: var(--color-accent);
  border-radius: 4px;
  border: 1px solid var(--color-accent);
}

.pop-user-set button a {
  color: var(--color-accent);
}

@media screen and (max-width: 495px) {
  .header__btn-main-new {
    z-index: 3;
    position: fixed;
    left: 16px;
    bottom: 30px;
    top: auto;
    width: calc(100vw - 32px);
    height: 40px;
    border-radius: 4px;
    margin-right: 0;
  }
}
</style>

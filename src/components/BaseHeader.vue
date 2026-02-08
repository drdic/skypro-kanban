<template>
  <header class="header">
    <div class="container">
      <div class="header__block">
        <div class="header__logo _show _light">
          <router-link to="/">
            <img src="@/assets/images/logo.png" alt="logo" />
          </router-link>
        </div>
        <div class="header__logo _dark">
          <router-link to="/">
            <img src="@/assets/images/logo_dark.png" alt="logo" />
          </router-link>
        </div>
        <nav class="header__nav">
          <button class="header__btn-main-new _hover01">
            <router-link to="/add">Создать новую задачу</router-link>
          </button>

          <!-- Ссылка с якорем для открытия модального окна -->
          <a href="#user-set-target" class="header__user _hover02">
            Ivan Ivanov
          </a>

          <!-- Модальное окно пользователя -->
          <div class="header__pop-user-set pop-user-set" id="user-set-target">
            <!-- Кнопка закрытия (крестик) -->
            <a href="#" class="pop-user-set__close">×</a>

            <p class="pop-user-set__name">Ivan Ivanov</p>
            <p class="pop-user-set__mail">ivan.ivanov@gmail.com</p>

            <div class="pop-user-set__theme">
              <p>Темная тема</p>
              <input type="checkbox" class="checkbox" name="checkbox" />
            </div>

            <button type="button" class="_hover03">
              <router-link to="/exit">Выйти</router-link>
            </button>
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'BaseHeader',
}
</script>

<style scoped>
/* Стили для кнопки закрытия */
.pop-user-set__close {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 24px;
  height: 24px;
  color: #94A6BE;
  font-size: 24px;
  text-decoration: none;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s;
}

.pop-user-set__close:hover {
  color: #000;
  background-color: #f0f0f0;
}

/* Убедимся, что модальное окно правильно позиционируется */
.header__nav {
  position: relative;
}

/* Важно: переопределяем display для :target */
.header__pop-user-set:target {
  display: block !important;
}
</style>

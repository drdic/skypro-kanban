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

          <a href="#user-set-target" class="header__user _hover02"> Ivan Ivanov </a>

          <div class="header__pop-user-set pop-user-set" id="user-set-target">
            <p class="pop-user-set__name">Ivan Ivanov</p>
            <p class="pop-user-set__mail">ivan.ivanov@gmail.com</p>

            <div class="pop-user-set__theme">
              <p>Темная тема</p>
              <input type="checkbox" class="checkbox" name="checkbox" />
            </div>
            <!-- Заменили якорь на router-link для перехода на страницу выхода -->
            <router-link to="/exit" class="_hover03 pop-user-set__exit">
              Выйти
            </router-link>
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>

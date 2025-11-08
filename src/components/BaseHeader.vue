<template>
  <header class="header">
    <div class="container">
      <div class="header__block">
        <div class="header__logo _show _light">
          <a href="" target="_self"><img src="@/assets/images/logo.png" alt="logo" /></a>
        </div>
        <nav class="header__nav">
          <button class="header__btn-main-new _hover01">
            <a href="#popNewCard">Создать новую задачу</a>
          </button>
          <a href="#user-set-target" class="header__user _hover02">Ivan Ivanov</a>
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

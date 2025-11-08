<template>
  <div class="main__column column">
    <div class="column__title">
      <p>{{ title }}</p>
    </div>
    <div class="cards">
      <!-- Пока оставляем пустым - карточки добавим позже -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'TaskColumn',
  props: ['title'],
}
</script>

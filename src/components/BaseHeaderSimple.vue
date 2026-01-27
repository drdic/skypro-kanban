<template>
  <header class="header-simple">
    <h1 class="header-simple__title">Канбан-доска</h1>
  </header>
</template>

<script>
export default {
  name: 'BaseHeaderSimple',
}
</script>

<style lang="scss" scoped>
@use '@/assets/variables.scss' as *;

.header-simple {
  background-color: $white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px 24px;
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid $gray;

  &__title {
    margin: 0;
    font-size: 24px;
    font-weight: 600;
    color: $gray-darker;
    letter-spacing: -0.5px;
  }
}
</style>

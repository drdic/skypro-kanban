<template>
  <div class="main__column column">
    <div class="column__title">
      <p>{{ title }}</p>
    </div>
    <div class="cards">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TaskColumn',
  props: ['title'],
}
</script>

<style scoped>
.main__column {
  width: 20%;
  margin: 0 auto;
  display: block;
}

.column__title {
  padding: 0 10px;
  margin: 15px 0;
}

.column__title p {
  color: var(--color-text-secondary);
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
  text-transform: uppercase;
}

.cards {
  width: 100%;
  display: block;
  position: relative;
}

@media screen and (max-width: 1200px) {
  .main__column {
    width: 100%;
    margin: 0 auto;
    display: block;
  }

  .cards {
    width: 100%;
    display: flex;
    overflow-y: auto;
  }
}
</style>

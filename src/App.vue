<template>
  <HomeView />
</template>

<script>
import HomeView from './views/HomeView.vue'

export default {
  name: 'App',
  components: {
    HomeView,
  },
}
</script>

<style lang="scss">
@import '@/assets/variables.scss';

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: $font-family;
  background-color: $gray-light;
  color: $gray-darker;
  line-height: 1.5;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

// Стили для скроллбара (опционально)
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: $gray-light;
}

::-webkit-scrollbar-thumb {
  background: $gray-medium;
  border-radius: 4px;

  &:hover {
    background: $gray-dark;
  }
}
</style>

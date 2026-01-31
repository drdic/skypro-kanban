<template>
  <div>
    <button @click="toggleLoading">Toggle Loading</button>
    <button @click="toggleEmpty">Toggle Empty</button>
    <button @click="toggleNormal">Toggle Normal</button>
  </div>
</template>

<script setup>
const emit = defineEmits(['changeState'])

const toggleLoading = () => {
  emit('changeState', 'loading')
}

const toggleEmpty = () => {
  emit('changeState', 'empty')
}

const toggleNormal = () => {
  emit('changeState', 'normal')
}
</script>

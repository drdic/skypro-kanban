<script>
import { provide, ref } from 'vue'
import HomeView from './views/HomeView.vue'

export default {
  name: 'App',
  components: {
    HomeView
  },
  setup() {
    const isExitModalOpen = ref(false)

    // Функции для управления модальным окном
    const openExitModal = () => {
      isExitModalOpen.value = true
    }

    const closeExitModal = () => {
      isExitModalOpen.value = false
    }

    // Делаем доступным для всех дочерних компонентов
    provide('exitModal', {
      isExitModalOpen,
      openExitModal,
      closeExitModal
    })

    return {}
  }
}
</script>

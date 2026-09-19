<template>
  <div class="not-found">
    <div class="not-found__container">
      <div class="not-found__block">
        <img
          :src="`${baseUrl}assets/images/404.jpg`"
          alt="Страница не найдена"
          class="not-found__image"
        />

        <h1 class="not-found__title">Страница не найдена</h1>

        <p class="not-found__text">
          Запрашиваемая страница не существует или была перемещена.
        </p>

        <div class="not-found__actions">
          <router-link to="/" class="not-found__btn not-found__btn_primary _hover01">
            Вернуться на главную
          </router-link>
          <button
            type="button"
            class="not-found__btn not-found__btn_secondary _hover03"
            @click="goBack"
          >
            Вернуться назад
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const baseUrl = import.meta.env.BASE_URL
const router = useRouter()

const goBack = () => {
  router.back()
}
</script>

<style scoped>
.not-found {
  width: 100%;
  min-height: 100vh;
  background-color: var(--color-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.not-found__container {
  width: 100%;
  max-width: 630px;
  margin: 0 auto;
}

.not-found__block {
  background-color: var(--color-bg-white);
  border-radius: 10px;
  border: 0.7px solid var(--color-border);
  padding: 40px 30px;
  text-align: center;
}

.not-found__image {
  max-width: 340px;
  width: 100%;
  height: auto;
  border-radius: 10px;
  margin-bottom: 20px;
}

.not-found__title {
  color: var(--color-text-primary);
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
  margin-bottom: 14px;
}

.not-found__text {
  color: var(--color-text-secondary);
  font-size: 14px;
  line-height: 21px;
  letter-spacing: -0.14px;
  margin-bottom: 30px;
}

.not-found__actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
}

.not-found__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  padding: 0 15px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  letter-spacing: -0.14px;
}

.not-found__btn_primary {
  background-color: var(--color-accent);
  border: none;
  color: var(--color-text-white);
}

.not-found__btn_secondary {
  background-color: transparent;
  border: 0.7px solid var(--color-accent);
  color: var(--color-accent);
}

@media screen and (max-width: 495px) {
  .not-found__block {
    padding: 20px 16px 32px;
  }

  .not-found__actions {
    flex-direction: column;
  }

  .not-found__btn {
    width: 100%;
    height: 40px;
  }
}
</style>

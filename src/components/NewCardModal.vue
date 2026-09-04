<template>
  <div class="container">
    <div class="pop-new-card" id="popNewCard">
      <div class="pop-new-card__container">
        <div class="pop-new-card__block">
          <div class="pop-new-card__content">
            <h3 class="pop-new-card__ttl">Создание задачи</h3>
            <router-link to="/" class="pop-new-card__close">&#10006;</router-link>
            <div class="pop-new-card__wrap">
              <form
                class="pop-new-card__form form-new"
                id="formNewCard"
                action="#"
                @submit.prevent="handleSubmit"
              >
                <div class="form-new__block">
                  <label for="formTitle" class="subttl">Название задачи</label>
                  <input
                    class="form-new__input"
                    type="text"
                    name="name"
                    id="formTitle"
                    placeholder="Введите название задачи..."
                    autofocus
                    v-model="title"
                  />
                </div>
                <div class="form-new__block">
                  <label for="textArea" class="subttl">Описание задачи</label>
                  <textarea
                    class="form-new__area"
                    name="text"
                    id="textArea"
                    placeholder="Введите описание задачи..."
                    v-model="description"
                  ></textarea>
                </div>
                <p v-if="error" class="form-new__error">{{ error }}</p>
              </form>
              <div class="pop-new-card__calendar calendar">
                <p class="calendar__ttl subttl">Даты</p>
                <div class="calendar__block">
                  <div class="calendar__nav">
                    <div class="calendar__month">{{ monthLabel }}</div>
                    <div class="nav__actions">
                      <div class="nav__action" @click="changeMonth(-1)">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="6"
                          height="11"
                          viewBox="0 0 6 11"
                        >
                          <path
                            d="M5.72945 1.95273C6.09018 1.62041 6.09018 1.0833 5.72945 0.750969C5.36622 0.416344 4.7754 0.416344 4.41218 0.750969L0.528487 4.32883C-0.176162 4.97799 -0.176162 6.02201 0.528487 6.67117L4.41217 10.249C4.7754 10.5837 5.36622 10.5837 5.72945 10.249C6.09018 9.9167 6.09018 9.37959 5.72945 9.04727L1.87897 5.5L5.72945 1.95273Z"
                          />
                        </svg>
                      </div>
                      <div class="nav__action" @click="changeMonth(1)">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="6"
                          height="11"
                          viewBox="0 0 6 11"
                        >
                          <path
                            d="M0.27055 9.04727C-0.0901833 9.37959 -0.0901832 9.9167 0.27055 10.249C0.633779 10.5837 1.2246 10.5837 1.58783 10.249L5.47151 6.67117C6.17616 6.02201 6.17616 4.97799 5.47151 4.32883L1.58782 0.75097C1.2246 0.416344 0.633778 0.416344 0.270549 0.75097C-0.0901831 1.0833 -0.090184 1.62041 0.270549 1.95273L4.12103 5.5L0.27055 9.04727Z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div class="calendar__content">
                    <div class="calendar__days-names">
                      <div class="calendar__day-name">пн</div>
                      <div class="calendar__day-name">вт</div>
                      <div class="calendar__day-name">ср</div>
                      <div class="calendar__day-name">чт</div>
                      <div class="calendar__day-name">пт</div>
                      <div class="calendar__day-name -weekend-">сб</div>
                      <div class="calendar__day-name -weekend-">вс</div>
                    </div>
                    <div class="calendar__cells">
                      <div
                        v-for="cell in calendarCells"
                        :key="cell.key"
                        class="calendar__cell"
                        :class="cell.cls"
                        @click="selectDay(cell)"
                      >
                        {{ cell.day }}
                      </div>
                    </div>
                  </div>

                  <div class="calendar__period">
                    <p class="calendar__p date-end">
                      Выберите срок исполнения
                      <span class="date-control">{{ selectedDateLabel }}</span>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="pop-new-card__categories categories">
              <p class="categories__p subttl">Категория</p>
              <div class="categories__themes">
                <div
                  v-for="cat in categories"
                  :key="cat.name"
                  class="categories__theme"
                  :class="[cat.theme, { '_active-category': category === cat.name }]"
                  @click="category = cat.name"
                >
                  <p :class="cat.theme">{{ cat.name }}</p>
                </div>
              </div>
            </div>
            <button class="form-new__create _hover01" id="btnCreate" @click="handleSubmit">Создать задачу</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { createTask } from '../services/kanban.js'

export default {
  name: 'NewCardModal',
  setup() {
    const router = useRouter()
    const title = ref('')
    const description = ref('')
    const error = ref('')
    const category = ref('Web Design')
    const categories = [
      { name: 'Web Design', theme: '_orange' },
      { name: 'Research', theme: '_green' },
      { name: 'Copywriting', theme: '_purple' },
    ]

    const now = new Date()
    const month = ref(now.getMonth())
    const year = ref(now.getFullYear())
    const selectedDate = ref(null)

    const months = [
      'Январь',
      'Февраль',
      'Март',
      'Апрель',
      'Май',
      'Июнь',
      'Июль',
      'Август',
      'Сентябрь',
      'Октябрь',
      'Ноябрь',
      'Декабрь',
    ]

    const monthLabel = computed(() => `${months[month.value]} ${year.value}`)

    const calendarCells = computed(() => {
      const firstDayOffset = (new Date(year.value, month.value, 1).getDay() + 6) % 7
      const daysInMonth = new Date(year.value, month.value + 1, 0).getDate()
      const daysInPrevMonth = new Date(year.value, month.value, 0).getDate()
      const cells = []

      for (let i = 0; i < firstDayOffset; i++) {
        const day = daysInPrevMonth - firstDayOffset + i + 1
        cells.push({ day, other: true, key: `prev-${i}`, cls: '_other-month' })
      }

      for (let d = 1; d <= daysInMonth; d++) {
        const isSelected = selectedDate.value === d
        const isToday =
          d === now.getDate() &&
          month.value === now.getMonth() &&
          year.value === now.getFullYear()
        const weekday = (firstDayOffset + d - 1) % 7
        const cls = ['_cell-day']
        if (isSelected) cls.push('_active-day')
        if (isToday) cls.push('_current')
        if (weekday === 5 || weekday === 6) cls.push('_weekend')
        cells.push({ day: d, other: false, key: `day-${d}`, cls: cls.join(' ') })
      }

      return cells
    })

    const selectedDateLabel = computed(() => {
      if (selectedDate.value === null) return ''
      return `${String(selectedDate.value).padStart(2, '0')}.${String(month.value + 1).padStart(2, '0')}.${String(year.value).slice(2)}`
    })

    const changeMonth = (offset) => {
      let newMonth = month.value + offset
      let newYear = year.value
      if (newMonth < 0) {
        newMonth = 11
        newYear -= 1
      } else if (newMonth > 11) {
        newMonth = 0
        newYear += 1
      }
      month.value = newMonth
      year.value = newYear
    }

    const selectDay = (cell) => {
      if (cell.other) return
      selectedDate.value = cell.day
    }

    const handleSubmit = async () => {
      if (!title.value.trim()) {
        error.value = 'Введите название задачи'
        return
      }

      error.value = ''
      try {
        const pad2 = (n) => String(n).padStart(2, '0')
        const date = selectedDate.value
          ? `${year.value}-${pad2(month.value + 1)}-${pad2(selectedDate.value)}T00:00:00.000Z`
          : undefined

        await createTask({
          title: title.value,
          description: description.value.trim() || 'Без описания',
          topic: category.value,
          date,
        })
        router.push('/')
      } catch (err) {
        error.value = err.message
      }
    }

    return {
      title,
      description,
      error,
      category,
      categories,
      monthLabel,
      calendarCells,
      selectedDateLabel,
      changeMonth,
      selectDay,
      handleSubmit,
    }
  },
}
</script>

<style scoped>
.pop-new-card {
  display: block;
  width: 100%;
  min-width: 375px;
  height: 100%;
  min-height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 6;
}

.pop-new-card__container {
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--color-overlay);
}

.pop-new-card__block {
  display: block;
  margin: 0 auto;
  background-color: var(--color-bg-white);
  max-width: 630px;
  width: 100%;
  padding: 40px 30px 48px;
  border-radius: 10px;
  border: 0.7px solid var(--color-border);
  position: relative;
}

.pop-new-card__content {
  display: block;
  text-align: left;
}

.pop-new-card__ttl {
  color: var(--color-text-primary);
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
  margin-bottom: 20px;
}

.pop-new-card__close {
  position: absolute;
  top: 20px;
  right: 30px;
  color: var(--color-text-secondary);
  cursor: pointer;
}

.pop-new-card__close:hover {
  color: var(--color-text-primary);
}

.pop-new-card__wrap {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.pop-new-card__form {
  max-width: 370px;
  width: 100%;
  display: block;
  margin-bottom: 20px;
}

.form-new__block {
  display: flex;
  flex-direction: column;
}

.form-new__input,
.form-new__area {
  width: 100%;
  outline: none;
  padding: 14px;
  background: transparent;
  border: 0.7px solid var(--color-border-light);
  border-radius: 8px;
  font-size: 14px;
  line-height: 1;
  letter-spacing: -0.14px;
}

.form-new__input::placeholder,
.form-new__area::placeholder {
  font-weight: 400;
  font-size: 14px;
  line-height: 1px;
  color: var(--color-text-secondary);
  letter-spacing: -0.14px;
}

.form-new__input {
  margin: 20px 0;
}

.form-new__area {
  max-width: 370px;
  margin-top: 14px;
  height: 200px;
}

.form-new__error {
  color: #e53e3e;
  font-size: 14px;
  margin-top: 10px;
}

.form-new__create {
  width: 132px;
  height: 30px;
  background-color: var(--color-accent);
  border-radius: 4px;
  border: 0;
  outline: none;
  font-size: 14px;
  font-weight: 500;
  line-height: 1;
  color: var(--color-text-white);
  float: right;
}

.subttl {
  color: var(--color-text-primary);
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
}

.calendar {
  width: 182px;
  margin-bottom: 20px;
}

.calendar__ttl {
  margin-bottom: 14px;
  padding: 0 7px;
}

.calendar__p {
  color: var(--color-text-secondary);
  font-size: 10px;
  line-height: 1;
}

.calendar__p span {
  color: var(--color-text-primary);
}

.calendar__block {
  display: block;
}

.calendar__month {
  color: var(--color-text-secondary);
  font-size: 14px;
  line-height: 25px;
  font-weight: 600;
}

.calendar__content {
  margin-bottom: 12px;
}

.calendar__days-names {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  margin: 7px 0;
  padding: 0 7px;
}

.calendar__day-name {
  color: var(--color-text-secondary);
  font-size: 10px;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.2px;
}

.calendar__cells {
  width: 182px;
  height: 126px;
  display: flex;
  flex-wrap: wrap;
}

.calendar__cell {
  width: 22px;
  height: 22px;
  margin: 2px;
  border-radius: 50%;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  color: var(--color-text-secondary);
  font-size: 10px;
  line-height: 1;
  letter-spacing: -0.2px;
  cursor: pointer;
}

.calendar__nav {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 14px;
  padding: 0 7px;
}

.calendar__period {
  padding: 0 7px;
}

.nav__actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav__action {
  width: 18px;
  height: 25px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav__action svg {
  fill: var(--color-text-secondary);
}

._other-month {
  opacity: 0;
}

._cell-day:hover {
  color: var(--color-text-secondary);
  background-color: var(--color-bg-content);
}

._active-day {
  background-color: var(--color-text-secondary);
  color: var(--color-text-white);
}

._current {
  font-weight: 700;
}

.categories {
  margin-bottom: 20px;
}

.categories__themes {
  display: flex;
  flex-wrap: nowrap;
  align-items: flex-start;
  justify-content: flex-start;
}

.categories__p {
  margin-bottom: 14px;
}

.categories__theme {
  display: inline-block;
  width: auto;
  height: 30px;
  padding: 8px 20px;
  border-radius: 24px;
  margin-right: 7px;
  opacity: 0.4;
  cursor: pointer;
}

.categories__theme p {
  font-size: 14px;
  font-weight: 600;
  line-height: 14px;
  white-space: nowrap;
}

@media screen and (max-width: 660px) {
  .pop-new-card {
    top: 70px;
  }

  .pop-new-card__container {
    padding: 0;
    justify-content: flex-start;
  }

  .pop-new-card__block {
    border-radius: 0;
  }

  .pop-new-card__wrap {
    display: block;
  }

  .calendar {
    max-width: 340px;
    width: 100%;
  }

  .calendar__ttl,
  .calendar__nav,
  .calendar__period {
    padding: 0;
  }

  .calendar__p {
    font-size: 14px;
  }

  .calendar__day-name {
    font-size: 14px;
  }

  .calendar__cells {
    width: 344px;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .calendar__cell {
    width: 42px;
    height: 42px;
    font-size: 14px;
  }
}

@media screen and (max-width: 495px) {
  .pop-new-card__container {
    padding: 0;
    justify-content: flex-start;
  }

  .pop-new-card__block {
    padding: 20px 16px 32px;
  }

  .pop-new-card__form {
    max-width: 100%;
    width: 100%;
    display: block;
  }

  .pop-new-card__calendar {
    width: 100%;
  }

  .form-new__area {
    max-width: 100%;
    height: 34px;
  }

  .form-new__create {
    width: 100%;
    height: 40px;
  }
}
</style>

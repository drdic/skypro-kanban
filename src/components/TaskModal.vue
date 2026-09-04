<template>
  <div class="container">
    <div class="pop-browse" id="popBrowse">
      <div class="pop-browse__container">
        <div class="pop-browse__block">
          <div class="pop-browse__content">
            <div class="pop-browse__top-block">
              <h3 class="pop-browse__ttl">Задача №{{ taskNumber }}</h3>
              <div class="categories__theme theme-top _orange _active-category">
                <p class="_orange">{{ task?.topic || 'Без категории' }}</p>
              </div>
            </div>
            <div class="pop-browse__status status">
              <p class="status__p subttl">Статус</p>
              <div class="status__themes">
                <div
                  v-for="status in statuses"
                  :key="status"
                  class="status__theme"
                  :class="{
                    _gray: task?.status === status,
                    _hide: !isEditing && task?.status !== status,
                  }"
                  @click="selectStatus(status)"
                >
                  <p :class="{ _gray: task?.status === status }">{{ status }}</p>
                </div>
              </div>
            </div>
            <div class="pop-browse__wrap">
              <form class="pop-browse__form form-browse" id="formBrowseCard" action="#">
                <div class="form-browse__block">
                  <label for="formTitle" class="subttl">Название задачи</label>
                  <input
                    class="form-browse__input"
                    name="title"
                    id="formTitle"
                    type="text"
                    :readonly="!isEditing"
                    v-model="task.title"
                  />
                </div>
                <div class="form-browse__block">
                  <label for="textArea01" class="subttl">Описание задачи</label>
                  <textarea
                    class="form-browse__area"
                    name="text"
                    id="textArea01"
                    :readonly="!isEditing"
                    placeholder="Введите описание задачи..."
                    v-model="task.description"
                  ></textarea>
                </div>
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
                      Срок исполнения: <span class="date-control">{{ formattedDate }}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="theme-down__categories theme-down">
              <p class="categories__p subttl">Категория</p>
              <div class="categories__theme _orange _active-category">
                <p class="_orange">Web Design</p>
              </div>
            </div>
            <div class="pop-browse__btn-browse" :class="{ _hide: isEditing }">
              <div class="btn-group">
                <button class="btn-browse__edit _btn-bor _hover03" @click="isEditing = true">
                  Редактировать задачу
                </button>
                <button class="btn-browse__delete _btn-bor _hover03" @click="handleDelete">
                  Удалить задачу
                </button>
              </div>
              <button class="btn-browse__close _btn-bg _hover01">
                <router-link to="/">Закрыть</router-link>
              </button>
            </div>
            <div class="pop-browse__btn-edit" :class="{ _hide: !isEditing }">
              <div class="btn-group">
                <button class="btn-edit__edit _btn-bg _hover01" @click="handleSave">
                  Сохранить
                </button>
                <button class="btn-edit__edit _btn-bor _hover03" @click="isEditing = false">
                  Отменить
                </button>
                <button class="btn-edit__delete _btn-bor _hover03" id="btnDelete" @click="handleDelete">
                  Удалить задачу
                </button>
              </div>
              <button class="btn-edit__close _btn-bg _hover01">
                <router-link to="/">Закрыть</router-link>
              </button>
            </div>
            <p v-if="error" class="pop-browse__error">{{ error }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getTask, getTasks, updateTask, deleteTask } from '../services/kanban.js'

export default {
  name: 'TaskModal',
  props: {
    taskId: {
      type: [String, Number],
      default: null,
    },
  },
  data() {
    return {
      isEditing: false,
      isLoading: true,
      task: {},
      error: '',
      statuses: ['Без статуса', 'Нужно сделать', 'В работе', 'Тестирование', 'Готово'],
      month: 8,
      year: 2023,
      selectedDate: null,
      taskNumber: 1,
    }
  },
  computed: {
    formattedDate() {
      const parsed = this.parseDateParts(this.task?.date)
      if (!parsed) return '—'
      return `${String(parsed.day).padStart(2, '0')}.${String(parsed.month + 1).padStart(2, '0')}.${String(parsed.year).slice(2)}`
    },
    monthLabel() {
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
      return `${months[this.month]} ${this.year}`
    },
    calendarCells() {
      // Пн-Вс: 0..6
      const firstDayOffset = (new Date(this.year, this.month, 1).getDay() + 6) % 7
      const daysInMonth = new Date(this.year, this.month + 1, 0).getDate()
      const daysInPrevMonth = new Date(this.year, this.month, 0).getDate()
      const cells = []

      for (let i = 0; i < firstDayOffset; i++) {
        const day = daysInPrevMonth - firstDayOffset + i + 1
        cells.push({ day, other: true, key: `prev-${i}`, cls: '_other-month' })
      }

      for (let d = 1; d <= daysInMonth; d++) {
        const isSelected = this.selectedDate === d
        const isToday = d === new Date().getDate() && this.month === new Date().getMonth() && this.year === new Date().getFullYear()
        const weekday = (firstDayOffset + d - 1) % 7
        const cls = []
        if (isSelected) cls.push('_active-day')
        if (isToday) cls.push('_current')
        if (weekday === 5 || weekday === 6) cls.push('_weekend')
        cells.push({ day: d, other: false, key: `day-${d}`, cls: cls.join(' ') })
      }

      return cells
    },
  },
  async mounted() {
    try {
      this.task = await getTask(this.taskId)
      const parsed = this.parseDateParts(this.task?.date)
      if (parsed) {
        this.selectedDate = parsed.day
        this.month = parsed.month
        this.year = parsed.year
      }
      // Порядковый номер задачи по её позиции в общем списке
      const allTasks = await getTasks()
      const index = allTasks.findIndex((t) => t._id === this.taskId)
      this.taskNumber = index !== -1 ? index + 1 : 1
    } catch (err) {
      this.error = err.message
      if (err.status === 401) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        window.location.href = import.meta.env.BASE_URL + 'login'
      }
    } finally {
      this.isLoading = false
    }
  },
  methods: {
    parseDateParts(dateStr) {
      if (!dateStr) return null
      // ISO формат: YYYY-MM-DDTHH:mm:ss.sssZ
      const isoMatch = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})/)
      if (isoMatch) {
        return {
          day: Number(isoMatch[3]),
          month: Number(isoMatch[2]) - 1,
          year: Number(isoMatch[1]),
        }
      }
      // Формат: DD.MM.YYYY
      const parts = dateStr.split('.')
      if (parts.length === 3) {
        return {
          day: Number(parts[0]),
          month: Number(parts[1]) - 1,
          year: Number(parts[2]),
        }
      }
      return null
    },
    selectStatus(status) {
      if (!this.isEditing) return
      this.task = { ...this.task, status }
    },
    changeMonth(offset) {
      let newMonth = this.month + offset
      let newYear = this.year
      if (newMonth < 0) {
        newMonth = 11
        newYear -= 1
      } else if (newMonth > 11) {
        newMonth = 0
        newYear += 1
      }
      this.month = newMonth
      this.year = newYear
    },
    selectDay(cell) {
      if (!this.isEditing || cell.other) return
      this.selectedDate = cell.day
      this.task = {
        ...this.task,
        date: `${String(cell.day).padStart(2, '0')}.${String(this.month + 1).padStart(2, '0')}.${this.year}`,
      }
    },
    async handleSave() {
      if (!this.task?.title) {
        this.error = 'Введите название задачи'
        return
      }
      try {
        await updateTask(this.taskId, {
          title: this.task.title,
          description: this.task.description,
          topic: this.task.topic,
          status: this.task.status,
          date: this.task.date,
        })
        this.isEditing = false
        this.$router.push('/')
      } catch (err) {
        this.error = err.message
      }
    },
    async handleDelete() {
      try {
        await deleteTask(this.taskId)
        this.$router.push('/')
      } catch (err) {
        this.error = err.message
      }
    },
  },
}
</script>

<style scoped>
.pop-browse {
  display: block;
  width: 100%;
  height: 100%;
  min-width: 375px;
  min-height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 7;
}

.pop-browse__container {
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

.pop-browse__block {
  display: block;
  margin: 0 auto;
  background-color: var(--color-bg-white);
  max-width: 630px;
  width: 100%;
  padding: 40px 30px 38px;
  border-radius: 10px;
  border: 0.7px solid var(--color-border);
  position: relative;
}

.pop-browse__content {
  display: block;
  text-align: left;
}

.pop-browse__content .categories__theme {
  opacity: 1;
}

.pop-browse__content .theme-down {
  display: none;
  margin-bottom: 20px;
}

.pop-browse__content .theme-top {
  display: block;
}

.pop-browse__top-block {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
}

.pop-browse__ttl {
  color: var(--color-text-primary);
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
}

.pop-browse__wrap {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.pop-browse__form {
  max-width: 370px;
  width: 100%;
  display: block;
  margin-bottom: 20px;
}

.pop-browse__btn-browse,
.pop-browse__btn-edit {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
}

.pop-browse__btn-browse button,
.pop-browse__btn-edit button {
  height: 30px;
  margin-bottom: 10px;
  padding: 0 14px;
}

.pop-browse__btn-browse .btn-group button,
.pop-browse__btn-edit .btn-group button {
  margin-right: 8px;
}

._hide {
  display: none !important;
}

.form-browse__block {
  display: flex;
  flex-direction: column;
}

.form-browse__area,
.form-browse__input {
  max-width: 370px;
  width: 100%;
  outline: none;
  padding: 14px;
  background: var(--color-bg-content);
  border: 0.7px solid var(--color-border-light);
  border-radius: 8px;
  font-size: 14px;
  line-height: 1;
  letter-spacing: -0.14px;
  margin-top: 14px;
  box-sizing: border-box;
}

.form-browse__area {
  height: 200px;
}

.pop-browse__error {
  color: #e53e3e;
  font-size: 14px;
  margin-top: 12px;
}

.form-browse__area::placeholder {
  font-weight: 400;
  font-size: 14px;
  line-height: 1px;
  color: var(--color-text-secondary);
  letter-spacing: -0.14px;
}

.subttl {
  color: var(--color-text-primary);
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
}

.status {
  margin-bottom: 11px;
}

.status__p {
  margin-bottom: 14px;
}

.status__themes {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
}

.status__theme {
  border-radius: 24px;
  border: 0.7px solid var(--color-border-light);
  color: var(--color-text-secondary);
  padding: 11px 14px 10px;
  margin-right: 7px;
  margin-bottom: 7px;
}

.status__theme p {
  font-size: 14px;
  line-height: 1;
  letter-spacing: -0.14px;
}

._btn-bor {
  border-radius: 4px;
  border: 0.7px solid var(--color-accent);
  outline: none;
  background: transparent;
  color: var(--color-accent);
}

._btn-bor a {
  color: var(--color-accent);
}

._btn-bg {
  border-radius: 4px;
  background: var(--color-accent);
  border: none;
  outline: none;
  color: var(--color-text-white);
}

._btn-bg a {
  color: var(--color-text-white);
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
}

.categories__theme p {
  font-size: 14px;
  font-weight: 600;
  line-height: 14px;
  white-space: nowrap;
}

@media screen and (max-width: 660px) {
  .pop-browse {
    top: 70px;
  }

  .pop-browse__container {
    padding: 0;
    justify-content: flex-start;
  }

  .pop-browse__block {
    border-radius: 0;
  }

  .pop-browse__wrap {
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
  .pop-browse__block {
    padding: 20px 16px 32px;
  }

  .pop-browse__content .theme-down {
    display: block;
    margin-bottom: 20px;
  }

  .pop-browse__content .theme-top {
    display: none;
  }

  .pop-browse__form {
    max-width: 100%;
  }

  .pop-new-card__calendar {
    width: 100%;
  }

  .pop-browse__btn-browse button,
  .pop-browse__btn-edit button {
    width: 100%;
    height: 40px;
  }

  .pop-browse__btn-browse .btn-group,
  .pop-browse__btn-edit .btn-group {
    width: 100%;
  }

  .pop-browse__btn-browse .btn-group button,
  .pop-browse__btn-edit .btn-group button {
    margin-right: 0px;
  }

  .form-browse__area {
    max-width: 100%;
    height: 37px;
  }
}
</style>

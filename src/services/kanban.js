import axios from 'axios'

const API_URL = 'https://wedev-api.sky.pro/api/kanban'

const getToken = () => localStorage.getItem('token')

const getHeaders = () => ({
  Authorization: `Bearer ${getToken()}`,
})

// Обёртка: сохраняем HTTP-статус на объекте ошибки, чтобы можно было ловить 401
const makeError = (error, fallback) => {
  const err = new Error(error.response?.data?.error || fallback)
  err.status = error.response?.status
  return err
}

// Получить список всех задач
export const getTasks = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: getHeaders(),
    })
    return response.data.tasks
  } catch (error) {
    throw makeError(error, 'Ошибка при получении задач')
  }
}

// Получить одну задачу по id
export const getTask = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: getHeaders(),
    })
    return response.data.task
  } catch (error) {
    throw makeError(error, 'Ошибка при получении задачи')
  }
}

// Создать задачу
export const createTask = async (data) => {
  try {
    const response = await axios.post(API_URL, data, {
      headers: getHeaders(),
    })
    return response.data.tasks
  } catch (error) {
    throw makeError(error, 'Ошибка при создании задачи')
  }
}

// Обновить задачу
export const updateTask = async (id, data) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, data, {
      headers: getHeaders(),
    })
    return response.data.tasks
  } catch (error) {
    throw makeError(error, 'Ошибка при обновлении задачи')
  }
}

// Удалить задачу
export const deleteTask = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: getHeaders(),
    })
    return response.data.tasks
  } catch (error) {
    throw makeError(error, 'Ошибка при удалении задачи')
  }
}

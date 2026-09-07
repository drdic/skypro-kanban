import axios from 'axios'

const API_URL = 'https://wedev-api.sky.pro/api/kanban'

const getToken = () => localStorage.getItem('token')

const getHeaders = () => ({
  Authorization: `Bearer ${getToken()}`,
})

const makeError = (error, fallback) => {
  const err = new Error(error.response?.data?.error || fallback)
  err.status = error.response?.status
  return err
}

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

export const createTask = async (data) => {
  try {
    const response = await axios.post(API_URL, data, {
      headers: {
        ...getHeaders(),
        'Content-Type': '',
      },
    })
    return response.data.tasks
  } catch (error) {
    throw makeError(error, 'Ошибка при создании задачи')
  }
}

export const updateTask = async (id, data) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, data, {
      headers: {
        ...getHeaders(),
        'Content-Type': '',
      },
    })
    return response.data.tasks
  } catch (error) {
    throw makeError(error, 'Ошибка при обновлении задачи')
  }
}

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

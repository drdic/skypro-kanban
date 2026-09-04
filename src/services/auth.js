import axios from 'axios'

const API_URL = 'https://wedev-api.sky.pro/api/user'

// Авторизация (вход)
export const signIn = async ({ login, password }) => {
  try {
    const response = await axios.post(
      `${API_URL}/login`,
      {
        login,
        password,
      },
      {
        headers: {
          'Content-Type': '',
        },
      },
    )
    return response.data.user
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Не удалось войти')
  }
}

// Регистрация нового пользователя
export const signUp = async ({ name, login, password }) => {
  try {
    const response = await axios.post(
      API_URL,
      {
        name,
        login,
        password,
      },
      {
        headers: {
          'Content-Type': '',
        },
      },
    )
    return response.data.user
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Не удалось зарегистрироваться')
  }
}

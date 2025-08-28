import axios from 'axios'

const http = axios.create({
  baseURL: '/api',
  timeout: 10000,
})

http.interceptors.response.use(
  (res) => res,
  (err) => {
    const msg = err?.response?.data?.msg || err.message || '请求失败'
    return Promise.reject(new Error(msg))
  }
)

export default http

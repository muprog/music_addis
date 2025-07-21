import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.BACKEND_URI || 'http://localhost:5000',
  withCredentials: true,
})

export default instance

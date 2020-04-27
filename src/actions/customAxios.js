import axios from 'axios'
import { baseURL } from '../config.json'

const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'text/plain',
  },
})

export default axiosInstance

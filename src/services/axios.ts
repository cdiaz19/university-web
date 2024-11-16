import axios from 'axios';

const universityApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

export default universityApi

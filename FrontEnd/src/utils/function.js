import axios from 'axios'

// Crear una instancia de Axios
const axiosClient = axios.create({
    baseURL: 'http://localhost:3015',
    withCredentials: true // Permitir el envío de cookies
})

// Interceptor para agregar el token a cada request
axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default axiosClient

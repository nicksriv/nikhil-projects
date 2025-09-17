import axios from 'axios';

const axiosInstance = axios.create()

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => 
        Promise.reject(
            (error) || 'Something went wrong!'
        )
)

export default axiosInstance;

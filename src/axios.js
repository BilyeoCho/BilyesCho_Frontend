import axios from "axios";

const axiosApi = axios.create({
    baseURL: "http://localhost:8080",
    withCredentials: true,
});

const handleRequestInterceptor = (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
};

// 에러 처리
const handleResponseInterceptor = async (error) => {
    return new Promise(() => {});
};

axiosApi.interceptors.request.use(handleRequestInterceptor, (error) => {
    return Promise.reject(error);
});

axiosApi.interceptors.response.use(
    (response) => response,
    (error) => handleResponseInterceptor(error)
);

export default axiosApi;
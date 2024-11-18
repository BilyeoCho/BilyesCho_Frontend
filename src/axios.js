import axios from "axios";

const axiosApi = axios.create({
  baseURL: "https://bilyeocho.site/api",
  withCredentials: true,
});

const handleRequestInterceptor = (config) => {
  const token = localStorage.getItem("accessToken");
  if (token && !['/login', '/join'].includes(config.url)) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

// 에러 처리
const handleResponseInterceptor = async (error) => {
  // 에러를 그대로 reject하여 catch에서 처리될 수 있도록 함
  return Promise.reject(error);
};

axiosApi.interceptors.request.use(
  handleRequestInterceptor,
  (error) => {
    return Promise.reject(error);
  }
);

axiosApi.interceptors.response.use(
  (response) => response,
  (error) => handleResponseInterceptor(error)
);

export default axiosApi;

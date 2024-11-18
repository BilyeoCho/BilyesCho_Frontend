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

// ���� ó��
const handleResponseInterceptor = async (error) => {
  // ������ �״�� reject�Ͽ� catch���� ó���� �� �ֵ��� ��
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

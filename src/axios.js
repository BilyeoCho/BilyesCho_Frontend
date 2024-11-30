import axios from "axios";

const axiosApi = axios.create({
  baseURL: "https://bilyeocho.site/api",
  withCredentials: true,
});

const handleRequestInterceptor = (config) => {
  const token = localStorage.getItem("accessToken");
  const userId = localStorage.getItem("userId");
  if (token && !['/login', '/join'].includes(config.url)) {
    config.headers.Authorization = `Bearer ${token}`;
    config.headers['X-User-Id'] = userId;
    console.log("요청에 추가된 토큰:", token); // 추가된 토큰 로그 확인
  } else {
    console.error("토큰이 없거나 유효하지 않습니다.");
  }
  console.log("요청 구성 확인:", config); // 요청 객체 확인
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

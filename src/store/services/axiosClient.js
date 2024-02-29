import axios,{AxiosResponse} from "axios";
const defaultHeader = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'Accept': 'application/json',
};
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token);
      }
    });
  
    failedQueue = [];
  };
  const baseURL = "https://dummyjson.com" || '';
  const axiosClient = axios.create({
    baseURL: baseURL,
  });
  axiosClient.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );
  axiosClient.interceptors.response.use(
    (response) => {
      return handleResponse(response);
    },
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          try {
            const token = await new Promise(function (resolve, reject) {
              failedQueue.push({ resolve, reject });
            });
            originalRequest.headers['Authorization'] = 'Bearer ' + token;
            return await axiosClient.request(originalRequest);
          } catch (err) {
            return await Promise.reject(err);
          }
        }
        originalRequest._retry = true;
        isRefreshing = true;
      }
      // const tokenExpiration = getTokenExpiration(
      //   LocalStorage.getAccessToken()?.toString()
      // );
      // const currentTime = new Date().getTime();
      // console.log("🚀 ~ file: axiosClient.ts:182 ~ currentTime:", currentTime);
  
      // if (tokenExpiration && tokenExpiration < currentTime) {
      //   // Token is expired, refresh it
      //   refreshTokenAndRetry(originalRequest);
      // } else {
      //   // Token is still valid, refresh after 5 minutes
      //   const refreshTimeout = tokenExpiration - currentTime - 5 * 60 * 1000;
      //   setTimeout(refreshTokenAndRetry, refreshTimeout);
      // }
  
      return Promise.reject(handleError(error));
    }
  );
  
  const handleResponse = (res) => {
    if (res && res.data) {
      return res.data;
    }
  
    return res;
  };
  
  const handleError = (error) => {
    const { data } = error.response;
  
    console.error(error);
  
    return data;
  };
  export default axiosClient;
  
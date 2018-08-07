import axios from 'axios'

axios.defaults.baseURL = '/api';
axios.defaults.timeout = 6000;
axios.defaults.headers['CLOUD_HEADER'] = 'application/x-www-form-urlencoded';

/**
 * 请求拦截
 */
axios.interceptors.request.use(
  (config) => {
    console.info(config);
    return config;
  }, error => {
    return Promise.reject(error);
  }
);

/**
 * 请求响应
 */
axios.interceptors.response.use(
  (response) => {
    console.info('response interceptors-------------');
    return response;
  }, (error) => {
    return Promise.reject(error);
  }
);

export default class AxiosHttp {

  static getRequest(url) {
    return new Promise((resolve, reject) => {
      axios.get(url).then(response => resolve(response))
        .catch(error => reject(error))
    })
  }

  static postRequest(url, params) {
    return new Promise((resolve, reject) => {
      axios.post(url, params).then(response => resolve(response))
        .catch(error => reject(error));
    })
  }


  static deleteRequest(url, params) {
    return new Promise((resolve, reject) => {
      axios.delete(url, params).then(response => resolve(response))
        .catch(error => reject(error));
    })
  }

  static putRequest(url, params) {
    return new Promise((resolve, reject) => {
      axios.put(url, params).then(response => resolve(response))
        .catch(error => reject(error));
    })
  }


  static exportRequest(url, params) {
    return new Promise((resolve, reject) => {
      axios.post(url, params, {responseType: 'arraybuffer'}).then(response => resolve(response))
        .catch(error => reject(error));
    })
  }

  static handleException(response) {
    if (console) {
      console.info(response);
    }
  }
}

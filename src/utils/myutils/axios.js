/* eslint-disable no-param-reassign */
import axios from 'axios';
// 引入Loading组件和添加dom的方法
import Loading from '@/components/Loading.vue';
import createDom from '@/utils/createDom';
import { Dialog } from 'vant';
import storage from './storage';

export const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? '' : 'https://alex188.cn/jf2app',
  timeout: 15000,
});
let ld;
let num = 0;
/** 添加请求拦截器 * */
instance.interceptors.request.use(
  (config) => {
    // console.log(config);
    if (num === 0) {
      ld = createDom(Loading);
    }
    num += 1;
    config.headers.Authorization = storage.get('loginToken');
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    Promise.reject(error);
  },
);
/** 添加响应拦截器  * */
instance.interceptors.response.use(
  (response) => {
    num -= 1;
    if (num === 0) {
      ld.hide();
      ld = null;
    }
    // console.log(response);
    if (response.status === 200) {
      if (!response.data.success) {
        if (response.data.code === -100) {
          // 未登录
          Dialog
            .alert({
              message: response.data.message,
              confirmButtonText: '确定',
            })
            .then(() => {
              storage.clear();
              this.router.push({ name: 'SignIn' });
            });
        } else if (response.data.message) {
          Dialog
            .alert({
              message: response.data.message,
              confirmButtonText: '确定',
            });
        }
      } else {
        return Promise.resolve(response.data);
      }
    } else {
      Dialog
        .alert({
          message: '请求异常',
          confirmButtonText: '确定',
        });
    }
    return Promise.reject(response.data.message);
  },
  (error) => {
    ld.hide();
    if (error.response) {
      return Promise.reject(error.response.data.message);
    }
    return Promise.reject(new Error('请求超时, 请刷新重试'));
  },
);
/* 统一封装请求  */
export const requestAxios = ({
  url = '', data = {}, params = {}, method = 'post',
} = {}) => new Promise((resolve, reject) => {
  instance({
    url,
    data,
    params,
    method,
  })
    .then((response) => {
      resolve(response);
    })
    .catch((error) => {
      reject(error);
    });
});

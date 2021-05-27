/* eslint-disable no-param-reassign */
import axios from 'axios';
// 引入Loading组件和添加dom的方法
import Loading from '@/components/Loading.vue';
import createDom from '@/utils/createDom';
import storage from './storage';
// import { callAppMethod } from '@/utils/commonApp';
import DialogMessage from '../../components/MyComponents/DialogMessage.vue';

export const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? '' : 'https://alex188.cn/jf2app',
  timeout: 15000,
});
let ld;
/** 添加请求拦截器 * */
instance.interceptors.request.use((config) => {
  ld = createDom(Loading);
  config.headers.Authorization = storage.get('loginToken');
  return config;
}, (error) => {
// 对请求错误做些什么
  Promise.reject(error);
});
/** 添加响应拦截器  * */
instance.interceptors.response.use((response) => {
  ld.hide();
  if (response.status === 200) {
    return Promise.resolve(response.data);
  }
  createDom(
    DialogMessage,
    {},
    {
      content: `<div style="text-align:center">请求异常！</div>
                    `,
      knowBtn: true,
    },
  );
  return Promise.reject(response.data.message);
}, (error) => {
  ld.hide();
  if (error.response) {
    return Promise.reject(error.response.data.message);
  }
  return Promise.reject(new Error('请求超时, 请刷新重试'));
});
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
    }).catch((error) => {
      reject(error);
    });
});

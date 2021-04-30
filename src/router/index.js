import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
  },
  {
    path: '/Commission',
    name: 'Commission',
    component: () => import(/* webpackChunkName: "commissionpage" */ '../views/Commission.vue'),
  },
  {
    path: '/MyInfo',
    name: 'MyInfo',
    component: () => import(/* webpackChunkName: "myinformation" */ '../views/MyInfo.vue'),
  },
  {
    path: '/SeeDaily',
    name: 'SeeDaily',
    component: () => import(/* webpackChunkName: "seedailypage" */ '../views/Daily/SeeDaily.vue'),
  },
  {
    path: '/WriteDaily',
    name: 'WriteDaily',
    component: () => import(/* webpackChunkName: "writedailypage" */ '../views/Daily/WriteDaily.vue'),
  }, {
    path: '/DailyDetail',
    name: 'DailyDetail',
    component: () => import(/* webpackChunkName: "daliydetailpage" */ '../views/Daily/DailyDetail.vue'),
  }, {
    path: '/ChangeDaily',
    name: 'ChangeDaily',
    component: () => import(/* webpackChunkName: "changedaliypage" */ '../views/Daily/ChangeDaily.vue'),
  }, {
    path: '/WriteExtention',
    name: 'WriteExtention',
    component: () => import(/* webpackChunkName: "writeexdailypage" */ '../views/ExtentionDaily/WriteExtention.vue'),
  }, {
    path: '/SeeExtention',
    name: 'SeeExtention',
    component: () => import(/* webpackChunkName: "seeexdailypage" */ '../views/ExtentionDaily/SeeExtention.vue'),
  }, {
    path: '/ExtentionDetail',
    name: 'ExtentionDetail',
    component: () => import(/* webpackChunkName: "exdetailpage" */ '../views/ExtentionDaily/ExtentionDetail.vue'),
  }, {
    path: '/ChangeExtention',
    name: 'ChangeExtention',
    component: () => import(/* webpackChunkName: "exchangepage" */ '../views/ExtentionDaily/ChangeExtention.vue'),
  }, {
    path: '/ExtentionEnd',
    name: 'ExtentionEnd',
    component: () => import(/* webpackChunkName: "extentionend" */ '../views/ExtentionDaily/ExtentionEnd.vue'),
  }, {
    path: '/DailyEnd',
    name: 'DailyEnd',
    component: () => import(/* webpackChunkName: "dailyend" */ '../views/Daily/DailyEnd.vue'),
  }, {
    path: '/ChangeAccount',
    name: 'ChangeAccount',
    component: () => import(/* webpackChunkName: "changeaccountpage" */ '../views/ChangeAccount.vue'),
  },

];
// 解决路由重复
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
});

export default router;

import Vue from 'vue';
import VueRouter from 'vue-router';
import SignIn from '../views/user/Login.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'index',
    redirect: 'SignIn',
  },
  {
    path: '/SignIn',
    name: 'SignIn',
    component: SignIn,
  },
  {
    path: '/Home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
  },
  {
    path: '/Commission',
    name: 'Commission',
    component: () => import(/* webpackChunkName: "commissionpage" */ '../views/Commission/Commission.vue'),
  },
  {
    path: '/HistoryCommission',
    name: 'HistoryCommission',
    component: () => import(/* webpackChunkName: "commissionpage" */ '../views/Commission/HistoryCommission.vue'),
  },
  {
    path: '/Approve',
    name: 'Approve',
    component: () => import(/* webpackChunkName: "approvepage" */ '../views/Commission/Approve.vue'),
  },
  {
    path: '/ApproveHistory',
    name: 'ApproveHistory',
    component: () => import(/* webpackChunkName: "approvehistorypage" */ '../views/Commission/ApproveHistory.vue'),
  },
  {
    path: '/MyInfo',
    name: 'MyInfo',
    component: () => import(/* webpackChunkName: "myinformation" */ '../views/user/MyInfo.vue'),
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
  },
  {
    path: '/DailyDetail',
    name: 'DailyDetail',
    component: () => import(/* webpackChunkName: "daliydetailpage" */ '../views/Daily/DailyDetail.vue'),
  },
  {
    path: '/ChangeDaily',
    name: 'ChangeDaily',
    component: () => import(/* webpackChunkName: "changedaliypage" */ '../views/Daily/ChangeDaily.vue'),
  },
  {
    path: '/WriteExtention',
    name: 'WriteExtention',
    component: () => import(
      /* webpackChunkName: "writeexdailypage" */ '../views/ExtentionDaily/WriteExtention.vue'
    ),
  },
  {
    path: '/SeeExtention',
    name: 'SeeExtention',
    component: () => import(/* webpackChunkName: "seeexdailypage" */ '../views/ExtentionDaily/SeeExtention.vue'),
  },
  {
    path: '/ExtentionDetail',
    name: 'ExtentionDetail',
    component: () => import(/* webpackChunkName: "exdetailpage" */ '../views/ExtentionDaily/ExtentionDetail.vue'),
  },
  {
    path: '/ChangeExtention',
    name: 'ChangeExtention',
    component: () => import(/* webpackChunkName: "exchangepage" */ '../views/ExtentionDaily/ChangeExtention.vue'),
  },
  {
    path: '/SeeVacation',
    name: 'SeeVacation',
    component: () => import(/* webpackChunkName: "seevacationpage" */ '../views/Vacation/SeeVacation.vue'),
  },
  {
    path: '/VacationDetail',
    name: 'VacationDetail',
    component: () => import(/* webpackChunkName: "vacationdetailpage" */ '../views/Vacation/VacationDetail.vue'),
  },
  {
    path: '/WriteVacation',
    name: 'WriteVacation',
    component: () => import(/* webpackChunkName: "writevacationpage" */ '../views/Vacation/WriteVacation.vue'),
  },
  {
    path: '/CommissionDetail',
    name: 'CommissionDetail',
    component: () => import(
      /* webpackChunkName: "commissiondetailpage" */ '../views/Commission/CommissionDetail.vue'
    ),
  },
  {
    path: '/ApproveDetail',
    name: 'ApproveDetail',
    component: () => import(/* webpackChunkName: "approvedetailpage" */ '../views/Commission/ApproveDetail.vue'),
  },
  {
    path: '/MyApproveRefuse',
    name: 'MyApproveRefuse',
    component: () => import(/* webpackChunkName: "approverefusepage" */ '../views/Commission/MyApproveRefuse.vue'),
  },
  {
    path: '/ApplyEnd',
    name: 'ApplyEnd',
    component: () => import(/* webpackChunkName: "applyendpage" */ '../views/CommonPage/ApplyEnd.vue'),
  },
  {
    path: '/ChangeAccount',
    name: 'ChangeAccount',
    component: () => import(/* webpackChunkName: "changeaccountpage" */ '../views/user/ChangeAccount.vue'),
  },
  {
    path: '/UserInfo',
    name: 'UserInfo',
    component: () => import(/* webpackChunkName: "userInfo" */ '../views/user/UserInfo.vue'),
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

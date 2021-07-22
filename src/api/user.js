import { requestAxios } from '@/utils/myutils/axios';

function post(url, data) {
  return requestAxios({
    url,
    data,
    method: 'post',
  });
}
// 个人资料
function getUserInfo(data) {
  return post('/personnelInfo/personnel-info/getLoginUserInfo', data);
}
// 修改登录密码
function updatePassword(data) {
  return post('/personnelInfo/personnel-info/updatePassword', data);
}
// 退出登录
function logOut(data) {
  return post('/personnelInfo/personnel-info/logout', data);
}
// 获取项目经理列表
function getManagerList(data) {
  return post('/personnelInfo/personnel-info/getManagerList', data);
}

// 新增休假申请
function addVacation(data) {
  return post('/workVacation/work-vacation/save', data);
}
// 休假申请列表
function getVacationList(data) {
  return post('/workVacation/work-vacation/getListByPage', data);
}
// 删除休假申请
function deleteVacation(data) {
  return requestAxios({
    data,
    url: '/workVacation/work-vacation/del',
    method: 'delete',
  });
}
// 修改休假申请
function updVacation(data) {
  return requestAxios({
    data,
    url: '/workVacation/work-vacation/upd',
    method: 'put',
  });
}
// 休假申请详情
function getVacationDetail(data) {
  return post(`/workVacation/work-vacation/findParam/${data}`);
}

// 新增延时申请
function addWorkLate(data) {
  return post('/workLate/work-late/save', data);
}
// 延时申请列表
function getWorkLateList(data) {
  return post('/workLate/work-late/getListByPage', data);
}
// 删除延时申请
function deleteWorkLate(data) {
  return requestAxios({
    data,
    url: '/workLate/work-late/del',
    method: 'delete',
  });
}
// 修改延时申请
function updWorkLate(data) {
  return requestAxios({
    data,
    url: '/workLate/work-late/upd',
    method: 'put',
  });
}
// 延时申请详情
function getWorkLateDetail(data) {
  return post(`/workLate/work-late/findParam/${data}`);
}

// 日报列表
function getWorkDailyList(data) {
  return post('/workDaily/work-daily/getListByPage', data);
}
// 删除日报
function deleteWorkDaily(data) {
  return requestAxios({
    data,
    url: '/workDaily/work-daily/del',
    method: 'delete',
  });
}

export {
  getUserInfo,
  updatePassword,
  logOut,
  getManagerList,
  addVacation,
  getVacationList,
  deleteVacation,
  updVacation,
  getVacationDetail,
  addWorkLate,
  getWorkLateList,
  deleteWorkLate,
  updWorkLate,
  getWorkLateDetail,
  getWorkDailyList,
  deleteWorkDaily,
};

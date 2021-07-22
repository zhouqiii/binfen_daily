import { requestAxios } from '@/utils/myutils/axios';

function post(url, data) {
  return requestAxios({
    url,
    data,
    method: 'post',
  });
}
// 任务列表 可筛选
function commissionList(data) {
  return post('/businessTask/business-task/getTaskList', data);
}
// 任务列表 在途
function commissionListByUser(data) {
  return post('/businessTask/business-task/getListTaskByUser', data);
}
// 任务详情
function getCommissionDetail(data) {
  return post(`/businessTask/business-task/getTaskDetail/${data}`);
}
// 审批列表
function checkList(data) {
  return post('/businessTask/business-task/getCheckList', data);
}
// 审批操作
function checkTask(data) {
  return post('/businessTask/business-task/checkTask', data);
}

export {
  commissionList,
  commissionListByUser,
  getCommissionDetail,
  checkList,
  checkTask,
};

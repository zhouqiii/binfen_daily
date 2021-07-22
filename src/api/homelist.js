import { requestAxios } from '@/utils/myutils/axios';

function post(url, data) {
  return requestAxios({
    url,
    data,
    method: 'post',
  });
}
// 首页请假列表
function getVacationList() {
  return post('/workVacation/work-vacation/getListByAll', {});
}
// 审批操作
function checkTask(data) {
  return post('/businessTask/business-task/checkTask', data);
}

export {
  getVacationList,
  checkTask,
};

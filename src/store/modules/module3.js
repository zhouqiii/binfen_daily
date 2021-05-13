// 这里给默认我的审核，已审核使用，有几个部分点击后，页面需要停留在我的审核-已审核
const state = {
  changedaily: 0, // 从修改日报跳转至日报详情给一个轻提示
  tabIndex: 0, // 默认tabIndex=0，即我的任务
};
const getters = {
  isTabIndex(states) { // 承载变化的showFooter的值
    return states.tabIndex;
  },
};
// actions
const actions = {

};
// mutations
const mutations = {
  changeTabIndex(states, val) { // 自定义改变state初始值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);
    const stateGet = states;
    stateGet.tabIndex = val;
    return stateGet;
  },
};
export default {
  state,
  getters,
  actions,
  mutations,
};

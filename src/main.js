import Vue from 'vue';
import
{
  NavBar, Popup, Dialog, Icon, Tab, Tabs, Picker, Toast,
  PasswordInput, NumberKeyboard, Form, Field, Calendar, Image, DatetimePicker, PullRefresh,
  Collapse, CollapseItem, Radio, RadioGroup, Cell, Overlay, Step, Steps, Uploader, Badge,
}
  from 'vant';

import { requestAxios } from '@/utils/myutils/axios';
import { requestLogin } from '@/utils/myutils/loginRequest';
import storage from '@/utils/myutils/storage';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/css/style/common.less';
import NavBarBottom from './components/MyComponents/NavBar.vue';
import NavBarTop from './components/NavBar.vue';

// 引入自动化引入icons/svg文件夹下所有svg的js文件
import '@/assets/icons';
// 全局引入封装的axios

// 注册vant使用的组件
Vue.use(NavBar)
  .use(Popup)
  .use(Dialog)
  .use(Icon)
  .use(Tab)
  .use(Tabs)
  .use(Picker)
  .use(Toast)
  .use(PasswordInput)
  .use(NumberKeyboard)
  .use(Form)
  .use(Field)
  .use(Image)
  .use(PullRefresh)
  .use(DatetimePicker)
  .use(Collapse)
  .use(CollapseItem)
  .use(Radio)
  .use(RadioGroup)
  .use(Cell)
  .use(Overlay)
  .use(Calendar)
  .use(Step)
  .use(Steps)
  .use(Uploader)
  .use(Badge);

// 组件自己封装的公用组件
Vue.component('nav-bar-bottom', NavBarBottom);
Vue.component('nav-bar-top', NavBarTop);

// 全局引入封装的axios
Vue.prototype.requestAxios = requestAxios;
// 全局引入封装的axios
Vue.prototype.requestLogin = requestLogin;
Vue.prototype.storage = storage;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

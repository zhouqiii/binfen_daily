<template>
    <div>
      <nav-bar-top title="任务" :navBg='navBg'></nav-bar-top>
      <nav-bar-bottom></nav-bar-bottom>
      <div class="home">
        <!--头部我的任务我的审核-->
        <div class="commi_manager" v-show="ifManager">
          <div class="commi_manager_bg"></div>
          <div class="commi_manager_tab flex_around">
            <div class="commi_manager_tabCon" @click="tabIndex=0" :class="{changeBg:tabIndex===0}">
              <svg-icon iconClass="commirenwuTH" class="commi"></svg-icon>
              <div class="mytext">我的任务</div>
            </div>
            <div class="line"></div>
            <div class="commi_manager_tabCon" @click="tabIndex=1" :class="{changeBg:tabIndex===1}">
              <svg-icon iconClass="commishenpi" class="commi"></svg-icon>
              <div class="mytext">我的审核</div>
            </div>
          </div>
        </div>
         <!--任务列表部分-->
        <div class="commi_alllist">
          <!--我的任务-->
          <div v-show="tabIndex===0">
            <my-commission></my-commission>
          </div>
           <!--我的审核-->
          <div v-show="tabIndex===1">
            11
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import '../assets/css/style/commission.less';
import SvgIcon from '../components/SvgIcon.vue';
import MyCommission from '../components/MyComponents/MyCommission.vue';

export default {
  components: { SvgIcon, MyCommission },
  name: 'Commission',
  data() {
    return {
      navBg: false, // header背景色
      tabIndex: 0, // 我的任务/我的审核切换添加背景色
      ifManager: true,
    };
  },
};
</script>

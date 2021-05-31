<template>
    <div>
      <nav-bar-top title="任务" :navBg='navBg' :navIcon='navIcon'></nav-bar-top>
      <nav-bar-bottom></nav-bar-bottom>
      <div class="home">
        <!--头部我的任务我的审核-->
        <div class="commi_manager" v-show="ifManager">
          <div class="commi_manager_bg"></div>
          <div class="commi_manager_tab flex_around">
            <div class="commi_manager_tabCon" @click="tabIndexChange(0)"
              :class="{changeBg:tabIndex===0}"
            >
              <svg-icon iconClass="commirenwuTH" class="commi"></svg-icon>
              <div class="mytext">我的任务</div>
            </div>
            <div class="line"></div>
            <div class="commi_manager_tabCon" @click="tabIndexChange(1)"
              :class="{changeBg:tabIndex===1}"
            >
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
            <my-approve :approveTab="approveTab" ref="chaildApprove"
              v-on:childByValue="allApproveAgree"
            ></my-approve>
          </div>
        </div>
      </div>
      <!--确定一键审批的弹框-->
      <van-overlay :show="show" @click="show = false">
        <div class="wrapper" @click.stop>
          <div class="dialog_box">
            <div class="btn_title">确定全部申请通过？</div>
            <div class="btn_select flex_around">
              <div class="selBtn selectCancel" @click="remain">取消</div>
              <div class="selBtn selectConfirm" @click="changeData">确定</div>
            </div>
          </div>
        </div>
      </van-overlay>
    </div>
</template>
<script>
import '../assets/css/style/commission.less';
import SvgIcon from '../components/SvgIcon.vue';
import MyCommission from '../components/MyComponents/MyCommission.vue';
import MyApprove from '../components/MyComponents/MyApprove.vue';

export default {
  components: { SvgIcon, MyCommission, MyApprove },
  name: 'Commission',
  data() {
    return {
      navBg: false, // header背景色
      navIcon: false, // header是否有向左icon
      tabIndex: 0, // 我的任务/我的审核切换添加背景色
      ifManager: true, // 普通员工还是经理
      approveTab: 0, // 是已审核还是待审核// 这里是为了从拒绝页面跳转过来使用
      show: false, // 一键审批的遮罩
    };
  },
  methods: {
    tabIndexChange(val) {
      this.tabIndex = val;
    },
    // 一键审批按钮
    allApproveAgree(val) {
      this.approveTab = val;// 保持approveTab和激活待审核还是已审核的active保持一致
      this.show = true;
    },
    // 弹框的取消按钮
    remain() {
      this.show = false;
    },
    // 弹框的确定按钮
    changeData() {
      this.approveTab = 1;
      this.show = false;
    },
  },
  beforeDestroy() {
    document.body.style.overflowY = 'auto';
    document.body.style.position = '';
  },
  mounted() {
    const index = this.$route.params.tabIndexGive;// 这里是为了从拒绝页面跳转过来使用
    if (index) {
      this.tabIndexChange(index);
    }
    if (this.ifManager === false) { // 当是普通员工是，页面多展示一行任务数据
      const tag = document.getElementsByClassName('van-tabs__content');
      tag[0].style = 'height:30rem';
    }
  },
  created() {
    if (this.$route.params.activeGive) {
      this.approveTab = this.$route.params.activeGive;
    }// 这里是为了从拒绝页面跳转过来使用
    this.$nextTick(() => {
      document.body.style.overflowY = 'hidden';
      document.body.style.position = 'fixed';
    });
  },
};
</script>

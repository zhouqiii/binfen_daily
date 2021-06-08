<template>
    <div>
      <nav-bar-top title="审批" :navBg='navBg' :navIcon='navIcon'>
        <template v-slot:right>
          <div>
            <svg-icon iconClass="history" @click="routeItem('/ApproveHistory')"></svg-icon>
          </div>
        </template>
      </nav-bar-top>
      <div class="home">
        <!--任务列表部分-->
        <div class="commi_alllist">
           <my-approve approveTab="0" ref="chaildApprove"></my-approve>
        </div>
      </div>
      <div class="submit_btn">
        <button class="sendBtn" @click="show = true">一键审批</button>
      </div>
      <!--确定一键审批的弹框-->
      <van-overlay :show="show" @click="show = false">
        <div class="wrapper" @click.stop>
          <div class="dialog_box">
            <div class="btn_title">确定全部申请通过？</div>
            <div class="btn_select flex_around">
              <div class="selBtn selectCancel" @click="show = false">取消</div>
              <div class="selBtn selectConfirm" @click="changeData">确定</div>
            </div>
          </div>
        </div>
      </van-overlay>
    </div>
</template>
<script>
import '../../assets/css/style/commission.less';
import MyApprove from '../../components/MyComponents/MyApprove.vue';

export default {
  components: { MyApprove },
  name: 'Approve',
  data() {
    return {
      navBg: false, // header背景色
      navIcon: true, // header是否有向左icon
      show: false, // 一键审批的遮罩
      showDelete: false,
      ifManager: true,
    };
  },
  methods: {
    // 弹框的确定按钮
    changeData() {
      console.log('确定全部通过');
      this.show = false;
      this.routeItem('/ApproveHistory');
    },
    routeItem(path) {
      this.$router.push(path);
    },
  },
  mounted() {
    const index = this.$route.params.tabIndexGive;// 这里是为了从拒绝页面跳转过来使用
    if (index) {
      this.tabIndexChange(index);
    }
  },
  created() {
    if (this.$route.params.activeGive) {
      this.approveTab = this.$route.params.activeGive;
    }// 这里是为了从拒绝页面跳转过来使用
  },
};
</script>

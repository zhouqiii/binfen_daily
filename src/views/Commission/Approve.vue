<template>
    <div style="height:100%">
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
          <my-approve
            approveTab="0"
            ref="chaildApprove"
            :data='approveList'
            @refresh="refreshAppr"
          ></my-approve>
        </div>
      </div>
      <div class="submit_btn" v-show="approveList.length!==0">
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
      approveList: [{
        title: '大鹏提交的延迟申请', vacationtype: '婚假', time: '18:30-21:30', date: '2021-04-29', status: '1', id: '50',
      }, {
        title: '老王提交的延迟申请', vacationtype: '婚假', time: '18:30-21:30', date: '2021-04-29', status: '2', id: '80',
      }, {
        title: '张三替交的延迟申请', vacationtype: '病假', time: '18:30-21:30', date: '2021-04-29', status: '1', id: '60',
      }],
    };
  },
  methods: {
    // 获取列表数据
    getListData(obj) {
      this.requestAxios({
        url: '/workDaily/work-daily/getListByPage', // /workDaily/work-daily/getListByPage
        data: obj,
        method: 'post', // post
      })
        .then((res) => {
          console.log(res);
        })
        .catch(() => {});
    },
    // 弹框的确定按钮
    changeData() {
      console.log('确定全部通过');
      this.show = false;
      this.routeItem('/ApproveHistory');
    },
    routeItem(path) {
      this.$router.push(path);
    },
    // 刷新
    refreshAppr() {
      this.getListData({});
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

<template>
  <div style="height:100%" class="hisCommission">
    <nav-bar-top title="历史任务" :navBg="navBg" :navIcon="navIcon">
      <template v-slot:right>
        <!-- <div>
          <svg-icon iconClass="deletelist" @click="showDelete = !showDelete"></svg-icon>
        </div> -->
        <div style="margin-left:10px">
          <svg-icon iconClass="timelouFFF" @click="showBullet = !showBullet"></svg-icon>
        </div>
      </template>
    </nav-bar-top>
    <div class="home_history">
      <!--任务列表部分-->
      <div class="commi_alllist">
        <!--routeGuide用来区分是从任务到任务详情还是从历史任务到历史任务详情 1表示历史任务详情 0表示任务详情-->
        <my-commission
          :dataList="commiList"
          routeGuide="1"
          :showDelete="showDelete"
          @refreshList="refreshList"
          @deleteTask="deleteTask"
          ref="taskList"
        ></my-commission>
      </div>
    </div>
    <div class="home_pop">
      <van-popup
        v-model="showBullet"
        position="right"
        :style="{ width: '90%', height: '100%', background: '#F9FAFC' }"
        get-container=".contentBox"
      >
        <screen-bullet @queryList="changeList"></screen-bullet>
      </van-popup>
    </div>
  </div>
</template>
<script>
import { commissionList } from '@/api/commission';
import MyCommission from '../../components/MyComponents/MyCommission.vue';
import ScreenBullet from '../../components/MyComponents/ScreeningBullet.vue';

export default {
  components: { MyCommission, ScreenBullet },
  name: 'HistoryCommission',
  data() {
    return {
      navBg: false, // header背景色
      navIcon: true, // header是否有向左icon
      tabIndex: 0, // 我的任务/我的审核切换添加背景色
      ifManager: true, // 普通员工还是经理
      approveTab: 0, // 是已审核还是待审核// 这里是为了从拒绝页面跳转过来使用
      showBullet: false, // 一键审批的遮罩
      showDelete: false,
      commiList: [],
    };
  },
  methods: {
    // 获取列表数据
    getListData(obj) {
      commissionList(obj)
        .then((res) => {
          this.commiList = res.data;
        })
        .catch((err) => {
          console.log('err', err);
        });
    },
    routeItem(path) {
      this.$router.push(path);
    },
    // 侧边弹出框确定按钮
    changeList(val) {
      const checkDefault = this.$refs.taskList;
      this.showDelete = false;
      checkDefault.checkedAll = false; // 当通过时间筛选更新列表时，将所有对应的删除框置为默认不选中状态
      checkDefault.result = [];
      this.showBullet = false;
      this.getListData(val);
    },
    // 下拉刷新函数
    refreshList() {
      this.getListData({});
    },
    // 删除某些任务的函数
    deleteTask(val) {
      console.log('这里调用删除任务接口', val);
      // 删除后更新列表,隐藏删除及全选,重置勾选项
      const checkDefault = this.$refs.taskList;
      this.showDelete = false;
      checkDefault.checkedAll = false;
      checkDefault.result = [];
      this.getListData({});
    },
  },
  mounted() {},
  created() {
    this.$nextTick(() => {
      this.getListData({});
    });
  },
};
</script>
<style lang="less" scoped>
@import url('../../assets/css/style/commission.less');
</style>

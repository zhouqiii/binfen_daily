<template>
  <div style="height: 100%" class="commission">
    <nav-bar-top title="任务" :navBg="navBg" :navIcon="navIcon">
      <template v-slot:right>
        <div class="icon">
          <svg-icon iconClass="history" @click="routeItem('/HistoryCommission')"></svg-icon>
        </div>
        <div>
          <svg-icon iconClass="timelouFFF" @click="showBullet = !showBullet"></svg-icon>
        </div>
      </template>
    </nav-bar-top>
    <nav-bar-bottom></nav-bar-bottom>
    <div class="home">
      <!--任务列表部分-->
      <div class="commi_alllist">
        <!--我的任务-->
        <my-commission
          :dataList="commiList"
          routeGuide="0"
          @refreshList="refreshList"
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
    <!--固定的编辑图标-->
    <!-- <div class="home_check" v-show="ifManager">
      <div class="box_frame">
        <div>
          <svg-icon iconClass="checkCenter" @click="routeItem('/Approve')"></svg-icon>
        </div>
        <div>审批</div>
      </div>
    </div> -->
  </div>
</template>
<script>
import { commissionList } from '@/api/commission';
import MyCommission from '../../components/MyComponents/MyCommission.vue';
import ScreenBullet from '../../components/MyComponents/ScreeningBullet.vue';

export default {
  components: { MyCommission, ScreenBullet },
  name: 'Commission',
  data() {
    return {
      navBg: false, // header背景色
      navIcon: false, // header是否有向左icon
      show: false, // 一键审批的遮罩
      showBullet: false, // 筛选查询弹出层
      showDelete: false,
      ifManager: false,
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
      this.showBullet = false;
      this.getListData(val);
    },
    // 下拉刷新函数
    refreshList() {
      this.getListData({});
    },
    getIsManager() {
      const { roleId } = this.storage.get('userInfo');
      if (roleId === '2' || roleId === '3') {
        this.ifManager = true;
      }
    },
  },
  mounted() {},
  created() {
    this.$nextTick(() => {
      this.getListData({});
      this.getIsManager();
    });
  },
};
</script>
<style lang="less" scoped>
@import url('../../assets/css/style/commission.less');
</style>

<template>
  <div style="height:100%">
    <nav-bar-top title="历史审批" :navBg="navBg" :navIcon="navIcon">
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
        <!--approveTab表示是审核还是历史审核 approveTab=0表示是审核list approveTab=1表示历史审核list-->
        <my-approve
          approveTab="1"
          ref="chaildApprove"
          :dataList="approveList"
          :showDelete="showDelete"
          @deleteTask="deleteTask"
          @refresh="refreshAppr"
        ></my-approve>
      </div>
    </div>
    <div class="home_pop">
      <van-popup
        v-model="showBullet"
        position="right"
        :style="{ width: '80%', height: '100%', background: '#F9FAFC' }"
        get-container=".contentBox"
      >
        <!--conditionPart用来区分是历史审核的筛选还是历史任务的筛选条件 conditionPart=approve表示是历史审核-->
        <screen-bullet conditionPart="approve" @queryList="changeList"></screen-bullet>
      </van-popup>
    </div>
  </div>
</template>
<script>
import { checkList } from '@/api/commission';
import ScreenBullet from '../../components/MyComponents/ScreeningBullet.vue';
import MyApprove from '../../components/MyComponents/MyApprove.vue';

export default {
  components: { ScreenBullet, MyApprove },
  name: 'ApproveHistory',
  data() {
    return {
      navBg: false, // header背景色
      navIcon: true, // header是否有向左icon
      ifManager: true, // 普通员工还是经理
      showBullet: false, // 一键审批的遮罩
      showDelete: false,
      approveList: [],
    };
  },
  methods: {
    // 获取列表数据
    getListData(obj) {
      checkList(obj)
        .then((res) => {
          // console.log('checkList', res);
          this.approveList = res.data;
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
      const obj = {
        ...val,
        checkStatus: '1',
      };
      const checkDefault = this.$refs.chaildApprove;
      this.showDelete = false;
      checkDefault.checkedAll = false; // 当通过时间筛选更新列表时，将所有对应的删除框置为默认不选中状态
      checkDefault.result = [];
      this.showBullet = false;
      this.getListData(obj);
    },
    // 刷新
    refreshAppr() {
      this.getListData({ checkStatus: '1' });
    },
    // 删除某些任务的函数
    deleteTask(val) {
      console.log(val);
    },
  },
  mounted() {},
  created() {
    this.$nextTick(() => {
      this.refreshAppr();
    });
  },
};
</script>
<style lang="less" scoped>
@import url('../../assets/css/style/commission.less');
</style>

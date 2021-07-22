<template>
  <div style="height:100%">
    <nav-bar-top title="审批" :navBg="navBg" :navIcon="navIcon">
      <template v-slot:right>
        <div class="icon">
          <svg-icon iconClass="checkApproveBack" @click="showRadio = !showRadio"></svg-icon>
        </div>
        <div>
          <svg-icon iconClass="history" @click="routeItem('/ApproveHistory')"></svg-icon>
        </div>
      </template>
    </nav-bar-top>
    <nav-bar-bottom></nav-bar-bottom>
    <div class="home">
      <!--任务列表部分-->
      <div class="commi_alllist">
        <my-approve
          approveTab="0"
          ref="chaildApprove"
          :dataList="approveList"
          @refresh="refreshAppr"
          :showRadio="showRadio"
          @sendApprove="changeData"
        ></my-approve>
      </div>
    </div>
  </div>
</template>
<script>
import { checkList, checkTask } from '@/api/commission';
import MyApprove from '../../components/MyComponents/MyApprove.vue';

export default {
  components: { MyApprove },
  name: 'Approve',
  data() {
    return {
      navBg: false, // header背景色
      navIcon: false, // header是否有向左icon
      showDelete: false,
      ifManager: true,
      approveList: [],
      showRadio: false, // 审批的选择框
    };
  },
  watch: {
    $route() {
      this.refreshAppr();
    },
  },
  methods: {
    // 获取列表数据
    getListData(obj) {
      checkList(obj)
        .then((res) => {
          this.approveList = [];
          res.data.forEach((item, index) => {
            this.approveList.push(item);
            this.approveList[index].status_num = item.status.replace('-', '');
          });
        })
        .catch((err) => {
          console.log('err', err);
        });
    },
    // 多选框审批的确定按钮
    changeData(val) {
      if (val.length <= 0) {
        this.$toast('请先勾选需要删除的休假申请');
        return;
      }
      this.$dialog
        .confirm({
          message: '确定选中申请通过',
          confirmButtonText: '确定',
        })
        .then(() => {
          this.sendApprove(val);
        })
        .catch(() => {
          // on cancel
        });
    },
    // 发送多选审批
    sendApprove(val) {
      const list = [];
      val.forEach((item) => {
        list.push({
          checkRemark: '',
          checkStatus: '1',
          checkType: item.type,
          id: item.id,
        });
      });
      checkTask({ checkList: list })
        .then((res) => {
          if (res.code === 200) {
            this.showRadio = false;
            this.refreshAppr();
          }
        })
        .catch((err) => {
          console.log('checkTask err', err);
        });
    },
    routeItem(path) {
      this.$router.push(path);
    },
    // 刷新
    refreshAppr() {
      this.getListData({ checkStatus: '0' });
    },
  },
  mounted() {
    this.refreshAppr();
  },
  created() {},
};
</script>
<style lang="less" scoped>
@import url('../../assets/css/style/commission.less');
</style>

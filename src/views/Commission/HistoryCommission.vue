<template>
    <div>
      <nav-bar-top title="历史任务" :navBg='navBg' :navIcon='navIcon'>
        <template v-slot:right>
          <div>
            <svg-icon iconClass="deletelist"  @click="showDelete =!showDelete"></svg-icon>
          </div>
          <div style="margin-left:10px">
            <svg-icon iconClass="timelouFFF"  @click="showBullet = !showBullet"></svg-icon>
          </div>
        </template>
      </nav-bar-top>
      <div class="home">
        <!--任务列表部分-->
        <div class="commi_alllist">
          <!--routeGuide用来区分是从任务到任务详情还是从历史任务到历史任务详情 1表示历史任务详情 0表示任务详情-->
          <my-commission :data="commiList" routeGuide="1" :showDelete='showDelete'></my-commission>
        </div>
      </div>
      <div class="home_pop">
        <van-popup v-model="showBullet" position="right"
          :style="{ width: '80%',height:'100%',background:'#d3d3d3' }"
          get-container=".contentBox"
        >
          <screen-bullet></screen-bullet>
        </van-popup>
      </div>
    </div>
</template>
<script>
import '../../assets/css/style/commission.less';
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
      commiList: [{
        taskName: '海外分行功能优化细化001-百姓对账 APP', batch: 'X16', type: '项目类', risk: '无', date: '2021.04.02', lever: 0, id: '31',
      }, {
        taskName: '海外分行功能优化细化002-百姓对账 APP', batch: 'X17', type: '项目类', risk: '中', date: '2021.05.02', lever: 2, id: '22',
      }, {
        taskName: '海外分行功能优化细化003-百姓对账 APP', batch: 'X16', type: '项目类', risk: '低', date: '2021.04.02', lever: 1, id: '28',
      }, {
        taskName: '海外分行功能优化细化004-百姓对账 APP', batch: 'X17', type: '项目类', risk: '高', date: '2021.05.02', lever: 3, id: '51',
      }],
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
    routeItem(path) {
      this.$router.push(path);
    },
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
  },
};
</script>

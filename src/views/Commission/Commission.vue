<template>
    <div>
      <nav-bar-top title="任务" :navBg='navBg' :navIcon='navIcon'>
        <template v-slot:right>
          <div>
            <svg-icon iconClass="history" @click="routeItem('/HistoryCommission')"></svg-icon>
          </div>
          <div style="margin-left:10px">
            <svg-icon iconClass="timelouFFF"  @click="showBullet = !showBullet"></svg-icon>
          </div>
        </template>
      </nav-bar-top>
      <nav-bar-bottom></nav-bar-bottom>
      <div class="home">
        <!--任务列表部分-->
        <div class="commi_alllist">
          <!--我的任务-->
          <my-commission :data="commiList" routeGuide='0' :showDelete='showDelete'></my-commission>
          <!--我的审核-->
          <!-- <div v-show="tabIndex===1">
            <my-approve :approveTab="approveTab" ref="chaildApprove"
              v-on:childByValue="allApproveAgree"
            ></my-approve>
          </div> -->
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
      <!--固定的编辑图标-->
      <div class="home_edit" v-show="ifManager">
          <div class="box_frame">
            <div>
              <svg-icon iconClass="checkCenter" @click="routeItem('/Approve')"></svg-icon>
            </div>
            <div>审批</div>
          </div>
      </div>
    </div>
</template>
<script>
import '../../assets/css/style/commission.less';
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
      ifManager: true,
      commiList: [{
        taskName: '海外分行功能优化细化001-百姓对账 APP', batch: 'X16', type: '项目类', risk: '无', date: '2021.04.02', lever: 0, id: '11',
      }, {
        taskName: '海外分行功能优化细化002-百姓对账 APP', batch: 'X17', type: '项目类', risk: '中', date: '2021.05.02', lever: 2, id: '25',
      }, {
        taskName: '海外分行功能优化细化003-百姓对账 APP', batch: 'X16', type: '项目类', risk: '低', date: '2021.04.02', lever: 1, id: '19',
      }, {
        taskName: '海外分行功能优化细化004-百姓对账 APP', batch: 'X17', type: '项目类', risk: '高', date: '2021.05.02', lever: 3, id: '18',
      }, {
        taskName: '海外分行功能优化细化005-百姓对账 APP', batch: 'X16', type: '项目类', risk: '无', date: '2021.04.02', lever: 0, id: '21',
      }, {
        taskName: '海外分行功能优化细化006-百姓对账 APP', batch: 'X17', type: '项目类', risk: '高', date: '2021.05.02', lever: 3, id: '41',
      }, {
        taskName: '海外分行功能优化细化007-百姓对账 APP', batch: 'X16', type: '项目类', risk: '无', date: '2021.04.02', lever: 0, id: '36',
      }],
    };
  },
  methods: {
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

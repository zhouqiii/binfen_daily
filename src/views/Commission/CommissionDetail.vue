<template>
  <div class="commissionDetail">
    <nav-bar-top :title="title" :navBg="navBg"></nav-bar-top>
    <div class="home">
      <div class="commi_detail_box" v-if="introduction.taskName">
        <!--任务详情头box-->
        <div class="coomi_detail_intro boxDiv">
          <div class="list_box_task">{{ introduction.taskName }}</div>
          <div class="item list_box_text box_frame-row">
            <span class="spanNext">任务下达:{{ introduction.taskStartDate }}</span>
            <span class="spanNext">功能测试版本:{{ introduction.uatUpDate }}</span>
          </div>
          <div class="item list_box_text box_frame-row">
            <span class="spanNext">正式版本:{{ introduction.productionUpDate }}</span>
            <span class="span">投产:{{ introduction.productionOnlineDate }}</span>
          </div>
          <div class="item list_box_text box_frame-row">
            <span>批次:{{ introduction.batchNo }}</span>
            <span class="dangerLow" v-if="introduction.dangerType == '0'">风险:无</span>
            <span class="dangerLow" v-if="introduction.dangerType == '1'">风险:低</span>
            <span class="dangerCen" v-if="introduction.dangerType == '2'">风险:中</span>
            <span class="dangerHigh" v-if="introduction.dangerType == '3'">风险:高</span>
          </div>
        </div>
        <!--任务详情时间线-->
        <div class="coomi_detail_timeline">
          <van-collapse v-model="activeNames">
            <van-collapse-item title="任务进度" name="1" class="list_box_task">
              <!--经理时间节点样式-->
              <div v-show="manager">
                <van-steps
                  direction="vertical"
                  :inactive-icon="inActiveIcon"
                  :active-icon="activeIcon"
                  :finish-icon="activeIcon"
                  :active="changestatusManager"
                >
                  <van-step v-for="(st, key) in timeLineList" :key="key">
                    <div class="linestep_text">
                      <div class="stepItem">{{ st.commission }}111</div>
                      <div class="time">{{ st.date }}</div>
                    </div>
                    <div v-show="st.ifPass === 1" class="linestep_operate">
                      <svg-icon
                        iconClass="stepsTheBlank"
                        style="width: 1.5rem; height: 1.5rem"
                        @click="changeManagerApprove(key)"
                      >
                      </svg-icon>
                    </div>
                    <div v-show="st.ifPass === 0" class="linestep_operate">
                      <div class="waitApprove" @click="changeManager(key)">
                        待完成
                      </div>
                    </div>
                  </van-step>
                </van-steps>
              </div>
              <!--经理时间节点样式结束-->
              <!--普通员工时间节点样式-->
              <div v-show="!manager">
                <van-steps
                  direction="vertical"
                  :active="changeStuff"
                  :inactive-icon="inActiveIcon"
                  :active-icon="activeIcon"
                  :finish-icon="activeIcon"
                >
                  <van-step v-for="(st, key) in timeLineList" :key="key">
                    <div class="linestep_text">
                      <div class="stepItem">{{ st.commission }}</div>
                      <div class="stepTime">{{ st.date }}</div>
                    </div>
                    <!-- <div v-show="st.ifPass === 1" class="linestep_operate">
                      <svg-icon iconClass="stepsTheBlank" style="width: 1.5rem; height: 1.5rem">
                      </svg-icon>
                    </div>
                    <div v-show="st.ifPass === 0" class="linestep_operate">
                      <div class="waitApproveStuff">待完成</div>
                    </div> -->
                  </van-step>
                </van-steps>
              </div>
              <!--普通员工节点样式结束-->
            </van-collapse-item>
          </van-collapse>
        </div>
        <!--任务详情人员box-->
        <div class="coomi_detail_people" v-if="peopleList.length > 0">
          <div class="peopel_title">参与人员</div>
          <div class="people_list">
            <div
              v-for="(item, index) in peopleList"
              :key="index"
              class="peopel_list_item box_frame-row"
            >
              <span>{{ item.realName }}</span>
              <span class="role">{{ item.technicalDirection }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getCommissionDetail } from '@/api/commission';
import SvgIcon from '../../components/SvgIcon.vue';
import cirfai from '../../assets/imgs/page/no_step@2x.png';
import success from '../../assets/imgs/page/yes_step@2x.png';

export default {
  components: { SvgIcon },
  props: ['routeGuide'],
  name: 'CommissionDetail',
  data() {
    return {
      title: '',
      navBg: false, // header背景色
      manager: false, // 任务时间节点是经理的样式还是普通员工的样式
      activeNames: ['1'],
      changestatusManager: '4',
      changeStuff: '3', // 控制节点完成状态展示，目前没有判断，假数据
      timeLineList: [],
      peopleList: [],
      introduction: {},
      activeIcon: success,
      inActiveIcon: cirfai,
    };
  },
  methods: {
    getCommissionDetail(id) {
      getCommissionDetail(id)
        .then((res) => {
          this.giveData(res.data.businessTask);
          this.peopleList = res.data.personnel;
          console.log('getCommissionDetail res', res);
        })
        .catch((err) => {
          console.log('getCommissionDetail err', err);
        });
    },
    giveData(val) {
      this.introduction = val;
      if (val.prototypeDesignFinishedDate) {
        this.timeLineList.push({
          commission: '原型定版', // 进度名称
          date: val.prototypeDesignFinishedDate, // 进度时间
          ifPass: 0, // 进度状态 0 未完成 1 已完成
        });
      }
      if (val.totalDesignDate) {
        this.timeLineList.push({
          commission: '总体设计评审',
          date: val.totalDesignDate,
          ifPass: 0,
        });
      }
      if (val.detailDesignDate) {
        this.timeLineList.push({
          commission: '详细设计评审',
          date: val.detailDesignDate,
          ifPass: 0,
        });
      }
      if (val.TestCaseReviewDate) {
        this.timeLineList.push({
          commission: '测试案例评审',
          date: val.TestCaseReviewDate,
          ifPass: 0,
        });
      }
      if (val.AdmissionTestDate) {
        this.timeLineList.push({
          commission: '准入测试',
          date: val.AdmissionTestDate,
          ifPass: 0,
        });
      }
      if (val.innerTestDate) {
        this.timeLineList.push({
          commission: '内部复测',
          date: val.innerTestDate,
          ifPass: 0,
        });
      }
      if (val.codeTestDate) {
        this.timeLineList.push({
          commission: '代码复查',
          date: val.codeTestDate,
          ifPass: 0,
        });
      }
      // 是否为主管级，控制展示样式不同，暂时不区分
      // const { roleId } = this.storage.get('userInfo');
      // if (roleId === '2' || roleId === '3') {
      //   this.manager = true;
      // }
    },
    // 经理-该审批时间节点待审批点击
    changeManager(val) {
      this.changestatusManager = `${val}`;
      for (let i = 0; i <= val; i++) {
        this.timeLineList[i].ifPass = 1;
      }
    },
    // 经理-该审批时间节点的对号批点击
    changeManagerApprove(val) {
      this.changestatusManager = `${val}`;
      for (let i = 0; i < this.timeLineList.length; i++) {
        if (i < val) {
          this.timeLineList[i].ifPass = 1;
        } else {
          this.timeLineList[i].ifPass = 0;
        }
      }
    },
  },
  created() {
    this.$nextTick(() => {
      this.getCommissionDetail(this.$route.query.id);
      const type = JSON.parse(this.$route.query.type);
      if (type === '1') {
        this.title = '历史任务详情';
      } else {
        this.title = '任务详情';
      }
    });
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
@import url('../../assets/css/style/commissionDetail.less');
</style>

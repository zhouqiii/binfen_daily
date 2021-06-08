<template>
    <div>
      <nav-bar-top :title="title" :navBg='navBg'></nav-bar-top>
      <div class="home">
        <div class="commi_detail_box">
          <!--任务详情头box-->
          <div class="coomi_detail_intro boxDiv">
            <div class="item list_box_task">{{introduction.taskName}}</div>
            <div class="item list_box_text box_frame-row">
              <span class="spanNext">任务下达:{{introduction.date}}</span>
              <span class="spanNext">功能测试版本:{{introduction.date}}</span>
            </div>
            <div class="item list_box_text box_frame-row">
              <span class="spanNext">正式版本::{{introduction.date}}</span>
              <span class="span">投产:{{introduction.date}}</span>
            </div>
            <div class="item list_box_text box_frame-row">
              <span>批次:{{introduction.batch}}</span>
              <span :class="{
                  dangerLow:introduction.lever===1,
                  dangerHigh:introduction.lever===3,
                  dangerCen:introduction.lever===2
                  }" class="span">风险:{{introduction.risk}}
              </span>
            </div>
          </div>
          <!--任务详情时间线-->
          <div class="coomi_detail_timeline boxDiv">
            <van-collapse v-model="activeNames">
                <van-collapse-item title="任务进度" name="1" class="list_box_task">
                  <!--经理时间节点样式-->
                  <div v-show="manager">
                    <van-steps direction="vertical" active-color="#5a5959"
                            :active="changestatusManager" active-icon="success">
                      <van-step v-for="(st,key) in timeLineManager" :key="key">
                        <div class="linestep_text">
                          <div class="stepItem">{{st.commission}}</div>
                          <div class="stepItem time">{{st.date}}</div>
                        </div>
                        <div v-show="st.ifPass===1" class="linestep_operate">
                          <svg-icon iconClass="stepsTheBlank"
                            style="width:1.5rem;height:1.5rem"
                            @click="changeManagerApprove(key)"
                          >
                          </svg-icon>
                        </div>
                        <div v-show="st.ifPass===0" class="linestep_operate">
                          <div class="waitApprove" @click="changeManager(key)">待完成</div>
                        </div>
                      </van-step>
                    </van-steps>
                  </div>
                  <!--经理时间节点样式结束-->
                  <!--普通员工时间节点样式-->
                  <div v-show="!manager">
                    <van-steps direction="vertical" active-color="#5a5959"
                            :active="changeStuff"
                            inactive-icon="circle"
                            :active-icon="activeIcon"
                            :finish-icon="finishIcon">
                      <van-step v-for="(st,key) in timeLineStuff" :key="key">
                        <div class="linestep_text">
                          <div class="stepItem">{{st.commission}}</div>
                          <div class="stepItem time">{{st.date}}</div>
                        </div>
                        <div v-show="st.ifPass===1" class="linestep_operate">
                          <svg-icon iconClass="stepsTheBlank"
                            style="width:1.5rem;height:1.5rem"
                          >
                          </svg-icon>
                        </div>
                        <div v-show="st.ifPass===0" class="linestep_operate">
                          <div class="waitApproveStuff">待完成</div>
                        </div>
                      </van-step>
                    </van-steps>
                  </div>
                  <!--普通员工节点样式结束-->
                </van-collapse-item>
              </van-collapse>
          </div>
          <!--任务详情人员box-->
          <div class="coomi_detail_people boxDiv">
            <div class="peopel_title">参与人员</div>
            <div class="people_list">
              <div v-for="(item,index) in peopleList" :key="index"
                class="peopel_list_item box_frame-row"
              >
                <span>{{item.name}}</span>
                <span class="role">{{item.role}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import '../../assets/css/style/commissionDetail.less';
import SvgIcon from '../../components/SvgIcon.vue';
import circle from '../../assets/icons/circle.png';

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
      changeStuff: '2',
      timeLineManager: [{ commission: '原型定版', date: '2021.04.19', ifPass: 1 },
        { commission: '总体设计评审', date: '2021.04.26', ifPass: 1 },
        { commission: '详细设计评审', date: '2021.05.15', ifPass: 1 },
        { commission: '测试案例评审', date: '2021.05.15', ifPass: 1 },
        { commission: '准入测试', date: '2021.05.19', ifPass: 1 },
        { commission: '内部复测', date: '2021.06.11', ifPass: 0 },
        { commission: '代码复查', date: '2021.06.11', ifPass: 0 }],
      timeLineStuff: [{ commission: '原型定版', date: '2021.04.19', ifPass: 1 },
        { commission: '总体设计评审', date: '2021.04.26', ifPass: 1 },
        { commission: '详细设计评审', date: '2021.05.15', ifPass: 1 },
        { commission: '测试案例评审', date: '2021.05.15', ifPass: 0 },
        { commission: '准入测试', date: '2021.05.19', ifPass: 0 },
        { commission: '内部复测', date: '2021.06.11', ifPass: 0 },
        { commission: '代码复查', date: '2021.06.11', ifPass: 0 }],
      peopleList: [{ name: '张三', role: '架构师' },
        { name: '冯二', role: '项目负责人' },
        { name: '张三', role: '产品负责人' },
        { name: '冯二', role: 'IOS开发' },
        { name: '张三', role: 'Android开发' },
        { name: '冯二', role: 'H5开发' }],
      introduction: {
        taskName: '',
        date: '',
        batch: '',
        lever: '',
        risk: '',
      },
      activeIcon: circle,
      finishIcon: circle,

    };
  },
  methods: {
    giveData(val) {
      this.introduction = val;
    },
    // 经理-该审批时间节点待审批点击
    changeManager(val) {
      this.changestatusManager = `${val}`;
      for (let i = 0; i <= val; i++) {
        this.timeLineManager[i].ifPass = 1;
      }
    },
    // 经理-该审批时间节点的对号批点击
    changeManagerApprove(val) {
      this.changestatusManager = `${val}`;
      for (let i = 0; i < this.timeLineManager.length; i++) {
        if (i < val) {
          this.timeLineManager[i].ifPass = 1;
        } else {
          this.timeLineManager[i].ifPass = 0;
        }
      }
    },

  },
  created() {
    this.$nextTick(() => {
      const data = JSON.parse(this.$route.query.data);
      this.giveData(data);
      const id = JSON.parse(this.$route.query.id);
      if (id === '1') {
        this.title = '历史任务详情';
      } else {
        this.title = '任务详情';
      }
    });
  },
  mounted() {
  },
};
</script>

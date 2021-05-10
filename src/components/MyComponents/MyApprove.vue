<template>
    <div>
        <!--我的审批-->
        <div class="myapprovehome">
            <van-tabs v-model="active" sticky class="tab_select">
                <!--我的审批-待审批-->
                <van-tab title="待我审批">
                  <div v-for="(item,index) in approveListUnFinish"
                      :key="index"
                      class="list_box"
                      v-show="ifApproveListUnFinish"
                  >
                    <div class="item box_frame-row">
                      <div class="span_title">{{item.title}}</div>
                      <div class="span_imapprove" @click="routeItem('/ApproveDetail')">立即审批</div>
                    </div>
                    <div class="item">调休类型：{{item.vacationtype}}</div>
                    <div class="item">申请时间：{{item.date}}  {{item.time}}</div>
                    <div class="span_line">
                      <van-steps active-color="#5a5959"
                        :active="item.status" active-icon="success"
                      >
                        <van-step>ta已申请</van-step>
                        <van-step>项目经理审批</van-step>
                        <van-step>主管审批</van-step>
                      </van-steps>
                    </div>
                  </div>
                  <div v-show="!ifApproveListUnFinish" class="home_noContent">
                    <div class="home_noContent_box">
                      <img src="../../assets/icons/noDelayDaily.png"/>
                      <div>太好了，今天没有要审批的任务哦~</div>
                    </div>
                  </div>
                   <!--固定的编辑图标-->
                  <div class="home_edit box_frame">
                      <div @click="allApprove">
                        一键审批
                      </div>
                  </div>
                </van-tab>
                <!--我的审批-已审批-->
                <van-tab title="我已审批">
                  <div v-for="(item,index) in commiListUnFinish"
                    :key="index" class="list_box"
                    v-show="ifApproveListFinish"
                  >
                    <div class="item box_frame-row">
                        <div class="span_title">{{item.title}}</div>
                        <div class="span_imapprove">{{item.state}}</div>
                    </div>
                    <div class="item">申请日期:{{item.date}}</div>
                    <div class="item">申请时间:{{item.time}}</div>
                  </div>
                  <div v-show="!ifApproveListFinish" class="home_noContent">
                    <div class="home_noContent_box">
                      <img src="../../assets/icons/noDelayDaily.png"/>
                      <div>没有已审批内容，看看待我审批中有没有</div>
                    </div>
                  </div>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>
<script>
import '../../assets/css/style/myApprove.less';
import createDom from '../../utils/createDom';
import DialogMessage from './DialogMessage.vue';

export default {
  name: 'MyApprove',
  props: {
    approveTab: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      active: this.approveTab,
      ifApproveListFinish: true, // 待我审批是否有数据
      ifApproveListUnFinish: true, // 已完成列表是否有数据
      approveListUnFinish: [{
        title: '张三提交的延迟申请', vacationtype: '婚假', time: '18:30-21:30', date: '2021-04-29', status: '0',
      }, {
        title: '李四提交的调休申请', vacationtype: '年假', time: '18:30-21:30', date: '2021-04-29', status: '1',
      }, {
        title: '小明提交的延迟申请', vacationtype: '事假', time: '18:30-21:30', date: '2021-04-29', status: '2',
      }, {
        title: '老王提交的延迟申请', vacationtype: '婚假', time: '18:30-21:30', date: '2021-04-29', status: '2',
      }, {
        title: '大鹏提交的延迟申请', vacationtype: '婚假', time: '18:30-21:30', date: '2021-04-29', status: '1',
      }],
      commiListUnFinish: [{
        title: '老王提交的延迟申请', date: '2021.05.02', time: '18:30-21:30', state: '通过',
      }, {
        title: '李四提交的调休申请', date: '2021.05.02', time: '18:30-21:30', state: '拒绝',
      }],
    };
  },
  methods: {
    routeItem(path, val) {
      if (val) {
        this.$router.push({
          path,
          query: {
            data: val,
          },
        });
      } else {
        this.$router.push(path);
      }
    },
    allApprove() {
      createDom(
        DialogMessage,
        {},
        {
          content: `<div style="text-align:center">确定全部申请通过？</div>
                          
                          `,
          selectBtn: true,
        },
      );
    },
  },
  mounted() {

  },
};
</script>
<style lang="less" >

</style>

<template>
  <div style="height:100%">
    <!--我的审批-->
    <div class="myapprovehome">
      <van-pull-refresh
        v-model="isLoading"
        @refresh="onRefresh"
        v-show="ifApproveList"
        style="height:100%"
      >
        <!--下拉提示-->
        <template #pulling="props">
          <svg-icon
            iconClass="Loading"
            :style="{ transform: `scale(${props.distance / 80})` }"
          ></svg-icon>
          <span class="refresh_text">加载</span>
        </template>
        <!-- 释放提示 -->
        <template #loosing>
          <svg-icon iconClass="Loading"></svg-icon>
          <span class="refresh_text">加载</span>
        </template>
        <!-- 加载提示 -->
        <template #loading>
          <svg-icon iconClass="shuaxin"></svg-icon>
          <span class="refresh_text">刷新</span>
        </template>
        <!--审批-->
        <van-checkbox-group
          v-model="resultApprove"
          icon-size="18"
          ref="checkboxApprove"
          @change="getIndexApprove"
          class="checkBoxGroup"
          v-show="approveTab === '0'"
        >
          <div v-for="item in dataList" :key="item.id" class="flex-row">
            <div v-show="showApprove" class="checkBoxSel">
              <van-checkbox :name="item.id"></van-checkbox>
            </div>
            <div @click="routeItem('/ApproveDetail', '1', item)" class="list_box">
              <div class="item box_frame-row">
                <div class="span_title">
                  {{ item.realName }}提交的{{ item.type == '1' ? '延时' : '休假' }}申请
                </div>
                <div class="span_imapprove" v-if="item.status == '0' || item.status == '1'">
                  立即审批
                </div>
              </div>
              <div class="anoitem box_frame-row">
                <div class="box_frame">
                  <div class="item SpanItem" v-if="item.type == '2'">
                    调休类型：
                    <span v-if="item.vacationType == '0'">年假</span>
                    <span v-if="item.vacationType == '1'">事假</span>
                    <span v-if="item.vacationType == '2'">婚假</span>
                    <span v-if="item.vacationType == '3'">产假</span>
                    <span v-if="item.vacationType == '4'">陪产假</span>
                    <span v-if="item.vacationType == '5'">病假</span>
                    <span v-if="item.vacationType == '6'">丧假</span>
                  </div>
                  <div class="item SpanItem">
                    申请时间：{{ item.applyDate }} {{ item.applyTime }}
                  </div>
                </div>
              </div>
              <div class="span_line">
                <van-steps
                  active-color="#2F80ED"
                  :active="item.status_num"
                  :inactive-icon="cirFail"
                  :active-icon="activeIcon"
                  :finish-icon="activeIcon"
                >
                  <van-step>ta已申请</van-step>
                  <van-step>项目经理审批</van-step>
                  <van-step>主管审批</van-step>
                </van-steps>
              </div>
            </div>
          </div>
        </van-checkbox-group>
        <div v-show="showApprove" class="btn_appr box_frame-row">
          <div class="approve_btn allCheck" @click="checkAllBtn">
            <van-checkbox icon-size="18" v-model="ifCheckAll">全选</van-checkbox>
          </div>
          <div class="approve_btn allApprove">
            <div @click="sendApprove">审批</div>
          </div>
        </div>
        <!--历史审批-->
        <van-checkbox-group
          v-model="result"
          icon-size="25"
          ref="checkboxGroup"
          @change="getCheckIndex"
          class="checkBoxGroup"
          v-show="approveTab === '1'"
        >
          <div v-for="(item, index) in dataList" :key="index" class="box_frame-row">
            <div class="checkBoxSel" v-show="showDelete">
              <van-checkbox :name="item.id" @></van-checkbox>
            </div>
            <div
              class="list_box"
              @click="routeItem('/ApproveDetail', '2', item)"
              style="width: 100%;"
            >
              <div class="item box_frame-row">
                <div class="span_title">
                  {{ item.realName }}提交的{{ item.type == '1' ? '延时' : '休假' }}申请
                </div>
                <div
                  class="span_approve"
                  v-if="item.status == '-1' || item.status == '-2' || item.status == '2'"
                >
                  <div v-if="item.status == '2'" class="apprAgree">审批通过</div>
                  <div v-if="item.status == '-1' || item.status == '-2'" class="apprRefuse">
                    审批拒绝
                  </div>
                </div>
              </div>
              <div class="anoitem box_frame-row">
                <div class="box_frame">
                  <div class="item SpanItem" v-if="item.type == '2'">
                    调休类型：
                    <span v-if="item.vacationType == '0'">年假</span>
                    <span v-if="item.vacationType == '1'">事假</span>
                    <span v-if="item.vacationType == '2'">婚假</span>
                    <span v-if="item.vacationType == '3'">产假</span>
                    <span v-if="item.vacationType == '4'">陪产假</span>
                    <span v-if="item.vacationType == '5'">病假</span>
                    <span v-if="item.vacationType == '6'">丧假</span>
                  </div>
                  <div class="item SpanItem">申请日期:{{ item.applyDate }}</div>
                  <div class="item SpanItem">申请时间:{{ item.applyTime }}</div>
                </div>
              </div>
            </div>
          </div>
        </van-checkbox-group>
      </van-pull-refresh>
      <div v-show="!ifApproveList" class="home_noContent">
        <div class="home_noContent_box">
          <img src="../../assets/imgs/page/noapprove_page.png" />
          <div v-show="approveTab === '0'">太好了，今天没有要审批的任务哦~</div>
          <div v-show="approveTab === '1'">没有已审批内容，看看待我审批中有没有</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import circle from '../../assets/imgs/page/no_step.png';
import success from '../../assets/imgs/page/yes_step.png';

export default {
  name: 'MyApprove',
  props: {
    approveTab: {
      // 是审批还是历史审批list
      type: String,
      default: '0',
    },
    showDelete: {
      type: Boolean,
      default: false,
    },
    dataList: {
      type: Array,
      default: () => [],
    },
    showRadio: {
      // 审批页传来的是否显示审批选择框
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      result: [],
      resultApprove: [],
      ifCheckAll: false, // 是否全选
      cirFail: circle,
      ifApproveList: true, // 待我审批是否有数据
      listUnFinishLen: '',
      activeIcon: success,
      finishIcon: circle,
      isLoading: false, // 审批/历史审批的刷新
      showApprove: false, // 是否显示多选审批
    };
  },
  methods: {
    routeItem(path, val, item) {
      if (val) {
        this.$router.push({
          path,
          query: {
            data: val,
            info: JSON.stringify(item),
          },
        });
      } else {
        this.$router.push(path);
      }
    },
    // onRefresh刷新列表异步获取数据
    onRefresh() {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
        this.$emit('refresh');
      }, 100);
    },
    // 通知父组件显示一键审批弹框
    allApprove() {
      this.$emit('childByValue', this.active);
    },
    // 删除框选择改变时触发
    getCheckIndex() {
      this.checkedAll = this.result.length === this.dataList.length;
    },
    // 审批全选框触发的事件
    checkAllBtn() {
      if (this.ifCheckAll) {
        this.$refs.checkboxApprove.toggleAll(false);
      } else {
        this.$refs.checkboxApprove.toggleAll(true);
      }
    },
    // 审批单选框改变触发的事件
    getIndexApprove() {
      this.ifCheckAll = this.resultApprove.length === this.dataList.length;
    },
    // 审批按钮
    sendApprove() {
      const list = [];
      this.dataList.forEach((item) => {
        this.resultApprove.forEach((it) => {
          if (it === item.id) {
            list.push(item);
          }
        });
      });
      this.$emit('sendApprove', list);
    },
    // 删除
    delList() {
      this.$emit('deleteTask', this.result);
    },
  },
  created() {
    this.$nextTick(() => {});
  },
  watch: {
    dataList(newval) {
      if (newval.length === 0) {
        this.ifApproveList = false;
      } else {
        this.ifApproveList = true;
      }
    },
    showRadio(newval) {
      this.showApprove = newval;
    },
  },
};
</script>
<style lang="less" scoped>
@import url('../../assets/css/style/myApprove.less');
</style>

<template>
    <div style="height:100%">
        <!--我的审批-->
      <div class="myapprovehome">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh"
          v-show="ifApproveList"
          style="height:100%"
        >
          <!--下拉提示-->
          <template #pulling="props">
            <svg-icon iconClass="Loading"
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
          <div v-for="item in commiList"
              :key="item.id"
              class="list_box"
              v-show="approveTab==='0'"
          >
            <div class="item box_frame-row">
              <div class="span_title">{{item.title}}</div>
            </div>
            <div class="anoitem box_frame-row">
              <div class="box_frame">
                <div class="item Span">调休类型：{{item.vacationtype}}</div>
                <div class="item Span">申请时间：{{item.date}}  {{item.time}}</div>
              </div>
              <div class="span_imapprove" @click="routeItem('/ApproveDetail','1')">
                立即审批
              </div>
            </div>
            <div class="span_line">
              <van-steps active-color="#5a5959"
                :active="item.status"
                inactive-icon="circle"
                :active-icon="activeIcon"
                :finish-icon="finishIcon"
              >
                <van-step>ta已申请</van-step>
                <van-step>项目经理审批</van-step>
                <van-step>主管审批</van-step>
              </van-steps>
            </div>
          </div>
          <!--历史审批-->
          <van-checkbox-group v-model="result" icon-size="25" ref="checkboxGroup"
            @change="getCheckIndex"
            class="checkBoxGroup"
            v-show="approveTab==='1'"
          >
            <div v-for="(item,index) in commiList"
              :key="index" class="box_frame-row"
            >
              <div class="checkBoxSel" v-show="showDelete">
                <van-checkbox :name="item.id" @></van-checkbox>
              </div>
              <div class="list_box" @click="routeItem('/ApproveDetail','2',item.state)"
                style="width: 100%;"
              >
                <div class="item">
                    <div class="span_title">{{item.title}}</div>
                </div>
                <div class="anoitem box_frame-row">
                  <div class="box_frame">
                    <div class="item Span">申请日期:{{item.date}}</div>
                    <div class="item Span">申请时间:{{item.time}}</div>
                  </div>
                  <div class="span_imapprove">{{item.state}}</div>
                </div>
              </div>
            </div>
          </van-checkbox-group>
        </van-pull-refresh>
        <div v-show="!ifApproveList" class="home_noContent">
          <div class="home_noContent_box">
            <img src="../../assets/icons/noDelayDaily.png"/>
            <div v-show="approveTab==='0'">太好了，今天没有要审批的任务哦~</div>
            <div v-show="approveTab==='1'">没有已审批内容，看看待我审批中有没有</div>
          </div>
        </div>
        <!-- <van-pull-refresh v-model="isLoading" @refresh="onRefresh"
          v-show="ifApproveListFinish && approveTab==='1'"
          style="height:100%"
        >-->
          <!--下拉提示-->
          <!-- <template #pulling="props">
            <svg-icon iconClass="Loading"
            :style="{ transform: `scale(${props.distance / 80})` }"
            ></svg-icon>
            <span class="refresh_text">加载</span>
          </template>-->
          <!-- 释放提示 -->
          <!-- <template #loosing>
            <svg-icon iconClass="Loading"></svg-icon>
            <span class="refresh_text">加载</span>
          </template>-->
            <!-- 加载提示-->
          <!--<template #loading>
            <svg-icon iconClass="shuaxin"></svg-icon>
            <span class="refresh_text">刷新</span>
          </template>
          <van-checkbox-group v-model="result" icon-size="25" ref="checkboxGroup"
            @change="getCheckIndex"
            class="checkBoxGroup"
          >
            <div v-for="(item,index) in commiList"
              :key="index" class="box_frame-row"
            >
              <div class="checkBoxSel" v-show="showDelete">
                <van-checkbox :name="item.id" @></van-checkbox>
              </div>
              <div class="list_box" @click="routeItem('/ApproveDetail','2',item.state)"
                style="width: 100%;"
              >
                <div class="item">
                    <div class="span_title">{{item.title}}</div>
                </div>
                <div class="anoitem box_frame-row">
                  <div class="box_frame">
                    <div class="item Span">申请日期:{{item.date}}</div>
                    <div class="item Span">申请时间:{{item.time}}</div>
                  </div>
                  <div class="span_imapprove">{{item.state}}</div>
                </div>
              </div>
            </div>
          </van-checkbox-group>
        </van-pull-refresh> -->
        <!--删除全选-->
        <div class="home_del" v-show="showDelete">
          <div class="box_frame-row">
            <div class="delcheck"  @click="checkAllBtn">
              <van-checkbox icon-size="25" v-model="checkedAll">全选</van-checkbox>
            </div>
            <div class="del"  @click="delList">删除</div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import '../../assets/css/style/myApprove.less';
import circle from '../../assets/icons/circle.png';

export default {
  name: 'MyApprove',
  props: {
    approveTab: { // 是审批还是历史审批list
      type: String,
      default: '0',
    },
    showDelete: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      result: [],
      checkedAll: '',
      ifApproveList: true, // 待我审批是否有数据
      listUnFinishLen: '',
      commiList: [],
      activeIcon: circle,
      finishIcon: circle,
      isLoading: false, // 审批/历史审批的刷新
    };
  },
  methods: {
    routeItem(path, val, state) {
      if (val) {
        this.$router.push({
          path,
          query: {
            data: val,
            state: JSON.stringify(state),
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
      }, 1000);
    },
    // 通知父组件显示一键审批弹框
    allApprove() {
      this.$emit('childByValue', this.active);
    },
    // 全选框
    checkAllBtn() {
      if (this.checkedAll) {
        this.$refs.checkboxGroup.toggleAll(false);
      } else {
        this.$refs.checkboxGroup.toggleAll(true);
      }
    },
    // 删除框选择改变时触发
    getCheckIndex() {
      this.checkedAll = (this.result.length === this.commiList.length);
    },
    // 删除
    delList() {
      this.$emit('deleteTask', this.result);
    },
  },
  created() {
    this.$nextTick(() => {
      this.commiList = this.data;
    });
  },
  watch: {
    commiList(newval) {
      if (newval.length === 0) {
        this.ifApproveList = false;
      } else {
        this.ifApproveList = true;
      }
    },
  },
};
</script>
<style lang="less" >

</style>

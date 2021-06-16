<template>
    <div class="box">
        <nav-bar-top title="延迟申请" type='MyInfo'>
          <template v-slot:right>
            <div>
              <svg-icon iconClass="deletelist" @click="showDelete =!showDelete"></svg-icon>
            </div>
            <div style="margin-left:10px">
              <svg-icon iconClass="timelou"  @click="show = true"></svg-icon>
            </div>
          </template>
        </nav-bar-top>
        <div class="home">
            <!--刷新部分只为申请列表-->
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
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
              <!--延迟申请列表-->
              <no-content showNocontent='1' v-show="ifNoContent"></no-content>
              <div class="home_padd"  v-show="!ifNoContent">
                <van-checkbox-group v-model="result" icon-size="25" ref="checkboxGroup"
                  @change="getCheckIndex"
                  class="checkBoxGroup"
                >
                  <div v-for="(item,index) in commiList" :key="index" class="box_frame-row">
                    <div v-show="showDelete" class="checkBoxSel">
                      <van-checkbox :name="item.id" @></van-checkbox>
                    </div>
                    <div class="daily_seebox"  @click="routeItem('/ExtentionDetail',index)">
                      <div class="daily_seedate">{{item.date}} {{item.time}}</div>
                      <div class="daily_seecontent">
                        <div class="text textEllipsis" style="width:90%">任务：{{item.taskName}}</div>
                        <div class="text">申请日期：{{item.date}}</div>
                        <div class="text">申请延迟工时：{{item.workerHour}}</div>
                        <div class="daily_seecontent_stepline">
                          <van-steps active-color="#5a5959"
                            :active="item.changestatus"
                            inactive-icon="circle"
                            :active-icon="activeIcon"
                            :finish-icon="finishIcon"
                          >
                            <van-step v-for="(st,key) in item.state" :key="key"> {{st}}</van-step>
                          </van-steps>
                          <div class="bottom_text">
                            <span>我</span>
                            <span style="margin-left:2rem">项目经理审批</span>
                            <span>经理审批</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </van-checkbox-group>
              </div>
            </van-pull-refresh>
            <!--右侧弹出层-->
            <div class="home_pop">
                <van-popup v-model="show" position="right"
                    :style="{ width: '80%',height:'100%',background:'#d3d3d3' }"
                    get-container=".contentBox"
                >
                 <!--弹出层挂载的节点--这里其实应该写成子组件，这样几个页面都可以复用，但是我第一遍写的时候忘了，有时间的话再改一下-->
                <div class="contentBox">
                    <div class="ruleForm">
                        <div class="formItem">
                            <van-field
                                v-model="startDate"
                                is-link
                                readonly
                                label="提交开始时间"
                                placeholder="请选择"
                                @click="startTimePop = true"
                            />
                            <van-popup v-model="startTimePop" position="bottom">
                                <van-datetime-picker
                                    v-model="currentDate"
                                    type="date"
                                    :max-date="maxDate"
                                    title=" "
                                    :formatter="formatterD"
                                    @cancel="startTimePop = false"
                                    @confirm='onConfirmStartTime'
                                />
                            </van-popup>
                        </div>
                        <div class="formItem">
                            <van-field
                                v-model="endDate"
                                is-link
                                readonly
                                label="提交结束时间"
                                placeholder="请选择"
                                @click="endTimePop = true"
                            />
                            <van-popup v-model="endTimePop" position="bottom">
                                <van-datetime-picker
                                    v-model="currentDate"
                                    type="date"
                                    :max-date="maxDate"
                                    title=" "
                                    :formatter="formatterD"
                                    @cancel="endTimePop = false"
                                    @confirm='onConfirmEndTime'
                                />
                            </van-popup>
                        </div>
                    </div>
                    <div class="statusSelect_btn box_frame">
                      <div class="checktitle">审批结果</div>
                      <div class="statusCheckBtn box_frame-row">
                        <div @click="applyStatus=!applyStatus"
                          :class="{bgColor:applyStatus}">
                          已通过
                        </div>
                        <div @click="passStatus=!passStatus"
                          :class="{bgColor:passStatus}">
                          未通过
                        </div>
                        <div @click="checkStatus=!checkStatus"
                          :class="{bgColor:checkStatus}">
                          审批中
                        </div>
                      </div>
                    </div>
                    <div class="timeSelect_btn flex_evenly">
                        <div class="timeSelect_btn_cancel" @click="resetCheck">重置</div>
                        <div class="timeSelect_btn_confirm" @click="getSelectComm">确定</div>
                    </div>
                </div>
                </van-popup>
            </div>
            <!--固定的编辑图标-->
            <div class="home_edit box_frame">
                <div>
                  <svg-icon iconClass="bu" @click="routeItem('/WriteExtention')"></svg-icon>
                </div>
            </div>
             <!--删除全选-->
            <div class="home_del" v-show="showDelete">
              <div class="box_frame-row">
                <div class="delcheck"  @click="checkAllBtn">
                  <van-checkbox icon-size="25" v-model="checkedAll">全选</van-checkbox>
                </div>
                <div class="del">删除</div>
              </div>
            </div>
        </div>
    </div>
</template>
<script>
import SvgIcon from '../../components/SvgIcon.vue';
import '../../assets/css/style/seeExtention.less';
import circle from '../../assets/icons/circle.png';

export default {
  components: { SvgIcon },
  name: 'SeeExtention',
  data() {
    return {
      commiList: [{
        time: '7:30', date: '2021-4-30', state: ['已申请', '审批中', '审批中'], taskName: '海外分行功能优化细化001-百姓', workerHour: '3小时', status: '0', id: '1', changestatus: '0',
      }, {
        time: '7:30', date: '2021-4-30', state: ['已申请', '已通过', '审批中'], taskName: '海外分行功能优化细化001-百姓', workerHour: '3小时', status: '1', id: '3', changestatus: '1',
      }, {
        time: '7:30', date: '2021-4-30', state: ['已申请', '拒绝', '审批中'], taskName: '2.X16 乘车乘车码原型设计3码原型设计3.X16 乘车码原型设计', workerHour: '3小时', status: '-1', id: '33', changestatus: '1',
      }, {
        time: '7:30', date: '2021-4-30', state: ['已申请', '已通过', '拒绝'], taskName: '2.X16 乘车乘车码原型设计3码原型设计3.X16 乘车码原型设计', workerHour: '3小时', status: '-2', id: '2', changestatus: '2',
      }, {
        time: '7:30', date: '2021-4-30', state: ['已申请', '已通过', '已通过'], taskName: '2.X16 乘车乘车码原型设计3码原型设计3.X16 乘车码原型设计', workerHour: '3小时', status: '2', id: '9', changestatus: '2',
      }],
      isLoading: false,
      show: false, // 右侧弹出框
      startDate: '', // 开始时间
      endDate: '', // 结束时间
      currentDate: new Date(),
      maxDate: new Date(),
      startTimePop: false, // 开始时间弹出框
      endTimePop: false, // 结束时间弹出框
      applyStatus: false,
      passStatus: false,
      checkStatus: false,
      showDelete: false,
      activeIcon: circle,
      finishIcon: circle,
      checkedAll: false,
      ifNoContent: false,
      result: [],

    };
  },
  methods: {
    // 格式化月日弹框：2021年5月11日
    formatterD(type, val) {
      if (type === 'year') {
        return `${val}年`;
      }
      if (type === 'month') {
        return `${val}月`;
      } if (type === 'day') {
        return `${val}日`;
      }
      return val;
    },
    formatDate(val) { // 格式化身份张有效期时间为2019-05-04的格式
      const month = (parseInt(val.getMonth() + 1, 10)) < 10 ? `0${val.getMonth() + 1}` : (val.getMonth() + 1);
      const day = (parseInt(val.getDate(), 10)) < 10 ? `0${val.getDate()}` : (val.getDate());
      const year = new Date().getFullYear();
      return `${year}-${month}-${day}`;
    },
    // 开始时间确定按钮
    onConfirmStartTime(date) {
      this.startTimePop = false;
      this.startDate = `${this.formatDate(date)}`;
    },
    // 结束时间确定按钮
    onConfirmEndTime(date) {
      this.endTimePop = false;
      this.endDate = `${this.formatDate(date)}`;
    },
    // 重置按钮
    resetCheck() {
      this.startDate = '';
      this.endDate = '';
      this.currentDate = new Date();
      this.applyStatus = false;// 清除审核进程状态的筛选条件
      this.passStatus = false;
      this.checkStatus = false;
    },
    // 通过时间筛选看延迟申请列表
    getSelectComm() {
      this.show = false;
      const statusList = [];
      if (this.applyStatus) {
        statusList.push(0);
      } if (this.passStatus) {
        statusList.push(1);
      } if (this.checkStatus) {
        statusList.push(2);
      }
    },
    // onRefresh刷新列表异步获取数据
    onRefresh() {
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    },
    // 去写页面
    routeItem(path, val) {
      if (val >= 0) {
        let refuse = -1;
        if (this.commiList[val].status < 0) {
          refuse = 1;
        }
        this.$router.push({
          path,
          query: {
            refuse, // 是否有拒绝状态
            id: JSON.stringify(this.commiList[val].id), // 携带id给日报详情页面，详情页面根据id查接口数据
            date: JSON.stringify(this.commiList[val].date), // 用来存该日报日期，带给详情页面，因为我看详情的接口没有date
          },
        });
      } else {
        this.$router.push(path);
      }
    },
    // 删除框选择改变时触发
    getCheckIndex() {
      this.checkedAll = (this.result.length === this.commiList.length);
    },
    // 全选框
    checkAllBtn() {
      if (this.checkedAll) {
        this.$refs.checkboxGroup.toggleAll(false);
      } else {
        this.$refs.checkboxGroup.toggleAll(true);
      }
    },
  },
  watch: {
    commiList(newval) {
      if (newval.length === 0) {
        this.ifNoContent = true;
      } else {
        this.ifNoContent = false;
      }
    },
  },
};
</script>

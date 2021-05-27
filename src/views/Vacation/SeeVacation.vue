<template>
    <div class="box">
        <nav-bar-top title="休假申请">
          <template v-slot:right>
            <div>
              <svg-icon iconClass="deletelist" @click="showDelete =!showDelete"></svg-icon>
            </div>
            <div style="margin-left:10px">
              <svg-icon iconClass="timelou"  @click="showTime"></svg-icon>
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
              <no-content showNocontent='2' v-show="ifNoContent"></no-content>
              <div class="home_padd"  v-show="!ifNoContent">
                 <van-checkbox-group v-model="result" icon-size="25" ref="checkboxGroup"
                  @change="getCheckIndex"
                  class="checkBoxGroup"
                >
                  <div v-for="(item,index) in commiList" :key="index" class="box_frame-row">
                    <div v-show="showDelete" class="checkBoxSel">
                      <van-checkbox :name="item.id" @></van-checkbox>
                    </div>
                    <div class="daily_seebox"  @click="routeItem('/VacationDetail',index)">
                      <div class="daily_seedate">{{item.date}}  {{item.time}}</div>
                      <div class="daily_seecontent">
                        <div class="vacationText">{{item.taskName}}</div>
                        <div class="text">休假日期：{{item.date}}</div>
                        <div class="text">休假时段：{{item.workerHour}}</div>
                        <div class="daily_seecontent_stepline">
                          <van-steps active-color="#5a5959"
                            :active="item.changestatus"
                          >
                            <van-step v-for="(st,key) in item.state" :key="key">
                              <template v-slot:inactive-icon>
                                <van-icon name="circle"/>
                              </template>
                              <template v-slot:active-icon>
                                <van-icon :name="activeIcon"/>
                              </template>
                              <template v-slot:finish-icon>
                                <van-icon :name="finishIcon"/>
                              </template>
                              {{st}}
                            </van-step>
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
                 <!--弹出层挂载的节点-->
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
                    <div class="typeBtn ruleForm" >
                        <div class="formItem">
                            <van-field
                                v-model="vacationType"
                                is-link
                                readonly
                                label="休假类型"
                                placeholder="请选择"
                                @click="pickVacationType = true"
                            />
                            <van-popup v-model="pickVacationType" round position="bottom">
                            <van-picker
                                show-toolbar
                                :columns="vacationSelects"
                                @cancel="pickVacationType = false"
                                @confirm="onConfirmVacation"
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
                  <svg-icon iconClass="bu" @click="routeItem('/WriteVacation')"></svg-icon>
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
  name: 'SeeVacation',
  data() {
    return {
      commiList: [{
        time: '7:30', date: '4月22日~4月22日', state: ['已申请', '审批中', '审批中'], taskName: '事假', workerHour: '8:30~10:30', status: '0', id: '2', changestatus: '0',
      }, {
        time: '7:30', date: '4月22日~4月22日', state: ['已申请', '已通过', '审批中'], taskName: '年假', workerHour: '8:30~10:30', status: '1', id: '11', changestatus: '1',
      }, {
        time: '7:30', date: '4月22日~4月22日', state: ['已申请', '拒绝', '审批中'], taskName: '年假', workerHour: '8:30~10:30', status: '-1', id: '66', changestatus: '1',
      }, {
        time: '7:30', date: '4月22日~4月22日', state: ['已申请', '已通过', '拒绝'], taskName: '病假', workerHour: '8:30~10:30', status: '-2', id: '25', changestatus: '2',
      }, {
        time: '7:30', date: '4月22日~4月22日', state: ['已申请', '已通过', '已通过'], taskName: '年假', workerHour: '8:30~10:30', status: '2', id: '89', changestatus: '2',
      }],
      isLoading: false,
      show: false, // 右侧弹出框
      startDate: '', // 开始时间
      endDate: '', // 结束时间
      currentDate: new Date(),
      maxDate: new Date(),
      startTimePop: false, // 开始时间弹出框
      endTimePop: false, // 结束时间弹出框
      applyStatus: false, // 3个筛选状态
      passStatus: false,
      checkStatus: false,
      showDelete: false,
      checkedAll: false,
      ifList: true, // 休假列表是否为空
      pickVacationType: false, // 休假类型选项
      vacationType: '', // 休假类型
      vacationSelects: ['年假', '事假', '婚假', '产假', '陪产假', '病假', '丧假', '流产假'],
      activeIcon: circle,
      finishIcon: circle,
      result: [],

    };
  },
  methods: {
    showTime() {
      this.resetCheck();
      this.show = true;
    },

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
    // 休假类型确定按钮
    onConfirmVacation(val) {
      this.vacationType = val;
      this.pickVacationType = false;
    },
    // 重置按钮
    resetCheck() {
      this.startDate = '';
      this.endDate = '';
      this.vacationType = '';
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
            id: JSON.stringify(this.commiList[val].id), // 携带id给日报详情页面，详情页面根据id查接口数据
            date: JSON.stringify(this.commiList[val].date), // 用来存该日报日期，带给详情页面，因为我看详情的接口没有date
            refuse, // 是否有拒绝状态
          },
        });
      } else {
        this.$router.push(path);
      }
    },
  },
  computed: {
    ifNoContent() {
      if (this.commiList.length === 0) {
        this.$nextTick(() => true);
      }
      return false;
    },
  },
};
</script>
<style lang='less' scoped>
.vacationText{
    font-size: 1rem;
}
.typeBtn{
    margin-top: 1rem;
}
</style>

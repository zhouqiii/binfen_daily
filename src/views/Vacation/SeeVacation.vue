<template>
  <div class="box">
    <nav-bar-top title="休假申请" type="MyInfo">
      <template v-slot:right>
        <div class="img">
          <img
            src="../../assets/icons/mine/icon_delete.png"
            alt=""
            @click="showDelete = !showDelete"
          />
        </div>
        <div class="img">
          <img src="../../assets/icons/mine/icon_screen.png" alt="" @click="showTime" />
        </div>
      </template>
    </nav-bar-top>
    <div class="home">
      <no-content showNocontent="2" v-if="commiList.length == 0"></no-content>
      <van-pull-refresh v-model="isDownLoading" @refresh="onDownRefresh" v-else>
        <van-list
          v-model="isUpLoading"
          :finished="upFinished"
          :immediate-check="false"
          :offset="10"
          finished-text="- 我也是有底线的 -"
          @load="onLoadList"
        >
          <div class="home_padd">
            <van-checkbox-group
              v-model="result"
              icon-size="18"
              ref="checkboxGroup"
              @change="getCheckIndex"
              class="checkBoxGroup"
            >
              <div v-for="(item, index) in commiList" :key="index" class="box_frame-row">
                <div class="daily_seebox">
                  <div class="daily_seedate">{{ item.createDate }} {{ item.createTimeFormat }}</div>
                  <div class="flex-row">
                    <div v-show="showDelete" class="checkBoxSel">
                      <van-checkbox :name="item.id" @></van-checkbox>
                    </div>
                    <div class="daily_seecontent" @click="routeItem('/VacationDetail', index)">
                      <div class="daily_seecontent_week">
                        <span v-if="item.vacationType == '0'">年假</span>
                        <span v-if="item.vacationType == '1'">事假</span>
                        <span v-if="item.vacationType == '2'">婚假</span>
                        <span v-if="item.vacationType == '3'">产假</span>
                        <span v-if="item.vacationType == '4'">陪产假</span>
                        <span v-if="item.vacationType == '5'">病假</span>
                        <span v-if="item.vacationType == '6'">丧假</span>
                      </div>
                      <div class="text">
                        休假日期：{{ item.vacationStartDate }} 至 {{ item.vacationEndDate }}
                      </div>
                      <div class="text">
                        休假时段：{{ item.vacationStartTime }} - {{ item.vacationEndTime }}
                      </div>
                      <div class="daily_seecontent_stepline">
                        <van-steps
                          :active-color="item.status < 0 ? '#EB5757' : '#2F80ED'"
                          :active="item.changestatus"
                          :inactive-icon="cirFil"
                          :active-icon="item.status < 0 ? refuseIcon : activeIcon"
                          :finish-icon="activeIcon"
                        >
                          <van-step v-for="(st, key) in item.state" :key="key">
                            {{ st }}
                          </van-step>
                        </van-steps>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </van-checkbox-group>
          </div>
        </van-list>
      </van-pull-refresh>
      <!--右侧弹出层-->
      <div class="home_pop">
        <van-popup
          v-model="show"
          position="right"
          :style="{ height: '100%', background: '#f9fafc' }"
          get-container=".contentBox"
        >
          <!--弹出层挂载的节点-->
          <div class="contentBox">
            <div class="mainTitle">提交时间</div>
            <div class="ruleForm">
              <div class="start_time_and_end_time flex_evenly">
                <div class="start_time">
                  开始时间
                  <svg-icon icon-class="arrowsDrop"></svg-icon>
                </div>
                <div class="end_time">
                  结束时间
                  <svg-icon icon-class="arrowsDrop"></svg-icon>
                </div>
              </div>
              <div class="short_line"></div>
              <div class="formItems">
                <div class="daily_timesel">
                  <van-field
                    v-model="startDate"
                    readonly
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
                      @confirm="onConfirmStartTime"
                    />
                  </van-popup>
                </div>
                <div class="daily_timesel">
                  <van-field
                    v-model="endDate"
                    readonly
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
                      @confirm="onConfirmEndTime"
                    />
                  </van-popup>
                </div>
              </div>
            </div>
            <div class="typeBtn ruleForm">
              <div class="formItem vacation_type">
                <van-field
                  v-model="vacationType"
                  is-link
                  readonly
                  placeholder="请选择"
                  @click="pickVacationType = true"
                >
                  <template #label>
                    <div class="vacation_type">休假类型</div>
                  </template>
                </van-field>
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
                <div @click="applyStatus = !applyStatus" :class="{ bgColor: applyStatus }">
                  已通过
                </div>
                <div @click="passStatus = !passStatus" :class="{ bgColor: passStatus }">
                  未通过
                </div>
                <div @click="checkStatus = !checkStatus" :class="{ bgColor: checkStatus }">
                  审批中
                </div>
              </div>
            </div>
            <div class="timeSelect_btn flex_evenly">
              <div class="timeSelect_btn_cancel" @click="resetCheck">重置</div>
              <div class="timeSelect_btn_confirm" @click="getSelectComm('select')">确定</div>
            </div>
          </div>
        </van-popup>
      </div>
      <!--固定的编辑图标-->
      <div class="home_edit box_frame">
        <img src="../../assets/imgs/page/go_page@2x.png" @click="routeItem('/WriteVacation')" />
      </div>
      <!--删除全选-->
      <div v-show="showDelete">
        <div class="blank"></div>
        <div class="home_del">
          <div class="box_frame-row">
            <div class="delcheck" @click="checkAllBtn">
              <van-checkbox icon-size="25" v-model="checkedAll">全选</van-checkbox>
            </div>
            <div class="del" @click="deleteVacation">删除</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getVacationList, deleteVacation } from '@/api/user';
import SvgIcon from '../../components/SvgIcon.vue';
import circle from '../../assets/imgs/page/no_step.png';
import success from '../../assets/imgs/page/yes_step.png';
import refuse from '../../assets/imgs/page/refuse_step.png';

export default {
  components: { SvgIcon },
  name: 'SeeVacation',
  data() {
    return {
      commiList: [],
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
      cirFil: circle, // 未激活图标
      activeIcon: success, // 激活图标
      refuseIcon: refuse, // 激活图标
      ifList: true, // 休假列表是否为空
      pickVacationType: false, // 休假类型选项
      vacationType: '', // 休假类型
      vacationTypeId: '', // 休假类型type
      vacationSelects: [
        {
          text: '年假',
          type: '0',
        },
        {
          text: '事假',
          type: '1',
        },
        {
          text: '婚假',
          type: '2',
        },
        {
          text: '产假',
          type: '3',
        },
        {
          text: '陪产假',
          type: '4',
        },
        {
          text: '病假',
          type: '5',
        },
        {
          text: '丧假',
          type: '6',
        },
      ],
      ifNoContent: false,
      result: [],
      pageNum: 1,
      pageSize: 10,
      total: 0,
      isDownLoading: false, // 下拉刷新
      isUpLoading: false, // 上拉加载
      upFinished: false, // 上拉加载完毕
      isSelect: false, // 是否是筛选列表
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
      }
      if (type === 'day') {
        return `${val}日`;
      }
      return val;
    },
    // 格式化时间
    formatTimeShow(val) {
      // 将时间16:05:04格式化为16:05的格式
      const value = val.split(':');
      return `${value[0]}:${value[1]}`;
    },
    formatDate(val) {
      // 格式化身份张有效期时间为2019-05-04的格式
      const month = parseInt(val.getMonth() + 1, 10) < 10 ? `0${val.getMonth() + 1}` : val.getMonth() + 1;
      const day = parseInt(val.getDate(), 10) < 10 ? `0${val.getDate()}` : val.getDate();
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
      this.vacationType = val.text;
      this.vacationTypeId = val.type;
      this.pickVacationType = false;
    },
    // 下拉刷新事件
    onDownRefresh() {
      this.showDelete = false;
      this.result = [];
      this.pageNum = 1;
      this.isUpLoading = true;
      this.upFinished = false; // 不写这句会导致你上拉到底过后在下拉刷新将不能触发下拉加载事件
      this.getSelectComm('select');
    },
    // 上拉加载请求方法
    onLoadList() {
      this.pageNum += 1;
      this.getSelectComm();
    },
    getVacationList(obj) {
      getVacationList(obj)
        .then((res) => {
          this.isDownLoading = false;
          this.isUpLoading = false;
          const list = res.data.records;
          const arr = [];
          if (list === null || list.length === 0) {
            // 加载结束
            this.upFinished = true;
            // return;
          }
          if (list.length < this.pageSize) {
            // 最后一页不足10条的情况
            this.upFinished = true;
          }
          if (list.length > 0) {
            list.forEach((item, index) => {
              arr.push({
                ...item,
                changestatus: Math.abs(Number(item.status)),
                createTimeFormat: this.formatTimeShow(item.createTime),
              });
              if (item.status === '0') {
                arr[index].state = ['我已申请', '项目经理待审批', '主管待审批'];
              }
              if (item.status === '1') {
                arr[index].state = ['我已申请', '项目经理已通过', '主管待审批'];
              }
              if (item.status === '-1') {
                arr[index].state = ['我已申请', '项目经理拒绝', '主管待审批'];
              }
              if (item.status === '2') {
                arr[index].state = ['我已申请', '项目经理已通过', '主管已通过'];
              }
              if (item.status === '-2') {
                arr[index].state = ['我已申请', '项目经理已通过', '主管拒绝'];
              }
            });
          }

          // 处理数据
          if (this.pageNum === 1 || this.isSelect) {
            this.commiList = arr;
          } else {
            this.commiList = this.commiList.concat(arr);
          }
          if (this.commiList.length >= res.data.total) {
            this.upFinished = true;
          }
          this.isSelect = false;
          if (this.isSelect) {
            this.resetCheck();
          }
        })
        .catch((err) => {
          console.log('getVacationList err', err);
        });
    },
    // 删除申请
    deleteVacation() {
      if (this.result.length <= 0) {
        this.$toast('请先勾选需要删除的休假申请');
        return;
      }
      // console.log('this.result', this.result);
      deleteVacation({ ids: this.result })
        .then((res) => {
          this.showDelete = false;
          this.result = [];
          this.getSelectComm('select');
          console.log('deleteVacation res', res);
        })
        .catch((err) => {
          console.log('deleteVacation err', err);
        });
    },
    // 重置按钮
    resetCheck() {
      this.startDate = '';
      this.endDate = '';
      this.vacationType = '';
      this.currentDate = new Date();
      this.applyStatus = false; // 清除审核进程状态的筛选条件
      this.passStatus = false;
      this.checkStatus = false;
    },
    // 通过时间筛选看延时申请列表
    getSelectComm(type) {
      if (type === 'select') {
        this.isSelect = true;
        this.pageNum = 1;
        this.upFinished = false;
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        window.pageYOffset = 0;
      }
      this.show = false;
      const statusList = [];
      if (this.applyStatus) {
        statusList.push('2');
      }
      if (this.passStatus) {
        statusList.push('-1', '-2');
      }
      if (this.checkStatus) {
        statusList.push('0', '1');
      }
      const obj = {
        ...this.getSelectQuery(),
        vacationEndDate: this.endDate,
        vacationStartDate: this.startDate,
        status: statusList,
        pageNum: this.pageNum,
        vacationType: this.vacationTypeId,
      };
      this.getVacationList(obj);
    },
    getSelectQuery() {
      const obj = {
        vacationEndDate: '',
        vacationStartDate: '',
        pageNum: 1,
        pageSize: this.pageSize,
        status: [],
        vacationType: '',
      };
      return obj;
    },
    // 删除框选择改变时触发
    getCheckIndex() {
      this.checkedAll = this.result.length === this.commiList.length;
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
        this.$router.push({
          path,
          query: {
            id: this.commiList[val].id,
          },
        });
      } else {
        this.$router.push(path);
      }
    },
  },
  mounted() {
    this.onDownRefresh();
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
<style lang="less" scoped>
@import url('../../assets/css/style/seeExtention.less');
.vacationText {
  font-size: 1rem;
}
.typeBtn {
  margin-top: 1rem;
}
</style>

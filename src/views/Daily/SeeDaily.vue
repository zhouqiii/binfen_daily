<template>
    <div class="box" style="height: 100%;">
        <nav-bar-top title="日报">
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
            <!--刷新部分只为日报列表-->
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh"
              style="min-height:100%;background:#e4e4e4"
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
              <no-content showNocontent='0' v-show="ifNoContent"></no-content>
              <!--日报列表-->
              <div class="home_padd" v-show="!ifNoContent">
                <van-checkbox-group v-model="result" icon-size="25" ref="checkboxGroup"
                  @change="getCheckIndex"
                  class="checkBoxGroup"
                >
                  <div v-for="(item,index) in commiList" :key="index" class="box_frame-row">
                    <div v-show="showDelete" class="checkBoxSel">
                      <van-checkbox :name="item.id" @></van-checkbox>
                    </div>
                    <div class="daily_seebox"  @click="routeItem('/DailyDetail',index)">
                      <div class="daily_seedate"> {{item.workDate}} {{item.time}}</div>
                      <div class="daily_seecontent">
                          <div class="box_frame-row">
                              <span class="daily_seecontent_week" >填报日期：{{item.workDate}}</span>
                              <span class="daily_seecontent_state">{{item.status}}</span>
                          </div>
                          <div class="text textEllipsis">
                            任务：{{item.taskName}}
                          </div>
                          <div class="text textEllipsis">
                            今日工作：{{item.workerInfo}}
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
                                label="开始时间"
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
                                    @cancel='startTimePop = false'
                                    @confirm='onConfirmStartTime'
                                />
                            </van-popup>
                        </div>
                        <div class="formItem">
                            <van-field
                                v-model="endDate"
                                is-link
                                readonly
                                label="结束时间"
                                placeholder="请选择"
                                @click="endTimePop = true"
                            />
                            <van-popup v-model="endTimePop" position="bottom">
                                <van-datetime-picker
                                    v-model="currentDateEnd"
                                    type="date"
                                    :max-date="maxDate"
                                    title=" "
                                    :formatter="formatterD"
                                    @cancel='endTimePop = false'
                                    @confirm='onConfirmEndTime'
                                />
                            </van-popup>
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
                <div><svg-icon iconClass="bu" @click="routeItem('/WriteDaily')"></svg-icon></div>
            </div>
            <!--删除全选-->
            <div class="home_del" v-show="showDelete">
              <div class="box_frame-row">
                <div class="delcheck"  @click="checkAllBtn">
                  <van-checkbox icon-size="25" v-model="checkedAll">全选</van-checkbox>
                </div>
                <div class="del" @click="delDaily">删除</div>
              </div>
            </div>
        </div>
    </div>
</template>
<script>
import SvgIcon from '../../components/SvgIcon.vue';
import '../../assets/css/style/seeDaily.less';

let count = 1;
let startTimeCheck = '';
let endTimeCheck = '';
const formatDateList = [];
export default {
  components: { SvgIcon },
  name: 'SeeDaily',
  data() {
    return {
      ifNoContent: false,
      commiList: [],
      isLoading: false,
      show: false, // 右侧弹出框
      startDate: '', // 开始时间
      endDate: '', // 结束时间
      currentDate: new Date(),
      currentDateEnd: new Date(),
      maxDate: new Date(),
      startTimePop: false, // 开始时间弹出框
      endTimePop: false, // 结束时间弹出框
      showDelete: false,
      result: [],
      checkedAll: false,
      isTrue: false,
    };
  },
  methods: {
    // 获取列表数据
    getListData(start, end) { // start, end
      this.requestAxios({
        url: '/workDaily/work-daily/getListByPage', // /workDaily/work-daily/getListByPage
        data: {
          pageNum: count,
          pageSize: 5,
          startDate: start,
          endDate: end,
        },
        method: 'post', // post
      })
        .then((res) => {
          if (res.data.records) {
            Array.prototype.forEach.call(res.data.records, (item) => {
              if (item.status === '0') {
                this.$set(item, 'status', '已提交');
              }
              if (item.workDate) {
                formatDateList.push(item.workDate);
                this.$set(item, 'workDate', this.formatDateShow(item.workDate));
              }
              this.commiList.push(item);
            });
          }
          this.isTrue = true;
        })
        .catch(() => {});
    },
    // 删除选中日报
    delDaily() {
      this.requestAxios({
        url: '/workDaily/work-daily/del', //
        data: {
          ids: this.result,
        },
        method: 'delete', // post
      }).then((res) => {
        if (res.success) {
          this.$toast('删除成功');
          count = 1;
          this.commiList = [];
          this.getListData('', '');
        } else {
          this.$toast('删除失败，请重试！');
        }
      }).catch(() => {});
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
    // 重置按钮
    resetCheck() {
      this.startDate = '';
      this.endDate = '';
      this.currentDate = new Date();
    },
    // 格式化日期
    formatDateSend(val) { // 将中国标准时间格式化时间为2019-05-04的格式
      const month = (parseInt(val.getMonth() + 1, 10)) < 10 ? `0${val.getMonth() + 1}` : (val.getMonth() + 1);
      const day = (parseInt(val.getDate(), 10)) < 10 ? `0${val.getDate()}` : (val.getDate());
      const year = new Date().getFullYear();
      return `${year}-${month}-${day}`;
    },
    // 格式化日期
    formatDateShow(val) { // 将时间2019-05-04格式化为2019年5月4日的格式
      const value = val.split('-');
      return `${value[0]}年${value[1]}月${value[2]}日`;
    },
    // 开始时间确定按钮
    onConfirmStartTime(date) {
      this.startTimePop = false;
      this.startDate = `${this.formatDateSend(date)}`;
    },
    // 结束时间确定按钮
    onConfirmEndTime(date) {
      this.endTimePop = false;
      this.endDate = `${this.formatDateSend(date)}`;
    },
    // 通过时间筛选看日报列表
    getSelectComm() {
      this.show = false;
      this.commiList = [];
      this.resetParams(this.startDate, this.endDate);
    },
    // onRefresh刷新列表异步获取数据
    onRefresh() {
      setTimeout(() => {
        this.commiList = [];
        this.isLoading = false;
        this.resetParams('', '');
      }, 1000);
    },
    // 封装重置参数，并且在一次调用参数
    resetParams(start, end) {
      count = 1;// 重新分页，把count重设为0
      startTimeCheck = start;// 重设全局时间
      endTimeCheck = end;
      this.getListData(startTimeCheck, endTimeCheck);
    },
    // 去写页面
    routeItem(path, val) {
      if (val >= 0) {
        this.$router.push({
          path,
          query: {
            id: JSON.stringify(this.commiList[val].id), // 携带id给日报详情页面，详情页面根据id查接口数据
            date: JSON.stringify(this.commiList[val].workDate), // 用来存该日报日期，带给详情页面，因为我看详情的接口没有date
            formatDate: JSON.stringify(formatDateList[val]), // 用来存该日报日期，带给详情页面，因为我看详情的接口没有date
          },
        });
      } else {
        this.$router.push(path);
      }
    },
    // 页面滚动到底部，触发的事件--加载下一页日报数据
    handleScroll() {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      // windowHeight 可视区的高度
      const windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
      // scrollHeight 滚动条的总高度
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      // 滚动条到底部的条件
      if (Math.ceil(scrollTop) + windowHeight === scrollHeight) {
        // 加载数据
        if (this.isTrue) {
          this.isTrue = false;
          count += 1;
          setTimeout(() => {
            this.getListData(startTimeCheck, endTimeCheck);
          }, 500);
        }
      }
    },
  },
  // 清除监听的滚动事件
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll, true);
  },
  created() {
  },
  mounted() {
    this.$nextTick(() => {
      this.resetParams('', '');
      window.addEventListener('scroll', this.handleScroll, true);
      if (this.$store.state.module3.changedaily === 1) {
        this.$toast('日报修改成功');
        this.$store.state.module3.changedaily = 0;
      }
    });
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

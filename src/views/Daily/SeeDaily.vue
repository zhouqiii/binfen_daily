<template>
  <div class="box" style="height: 100%;">
    <nav-bar-top title="日报" type="MyInfo">
      <template v-slot:right>
        <div class="img">
          <!-- <svg-icon iconClass="deletelist" @click="showDelete = !showDelete"></svg-icon> -->
          <img
            src="../../assets/icons/mine/icon_delete.png"
            alt=""
            @click="showDelete = !showDelete"
          />
        </div>
        <div class="img">
          <!-- <svg-icon iconClass="timelou" @click="show = true"></svg-icon> -->
          <img src="../../assets/icons/mine/icon_screen.png" alt="" @click="show = true" />
        </div>
      </template>
    </nav-bar-top>
    <div class="home">
      <no-content showNocontent="0" v-if="commiList.length == 0"></no-content>
      <van-pull-refresh v-model="isDownLoading" @refresh="onDownRefresh" v-else>
        <van-list
          v-model="isUpLoading"
          :finished="upFinished"
          :immediate-check="false"
          :offset="10"
          finished-text="- 我也是有底线的 -"
          @load="onLoadList"
        >
          <div class="home_padd" v-show="!ifNoContent">
            <van-checkbox-group
              v-model="result"
              icon-size="18"
              ref="checkboxGroup"
              @change="getCheckIndex"
              class="checkBoxGroup"
            >
              <div v-for="(item, index) in commiList" :key="index" class="box_frame-row">
                <div class="daily_seebox">
                  <div class="daily_seedate">{{ item.workDate }} {{ item.time }}</div>
                  <div class="flex-row">
                    <div v-show="showDelete" class="checkBoxSel">
                      <van-checkbox :name="item.id"></van-checkbox>
                    </div>
                    <div class="daily_seecontent" @click="routeItem('/DailyDetail', index)">
                      <div class="box_frame-row">
                        <span class="daily_seecontent_week">填报日期：{{ item.workDate }}</span>
                        <div class="daily_seecontent_state  commit" v-if="item.status === '0'">
                          已提交
                        </div>
                        <div class="daily_seecontent_state  cancel" v-else>
                          已作废
                        </div>
                      </div>
                      <div class="text textEllipsis">任务：{{ item.taskName }}</div>
                      <div class="textEllipsis">今日工作：{{ item.workerInfo }}</div>
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
                      v-model="currentDateEnd"
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
            <div class="timeSelect_btn flex_evenly">
              <div class="timeSelect_btn_cancel" @click="resetCheck">重置</div>
              <div class="timeSelect_btn_confirm" @click="getSelectComm('select')">确定</div>
            </div>
          </div>
        </van-popup>
      </div>
      <!--固定的编辑图标-->
      <div class="home_edit box_frame">
        <img src="../../assets/imgs/page/go_page@2x.png" @click="routeItem('/WriteDaily')" />
      </div>
    </div>
    <!--删除全选-->
    <div v-show="showDelete">
      <div class="blank"></div>
      <div class="home_del">
        <div class="box_frame-row">
          <div class="delcheck" @click="checkAllBtn">
            <van-checkbox icon-size="18" v-model="checkedAll">
              <span class="check_all_text">全选</span>
            </van-checkbox>
          </div>
          <div class="del" @click="delDaily">删除</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getWorkDailyList, deleteWorkDaily } from '@/api/user';
import SvgIcon from '../../components/SvgIcon.vue';

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
      pageNum: 1,
      pageSize: 10,
      isDownLoading: false, // 下拉刷新
      isUpLoading: false, // 上拉加载
      upFinished: false, // 上拉加载完毕
    };
  },
  methods: {
    getListData() {
      const obj = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        startDate: this.startDate,
        endDate: this.endDate,
      };
      getWorkDailyList(obj)
        .then((res) => {
          this.isDownLoading = false;
          this.isUpLoading = false;
          const list = res.data.records;
          if (list === null || list.length === 0) {
            // 加载结束
            this.upFinished = true;
            // return;
          }
          if (list.length < this.pageSize) {
            // 最后一页不足10条的情况
            this.upFinished = true;
          }
          list.forEach((item) => {
            if (item.workDate) {
              formatDateList.push(item.workDate);
              this.$set(item, 'workDate', this.formatDateShow(item.workDate));
            }
          });
          // 处理数据
          if (this.pageNum === 1 || this.isSelect) {
            this.commiList = list;
          } else {
            this.commiList = this.commiList.concat(list);
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
          console.log('getListData err', err);
        });
    },
    // 下拉刷新事件
    onDownRefresh() {
      this.pageNum = 1;
      this.isUpLoading = true;
      this.upFinished = false; // 不写这句会导致你上拉到底过后在下拉刷新将不能触发下拉加载事件
      this.showDelete = false;
      this.result = [];
      this.getSelectComm('select');
    },
    // 上拉加载请求方法
    onLoadList() {
      this.pageNum += 1;
      this.getSelectComm();
    },
    // 通过时间筛选列表
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
      this.checkedAll = false; // 当通过时间筛选更新列表时，将所有对应的删除框置为默认不选中状态
      this.result = [];
      this.showDelete = false;
      const obj = {
        pageSize: this.pageSize,
        endDate: this.endDate,
        startDate: this.startDate,
        pageNum: this.pageNum,
      };
      this.getListData(obj);
    },
    getSelectQuery() {
      const obj = {
        endDate: '',
        pageNum: 1,
        pageSize: this.pageSize,
        startDate: '',
      };
      return obj;
    },
    // 删除选中日报
    delDaily() {
      if (this.result.length <= 0) {
        this.$toast('请先勾选需要删除的休假申请');
        return;
      }
      deleteWorkDaily({ ids: this.result })
        .then((res) => {
          if (res.success) {
            this.$toast('删除成功');
            this.showDelete = false;
            this.result = [];
            this.getSelectComm('select');
          } else {
            this.$toast('删除失败，请重试！');
          }
        })
        .catch(() => {});
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
      this.checkedAll = this.result.length === this.commiList.length;
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
    // 重置按钮
    resetCheck() {
      this.startDate = '';
      this.endDate = '';
      this.currentDate = new Date();
    },
    // 格式化日期
    formatDateSend(val) {
      // 将中国标准时间格式化时间为2019-05-04的格式
      const month = parseInt(val.getMonth() + 1, 10) < 10 ? `0${val.getMonth() + 1}` : val.getMonth() + 1;
      const day = parseInt(val.getDate(), 10) < 10 ? `0${val.getDate()}` : val.getDate();
      const year = new Date().getFullYear();
      return `${year}-${month}-${day}`;
    },
    // 格式化日期
    formatDateShow(val) {
      // 将时间2019-05-04格式化为2019年5月4日的格式
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
    // 去写页面
    routeItem(path, val) {
      if (val >= 0) {
        this.$router.push({
          path,
          query: {
            change: JSON.stringify(this.commiList[val].status), // 状态是已提交还是已作废，作废不可修改
            id: JSON.stringify(this.commiList[val].id), // 携带id给日报详情页面，详情页面根据id查接口数据
            date: JSON.stringify(this.commiList[val].workDate), // 用来存该日报日期，带给详情页面，因为我看详情的接口没有date
            formatDate: JSON.stringify(formatDateList[val]), // 用来存该日报日期，带给详情页面，因为我看详情的接口没有date
          },
        });
      } else {
        this.$router.push(path);
      }
    },
  },
  // 清除监听的滚动事件
  beforeDestroy() {
    // window.removeEventListener('scroll', this.handleScroll, true);
  },
  created() {},
  mounted() {
    this.onDownRefresh();
    this.$nextTick(() => {
      // this.resetParams('', '');
      // window.addEventListener('scroll', this.handleScroll, true);
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
<style scoped lang="less">
@import url('../../assets/css/style/seeDaily.less');
</style>

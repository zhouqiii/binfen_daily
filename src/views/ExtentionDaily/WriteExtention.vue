<template>
  <div class="box">
    <nav-bar-top title="写延时申请"></nav-bar-top>
    <div class="home">
      <div class="home_editBox">
        <div class="home_editBox_time box_frame-row">
          <div class="write_date">申请日期</div>
          <div class="edit_date_delay">
            <!-- <div class="edit_date_week">{{weekdayshow}}</div> -->
            <van-field
              class="getTime"
              v-model="startDate"
              is-link
              readonly
              label=""
              @click="startTimePop = true"
            />
            <van-popup v-model="startTimePop" position="bottom">
              <van-datetime-picker
                v-model="currentDate"
                type="date"
                title=" "
                :max-date="maxDate"
                @confirm="onConfirmEndTime"
                @cancel="startTimePop = false"
              />
            </van-popup>
          </div>
        </div>
        <div class="home_editBox_time box_frame-row approver" v-if="!isManager">
          <div class="write_date">审批人</div>
          <div class="edit_date_delay">
            <!-- <div class="edit_date_week">{{weekdayshow}}</div> -->
            <van-field
              class="getTime"
              v-model="approver"
              is-link
              readonly
              label=""
              placeholder="请选择"
              @click="approverPop = true"
            />
            <van-popup v-model="approverPop" position="bottom">
              <van-picker
                show-toolbar
                :columns="approverOption"
                @cancel="approverPop = false"
                @confirm="onConfirmApprover"
              />
            </van-popup>
          </div>
        </div>
        <work-info
          ref="child"
          v-for="item in editList"
          :testData="item.id"
          :key="item.id"
          :daily="daily"
          :commiList="commiList"
          :taskList="taskList"
          v-on:checkInput="checkInput"
        >
        </work-info>
      </div>
    </div>
    <div class="submit_btn">
      <div class="sendBtn" @click="submitData" :disabled="disabledCommit" :style="thisStyle">
        提交申请
      </div>
    </div>
  </div>
</template>
<script>
import { getManagerList, addWorkLate } from '@/api/user';
import { commissionListByUser } from '@/api/commission';
import WorkInfo from '../../components/MyComponents/WorkInfo.vue';

let count = 0;
// const weekDay = `星期${'日一二三四五六'.charAt(new Date().getDay())}`;
export default {
  components: { WorkInfo },
  name: 'WriteExtention',
  data() {
    return {
      editList: [{ id: 0 }],
      startDate: '',
      Loop: '',
      startTimePop: false,
      maxDate: new Date(),
      currentDate: new Date(),
      commiList: [], // 任务列表
      taskList: [], // 任务id
      daily: false, // 显示工时还是时间
      disabledCommit: true, // 默认不可提交
      thisStyle: '',
      isManager: false,
      approver: '', // 审批人
      approverId: null, // 审批人id
      approverPop: false, // 审批人pop
      approverOption: [], // 审批人option
    };
  },
  methods: {
    // 获取该user任务
    defaultProject() {
      commissionListByUser()
        .then((res) => {
          if (res.code === 200) {
            this.commiList = [];
            this.taskList = [];
            res.data.forEach((item) => {
              this.commiList.push(item.taskName);
              this.taskList.push(item.taskId);
            });
          }
        })
        .catch(() => {});
    },
    // 设置最小时间为当月第一天
    getCurrentMonth() {
      const data = new Date();
      const day = data.getDate();
      data.setDate(day + 5);
      this.maxDate = data;
    },
    // 格式化月日弹框：5月11日
    formatterMD(type, val) {
      if (type === 'month') {
        return `${val}月`;
      }
      if (type === 'day') {
        return `${val}日`;
      }
      return val;
    },
    formatDate(val) {
      // 格式化身份张有效期时间为2021-2-2的格式
      let month = val.getMonth() + 1;
      let day = val.getDate();
      if (parseInt(month, 10) < 10) {
        month = `0${month}`;
      }
      if (parseInt(day, 10) < 10) {
        day = `0${day}`;
      }
      return `${val.getFullYear()}-${month}-${day}`;
    },
    getIsManager() {
      const { roleId } = this.storage.get('userInfo');
      if (roleId !== '1') {
        this.isManager = true;
      } else {
        this.getManagerList();
      }
    },
    getManagerList() {
      getManagerList()
        .then((res) => {
          if (res.code === 200) {
            res.data.forEach((item) => {
              this.approverOption.push({
                text: item.realName,
                id: item.id,
              });
            });
          }
        })
        .catch((err) => {
          console.log('getManagerList err', err);
        });
    },
    // 结束时间确定按钮
    onConfirmEndTime(val) {
      this.startTimePop = false;
      this.startDate = `${this.formatDate(val)}`;
      this.weekdayshow = `星期${'日一二三四五六'.charAt(val.getDay())}`;
    },
    // 审批人pop确定按钮
    onConfirmApprover(val) {
      if (val) {
        this.approver = val.text;
        this.approverId = val.id;
      } else {
        this.$toast('请联系项目经理添加审批人');
      }
      this.approverPop = false;
    },
    // 添加填写box
    addeditbox() {
      count += 1;
      this.editList.push({ id: count });
      this.$nextTick(() => {
        this.checkInput();
      });
    },
    // 只有所有的工作内容有文字提交才高亮
    checkInput() {
      let flag = true;
      if (!this.approver) {
        flag = false;
      }
      this.$refs.child.forEach((item) => {
        if (!item.workContent || !item.endTime || !item.startTime) {
          flag = false;
        }
      });
      if (flag) {
        // flag=true说明工作内容不为空
        this.disabledCommit = false;
        this.thisStyle = 'background:#2F80ED;opacity:1';
      } else {
        this.disabledCommit = true;
        this.thisStyle = 'background:#2F80ED;opacity:0.6';
      }
    },
    compareTime(startTime, endTime) {
      const start = startTime.split(':')[0];
      const end = endTime.split(':')[0];
      if (start >= end) {
        return true;
      }
      return false;
    },
    // 提交延时申请按钮
    submitData() {
      if (this.taskList.length <= 0) {
        this.$toast('请先联系项目经理分配任务');
        return;
      }
      if (!this.approver && !this.isManager) {
        this.$toast('请选择审批人');
        return;
      }
      const infoList = []; // 用来存放所有申请info
      Array.prototype.forEach.call(this.$refs.child, (item) => {
        console.log('延时 申请 item', item);
        const obj = {};
        obj.taskId = item.taskId; // 任务id
        obj.taskName = item.taskName; // 任务名字
        // obj.projectId = item.projectId;// 项目组id
        // obj.projectName = item.projectTeam;// 项目组名字
        obj.workerInfo = item.workContent; // 工作内容
        obj.workerDate = this.startDate; // 工作日期
        obj.checkManager = this.approverId; // 审批经理
        obj.workerStartTime = item.startTime; // 开始时间
        obj.workerEndTime = item.endTime; // 结束时间
        infoList.push(obj);
      });
      if (this.compareTime(infoList[0].workerStartTime, infoList[0].workerEndTime)) {
        this.$toast('请填写正确的工作时间段');
        return;
      }
      if (!infoList[0].workerInfo) {
        this.$toast('请填写申请工作内容');
        return;
      }
      addWorkLate(infoList[0])
        .then((res) => {
          if (!res.success) {
            this.$dialog.alert({
              message: res.message,
              confirmButtonText: '确定',
            });
          } else {
            this.$router.push({
              path: '/ApplyEnd',
              query: {
                pageend: 1,
              },
            });
          }
        })
        .catch((err) => {
          console.log('addVacation err', err);
        });
    },
  },
  mounted() {
    this.getCurrentMonth();
    this.getIsManager();
    this.defaultProject(); // 获取任务
    this.startDate = this.formatDate(new Date());
  },
  watch: {
    approver() {
      this.checkInput();
    },
  },
};
</script>
<style scoped lang="less">
@import url('../../assets/css/style/writeDaily.less');
</style>

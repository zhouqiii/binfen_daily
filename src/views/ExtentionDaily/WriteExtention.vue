<template>
    <div class="box">
        <nav-bar-top title="写延迟申请"></nav-bar-top>
        <div class="home">
          <div class="home_editBox">
              <div class="home_editBox_time box_frame-row">
                <div>填写日期</div>
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
                        type="month-day"
                        title=" "
                        :formatter="formatterMD"
                        :max-date="maxDate"
                        @confirm='onConfirmEndTime'
                        @cancel="startTimePop = false"
                      />
                    </van-popup>
                </div>
              </div>
              <work-info ref="child" v-for="item in editList"
                :testData="item.id"
                :key="item.id"
                :daily="daily"
                :commiList='commiList'
                :taskList='taskList'
                v-on:checkInput='checkInput'
              >
              </work-info>
          </div>
        </div>
        <div class="submit_btn">
          <div class="sendBtn" @click="submitData"
            :disabled="disabledCommit"
            :style="thisStyle">提交申请</div>
        </div>
    </div>
</template>
<script>
import '../../assets/css/style/writeDaily.less';
import WorkInfo from '../../components/MyComponents/WorkInfo.vue';
import createDom from '../../utils/createDom';
import DialogMessage from '../../components/MyComponents/DialogMessage.vue';

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
    };
  },
  methods: {
    // 获取该user任务
    defaultProject() {
      this.requestAxios({
        url: '/api/businessTask/business-task/getListTaskByUser',
        data: {},
        method: 'post',
      })
        .then((res) => {
          if (res.data.length > 0) {
            this.commiList = [];
            this.taskList = [];
            Array.prototype.forEach.call(res.data, (item) => {
              this.commiList.push(item.taskName);
              this.taskList.push(item.taskId);
            });
          }
        })
        .catch(() => {
        });
    },
    // 格式化月日弹框：5月11日
    formatterMD(type, val) {
      if (type === 'month') {
        return `${val}月`;
      } if (type === 'day') {
        return `${val}日`;
      }
      return val;
    },
    formatDate(val) { // 格式化身份张有效期时间为2019/05/04的格式
      let month = val.getMonth() + 1;
      let day = val.getDate();
      if (month < 10) {
        month = `0${month}`;
      }
      if (day < 10) {
        day = `0${day}`;
      }
      return `${month}月${day}日`;
    },
    // 结束时间确定按钮
    onConfirmEndTime(val) {
      this.startTimePop = false;
      this.startDate = `${this.formatDate(val)}`;
      this.weekdayshow = `星期${'日一二三四五六'.charAt(val.getDay())}`;
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
      this.$refs.child.forEach((item) => {
        if (!item.workContent || !item.endTime || !item.startTime) {
          flag = false;
        }
      });
      if (flag) { // flag=true说明工作内容不为空
        this.disabledCommit = false;
        this.thisStyle = 'background:rgb(102, 102, 102)';
      } else {
        this.disabledCommit = true;
        this.thisStyle = 'background:#d3d3d3';
      }
    },
    // 提交延迟申请按钮
    submitData() {
      const infoList = [];// 用来存放所有申请info
      Array.prototype.forEach.call(this.$refs.child, (item) => {
        const obj = {};
        obj.taskId = parseInt(item.taskId, 10);// 任务id
        obj.taskName = item.commision;// 任务名字
        obj.projectId = item.projectId;// 项目组id
        obj.projectName = item.projectTeam;// 项目组名字
        obj.workerInfo = item.workContent;// 工作内容
        obj.startTime = item.startTime;// 开始时间
        obj.endTime = item.endTime;// 结束时间
        infoList.push(obj);
      });
      this.$router.push({ path: '/ApplyEnd', query: { pageend: 1 } });
    },
    // 提交延迟申请信息
    sendData(data) {
      this.requestAxios({
        url: '/', // 修改提交延迟申请接口
        data: {
          workDate: this.startDate, // 修改字段
          dailyDetailList: data,
        },
        method: 'post',
      })
        .then((res) => {
          if (!res.success) {
            createDom(
              DialogMessage, {}, { content: `<div style="text-align:center">${res.message}</div><div style="text-align:center;margin-top:.5rem">请重新提交！</div> `, knowBtn: true },
            );
          } else {
            this.$router.push({ path: '/ApplyEnd', query: { pageend: 1 } });
          }
        })
        .catch(() => {
        });
    },
  },
  mounted() {
    this.defaultProject();// 获取任务
    this.startDate = this.formatDate(new Date());
  },
};
</script>

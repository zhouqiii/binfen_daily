<template>
  <div class="box">
    <nav-bar-top title="写日报"></nav-bar-top>
    <!-- <div class="blank"></div> -->
    <div class="home">
      <div class="home_editBox">
        <div class="home_editBox_time box_frame-row">
          <div class="write_date">填写日期</div>
          <div class="edit_date">
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
                :max-date="maxDate"
                :formatter="formatterMD"
                @confirm="onConfirmEndTime"
                @cancel="startTimePop = false"
              />
            </van-popup>
          </div>
        </div>
        <work-info
          v-for="(item, index) in editList"
          :key="item.id"
          ref="child"
          :daily="daily"
          :commiList="commiList"
          :taskList="taskList"
          v-on:checkInput="checkInput"
          @touchstart.native="touchinUk(index)"
          @touchend.native="cleartime(index)"
        >
        </work-info>
        <div class="home_editBox_iconAdd" @click="addeditbox">
          <!-- <svg-icon iconClass="tianjia" class="iconBig"></svg-icon> -->
          <img src="../../assets/imgs/page/add_page.png" alt="图片无法显示" />
        </div>
      </div>
    </div>
    <div class="submit_btn">
      <button class="sendBtn" @click="sendData" :disabled="disabledCommit" :style="thisStyle">
        提交日报
      </button>
    </div>
  </div>
</template>
<script>
import WorkInfo from '../../components/MyComponents/WorkInfo.vue';

let count = 0;
// const weekDay = `星期${'日一二三四五六'.charAt(new Date().getDay())}`;
export default {
  components: { WorkInfo },
  name: 'WriteDaily',
  data() {
    return {
      editList: [{ id: 0 }],
      startDate: '',
      Loop: '',
      startTimePop: false,
      maxDate: new Date(),
      currentDate: new Date(),
      sendDate: '', // 接口使用的填写日期格式
      daily: true, // 显示工时还是时间
      thisStyle: '',
      disabledCommit: true, // 默认不可提交
      commiList: [], // 任务列表
      taskList: [], // 任务id
    };
  },
  methods: {
    // 获取该user任务
    defaultProject() {
      this.requestAxios({
        url: '/businessTask/business-task/getListTaskByUser',
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
        .catch(() => {});
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
      // 格式化显示日期
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
    formatDateSend(val) {
      // 格式化时间为2019-05-04的格式
      const month = parseInt(val.getMonth() + 1, 10) < 10 ? `0${val.getMonth() + 1}` : val.getMonth() + 1;
      const day = parseInt(val.getDate(), 10) < 10 ? `0${val.getDate()}` : val.getDate();
      const year = new Date().getFullYear();
      return `${year}-${month}-${day}`;
    },

    // 结束时间确定按钮
    onConfirmEndTime(val) {
      this.startTimePop = false;
      this.startDate = `${this.formatDate(val)}`;
      this.sendDate = `${this.formatDateSend(val)}`;
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
        if (!item.workContent || !item.workHour) {
          flag = false;
        }
      });
      if (flag) {
        // flag=true说明工作内容不为空
        this.disabledCommit = false;
        this.thisStyle = 'background:#2F80ED';
      } else {
        this.disabledCommit = true;
        this.thisStyle = 'background:rgba(47,120,237,.6)';
      }
    },
    // 提交日报按钮
    sendData() {
      if (this.taskList.length <= 0) {
        this.$toast('请先联系项目经理分配任务~');
        return;
      }
      let flag = true;
      const infoList = []; // 用来存放所有日报info
      // let hour = 0;
      Array.prototype.forEach.call(this.$refs.child, (item) => {
        // const time = parseInt(item.workHour.substring(0, 1), 10);
        // hour += time;
        const obj = {};
        obj.taskId = item.taskId;
        obj.taskName = item.commiList[item.radio];
        obj.workerLength = parseInt(item.workHour.substring(0, 1), 10);
        obj.workerInfo = item.workContent;
        if (obj.workerInfo.length < 10) {
          flag = false;
        }
        infoList.push(obj);
      });
      if (!flag) {
        this.$dialog.alert({
          message: '工作内容最少为10个字，请检查！',
          confirmButtonText: '确定',
        });
      } else {
        //  else if (hour < 8) {
        //   this.$dialog.alert({
        //     message: '填写工时不足8小时，请检查工时!',
        //     confirmButtonText: '确定',
        //   });
        // } else if (hour > 8) {
        //   this.$dialog.alert({
        //     message: '填写工时已超 8 小时,请检查工时!',
        //     confirmButtonText: '确定',
        //   });
        // }
        this.requestAxios({
          url: '/workDaily/work-daily/save',
          data: {
            workDate: this.sendDate,
            createPerson: this.storage.get('username'),
            createTime: this.formatTime(new Date()),
            dailyDetailList: infoList,
          },
          method: 'post',
        })
          .then((res) => {
            if (!res.success) {
              this.$dialog.alert({
                message: '保存失败！',
                confirmButtonText: '确定',
              });
            } else {
              this.$router.push({ path: '/ApplyEnd', query: { pageend: 0 } });
            }
          })
          .catch(() => {});
      }
    },
    // 格式化时间hh:mm:ss
    formatTime(val) {
      let hour = val.getHours();
      let minute = val.getMinutes();
      let second = val.getSeconds();
      hour = parseInt(hour, 10) < 10 ? `0${hour}` : hour;
      minute = parseInt(minute, 10) < 10 ? `0${minute}` : minute;
      second = parseInt(second, 10) < 10 ? `0${second}` : second;
      return `${hour}:${minute}:${second}`;
    },
    // 长按删除的作用
    touchinUk(index) {
      clearInterval(this.Loop); // 再次清空定时器，防止重复注册定时器
      this.Loop = setTimeout(() => {
        this.$dialog
          .confirm({
            message: '是否删除?',
            confirmButtonText: '确定',
          })
          .then(() => {
            this.editList.splice(index, 1);
          })
          .catch(() => {});
      }, 1000);
    },
    cleartime() {
      clearInterval(this.Loop); // 这个方法主要是用来将每次手指移出之后将计时器清零
    },
  },
  mounted() {
    this.sendDate = this.formatDateSend(new Date());
    this.startDate = this.formatDate(new Date());
    this.defaultProject(); // 获取任务
  },
  watch: {},
};
</script>
<style scoped lang="less">
@import url('../../assets/css/style/writeDaily.less');
</style>

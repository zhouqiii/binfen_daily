<template>
  <div class="box">
    <nav-bar-top title="修改日报"></nav-bar-top>
    <div class="home">
      <div class="home_editBox">
        <div class="home_editBox_time box_frame-row">
          <div class="write_date">填写日期</div>
          <div class="edit_date">
            <div class="getTime">{{ date }}</div>
          </div>
        </div>
        <change-work-info
          :data="data"
          ref="childTop"
          daily="true"
          v-on:checkInput="checkInput"
        ></change-work-info>
        <work-info
          ref="child"
          v-for="(item, index) in editList"
          :key="item.id"
          daily="true"
          :commiList="commiList"
          :taskList="taskList"
          v-on:checkInput="checkInput"
          @touchstart.native="touchinUk(index)"
          @touchend.native="cleartime(index)"
        ></work-info>
        <div class="home_editBox_iconAdd" @click="addeditbox">
          <img src="../../assets/icons/icon_add.png" alt="图片无法显示" />
        </div>
      </div>
    </div>
    <div class="submit_btn">
      <div class="sendBtnChange" @click="sendData" :disabled="disabledCommit" :style="thisStyle">
        提交日报
      </div>
    </div>
  </div>
</template>
<script>
import ChangeWorkInfo from '../../components/MyComponents/ChangeWorkInfo.vue';
import WorkInfo from '../../components/MyComponents/WorkInfo.vue';

let count = 0;
// const weekDay = `星期${'日一二三四五六'.charAt(new Date().getDay())}`;
export default {
  components: { ChangeWorkInfo, WorkInfo },
  name: 'ChangeDaily',
  data() {
    return {
      date: JSON.parse(this.$route.query.date),
      data: JSON.parse(this.$route.query.data),
      editList: [],
      Loop: '',
      startTimePop: false,
      maxDate: new Date(),
      currentDate: new Date(),
      commiList: [], // 任务列表
      taskList: [], // 任务id
      disabledCommit: false,
      thisStyle: '',
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
      const data = [];
      const childDataTop = this.$refs.childTop.data;
      if (childDataTop) {
        Array.prototype.forEach.call(childDataTop, (item) => {
          data.push(item.workerInfo);
          data.push(item.workerLength);
        });
      }
      const childData = this.$refs.child;
      if (childData) {
        Array.prototype.forEach.call(childData, (item) => {
          data.push(item.workContent);
          data.push(item.workHour);
        });
      }
      if (data) {
        data.forEach((item) => {
          if (!item) {
            flag = false;
          }
        });
      }
      if (flag) {
        // flag=true说明工作内容不为空
        this.disabledCommit = false;
        this.thisStyle = 'background:#2f80ed;opacity:1';
      } else {
        this.disabledCommit = true;
        this.thisStyle = 'background:#2f80ed;opacity:0.6';
      }
    },
    // 长按删除的作用
    touchinUk(index) {
      clearInterval(this.Loop); // 再次清空定时器，防止重复注册定时器
      this.Loop = setTimeout(() => {
        this.$dialog
          .confirm({
            message: '是否删除',
            confirmButtonText: '确定',
          })
          .then(() => {
            this.editList.splice(index, 1);
            this.checkInput();
          })
          .catch(() => {});
      }, 1000);
    },
    cleartime() {
      // 这个方法主要是用来将每次手指移出之后将计时器清零
      clearInterval(this.Loop);
    },
    // 提交日报按钮
    sendData() {
      if (this.disabledCommit) return;
      const infoList = []; // 用来存放所有日报info
      // let hour = 0;
      const childTop = this.$refs.childTop.data; // list
      Array.prototype.forEach.call(childTop, (item) => {
        // const time = parseInt(item.workerLength.substring(0, 1), 10);
        // hour += time;
        const obj = {};
        obj.taskId = parseInt(item.taskId, 10);
        obj.taskName = item.taskName;
        obj.workerLength = parseInt(item.workerLength.substring(0, 1), 10);
        obj.workerInfo = item.workerInfo;
        infoList.push(obj);
      });
      let fullData = true;
      if (this.$refs.child) {
        Array.prototype.forEach.call(this.$refs.child, (item) => {
          if (!item.workHour || !item.workContent) {
            fullData = false;
          }
          // const time = parseInt(item.workHour.substring(0, 1), 10);
          // hour += time;
          const obj = {};
          obj.taskId = item.taskId;
          obj.taskName = item.commision;
          obj.workerLength = parseInt(item.workHour.substring(0, 1), 10);
          obj.workerInfo = item.workContent;
          infoList.push(obj);
        });
      }
      if (!fullData) {
        this.$toast('请填写完整信息');
      } else {
        // if (hour < 8) {
        //   this.$dialog.alert({
        //     message: '填写工时不足8小时，请检查工时!',
        //     confirmButtonText: '确定',
        //   });
        // } else if (hour > 8) {
        //   this.$dialog.alert({
        //     message: '填写工时已超8小时,请检查工时!',
        //     confirmButtonText: '确定',
        //   });
        // }
        this.requestAxios({
          url: '/workDaily/work-daily/upd',
          data: {
            createDate: JSON.parse(this.$route.query.formatDate),
            dailyDetailList: infoList,
            id: JSON.parse(this.$route.query.id),
          },
          method: 'put',
        })
          .then((res) => {
            if (!res.success) {
              this.$dialog.alert({
                message: res.message,
                confirmButtonText: '确定',
              });
            } else {
              this.$store.state.module3.changedaily = 1; // 跳转至看日报之前修改changedaily=1，表明是从修改日报跳过去的
              this.$router.push({
                path: '/SeeDaily',
              });
            }
          })
          .catch(() => {});
      }
    },
  },
  mounted() {
    this.defaultProject(); // 为了添加信息框时查项目组
  },
};
</script>
<style scoped lang="less">
@import url('../../assets/css/style/writeDaily.less');
</style>

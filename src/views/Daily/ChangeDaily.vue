<template>
    <div class="box">
        <nav-bar-top title="修改日报"></nav-bar-top>
        <div class="home">
          <div class="home_editBox">
              <div class="home_editBox_time box_frame-row">
                <div>填写日期</div>
                <div class="edit_date">
                  <!-- <div class="edit_date_week">{{weekdayshow}}</div> -->
                    <div class="getTime">{{date}}</div>
                </div>
              </div>
              <change-work-info  :data="data" ref="childTop" daily="true"
                v-on:checkInput="checkInput"
              ></change-work-info>
              <work-info ref="child" v-for="(item,index) in editList"
                :key="item.id" daily="true"
                :commiList='commiList'
                :taskList='taskList'
                v-on:checkInput="checkInput"
                @touchstart.native="touchinUk(index)"
                @touchend.native="cleartime(index)"
              ></work-info>
              <div class="home_editBox_iconAdd" @click="addeditbox">
                <svg-icon iconClass="tianjia" class="iconBig"></svg-icon>
              </div>
          </div>
        </div>
        <div class="submit_btn">
          <div class="sendBtn" @click="sendData"
            :disabled="disabledCommit"
            :style="thisStyle">提交日报</div>
        </div>
    </div>
</template>
<script>
import '../../assets/css/style/writeDaily.less';
import createDom from '@/utils/createDom';
import SvgIcon from '../../components/SvgIcon.vue';
import ChangeWorkInfo from '../../components/MyComponents/ChangeWorkInfo.vue';
import WorkInfo from '../../components/MyComponents/WorkInfo.vue';
// import { callAppMethod } from '@/utils/commonApp';
import DialogMessage from '../../components/MyComponents/DialogMessage.vue';

let count = 0;
// const weekDay = `星期${'日一二三四五六'.charAt(new Date().getDay())}`;
export default {
  components: { SvgIcon, ChangeWorkInfo, WorkInfo },
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
      disabledCommit: true,
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
      const childData = this.$refs.child;
      const childTopData = this.$refs.childTop;
      if (childTopData) {
        childTopData.forEach((item) => {
          data.push(item.workContent);
          data.push(item.workHour);
        });
      }
      if (childData) {
        childData.forEach((item) => {
          data.push(item.workContent);
          data.push(item.workHour);
        });
      }
      data.forEach((item) => {
        if (!item) {
          flag = false;
        }
      });
      if (flag) { // flag=true说明工作内容不为空
        this.disabledCommit = false;
        this.thisStyle = 'background:rgb(102, 102, 102)';
      } else {
        console.log(2);
        this.disabledCommit = true;
        this.thisStyle = 'background:#d3d3d3';
      }
    },
    // 长按删除的作用
    touchinUk(index) {
      clearInterval(this.Loop); // 再次清空定时器，防止重复注册定时器
      this.Loop = setTimeout(() => {
        this.$dialog.confirm({
          message: '是否删除',
        }).then(() => {
          this.editList.splice(index, 1);
        }).catch(() => {
        });
      }, 1000);
    },
    cleartime() {
      // 这个方法主要是用来将每次手指移出之后将计时器清零
      clearInterval(this.Loop);
    },
    // 提交日报按钮
    sendData() {
      const infoList = [];// 用来存放所有日报info
      let hour = 0;
      const childTop = this.$refs.childTop.data;// list
      Array.prototype.forEach.call(childTop, (item) => {
        const time = parseInt(item.workerLength.substring(0, 1), 10);
        hour += time;
        const obj = {};
        obj.taskId = parseInt(item.taskId, 10);
        obj.taskName = item.taskName;
        obj.workerLength = time;
        obj.workerInfo = item.workerInfo;
        infoList.push(obj);
      });
      if (this.$refs.child) {
        Array.prototype.forEach.call(this.$refs.child, (item) => {
          const time = parseInt(item.workHour.substring(0, 1), 10);
          hour += time;
          const obj = {};
          obj.taskId = item.taskId;
          obj.taskName = item.commision;
          obj.workerLength = time;
          obj.workerInfo = item.workContent;
          infoList.push(obj);
        });
      }
      if (hour < 8) {
        createDom(
          DialogMessage,
          {},
          {
            content: `<div style="text-align:center">填写工时不足8小时，请检查工时</div>
                    `,
            knowBtn: true,
          },
        );
      } else if (hour > 8) {
        createDom(
          DialogMessage,
          {},
          {
            content: `<div style="text-align:center">填写工时已超 8 小时,请检查工时</div>
                    `,
            knowBtn: true,
          },
        );
      } else {
        this.requestAxios({
          url: '/workDaily/upd',
          data: {
            createDate: this.date,
            dailyDetailList: infoList,
            id: JSON.parse(this.$route.query.id),
          },
          method: 'put',
        })
          .then((res) => {
            if (!res.success) {
              createDom(
                DialogMessage,
                {},
                {
                  content: `<div style="text-align:center">${res.message}</div>
                          <div style="text-align:center;margin-top:.5rem">请重新提交！</div>
                          `,
                  knowBtn: true, // 知道了
                },
              );
            } else {
              this.$store.state.module3.changedaily = 1;// 跳转至看日报之前修改changedaily=1，表明是从修改日报跳过去的
              this.$router.push({
                path: '/SeeDaily',
              });
            }
          })
          .catch(() => {
          });
      }
    },
  },
  mounted() {
    this.defaultProject();// 为了添加信息框时查项目组
  },
};
</script>

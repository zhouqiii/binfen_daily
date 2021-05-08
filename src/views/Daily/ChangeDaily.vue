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
              <change-work-info  :data="data" ref="childTop" daily="true"></change-work-info>
              <work-info ref="child" v-for="(item,index) in editList"
                :key="item.id" daily="true"
                :teamSelects='teamSelects'
                :teamList='teamList'
                @touchstart.native="touchinUk(index)"
                @touchend.native="cleartime(index)"
              ></work-info>
              <div class="home_editBox_iconAdd" @click="addeditbox">
                <svg-icon iconClass="tianjia" class="iconBig"></svg-icon>
              </div>
          </div>
        </div>
        <div class="submit_btn">
          <div class="sendBtn" @click="sendData">提交日报</div>
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
      teamSelects: [], // 所有项目列表
      teamList: [], // 所有项目按顺序对应项目id
    };
  },
  methods: {
    getProject() {
      this.requestAxios({
        url: '/api/businessProduct/listAll',
        method: 'post',
      })
        .then((res) => {
          if (res.data) {
            Array.prototype.forEach.call(res.data, (item) => {
              this.teamSelects.push(item.productName);
              this.teamList.push(item.productId);
            });
          }
        })
        .catch(() => {
        });
    },
    // 添加填写box
    addeditbox() {
      if (this.teamSelects.length === 0) {
        count += 1;
        this.editList.push({ id: count });
        this.getProject();
      } else {
        count += 1;
        this.editList.push({ id: count });
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
        obj.projectId = item.projectId;
        obj.projectName = item.projectName;
        obj.workerLength = time;
        obj.workerInfo = item.workerInfo;
        infoList.push(obj);
      });
      if (this.$refs.child) {
        Array.prototype.forEach.call(this.$refs.child, (item) => {
          const time = parseInt(item.workHour.substring(0, 1), 10);
          hour += time;
          const obj = {};
          obj.taskId = parseInt(item.taskId, 10);
          obj.taskName = item.commision;
          obj.projectId = item.projectId;
          obj.projectName = item.projectTeam;
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
            showBtn: false,
          },
        );
      } else if (hour > 8) {
        createDom(
          DialogMessage,
          {},
          {
            content: `<div style="text-align:center">填写工时已超 8 小时,请检查工时</div>
                    `,
            showBtn: false,
          },
        );
      } else {
        this.requestAxios({
          url: '/api/workDaily/upd',
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
                  showBtn: false, // 知道了
                },
              );
            } else {
              this.$router.push({
                path: '/ApplyEnd',
                query: {
                  pageend: 0,
                },
              });
            }
          })
          .catch(() => {
          });
      }
    },
  },
  mounted() {
    this.getProject();// 为了添加信息框时查项目组
  },
};
</script>

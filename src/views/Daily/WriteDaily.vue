<template>
    <div class="box">
        <nav-bar-top title="写日报"></nav-bar-top>
        <div class="home">
          <div class="home_editBox">
              <div class="home_editBox_time box_frame-row">
                <div>填写日期</div>
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
                        @confirm='onConfirmEndTime'
                        @cancel='startTimePop = false'
                      />
                    </van-popup>
                </div>
              </div>
              <work-info v-for="(item,index) in editList"
               :testData="item.id"
                :key="item.id"
                ref="child"
                :daily="daily"
                :teamSelects='teamSelects'
                :teamList='teamList'
                @touchstart.native="touchinUk(index)"
                @touchend.native="cleartime(index)"
              >
              </work-info>

              <!-- <div v-for="(item,index) in editList"
              :key="index">1{{item.id}}</div> -->
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
import WorkInfo from '../../components/MyComponents/WorkInfo.vue';
import DialogMessage from '../../components/MyComponents/DialogMessage.vue';

const date = `${new Date().getMonth() + 1}月${new Date().getDate()}日`;
let count = 0;
// const weekDay = `星期${'日一二三四五六'.charAt(new Date().getDay())}`;
export default {
  components: { SvgIcon, WorkInfo },
  name: 'WriteDaily',
  data() {
    return {
      editList: [{ id: 0 }],
      startDate: date,
      Loop: '',
      startTimePop: false,
      maxDate: new Date(),
      currentDate: new Date(),
      teamSelects: [], // 所有项目
      teamList: [], // 项目productId
      sendDate: '', // 接口使用的填写日期格式
      daily: true, // 显示工时还是时间

    };
  },
  methods: {
    getProject() {
      this.requestAxios({
        url: '/api/businessProduct/listAll',
        method: 'post',
      })
        .then((res) => {
          if (res.success) {
            if (res.data) {
              Array.prototype.forEach.call(res.data, (item) => {
                this.teamSelects.push(item.productName);
                this.teamList.push(item.productId);
              });
            }
          } else {
            createDom(
              DialogMessage,
              {},
              {
                content: `<div style="text-align:center">${res.message}</div>
                          <div style="text-align:center">请重新登陆！</div>
                        `,
                showBtn: true,
              },
            );
          }
        })
        .catch(() => {
        });
    },
    formatDate(val) { // 格式化显示日期
      return `${val.getMonth() + 1}月${val.getDate()}日`;
    },
    formatDateSend(val) { // 格式化时间为2019-05-04的格式
      const month = (parseInt(val.getMonth() + 1, 10)) < 10 ? `0${val.getMonth() + 1}` : (val.getMonth() + 1);
      const day = (parseInt(val.getDate(), 10)) < 10 ? `0${val.getDate()}` : (val.getDate());
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
    },

    // 提交日报按钮
    sendData() {
      const infoList = [];// 用来存放所有日报info
      let hour = 0;
      Array.prototype.forEach.call(this.$refs.child, (item) => {
        const time = parseInt(item.workHour.substring(0, 1), 10);
        hour += time;
        const obj = {};
        obj.taskId = parseInt(item.taskId, 10);
        obj.taskName = item.commision;
        obj.projectId = item.projectId;
        obj.projectName = item.projectTeam;
        obj.workerLength = parseInt(item.workHour.substring(0, 1), 10);
        obj.workerInfo = item.workContent;
        infoList.push(obj);
      });
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
          url: '/api/workDaily/save',
          data: {
            workDate: this.sendDate,
            dailyDetailList: infoList,
          },
          method: 'post',
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
    // 长按删除的作用
    touchinUk(index) {
      clearInterval(this.Loop); // 再次清空定时器，防止重复注册定时器
      this.Loop = setTimeout(() => {
        this.$dialog.confirm({
          message: '是否删除?',
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
  },
  mounted() {
    this.getProject();
    this.sendDate = this.formatDateSend(new Date());
  },
  watch: {
  },
};
</script>

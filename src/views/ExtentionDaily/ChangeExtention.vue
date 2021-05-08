<template>
    <div class="box">
        <nav-bar-top title="修改延迟申请"></nav-bar-top>
        <div class="home">
          <div class="home_editBox">
              <div class="home_editBox_time box_frame-row">
                <div>填写日期</div>
                <div class="edit_date">
                  <!-- <div class="edit_date_week">{{weekdayshow}}</div> -->
                    <div class="getTime">{{date}}</div>
                </div>
              </div>
              <change-work-info  :data="data" ref="childTop" :daily="daily"></change-work-info>
              <work-info ref="child" v-for="(item,index) in editList"
                :key="index"
                daily="false"
              >
              </work-info>
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

const dateToday = `${new Date().getMonth() + 1}月${new Date().getDate() + 1}日`;
// const weekDay = `星期${'日一二三四五六'.charAt(new Date().getDay())}`;
export default {
  components: { SvgIcon, ChangeWorkInfo, WorkInfo },
  name: 'ChangeExtention',
  data() {
    return {
      date: JSON.parse(this.$route.query.date),
      data: JSON.parse(this.$route.query.data),
      editList: [],
      startDate: dateToday,
      Loop: '',
      startTimePop: false,
      maxDate: new Date(),
      currentDate: new Date(),
      daily: false,
    };
  },
  methods: {
    formatDate(val) { // 格式化身份张有效期时间为2019/05/04的格式
      return `${val.getMonth() + 1}月${val.getDate()}日`;
    },
    // 结束时间确定按钮
    onConfirmEndTime(val) {
      this.startTimePop = false;
      this.startDate = `${this.formatDate(val)}`;
      this.weekdayshow = `星期${'日一二三四五六'.charAt(val.getDay())}`;
    },
    // 添加填写box
    addeditbox() {
      const obj = {};
      this.editList.push(obj);
    },
    // 提交日报按钮
    sendData() {
      let hour = 0;
      Array.prototype.forEach.call(this.$refs.child, (item) => {
        const time = parseInt(item.workHour.substring(0, 1), 10);
        hour += time;
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
      }
    },
    touchinUk(index) {
      clearInterval(this.Loop); // 再次清空定时器，防止重复注册定时器
      this.Loop = setTimeout(() => {
        this.$dialog.confirm({
          message: '是否删除?',
        }).then(() => {
          this.$refs.child.splice(index, 1);
        }).catch(() => {
        });
      }, 1000);
    },
    cleartime() {
      // 这个方法主要是用来将每次手指移出之后将计时器清零
      clearInterval(this.Loop);
    },
  },
};
</script>

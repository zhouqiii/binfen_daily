<template>
    <div class="box">
        <nav-bar-top title="写延迟申请"></nav-bar-top>
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
                        @cancel="startTimePop = false"
                      />
                    </van-popup>
                </div>
              </div>
              <work-info ref="child" v-for="(item,index) in editList"
                :testData="item.id"
                :key="item.id"
                :daily="daily"
                :teamSelects='teamSelects'
                :teamList='teamList'
                @touchstart.native="touchinUk(index)"
                @touchend.native="cleartime(index)"
              >
              </work-info>
              <div class="home_editBox_iconAdd" @click="addeditbox">
                <svg-icon iconClass="tianjia" class="iconBig"></svg-icon>
              </div>
          </div>
        </div>
        <div class="submit_btn">
          <div class="sendBtn" @click="submitData">提交申请</div>
        </div>
    </div>
</template>
<script>
import '../../assets/css/style/writeDaily.less';
import SvgIcon from '../../components/SvgIcon.vue';
import WorkInfo from '../../components/MyComponents/WorkInfo.vue';
import createDom from '../../utils/createDom';
import DialogMessage from '../../components/MyComponents/DialogMessage.vue';

let count = 0;
const date = `${new Date().getMonth() + 1}月${new Date().getDate() + 1}日`;
// const weekDay = `星期${'日一二三四五六'.charAt(new Date().getDay())}`;
export default {
  components: { SvgIcon, WorkInfo },
  name: 'WriteExtention',
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
      daily: false, // 显示工时还是时间
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
      count += 1;
      this.editList.push({ id: count });
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
      // this.sendData(infoList);
      this.$router.push({
        path: '/ApplyEnd',
        query: {
          pageend: 1,
        },
      });
    },
    // 提交延迟申请信息
    sendData(data) {
      this.requestAxios({
        url: '/api/', // 修改提交延迟申请接口
        data: {
          workDate: this.startDate, // 修改字段
          dailyDetailList: data,
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
                pageend: 1,
              },
            });
          }
        })
        .catch(() => {
        });
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
  },
};
</script>

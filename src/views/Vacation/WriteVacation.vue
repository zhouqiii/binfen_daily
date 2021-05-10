<template>
    <div class="box">
        <nav-bar-top title="休假申请"></nav-bar-top>
        <div class="home">
          <div class="home_editBox">
              <div class="home_editBox_time box_frame-row">
                <div class="edit_date">
                    <van-field
                        class="getTime"
                        v-model="vacationType"
                        is-link
                        readonly
                        label="休假类型:"
                        placeholder="请选择"
                        @click="pickVacationType = true"
                    />
                    <van-popup v-model="pickVacationType" round position="bottom">
                        <van-picker
                            show-toolbar
                            :columns="vacationSelects"
                            @cancel="pickVacationType = false"
                            @confirm="onConfirmVacation"
                        />
                    </van-popup>
                </div>
              </div>
              <div class="ruleForm">
                <div class="formItem">
                    <van-field
                        v-model="startDate"
                        is-link
                        readonly
                        label="休假开始日期"
                        placeholder="请选择"
                        @click="startDatePop = true"
                    />
                    <van-popup v-model="startDatePop" position="bottom">
                        <van-datetime-picker
                            v-model="currentDate"
                            type="date"
                            :min-date="maxDate"
                            title=" "
                            @cancel="startDatePop = false"
                            @confirm='onConfirmStartDate'
                        />
                    </van-popup>
                </div>
                <div class="formItem">
                    <van-field
                        v-model="endDate"
                        is-link
                        readonly
                        label="休假结束日期"
                        placeholder="请选择"
                        @click="endDatePop = true"
                    />
                    <van-popup v-model="endDatePop" position="bottom">
                        <van-datetime-picker
                            v-model="currentDate"
                            type="date"
                            :min-date="maxDate"
                            title=" "
                            @cancel="endDatePop = false"
                            @confirm='onConfirmEndDate'
                        />
                    </van-popup>
                </div>
              </div>
              <div class="ruleForm" v-show="ifOneDay">
                <div class="formItem">
                    <van-field
                        v-model="startTime"
                        is-link
                        readonly
                        label="休假起始时间"
                        placeholder="请选择"
                        @click="startTimePop= true"
                    />
                    <van-popup v-model="startTimePop" position="bottom">
                        <van-datetime-picker
                            type="time"
                            title=" "
                            @cancel='startTimePop = false'
                            @confirm='onConfirmStartTime'
                        />
                    </van-popup>
                </div>
              <div class="formItem">
                <van-field
                    v-model="endTime"
                    is-link
                    readonly
                    label="休假结束时间"
                    placeholder="请选择"
                    @click="endTimePop  = true"
                />
                <van-popup v-model="endTimePop" position="bottom">
                    <van-datetime-picker
                        type="time"
                        title=" "
                        @cancel='endTimePop = false'
                        @confirm='onConfirmEndTime'
                    />
                </van-popup>
              </div>
            </div>
            <div class="ruleForm textarea_box">
                <div class="textarea_title">休假原因：</div>
                <van-field
                    v-model="reason"
                    class="textarea_reason"
                    rows="2"
                    label=""
                    type="textarea"
                    placeholder="请输入原因"
                />
            </div>
            <div class="ruleForm">
                <div class="formItem">
                    <van-field
                        class="text_handover"
                        v-model="handOver"
                        label="工作交接："
                        placeholder="请输入"
                    />
                </div>
            </div>
            <div class="ruleForm" v-show="ifUpload">
                <div class="formItem">
                    <div class="textarea_title box_frame-row">
                        <div>图片上传</div>
                        <!-- <div>
                             <svg-icon iconClass="tupian"  @click="imagePop  = true"></svg-icon>
                        </div> -->
                    </div>
                </div>
                <div class="imageItem">
                    <van-uploader v-model="fileList" multiple />
                </div>
            </div>
          </div>
        </div>
        <div class="submit_btn">
          <div class="sendBtn" @click="submitData">提交申请</div>
        </div>
    </div>
</template>
<script>
import '../../assets/css/style/writeVacation.less';
import createDom from '../../utils/createDom';
import DialogMessage from '../../components/MyComponents/DialogMessage.vue';

export default {
  name: 'WriteExtention',
  data() {
    return {
      editList: [{ id: 0 }],
      pickVacationType: false, // 休假类型pop
      vacationType: '', // 休假类型
      Loop: '',
      startDate: '', // 休假开始日期
      startDatePop: false, // 开始日期pop
      endDate: '', // 休假结束日期
      endDatePop: false, // 结束日期pop
      startTime: '', // 休假起始时间
      endTime: '', // 休假截止时间
      endTimePop: false, // 休假截止时间pop
      startTimePop: false, // 休假起始时间pop
      ifOneDay: false, // 选择请假的日期是否只为一天
      reason: '', // 休假原因
      handOver: '', // 工作交接
      ifUpload: false, // 是否显示上传图片
      imagePop: false, // 上传图片Pop
      iphonetype: '', // 判断是哪种机型
      maxDate: new Date(),
      currentDate: new Date(),
      daily: false, // 显示工时还是时间
      vacationSelects: ['年假', '事假', '婚假', '产假', '陪产假', '病假', '丧假', '流产假'],
      fileList: [],
    };
  },
  methods: {
    // 休假类型确定按钮
    onConfirmVacation(val, index) {
      this.vacationType = val;
      this.pickVacationType = false;
      if (index > 1) {
        this.ifUpload = true;
      }
    },
    // 休假开始日期确定按钮
    onConfirmStartDate(val) {
      this.startDatePop = false;
      this.startDate = `${this.formatDate(val)}`;
      if (this.startDate === this.endDate) {
        this.ifOneDay = true;
      } else {
        this.ifOneDay = false;
      }
    },
    // 休假结束日期确定按钮
    onConfirmEndDate(val) {
      this.endDatePop = false;
      this.endDate = `${this.formatDate(val)}`;
      if (this.startDate === this.endDate) {
        this.ifOneDay = true;
      } else {
        this.ifOneDay = false;
      }
    },
    // 休假起始时间确定按钮
    onConfirmStartTime(val) {
      this.startTimePop = false;
      this.startTime = val;
    },
    // 休假截止时间确定按钮
    onConfirmEndTime(val) {
      this.endTimePop = false;
      this.endTime = val;
    },
    formatDate(val) { // 格式化身份张有效期时间为2021-2-2的格式
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
    // 提交请假按钮
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
        path: '/VacationEnd',
      });
    },
    // 提交延迟申请信息
    sendData(data) {
      this.requestAxios({
        url: '', // 修改提交延迟申请接口
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
                knowBtn: true, // 知道了
              },
            );
          } else {
            this.$router.push({
              path: '/ApplyEnd',
              query: {
                pageend: 2,
              },
            });
          }
        })
        .catch(() => {
        });
    },
  },
  mounted() {
  },
};
</script>

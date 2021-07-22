<template>
  <div class="box">
    <nav-bar-top title="休假申请"></nav-bar-top>
    <div class="home">
      <div class="home_editBox">
        <div class="home_time_vacation box_frame-row">
          <div class="edit_date_vacation">
            <van-field
              class="getTime"
              v-model="vacationType"
              is-link
              readonly
              label="休假类型"
              placeholder="请选择"
              @click="pickVacationType = true"
            />
            <van-popup v-model="pickVacationType" round position="bottom">
              <van-picker
                show-toolbar
                allow-html
                :columns="vacationSelects"
                @cancel="pickVacationType = false"
                @confirm="onConfirmVacation"
              />
            </van-popup>
          </div>
        </div>
        <div class="ruleFormVacation">
          <div class="formItemVacation" style="border-bottom: 1px solid #d3d3d3;">
            <van-field
              class="vacation_time"
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
                @confirm="onConfirmStartDate"
              />
            </van-popup>
          </div>
          <div class="formItemVacation">
            <van-field
              v-model="endDate"
              class="vacation_time"
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
                @confirm="onConfirmEndDate"
              />
            </van-popup>
          </div>
        </div>
        <div class="ruleFormVacation" v-show="ifOneDay">
          <div class="formItemVacation" style="border-bottom: 1px solid #d3d3d3;">
            <van-field
              v-model="startTime"
              class="vacation_time"
              is-link
              readonly
              label="休假起始时间"
              placeholder="请选择"
              @click="startTimePop = true"
            />
            <van-popup v-model="startTimePop" position="bottom">
              <van-datetime-picker
                type="time"
                title=" "
                @cancel="startTimePop = false"
                @confirm="onConfirmStartTime"
              />
            </van-popup>
          </div>
          <div class="formItemVacation">
            <van-field
              v-model="endTime"
              class="vacation_time"
              is-link
              readonly
              label="休假结束时间"
              placeholder="请选择"
              @click="endTimePop = true"
            />
            <van-popup v-model="endTimePop" position="bottom">
              <van-datetime-picker
                type="time"
                title=" "
                @cancel="endTimePop = false"
                @confirm="onConfirmEndTime"
              />
            </van-popup>
          </div>
        </div>
        <div class="ruleFormVacation">
          <van-collapse v-model="activeNames">
            <van-collapse-item name="1" title="任务" class="write_daily_commi">
              <template #value>
                <div class="commiTitle">{{ taskName }}</div>
              </template>
              <div v-for="(item, index) in commiList" :key="index">
                <div>
                  <van-radio-group v-model="radio">
                    <van-cell :title="item" clickable>
                      <template #right-icon>
                        <van-radio :name="index" @click="getRadioIndex(index)" />
                      </template>
                    </van-cell>
                  </van-radio-group>
                </div>
              </div>
            </van-collapse-item>
          </van-collapse>
        </div>
        <div class="ruleFormVacation textarea_box">
          <div class="textarea_title">
            休假原因<span class="vacation_tips">（ 不少于10个字 ）</span>
          </div>
          <van-field
            v-model="reason"
            class="textarea_reason"
            rows="5"
            label=""
            type="textarea"
            placeholder="请输入原因"
          />
        </div>
        <div class="ruleFormVacation">
          <div class="formItemVacation">
            <van-field
              class="text_handover"
              v-model="handOver"
              label="工作交接"
              placeholder="请输入"
            />
          </div>
        </div>
        <div class="ruleFormVacation" v-if="!isManager">
          <div class="formItemVacation">
            <van-field
              class="vacation_time"
              is-link
              readonly
              v-model="approver"
              label="审批人"
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
        <div class="ruleFormVacation" style="display:none;" v-show="ifUpload">
          <div class="formItemVacation">
            <div class="textarea_img box_frame-row">
              <div>图片上传</div>
            </div>
          </div>
          <div class="imageItem">
            <van-uploader v-model="fileList" multiple />
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="blank"></div>
      <div class="submit_btn">
        <div class="sendBtn" @click="submitData">提交申请</div>
      </div>
    </div>
  </div>
</template>
<script>
import { getManagerList, addVacation } from '@/api/user';
import { commissionListByUser } from '@/api/commission';

export default {
  name: 'WriteExtention',
  data() {
    return {
      commiText: '任务',
      editList: [{ id: 0 }],
      pickVacationType: false, // 休假类型pop
      vacationType: '', // 休假类型
      vacationTypeId: '', // 休假类型type
      Loop: '',
      radio: 0,
      taskId: '',
      taskName: '',
      activeNames: ['1'],
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
      maxDate: null,
      currentDate: new Date(),
      daily: false, // 显示工时还是时间
      commiList: [], // 任务列表
      taskList: [], // 任务id
      vacationSelects: [
        {
          text: '年假',
          type: '0',
        },
        {
          text: '事假',
          type: '1',
        },
        {
          text: '婚假',
          type: '2',
        },
        {
          text: '产假',
          type: '3',
        },
        {
          text: '陪产假',
          type: '4',
        },
        {
          text: '病假',
          type: '5',
        },
        {
          text: '丧假',
          type: '6',
        },
      ],
      isManager: false,
      fileList: [],
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
            this.taskId = this.taskList[0];
            this.taskName = this.commiList[0];
          }
        })
        .catch(() => {});
    },
    // 因为需要传任务id，把任务id按顺序存在了taskList里，所以根据index判断taskId
    getRadioIndex(index) {
      this.taskId = this.taskList[index];
      this.taskName = this.commiList[index];
    },
    // 休假类型确定按钮
    onConfirmVacation(val, index) {
      this.vacationType = val.text;
      this.vacationTypeId = val.type;
      this.pickVacationType = false;
      if (index > 1) {
        this.ifUpload = true;
      }
    },
    // 设置最小时间为当月第一天
    getCurrentMonth() {
      const data = new Date();
      data.setDate(1);
      this.maxDate = data;
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
    // 审批人pop确定按钮
    onConfirmApprover(val) {
      this.approver = val.text;
      this.approverId = val.id;
      this.approverPop = false;
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
    // 提交请假按钮
    submitData() {
      if (!this.vacationTypeId) {
        this.$toast('请选择休假类型');
        return;
      }
      if (!this.startDate) {
        this.$toast('请选择开始日期');
        return;
      }
      if (!this.endDate) {
        this.$toast('请选择结束日期');
        return;
      }
      if (!this.reason) {
        this.$toast('请填写休假原因');
        return;
      }
      if (this.reason.length < 10) {
        this.$toast('请假原因不能少于10个字');
        return;
      }
      if (!this.handOver) {
        this.$toast('请填写工作交接');
        return;
      }
      if (!this.approverId && !this.isManager) {
        this.$toast('请选择审批人');
        return;
      }
      const obj = {
        vacationStartTime: this.startTime, // 开始时间
        vacationEndTime: this.endTime, // 结束时间
        vacationStartDate: this.startDate, // 开始日期
        vacationEndDate: this.endDate, // 结束日期
        vacationType: this.vacationTypeId, // 休假类型
        checkManager: this.approverId, // 审批人
        vacationReason: this.reason, // 请假原因
        workHandover: this.handOver, // 交接
        taskId: this.taskId, // 任务id
        taskName: this.taskName, // 任务名称
      };
      // console.log('obj', obj);
      addVacation(obj)
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
                pageend: 2,
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
    this.getIsManager();
    this.getCurrentMonth();
    // 获取任务列表
    this.defaultProject();
  },
};
</script>
<style lang="less">
.textarea_box {
  .textarea_title {
  }
  .textarea_reason.van-cell {
    height: 242px;
    .van-field__body {
      width: 100%;
      border: 1px solid rgba(#e0e0e0, 0.7);
      border-radius: 16px;
      .van-field__control {
        line-height: 1.3rem;
        font-size: @font13;
        color: @fontC82;
        text-align: left;
        overflow: auto;
        min-height: auto;
        padding: 24px @pad18 24px @pad16;
        box-sizing: border-box;
      }
    }
  }
}
.imageItem {
  padding: 0 @pad18 0 @pad16;
  .van-uploader__wrapper {
    justify-content: space-between;
    .van-uploader__preview-image {
      width: 208px;
      height: 208px;
    }
  }
}
</style>
<style scoped lang="less">
@import url('../../assets/css/style/writeVacation.less');
</style>

<template>
  <div>
    <div class="home_editBox_content">
      <div class="ruleForm">
        <div class="formItem">
          <van-collapse v-model="activeNames">
            <van-collapse-item name="1" title="任务" class="write_daily_commi">
              <template #value>
                <div class="commiTitle">{{ taskName }}</div>
              </template>
              <div v-for="(item, index) in commiListThe" :key="index">
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
        <div class="formItem" v-show="dailyShow">
          <van-field
            v-model="workHour"
            class="workHour"
            is-link
            readonly
            label="工时"
            placeholder="请选择"
            @click="showPickerHour = true"
          />
          <van-popup v-model="showPickerHour" round position="bottom" @close="getWorkContent">
            <van-picker
              show-toolbar
              :columns="hourSelects"
              @cancel="showPickerHour = false"
              @confirm="onConfirmHour"
            />
          </van-popup>
        </div>
        <div v-show="!dailyShow">
          <div class="formItem box_frame-row">
            <van-field
              v-model="startTime"
              class="workHourStart"
              is-link
              readonly
              label="开始时间"
              placeholder="请选择"
              @click="startTimeHM = true"
            />
            <van-popup v-model="startTimeHM" position="bottom" @close="getWorkContent">
              <van-datetime-picker
                v-model="currentStart"
                type="time"
                title=" "
                :formatter="formatterTime"
                @cancel="startTimeHM = false"
                @confirm="onConfirmStartHM"
              />
            </van-popup>
          </div>
          <div class="formItem box_frame-row">
            <van-field
              v-model="endTime"
              class="workHourEnd"
              is-link
              readonly
              label="结束时间"
              placeholder="请选择"
              @click="endTimeHM = true"
            />
            <van-popup v-model="endTimeHM" position="bottom" @close="getWorkContent">
              <van-datetime-picker
                v-model="currentEnd"
                type="time"
                title=" "
                :formatter="formatterTime"
                @cancel="endTimeHM = false"
                @confirm="onConfirmEndHM"
              />
            </van-popup>
          </div>
        </div>
        <div class="workContent">
          <div class="workTitle">今日工作<span class="vacation_tips">（ 不少于10个字 ）</span></div>
          <van-field
            class="textareaEdit"
            v-model="workContent"
            rows="2"
            type="textarea"
            @input="getWorkContent"
            placeholder="请输入工作内容"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'WorkInfo',
  props: ['daily', 'commiList', 'taskList'],
  data() {
    return {
      title: '任务',
      workHour: '', // 工作小时
      showPickerHour: false,
      hourSelects: ['2小时', '4小时', '6小时', '8小时'],
      activeNames: ['1'],
      commiListThe: [],
      radio: 0,
      workContent: '',
      show: true,
      dailyShow: '', // 判断是日报还是延时申请
      startTime: '18:30', // 开始时间
      startTimeHM: false, // 开始时间pop
      currentStart: '18:30', // pop默认时间
      currentEnd: '21:30', // pop默认时间
      endTime: '21:30',
      endTimeHM: false,
      projectId: '', // 项目id
      taskListThe: [], // 按顺序存放taskId
      taskId: '', // 任务id
      taskName: '',
    };
  },
  methods: {
    // 格式化时分弹框：11时05分
    formatterTime(type, val) {
      if (type === 'hour') {
        return `${val}时`;
      }
      if (type === 'minute') {
        return `${val}分`;
      }
      return val;
    },
    // 因为需要传任务id，把任务id按顺序存在了taskList里，所以根据index判断taskId
    getRadioIndex(index) {
      this.taskId = this.taskListThe[index];
      this.taskName = this.commiListThe[index];
    },
    // 工时确定按钮
    onConfirmHour(val) {
      this.workHour = val;
      this.showPickerHour = false;
    },
    // 开始时间确定按钮
    onConfirmStartHM(val) {
      this.startTime = val;
      this.startTimeHM = false;
    },
    // 结束时间确定按钮
    onConfirmEndHM(val) {
      this.endTime = val;
      this.endTimeHM = false;
    },
    sendFlag(val) {
      this.flagToParent = val;
      return this.flagToParent;
    },
    // 工作内容不为空才可以提交
    getWorkContent() {
      this.$emit('checkInput');
    },
    // 默认第一个任务
    assignTask() {
      this.commiListThe = this.commiList;
      this.taskListThe = this.taskList;
      this.taskId = this.taskListThe[0];
      this.taskName = this.commiListThe[0];
    },
  },
  mounted() {
    this.dailyShow = this.daily; // 展示工时还是时间段选择
    this.assignTask();
  },
  watch: {
    commiList: {
      handler() {
        this.assignTask();
      },
    },
  },
};
</script>
<style lang="less" scoped>
.home_editBox_content {
  margin-top: @mar16;
  background: #ffffff;
  .ruleForm {
    padding: 0 0 52px 0;
    .formItem {
      .workHour,
      .workHourEnd,
      .workHourStart {
        padding-left: @pad16;
        border-bottom: @borderColor;
        border-radius: 0;
        line-height: 114px;
        height: 114px;
        font-size: @font15;
        padding-right: @pad18;
        .van-cell__title,
        .van-field__label {
          color: @fontC4D4;
        }
      }
      .workHour {
        width: auto;
      }
      .commiTitle {
        font-size: @font15;
        color: @fontC4D4;
        font-weight: 500;
      }
    }
    .workContent {
      padding-left: @pad16;
      padding-right: 52px;
      font-size: @font15;
      color: @fontC4D4;
      .workTitle {
        height: 102px;
        line-height: 102px;
        .vacation_tips {
          color: @fontC82;
          font-size: @font13;
        }
      }
      .textareaEdit {
        height: 220px;
        text-align: left;
        padding: 28px 32px;
        line-height: 42px;
        background: #f9fafc;
        border-radius: 32px;
      }
    }
  }
}
</style>

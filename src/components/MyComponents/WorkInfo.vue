<template>
    <div>
      <div class="home_editBox_content" >
        <div class="ruleForm">
            <!-- <div class="formItem">
              <van-field
                v-model="projectTeam"
                is-link
                readonly
                label="项目组"
                placeholder="请选择"
                @click="showPickerTeam = true"
              />
              <van-popup v-model="showPickerTeam" round position="bottom" @close="getWorkContent">
                <van-picker
                    show-toolbar
                    :columns="teamSelectsChild"
                    @cancel="showPickerTeam = false"
                    @confirm="onConfirmTeam"
                />
              </van-popup>
            </div> -->
            <div class="formItem">
              <van-collapse v-model="activeNames">
                <van-collapse-item title="任务" name="1">
                  <template #value>
                    {{commision}}
                  </template>
                  <div v-for="(item,index) in commiListThe" :key="index">
                    <div>
                      <van-radio-group v-model="radio">
                        <van-cell :title="item" clickable >
                          <template #right-icon>
                            <van-radio :name="index" @click="getRadioIndex(index)"/>
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
                        @cancel='startTimeHM = false'
                        @confirm='onConfirmStartHM'
                    />
                </van-popup>
              </div>
              <div class="formItem">
                <van-field
                    v-model="endTime"
                    is-link
                    readonly
                    label="结束时间"
                    placeholder="请选择"
                    @click="endTimeHM  = true"
                />
                <van-popup v-model="endTimeHM" position="bottom" @close="getWorkContent">
                    <van-datetime-picker
                        v-model="currentEnd"
                        type="time"
                        title=" "
                        :formatter="formatterTime"
                        @cancel='endTimeHM = false'
                        @confirm='onConfirmEndHM'
                    />
                </van-popup>
              </div>
            </div>
            <div>
              <div class="workTitle">今日工作</div>
              <van-field
                class="textareaEdit"
                style="height:4.5rem;text-align:left"
                v-model="workContent"
                rows="2"
                type="textarea"
                @input="getWorkContent"
                placeholder="请输入工作内容(最少10个字)"
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
      workHour: '', // 工作小时
      showPickerHour: false,
      hourSelects: ['2小时', '4小时', '6小时', '8小时'],
      activeNames: ['1'],
      commiListThe: [],
      commision: '',
      radio: 0,
      workContent: '',
      show: true,
      dailyShow: '', // 判断是日报还是延迟申请
      startTime: '18:30', // 开始时间
      startTimeHM: false, // 开始时间pop
      currentStart: '18:30', // pop默认时间
      currentEnd: '21:30', // pop默认时间
      endTime: '21:30',
      endTimeHM: false,
      projectId: '', // 项目id
      taskListThe: [], // 按顺序存放taskId
      taskId: '', // 任务id

    };
  },
  methods: {
    // 格式化时分弹框：11时05分
    formatterTime(type, val) {
      if (type === 'hour') {
        return `${val}时`;
      } if (type === 'minute') {
        return `${val}分`;
      }
      return val;
    },
    // 因为需要传任务id，把任务id按顺序存在了taskList里，所以根据index判断taskId
    getRadioIndex(index) {
      this.taskId = this.taskListThe[index];
      this.commision = this.commiList[index];
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
      this.commision = this.commiList[0];
    },
  },
  mounted() {
    this.dailyShow = this.daily;// 展示工时还是时间段选择
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
.home_editBox_content{
        margin-top: .5rem;
        border-radius: .5rem;
        background: #ffffff;
        padding: .5rem;
        .ruleForm{
          padding: 0;
           .formItem{
              border-bottom: 1px solid #d3d3d3;
            }
          .workTitle{
            line-height: 2rem;
            line-height: 2rem;
          }
        }
      }
</style>

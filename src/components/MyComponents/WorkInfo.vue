<template>
    <div>
      <div class="home_editBox_content" >
        <div class="ruleForm">
            <div class="formItem">
              <van-field
                v-model="projectTeam"
                is-link
                readonly
                label="项目组"
                placeholder="请选择"
                @click="showPickerTeam = true"
              />
              <van-popup v-model="showPickerTeam" round position="bottom">
                <van-picker
                    show-toolbar
                    :columns="teamSelectsChild"
                    @cancel="showPickerTeam = false"
                    @confirm="onConfirmTeam"
                />
              </van-popup>
            </div>
            <div class="formItem" v-show="commiShow">
              <van-collapse v-model="activeNames">
                <van-collapse-item title="任务" name="1">
                  <template #value>
                    {{commision}}
                  </template>
                  <div v-for="(item,index) in commiList" :key="index">
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
              <van-popup v-model="showPickerHour" round position="bottom">
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
                <van-popup v-model="startTimeHM" position="bottom">
                    <van-datetime-picker
                        v-model="currentStart"
                        type="time"
                        title=" "
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
                <van-popup v-model="endTimeHM" position="bottom">
                    <van-datetime-picker
                        v-model="currentEnd"
                        type="time"
                        title=" "
                        @cancel='endTimeHM = false'
                        @confirm='onConfirmEndHM'
                    />
                </van-popup>
              </div>
            </div>
            <div class="formItem">
              <div class="workTitle">今日工作</div>
              <van-field
                class="textareaEdit"
                style="height:4.5rem;text-align:left"
                v-model="workContent"
                rows="2"
                type="textarea"
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
  props: ['daily', 'teamSelects', 'teamList', 'testData'],
  data() {
    return {
      projectTeam: '', // 项目组
      showPickerTeam: false, // 项目组picker
      teamSelectsChild: this.teamSelects,
      teamListChild: this.teamList, // 按顺序存所有项目id
      workHour: '', // 工作小时
      showPickerHour: false,
      hourSelects: ['2小时', '4小时', '6小时', '8小时'],
      activeNames: ['0'],
      commiList: [],
      radio: 0,
      commision: '',
      workContent: '',
      show: true,
      dailyShow: '', // 判断是日报还是延迟申请
      startTime: '', // 开始时间
      startTimeHM: false, // 开始时间pop
      currentStart: '18:30', // pop默认时间
      currentEnd: '21:30', // pop默认时间
      endTime: '',
      endTimeHM: false,
      projectId: '', // 项目id
      taskList: [], // 按顺序存放taskId
      taskId: '', // 任务id
      commiShow: false,
      testDataGet: '',

    };
  },
  methods: {
    // 项目组确定按钮
    onConfirmTeam(value, index) {
      this.projectId = this.teamList[index];// 拿到projectId
      this.projectTeam = value;
      this.showPickerTeam = false;
      this.requestAxios({
        url: '/businessTask/taskList',
        data: {
          productId: this.projectId,
        },
        method: 'post',
      })
        .then((res) => {
          if (res.data.list.length > 0) {
            this.commiShow = true;
            Array.prototype.forEach.call(res.data.list, (item) => {
              this.commiList.push(item.taskName);
              this.taskList.push(item.taskId);
            });
            this.radio = 0;// 设置默认选中第一个任务
            this.commision = this.commiList[0];
            this.taskId = this.taskList[0];
          }
        })
        .catch(() => {
        });
    },
    // 因为需要传任务id，把任务id按顺序存在了taskList里，所以根据index判断taskId
    getRadioIndex(index) {
      this.commision = this.commiList[index];
      this.taskId = this.taskList[index];
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
  },
  mounted() {
    this.testDataGet = this.testData;
    this.dailyShow = this.daily;// 展示工时还是时间段选择
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
          .workTitle{
            line-height: 2rem;
            line-height: 2rem;
          }
        }
      }
</style>

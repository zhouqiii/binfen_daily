<template>
    <div>
      <div class="home_editBox_content"  v-for="(item,index) in dataList"
        :key="item.id"
        @touchstart="touchinUk(index)"
        @touchend="cleartime(index)"
      >

        <div class="ruleForm">
            <div class="formItem box_frame-row">
                <div>项目组</div>
                <div>{{item.projectName}}</div>
            </div>
            <div class="formItem box_frame-row">
                <div>任务</div>
                <div class="textEllipsis">{{item.taskName}}</div>
            </div>
            <div class="formItem box_frame-row" v-show="dailyShow">
              <van-field
                @click="getIndex(index)"
                v-model="item.workerLength"
                is-link
                readonly
                label="工时"
                placeholder="请选择"

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
                v-model="item.workerInfo"
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
  name: 'ChangeWorkInfo',
  props: ['data', 'daily'],
  data() {
    return {
      dataList: [], // 所有数据
      hourIndex: 0, // 获取当前点击日报框的索引
      showPickerHour: false,
      hourSelects: ['2小时', '4小时', '6小时', '8小时'],
      startTime: this.data.workHourStart,
      endTime: this.data.workHourEnd,
      endTimeHM: false,
      startTimeHM: false,
      currentStart: this.data.workHourStart,
      currentEnd: this.data.workHourEnd,
      commiList: '',
      commiListAll: [[{ title: '哈哈哈啦哈哈哈哈哈啦哈哈哈哈啦哈哈啦哈啦哈啦哈啦哈哈啦哈哈啦哈啦哈啦哈啦' }, { title: 'aklla' }], [{ title: 'akalj啦哈啦哈啦哈啦哈哈啦哈哈啦哈啦哈啦哈啦' }, { title: '击杀拉拉裤手机卡案例' }], [{ title: 'jjjjjjjjjjjj' }, { title: 'aklla' }], [{ title: '亲亲亲亲亲亲群群群群群' }, { title: '击杀拉拉裤手机卡案例' }]],
      workContent: this.data.workContent,
      dailyShow: this.daily, // 判断是日报还是延迟申请
      Loop: '',
    };
  },
  methods: {
    getIndex(index) {
      this.showPickerHour = true;
      this.hourIndex = index;
    },
    // 工时确定按钮
    onConfirmHour(val) {
      // this.workHour[this.hourIndex] = val;
      this.dataList[this.hourIndex].workerLength = val;
      this.showPickerHour = false;
    },
    getCommi(index, val) {
      this.commision = val;
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
    // 长按删除的作用
    touchinUk(index) {
      clearInterval(this.Loop); // 再次清空定时器，防止重复注册定时器
      this.Loop = setTimeout(() => {
        this.$dialog.confirm({
          message: '是否删除',
        }).then(() => {
          this.dataList.splice(index, 1);
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
    this.dataList = this.data;
    for (let i = 0; i < this.dataList.length; i++) {
      this.dataList[i].workerLength = `${this.dataList[i].workerLength}小时`;
    }
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
          .box_frame-row{
            line-height: 2.5rem;
            height: 2.5rem;
            border-bottom: 1px solid #d3d3d3;
            .textEllipsis{
                width: 70%;
            }
          }
          .workTitle{
            line-height: 2rem;
            line-height: 2rem;
          }
        }
      }
</style>

<template>
  <div>
    <div
      class="home_editBox_content"
      v-for="(item, index) in dataList"
      :key="item.id"
      @touchstart="touchinUk(index)"
      @touchend="cleartime(index)"
    >
      <div class="ruleForm">
        <div class="formItemComi box_frame-row">
          <span class="commi_name">任务</span>
          <div class="text_line_name">{{ item.taskName }}</div>
        </div>
        <div class="formItem" v-show="dailyShow">
          <van-field
            @click="getIndex(index)"
            v-model="item.workerLength"
            is-link
            class="workHour"
            readonly
            label="工时"
            placeholder="请选择"
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
                @confirm="onConfirmStartHM"
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
              @click="endTimeHM = true"
            />
            <van-popup v-model="endTimeHM" position="bottom" @close="getWorkContent">
              <van-datetime-picker
                v-model="currentEnd"
                type="time"
                title=" "
                @confirm="onConfirmEndHM"
              />
            </van-popup>
          </div>
        </div>
        <div class="workContent">
          <div class="workTitle">今日工作</div>
          <van-field
            class="textareaEdit"
            v-model="item.workerInfo"
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
      commiListAll: [
        [
          { title: '哈哈哈啦哈哈哈哈哈啦哈哈哈哈啦哈哈啦哈啦哈啦哈啦哈哈啦哈哈啦哈啦哈啦哈啦' },
          { title: 'aklla' },
        ],
        [
          { title: 'akalj啦哈啦哈啦哈啦哈哈啦哈哈啦哈啦哈啦哈啦' },
          { title: '击杀拉拉裤手机卡案例' },
        ],
        [{ title: 'jjjjjjjjjjjj' }, { title: 'aklla' }],
        [{ title: '亲亲亲亲亲亲群群群群群' }, { title: '击杀拉拉裤手机卡案例' }],
      ],
      workContent: this.data.workContent,
      dailyShow: this.daily, // 判断是日报还是延时申请
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
    // 工作内容不为空才可以提交
    getWorkContent() {
      this.$emit('checkInput', this.dataList);
    },
    // 长按删除的作用
    touchinUk(index) {
      clearInterval(this.Loop); // 再次清空定时器，防止重复注册定时器
      this.Loop = setTimeout(() => {
        this.$dialog
          .confirm({
            message: '是否删除',
            confirmButtonText: '确定',
          })
          .then(() => {
            this.dataList.splice(index, 1);
          })
          .catch(() => {});
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
.home_editBox_content {
  margin-top: @mar16;
  background: #ffffff;
  padding-left: @pad16;
  .ruleForm {
    padding: 0;
    .formItemComi {
      min-height: 114px;
      padding-top: @pad16;
      .commi_name {
        flex: 1;
        font-size: @font15;
        color: @fontC4D4;
      }
      .text_line_name {
        flex: 5.5;
        font-size: @font15;
        color: @fontC4D4;
        font-weight: 500;
        margin: 0;
      }
    }
    .formItem {
      .workHour {
        border-bottom: @borderColor;
        border-radius: 0;
        line-height: 114px;
        height: 114px;
        font-size: @font15;
        padding-right: @pad18;
        width: auto;
        .van-cell__title,
        .van-field__label {
          color: @fontC4D4;
        }
      }
    }
    .text_line {
      height: 114px;
      line-height: 114px;
      font-size: @font15;
      color: @fontC4D4;
      font-weight: 500;
      padding: 0 @pad16 0 20px;
      margin: 0;
      border-bottom: @borderColor;
    }
    .workContent {
      padding: 0 36px @pad16 0;
      font-size: @font15;
      color: @fontC4D4;
      .workTitle {
        height: 102px;
        line-height: 102px;
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

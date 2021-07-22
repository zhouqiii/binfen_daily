<template>
  <div>
    <!--弹出层挂载的节点-->
    <div class="contentBox" v-show="conditionPart === 'commi'">
      <div class="ruleForm">
        <div class="mainTitle outTitle">项目信息</div>
        <div
          class="condition_item_top topItem"
          :class="{ noBorderBottom: index === domListSelect.length - 1 }"
          v-for="(item, index) in domListSelect"
          :key="item.title"
        >
          <div class="select_title">{{ item.title }}</div>
          <div class="input">
            <van-field
              v-model="item.content"
              is-link
              readonly
              label=""
              placeholder="请选择"
              @click="
                item.contentPicker = !item.contentPicker;
                indexSelectConfirm(index);
              "
              class="selInput"
            />
            <van-popup v-model="item.contentPicker" round position="bottom">
              <van-picker
                show-toolbar
                :columns="item.columns"
                @cancel="item.contentPicker = false"
                @confirm="onConfirm"
              />
            </van-popup>
          </div>
        </div>
        <div class="conditionItem" v-for="(item, index) in domListTime" :key="index">
          <div class="select_title mainTitle">{{ item.title }}</div>
          <div class="start_an_end_time">
            <div class="start_time">
              <div class="text">开始时间</div>
              <div class="icon">
                <svg-icon icon-class="arrowsDrop"></svg-icon>
              </div>
            </div>
            <div class="end_time">
              <div class="text">结束时间</div>
              <div class="icon">
                <svg-icon icon-class="arrowsDrop"></svg-icon>
              </div>
            </div>
          </div>
          <div class="shortLine"></div>
          <div class="time_pop_box flex-row">
            <van-field
              v-model="item.startTime"
              readonly
              placeholder="请选择"
              @click="
                item.startTimePicker = true;
                indexTimeConfirm(index);
              "
              class="timeInput"
            >
            </van-field>
            <van-popup v-model="item.startTimePicker" position="bottom">
              <van-datetime-picker
                type="date"
                :formatter="formatter"
                @confirm="onConfirmStart"
                @cancel="item.startTimePicker = false"
                title=" "
              />
            </van-popup>
            <!-- <span style="margin: 0 5px">—</span> -->
            <van-field
              v-model="item.endTime"
              readonly
              label=""
              placeholder="请选择"
              @click="
                item.endTimePicker = true;
                indexTimeConfirm(index);
              "
              class="timeInput"
            />
            <van-popup v-model="item.endTimePicker" position="bottom">
              <van-datetime-picker
                type="date"
                :formatter="formatter"
                @confirm="onConfirmEnd"
                @cancel="item.endTimePicker = false"
                title=" "
              />
            </van-popup>
          </div>
        </div>
      </div>
      <div class="timeSelect_btn flex_evenly">
        <div class="timeSelect_btn_cancel" @click="resetCheck">重置</div>
        <div class="timeSelect_btn_confirm" @click="getSelectComm">确定</div>
      </div>
    </div>
    <div class="contentBox" v-show="conditionPart === 'approve'">
      <div class="ruleForm">
        <div class="conditionItem" v-for="item in domListInput" :key="item.title">
          <div class="selinput_title">员工信息</div>
          <div>
            <van-field v-model="item.content" :label="item.title" class="selInput approveInput" />
          </div>
        </div>
        <div class="condition_item">
          <div class="selinput_title">审批类型</div>
          <div class="flex-rowSvg">
            <div class="condition_choose" :class="{ active: delay == '1' }" @click="delay = '1'">
              延时申请
            </div>
            <div
              class="condition_choose next"
              :class="{ active: delay == '2' }"
              @click="delay = '2'"
            >
              休假
            </div>
          </div>
        </div>
        <div class="condition_item">
          <div class="selinput_title">审批状态</div>
          <div class="flex-rowSvg">
            <div class="condition_choose" :class="{ active: agree == '1' }" @click="agree = '1'">
              审批通过
            </div>
            <div
              class="condition_choose next"
              :class="{ active: agree == '0' }"
              @click="agree = '0'"
            >
              审批拒绝
            </div>
          </div>
        </div>
        <div class="condition_item" v-for="(item, index) in domListTimeApprove" :key="index">
          <div class="selinput_title">{{ item.title }}</div>
          <div class="time_title_box box_frame-row">
            <div class="textStart">开始时间<svg-icon icon-class="arrowsDrop"></svg-icon></div>
            <div class="textEnd">结束时间<svg-icon icon-class="arrowsDrop"></svg-icon></div>
          </div>
          <div class="short_line"></div>
          <div class="time_pop_box flex-row">
            <van-field
              v-model="item.startTime"
              readonly
              label=""
              placeholder="请选择"
              @click="
                item.startTimePicker = true;
                indexTimeAppConfirm(index);
              "
              class="timeInput"
            />
            <van-popup v-model="item.startTimePicker" position="bottom">
              <van-datetime-picker
                type="date"
                :formatter="formatter"
                @confirm="onConfirmAppStrt"
                @cancel="item.startTimePicker = false"
                title=" "
              />
            </van-popup>
            <van-field
              v-model="item.endTime"
              readonly
              label=""
              placeholder="请选择"
              @click="
                item.endTimePicker = true;
                indexTimeAppConfirm(index);
              "
              class="timeInput"
            />
            <van-popup v-model="item.endTimePicker" position="bottom">
              <van-datetime-picker
                type="date"
                :formatter="formatter"
                @confirm="onConfirmAppEnd"
                @cancel="item.endTimePicker = false"
                title=" "
              />
            </van-popup>
          </div>
        </div>
      </div>
      <div class="timeSelect_btn flex_evenly">
        <div class="timeSelect_btn_cancel" @click="resetApprove">重置</div>
        <div class="timeSelect_btn_confirm" @click="getSelectApprove">确定</div>
      </div>
    </div>
  </div>
</template>
<script>
import { commissionListByUser } from '@/api/commission';
import svgIcon from '../SvgIcon.vue';

export default {
  name: 'ScreenBullet',
  components: {
    svgIcon,
  },
  props: {
    conditionPart: {
      type: String,
      default: 'commi',
    },
  },
  data() {
    return {
      timeIndex: 0, // 用来判断是第几个时间选择器
      selectIndex: 0, // 用来判断是第几个上部筛选条件
      approveIndex: 0,
      delay: null, // 申请类型 1延时 2休假
      agree: null, // 审批状态 0拒绝 1同意
      domListSelect: [
        {
          title: '任务名称',
          content: '',
          contentPicker: false,
          columns: [],
        },
        {
          title: '批次',
          content: '',
          contentPicker: false,
          columns: [
            'P2101',
            'P2102',
            'P2103',
            'P2104',
            'P2201',
            'X11',
            'X13',
            'X14',
            'X16',
            'X17',
            'X19',
            'X110',
            'X112',
          ],
        },
        {
          title: '风险等级',
          content: '',
          contentPicker: false,
          columns: ['无', '低', '中', '高'],
        },
      ],
      domListInput: [
        {
          title: '姓名',
          content: '',
          id: '1',
        },
      ],
      domListTime: [
        // {
        //   title: '任务下达',
        //   startTime: '',
        //   endTime: '',
        //   startTimePicker: false,
        //   endTimePicker: false,
        // },
        // {
        //   title: '功能测试版本',
        //   startTime: '',
        //   endTime: '',
        //   startTimePicker: false,
        //   endTimePicker: false,
        // },
        // {
        //   title: '正式版本',
        //   startTime: '',
        //   endTime: '',
        //   startTimePicker: false,
        //   endTimePicker: false,
        // },
        // {
        //   title: '投产',
        //   startTime: '',
        //   endTime: '',
        //   startTimePicker: false,
        //   endTimePicker: false,
        // },
      ],
      domListTimeApprove: [
        {
          title: '审批时间',
          startTime: '',
          endTime: '',
          startTimePicker: false,
          endTimePicker: false,
        },
      ],
      dangerTypeList: [
        {
          name: '无',
          status: '0',
        },
        {
          name: '低',
          status: '1',
        },
        {
          name: '中',
          status: '2',
        },
        {
          name: '高',
          status: '3',
        },
      ],
      taskList: [],
    };
  },
  methods: {
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
    formatter(type, val) {
      if (type === 'year') {
        return `${val}年`;
      }
      if (type === 'month') {
        return `${val}月`;
      }
      if (type === 'day') {
        return `${val}日`;
      }
      return val;
    },
    getTaskList() {
      commissionListByUser()
        .then((res) => {
          this.taskList = res.data;
          this.taskList.forEach((item) => {
            this.domListSelect[0].columns.push(item.taskName);
          });
          // this.domListSelect[0].columns = res.data;
          console.log('commissionListByUser', res);
        })
        .catch((err) => {
          console.log('commissionListByUser err', err);
        });
    },
    // 重置按钮
    resetCheck() {
      this.domListSelect.forEach((item) => {
        const data = item;
        data.content = '';
        return data;
      });
      this.domListTime.forEach((item) => {
        const data = item;
        data.startTime = '';
        data.endTime = '';
        return data;
      });
    },
    // 重置按钮
    resetApprove() {
      this.domListInput.forEach((item) => {
        const data = item;
        data.content = '';
        return data;
      });
      this.domListTimeApprove.forEach((item) => {
        const data = item;
        data.startTime = '';
        data.endTime = '';
        return data;
      });
      this.agree = null;
      this.delay = null;
    },
    // 通过时间筛选看任务列表
    getSelectComm() {
      let status = null;
      this.dangerTypeList.forEach((item) => {
        if (this.domListSelect[2].content === item.name) {
          ({ status } = item);
        }
      });
      const obj = {
        taskName: this.domListSelect[0].content,
        batchNo: this.domListSelect[1].content,
        dangerType: status,
        // taskStartTime: this.domListTime[0].startTime,
        // taskEndTime: this.domListTime[0].endTime,
        // testStartTime: this.domListTime[1].startTime,
        // testEndTime: this.domListTime[1].endTime,
        // versionStartTime: this.domListTime[2].startTime,
        // versionEndTime: this.domListTime[2].endTime,
        // productStartTime: this.domListTime[3].startTime,
        // productEndTime: this.domListTime[3].endTime,
      };
      this.$emit('queryList', obj);
    },
    getSelectApprove() {
      const obj = {
        realName: this.domListInput[0].content,
        checkType: this.delay, // 1延时 2休假
        checkStatus: this.agree, // 0拒绝 1同意
        checkStartDate: this.domListTimeApprove[0].startTime,
        checkEndDate: this.domListTimeApprove[0].endTime,
      };
      this.$emit('queryList', obj);
    },
    indexSelectConfirm(val) {
      this.selectIndex = val;
    },
    // 修改timeIndex做标记，判断此时是第几个index，用来对应time的值
    indexTimeConfirm(val) {
      this.timeIndex = val;
    },
    indexTimeAppConfirm(val) {
      this.approveIndex = val;
    },
    // 筛选条件弹出层确定按钮
    onConfirm(val) {
      this.domListSelect[this.selectIndex].content = val;
      this.domListSelect[this.selectIndex].contentPicker = false;
    },
    // 筛选条件弹出层确定按钮--历史审核开始时间
    onConfirmAppStrt(val) {
      this.domListTimeApprove[this.approveIndex].startTime = `${this.formatDate(val)}`;
      this.domListTimeApprove[this.approveIndex].startTimePicker = false;
    },
    // 筛选条件弹出层确定按钮--历史审核结束时间
    onConfirmAppEnd(val) {
      this.domListTimeApprove[this.approveIndex].endTime = `${this.formatDate(val)}`;
      this.domListTimeApprove[this.approveIndex].endTimePicker = false;
    },
    // 开始时间弹出层确定按钮
    onConfirmStart(val) {
      this.domListTime[this.timeIndex].startTime = `${this.formatDate(val)}`;
      this.domListTime[this.timeIndex].startTimePicker = false;
    },
    // 结束时间弹出层确定按钮
    onConfirmEnd(val) {
      this.domListTime[this.timeIndex].endTime = `${this.formatDate(val)}`;
      this.domListTime[this.timeIndex].endTimePicker = false;
    },
  },
  mounted() {
    this.getTaskList();
  },
  created() {
    this.$nextTick(() => {});
  },
};
</script>
<style lang="less">
.contentBox {
  .ruleForm {
    .conditionItem {
      .time_pop_box {
        .van-field__control {
          text-align: center !important;
        }
      }
    }
  }
}
</style>
<style lang="less" scoped>
.noBorderBottom {
  border-bottom: 1px solid transparent !important;
}
.contentBox {
  font-size: 28px;
  .ruleForm {
    .outTitle {
      padding-left: 32px;
      padding-top: 80px;
      background: #fff;
    }
    .mainTitle {
      font-size: 32px;
      font-weight: bold;
      color: #333;
    }
    .topItem {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .select_title {
        line-height: 2.5rem;
      }
      .input {
        margin-right: 32px;
      }
    }
    .conditionItem {
      padding: 80px 32px 0 32px;
      margin-bottom: 32px;
    }
    .condition_item_top {
      padding: 0 0 0 48px;
      border-bottom: @borderColor;
      color: @fontC4D4;
      font-size: @font14;
    }
    .condition_item {
      padding: 32px 32px 24px 32px;
      margin-bottom: 32px;
    }
    .conditionItem,
    .condition_item,
    .condition_item_top {
      background: #fff;
      .selinput_title {
        font-weight: 700;
        font-size: @font16;
        color: @fontColor;
      }
      .selInput {
        height: 100px;
        line-height: 100px;
        padding-left: 16px;
        background: #ffffff;
        color: @fontC4D4;
        font-size: @font14;
        font-weight: 500;
      }
      .select_title {
        line-height: 2.5rem;
      }
      .start_an_end_time {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 16px;
        .start_time,
        .end_time {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .icon {
            margin: 0;
          }
        }
      }
      .shortLine {
        width: 20px;
        height: 4px;
        background: #4d4d4d;
        margin: 10px auto;
      }
      .flex-rowSvg {
        margin-top: 28px;
        padding-left: 16px;
        .condition_choose {
          height: 72px;
          line-height: 72px;
          border-radius: 8px;
          background: #efefef;
          border: 1px solid #efefef;
          font-size: 0.8rem;
          text-align: center;
          width: 170px;
          font-size: @font14;
          color: @fontC4D4;
        }
        .next {
          margin-left: 32px;
        }
        .active {
          background: rgba(47, 128, 237, 0.2);
          border: 1px solid @fontC2F8;
          color: @fontC2F8;
        }
      }
      .short_line {
        width: 20px;
        height: 2px;
        background: @fontC4D4;
        margin: 0 auto;
      }
      .time_pop_box {
        margin-top: 20px;
        padding-left: 16px;
        justify-content: space-between;
        .van-cell {
          padding: 0;
          height: 32px;
          line-height: 32px;
          flex: 0 0 180px;
          background: #ffffff;
        }
      }
      .time_title_box {
        margin-top: 28px;
        .textStart {
          width: 40%;
          text-align: center;
        }
        .textEnd {
          width: 35%;
          text-align: center;
        }
      }
    }
  }
  .timeSelect_btn {
    height: 174px;
    background: #fff;
    // line-height: 2rem;
    // width: 100%;
    // font-size: 0.875rem;
    // text-align: center;

    .timeSelect_btn_cancel,
    .timeSelect_btn_confirm {
      width: 264px;
      height: 102px;
      border-radius: 20px;
      font-size: 32px;
      font-weight: 500;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .timeSelect_btn_cancel {
      border: 1px solid #2f80ed;
      color: #2f80ed;
      background: #ffffff;
    }
    .timeSelect_btn_confirm {
      background: #2f80ed;
      color: #fcfcff;
    }
  }
}
</style>

<template>
    <div>
        <!--弹出层挂载的节点-->
        <div class="contentBox" v-show="conditionPart==='commi'">
          <div class="ruleForm">
            <div class="conditionItem" v-for="(item,index) in domListSelect" :key="item.title">
                <div class="select_title">{{item.title}}</div>
                <div>
                    <van-field
                        v-model="item.content"
                        is-link
                        readonly
                        label=""
                        @click="item.contentPicker=!item.contentPicker;
                            indexSelectConfirm(index)"
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
            <div class="conditionItem" v-for="(item,index) in domListTime" :key="index">
              <div class="select_title">{{item.title}}</div>
              <div class="time_pop_box flex-row">
                <van-field
                  v-model="item.startTime"
                  is-link
                  readonly
                  label=""
                  placeholder="开始时间"
                  @click="item.startTimePicker=true;indexTimeConfirm(index)"
                  class="timeInput"
                />
                <van-popup v-model="item.startTimePicker" position="bottom">
                  <van-datetime-picker
                    type="date"
                    :formatter="formatter"
                    @confirm='onConfirmStart'
                    @cancel='item.startTimePicker = false'
                    title=" "
                  />
                </van-popup>
                <span style="margin:0 5px">—</span>
                <van-field
                  v-model="item.endTime"
                  is-link
                  readonly
                  label=""
                  placeholder="结束时间"
                  @click="item.endTimePicker=true;indexTimeConfirm(index)"
                  class="timeInput"
                />
                <van-popup v-model="item.endTimePicker" position="bottom">
                  <van-datetime-picker
                    type="date"
                    :formatter="formatter"
                    @confirm='onConfirmEnd'
                    @cancel='item.endTimePicker = false'
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
        <div class="contentBox" v-show="conditionPart==='approve'">
          <div class="ruleForm">
            <div class="conditionItem" v-for="item in domListInput" :key="item.title">
                <div class="select_title">{{item.title}}</div>
                <div>
                    <van-field v-model="item.content" label="" class="selInput approveInput"/>
                </div>
            </div>
            <div class="conditionItem">
                <div class="select_title">审批类型</div>
                <div class="box_frame-row">
                    <div class="condition_choose"
                      :class="{active:delay}"
                      @click="delay=!delay"
                    >
                      延迟申请
                    </div>
                    <div class="condition_choose"
                      :class="{active:vacation}"
                      @click="vacation=!vacation"
                    >调休</div>
                </div>
            </div>
            <div class="conditionItem">
                <div class="select_title">审批状态</div>
                <div class="box_frame-row">
                    <div class="condition_choose"
                      :class="{active:agree}"
                      @click="agree=!agree"
                    >审批通过</div>
                    <div class="condition_choose"
                      :class="{active:refuse}"
                      @click="refuse=!refuse"
                    >审批拒绝</div>
                </div>
            </div>
            <div class="conditionItem" v-for="(item,index) in domListTimeApprove" :key="index">
              <div class="select_title">{{item.title}}</div>
              <div class="time_pop_box flex-row">
                  <van-field
                      v-model="item.startTime"
                      is-link
                      readonly
                      label=""
                      placeholder="开始时间"
                      @click="item.startTimePicker=true;indexTimeAppConfirm(index)"
                      class="timeInput"
                  />
                  <van-popup v-model="item.startTimePicker" position="bottom">
                      <van-datetime-picker
                          type="date"
                          :formatter="formatter"
                          @confirm='onConfirmAppStrt'
                          @cancel='item.startTimePicker = false'
                          title=" "
                      />
                  </van-popup>
                  <span style="margin:0 5px">—</span>
                  <van-field
                      v-model="item.endTime"
                      is-link
                      readonly
                      label=""
                      placeholder="结束时间"
                      @click="item.endTimePicker=true;indexTimeAppConfirm(index)"
                      class="timeInput"
                  />
                  <van-popup v-model="item.endTimePicker" position="bottom">
                      <van-datetime-picker
                          type="date"
                          :formatter="formatter"
                          @confirm='onConfirmAppEnd'
                          @cancel='item.endTimePicker = false'
                          title=" "
                      />
                  </van-popup>
              </div>
            </div>
          </div>
          <div class="timeSelect_btn flex_evenly">
              <div class="timeSelect_btn_cancel" @click="resetApprove">重置</div>
              <div class="timeSelect_btn_confirm">确定</div>
          </div>
        </div>
    </div>
</template>
<script>

export default {
  name: 'ScreenBullet',
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
      delay: false, // 延迟申请
      vacation: false, // 调休
      agree: false, // 审批通过
      refuse: false, // 审批拒绝
      domListSelect: [{
        title: '任务名称', content: '', contentPicker: false, columns: ['X17乘车码优惠券', 'X16二维码中转页'],
      }, {
        title: '批次', content: '', contentPicker: false, columns: ['X16', 'X17'],
      }, {
        title: '风险等级', content: '', contentPicker: false, columns: ['无', '低级', '中级', '高级'],
      }],
      domListInput: [{
        title: '姓名', content: '', id: '1',
      }],
      domListTime: [{
        title: '任务下达', startTime: '', endTime: '', startTimePicker: false, endTimePicker: false,
      }, {
        title: '功能测试版本', startTime: '', endTime: '', startTimePicker: false, endTimePicker: false,
      }, {
        title: '正式版本', startTime: '', endTime: '', startTimePicker: false, endTimePicker: false,
      }, {
        title: '投产', startTime: '', endTime: '', startTimePicker: false, endTimePicker: false,
      }],
      domListTimeApprove: [{
        title: '审批时间', startTime: '', endTime: '', startTimePicker: false, endTimePicker: false,
      }],
    };
  },
  methods: {
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
      this.agree = false;
      this.refuse = false;
      this.delay = false;
      this.vacation = false;
    },
    // 通过时间筛选看日报列表
    getSelectComm() {
    //   this.show = false;
    //   this.commiList = [];
    //   this.resetParams(this.startDate, this.endDate);
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
    // 筛选条件弹出层确定按钮--历史审核
    onConfirmAppStrt(val) {
      this.domListTimeApprove[this.approveIndex].startTime = `${this.formatDate(val)}`;
      this.domListTimeApprove[this.approveIndex].startTimePicker = false;
    },
    // 筛选条件弹出层确定按钮--历史审核
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
  created() {
    this.$nextTick(() => {

    });
  },
};
</script>
<style lang="less" scoped>
.contentBox{
    font-size: .875rem;
    .ruleForm{
        .conditionItem{
            .selInput{
                height: 1.375rem;
                line-height: 1.375rem;
                border: 1px solid #333333;
                background: #ffffff;
            }
            .select_title{
                line-height: 2rem;
            }
            .box_frame-row{
              .condition_choose{
                height: 1.5rem;
                line-height: 1.5rem;
                border: 1px solid #333333;
                border-radius: 2rem;
                background: #ffffff;
                font-size: 0.8rem;
                text-align: center;
                width: 43%;
              }
              .active{
                background: rgba(12, 8, 8, 0.63);
                color: #ffffff;
              }
            }
            .time_pop_box{
                .van-cell{
                    height: 1.6rem;
                    line-height: 1.6rem;
                    border: 1px solid #333333;
                    border-radius:2rem;
                    background: #ffffff;
                    font-size: .8rem;
                }
            }
        }
    }
    .timeSelect_btn{
        margin-top: 6rem;
        height: 2rem;
        line-height: 2rem;
        width: 100%;
        font-size: .875rem;
        text-align: center;
        .timeSelect_btn_cancel{
            width: 25%;
            color: inherit;
            background: #ffffff;
            border-radius:.3rem ;
        }
        .timeSelect_btn_confirm{
            width: 25%;
            background: rgba(22, 155, 213, 1);
            color: #ffffff;
            border-radius:.3rem ;
        }
    }
}

</style>

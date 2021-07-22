<template>
  <div class="box dailydetail">
    <nav-bar-top title="日报详情"></nav-bar-top>
    <div class="home">
      <div class="home_detail_date box_frame-row">
        <span>填写日期</span>
        <span>{{ getdate }}</span>
      </div>
      <div class="home_detail_content" v-for="(item, index) in dayListInfo" :key="index">
        <div class="ruleForm">
          <div class="formItemComi box_frame-row">
            <span class="commi_name">任务</span>
            <p class="text_line_name">{{ item.taskName }}</p>
          </div>
          <div class="text_line box_frame-row">
            <span>工时</span>
            <span>{{ item.workerLength }}小时</span>
          </div>
          <div class="box_frame">
            <span class="text_work">今日工作</span>
            <div class="home_detail_workContent">
              {{ item.workerInfo }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="ifChange === '0'">
      <div class="blank"></div>
      <div class="change_btn" v-if="ifChange === '0'">
        <div class="sendBtn" @click="routeItem('/ChangeDaily')">修改日报</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'DailyDetail',
  data() {
    return {
      getdate: JSON.parse(this.$route.query.date),
      projectName: '',
      taskName: '',
      workerLength: '',
      workerInfo: '',
      dayListInfo: [],
      ifChange: JSON.parse(this.$route.query.change),
    };
  },
  methods: {
    getInfo() {
      this.requestAxios({
        url: `/workDaily/work-daily/findParam/${JSON.parse(this.$route.query.id)}`, // `/workDaily/work-daily/findParam/${JSON.parse(this.$route.query.id)}`,
        method: 'post',
      })
        .then((res) => {
          if (res.data) {
            this.dayListInfo = res.data; // 处理
          }
        })
        .catch(() => {});
    },
    routeItem(path) {
      this.$router.push({
        path,
        query: {
          date: JSON.stringify(this.getdate), // 带给修改页面的默认date
          data: JSON.stringify(this.dayListInfo), // 把这一页的数据带到修改页面
          id: this.$route.query.id, // 修改接口需要一个从日报列表传过来的id字段
          formatDate: this.$route.query.formatDate,
        },
      });
    },
  },
  mounted() {
    this.getInfo();
  },
};
</script>
<style lang="less" scoped>
.home {
  .home_detail_date {
    padding: @pad16 @pad18 @pad16 @pad16;
    margin-top: @mar16;
    background: #ffffff;
    font-size: @font15;
    color: @fontC4D4;
    font-weight: 500;
  }
  .home_detail_content {
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
        }
        .text_line_name {
          flex: 4.5;
          font-size: @font15;
          color: @fontC4D4;
          font-weight: 500;
          margin: 0;
        }
      }
      .text_line {
        height: 114px;
        line-height: 114px;
        font-size: @font15;
        color: @fontC4D4;
        font-weight: 500;
        padding: 0 @pad16 0 0;
        margin: 0;
        border-bottom: @borderColor;
      }
      .text_work {
        height: 102px;
        line-height: 102px;
        font-size: @font15;
        color: @fontC4D4;
      }
      .home_detail_workContent {
        margin: 0 36px @mar16 0;
        background: #f9fafc;
        font-size: @font15;
        color: @fontC4D4;
        font-weight: 500;
        border-radius: 32px;
        padding: @pad16;
        line-height: 42px;
      }
    }
  }
}
.blank {
  height: 170px;
}
.change_btn {
  position: fixed;
  bottom: 0px;
  background-color: #f2f2f2;
  width: 100%;
  height: 166px;
  display: flex;
  align-items: center;
  .sendBtn {
    width: 650px;
    color: #ffffff;
    height: 102px;
    line-height: 102px;
    background: @fontC2F8;
    border-radius: 20px;
    margin: auto;
    text-align: center;
    font-size: @font16;
    font-weight: 700;
  }
}
</style>

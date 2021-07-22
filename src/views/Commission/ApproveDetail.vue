<template>
  <div>
    <nav-bar-top :title="title" :navBg="navBg"></nav-bar-top>
    <div class="home">
      <div v-show="ifRefuse">
        <div class="home_detail_date box_frame-row">
          <span>拒绝原因</span>
          <span class="info_content">{{ info.checkRemark }}</span>
        </div>
      </div>
      <div class="home_detail_content">
        <div class="ruleForm">
          <div class="formItem box_frame-row">
            <span>姓名</span>
            <span class="info_content">{{ info.realName }}</span>
          </div>
          <div class="formItem box_frame-row" v-if="info.type == '1'">
            <span>任务名称</span>
            <span class="textEllipsis info_content">{{ info.taskName }}</span>
          </div>
          <div class="formItem box_frame-row">
            <span>项目组</span>
            <span class="textEllipsis info_content">{{ info.productName }}</span>
          </div>
          <div class="formItem box_frame-row">
            <span>{{ info.type == '1' ? '加班日期' : '休假日期' }}</span>
            <span class="info_content">{{ info.dateInfo }}</span>
          </div>
          <div class="formItem box_frame-row">
            <span>{{ info.type == '1' ? '加班时间' : '休假时间' }}</span>
            <span class="info_content">{{ info.timeInfo }}</span>
          </div>
          <div class="formItem box_frame-row" v-if="info.type == '2'">
            <span>工作交接</span>
            <span class="textEllipsis info_content">{{ info.taskName }}</span>
          </div>
          <div class="box_frame">
            <div class="formItem">
              <span>工作内容</span>
            </div>
            <div class="home_detail_workContent">
              {{ info.info }}
            </div>
          </div>
        </div>
      </div>
      <div class="home_detail_btn box_frame-row" v-show="ifAgreeBtn">
        <div class="refuse_btn" @click="routeItem('/MyApproveRefuse')">
          拒绝
        </div>
        <div class="agree_btn" @click="ApprovedConfirm">
          同意
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { checkTask } from '@/api/commission';

export default {
  name: 'ExtentionDetail',
  data() {
    return {
      info: {},
      navBg: false, // header背景色
      getdate: '加班时间有误，重新填写',
      ifAgreeBtn: false,
      title: '',
      ifRefuse: false,
    };
  },
  methods: {
    routeItem(path) {
      this.$router.push({
        path,
        query: {
          info: JSON.stringify(this.info),
        },
      });
    },
    ApprovedConfirm() {
      const obj = {
        // 'checkRemark': '',
        checkStatus: '1',
        checkType: this.info.type,
        id: this.info.id,
      };
      checkTask({ checkList: [obj] })
        .then((res) => {
          if (res.code === 200) {
            // console.log(res);
            this.$router.go(-1);
          }
        })
        .catch((err) => {
          console.log('checkTask err', err);
        });
    },
  },
  mounted() {
    this.info = JSON.parse(this.$route.query.info);
    console.log('this.info', this.info);
    if (this.info.status === '0' || this.info.status === '1') {
      this.ifRefuse = false;
    }
    if (this.$route.query.data === '1') {
      // 我的审核-历史审核跳转过来的
      this.title = '审批详情';
      this.ifAgreeBtn = true;
    }
    if (this.$route.query.data === '2') {
      this.title = '历史审批详情';
      this.ifAgreeBtn = false;
    }
    if (this.info.status === '-1' || this.info.status === '-2') {
      this.ifRefuse = true;
    }
  },
};
</script>
<style lang="less" scoped>
.home {
  font-size: @font15;
  color: @fontC4D4;
  font-weight: 500;
  .home_detail_date {
    margin-top: @mar16;
    padding: 40px;
    background: #ffffff;
    .info_content {
      font-weight: 700;
    }
  }
  .home_detail_content {
    margin-top: @mar16;
    background: #ffffff;
    padding: 8px 40px 32px 40px;
    .ruleForm {
      padding: 0;
      .formItem {
        margin-top: 28px;
        .textEllipsis {
          width: 70%;
          text-align: right;
        }
        .info_content {
          font-weight: 700;
        }
      }
      .home_detail_workContent {
        margin-top: 24px;
        padding: 20px;
        font-weight: 700;
        background: #f9fafc;
        border-radius: 4px;
        line-height: 32px;
      }
    }
  }
  .home_detail_btn {
    margin-top: 80px;
    padding: 0 @pad20;
    height: 100px;
    line-height: 100px;
    font-size: @font16;
    text-align: center;
    .refuse_btn,
    .agree_btn {
      width: 300px;
      border-radius: 20px;
    }
    .refuse_btn {
      margin-top: 0;
      border: 1px solid @fontC2F8;
      color: @fontC2F8;
      background: #ffffff;
    }
    .agree_btn {
      border: 1px solid @fontC2F8;
      color: #ffffff;
      background: @fontC2F8;
    }
  }
}
.change_btn {
  position: fixed;
  bottom: 0px;
  background-color: #f2f2f2;
  width: 100%;
  height: 3rem;
  display: flex;
  align-items: center;
  .sendBtn {
    width: 70%;
    color: #ffffff;
    height: 2rem;
    line-height: 2rem;
    background: #666666;
    border-radius: 0.5rem;
    margin: auto;
    text-align: center;
    font-size: 0.875rem;
  }
}
</style>

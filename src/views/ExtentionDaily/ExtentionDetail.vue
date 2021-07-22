<template>
  <div class="box">
    <nav-bar-top title="延时申请详情"></nav-bar-top>
    <div class="home" v-if="info">
      <div class="home_detail_date" v-if="info.remark">
        <span>拒绝原因：</span>
        <span>{{ info.remark }}</span>
      </div>
      <div class="home_detail_content">
        <div class="ruleForm">
          <div class="formItem box_frame-row">
            <span>项目组</span>
            <span class="item_content">{{ info.productName }}</span>
          </div>
          <div class="formItem box_frame-row">
            <span>任务</span>
            <span class="item_content textEllipsis">{{ info.taskName }}</span>
          </div>
          <div class="formItem box_frame-row">
            <span>申请日期</span>
            <span class="item_content">{{ info.workerDate }}</span>
          </div>
          <div class="formItem box_frame-row">
            <span>延时申请起始时间</span>
            <span class="item_content">{{ info.workerStartTime }}</span>
          </div>
          <div class="formItem box_frame-row">
            <span>延时申请截止时间</span>
            <span class="item_content">{{ info.workerEndTime }}</span>
          </div>
          <div class="box_frame">
            <div class="formItem">
              <span>工作内容</span>
            </div>
            <div class="home_detail_workContent">
              {{ info.workerInfo }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="change_btn">
          <div class="sendBtn" @click="changeBtn">修改延时申请</div>
        </div> -->
  </div>
</template>
<script>
import { getWorkLateDetail } from '@/api/user';

export default {
  name: 'ExtentionDetail',
  data() {
    return {
      info: {},
    };
  },
  methods: {
    getWorkLateDetail(id) {
      getWorkLateDetail(id)
        .then((res) => {
          this.info = res.data;
          console.log('getWorkLateDetail res', res);
        })
        .catch((err) => {
          console.log('getWorkLateDetail err', err);
        });
    },
    changeBtn() {
      this.show = false;
      this.$dialog.alert({
        message: '暂不开放延时申请修改页面！',
        confirmButtonText: '确定',
      });
    },
  },
  mounted() {
    const { id } = this.$route.query;
    this.getWorkLateDetail(id);
  },
};
</script>
<style lang="less" scoped>
.home {
  .home_detail_date {
    padding: 0.5rem;
    height: 2.5rem;
    line-height: 2.5rem;
    background: #ffffff;
    border-radius: 0.2rem;
  }
  .home_detail_content {
    margin-top: @mar16;
    background: #ffffff;
    padding: @pad20;
    .ruleForm {
      padding: 0;
      font-size: @font15;
      color: @fontC4D4;
      font-weight: 500;
      .formItem {
        margin-bottom: 28px;
        .item_content {
          font-weight: 700;
        }
        .textEllipsis {
          width: 70%;
          text-align: right;
        }
      }
      .home_detail_workContent {
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
</style>

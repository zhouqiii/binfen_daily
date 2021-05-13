<template>
    <div>
        <nav-bar-top title="审批详情" :navBg='navBg'></nav-bar-top>
        <div class="home">
            <div class="home_detail_content">
                <div class="ruleForm">
                    <div class="formItem box_frame-row">
                        <span>姓名</span>
                        <span>{{name}}</span>
                    </div>
                    <div class="formItem box_frame-row">
                        <span>任务</span>
                        <span class="textEllipsis" >{{commision}}</span>
                    </div>
                    <div class="formItem box_frame-row">
                        <span>项目组</span>
                        <span class="textEllipsis" >{{projectTeam}}</span>
                    </div>
                     <div class="formItem box_frame-row">
                        <span>申请日期</span>
                        <span>{{date}}</span>
                    </div>
                    <div class="formItem box_frame-row">
                        <span>延迟申请起始时间</span>
                        <span>{{workHourStart}}</span>
                    </div>
                    <div class="formItem box_frame-row">
                        <span>延迟申请截止时间</span>
                        <span>{{workHourEnd}}</span>
                    </div>
                    <div class="box_frame">
                        <div class="formItem">
                            <span>工作内容</span>
                        </div>
                        <div class="home_detail_workContent">
                            {{workContent}}
                        </div>
                    </div>
                </div>
            </div>
            <div class="home_detail_btn flex_around" v-show="ifAgreeBtn">
                <div class="approve_btn refuse" @click="routeItem('/MyApproveRefuse')">
                    拒绝
                </div>
                <div class="approve_btn agree" @click="routeItemCommi('Commission')">
                    同意
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'ExtentionDetail',
  data() {
    return {
      name: '小明',
      navBg: false, // header背景色
      getdate: '加班时间有误，重新填写',
      projectTeam: '缤纷生活',
      commision: '海外分行功能优化细化001-百姓对海外分行功能优化细化001',
      workHourStart: '6:30',
      workHourEnd: '6:30',
      workContent: '海外分行功能优化细化001-百姓对海外分行功能优化细化001',
      date: '2021-4-22',
      ifAgreeBtn: false,
    };
  },
  methods: {
    getInfo() {

    },
    routeItem(path) {
      this.$router.push(path);
    },
    routeItemCommi(path) {
      this.$router.push({
        name: path,
        params: { // 为了跳转到我的审核-未审核
          tabIndexGive: 1,
          activeGive: 1,

        },
      });
    },
  },
  mounted() {
    this.getInfo();
    if (this.$route.query.data === '1') { // 我的审核-已审核跳转过来的
      this.ifAgreeBtn = true;
    } if (this.$route.query.data === '2') {
      this.ifAgreeBtn = false;
    }
  },
};
</script>
<style lang="less" scoped>
.home{
    color: #605e5e;
    font-size: .875rem;
    padding: 3.4rem .5rem 4rem .5rem;
      .home_detail_date{
        padding: .5rem;
        height: 2.5rem;
        line-height: 2.5rem;
        background: #ffffff;
        border-radius: .2rem;
      }
     .home_detail_content{
        margin-top: .5rem;
        border-radius: .5rem;
        background: rgba(242, 242, 242, 1);
        padding: .5rem;
        .ruleForm{
            padding: 0;
            .formItem{
                height: 2.5rem;
                line-height: 2.5rem;
                .textEllipsis{
                    width: 70%;
                    text-align: right;
                }
            }
            .home_detail_workContent{
                width: 90%;
                margin: auto;
                line-height: 2rem;
            }
        }
    }
    .home_detail_btn{
        margin-top: 1rem;
        height: 3rem;
        line-height: 3rem;
        text-align: center;
        .approve_btn{
            width: 35%;
            border: 1px solid #5a5959;
            border-radius:.5rem;
        }
        .agree{
            background: rgba(102, 102, 102, 1);
            color: #ffffff;
        }
    }
}
.change_btn{
    position: fixed;
    bottom:0px;
    background-color: #f2f2f2;
    width: 100%;
    height: 3rem;
    display: flex;
    align-items: center;
    .sendBtn{
      width: 70%;
      color: #ffffff;
      height: 2rem;
      line-height: 2rem;
      background: #666666;
      border-radius:.5rem ;
      margin: auto;
      text-align: center;
      font-size: .875rem;

    }
  }
</style>

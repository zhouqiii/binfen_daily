<template>
    <div class="box">
        <nav-bar-top title="延迟申请详情"></nav-bar-top>
        <div class="home">
            <div class="home_detail_date box_frame-row">
                <span>申请日期</span>
                <span>{{getdate}}</span>
            </div>
            <div class="home_detail_content">
                <div class="ruleForm">
                    <div class="formItem box_frame-row">
                        <span>项目组</span>
                        <span>{{projectTeam}}</span>
                    </div>
                    <div class="formItem box_frame-row">
                        <span>任务</span>
                        <span class="textEllipsis" >{{commision}}</span>
                    </div>
                    <div class="formItem box_frame-row">
                        <span>起始时间</span>
                        <span>{{workHourStart}}</span>
                    </div>
                    <div class="formItem box_frame-row">
                        <span>截止时间</span>
                        <span>{{workHourEnd}}</span>
                    </div>
                    <div class="box_frame">
                        <div class="formItem">
                            <span>今日工作</span>
                        </div>
                        <div class="home_detail_workContent">
                            {{workContent}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="change_btn">
          <div class="sendBtn" @click="changeBtn">修改延迟申请</div>
        </div>
    </div>
</template>
<script>
import createDom from '@/utils/createDom';
import DialogMessage from '../../components/MyComponents/DialogMessage.vue';

export default {
  name: 'ExtentionDetail',
  data() {
    return {
      getdate: '4月25日',
      projectTeam: '缤纷生活',
      commision: '海外分行功能优化细化001-百姓对海外分行功能优化细化001',
      workHourStart: '6:30',
      workHourEnd: '6:30',
      workContent: '海外分行功能优化细化001-百姓对海外分行功能优化细化001',
    };
  },
  methods: {
    routeItem(path) {
      const obj = {};
      obj.projectTeam = this.projectTeam;
      obj.commision = this.commision;
      obj.workContent = this.workContent;
      obj.workHourEnd = this.workHourEnd;
      obj.workHourStart = this.workHourStart;
      this.$router.push({
        path,
        query: {
          date: JSON.stringify(this.getdate),
          data: JSON.stringify(obj),
        },
      });
    },
    changeBtn() {
      this.show = false;
      createDom(
        DialogMessage,
        {},
        {
          content: `<div style="text-align:center">暂不开放延迟申请修改页面！</div>
                    `,
          showBtn: false,
        },
      );
    },
  },
  mounted() {
    this.$login();
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
        background: #ffffff;
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
      width: 50%;
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

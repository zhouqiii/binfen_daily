<template>
    <div class="box">
        <nav-bar-top title="日报详情"></nav-bar-top>
        <div class="home">
            <div class="home_detail_date box_frame-row">
                <span>填写日期</span>
                <span>{{getdate}}</span>
            </div>
            <div class="home_detail_content" v-for="(item,index) in dayListInfo" :key="index">
                <div class="ruleForm">
                    <div class="formItem box_frame-row">
                        <span>任务</span>
                        <span class="textEllipsis" >{{item.taskName}}</span>
                    </div>
                    <div class="formItem box_frame-row">
                        <span>工时</span>
                        <span>{{item.workerLength}}小时</span>
                    </div>
                    <div class="box_frame">
                        <div class="formItem">
                            <span>今日工作</span>
                        </div>
                        <div class="home_detail_workContent">
                            {{item.workerInfo}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="change_btn">
          <div class="sendBtn" @click="routeItem('/ChangeDaily')">修改日报</div>
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
            this.dayListInfo = res.data;// 处理
          }
        })
        .catch(() => {
        });
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

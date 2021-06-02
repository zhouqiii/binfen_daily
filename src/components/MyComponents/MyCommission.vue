<template>
    <div>
        <!--我的任务-->
        <div class="mycommi">
            <van-tabs v-model="active" sticky class="tab_select">
                <van-tab title="待完成任务">
                  <div v-for="(item,index) in commiListFinish"
                      :key="index"
                      class="list_box"
                      v-show="ifCommiListFinish"
                      @click="routeItem('/CommissionDetail',item)"
                  >
                        <div class="item list_box_task">{{item.taskName}}</div>
                        <div class="item list_box_text box_frame-row">
                          <span class="spanNext">任务下达:{{item.date}}</span>
                          <span class="spanNext">功能测试版本:{{item.date}}</span>
                        </div>
                        <div class="item list_box_text box_frame-row">
                          <span class="spanNext">正式版本::{{item.date}}</span>
                          <span class="span">投产:{{item.date}}</span>
                        </div>
                        <div class="item list_box_text box_frame-row">
                          <span>批次:{{item.batch}}</span>
                          <span :class="{
                              dangerLow:item.lever===1,
                              dangerHigh:item.lever===3,
                              dangerCen:item.lever===2
                              }" class="span">风险:{{item.risk}}
                          </span>
                        </div>
                    </div>
                  <div v-show="!ifCommiListFinish" class="home_noContent">
                    <div class="home_noContent_box">
                      <img src="../../assets/icons/noDelayDaily.png"/>
                      <div>暂没有任务哦，请尽快联系项目经理分配任务</div>
                    </div>
                  </div>
                </van-tab>
                <van-tab title="已完成任务">
                  <div v-for="(item,index) in commiListUnFinish"
                    :key="index" class="list_box"
                    v-show="ifCommiListUnFinish"
                  >
                    <div class="item list_box_task">{{item.taskName}}</div>
                    <div class="item list_box_text box_frame-row">
                      <span class="spanNext">任务下达:{{item.date}}</span>
                      <span class="spanNext">功能测试版本:{{item.date}}</span>
                    </div>
                    <div class="item list_box_text box_frame-row">
                      <span class="spanNext">正式版本::{{item.date}}</span>
                      <span class="span">投产:{{item.date}}</span>
                    </div>
                    <div class="item list_box_text box_frame-row">
                      <span>批次:{{item.batch}}</span>
                      <span :class="{
                          dangerLow:item.lever===1,
                          dangerHigh:item.lever===3,
                          dangerCen:item.lever===2
                          }" class="span">风险:{{item.risk}}
                      </span>
                    </div>
                  </div>
                  <div v-show="!ifCommiListUnFinish" class="home_noContent">
                    <div class="home_noContent_box">
                      <img src="../../assets/icons/noDelayDaily.png"/>
                      <div>没有已完成的任务，继续加油哦~</div>
                    </div>
                  </div>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>
<script>

export default {
  name: 'MyCommission',
  data() {
    return {
      active: 0,
      ifCommiListFinish: true, // 待完成列表是否有数据
      ifCommiListUnFinish: true, // 已完成列表是否有数据
      commiListFinish: [{
        taskName: '海外分行功能优化细化001-百姓对账 APP', batch: 'X16', type: '项目类', risk: '无', date: '2021.04.02', lever: 0,
      }, {
        taskName: '海外分行功能优化细化001-百姓对账 APP', batch: 'X17', type: '项目类', risk: '中', date: '2021.05.02', lever: 2,
      }, {
        taskName: '海外分行功能优化细化001-百姓对账 APP', batch: 'X16', type: '项目类', risk: '低', date: '2021.04.02', lever: 1,
      }, {
        taskName: '海外分行功能优化细化001-百姓对账 APP', batch: 'X17', type: '项目类', risk: '高', date: '2021.05.02', lever: 3,
      }, {
        taskName: '海外分行功能优化细化001-百姓对账 APP', batch: 'X16', type: '项目类', risk: '无', date: '2021.04.02', lever: 0,
      }],
      commiListUnFinish: [{
        taskName: '海外分行功能优化细化001-百姓对账 APP', batch: 'X17', type: '项目类', risk: '中', date: '2021.05.02', lever: 2,
      }, {
        taskName: '海外分行功能优化细化001-百姓对账 APP', batch: 'X16', type: '项目类', risk: '无', date: '2021.04.02', lever: 0,
      }],
    };
  },
  methods: {
    routeItem(path, val) {
      if (val) {
        this.$router.push({
          path,
          query: {
            data: JSON.stringify(val),
          },
        });
      } else {
        this.$router.push(path);
      }
    },
  },
};
</script>
<style lang="less" >
.mycommi{
padding-bottom: 5.5rem;
font-size: .8rem;
}
    .van-tabs__wrap{
      border-bottom: 1px solid #cccccc;
    }
    .van-tabs__nav{
        background: inherit;
         .van-tab{
            color: #999999;
        }
        .van-tabs__line{
            width: 5rem;
            background-color: #333333;
        }
        .van-tab--active{
            color: black;
        }
    }
    .van-tabs__content{
        height: 23rem;
        overflow-y: hidden;
        .van-tab__pane{
            height: 100%;
            overflow-y: auto;
            padding-bottom: 1rem;
        }
    }
    .list_box{
        background: rgba(242, 242, 242, 1);
        border-radius: .2rem;
        margin-top: .5rem;
        padding: .5rem;
        .item{
            height: 1.5rem;
            line-height: 1.5rem;
        }
        .list_box_task{
            font-size: 1rem;
        }
        .list_box_text{
            font-size: .8rem;
            padding: 0 .5rem;
            color: #999999;
            .dangerLow{
              color: #FFCC00;
            }
            .dangerHigh{
              color: red;
            }
            .dangerCen{
              color:blue
            }
            .spanNext{
                width: 50%;
            }
            .span{
              width: 35%;
            }
        }
    }
    .home_noContent{
      .home_noContent_box{
          padding: 20% 0;
          text-align: center;
          font-size: .8rem;
          img{
              margin-bottom: 5%;
          }

      }
    }

</style>

<template>
    <div>
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh"
        style="min-height:100%;"
      >
        <!--下拉提示-->
        <template #pulling="props">
          <svg-icon iconClass="Loading"
          :style="{ transform: `scale(${props.distance / 80})` }"
          ></svg-icon>
          <span class="refresh_text">加载</span>
        </template>
        <!-- 释放提示 -->
        <template #loosing>
          <svg-icon iconClass="Loading"></svg-icon>
          <span class="refresh_text">加载</span>
        </template>
          <!-- 加载提示 -->
        <template #loading>
          <svg-icon iconClass="shuaxin"></svg-icon>
          <span class="refresh_text">刷新</span>
        </template>
        <!--我的任务-->
        <div class="mycommi" v-show="ifCommiListFinish">
          <!-- <van-tabs v-model="active" sticky class="tab_select">
              <van-tab title="待完成任务"> -->
          <van-checkbox-group v-model="result" icon-size="25" ref="checkboxGroup"
            @change="getCheckIndex"
            class="checkBoxGroup"
          >
            <div v-for="(item,index) in commiListFinish" :key="index" class="box_frame-row">
              <div class="checkBoxSel" v-show="showDelete">
                <van-checkbox :name="item.id" @></van-checkbox>
              </div>
              <div class="list_box" @click="routeItem('/CommissionDetail',item)">
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
            </div>
          </van-checkbox-group>
          <!--删除全选-->
          <div class="home_del" v-show="showDelete">
            <div class="box_frame-row">
              <div class="delcheck"  @click="checkAllBtn">
                <van-checkbox icon-size="25" v-model="checkedAll">全选</van-checkbox>
              </div>
              <div class="del">删除</div>
            </div>
          </div>
                <!-- </van-tab>
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
            </van-tabs> -->
        </div>
      </van-pull-refresh>
      <div v-show="!ifCommiListFinish" class="home_noContent">
        <div class="home_noContent_box">
          <img src="../../assets/icons/noDelayDaily.png"/>
          <div v-show="routeGuide==='0'">暂没有任务哦，请尽快联系项目经理分配任务</div>
          <div v-show="routeGuide==='1'">没有已完成的任务，继续加油哦~</div>
        </div>
      </div>
    </div>
</template>
<script>

export default {
  name: 'MyCommission',
  props: ['data', 'routeGuide', 'showDelete'],
  data() {
    return {
      active: 0,
      ifCommiListFinish: true, // 待完成列表是否有数据
      commiListFinish: [],
      show: '',
      result: [],
      checkedAll: false,
      isLoading: false,
    };
  },
  methods: {
    routeItem(path, val) {
      if (val) {
        this.$router.push({
          path,
          query: {
            data: JSON.stringify(val),
            id: JSON.stringify(this.routeGuide),
          },
        });
      } else {
        this.$router.push(path);
      }
    },
    // 删除框选择改变时触发
    getCheckIndex() {
      this.checkedAll = (this.result.length === this.commiListFinish.length);
    },
    // 全选框
    checkAllBtn() {
      if (this.checkedAll) {
        this.$refs.checkboxGroup.toggleAll(false);
      } else {
        this.$refs.checkboxGroup.toggleAll(true);
      }
    },
    // onRefresh刷新列表异步获取数据
    onRefresh() {
      this.isLoading = true;
      setTimeout(() => {
        console.log('refresh');
        this.isLoading = false;
      }, 1000);
    },
  },
  created() {
    this.$nextTick(() => {
      this.commiListFinish = this.data;
    });
  },
  watch: {
    showDelete(newVal) {
      this.show = newVal;
    },
    commiListFinish(newval) {
      if (newval.length === 0) {
        this.ifCommiListFinish = false;
      } else {
        this.ifCommiListFinish = true;
      }
    },
  },
};
</script>
<style lang="less" >
.mycommi{
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
    .checkBoxGroup{
      .van-checkbox__icon--checked .van-icon{
          color: inherit;
          background-color: #ffffff;
          border-color: inherit;
      }
      .van-checkbox__icon .van-icon{
          background: #ffffff;
      }
      .checkBoxSel{
        margin-right: 10px;
      }
      .list_box{
        background: rgba(242, 242, 242, 1);
        border-radius: .2rem;
        margin-top: .5rem;
        padding: .5rem;
        width: 100%;
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
    }
    .home_del{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3rem;
    z-index: 105;
    background: #f2f2f2;
    line-height: 3rem;
    font-size: .9rem;
    .box_frame-row{
        align-items: center;
        .delcheck{
            margin-left: 20px;
        }
        .del{
            margin-right: 20px;
        }
        .van-checkbox__icon--checked .van-icon{
            color: inherit;
            background-color: #ffffff;
            border-color: inherit;
        }
        .van-checkbox__icon .van-icon{
            background: #ffffff;
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

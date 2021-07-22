<template>
  <div style="height:100%">
    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
      class="refresh_box"
      v-show="ifCommiListFinish"
      style="height:100%"
    >
      <!--下拉提示-->
      <template #pulling="props">
        <svg-icon
          iconClass="Loading"
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
      <!--任务-->
      <div class="mycommi">
        <van-checkbox-group
          v-model="result"
          icon-size="18"
          ref="checkboxGroup"
          @change="getCheckIndex"
          class="checkBoxGroup"
        >
          <div v-for="(item, index) in dataList" :key="index" class="box_frame-row">
            <div class="checkBoxSel" v-show="showDelete">
              <van-checkbox :name="item.id" @></van-checkbox>
            </div>
            <div class="list_box" @click="routeItem('/CommissionDetail', item)">
              <div class="item list_box_task">
                <div class="name">{{ item.taskName }}</div>
                <div class="danger flex_center" :class="dangerClass(item.dangerType)">
                  <!-- <span class="dangerLow" v-if="item.dangerType == '0'">风险:无</span>
                  <span class="dangerLow" v-if="item.dangerType == '1'">风险:低</span>
                  <span class="dangerCen" v-if="item.dangerType == '2'">风险:中</span>
                  <span class="dangerHigh" v-if="item.dangerType == '3'">风险:高</span> -->
                  <!-- <danger v-if="item.dangerType" :classNa="dangerClass(item.dangerType)">{{
                    cache[item.dangerType].text
                  }}</danger> -->
                  <span v-if="item.dangerType">{{ cache[item.dangerType].text }}</span>
                </div>
              </div>
              <div class="item list_box_text box_frame-row">
                <span class="spanNext">任务下达:{{ item.taskStartDate }}</span>
                <span class="spanNext">功能测试版本:{{ item.uatUpDate }}</span>
              </div>
              <div class="item list_box_text box_frame-row">
                <span class="spanNext">正式版本:{{ item.productionUpDate }}</span>
                <span class="span">投产:{{ item.productionOnlineDate }}</span>
              </div>
              <div class="item list_box_text box_frame-row">
                <span>批次:{{ item.batchNo }}</span>
              </div>
            </div>
          </div>
        </van-checkbox-group>
        <!--删除全选-->
        <div class="home_del" v-show="showDelete">
          <div class="box_frame-row">
            <div class="delcheck" @click="checkAllBtn">
              <van-checkbox icon-size="25" v-model="checkedAll">全选</van-checkbox>
            </div>
            <div class="del" @click="delList">删除</div>
          </div>
        </div>
      </div>
    </van-pull-refresh>
    <div v-show="!ifCommiListFinish" class="home_noContent">
      <div class="home_noContent_box">
        <img src="../../assets/imgs/page/nocommission_page.png" />
        <div v-show="routeGuide === '0'">暂没有任务哦，请尽快联系项目经理分配任务</div>
        <div v-show="routeGuide === '1'">没有已完成的任务，继续加油哦~</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MyCommission',
  props: ['dataList', 'routeGuide', 'showDelete'],
  components: {
    // danger: {
    //   render(h) {
    //     return h('span', { attrs: { class: this.classNa } }, this.$slots.default);
    //   },
    //   props: {
    //     classNa: {
    //       type: String,
    //       required: true,
    //     },
    //   },
    // },
  },
  data() {
    return {
      active: 0,
      ifCommiListFinish: true, // 待完成列表是否有数据
      show: '',
      result: [],
      checkedAll: false,
      isLoading: false,
      cache: {
        0: { classNa: 'dangerNone', text: '风险无' },
        1: { classNa: 'dangerLow', text: '风险低' },
        2: { classNa: 'dangerCen', text: '风险中' },
        3: { classNa: 'dangerHigh', text: '风险高' },
        99: { classNa: 'none', text: '' },
      },
    };
  },
  methods: {
    // 判断风险文字及背景颜色
    dangerClass(dangerType) {
      if (!dangerType) {
        return this.cache['99'].classNa;
      }
      return this.cache[dangerType].classNa;
    },
    routeItem(path, val) {
      if (val) {
        this.$router.push({
          path,
          query: {
            id: val.taskId,
            type: JSON.stringify(this.routeGuide),
          },
        });
      } else {
        this.$router.push(path);
      }
    },
    // 删除框选择改变时触发
    getCheckIndex() {
      this.checkedAll = this.result.length === this.dataList.length;
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
        this.isLoading = false;
        this.$emit('refreshList');
      }, 1000);
    },
    // 删除
    delList() {
      this.$emit('deleteTask', this.result);
    },
  },
  created() {
    // this.$nextTick(() => {
    // });
  },
  watch: {
    showDelete(newVal) {
      this.show = newVal;
    },
    dataList(newval) {
      if (newval.length === 0) {
        this.ifCommiListFinish = false;
      } else {
        this.ifCommiListFinish = true;
      }
    },
  },
};
</script>
<style lang="less">
.mycommi {
  font-size: 0.8rem;
}
.van-tabs__wrap {
  border-bottom: 1px solid #cccccc;
}
.van-tabs__nav {
  background: inherit;
  .van-tab {
    color: #999999;
  }
  .van-tabs__line {
    width: 5rem;
    background-color: #333333;
  }
  .van-tab--active {
    color: black;
  }
}
.van-tabs__content {
  height: 23rem;
  overflow-y: hidden;
  .van-tab__pane {
    height: 100%;
    overflow-y: auto;
    padding-bottom: 1rem;
  }
}
.checkBoxGroup {
  .van-checkbox__icon--checked .van-icon {
    color: inherit;
    background-color: #ffffff;
    border-color: inherit;
  }
  .van-checkbox__icon .van-icon {
    background: #ffffff;
  }
  .checkBoxSel {
    margin-right: 10px;
  }
  .list_box {
    border-radius: 0.2rem;
    margin-top: 1rem;
    padding: @pad16 @pad20 0 @pad20;
    width: 100%;
    background: #fff;
    .item {
      // height: 1.7rem;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      .name {
        font-size: 32px;
        color: #333333;
        font-weight: 700;
        flex: 0 0 486px;
      }
      .danger {
        flex: 0 0 116px;
        height: 44px;
        border-radius: 36px;
        span {
          font-size: 20px;
          font-weight: 700;
        }
      }
    }
    .list_box_task {
      font-size: 1rem;
      .dangerNone {
        color: #219653;
        background: rgba(36, 151, 86, 0.2);
      }
      .dangerLow {
        color: #f2994a;
        background: rgba(242, 153, 74, 0.2);
      }
      .dangerHigh {
        color: #f56c6c;
        background: rgb(250, 181, 181, 0.2);
      }
      .dangerCen {
        color: #8896b3;
        background: rgb(195, 202, 217, 0.2);
      }
      .spanNext {
        width: 50%;
      }
      .span {
        width: 35%;
      }
    }
    .list_box_text {
      font-size: 26px;
      margin: 20px 0;
      font-weight: 500;
      color: @fontC82;
    }
  }
}
.home_del {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3rem;
  z-index: 105;
  background: #f2f2f2;
  line-height: 3rem;
  font-size: 0.9rem;
  .box_frame-row {
    align-items: center;
    .delcheck {
      margin-left: 20px;
    }
    .del {
      margin-right: 20px;
    }
    .van-checkbox__icon--checked .van-icon {
      color: inherit;
      background-color: #ffffff;
      border-color: inherit;
    }
    .van-checkbox__icon .van-icon {
      background: #ffffff;
    }
  }
}
.home_noContent {
  .home_noContent_box {
    padding: 40% 0;
    text-align: center;
    font-size: 0.8rem;
    img {
      margin-bottom: 5%;
    }
  }
}
</style>

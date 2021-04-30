<template>
    <div class="box">
        <nav-bar-top title="日报" @rightClick="showTime">
            <template v-slot:right>
                <svg-icon iconClass="timelou"></svg-icon>
            </template>
        </nav-bar-top>
        <div class="home">
            <!--刷新部分只为日报列表-->
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
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
              <!--日报列表-->
              <div class="home_padd">
                <div v-for="(item,index) in commiList" :key="index" class="daily_seebox"
                    @click="routeItem('/DailyDetail',index)"
                >
                    <div class="daily_seedate"> {{item.workDate}} {{item.time}}</div>
                    <div class="daily_seecontent">
                        <div class="box_frame-row">
                            <span class="daily_seecontent_week" >填报日期:{{item.workDate}}</span>
                            <span class="daily_seecontent_state">{{item.status}}</span>
                        </div>
                        <!-- <div class="date"><span>{{item.date}}</span></div> -->
                        <div class="text textEllipsis" style="width:90%">任务：{{item.taskName}}</div>
                        <div class="text textEllipsis" style="width:90%">
                          今日工作：{{item.workerInfo}}
                        </div>
                    </div>
                </div>
              </div>
            </van-pull-refresh>
            <!--右侧弹出层-->
            <div class="home_pop">
                <van-popup v-model="show" position="right"
                    :style="{ width: '80%',height:'100%',background:'#d3d3d3' }"
                    get-container=".contentBox"
                >
                 <!--弹出层挂载的节点-->
                <div class="contentBox">
                    <div class="ruleForm">
                        <div class="formItem">
                            <van-field
                                v-model="startDate"
                                is-link
                                readonly
                                label="开始时间"
                                placeholder="请选择"
                                @click="startTimePop = true"
                            />
                            <van-popup v-model="startTimePop" position="bottom">
                                <van-datetime-picker
                                    v-model="currentDate"
                                    type="date"
                                    :max-date="maxDate"
                                    title=" "
                                    @cancel='startTimePop = false'
                                    @confirm='onConfirmStartTime'
                                />
                            </van-popup>
                        </div>
                        <div class="formItem">
                            <van-field
                                v-model="endDate"
                                is-link
                                readonly
                                label="结束时间"
                                placeholder="请选择"
                                @click="endTimePop = true"
                            />
                            <van-popup v-model="endTimePop" position="bottom">
                                <van-datetime-picker
                                    v-model="currentDateEnd"
                                    type="date"
                                    :max-date="maxDate"
                                    title=" "
                                    @cancel='endTimePop = false'
                                    @confirm='onConfirmEndTime'
                                />
                            </van-popup>
                        </div>
                    </div>
                    <div class="timeSelect_btn flex_evenly">
                        <div class="timeSelect_btn_cancel" @click="show=false">取消</div>
                        <div class="timeSelect_btn_confirm" @click="getSelectComm">确认</div>
                    </div>
                </div>
                </van-popup>
            </div>
            <!--固定的编辑图标-->
            <div class="home_edit box_frame">
                <div><svg-icon iconClass="bu" @click="routeItem('/WriteDaily')"></svg-icon></div>
                <!-- <div><svg-icon iconClass="xie"></svg-icon></div> -->
            </div>
        </div>
    </div>
</template>
<script>
import SvgIcon from '../../components/SvgIcon.vue';

let count = 0;
let startTimeCheck = '';
let endTimeCheck = '';
export default {
  components: { SvgIcon },
  name: 'SeeDaily',
  data() {
    return {
      commiList: [],
      isLoading: false,
      show: false, // 右侧弹出框
      startDate: '', // 开始时间
      endDate: '', // 结束时间
      currentDate: new Date(),
      currentDateEnd: new Date(),
      maxDate: new Date(),
      startTimePop: false, // 开始时间弹出框
      endTimePop: false, // 结束时间弹出框
    };
  },
  methods: {
    // 获取列表数据
    getListData(start, end) {
      count += 1;
      this.requestAxios({
        url: '/api/workDaily/getListByPage',
        data: {
          pageNum: count,
          pageSize: 5,
          startDate: start,
          endDate: end,
        },
        method: 'post',
      })
        .then((res) => {
          if (res.data.list) {
            Array.prototype.forEach.call(res.data.list, (item) => {
              if (item.status === '0') {
                this.$set(item, 'status', '已提交');
              }
              if (item.workDate) {
                this.$set(item, 'workDate', this.formatDateShow(item.workDate));
              }
              this.commiList.push(item);
            });
          }
        })
        .catch(() => {

        });
    },
    // 显示弹框
    showTime() {
      this.show = true;
    },
    // 格式化日期
    formatDateSend(val) { // 将中国标准时间格式化时间为2019-05-04的格式
      const month = (parseInt(val.getMonth() + 1, 10)) < 10 ? `0${val.getMonth() + 1}` : (val.getMonth() + 1);
      const day = (parseInt(val.getDate(), 10)) < 10 ? `0${val.getDate()}` : (val.getDate());
      const year = new Date().getFullYear();
      return `${year}-${month}-${day}`;
    },
    // 格式化日期
    formatDateShow(val) { // 将时间2019-05-04格式化为2019年5月4日的格式
      const value = val.split('-');
      // const today = this.formatDateSend(new Date());
      // if (today === val) {
      //   return '今天';
      // }
      return `${value[0]}年${value[1]}月${value[2]}日`;
    },
    // 开始时间确定按钮
    onConfirmStartTime(date) {
      this.startTimePop = false;
      this.startDate = `${this.formatDateSend(date)}`;
    },
    // 结束时间确定按钮
    onConfirmEndTime(date) {
      this.endTimePop = false;
      this.endDate = `${this.formatDateSend(date)}`;
    },
    // 通过时间筛选看日报列表
    getSelectComm() {
      this.show = false;
      this.resetParams(this.startDate, this.endDate);
      this.commiList = [];
    },
    // onRefresh刷新列表异步获取数据
    onRefresh() {
      setTimeout(() => {
        this.commiList = [];
        count = 0;// 重新分页，把count重设为0
        this.isLoading = false;
        this.resetParams('', '');
      }, 1000);
    },
    // 封装重置参数，并且在一次调用参数
    resetParams(start, end) {
      count = 0;// 重新分页，把count重设为0
      startTimeCheck = start;// 重设全局时间
      endTimeCheck = end;
      this.getListData(startTimeCheck, endTimeCheck);
    },
    // 去写页面
    routeItem(path, val) {
      if (val >= 0) {
        this.$router.push({
          path,
          query: {
            id: JSON.stringify(this.commiList[val].id), // 携带id给日报详情页面，详情页面根据id查接口数据
            date: JSON.stringify(this.commiList[val].workDate), // 用来存该日报日期，带给详情页面，因为我看详情的接口没有date
          },
        });
      } else {
        this.$router.push(path);
      }
    },
    // 页面滚动到底部，触发的事件--加载下一页日报数据
    handleScroll() {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      // windowHeight 可视区的高度
      const windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
      // scrollHeight 滚动条的总高度
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      // 滚动条到底部的条件
      if (Math.ceil(scrollTop) + windowHeight === scrollHeight) {
        // 加载数据
        // that.loadMore();
        this.getListData(startTimeCheck, endTimeCheck);
      }
    },
  },
  created() {
  },
  // 清除监听的滚动事件
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll, true);
  },
  mounted() {
    this.$login();
    this.resetParams('', '');
    window.addEventListener('scroll', this.handleScroll, true);
  },
};
</script>
<style lang="less" scoped>
.home_padd{
    .daily_seebox{
        padding-top: 2rem;
        .daily_seedate{
            height: 2rem;
            line-height: 2rem;
            font-size: .9rem;
            font-weight: 400;
        }
        .daily_seecontent{
            background: #ffffff;
            margin-left:.9rem;
            margin-right: .5rem;
            padding: .5rem .5rem 1.2rem .9rem;
            border-radius:1rem;
            .box_frame-row{
                height: 2rem;
                line-height: 2rem;
                .daily_seecontent_week{
                    font-size: 1rem;
                }
                .daily_seecontent_state{
                    font-size: .9rem;
                    color: #858585;
                }
            }
            .date{
                line-height: 1.5rem;
                height: 1.5rem;
                font-size: .7rem;
                color: black;
            }
            .text{
                line-height: 1.5rem;
                height: 1.5rem;
                font-size: .8rem;
                color: #5a5959;
            }
        }
    }
}
.home_pop{
    .contentBox{
        padding-top: 1rem;
        .ruleForm{
            background: #ffffff;
        }
        .timeSelect_btn{
            margin-top: 6rem;
            height: 2rem;
            line-height: 2rem;
            width: 100%;
            font-size: .875rem;
            text-align: center;
            .timeSelect_btn_cancel{
                width: 30%;
                color: inherit;
                background: #ffffff;
                border-radius:10% ;
            }
            .timeSelect_btn_confirm{
                width: 30%;
                background: #0099ff;
                color: #ffffff;
                border-radius:10% ;
            }
        }
    }
}
.home_edit{
    position: fixed;
    right: 0;
    top: 50%;
    width: 12%;
    text-align: center;
    div{
         margin-top: .5rem;
         width: 2.4rem;
         height: 2.4rem;
         line-height: 2.4rem;
         background: #ffffff;
         -moz-border-radius: 1.2rem;
         -webkit-border-radius: 1.2rem;
         border-radius: 12rem;
         border: 1px solid #333333;
    }

}
.refresh_text{
    margin-left: .5rem;
    color: #333333;
}
.van-cell{
    line-height: 3rem;
    height: 3rem;
}
.van-cell__right-icon{
    height: 3rem;
    line-height: 3rem;
}
</style>

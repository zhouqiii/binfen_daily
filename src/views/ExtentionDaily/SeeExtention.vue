<template>
    <div class="box">
        <nav-bar-top title="延迟申请" @rightClick="showTime">
            <template v-slot:right>
                <svg-icon iconClass="timelou"></svg-icon>
            </template>
        </nav-bar-top>
        <div class="home">
            <!--刷新部分只为申请列表-->
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
              <!--延迟申请列表-->
              <div class="home_padd">
                <div v-for="(item,index) in commiList" :key="index" class="daily_seebox"
                    @click="routeItem('/ExtentionDetail')"
                >
                    <div class="daily_seedate">{{item.date}} {{item.time}}</div>
                    <div class="daily_seecontent">
                        <div class="box_frame-row">
                            <span class="daily_seecontent_week">填报日期：{{item.date}}</span>
                            <span class="daily_seecontent_state">{{item.state}}</span>
                        </div>
                        <!-- <div class="date"><span>{{item.date}}</span></div> -->
                        <div class="text">申请延迟日期：{{item.date}}</div>
                        <div class="text">加班时段：{{item.time}}</div>
                        <div class="text">任务：{{item.commision}}</div>
                         <div class="text content">工作内容：{{item.work}}</div>
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
                                    v-model="currentDate"
                                    type="date"
                                    :max-date="maxDate"
                                    title=" "
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
                <div>
                  <svg-icon iconClass="bu" @click="routeItem('/WriteExtention')"></svg-icon>
                </div>
                <!-- <div><svg-icon iconClass="xie"></svg-icon></div> -->
            </div>
        </div>
    </div>
</template>
<script>
import createDom from '@/utils/createDom';
import SvgIcon from '../../components/SvgIcon.vue';
import DialogMessage from '../../components/MyComponents/DialogMessage.vue';

export default {
  components: { SvgIcon },
  name: 'SeeExtention',
  data() {
    return {
      commiList: [{
        week: '星期三', time: '7:30', date: '4月21日', state: '已提交', commision: '海外分行功能姓对', work: '2.X16 乘车乘车码原原型设计',
      }, {
        week: '星期四', time: '7:30', date: '4月21日', state: '已提交', commision: '海外分行功能优化细化001-百姓', work: '2.X16 乘车乘车码原型设计3码原型设计3.X16 乘车码原型设计',
      }, {
        week: '星期五', time: '7:30', date: '4月21日', state: '已提交', commision: '海外分行功能优化细化001-百姓', work: '2.X16 乘车乘车码原型设计3码原型设计3.X16 乘车码原型设计',
      }, {
        week: '星期五', time: '7:30', date: '4月21日', state: '已提交', commision: '海外分行功能优化细化001-百姓', work: '2.X16 乘车乘车码原型设计3码原型设计3.X16 乘车码原型设计',
      }],
      isLoading: false,
      show: false, // 右侧弹出框
      startDate: '', // 开始时间
      endDate: '', // 结束时间
      currentDate: new Date(),
      maxDate: new Date(),
      startTimePop: false, // 开始时间弹出框
      endTimePop: false, // 结束时间弹出框
    };
  },
  methods: {

    showTime() {
      this.show = true;
    },
    formatDate(date) { // 格式化身份张有效期时间为2019/05/04的格式
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    },
    // 开始时间确定按钮
    onConfirmStartTime(date) {
      this.startTimePop = false;
      this.startDate = `${this.formatDate(date)}`;
    },
    // 结束时间确定按钮
    onConfirmEndTime(date) {
      this.endTimePop = false;
      this.endDate = `${this.formatDate(date)}`;
    },
    // 通过时间筛选看日报列表
    getSelectComm() {
      this.show = false;
      createDom(
        DialogMessage,
        {},
        {
          content: `<div style="text-align:center">暂未开放查询延迟申请！</div>
                    `,
          showBtn: false,
        },
      );
    },
    // onRefresh刷新列表异步获取数据
    onRefresh() {
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    },
    // 去写页面
    routeItem(path) {
      this.$router.push(path);
    },
  },
  mounted() {
    this.$login();
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
            .content{
                 overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
                width: 80%;
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

<template>
  <div>
    <!-- <nav-bar-top title="首页" :navIcon="navIcon"></nav-bar-top> -->
    <nav-bar-bottom></nav-bar-bottom>
    <div class="homeRoot">
      <div class="top">
        <div class="title">首页</div>
        <div class="bg"></div>
      </div>
      <div class="home_padd">
        <div class="home_select box_frame-row">
          <div @click="routeItem('/WriteDaily')">
            <img src="../assets/imgs/home/hm_daily@2x.png" alt="图片加载失败" />
          </div>
          <div @click="routeItem('/WriteExtention')">
            <img src="../assets/imgs/home/hm_rest@2x.png" alt="图片加载失败" />
          </div>
          <div @click="routeItem('/WriteVacation')">
            <img src="../assets/imgs/home/hm_delay@2x.png" alt="图片加载失败" />
          </div>
        </div>
        <div class="news textscroll">
          <span class="notice">公告</span>
          <div class="notice_text">
            <text-scroll :dataList="textList"></text-scroll>
          </div>
        </div>
      </div>
      <!--请假列表-->
      <div class="home_vacation">
        <div class="vacation_title">今日请假</div>
        <div class="vacation_info">
          <van-list :finished="finished" finished-text="没有更多了">
            <van-cell v-for="(item, index) in vacationList" :key="index">
              <template #title>
                <div class="info_content box_frame-row">
                  <div style="display:flex">
                    <span class="content_name">
                      {{ item.realName }}
                    </span>
                    <span class="content_time">
                      {{ item.vacationStartTime }}-{{ item.vacationEndTime }}
                    </span>
                  </div>
                  <van-tag type="primary" plain>
                    <span v-if="item.vacationType == '0'">年假</span>
                    <span v-if="item.vacationType == '1'">事假</span>
                    <span v-if="item.vacationType == '2'">婚假</span>
                    <span v-if="item.vacationType == '3'">产假</span>
                    <span v-if="item.vacationType == '4'">陪产假</span>
                    <span v-if="item.vacationType == '5'">病假</span>
                    <span v-if="item.vacationType == '6'">丧假</span>
                  </van-tag>
                </div>
              </template>
            </van-cell>
            <div class="info_end" v-if="showEnd">-没有更多了-</div>
          </van-list>
        </div>
      </div>
      <!-- <div class="home_news">
        <div class="news filedown">
          <div class="downMark box_frame-row">
            <span>文档</span>
            <div>
              <svg-icon iconClass="right" style="width: 1rem; height: 1rem"></svg-icon>
            </div>
          </div>
          <div>
            <div
              class="fileItem flex-rowSvg"
              v-for="(item, index) in fileList"
              :key="index"
              @click="downloadBtn(item.content, item.title)"
            >
              <div><img src="../assets/icons/word.png" /></div>
              <div class="box_frame">
                <span class="textEllipsis">{{ item.title }}</span>
                <span class="upTime">{{ item.time }}上传</span>
              </div>
            </div>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>
<script>
import TextScroll from '../components/MyComponents/TextScroll.vue';
import pic from '../assets/icons/swiper.png';
import { getVacationList } from '../api/homelist';

export default {
  components: { TextScroll },
  name: 'Home',
  data() {
    return {
      type: '0',
      navIcon: false,
      image: [pic, pic],
      loading: false,
      finished: false,
      vacationList: [],
      showEnd: false,
      textList: [
        '通知！关于公司内部沟通平台统一迁移至企业微信',
        '通知！关于公司个人疫苗接种登记信息消息',
      ],
      fileList: [
        {
          title: 'X16需求说明X16需求说明X16需求说明X16需求说明X16需求说明',
          time: '2020.6.1',
          content: '测试下载:X16文档内容',
        },
        {
          title: 'X17需求说明',
          time: '2021.2.10',
          content: '测试下载:X17文档内容1',
        },
        {
          title: 'X17需求说明',
          time: '2021.2.10',
          content: '测试下载:X17文档内容2',
        },
      ],
    };
  },
  methods: {
    // 获取请假列表
    getVacationList() {
      getVacationList().then((res) => {
        this.vacationList = res.data;
        this.showEnd = true;
      });
    },
    routeItem(path) {
      this.$router.push(path);
    },
    downloadBtn(content, title) {
      this.downloadFile(content, `${title}.doc`);
    },
    downloadFile(content, filename) {
      // content一般就是后台给的下载地址,filename是下载的文件名
      // 字符内容转变成blob地址
      const blob = new Blob([content], {
        type: 'application/msword;charset=utf-8',
      }); // .txt:{type: "text/plain;charset=utf-8"});
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blob, filename);
      } else {
        // for Non-IE
        const eleLink = document.createElement('a');
        eleLink.href = URL.createObjectURL(blob);
        eleLink.setAttribute('download', filename); // eleLink.download = filename;
        eleLink.style.display = 'none';
        document.body.appendChild(eleLink);
        eleLink.click();
        window.URL.revokeObjectURL(eleLink);
      }
    },
  },
  mounted() {
    this.getVacationList();
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll, true);
  },
};
</script>
<style lang="less" scoped>
.homeRoot {
  .top {
    .title,
    .bg {
      background: #2f80ed;
    }
    .title {
      height: 88px;
      line-height: 88px;
      font-weight: bold;
      text-align: center;
      color: @fontCWhite;
      font-size: 36px;
    }
    .bg {
      height: 150px;
      padding-top: 56px;
    }
  }
  .home_padd {
    background: #ffffff;
    padding: 20px;
    position: relative;
    top: -150px;
    z-index: 1;
    width: 702px;
    height: 456px;
    box-sizing: border-box;
    margin: 0 auto;
    border-radius: 60px;
    overflow: hidden;
    .home_select {
      text-align: center;
      margin: 12px auto 0 auto;
      font-size: 32px;
      align-items: flex-end;
      div {
        // width: 18%;
        position: relative;
        img {
          width: 188px;
        }
        p {
          position: absolute;
          bottom: 55px;
          left: 0;
          width: 100%;
          text-align: center;
          font-size: 24px;
          color: #fff;
        }
      }
    }
    .textscroll {
      margin: 20px 28px auto 28px;
      // display: flex;
      // flex-direction: row;
      .notice {
        font-size: 34px;
        color: #333;
        font-weight: bold;
      }
      .notice_text {
        margin-top: 24px;
        color: @fontC4D4;
        overflow: hidden;
        font-size: 28px;
        line-height: 36px;
      }
    }
  }
  .home_vacation {
    position: relative;
    top: -150px;
    margin: @mar16 auto;
    width: 702px;
    height: 500px;
    background: #ffffff;
    border-radius: 20px;
    .vacation_title {
      height: 80px;
      line-height: 80px;
      padding-left: @pad16;
      font-size: 34px;
      color: @fontColor;
      font-weight: bold;
    }
    .vacation_info {
      height: 420px;
      overflow: auto;
      padding: 0 @pad20;
      .van-cell {
        height: 72px;
        line-height: 72px;
        .info_content {
          .content_name {
            color: @fontC4D4;
            font-size: 28px;
            width: 140px;
          }
          .content_time {
            color: @fontC4D4;
            font-size: 28px;
          }
        }
      }
      .info_end {
        margin-top: @mar20;
        font-size: 24px;
        color: #969799;
        text-align: center;
      }
    }
  }
  .home_news {
    padding: 10px 32px 50px 32px;
    background: #fff;
    position: relative;
    top: -130px;
    .news {
      padding: 0.1rem 0.5rem;
    }
    .filedown {
      // margin-top: 0.5rem;
      .box_frame-row {
        height: 120px;
        span {
          color: #333;
          font-size: 48px;
          font-weight: bold;
        }
      }
      .fileItem {
        padding: 20px 30px;
        height: 84px;
        .box_frame {
          margin-left: 20px;
          width: 80%;
          span {
            line-height: 1.2rem;
            font-size: 0.75rem;
          }
          .upTime {
            color: #999999;
          }
        }
      }
    }
  }
}
</style>

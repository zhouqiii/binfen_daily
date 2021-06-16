<template>
    <div>
        <nav-bar-top title="首页" :navIcon='navIcon'></nav-bar-top>
        <nav-bar-bottom></nav-bar-bottom>
        <div class="home">
          <div>
            <swiper-card :images="image"></swiper-card>
          </div>
          <div class="home_padd">
            <div class="home_select flex_around">
              <div @click="routeItem('/WriteDaily')">
                <img src="../assets/icons/News.png" alt="图片加载失败"/>
                <p>日报</p>
              </div>
              <div @click="routeItem('/WriteExtention')">
                <img src="../assets/icons/dailyDelay.png" alt="图片加载失败"/>
                <p>延迟申请</p>
              </div>
             <div @click="routeItem('/WriteVacation')">
                <img src="../assets/icons/vacation.png" alt="图片加载失败"/>
                <p>休假申请</p>
              </div>
            </div>
          </div>
          <div class="home_news">
            <div class="news textscroll">
              <span>公告 |</span>
              <div style="margin-left:.5rem;width:80%;overflow:hidden">
                <text-scroll :dataList="textList"></text-scroll>
              </div>
            </div>
            <div class="news filedown">
              <div class="downMark box_frame-row">
                <span>文档</span>
                <div><svg-icon iconClass="right" style="width:1rem;height:1rem"></svg-icon></div>
              </div>
              <div>
                <div class="fileItem flex-rowSvg"
                  v-for="(item,index) in fileList"
                  :key="index"
                  @click="downloadBtn(item.content,item.title)"
                >
                  <div><img src="../assets/icons/word.png"/></div>
                  <div class="box_frame">
                    <span class="textEllipsis">{{item.title}}</span>
                    <span class="upTime">{{item.time}}上传</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
</template>
<script>
import SwiperCard from '../components/MyComponents/SwiperCard.vue';
import TextScroll from '../components/MyComponents/TextScroll.vue';
import pic from '../assets/icons/swiper.png';

export default {
  components: { SwiperCard, TextScroll },
  name: 'Home',
  data() {
    return {
      type: '0',
      navIcon: false,
      image: [pic, pic],
      textList: ['通知！关于公司内部沟通平台统一迁移至企业微信', '端午节放假通知及离京信息登记', '关于个人疫苗接种登记信息消息'],
      fileList: [{ title: 'X16需求说明X16需求说明X16需求说明X16需求说明X16需求说明', time: '2020.6.1', content: '测试下载:X16文档内容' }, { title: 'X17需求说明', time: '2021.2.10', content: '测试下载:X17文档内容1' }, { title: 'X17需求说明', time: '2021.2.10', content: '测试下载:X17文档内容2' }],
    };
  },
  methods: {
    routeItem(path) {
      this.$router.push(path);
    },
    downloadBtn(content, title) {
      this.downloadFile(content, `${title}.doc`);
    },
    downloadFile(content, filename) { // content一般就是后台给的下载地址,filename是下载的文件名
      // 字符内容转变成blob地址
      const blob = new Blob([content], { type: 'application/msword;charset=utf-8' });// .txt:{type: "text/plain;charset=utf-8"});
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blob, filename);
      } else {
        // for Non-IE
        const eleLink = document.createElement('a');
        eleLink.href = URL.createObjectURL(blob);
        eleLink.setAttribute('download', filename);// eleLink.download = filename;
        eleLink.style.display = 'none';
        document.body.appendChild(eleLink);
        eleLink.click();
        window.URL.revokeObjectURL(eleLink);
      }
    },
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll, true);
  },
};
</script>
<style lang="less" scoped>
.home_select{
  position: relative;
  z-index: 1;
  text-align: center;
  width: 95%;
  margin: auto;
  font-size: .875rem;
  /* border: 1px solid; */
  border-radius: .3rem;
  margin-top: -19%;
  background: #ffffff;
  align-items: flex-end;
  padding: 1rem 0 .5rem 0;
  div{
    width: 18%;
  }
  p{
    margin: .5rem 0;
    font-size: .8rem;
  }
}
.home_news{
  margin-top: 1rem;
  font-size: .875rem;
  height: 2rem;
  line-height: 2rem;
  padding: 0 1rem;
  .news{
    border: 1px solid #d3d3d3;
    border-radius:.2rem;
    padding: .1rem .5rem;
  }
  .textscroll{
    display: flex;
    flex-direction: row;
  }
  .filedown{
    margin-top: .5rem;
    .fileItem{
      padding: 10px .5rem;
      .box_frame{
        margin-left: 20px;
        width: 80%;
        span{
          line-height: 1.2rem;
          font-size: .75rem;
        }
        .upTime{
          color: #999999;
        }
      }
    }
  }
}
</style>

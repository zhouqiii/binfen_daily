<template>
    <div class="box">
        <nav-bar-top title="我的"></nav-bar-top>
        <nav-bar-bottom></nav-bar-bottom>
        <div class="home">
          <div class="home_img">
            <swiper-card :images="image"></swiper-card>
          </div>
          <div class="home_padd">
            <!--1-->
            <div class="home_topselect framebox flex_start">
              <div class="home_icon">
                <img src="../assets/icons/wode.png" style="width:80%"/>
              </div>
              <div class="home_user box_frame">
                <div class="myinfo_user_name">你好,{{username}}</div>
                <div class="myinfo_user_edit">个人资料</div>
              </div>
            </div>
            <!--1E-->
            <!--2S-->
            <div class="home_route framebox box_frame">
              <div class="box_frame-row" @click="routeItem('/SeeDaily')">
                <div class="flex-row">
                  <svg-icon iconClass="ribao"></svg-icon>
                  <div>查看日报</div>
                </div>
                <svg-icon iconClass="right"></svg-icon>
              </div>
              <div class="box_frame-row" @click="routeItem('/SeeExtention')">
                <div class="flex-row">
                  <svg-icon iconClass="yanchi"></svg-icon>
                  <div>查看延迟申请</div>
                </div>
                <svg-icon iconClass="right"></svg-icon>
              </div>
              <div class="box_frame-row">
                <div class="flex-row">
                  <svg-icon iconClass="qingjia"></svg-icon>
                  <div>查看请假</div>
                </div>
                <svg-icon iconClass="right"></svg-icon>
              </div>
            </div>
            <!--2E-->
            <!--3S-->
            <div class="home_route framebox">
              <div class="box_frame-row" @click="routeItem('/ChangeAccount')">
                <div class="flex-row">
                  <svg-icon iconClass="change"></svg-icon>
                  <div>修改登陆密码</div>
                </div>
                <svg-icon iconClass="right"></svg-icon>
              </div>
            </div>
            <!--3E-->
          </div>
        </div>
    </div>
</template>
<script>
import SwiperCard from '../components/MyComponents/SwiperCard.vue';
import SvgIcon from '../components/SvgIcon.vue';
import '../assets/css/style/myinfo.less';

export default {
  components: { SwiperCard, SvgIcon },
  name: 'MyInfo',
  data() {
    return {
      username: '',
      image: ['http://nwzimg.wezhan.cn/contents/sitefiles2026/10130673/images/4769338.png', 'http://nwzimg.wezhan.cn/contents/sitefiles2026/10130673/images/4769338.png'],
    };
  },
  methods: {
    routeItem(path) {
      this.$router.push(path);
    },
  },
  mounted() {
    this.$login();
    this.username = this.storage.get('username');
  },
};
</script>

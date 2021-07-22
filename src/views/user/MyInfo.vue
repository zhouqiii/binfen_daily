<template>
  <div class="box">
    <!-- <nav-bar-top title="我的"></nav-bar-top> -->
    <nav-bar-bottom></nav-bar-bottom>
    <div class="home">
      <div class="home_img">
        <div class="title">我的</div>
        <div class="bg"></div>
        <!-- <img :src="image" /> -->
      </div>
      <div class="home_padd">
        <!--1-->
        <div class="home_topselect framebox flex_start">
          <div class="home_icon"></div>
          <div class="home_user box_frame">
            <div class="myinfo_user_name">你好,{{ username }}</div>
            <div class="myinfo_user_edit" @click="routeItem('/UserInfo')">个人资料</div>
          </div>
        </div>
        <!--1E-->
        <!--2S-->
        <div class="home_route framebox box_frame">
          <div class="box_frame-row line" @click="routeItem('/SeeDaily')">
            <div class="flex-row">
              <div class="my_daily"></div>
              <div>我的日报</div>
            </div>
            <svg-icon iconClass="right"></svg-icon>
          </div>
          <div class="box_frame-row line" @click="routeItem('/SeeExtention')">
            <div class="flex-row">
              <div class="my_delay"></div>
              <div>我的延时申请</div>
            </div>
            <svg-icon iconClass="right"></svg-icon>
          </div>
          <div class="box_frame-row" @click="routeItem('/SeeVacation')">
            <div class="flex-row">
              <div class="my_vacation"></div>
              <div>我的休假申请</div>
            </div>
            <svg-icon iconClass="right"></svg-icon>
          </div>
        </div>
        <!--2E-->
        <!--3S-->
        <div class="home_route framebox">
          <div class="box_frame-row" @click="routeItem('/ChangeAccount')">
            <div class="flex-row">
              <!-- <svg-icon iconClass="change"></svg-icon> -->
              <div class="my_name"></div>
              <div>修改登录密码</div>
            </div>
            <svg-icon iconClass="right"></svg-icon>
          </div>
        </div>
        <!--3E-->
        <!--4S-->
        <div class="home_route framebox">
          <div class="box_frame-row" @click="logOut">
            <div class="flex-row">
              <div class="my_sign"></div>
              <div>退出登录</div>
            </div>
            <svg-icon iconClass="right"></svg-icon>
          </div>
        </div>
        <!--4E-->
      </div>
    </div>
  </div>
</template>
<script>
import { logOut } from '@/api/user';
import SvgIcon from '@/components/SvgIcon.vue';
import pic from '@/assets/icons/pictest3.jpg';

export default {
  components: { SvgIcon },
  name: 'MyInfo',
  data() {
    return {
      username: '',
      image: pic,
    };
  },
  methods: {
    routeItem(path) {
      this.$router.push(path);
    },
    logOut() {
      logOut()
        .then((res) => {
          if (res.code === 200) {
            this.storage.clear();
            this.$router.replace('/SignIn');
          }
        })
        .catch((err) => {
          console.log('err', err);
        });
    },
  },
  mounted() {
    const { realName } = this.storage.get('userInfo');
    this.username = realName || '';
  },
  created() {
    this.$nextTick(() => {});
  },
};
</script>
<style scoped lang="less">
@import url('../../assets/css/style/myinfo.less');
</style>

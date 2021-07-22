<template>
  <div class="box">
    <nav-bar-top title="个人资料"></nav-bar-top>
    <div class="home">
      <div class="home_padd">
        <!--1S-->
        <div class="home_route framebox box_frame">
          <div class="box_frame-row info_line">
            <div class="flex-row">
              <div>姓名</div>
            </div>
            <div class="right">
              {{ userInfo.realName }}
            </div>
          </div>
          <div class="box_frame-row info_line">
            <div class="flex-row">
              <div>登录用户名</div>
            </div>
            <div class="right">
              {{ userInfo.username }}
            </div>
          </div>
          <div class="box_frame-row info_line">
            <div class="flex-row">
              <div>手机号</div>
            </div>
            <div class="right">
              {{ userInfo.mobile }}
            </div>
          </div>
          <div class="box_frame-row info_line">
            <div class="flex-row">
              <div>入职时间</div>
            </div>
            <div class="right">
              {{ userInfo.entryDate }}
            </div>
          </div>
        </div>
        <!--1E-->
        <!--2S-->
        <div class="home_route framebox box_frame info">
          <div class="box_frame-row info_line">
            <div class="flex-row">
              <div>所在项目</div>
            </div>
            <div class="right">
              {{ userInfo.product }}
            </div>
          </div>
          <div class="box_frame-row info_line">
            <div class="flex-row">
              <div>岗位</div>
            </div>
            <div class="right">
              {{ userInfo.incumbentPost }}
            </div>
          </div>
          <div class="box_frame-row info_line">
            <div class="flex-row">
              <div>技术定级</div>
            </div>
            <div class="right">
              {{ userInfo.technicalLevel }}
            </div>
          </div>
        </div>
        <!--2E-->
      </div>
    </div>
  </div>
</template>
<script>
import { getUserInfo } from '@/api/user';

const time = new Date().getTime() + 7 * 24 * 3600 * 1000;

export default {
  components: {},
  name: 'UserInfo',
  data() {
    return {
      userInfo: {},
    };
  },
  methods: {
    getUserInfo() {
      getUserInfo()
        .then((res) => {
          if (res.code === 200) {
            this.userInfo = res.data;
            this.storage.set('userInfo', res.data, time);
          }
        })
        .catch((err) => {
          console.log('getUserInfo err', err);
        });
    },
  },
  mounted() {
    this.getUserInfo();
  },
};
</script>
<style scoped lang="less">
@import url('../../assets/css/style/myinfo.less');
</style>

<template>
  <div>
    <div class="bottom_bar">
      <div class="blank"></div>
      <div class="bottom">
        <div class="item" @click="clickItem('/Home')" :class="{ active: $route.path === '/Home' }">
          <!-- <svg-icon iconClass="shouye" style="width:1.5rem;height:1.5rem"></svg-icon> -->
          <img
            :src="
              $route.path === '/Home'
                ? require('../../assets/icons/icon_home2.png')
                : require('../../assets/icons/icon_home1.png')
            "
            alt="图片无法显示"
          />
          <p>首页</p>
        </div>
        <div
          class="item"
          @click="clickItem('/Commission')"
          :class="{ active: $route.path === '/Commission' }"
        >
          <!-- <svg-icon iconClass="renwu"></svg-icon> -->
          <img
            :src="
              $route.path === '/Commission'
                ? require('../../assets/icons/icon_mission2.png')
                : require('../../assets/icons/icon_mission1.png')
            "
            alt="图片无法显示"
          />
          <p>任务</p>
        </div>
        <div
          class="item"
          @click="clickItem('/Approve')"
          :class="{ active: $route.path === '/Approve' }"
        >
          <!-- <svg-icon iconClass="renwu"></svg-icon> -->
          <img
            :src="
              $route.path === '/Approve'
                ? require('@/assets/icons/icon_approve_hover@3x.png')
                : require('@/assets/icons/icon_approve@3x.png')
            "
            alt="图片无法显示"
          />
          <p>审批</p>
        </div>
        <div
          class="item"
          @click="clickItem('/MyInfo')"
          :class="{ active: $route.path === '/MyInfo' }"
        >
          <!-- <svg-icon iconClass="wodeT" style="width:1.5rem;height:1.35rem"></svg-icon> -->
          <img
            :src="
              $route.path === '/MyInfo'
                ? require('../../assets/icons/icon_mine2.png')
                : require('../../assets/icons/icon_mine1.png')
            "
            alt="图片无法显示"
          />
          <p>我的</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import SvgIcon from '../SvgIcon.vue';

export default {
  // components: { SvgIcon },
  name: 'bottom',
  //   components:{HomeHome,LifeLife},
  methods: {
    clickItem(path) {
      this.$router.push(path);
    },
  },
};
</script>
<style scoped lang="less">
// @import '../../assets/css/style/applyModel.css';
.bottom_bar {
  color: @fontC2F2;
  .bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 26px 80px 40px 80px;
    position: fixed;
    bottom: 0px;
    background-color: inherit;
    width: 100%;
    height: 166px;
    z-index: 105;
    background: #ffffff;
    box-sizing: border-box;
    .item {
      text-align: center;
      // width: 33.3%;
      img {
        width: 52px;
        height: 52px;
      }
      p {
        margin-bottom: 0;
        margin-top: 8px;
        font-size: 28px;
      }
    }
    .active {
      color: #2f80ed;
    }
  }
}
</style>

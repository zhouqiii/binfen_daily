<template>
  <div class="nav_bar_top">
    <div class="navbar">
      <van-nav-bar
        :title="title"
        :class="{ activeBg: !navBg }"
        @click-left="onClickLeft"
        @click-right="onClickRight"
      >
        <template #left>
          <slot name="back">
            <div v-show="navIcon" class="back_icon" />
          </slot>
        </template>
        <template #right>
          <slot name="right"></slot>
        </template>
      </van-nav-bar>
    </div>
    <div class="blank"></div>
  </div>
</template>

<script>
/* title
 ** onClickLeft 左侧按钮点击
 ** onClickRight 右侧按钮点击
 */
import { callAppMethod } from '../utils/commonApp';
import judgeBigScreen from '../utils/myutils/applyModel';

export default {
  name: 'NavBarBase',
  data() {
    return {};
  },
  props: {
    title: {
      type: String,
      default: '信用卡全部卡片',
    },
    // type的值：
    // '0':调用客户端的lastGoBack方法，关闭加载H5的webview
    // '1':返回当前项目的上级页面
    // '3':跳转到当前项目的指定页面
    type: {
      type: String,
      default: '1',
    },
    opt: {
      type: String,
      default: 'rightClick',
    },
    navBg: {
      type: Boolean,
      default: true,
    },
    navIcon: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    onClickRight() {
      this.$emit(this.opt, true);
    },
    onClickLeft() {
      if (!this.navIcon) {
        return;
      }
      if (this.type === '1') {
        this.$router.go(-1);
      }
      if (this.type === '0') {
        callAppMethod({
          callName: 'lastGoBack',
        });
      }
      if (this.type === 'MyInfo') {
        this.$router.push({ path: '/MyInfo' });
      }
    },
  },
  created() {
    this.$nextTick(() => {
      if (judgeBigScreen()) {
        /// / 全面屏
        const topNav = document.getElementsByClassName('van-nav-bar');
        const blank = document.getElementsByClassName('blank');
        topNav[0].style.paddingTop = '44px';
        blank[0].style.height = '88px';
      }
    });
  },
};
</script>
<style lang="less">
// @import '../../assets/style/applyModel.css';
.nav_bar_top {
  .navbar {
    width: 100%;
    position: fixed;
    z-index: 100;
    top: 0;
    .back_icon {
      .bg-image('../assets/imgs/components/common_back');
      width: @icon24;
      height: @icon24;
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
  }
  .blank {
    height: 88px;
  }
  .van-nav-bar__title {
    font-size: 36px !important;
    color: @fontColor;
    font-weight: 700;
  }
  .van-nav-bar__left {
    padding-left: 48px;
  }
}
</style>

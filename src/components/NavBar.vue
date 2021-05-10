<template>
  <div class="navbar">
    <van-nav-bar
      :title="title"
      :class="{activeBg:!navBg}"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <template #left>
        <slot name="back">
          <svg-icon
              v-show="navIcon"
              iconClass="left"
              :class="{activeBg:!navBg}"
              class="back back_btn"
          >
          </svg-icon>
        </slot>
      </template>
      <template #right>
        <slot name='right'></slot>
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
/* title
** onClickLeft 左侧按钮点击
** onClickRight 右侧按钮点击
*/
import { callAppMethod } from '../utils/commonApp';
import SvgIcon from './SvgIcon.vue';

export default {
  components: { SvgIcon },
  name: 'NavBarBase',
  data() {
    return {
    };
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
      if (this.type === '1') {
        this.$router.go(-1);
      } else if (this.type === '0') {
        callAppMethod({
          callName: 'lastGoBack',
        });
      }
    },
  },
};
</script>
<style lang="less">
.navbar{
  width: 100%;
  position: fixed;
  z-index: 100;
  top:0;
}
.activeBg{
  background: rgba(102, 102, 102, 1);
  color: #ffffff;
  .van-nav-bar__title{
    color: #ffffff;
}
}
.back_btn {
    width:.9rem;
    height: .9rem;
}
.van-nav-bar__title{
    font-size: 1.125rem !important;
}
</style>

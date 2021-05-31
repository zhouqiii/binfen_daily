<template>
  <div>
    <div class="head">
      <!-- <div style="height:60px;"></div>  -->
      <div class="bottom">
          <div class="item" @click="clickItem('/')"
            :class="{active: $route.path==='/'}"
          >
            <svg-icon iconClass="shouye" style="width:1.5rem;height:1.5rem"></svg-icon>
            <p>首页</p>
          </div>
          <div class="item" @click="clickItem('/Commission')"
            :class="{active: $route.path==='/Commission'}"
            style="padding-top:.3rem"
          >
            <svg-icon iconClass="renwu"></svg-icon>
            <p>任务</p>
          </div>
          <div class="item" @click="clickItem('/MyInfo')"
            :class="{active: $route.path==='/MyInfo'}"
            style="padding-top:.3rem"
          >
            <svg-icon iconClass="wodeT" style="width:1.5rem;height:1.35rem"></svg-icon>
            <p>我的</p>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import SvgIcon from '../SvgIcon.vue';

export default {
  components: { SvgIcon },
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
  .head{
      .bottom{
        display: flex;
        position: fixed;
        bottom:0px;
        background-color: inherit;
        width: 100%;
        height: 3rem;
        z-index: 105;
        background: #ffffff;
        .item{
          text-align: center;
          width:33.3%;
          p{
            margin-bottom: 0;
            margin-top: .1rem;
            font-size: .9rem;
          }
        }
        .active{
          color:#003399
        }
      }
  }
</style>

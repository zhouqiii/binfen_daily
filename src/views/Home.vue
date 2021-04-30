<template>
    <div>
        <nav-bar-top title="首页" :type='type'></nav-bar-top>
        <nav-bar-bottom></nav-bar-bottom>
        <div class="home">
          <div>
            <swiper-card :images="image"></swiper-card>
          </div>
          <div class="home_padd">
            <div class="home_select flex_around">
              <div @click="routeItem('/WriteDaily')">
                <img src="../assets/icons/News.png"/>
                <p>日报</p>
              </div>
              <div @click="routeItem('/WriteExtention')">
                <img src="../assets/icons/dailyDelay.png"/>
                <p>延迟申请</p>
              </div>
             <div >
                <img src="../assets/icons/vacation.png"/>
                <p>请假</p>
              </div>
          </div>
          </div>
        </div>
    </div>
</template>
<script>
import SwiperCard from '../components/MyComponents/SwiperCard.vue';

export default {
  components: { SwiperCard },
  name: 'Home',
  data() {
    return {
      type: '0',
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
  },
};
</script>
<style lang="less" scoped>
.home_select{
  position: relative;
  z-index: 999;
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
</style>

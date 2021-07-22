<template>
  <div>
    <div class="swiper">
      <van-swipe :autoplay="3000" :show-indicators="false">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img :src="image" :class="{ active: widthImg }" :alt="alt" />
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>
<script>
import { Swipe, SwipeItem } from 'vant';

export default {
  name: 'SwiperCard',
  props: ['images', 'classImg'],
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
  },
  data() {
    return {
      widthImg: false,
      alt: '',
    };
  },
  mounted() {
    this.widthImg = this.classImg;
    this.alt = `你好，${this.storage.get('username')}`;
  },
  computed: {},
};
</script>

<style scoped lang="less">
.swiper {
  width: 100%;
  height: 10rem;
  background: #999999;
  text-align: center;
  position: relative;
  z-index: 1;
}
.active {
  width: 10%;
}
.van-swipe-item {
  img {
    margin: auto;
  }
}
</style>

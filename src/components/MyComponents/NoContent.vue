<template>
  <div>
    <div v-show="showNocontent === '0'" class="home_noContent">
      <div class="home_noContent_box">
        <img src="../../assets/imgs/img_empty.png" />
        <div>日报内容为空，请填写该时间段日报哦</div>
        <!-- <div>请填写该时间段日报哦~</div> -->
      </div>
    </div>
    <div v-show="showNocontent === '1'" class="home_noContent">
      <div class="home_noContent_box">
        <img src="../../assets/imgs/img_empty.png" />
        <div>延时申请内容为空</div>
        <div>请填写当日延时申请哦~</div>
      </div>
    </div>
    <div v-show="showNocontent === '2'" class="home_noContent">
      <div class="home_noContent_box">
        <img src="../../assets/imgs/img_empty.png" />
        <div>休假申请内容为空</div>
        <div>请填写休假申请哦~</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'NoContent',
  props: {
    showNocontent: {
      type: String,
      default: '-1',
    },
  },
  data() {
    return {};
  },
};
</script>
<style lang="less" scoped>
.home_noContent {
  .home_noContent_box {
    // padding: 50% 0;
    // padding: 40% 0;
    padding-top: 128px;
    text-align: center;
    font-size: 0.8rem;
    img {
      width: 308px;
      height: 241px;
      margin-bottom: 5%;
    }
    div {
      font-size: 28px;
      color: #828282;
    }
  }
}
</style>

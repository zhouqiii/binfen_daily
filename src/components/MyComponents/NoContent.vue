<template>
    <div>
        <div v-show="showNocontent==='0'" class="home_noContent">
            <div class="home_noContent_box">
                <img src="../../assets/icons/noDelayDaily.png"/>
                <div>日报内容为空</div>
                <div>请填写当日日报哦~</div>
            </div>
        </div>
        <div v-show="showNocontent==='1'" class="home_noContent">
            <div class="home_noContent_box">
                <img src="../../assets/icons/noDelayDaily.png"/>
                <div>延期申请内容为空</div>
                <div>请填写当日延迟申请哦~</div>
            </div>
        </div>
        <div v-show="showNocontent==='2'" class="home_noContent">
            <div class="home_noContent_box">
                <img src="../../assets/icons/noDelayDaily.png"/>
                <div>休假申请内容为空</div>
                <div>请填写当日延迟申请哦~</div>
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
    return {
    };
  },
};
</script>
<style lang="less" scoped>
 .home_noContent{
            .home_noContent_box{
                padding: 20% 0;
                text-align: center;
                font-size: .8rem;
                img{
                    margin-bottom: 5%;
                }
            }
        }
</style>

<template>
    <div class="box home">
        <nav-bar-top title="延迟申请提交结果"></nav-bar-top>
        <div class="daily_end box_frame">
            <div class="daily_end_page state">
                <div v-show="submitEnd" class="box_frame">
                    <svg-icon iconClass="success" style="width:7rem;height:7rem;margin:auto">
                    </svg-icon>
                    <div class="endtext">延迟申请提交成功</div>
                </div>
                <div v-show="!submitEnd" class="box_frame">
                    <svg-icon iconClass="fail"></svg-icon>
                    <div>延迟申请提交失败</div>
                </div>
            </div>
            <div class="daily_end_page goback">
                <div class="applyBtn comfirmbtn" @click="routeItem('/')">返回首页</div>
            </div>
            <div class="daily_end_page remain flex_evenly">
                <span @click="routeItem('/WriteExtentionDaily')">继续申请</span>
                <span class="line">|</span>
                <span>查看延迟申请</span>
            </div>
        </div>
    </div>
</template>
<script>
import SvgIcon from '../../components/SvgIcon.vue';
import '../../assets/css/style/dailyEnd.less';

export default {
  components: { SvgIcon },
  name: 'ExtentionEnd',
  data() {
    return {
      submitEnd: true,
    };
  },
  methods: {
    routeItem(path) {
      this.$router.push(path);
    },
  },
};
</script>

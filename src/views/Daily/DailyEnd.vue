<template>
    <div class="box home">
        <nav-bar-top title="日报提交结果"></nav-bar-top>
        <div class="daily_end box_frame">
            <div class="daily_end_page state">
                <div v-show="submitEnd" class="box_frame">
                    <svg-icon iconClass="success" style="width:7rem;height:7rem;margin:auto">
                    </svg-icon>
                    <div class="endtext">日报提交成功</div>
                </div>
                <div v-show="!submitEnd" class="box_frame">
                    <svg-icon iconClass="fail" style="width:7rem;height:7rem;margin:auto">
                    </svg-icon>
                    <div>日报提交失败</div>
                </div>
            </div>
            <div class="daily_end_page goback">
                <div class="applyBtn comfirmbtn" @click="routeItem('/')">返回首页</div>
            </div>
            <div class="daily_end_page remain flex_evenly">
                <span @click="routeItem('/WriteDaily')">继续写日报</span>
                <span class="line">|</span>
                <span  @click="routeItem('/SeeDaily')">查看日报</span>
            </div>
        </div>
    </div>
</template>
<script>
import SvgIcon from '../../components/SvgIcon.vue';
import '../../assets/css/style/dailyEnd.less';

export default {
  components: { SvgIcon },
  name: 'DailyEnd',
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
  mounted() {
    this.$login();
  },
};
</script>

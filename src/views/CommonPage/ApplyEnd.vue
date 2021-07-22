<template>
  <div class="box home homeEnd">
    <nav-bar-top :title="form.title"></nav-bar-top>
    <div class="daily_end box_frame">
      <div class="daily_end_page state">
        <div v-show="submitEnd" class="box_frame">
          <!-- <svg-icon iconClass="success" style="width:7rem;height:7rem;margin:auto">

          </svg-icon> -->
          <img src="../../assets/imgs/result/img_success.png" alt="" />
          <div class="endtext">{{ form.pageSuccessMsg }}</div>
        </div>
        <div v-show="!submitEnd" class="box_frame">
          <svg-icon iconClass="fail"></svg-icon>
          <!-- <img src="../../assets/imgs/result/img_failed.png" alt="" /> -->
          <div>{{ form.pageFailMsg }}</div>
        </div>
      </div>
      <div class="daily_end_page goback">
        <div class="applyBtn comfirmbtn" @click="routeItem('/')">返回首页</div>
      </div>
      <div class="daily_end_page remain flex_evenly" v-show="endpage === 0">
        <span class="text1" @click="routeItem('/WriteDaily')">继续写日报</span>
        <span class="line">|</span>
        <span class="text1" @click="routeItem('/SeeDaily')">查看日报</span>
      </div>
      <div class="daily_end_page remain flex_evenly" v-show="endpage === 1">
        <span class="text1" @click="routeItem('/WriteExtention')">继续填写</span>
        <span class="line">|</span>
        <span class="text1" @click="routeItem('/SeeExtention')">查看延时申请</span>
      </div>
      <div class="daily_end_page remain flex_evenly" v-show="endpage === 2">
        <span class="text1" @click="routeItem('/WriteVacation')">继续填写</span>
        <span class="line">|</span>
        <span class="text1" @click="routeItem('/SeeVacation')">查看休假申请</span>
      </div>
    </div>
  </div>
</template>
<script>
import SvgIcon from '../../components/SvgIcon.vue';

export default {
  components: { SvgIcon },
  name: 'ApplyEnd',
  data() {
    return {
      submitEnd: true,
      form: {
        title: '',
        pageSuccessMsg: '',
      },
      endpage: '',
    };
  },
  methods: {
    getQueryData() {
      const id = parseInt(this.$route.query.pageend, 10);
      if (id === 0) {
        this.form.title = '日报申请提交结果';
        this.form.pageSuccessMsg = '日报提交成功';
        this.endpage = 0;
      } else if (id === 1) {
        this.form.title = '延时申请提交结果';
        this.form.pageSuccessMsg = '延时申请提交成功';
        this.endpage = 1;
      } else if (id === 2) {
        this.form.title = '休假申请提交结果';
        this.form.pageSuccessMsg = '休假申请提交成功';
        this.endpage = 2;
      }
    },
    routeItem(path) {
      this.$router.push(path);
    },
  },
  mounted() {
    this.getQueryData();
  },
};
</script>
<style lang="less" scoped>
@import url('../../assets/css/style/dailyEnd.less');
</style>

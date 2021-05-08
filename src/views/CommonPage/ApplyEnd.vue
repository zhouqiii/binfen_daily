<template>
    <div class="box home">
        <nav-bar-top :title="form.title"></nav-bar-top>
        <div class="daily_end box_frame">
            <div class="daily_end_page state">
                <div v-show="submitEnd" class="box_frame">
                    <svg-icon iconClass="success" style="width:7rem;height:7rem;margin:auto">
                    </svg-icon>
                    <div class="endtext">{{form.pageSuccessMsg}}</div>
                </div>
                <div v-show="!submitEnd" class="box_frame">
                    <svg-icon iconClass="fail"></svg-icon>
                    <div>{{form.pageFailMsg}}</div>
                </div>
            </div>
            <div class="daily_end_page goback">
                <div class="applyBtn comfirmbtn" @click="routeItem('/')">返回首页</div>
            </div>
            <div class="daily_end_page remain flex_evenly" v-show="endpage===0">
                <span @click="routeItem('/WriteDaily')">继续填写</span>
                <span class="line">|</span>
                <span  @click="routeItem('/SeeDaily')">查看日报申请</span>
            </div>
            <div class="daily_end_page remain flex_evenly" v-show="endpage===1">
                <span @click="routeItem('/WriteExtention')">继续填写</span>
                <span class="line">|</span>
                <span  @click="routeItem('/SeeExtention')">查看延迟申请</span>
            </div>
            <div class="daily_end_page remain flex_evenly" v-show="endpage===2">
                <span @click="routeItem('/WriteVacation')">继续填写</span>
                <span class="line">|</span>
                <span  @click="routeItem('/SeeVacation')">查看休假申请</span>
            </div>
        </div>
    </div>
</template>
<script>
import SvgIcon from '../../components/SvgIcon.vue';
import '../../assets/css/style/dailyEnd.less';

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
        this.form.pageSuccessMsg = '日报申请提交成功';
        this.endpage = 0;
      } else if (id === 1) {
        this.form.title = '延迟申请提交结果';
        this.form.pageSuccessMsg = '延迟申请提交成功';
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

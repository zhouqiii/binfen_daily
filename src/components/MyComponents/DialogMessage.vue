<template>
  <div class="dialog">
    <div class="dialog_box">
      <div class="dialog_content">
        <div class="text_rule"><div v-html="content"></div></div>
        <div class="dialog_btn flex_evenly">
          <!--给一键审批使用的按钮-->
          <div v-show="selectBtn" class="btn_select flex_around">
            <div class="selBtn selectCancel" @click="remain">取消</div>
            <div class="selBtn selectConfirm" @click="sendData">确定</div>
          </div>
          <div class="applyBtn comfirmbtn" @click="remainApply" v-show="confirmBtn">
            确定
          </div>
          <div class="applyBtn comfirmbtn" @click="remain" v-show="knowBtn">
            知道了
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from '../../router/index';

export default {
  name: 'DialogMessage',
  data() {
    return {
      title: '',
      content: '',
      classNext: '',
      confirmBtn: false, // 用哪个按钮，传哪个为true
      knowBtn: false,
      selectBtn: false,
      classScroll: '',
      showDelete: false,
      showcancelThe: false,
      thisstyle: '',
    };
  },
  methods: {
    // 一键审批弹框确定按钮
    sendData() {
      this.remove();
      router.push({
        name: 'Commission',
        params: {
          // 为了跳转到我的审核-我已审核
          tabIndexGive: 1,
          activeGive: 1,
        },
      });
    },
    remainApply() {
      this.remove();
      this.storage.clear();
      router.push({ name: 'SignIn' });
    },
    remain() {
      this.remove();
    },
  },
  mounted() {},
  watch: {
    // showcancelThe: {
    //   handler(newval) {
    //     if (newval) {
    //       this.thisstyle = 'width:30%';
    //     }
    //   },
    // },
  },
};
</script>
<style scoped lang="less">
@import url('../../assets/css/style/dialog.less');
</style>

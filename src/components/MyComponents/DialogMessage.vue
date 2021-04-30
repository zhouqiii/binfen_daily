<template>
  <div class="dialog">
    <div class="dialog_box">
      <div class="dialog_content">
        <div class="text_rule"><div v-html="content"></div></div>
        <div class="dialog_btn flex_evenly">
          <div class="applyBtn comfirmbtn" @click="remain" v-show="showcancelThe"
            :style="thisstyle"
          >取消</div>
          <div class="applyBtn comfirmbtn" @click="remainApply"
            :style="thisstyle" v-show="showBtn"
          >确定</div>
          <div class="applyBtn comfirmbtn" @click="remain" v-show="!showBtn">知道了</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from '../../router/index';
import '../../assets/css/style/dialog.less';

export default {
  name: 'DialogMessage',
  data() {
    return {
      title: '',
      content: '',
      classNext: '',
      showBtn: true,
      classScroll: '',
      showDelete: false,
      showcancelThe: false,
      thisstyle: '',
    };
  },
  methods: {
    remainApply() {
      this.remove();
      router.push({ name: 'Login' });
    },
    remain() {
      this.remove();
    },

  },
  mounted() {
  },
  watch: {
    showcancelThe: {
      handler(newval) {
        if (newval) {
          this.thisstyle = 'width:30%';
        }
      },
    },
  },

};
</script>

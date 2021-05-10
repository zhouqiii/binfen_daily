<template>
    <div>
        <nav-bar-top title="拒绝" :navBg='navBg'></nav-bar-top>
        <div class="home">
            <div class="refuse_box">
                <div class="refuse_title">请写明拒绝原因：</div>
                <div class="refuse_content">
                    <van-field
                        v-model="refuseReason"
                        class="refuse_reason"
                        rows="2"
                        autosize
                        label=""
                        v-on:input="getData"
                        type="textarea"
                        maxlength="20"
                        placeholder="请输入"
                        show-word-limit
                    />
                </div>
            </div>
            <div class="refuse_btn">
                <button class="refuse_btn_confirm"
                    :disabled="disabled"
                    :style="thisStyle"
                    @click="sendReason"
                >
                    确定
                </button>
            </div>

        </div>
    </div>
</template>
<script>

export default {
  name: 'MyApproveRefuse',
  data() {
    return {
      navBg: false,
      refuseReason: '',
      flag: false,
      disabled: true,
      thisStyle: '',
    };
  },
  methods: {
    getData() {
      const { refuseReason } = this;
      if (refuseReason) {
        this.flag = true;
      } else {
        this.flag = false;
      }
    },
    // 拒绝原因确定按钮
    sendReason() {
      this.$router.push({
        name: 'Commission',
        params: { // 为了跳转到我的审核-未审核
          tabIndexGive: 1,
          activeGive: 1,
        },
      });
    },
  },
  watch: {
    // 监听flag变化，这里flag对应输入框的校验
    // 输入框校验正确，flag属性改为true，
    // 所有的输入框值校验正确，那么flag才为true，此时可以点击同意按钮
    flag: {
      handler(newVal) {
        if (newVal) {
          this.thisStyle = 'background:rgba(102, 102, 102, 1)';
          this.disabled = false;
        } else {
          this.thisStyle = 'background: #cccccc';
          this.disabled = true;
        }
      },
    },
  },
};
</script>

<style lang='less'>
button{
     outline: none;
}
.home{
    font-size: .875rem;
    .refuse_box{
        padding: .5rem;
        .refuse_title{
            height: 2rem;
            line-height: 2rem;
            color: #999999;
        }
        .refuse_content{
            .van-cell{
                height: auto;
                border-bottom: 0;
                .van-cell__value{
                    display: initial;
                    border: 1px solid rgba(204, 204, 204, 1);
                    border-radius: .5rem;
                    background: rgba(242, 242, 242, 1);
                    padding: 1rem 1rem;
                    .van-field__body{
                        width: 100%;
                        .van-field__control{
                        }
                    }
                }
            }
            .refuse_reason{
                .van-field__control{
                    text-align: left;
                }
            }
        }
    }
    .refuse_btn{
        margin-top:2rem;
        line-height: 3rem;
        height: 3rem;
        text-align: center;
        .refuse_btn_confirm{
            width: 70%;
            margin: auto;
            border-radius: .5rem;
            background: #cccccc;
            color: #ffffff;
        }
    }
}

</style>

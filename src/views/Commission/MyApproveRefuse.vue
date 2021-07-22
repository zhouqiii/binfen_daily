<template>
  <div>
    <nav-bar-top title="拒绝" :navBg="navBg"></nav-bar-top>
    <div class="home">
      <div class="refuse_box">
        <div class="refuse_title">请写明拒绝原因</div>
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
        <button
          class="refuse_btn_confirm"
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
import { checkTask } from '@/api/commission';

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
      const obj = {
        checkRemark: this.refuseReason,
        checkStatus: '0', // 0为拒绝 1为同意
        checkType: this.info.type,
        id: this.info.id,
      };
      checkTask({ checkList: [obj] })
        .then((res) => {
          if (res.code) {
            this.$router.go(-2);
            console.log(res);
          }
        })
        .catch((err) => {
          console.log('sendReason checkTask err', err);
        });
    },
  },
  mounted() {
    this.info = JSON.parse(this.$route.query.info);
    console.log('this.info', this.info);
  },
  watch: {
    // 监听flag变化，这里flag对应输入框的校验
    // 输入框校验正确，flag属性改为true，
    // 所有的输入框值校验正确，那么flag才为true，此时可以点击同意按钮
    flag: {
      handler(newVal) {
        if (newVal) {
          this.thisStyle = 'background:#2f80ed;opcity:1';
          this.disabled = false;
        } else {
          this.thisStyle = 'opcity: 0.6';
          this.disabled = true;
        }
      },
    },
  },
};
</script>

<style lang="less">
button {
  outline: none;
}
.home {
  font-size: 0.875rem;
  .refuse_box {
    padding: 0 @pad16 @pad18 @pad16;
    margin-top: @mar16;
    background: #ffffff;
    .refuse_title {
      height: 94px;
      line-height: 94px;
      color: @fontC4D4;
      font-size: @font15;
      font-weight: 700;
    }
    .refuse_content {
      .van-cell {
        height: auto;
        border-bottom: 0;
        .van-cell__value {
          display: initial;
          border: 1px solid #e0e0e0;
          border-radius: 16px;
          background: #ffffff;
          padding: 24px 30px;
          .van-field__body {
            width: 100%;
            .van-field__control {
              height: 160px !important;
              font-size: @font13;
              line-height: 32px;
            }
          }
          .van-field__word-limit {
            font-size: @font13;
            color: #bdbdbd;
          }
        }
      }
      .refuse_reason {
        .van-field__control {
          text-align: left;
        }
      }
    }
  }
  .refuse_btn {
    margin-top: 2rem;
    line-height: 3rem;
    height: 3rem;
    text-align: center;
    .refuse_btn_confirm {
      width: 650px;
      margin: auto;
      font-size: @font16;
      color: @fontCWhite;
      font-weight: 700;
      border-radius: 20px;
      background: rgba(#2f80ed, 0.6);
      color: #ffffff;
    }
  }
}
</style>

<template>
  <div class="box">
    <nav-bar-top title="修改登录密码"></nav-bar-top>
    <div class="home">
      <div class="home_input">
        <div>
          <van-field
            class="field"
            v-model="oldPsw"
            label="原始密码"
            v-on:input="getData"
            clearable
            placeholder="请输入原始密码"
            type="password"
          />
        </div>
        <div>
          <van-field
            class="field"
            v-model="newPsw"
            clearable
            label="新密码"
            v-on:input="getData"
            placeholder="请输入新密码"
            type="password"
          />
        </div>
        <div>
          <van-field
            class="field"
            v-model="checkNewPsw"
            clearable
            label="确认新密码"
            v-on:input="getData"
            placeholder="请再次输入新密码"
            type="password"
          />
        </div>
      </div>
      <div class="submit_btn_change">
        <button class="sendBtn_change" @click="sendData" :disabled="disabled" :style="thisStyle">
          提交
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { updatePassword } from '@/api/user';

export default {
  name: 'ChangeAccount',
  data() {
    return {
      oldPsw: '',
      newPsw: '',
      checkNewPsw: '',
      disabled: true,
      thisStyle: '',
    };
  },
  methods: {
    getData() {
      if (this.oldPsw && this.newPsw && this.checkNewPsw) {
        this.disabled = false;
        this.thisStyle = 'background:#2F80ED';
      } else {
        this.disabled = true;
        this.thisStyle = 'background:rgba(#2F80ED,.6);';
      }
    },
    sendData() {
      if (this.newPsw !== this.checkNewPsw) {
        this.$dialog.alert({
          message: '两次密码输入不一致！',
          confirmButtonText: '确定',
        });
        return;
      }
      if (this.oldPsw === this.newPsw) {
        this.$dialog.alert({
          message: '新密码不能与旧密码相同！',
          confirmButtonText: '确定',
        });
        return;
      }
      const name = this.storage.get('username');
      updatePassword({
        newPassword: this.newPsw,
        oldPassword: this.oldPsw,
        username: name,
      })
        .then((res) => {
          if (res.success) {
            this.$dialog
              .alert({
                message: '密码已修改，请重新登录！',
                confirmButtonText: '确定',
              })
              .then(() => {
                this.storage.clear();
                this.$router.replace({ path: '/SignIn' });
                // window.location.reload();
              });
          } else {
            this.$dialog.alert({
              message: '密码修改失败，请重试！',
              confirmButtonText: '确定',
            });
          }
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="less">
.box {
  background-color: #f9fafc;
}

.home_input {
  box-sizing: border-box;
  margin-top: 1rem;
  color: black;

  div {
    align-items: center;
    background: #ffffff;
  }

  .home_input_item {
    margin-bottom: 10px;
    border-bottom: 1px solid #ededed;
  }

  .field {
    padding-left: 32px;
    height: 106px;
    border-bottom: @borderColor;
    border-radius: 0;
    .van-field__control {
      height: 106px;
      line-height: 106px;
    }
    .van-cell__title {
      width: 5rem;
      line-height: 3rem;
    }

    .van-field__control {
      text-align: left;
    }
  }

  .van-field__body {
    width: 480px;
  }

  .van-field__label {
    margin-right: 40px;
    color: #4d4d4d;
    font-family: PingFang SC;
    font-weight: medium;
    font-size: @font15;
    line-height: normal;
    letter-spacing: 0px;
    text-align: left;
  }
}

.submit_btn_change {
  margin: 78px auto 0 auto;
  text-align: center;
  .sendBtn_change {
    width: 650px;
    color: @fontCWhite;
    height: 102px;
    line-height: 102px;
    border-radius: 20px;
    background: rgba(#2f80ed, 0.6);
    margin: auto;
    text-align: center;
    font-size: 32px;
    font-weight: 700;
  }
}
</style>

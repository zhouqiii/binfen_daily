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
                <button class="sendBtn_change" @click="sendData"
                    :disabled="disabled"
                    :style="thisStyle"
                >提交</button>
            </div>
        </div>
    </div>
</template>
<script>
import createDom from '../utils/createDom';
import DialogMessage from '../components/MyComponents/DialogMessage.vue';

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
        this.thisStyle = 'background:#666666';
      } else {
        this.disabled = true;
        this.thisStyle = 'background:#d3d3d3';
      }
    },
    sendData() {
      if (this.newPsw !== this.checkNewPsw) {
        createDom(
          DialogMessage,
          {},
          {
            content: `<div style="text-align:center">两次密码输入不一致！</div>
                          
                          `,
            showBtn: false,
          },
        );
      } else if (this.oldPsw === this.newPsw) {
        createDom(
          DialogMessage,
          {},
          {
            content: `<div style="text-align:center">新密码不能与旧密码相同！</div>
                          
                          `,
            showBtn: false,
          },
        );
      } else {
        const name = this.storage.get('username');
        this.requestAxios({
          url: '/api/admin/updatePassword',
          data: {
            newPassword: this.newPsw,
            oldPassword: this.oldPsw,
            username: name,
          },
          method: 'post',
        })
          .then((res) => {
            if (res.success) {
              createDom(
                DialogMessage,
                {},
                {
                  content: `<div style="text-align:center">密码已修改，请重新登陆！</div>
                          
                          `,
                },
              );
            } else {
              createDom(
                DialogMessage,
                {},
                {
                  content: `<div style="text-align:center">密码修改失败，请重试！</div>
                          
                          `,
                  showBtn: false,
                },
              );
            }
          })
          .catch(() => {
          });
      }
    },
  },
};
</script>

<style lang="less">
.home_input{
    margin-top: 1rem;
    color: black;
    div{
        height: 3rem;
        align-items: center;
        background: #ffffff;
    }
    .field{
        padding-left: 1rem;
        .van-cell__title{
            width: 5rem;
            line-height: 3rem;
        }
        .van-field__control{
            text-align: left;
        }

    }
}
.submit_btn_change{
    margin-top: 3rem;
    width: 90%;
    padding-left: 1rem;
    .sendBtn_change{
      width: 100%;
      color: #ffffff;
      height: 2.5rem;
      line-height: 2.5rem;
      background: #d3d3d3;
      border-radius:.5rem ;
      margin: auto;
      text-align: center;
      font-size: .875rem;

    }
}

</style>

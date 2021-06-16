<template>
    <div class="home">
        <div class="login login_title">
            <div class="login_title_img">
                <van-image :src="src">
                    <template v-slot:error>加载失败</template>
                </van-image>
            </div>
            <div>欢迎登录</div>
        </div>
        <div class="login login_input">
            <div>
                <div>用户名</div>
                <van-field v-model="phone"
                    class="userinput"
                    placeholder="请输入用户名"
                    :error-message="err.phoneErr"
                    @blur="checkPhone"
                    v-on:input="getData"
                    autocomplete="new-password"
                />
            </div>
            <div style="margin-top:2rem">
                <div>密码</div>
                <van-field
                    maxlength="20"
                    :type="seen?'password':'text'"
                    v-model="pwd"
                    placeholder="请输入密码"
                    class="pwdinput"
                    autocomplete="new-password"
                    v-on:input="getData"
                >
                    <img slot="right-icon" v-if='eye'
                        @click="changeSeen"
                        src="../assets/icons/eye-close.png"
                        alt="图片加载失败"
                    />
                    <img slot="right-icon" v-if='!eye'
                        @click="changeSeen"
                        src="../assets/icons/eye.png"
                        alt="图片加载失败"
                    />
                </van-field>
            </div>
        </div>
        <div class="login login_btn">
            <button class="login_btn_button"
                :style="changeStyle"
                :disabled="btnAgree"
                @click="sendLogin"
            >登录</button>
        </div>
    </div>
</template>
<script>
import '../assets/css/style/login.less';
import createDom from '../utils/createDom';
import DialogMessage from '../components/MyComponents/DialogMessage.vue';
import logo from '../assets/icons/logoFormssi.png';

const time = new Date().getTime() + 7 * 24 * 3600 * 1000;
// const num = /^[0-9]*$/;// 判断字符串是否只为数字[0−9]∗]∗/

export default {
  name: 'SignIn',
  data() {
    return {
      phone: '', // 电话号码
      pwd: '', // 密码
      type: 'password',
      changeStyle: '',
      src: logo,
      code: '',
      seen: 'password',
      btnAgree: true,
      eye: true,
      err: {
        phoneErr: '', // 电话号码错误提示
      },
    };
  },
  methods: {
    // 手机号校验只能是11位数字
    checkPhone() {
      if (!this.phone) {
        this.err.phoneErr = '请输入用户名！';
        return false;
      }
      // if (!num.test(this.phone)) {
      //   this.err.phoneErr = '格式错误！';
      //   return false;
      // } if (this.phone.length !== 11) {
      //   this.err.phoneErr = '手机号为11位！';
      //   return false;
      // }
      this.err.phoneErr = '';
      return true;
    },
    // 必须在手机号11位之后且全为数字，密码大于8位才能触发登录按钮--先不要求
    getData() {
      // if (this.phone.length === 11 && num.test(this.phone)) {
      //   this.err.phoneErr = '';
      //   if (this.pwd.length >= 6) {
      //     this.flag = true;// 此时手机号和密码符合要求
      //   }
      // }
      const username = this.phone.toString().split(' ').join('');
      const password = this.pwd.toString().split(' ').join('');
      if (username && password) {
        this.changeStyle = 'background: rgba(12, 8, 8, 0.63)';
        this.btnAgree = false;
      } else {
        this.changeStyle = 'background: #d3d3d3';
        this.btnAgree = true;
      }
    },
    // 密码是否可见
    changeSeen() {
      this.type = this.seen ? 'password' : 'text';
      this.seen = !this.seen;
      this.eye = !this.eye;
    },
    // 登陆按钮
    sendLogin() {
      const username = this.phone.toString().split(' ').join('');
      const password = this.pwd.toString().split(' ').join('');
      this.requestLogin({
        url: '/personnelInfo/personnel-info/login',
        data: {
          password,
          username,
        },
        method: 'post',
      })
        .then((res) => {
          if (!res.success) {
            createDom(
              DialogMessage,
              {},
              {
                content: `<div style="text-align:center">${res.message}</div>
                          <div style="text-align:center;margin-top:.5rem">请重新输入！</div>
                          `,
                knowBtn: true,
              },
            );
          } else {
            this.storage.set('username', username, time);
            this.storage.set('password', password, time);
            const token = res.data.tokenHead + res.data.token;
            this.storage.set('loginToken', token, time);
            this.$router.push({
              path: '/',
            });
          }
        })
        .catch(() => {
        });
    },
  },

};
</script>

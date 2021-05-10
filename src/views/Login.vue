<template>
    <div class="home">
        <div class="login login_title">
            <div class="login_title_img">
                <van-image :src="src">
                    <template v-slot:error>加载失败</template>
                </van-image>
            </div>
            <div>欢迎登陆</div>
        </div>
        <div class="login login_input">
            <div>
                <div>用户名</div>
                <van-field v-model="phone"
                    class="userinput"
                    placeholder="请输入手机号"
                    :error-message="err.phoneErr"
                    v-on:input="getData"
                    @blur="checkPhone"
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
                :disabled="btnAgree"
                :style="thisStyle"
                @click="sendLogin"
            >登陆</button>
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
      thisStyle: '',
      src: logo,
      code: '',
      seen: 'password',
      btnAgree: true,
      flag: false, // flag对应输入框的校验,校验正确flag里该对应属性修改为true,此时登录按钮可点击
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
        this.err.phoneErr = '请填写手机号！';
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
      //   } else {
      //     this.flag = false;
      //   }
      // } else {
      //   this.flag = false;
      // }
      const username = this.phone.toString().split(' ').join('');
      const password = this.pwd.toString().split(' ').join('');
      if (username && password) {
        this.flag = true;
      } else {
        this.flag = false;
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
      this.requestLogin({
        url: '/admin/login',
        data: {
          password: this.pwd,
          username: this.phone,
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
            this.storage.set('username', this.phone, time);
            this.storage.set('password', this.pwd, time);
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
  watch: {
    // 监听flag变化，这里flag对应输入框的校验
    // 输入框校验正确，flag属性改为true，
    // 所有的输入框值校验正确，那么flag才为true，此时可以点击同意按钮
    flag: {
      handler(newVal) {
        if (newVal) {
          this.thisStyle = 'background: #0c0808a1';
          this.btnAgree = false;
        } else {
          this.thisStyle = 'background: #d3d3d3';
          this.btnAgree = true;
        }
      },
    },
  },

};
</script>

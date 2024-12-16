<template>
  <div>
    <div class="login_content_bg">
      <img :src="login_bg" class="login_bg_img" />
      <div class="logon_content_bx">
        <div class="login_content_tp">
          <img :src="login_bx" class="login_bx_img" />
          <p>乡帮帮调度系统管理后台</p>
        </div>
        <div class="login_content_bm">
          <el-form
            autoComplete="on"
            :model="loginForm"
            :rules="loginRules"
            ref="loginForm"
            label-position="left"
          >
            <el-form-item prop="username">
              <el-input
                class="login_input"
                name="username"
                type="text"
                v-model="loginForm.username"
                autoComplete="on"
                placeholder="请输入用户名"
              >
                <span slot="prefix" style="display: inline-block;">
                  <img
                    src="../../assets/images/login-icon1.png"
                    class="login-icon"
                    alt=""
                  />
                  <!-- <svg-icon
                    icon-class="loginuser"
                    class="color-main"
                  ></svg-icon> -->
                </span>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                class="login_input t8"
                name="password"
                :type="pwdType"
                @keyup.enter.native="handleLogin"
                v-model="loginForm.password"
                autoComplete="on"
                placeholder="请输入密码"
              >
                <span slot="prefix" style="display: inline-block;">
                  <img
                    src="../../assets/images/login-icon2.png"
                    class="login-icon"
                    alt=""
                  />
                  <!-- <svg-icon icon-class="loginpwd" class="color-main"></svg-icon> -->
                </span>
                <!--<span slot="suffix" @click="showPwd">
                  <svg-icon icon-class="eye" class="color-main"></svg-icon>
                </span>-->
              </el-input>
            </el-form-item>
            <el-form-item style="text-align: center">
              <el-button
                class="logon_btn"
                type="primary"
                :loading="loading"
                @click="handleLogin"
              >
                <!--     @click.native.prevent="handleLogin" -->
                登 录
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <p class="login_copyright">
        版权所有 深圳市乡邦科技有限公司2010～2030年 版本号 V1.1.0.2
      </p>
    </div>
  </div>
</template>

<script>
import { isvalidUsername, validateE_N, validateC_E_N } from '@/utils/validate'
import { setSupport, getSupport, setCookie, getCookie } from '@/utils/support'
import login_bg from '@/assets/images/login_bg.png'
import login_bx from '@/assets/images/login_bx.png'
import md5 from 'js-md5'
export default {
  name: 'login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入账号'))
      } else if (!validateC_E_N(value)) {
        return callback(new Error('请输入中英文或数字'))
      } else if ((value + '').length < 2 || (value + '').length > 20) {
        return callback(new Error('请输入2~20个中英文数字'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入密码'))
      } else if (!validateE_N(value)) {
        return callback(new Error('请输入6~20个英文数字或下划线'))
      } else if ((value + '').length < 6 || (value + '').length > 20) {
        return callback(new Error('请输入6~20个英文数字或下划线'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur', validator: validateUsername }
        ],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      loading: false,
      pwdType: 'password',
      login_bg,
      login_bx,
      dialogVisible: false,
      supportDialogVisible: false
    }
  },
  created() {
    this.loginForm.username = getCookie('username')
    this.loginForm.password = getCookie('password')
    if (
      this.loginForm.username === undefined ||
      this.loginForm.username == null ||
      this.loginForm.username === ''
    ) {
      this.loginForm.username = ''
    }
    if (
      this.loginForm.password === undefined ||
      this.loginForm.password == null
    ) {
      this.loginForm.password = ''
    }
  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          // let isSupport = getSupport();
          // if(isSupport===undefined||isSupport==null){
          //   this.dialogVisible =true;
          //   return;
          // }
          this.loading = true
          let loginForm = {
            password: md5(this.loginForm.password),
            username: this.loginForm.username
          }

          this.$store
            .dispatch('Login', loginForm)
            .then(res => {
              this.loading = false
              setCookie('trueName', res.retData.trueName, 15)
              // setCookie("password", this.loginForm.password, 15);

              if (res.retCode === 200) {
                setCookie('countyName', res.retData.countyName, 15)
                setCookie('cityName', res.retData.cityName, 15)
                setCookie('isSysAdmin', res.retData.isSysAdmin, 15)
              }
              this.$message({
                message: '登录成功！',
                type: 'success',
                duration: 1000
              })
              this.$router.push({ path: '/' })
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('参数验证不合法！')
          return false
        }
      })
    },
    handleTry() {
      this.dialogVisible = true
    },
    dialogConfirm() {
      this.dialogVisible = false
      setSupport(true)
    },
    dialogCancel() {
      this.dialogVisible = false
      setSupport(false)
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .el-input__prefix {
  top: 5px;
}
.t8 ::v-deep .el-input__prefix {
  top: 8px;
}

.login-icon {
  width: 22px;
  height: 22px;
}
.color-main {
  font-size: 16px;
  color: red;
}
.login-form-layout {
  position: absolute;
  left: 0;
  right: 0;
  width: 360px;
  margin: 140px auto;
  border-top: 10px solid #409eff;
}

.login-title {
  text-align: center;
}

.login-center-layout {
  background: #409eff;
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  margin-top: 200px;
}

.login_content_bg {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  box-sizing: content-box;
}
.login_bg_img {
  display: inline-block;
  width: 100%;
  height: auto;
}
.logon_content_bx {
  width: 400px;
  height: 420px;
  position: absolute;
  top: 50%;
  left: 50%;
  /* margin-left: -239px;
  margin-top: -245px; */
  transform: translate(-50%, -50%);
  border-radius: 20px;
  background-color: #fff;
  overflow: hidden;
}
.login_content_tp {
  width: 100%;
  height: 130px;
  position: relative;
}
.login_bx_img {
  width: 400px;
  height: 130px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}
.login_content_tp p {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  text-align: center;
  height: 130px;
  line-height: 130px;
  font-size: 28px;
  color: #fff;
  font-family: PingFang SC;
  font-weight: 500;
  z-index: 9;
}
.login_copyright {
  width: 100vw;
  text-align: center;
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #555555;
  bottom: 74px;
  line-height: 14px;
  position: absolute;
}
.login_content_bm {
  width: 317px;
  margin: 40px auto 0;
}
.login_content_bm .el-form-item {
  margin: 0;
}
// duu
:deep(.login_content_bm .el-form-item__content) {
  margin: 0;
}
.logon_btn {
  margin-top: 5px;
  width: 100%;
  height: 45px;
  border-radius: 22.5px;
  font-weight: 400;
  background-color: #5bc267;
  border-color: #5bc267;
  box-shadow: 0px 6px 23px 0px #ceffd4;
}
// duu
:deep(.logon_btn span) {
  font-size: 16px;
  font-weight: 400;
  font-family: PingFang SC;
}
// duu
:deep(.login_content_bm .el-input__inner) {
  border: 1px solid #fff;
  border-bottom: 1px solid #e6ebf1;
  font-size: 18px;
  line-height: 18px;
}
.login_input {
  margin-bottom: 30px;
}
// duu
:deep(.login_content_bm .el-form-item__content) {
  margin-bottom: 8px;
}
::v-deep .el-form-item__error {
  top: 45px;
}
::v-deep .el-form-item__error {
  position: absolute;
}
</style>

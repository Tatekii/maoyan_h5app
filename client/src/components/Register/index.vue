<template>
  <div id="content">
    <Header title="注册"></Header>
    <div class="login_body">
      <div>
        <input class="login_text" v-model="username" type="text" placeholder="账户名" />
      </div>
      <div>
        <input class="login_text" v-model="email" type="text" placeholder="Email" />
      </div>
      <div class="login_btn">
        <input type="submit" :class="disabled?'disabled':''" :value="verifyInfo" @touchstart="getVerifyCode" />
      </div>
      <div>
        <input class="login_text" v-model="verifyCode" type="text" placeholder="请输入验证码" />
      </div>
      <div>
        <input class="login_text" v-model="password1" type="password" placeholder="请设置密码" />
        <input class="login_text" v-model="password2" type="password" placeholder="请再次输入密码" />
      </div>
      <div class="login_btn">
        <input type="submit" value="注册" @touchstart="handleRegister" />
      </div>
      <div class="login_link">
        <router-link tag="a" to="login">登陆</router-link>
        <router-link tag="a" to="findPassword">找回密码</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
// import { messageBox } from "@/components/JsComponents";
export default {
  name: 'Register',
  data () {
    return {
      username: "",
      email: '',
      verifyCode: '',
      password1: '',
      password2: '',
      verifyInfo: '发送',
      disabled: false
    }
  },
  components: {
    Header
  },
  methods: {
    // 验证码倒计时
    verifyCount () {
      this.disabled = true
      let count = 60
      let timer = setInterval(() => {
        count--
        this.verifyInfo = `${count}(s)`
        if (count === 0) {
          this.disabled = false
          this.verifyInfo = '发送验证码'
          clearInterval(timer)
        }
      }, 1000)
    },
    // verifyCodecheck () {
    //   console.log('检查验证码')
    // },
    passcheck () {
      if ((this.pass1 && !this.pass2) || this.password1 !== this.password2) {
        window.alert("两次输入密码不一致")
        this.password1 = ''
        this.password2 = ''
        return false
      } else {
        return true
      }
    },
    getVerifyCode () {
      if(this.disabled)return
      
      console.log('验证码按钮')
      let rule = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if (this.email && rule.test(this.email)) {
        this.axios.get('/usrapi/verify?email=' + this.email).then(res => {
          if (res.data.status === 0) {
            // 验证码成功发送
            this.$message({
              type: 'info',
              message: '验证码发送成功'
            })
            this.verifyCount()
          } else {
            window.alert('服务器忙，请稍后再试')
          }
        })
      } else {
        this.$message({
          type: 'info',
          message: '邮箱格式错误'
        })
      }
    },
    handleRegister () {
      if (this.passcheck() && this.username && this.verifyCode && this.email) {
        this.axios.post('/usrapi/register', {
          username: this.username,
          email: this.email,
          verifyCode: this.verifyCode,
          password: this.password1
        }).then(res => {
          console.log(res)
          if (res.data.status === 0) {
            this.$router.push('/my/login')
          }else{
            this.$message({
              type:'waring',
              message:res.data.msg
            })
          }
        })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
#content .login_body
  width: 100%
.login_body .login_text
  width: 100%
  height: 40px
  border: none
  border-bottom: 1px #ccc solid
  margin-bottom: 5px
  outline: none
  text-indent: 10px
.login_body .login_btn
  height: 50px
  margin: 10px
.login_body .login_btn input
  width: 100%
  height: 100%
  background: #e54847
  border-radius: 3px
  border: none
  display: block
  color: white
  font-size: 20px
.login_body .login_btn input.disabled
  background gray
.login_body .login_link
  display: flex
  justify-content: space-between
.login_body .login_link a
  text-decoration: none
  margin: 0 5px
  font-size: 12px
  color: #e54847
.login_verifyNotice
  text-align: center
  color: red
</style>

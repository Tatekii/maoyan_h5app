<template>
  <div id="content">
    <Header title="登陆"></Header>
    <div class="login_body">
      <div>
        <input class="login_text" v-model="user" type="text" placeholder="账户名/Email" />
      </div>
      <div>
        <input class="login_text" v-model="password" type="password" placeholder="请输入您的密码" />
      </div>
      <div>
        <img src="/usrapi/verifyImg" alt="图像验证码" @click="refresh">
        <input class="login_text" v-model="verifyImgCode" placeholder="验证码？" />
      </div>
      <div class="login_btn">
        <input type="submit" value="登录" @touchstart="handleLogin" />
      </div>
      <div class="login_link">
        <router-link tag="a" to="register">立即注册</router-link>
        <router-link tag="a" to="findPassword">找回密码</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
export default {
  name: 'Login',
  data () {
    return {
      user: '',
      password: '',
      verifyImgCode:''
    }
  },
  components: {
    Header
  },
  methods: {
    refresh(e){
      e.target.src='/usrapi/verifyImg?'+Math.random()
      
    },
    handleLogin () {
      if (this.user && this.password && this.verifyImgCode) {
        let rule = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
        if (rule.test(this.user)) {
          this.axios.post('/usrapi/login', {
            email: this.user,
            password: this.password,
            verifyImgCode:this.verifyImgCode
          }).then(res => {
            if (res.data.status === 0) {
              window.alert('登陆成功')
              this.$router.push('/my/center')
            }else{
              window.alert(res.data.msg)
            }
          })
          // 邮箱登陆
        } else {
          this.axios.post('/usrapi/login', {
            username: this.user,
            password: this.password,
            verifyImgCode:this.verifyImgCode
          }).then(res => {
            if (res.data.status === 0) {
              window.alert('登陆成功')
              this.$router.push('/my/center')
            }else{
              window.alert(res.data.msg)
            }
          })
        }
      } else {
        window.alert('请填写信息')
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
.login_body .login_link
  display: flex
  justify-content: space-between
.login_body .login_link a
  text-decoration: none
  margin: 0 5px
  font-size: 12px
  color: #e54847
</style>

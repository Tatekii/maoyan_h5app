<template>
  <div id="content">
    <Header title="找回密码"></Header>
    <div class="find_body">
      <div>
        <input class="find_text" type="text" placeholder="Email" v-model="email" />
        <input class="find_text" type="text" placeholder="请输入验证码" v-model="verifyCode" />
        <div class="find_btn">
          <input type="submit" :class="disabled?'disabled':''" :value="verifyInfo" @touchstart="sendVerifyCode" />
        </div>
      </div>
      <div>
        <input class="find_text" type="password" placeholder="输入新密码" v-model="pass1" />
      </div>
      <div>
        <input
          class="find_text"
          type="password"
          placeholder="请在输入一遍"
          @blur="passcheck"
          v-model="pass2"
        />
      </div>
      <div class="find_btn">
        <input type="submit" value="修改密码" @touchstart="handleFindPassword" />
      </div>
      <div class="find_link">
        <router-link tag="a" to="/help">遇到问题</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { messageBox } from "@/components/JsComponents";
import Header from '@/components/Header'
export default {
  name: 'FindPassword',
  data () {
    return {
      verifyInfo: '发送',
      disabled: false,
      email: '',
      verifyCode: '',
      pass1: '',
      pass2: ''
    }
  },
  components: {
    Header
  },
  methods: {
    // 验证码倒计时
    verifyCount(){
      this.disabled = true
      let count = 60
      let timer = setInterval(()=>{
        count --
        this.verifyInfo = `${count}(s)`
        if(count===0){
          this.disabled = false
          this.verifyInfo = '发送验证码'
          clearInterval(timer)
        }
      },1000)
    },
    sendVerifyCode () {
      if (this.disabled) return
      let rule = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if (this.email && rule.test(this.email)) {
        this.axios.get('/usrapi/verify?email=' + this.email).then(res => {
          if (res.data.status === 0) {
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
    }
    ,
    passcheck () {
      if ((this.pass1 && !this.pass2) || this.pass1 !== this.pass2)
        messageBox({
          title: '密码不一致',
          content: '请检查您输入的密码',
          button1: '',
          button2: '👌🆗👌',
          handleButton2: () => {
            this.pass1 = ''
            this.pass2 = ''
          }
        })
    },
    handleFindPassword () {
      if (!this.email || !this.verifyCode || !this.pass1 || !this.pass2) return
      this.axios.post('/usrapi/findPassword', {
        email: this.email,
        verifyCode: this.verifyCode,
        password: this.pass1
      }).then(res => {
        if (res.data.status === 0) {
          window.alert(res.data.msg)
          this.$router.push('/my/login')
        } else {
          window.alert(res.data.msg)
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
#content .find_body
  width: 100%
.find_body .find_text
  width: 100%
  height: 40px
  border: none
  border-bottom: 1px #ccc solid
  margin-bottom: 5px
  outline: none
  text-indent: 10px
.find_body .find_btn
  height: 50px
  margin: 10px
.find_body .find_btn input
  width: 100%
  height: 100%
  background: #e54847
  border-radius: 3px
  border: none
  display: block
  color: white
  font-size: 20px
.find_body .find_link, .find_body .find_link a
  text-align: center
  font-size: 12px
  color: #e54847
.find_body .find_btn input.disabled
  background gray
</style>

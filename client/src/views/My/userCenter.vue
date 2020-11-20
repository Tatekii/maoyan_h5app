<template>
  <div>
    <Header title="个人中心"></Header>
    <div>当前用户:{{$store.state.user.user}}</div>
    <el-avatar :size="50" :preview-src-list="this.avatarUrl" :src="this.avatarUrl"></el-avatar>
    <input type="file" value="上传头像" name="avatar" @change="uploadAvatar" />
    <div>用户身份:{{$store.state.user.isAdmin?'管理员':'普通用户'}}</div>
    <div v-if="$store.state.user.isAdmin">
      <a href="/admin" target="_blank">进入管理后台</a>
      <!-- 通过a链接进入后台打开新标签 -->
      <!-- vue的状态管理会失效 -->
      <!-- 使用本地存储后获取 -->
    </div>
    <div class="btn">
      <button @touchstart="handleLogout">退出登陆</button>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from '@/components/Footer'
import Header from '@/components/Header'
// 单独引入axios
import axios from 'axios'

export default {
  name: 'Center',
  computed: {
    avatarUrl () {
      return this.$store.state.user.avatar
    }
  },
  data () {
    return {
    }
  },
  components: {
    Header,
    Footer
  },
  // 添加组建内部的路由前置守卫
  // 守卫内部获取不到this
  beforeRouteEnter (to, from, next) {
    axios.get('/usrapi/getUser').then(res => {
      if (res.data.status === 0) {
        console.log(res);
        // next中使用v访问组件
        next(vm => {
          // 存入全局store
          vm.$store.commit('user/CUR_USER', { user: res.data.data.user, isAdmin: res.data.data.isAdmin, avatar: res.data.data.avatar })
          // 存入本地存储
          window.localStorage.setItem('user', res.data.data.user)
          window.localStorage.setItem('isAdmin', res.data.data.isAdmin)
        })
      } else {
        next('/my/login')
      }
    })
  },
  methods: {
    uploadAvatar (e) {
      console.log(e);
      let file = e.target.files[0]
      let params = new FormData()
      params.append('avatar', file, file.name)
      console.log(params.get('avatar'));
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
      this.axios.post('/usrapi/uploadAvatar', params, config).then(res => {
        let status = res.data.status
        if (status === 0) {
          this.$message({
            type: 'info',
            message: res.data.msg
          })
          // { user: res.data.data.user, isAdmin: res.data.data.isAdmin, avatar: res.data.data.avatar }
          this.$store.commit('user/CUR_USER', { user: this.$store.state.user.user, isAdmin: this.$store.state.user.isAdmin,avatar: res.data.data.newAvatar })
        } else {
          this.$message({
            type: 'warning',
            message: res.data.msg + '请稍后再试'
          })
        }
      })

      // $store.state.user 
      // loginUser,newAvatar
      // this.axios.get('/usrapi/uploadAvatar',{params:{
      //   loginUser:this.$store.state.user.user,
      //   newAvatar:''
      // }}).then(res=>{
      //   let status = res.data.status
      //   if(status===0){
      //     this.$message({
      //       type:'info',
      //       message:res.data.msg
      //     })
      //     this.$store.commit('user/CUR_USER',{avatar:''})
      //   }else{
      //     this.$message({
      //       type:'warning',
      //       message:res.data.msg+'请稍后再试'
      //     })
      //   }
      // })
    },
    handleLogout () {
      this.axios.get('/usrapi/logout').then(res => {
        if (res.data.status === 0) {
          this.$store.commit('user/CUR_USER', { user: '', isAdmin: false, avatar: '' })
          // 移除本地存储中的用户信息
          window.localStorage.removeItem('user')
          window.localStorage.removeItem('isAdmin')
          this.$router.push('/my/login')
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>

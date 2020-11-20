<template>
  <el-container class="outer">
    <el-header>
      <h1>欢迎您，管理员[--"{{this.$store.state.user.user}}"--]</h1>
    </el-header>
    <el-container class="inner">
      <el-aside style="width:100px">
        <el-menu
          default-active="1"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#e54847"
        >
          <router-link to="/admin/userAdm">
            <el-menu-item index="1">
              <i class="el-icon-setting"></i>
              <span slot="title">用户</span>
            </el-menu-item>
          </router-link>
          <router-link to="/admin/movieAdm">
            <el-menu-item index="2">
              <i class="el-icon-setting"></i>
              <span slot="title">电影</span>
            </el-menu-item>
          </router-link>
          <router-link to="/admin/cinemaAdm">
            <el-menu-item index="3">
              <i class="el-icon-setting"></i>
              <span slot="title">影院</span>
            </el-menu-item>
          </router-link>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
    <el-footer>
      <a href="#" @click="handleQuit">退出系统</a>
    </el-footer>
  </el-container>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Admin',
  data () {
    return {
    }
  },
  // 后台路由守卫
  beforeRouteEnter (to, from, next) {
    axios.get('/adapi').then(res => {
      if (res.data.status === 0) {
        next()
      } else {
        next('/my/login')
      }
    })
  },
  methods: {
    // 退出系统
    handleQuit () {
      this.$confirm('退出后台系统, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.commit('user/CUR_USER', { user: '', isAdmin: false })
        window.localStorage.removeItem('user')
        window.localStorage.removeItem('isAdmin')
        window.opener = null; window.close()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消'
        });
      });
    }
  }

}
</script>

<style lang="stylus" scoped>
.el-header, .el-footer
  background-color: #e54847
  color: #333
  text-align: center
  line-height: 60px
.el-menu
  border: none
.el-menu-item.is-active
  border-right: 5px solid #e54847
.el-aside
  background-color: #545c64
  color: #333
  text-align: center
  line-height: 200px
.el-main
  background-color: #E9EEF3
  color: #333
  text-align: center
  height 100%
.el-container.outer
  height 100%
  min-width 970px
.el-container.inner
  height 80%
router-view
  overflow hidden
</style>

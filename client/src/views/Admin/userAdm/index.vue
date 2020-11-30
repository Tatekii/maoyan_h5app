<template>
  <div style="over-flow:hidden">
    <el-table :data="pageData" v-loading="loading" border style="width: 100%">
      <el-table-column prop="date" label="注册日期"></el-table-column>
      <el-table-column prop="avatar" label="头像">
        <template slot-scope="scope">
          <img class="avatar" :src="scope.row.avatar" alt="头像">
        </template>
      </el-table-column>
      <el-table-column prop="username" label="姓名"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column align="right">
        <template>
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
        </template>
        <!-- 插槽可以取得渲染出数据的数据... -->
        <!-- scope.$index(索引) 和scope.row(整行原始数据) -->
        <template slot-scope="scope">
          <el-button
            size="small"
            @click="switchFreeze(scope.$index,scope.row)"
          >{{scope.row.isFrozen?"解冻账户":"冻结账户"}}</el-button>
          <el-button size="small" @click="handleToDelete(scope.$index,scope.row)" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- .sync 修饰符 -->
    <el-pagination :page-sizes="pageSize" :current-page.sync="currentPage" background layout="prev, pager, next" :total="tableData.length"></el-pagination>
  </div>
</template>

<script>
export default {
  name: 'userAdm',
  data () {
    return {
      // ele的loading
      loading: true,
      tableData: [],
      search: '' ,
      pageSize:10,
      currentPage:1
    }
  },
  components:{
  },
  computed:{
    pageData(){
      return this.tableData.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)
    }
  },
  mounted () {
    this.axios.get('/adapi/userList').then(res => {
      if (res.data.status === 0) {
        let list = res.data.data.list
        this.tableData = list
        this.loading = false
      }
    })
  },
  methods: {
    switchFreeze (index, data) {
      this.axios.post('/adapi/userFreeze', { username: data.username, isFrozen: !data.isFrozen }).then(res => {
        if (res.data.status === 0) {
          this.tableData[index].isFrozen = !this.tableData[index].isFrozen
          let msg = data.isFrozen ? '冻结' : '解冻'
          this.$message({
            type: 'info',
            message: `已${msg}`
          })
        } else {
          this.$message({
            type: 'warning',
            message: '服务器错误'
          })
        }
      })
    },
    handleToDelete (index, data) {
      this.$confirm(`删除${data.username}, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios.post('/adapi/userDelete', { username: data.username }).then(res => {
          if (res.data.status === 0) {
            this.tableData.splice(index, 1)
            this.$message({
              type: 'info',
              message: '删除成功'
            })
          } else {
            this.$message({
              type: 'warning',
              message: res.data.msg
            })
          }
        })
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
.el-pagination
  margin-top 20px
img.avatar
  height 50px
</style>

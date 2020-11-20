<template>
  <div id="main">
    <Header title="影院"></Header>
    <!-- <Scroller> -->
    <div id="main">
      <div class="search_input">
        <div class="search_input_wrapper">
          <i class="iconfont icon-sousuo"></i>
          <router-link
            tag="input"
            placeholder="请输入影院"
            type="text"
            :to="{path:'search',query:{type:'2'}}"
          ></router-link>
        </div>
      </div>
      <div id="content">
        <div class="cinema_menu">
          <div class="city_switch">
            全城
            <i class="iconfont icon-lower-triangle"></i>
          </div>
          <div class="brand_swtich">
            品牌
            <i class="iconfont icon-lower-triangle"></i>
          </div>
          <div class="feature_switch">
            特色
            <i class="iconfont icon-lower-triangle"></i>
          </div>
        </div>
        <Scroller :handlePullDown="handlePullDown" :handlePullEnd="handlePullEnd">
            <CinemaList :cList="cList" :loadingMsg="loadingMsg"></CinemaList>
            <!-- TODO: -->
            <!-- 猫眼目前直接返回html结构 -->
            <!-- 配合另一个过滤器json进行筛选 -->
            <!-- <div ref="cineList"></div> -->
        </Scroller>
      </div>
    </div>
    <!-- </Scroller> -->
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CinemaList from '@/components/CinemaList'

export default {
  name: 'Cinema',
  data () {
    return {
      cList: '',
      loadingMsg: '',
      selectedId: -1,
      storeId: ''
    }
  },
  components: {
    Header,
    Footer,
    CinemaList
  },
  activated () {
    this.storeId = this.$store.state.city.id
    if (this.selectedId === this.storeId) { return }
    this.onLoading = true
    this.getData(this.storeId)
  },
  methods: {
    getData (cityId) {
      // filterCinemas?ci=30
      this.axios.get('/api/moreCinemas??&cityId=' + cityId).then((res) => {
        console.log(res);
        // this.$refs.cineList.innerHtml = 'res'
        this.selectedId = cityId
        this.cList = res.data.cinemas
        
      }).catch(err => console.log(err));
    },
    handlePullDown (pos) {
      if (pos.y > 30) {
        this.loadingMsg = '释放刷新'
      }
    },
    handlePullEnd (pos) {
      if (pos.y > 30) {
        this.loadingMsg = '正在刷新'
        this.getData(this.storeId)
        setTimeout(() => {
          this.loadingMsg = ''
        }, 1000)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
#content
  display: flex
#content .cinema_menu
  width: 100%
  height: 45px
  border-bottom: 1px solid #e6e6e6
  display: flex
  justify-content: space-around
  align-items: center
  background: white
.search_input
  padding: 8px 10px
  background-color: #f5f5f5
  border-bottom: 1px solid #e5e5e5
.search_input_wrapper
  padding: 0 10px
  border: 1px solid #e6e6e6
  border-radius: 5px
  background-color: #fff
  display: flex
  line-height: 20px
.search_input_wrapper i
  font-size: 16px
  padding: 4px 0
.search_input_wrapper input
  border: none
  font-size: 13px
  color: #333
  padding: 4px 0
  outline: none
  margin-left: 5px
  width: 100%
</style>
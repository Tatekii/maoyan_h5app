<template>
  <div id="main">
    <Header title="电影"></Header>
    <div id="content">
      <div class="movie_menu">
        <router-link tag="div" to="city" class="city_name active">
          <span>{{ $store.state.city.nm }}</span>
          <i class="iconfont icon-lower-triangle"></i>
        </router-link>
        <div class="hot_swtich">
          <router-link tag="div" to="onScreen" class="hot_item">正在热映</router-link>
          <router-link tag="div" to="comingSoon" class="hot_item">即将上映</router-link>
        </div>
        <router-link tag="div" :to="{path:'/search',query:{type:'-1'}}" class="search_entry">
          <i class="iconfont icon-sousuo"></i>
        </router-link>
      </div>
      <keep-alive>
        <router-view></router-view>
        <!-- keep-alive忘记加了 -->
      </keep-alive>
    </div>
    <Footer></Footer>
    <!-- 命名视图 -->
    <router-view name="detail"></router-view>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default {
  name: 'Movie',
  components: {
    Header,
    Footer
  }
}
</script>

<style lang="stylus" scoped>
#content .movie_menu
  width: 100%
  height: 45px
  border-bottom: 1px solid #e6e6e6
  display: flex
  justify-content: space-between
  align-items: center
  background: #e6e6e6
  z-index: 10
.movie_menu .city_name
  margin-left: 20px
  height: 100%
  line-height: 45px
.movie_menu .city_name.router-link-active
  color: #ef4238
  border-bottom: 2px #ef4238 solid
.movie_menu .hot_swtich
  display: flex
  height: 100%
  line-height: 45px
.movie_menu .hot_item
  font-size: 15px
  color: #666
  width: 80px
  text-align: center
  margin: 0 12px
  font-weight: 700
.movie_menu .hot_item.router-link-active
  color: #ef4238
  border-bottom: 2px #ef4238 solid
.movie_menu .search_entry
  margin-right: 20px
  height: 100%
  line-height: 45px
.movie_menu .search_entry.router-link-active
  color: #ef4238
  border-bottom: 2px #ef4238 solid
.movie_menu .search_entry i
  font-size: 24px
  color: red
</style>

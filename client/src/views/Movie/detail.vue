<template>
  <div id="detail">
    <Header title="影片详情">
      <i class="iconfont icon-right" @touchstart="handleReturn"></i>
    </Header>
    <div id="content" class="contentDetail">
      <div class="detail_list">
        <div class="detail_list_bg"></div>
        <div class="detail_list_filter"></div>
        <div class="detail_list_content">
          <div class="detail_list_img">
            <img src="/images/movie_1.jpg" alt />
          </div>
          <div class="detail_list_info">
            <h2>无名之辈</h2>
            <p>A Cool Fish</p>
            <p>9.2</p>
            <p>剧情,喜剧,犯罪</p>
            <p>中国大陆 / 108分钟</p>
            <p>2018-11-16大陆上映</p>
          </div>
        </div>
      </div>
      <div class="detail_intro">
        <h1>电影ID是{{this.movieId}}</h1>
        <h1>API失效了猫眼用的似乎是服务端渲染，我也找不到咯，搁置</h1>
      </div>
      <div class="detail_player swiper-container">
        <ul class="swiper-wrapper">
          <li class="swiper-slide">
            <div>
              <img src="/images/person_1.webp" alt />
            </div>
            <p>陈建斌</p>
            <p>马先勇</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
export default {
  name: 'Detail',
  components: {
    Header
  },
  props: ['movieId'],
  mounted () {
    this.axios.get('/detail/'+this.movieId).then(res=>{
      // this.axios.get('/api/comingList?ci=' + cityId + '&token=')
      console.log(res);
      
    })
    // this.axios.get('http://m.maoyan.com/asgard/movie/'+this.movieId)
  },
  methods: {
    handleReturn () {
      this.$router.back()
    }
  }
}
</script>

<style lang="stylus" scoped>
#detail
  position: absolute
  left: 0
  top: 0
  width: 100%
  min-height: 100%
  z-index: 66
  background: white
  animation .5s slideInto 
@keyframes slideInto {
  from{
    transform : translateX(100%)
    opacity 0
  }
  to{
    transform :translateX(0)
    opacity 1
  }
}
#content.contentDetail
  display: block
  margin-bottom: 0
#content .detail_list
  height: 200px
  width: 100%
  position: relative
  overflow: hidden
.detail_list .detail_list_bg
  width: 100%
  height: 100%
  background: url('/images/movie_1.jpg') 0 40%
  filter: blur(20px)
  background-size: cover
  position: absolute
  left: 0
  top: 0
.detail_list .detail_list_filter
  width: 100%
  height: 100%
  position: absolute
  background-color: #40454d
  opacity: 0.55
  position: absolute
  left: 0
  top: 0
  z-index: 1
.detail_list .detail_list_content
  display: flex
  width: 100%
  height: 100%
  position: absolute
  left: 0
  top: 0
  z-index: 2
.detail_list .detail_list_img
  width: 108px
  height: 150px
  border: solid 1px #f0f2f3
  margin: 20px
.detail_list .detail_list_img img
  width: 100%
  height: 100%
.detail_list .detail_list_info
  margin-top: 20px
.detail_list .detail_list_info h2
  font-size: 20px
  color: white
  font-weight: normal
  line-height: 40px
.detail_list .detail_list_info p
  color: white
  line-height: 20px
  font-size: 14px
  color: #ccc
#content .detail_intro
  padding: 10px
#content .detail_player
  margin: 20px
.detail_player .swiper-slide
  width: 70px
  margin-right: 20px
  text-align: center
  font-size: 14px
.detail_player .swiper-slide img
  width: 100%
  margin-bottom: 5px
.detail_player .swiper-slide p:nth-of-type(2)
  color: #999
</style>

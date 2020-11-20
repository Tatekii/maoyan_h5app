<template>
  <div class="movie_body">
    <OnLoading v-if="onLoading"></OnLoading>
    <Scroller v-else :handlePullDown="handlePullDown" :handlePullEnd="handlePullEnd">
      <ul>
        <li class="loadingMsg">
          <div>{{loadingMsg}}</div>
        </li>
        <li v-for="item in comingList" :key="item.id" @tap="intoDetail(item.id)">
          <div class="pic_show">
            <img :src="item.img | picWH('128.180')" />
          </div>
          <div class="info_list">
            <h2>{{item.nm}}</h2>
            <img v-if="item.version==='v3d'" src="@/assets/3d.png" alt="3d" />
            <p>
              <span class="person">{{item.wish}}</span> 人想看
            </p>
            <p>主演: {{item.star}}</p>
            <p>{{item.showInfo}}</p>
          </div>
          <div class="btn_pre">预售</div>
        </li>
      </ul>
    </Scroller>
  </div>
</template>

<script>
export default {
  name: 'ComingSoon',
  data () {
    return {
      comingList: [],
      loadingMsg: '',
      onLoading: true,
      selectedId: -1,
      storeId: ''
    }
  },
  activated () {
    this.storeId = this.$store.state.city.id
    // console.log('this.selectedId' + this.selectedId);
    if (this.selectedId === this.storeId) { return }
    this.onLoading = true
    this.getData(this.storeId)
  },
  methods: {
    intoDetail(id){
      this.$router.push('/movie/detail/chanel2/'+id)
    },
    getData (cityId) {
      this.axios.get('/api/comingList?ci=' + cityId + '&token=').then((res) => {
        // console.log(res.data);
        this.comingList = res.data.coming
        this.onLoading = false
        this.selectedId = cityId
      }).catch(err => {
        console.log(err)
      })
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
#content .movie_body
  flex: 1
  overflow: auto
.movie_body ul
  margin: 0 12px
  overflow: hidden
.movie_body ul li
  margin-top: 12px
  display: flex
  align-items: center
  border-bottom: 1px #e6e6e6 solid
  padding-bottom: 10px
.movie_body .pic_show
  width: 64px
  height: 90px
.movie_body .pic_show img
  width: 100%
.movie_body .info_list
  margin-left: 10px
  flex: 1
  position: relative
.movie_body .info_list h2
  font-size: 17px
  line-height: 24px
  width: 150px
  overflow: hidden
  white-space: nowrap
  text-overflow: ellipsis
.movie_body .info_list p
  font-size: 13px
  color: #666
  line-height: 22px
  width: 200px
  overflow: hidden
  white-space: nowrap
  text-overflow: ellipsis
.movie_body .info_list .grade
  font-weight: 700
  color: #faaf00
  font-size: 15px
.movie_body .info_list img
  height: 16px
  position: absolute
  right: 10px
  top: 5px
.movie_body .btn_mall, .movie_body .btn_pre
  width: 47px
  height: 27px
  line-height: 28px
  text-align: center
  background-color: #f03d37
  color: #fff
  border-radius: 4px
  font-size: 12px
  cursor: pointer
.movie_body .btn_pre
  background-color: #3c9fe6
.movie_body li.loadingMsg
  padding: 0
  margin: 0
  border: none
.movie_body li.loadingMsg div
  margin: 0 auto
</style>

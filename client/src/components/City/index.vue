<template>
  <div class="city_body">
    <div class="city_list">
      <Scroller ref="city_list">
        <div>
          <div class="city_hot">
            <h2>热门城市</h2>
            <ul class="clearfix">
              <li
                v-for="item in hotCity"
                :key="item.id"
                @tap="handleCity(item.nm,item.id)"
              >{{ item.nm }}</li>
            </ul>
          </div>
          <div class="city_sort" ref="city_sort">
            <div v-for="item in cityList" :key="item.index">
              <h2 class="alpha_index">{{item.index}}</h2>
              <ul>
                <li v-for="li in item.list" :key="li.id" @tap="handleCity(li.nm,li.id)">{{li.nm}}</li>
              </ul>
            </div>
          </div>
        </div>
      </Scroller>
    </div>
    <div class="city_index">
      <ul>
        <li
          v-for="(item,index) in cityList"
          :key="item.index"
          @touchstart="handleIndex(index)"
        >{{item.index}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'City',
  mounted () {
    let cityList = window.localStorage.getItem('cityList')
    let hotCity = window.localStorage.getItem('hotCity')

    if (cityList && hotCity) {
      this.cityList = JSON.parse(cityList)
      this.hotCity = JSON.parse(hotCity)
    } else {
      this.axios.get('/cityList').then((res) => {
        let cities = res.data.cts
        this.formatCities(cities)
        window.localStorage.setItem('cityList', JSON.stringify(this.cityList))
        window.localStorage.setItem('hotCity', JSON.stringify(this.hotCity))
      })
    }
  },
  data () {
    return {
      cityList: [],
      hotCity: []
    }
  },
  methods: {
    formatCities (data) {
      let cityList = []
      let hotCity = []

      for (let i in data) {
        let letter = data[i].py.substring(0, 1).toUpperCase()
        if (data[i].id < 46) {
          hotCity.push(data[i])
        }
        //首先查找list中有无这个index
        // 空数组做循环内代码不会执行
        // 先判断（以此循环）再添加（一次或不循环）
        if (indexCheck(letter)) {
          cityList.push({ index: letter, list: [data[i]] })
        } else {
          for (let j in cityList) {
            if (cityList[j].index === letter) {
              cityList[j].list.push(data[i])
            }
          }
        }
      }

      function indexCheck (letter) {
        for (let i in cityList) {
          if (cityList[i].index === letter) {
            return false
          }
        }
        return true
      }
      //按照字母排序
      cityList.sort((a, b) => {
        if (a.index > b.index) {
          return 1
        } else if (a.index < b.index) {
          return -1
        } else {
          return 0
        }

      })
      this.cityList = cityList
      this.hotCity = hotCity
    },
    handleIndex (index) {
      //index就是字母表的索引
      //不使用字母查找，排序过的使用脚标更方便
      let alphaDom = this.$refs.city_sort.getElementsByTagName('h2')
      // console.log(alphaDom[index].offsetTop);    
      // this.$refs.city_sort.parentNode.scrollTop = alphaDom[index].offsetTop

      // better-scroll的scroll方法
      // y轴上往上滚动为负
      this.$refs.city_list.scrollToAlpha(-alphaDom[index].offsetTop-210)
    },
    handleCity (nm, id) {
      this.$store.commit('city/CITY_INDEX', { nm, id })
      window.localStorage.setItem('currentCity', nm)
      window.localStorage.setItem('currentCityId', id)
      this.$router.push('/movie/onScreen')
    }
  }
}
</script>

<style lang='stylus' scoped>
.city_body
  margin-top: 45px
  display: flex
  width: 100%
  position: absolute
  top: 0
  bottom: 0
.city_body .city_list
  flex: 1
  overflow: auto
  background: #FFF5F0
.city_body .city_list::-webkit-scrollbar
  background-color: transparent
  width: 0
.city_body .city_hot
  margin-top: 20px
.city_body .city_hot h2
  padding-left: 15px
  line-height: 30px
  font-size: 14px
  background: #F0F0F0
  font-weight: normal
.city_body .city_hot ul li
  float: left
  background: #fff
  width: 29%
  height: 33px
  margin-top: 15px
  margin-left: 3%
  padding: 0 4px
  border: 1px solid #e6e6e6
  border-radius: 3px
  line-height: 33px
  text-align: center
  box-sizing: border-box
.city_body .city_sort
  position relative
.city_body .city_sort div
  margin-top: 20px
.city_body .city_sort .alpha_index
  padding-left: 15px
  line-height: 30px
  font-size: 14px
  background: #F0F0F0
  font-weight: normal
.city_body .city_sort ul
  padding-left: 10px
  margin-top: 10px
.city_body .city_sort ul li
  line-height: 30px
  line-height: 30px
.city_body .city_index
  width: 20px
  display: flex
  flex-direction: column
  justify-content: center
  text-align: center
  border-left: 1px #e6e6e6 solid
</style>

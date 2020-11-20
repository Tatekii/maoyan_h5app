<template>
  <div class="cinema_body">
      <ul>
        <li class="loadingMsg">
          <div>{{loadingMsg}}</div>
        </li>
        <li v-for="item in cList" :key="item.id">
          <div>
            <span>{{item.nm}}</span>
            <span class="q">
              <span class="price">{{item.sellPrice}}</span> 元起
            </span>
          </div>
          <div class="address">
            <span>{{item.addr}}</span>
            <span>{{item.distance}}</span>
          </div>
          <div v-if="!item.tag">
            <div class="card">
              <div class="bl" v-if="item.sell">座</div>
              <div class="bl" v-if="item.allowRefund">改签</div>
              <div class="bl" v-if="item.endorse">退</div>
              <div v-if="item.snack">小吃</div>
              <div class="bl" v-if="item.hallType&&item.hallType.length>0">{{item.hallType[0]}}</div>
            </div>
          </div>
          <div v-if="item.tag">
            <!-- 有tag的数据 -->
            <div class="card">
              <div
                v-for="(index,key) in tagFilter(item.tag)"
                :key="key"
                :class="key | formatCard('class')"
              >{{key | formatCard('value')}}</div>
              <!-- 不推荐vfor和vif写在一起，for循环优先级高影响性能，可以把要if判断的内容computed计算属性() -->
              <div v-if="item.tag.vipTag">{{item.tag.vipTag}}</div>
              <div class="bl" v-if="item.tag.hallType.length">{{item.tag.hallType[0]}}</div>
            </div>
          </div>
        </li>
      </ul>
  </div>
</template>

<script>
export default {
  name: 'CinemaList',
  props: {
    cList: {
      type: ''
    },
    loadingMsg: {
      type: ''
    }
  },
  computed: {
    // 这就是那个写了半天的计算属性
    tagFilter () {
      return function (data) {
        const res = {}
        Object.keys(data).filter(key => key != 'sell').forEach(key => {
          if (data[key] === 1) {
            res[key] = data[key]
          }
        })
        return res
      }
    }
  },
  filters: {
    // 过滤器是可以传入参数的，第一个参数|前，只用在()中写其余参数
    formatCard (key, prop) {
      let card = [
        { key: 'allowRefund', value: '改签', class: 'bl' },
        { key: 'endorse', value: '退', class: 'bl' },
        { key: 'snack', value: '小吃', class: 'or' }
      ]
      for (let i = 0; i < card.length; i++) {
        if (card[i].key === key) {
          if (prop === 'value') {
            return card[i].value
          }
          if (prop === 'class') {
            return card[i].class
          }
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
#content .cinema_body
  flex: 1
  overflow: auto
.cinema_body ul
  padding: 20px
.cinema_body li
  border-bottom: 1px solid #e6e6e6
  margin-bottom: 20px
.cinema_body div
  margin-bottom: 10px
.cinema_body .q
  font-size: 11px
  color: #f03d37
.cinema_body .price
  font-size: 18px
.cinema_body .address
  font-size: 13px
  color: #666
.cinema_body .address span:nth-of-type(2)
  float: right
.cinema_body .card
  display: flex
.cinema_body .card div
  padding: 0 3px
  height: 15px
  line-height: 15px
  border-radius: 2px
  font-size: 13px
  margin-right: 5px
  color: #f90
  border: 1px solid #f90
.cinema_body .card div.or
  color: #f90
  border: 1px solid #f90
.cinema_body .card div.bl
  color: #589daf
  border: 1px solid #589daf
.cinema_body li.loadingMsg
  padding: 0
  margin: 0
  border: none
.cinema_body li.loadingMsg div
  margin: 0 auto
</style>

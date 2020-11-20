<template>
  <div class="wrapper" ref="sWrapper">
    <slot></slot>
  </div>
</template>

<script>
import bScroll from 'better-scroll'
export default {
  name: 'Scroller',
  props:{
    handlePullDown:{
      type: Function,
      default:()=>{}
    },
    handlePullEnd:{
      type: Function,
      default:()=>{}
    }
  },
  mounted () {
    this.scroll = new bScroll(this.$refs.sWrapper, {
      tap: true,
      probeType: 1
    })
    this.scroll.on('scroll',(pos)=>{
      this.handlePullDown(pos)
    })
    this.scroll.on('touchEnd',(pos)=>{
      this.handlePullEnd(pos)
    })
  },
  methods: {
    scrollToAlpha(y){
      this.scroll.scrollTo(0,y)
    }
  }
}
</script>

<style lang="stylus" scoped>
.wrapper
  height: 100%
  overflow hidden
</style>

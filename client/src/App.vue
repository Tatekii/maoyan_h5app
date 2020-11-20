<template>
  <keep-alive>
    <router-view />
  </keep-alive>
</template>

<script>
// import { messageBox } from "@/components/JsComponents";
export default {
}
</script>

<style lang="stylus">
*
  margin: 0
  padding: 0
  text-decoration none
ul, li
  list-style: none
img
  display: block
html, body
  height: 100%
  min-width 375px
.clearfix:after
  content: ''
  display: block
  clear: both
#main
  height: 100%
  display: flex
  flex-direction: column
#content
  flex: 1
  overflow: auto
  margin-bottom: 50px
  position: relative
  display: flex
  flex-direction: column
</style>
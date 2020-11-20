<template>
  <div>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from '@/components/Footer'

export default {
  name: 'My',
  components: {
    Footer
  }
}
</script>

<style>
</style>

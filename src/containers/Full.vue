<template>
  <div class="app">
    <AppHeader/>
    <div class="app-body">
      <Sidebar/>
      <main class="main">
        <breadcrumb :list="list" />
        <div class="container-fluid">
          <router-view></router-view>
        </div>
      </main>
    </div>
    <!-- <AppFooter/> -->
  </div>
</template>

<script>
import AppHeader from '../components/header'
import Sidebar from '../components/sidebar'
// import AppFooter from '../components/Footer'
import Breadcrumb from '../components/breadcrumb'

export default {
  name: 'full',
  components: {
    AppHeader,
    Sidebar,
    // AppFooter,
    Breadcrumb
  },
  computed: {
    name() {
      return this.$route.name
    },

    list() {
      let len = this.$route.matched.length
      let breads = []
      for (let i = 0; i < len; i++) {
        breads.push({
          name: this.$route.matched[i].name,
          path: this.$route.matched[i].path
        })
      }
      if (this.$route.query.disable) {
        breads[len - 1].name = breads[len - 1].name.replace('修改', '查看')
      }
      return breads
    }
  }
}
</script>

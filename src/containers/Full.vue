<template>
  <div class="app">
    <AppHeader/>
    <div class="app-body">
      <Sidebar/>
      <main class="main">
        <breadcrumb :list="list"/>
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
    name () {
      return this.$route.name
    },

    list () {
      return this.$route.matched
    }
  }
}
</script>

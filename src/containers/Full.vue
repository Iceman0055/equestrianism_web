<template>
  <div class="app">
    <AppHeader />
    <div class="app-body">
      <Sidebar :menu-list="menuList" :menu-enable-map="menuEnableMap" />
      <main class="main">
        <breadcrumb :list="list" />
        <div class="container-fluid">
          <keep-alive>
            <router-view v-if="$route.meta.keepAlive">
            </router-view>
          </keep-alive>
          <router-view v-if="!$route.meta.keepAlive"></router-view>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import AppHeader from '../components/header'
import Sidebar from '../components/sidebar'
import Breadcrumb from '../components/breadcrumb'
import systemSrv from '../views/services/system.service.js'

export default {
  name: 'full',
  components: {
    AppHeader,
    Sidebar,
    Breadcrumb
  },
  data() {
    return {
      menuList: [],
      menuEnableMap: {}
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      systemSrv.getMenuList().then(resp => {
        vm.menuList = resp.data.menuList
      }, err => {
        vm.$message.error(err.msg)
      })
      vm.menuEnableMap = JSON.parse(window.localStorage.getItem('menuEnableMap'))
      vm.$watch("localStorage.menuEnableMap", () => {
        vm.menuEnableMap = JSON.parse(window.localStorage.getItem('menuEnableMap'))
      });
    })

  },
  // destroyed() {
  //   console.log('unmounted', this)
  //   this.unwatch()
  // },
  // mounted() {
  //   console.log('mounted',this)
  //   this.menuEnableMap = JSON.parse(window.localStorage.getItem('menuEnableMap'))
  //   this.$watch("localStorage.menuEnableMap", () => {
  //     this.menuEnableMap = JSON.parse(window.localStorage.getItem('menuEnableMap'))
  //   });
  // },
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
      if (this.$route.query.disable && this.$route.query.queryId) {
        breads[len - 1].name = breads[len - 1].name.replace('新增', '查看')
      }
      if (!this.$route.query.disable&& this.$route.query.queryId) {
        breads[len - 1].name = breads[len - 1].name.replace('新增', '修改')
      }
      return breads
    }
  }
}
</script>

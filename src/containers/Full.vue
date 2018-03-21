<template>
  <div class="app">
    <AppHeader/>
    <div class="app-body">
      <Sidebar :menu-list="menuList" />
      <main class="main">
        <breadcrumb :list="list" />
        <div class="container-fluid">
          <router-view></router-view>
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
      menuList:[],

    }
  },
   mounted() {
    systemSrv.getMenuList().then(resp => {
      this.menuList = resp.data.menuList
    }, err => {
      this.$message.error(err.msg)
    })
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

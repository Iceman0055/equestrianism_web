<template>
  <div class="sidebar">
    <nav class="sidebar-nav">
      <ul class="nav" v-for="menu in menuList.filter(menu => menuEnableMap[menu.menuId])" :key="menu">
        <li class="nav-item" v-if="menu.subMenuList == null">
          <router-link :to="convertMenu[menu.menuId]" class="nav-link">
            <i class="fa fa-bar-chart fa-lg"></i> {{menu.menuName}} </router-link>
        </li>
        <router-link v-if="menu.subMenuList != null" tag="li" class="nav-item nav-dropdown" :to="{ path: convertMenu[menu.menuId]}" disabled>
          <div class="nav-link nav-dropdown-toggle" @click="handleClick">
            <i :class="convertIcon[menu.menuName]"></i> {{menu.menuName}}</div>
          <ul class="nav-dropdown-items" v-for="subMenu in menu.subMenuList.filter(menu => menuEnableMap[menu.subMenuId])" :key="subMenu">
            <li class="nav-item">
              <router-link :to="convertMenu[subMenu.subMenuId]" class="nav-padding nav-link" exact>
                <i class="icon-star"></i> {{subMenu.subMenuName}}</router-link>
            </li>
          </ul>
        </router-link>
      </ul>
    </nav>
  </div>
</template>
<script>
export default {
  props: ['menuList'],
  name: 'sidebar',
  data() {
    return {
      menuEnableMap: {},
      convertIcon: {
        '马匹信息管理': 'fa fa-hand-lizard-o fa-lg',
        '马匹简历': 'fa fa-folder-open-o fa-lg',
        '马医院信息管理': 'fa fa-ambulance fa-lg',
        '马医院固定资产管理': 'fa fa-money fa-lg',
        '马术中心资产管理': 'fa fa-jpy fa-lg',
        '系统管理': 'fa fa-cog fa-lg'
      },
      convertMenu: {
        1: '/dashboard',
        2: '/horse',
        3: '/resume',
        4: '/hospital',
        5: '/hosAssets',
        6: '/equestrian',
        7: '/system',
        8: '/horse/baseInfo',
        9: '/horse/master',
        10: '/horse/feeder',
        11: '/horse/awards',
        12: '/horse/disease',
        13: '/horse/treatment',
        14: '/horse/vaccine',
        15: '/horse/nailInfo',
        16: '/horse/teethInfo',
        17: '/resume/horseResume',
        18: '/hospital/appointment',
        19: '/hospital/vaccination',
        20: '/hospital/treatSchedule',
        21: '/hospital/operateRoom',
        22: '/hospital/nail',
        23: '/hospital/teeth',
        24: '/hosAssets/assets',
        25: '/hosAssets/assetsStock',
        26: '/hosAssets/consume',
        27: '/hosAssets/consumeStock',
        28: '/equestrian/horseAssets',
        29: '/equestrian/horseStock',
        30: '/system/user',
        31: '/system/department',
        32: '/system/role',
        33: '/system/dictionary',
        34: '/system/assetsManage',
      }
    }
  },
  mounted() {
    this.menuEnableMap = JSON.parse(window.localStorage.getItem('menuEnableMap'))
    this.$watch("localStorage.menuEnableMap", () => {
      this.menuEnableMap = JSON.parse(window.localStorage.getItem('menuEnableMap'))
    });
  },
  methods: {
    handleClick(e) {
      e.preventDefault()
      e.target.parentElement.classList.toggle('open')
    }
  },

}
</script>

<style lang="css">
.nav-link {
  cursor: pointer;
}

.nav-padding {
  padding-left: 30px!important;
}
</style>

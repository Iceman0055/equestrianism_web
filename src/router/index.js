/* eslint-disable */
import Vue from "vue";
import Router from "vue-router";

// Containers
import Full from "@/containers/full";

// Views
import Dashboard from "@/views/dashboard";

// Views - Components
// 马匹信息管理
import baseInfo from "@/views/components/horse/baseInfo/baseInfo";
import addBaseInfo from "@/views/components/horse/baseInfo/addBaseInfo";
import updateBaseInfo from "@/views/components/horse/baseInfo/updateBaseInfo";
import addAwards from "@/views/components/horse/awards/addAwards";
import awards from "@/views/components/horse/awards/awards";
import updateAwards from "@/views/components/horse/awards/updateAwards";
import disease from "@/views/components/horse/disease/disease";
import addDisease from "@/views/components/horse/disease/addDisease";
import updateDisease from "@/views/components/horse/disease/updateDisease";
import vaccine from "@/views/components/horse/vaccine/vaccine";
import addVaccine from "@/views/components/horse/vaccine/addVaccine";
import updateVaccine from "@/views/components/horse/vaccine/updateVaccine";
import master from "@/views/components/horse/master/master";
import addMaster from "@/views/components/horse/master/addMaster";
import updateMaster from "@/views/components/horse/master/updateMaster";
import feeder from "@/views/components/horse/feeder/feeder";
import addFeeder from "@/views/components/horse/feeder/addFeeder";
import updateFeeder from "@/views/components/horse/feeder/updateFeeder";
import treatment from "@/views/components/horse/treatment/treatment";
import addTreatment from "@/views/components/horse/treatment/addTreatment";
import updateTreatment from "@/views/components/horse/treatment/updateTreatment";
import horseResume from "@/views/components/resume/horseResume";
import resumeDetail from "@/views/components/resume/resumeDetail";
import nailInfo from "@/views/components/horse/nailInfo/nailInfo";
import teethInfo from "@/views/components/horse/teethInfo/teethInfo";
// 马医院信息管理
import appointment from "@/views/components/hospital/appointment/appointment";
import updateAppoint from "@/views/components/hospital/appointment/updateAppoint";
import addAppoint from "@/views/components/hospital/appointment/addAppoint";
import vaccination from "@/views/components/hospital/vaccination/vaccination";
import updateVacc from "@/views/components/hospital/vaccination/updateVacc";
import addVacc from "@/views/components/hospital/vaccination/addVacc";
import assets from "@/views/components/hosAssets/assets/assets";
import addAssets from "@/views/components/hosAssets/assets/addAssets";
import assetsStock from "@/views/components/hosAssets/assetsStock/assetsStock";
import consumeStock from "@/views/components/hosAssets/consumeStock/consumeStock";
import updateAssets from "@/views/components/hosAssets/assets/updateAssets";
import consume from "@/views/components/hosAssets/consume/consume";
import addConsume from "@/views/components/hosAssets/consume/addConsume";
import updateConsume from "@/views/components/hosAssets/consume/updateConsume";
import treatSchedule from "@/views/components/hospital/treatSchedule/treatSchedule";
import addTreat from "@/views/components/hospital/treatSchedule/addTreat";
import updateTreat from "@/views/components/hospital/treatSchedule/updateTreat";
import operateRoom from "@/views/components/hospital/operateRoom/operateRoom";
import addOperateR from "@/views/components/hospital/operateRoom/addOperateR";
import updateOperateR from "@/views/components/hospital/operateRoom/updateOperateR";
import nail from "@/views/components/hospital/nail/nail";
import addNail from "@/views/components/hospital/nail/addNail";
import updateNail from "@/views/components/hospital/nail/updateNail";
import teeth from "@/views/components/hospital/teeth/teeth";
import addTeeth from "@/views/components/hospital/teeth/addTeeth";
import updateTeeth from "@/views/components/hospital/teeth/updateTeeth";

// 系统管理
import user from "@/views/components/system/user/user";
import addUser from "@/views/components/system/user/addUser";
import updateUser from "@/views/components/system/user/updateUser";
import department from "@/views/components/system/department/department";
import addDepart from "@/views/components/system/department/addDepart";
import updateDepart from "@/views/components/system/department/updateDepart";
import role from "@/views/components/system/role/role";
import addRole from "@/views/components/system/role/addRole";
import updateRole from "@/views/components/system/role/updateRole";
import dictionary from "@/views/components/system/dictionary/dictionary";
import assetsManage from "@/views/components/system/assetsManage/assetsManage";
// 马术中心资产管理
import horseAssets from "@/views/components/equestrian/horseAssets/horseAssets";
import hAddAssets from "@/views/components/equestrian/horseAssets/hAddAssets";
import hUpdateAssets from "@/views/components/equestrian/horseAssets/hUpdateAssets";
import horseStock from "@/views/components/equestrian/horseStock/horseStock";

// Views - Pages
import page404 from "@/views/components/pages/page404";
import page500 from "@/views/components/pages/page500";
import login from "@/views/components/pages/login";
import register from "@/views/components/pages/register";

Vue.use(Router);

export default new Router({
  mode: "hash", // Demo is living in GitHub.io, so required!
  linkActiveClass: "open active",
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: "/",
      redirect: "/pages/login",
      name: "主页",
      component: Full,
      children: [
        {
          path: "dashboard",
          name: "控制台",
          component: Dashboard
        },
        {
          path: "horse",
          redirect: "/horse/baseInfo",
          name: "马匹信息管理",
          component: {
            render(c) {
              return c("router-view");
            }
          },
          children: [
            {
              path: "baseInfo",
              name: "马匹基本信息",
              component: baseInfo,
              meta: {
                keepAlive: true //需要被缓存
              }
            },
            {
              path: "addBaseInfo",
              name: "新增马匹基本信息",
              component: addBaseInfo
            },
            {
              path: "updateBaseInfo",
              name: "修改马匹基本信息",
              component: updateBaseInfo
            },
            {
              path: "awards",
              name: "获奖信息",
              component: awards,
              meta: {
                keepAlive: true
              }
            },
            {
              path: "addAwards",
              name: "新增获奖信息",
              component: addAwards
            },
            {
              path: "updateAwards",
              name: "修改获奖信息",
              component: updateAwards
            },
            {
              path: "feeder",
              name: "饲养员信息",
              component: feeder,
              meta: {
                keepAlive: true
              }
            },
            {
              path: "addFeeder",
              name: "新增饲养员信息",
              component: addFeeder
            },
            {
              path: "updateFeeder",
              name: "修改饲养员信息",
              component: updateFeeder
            },
            {
              path: "master",
              name: "马主信息",
              component: master,
              meta: {
                keepAlive: true
              }
            },
            {
              path: "addMaster",
              name: "新增马主信息",
              component: addMaster
            },
            {
              path: "updateMaster",
              name: "修改马主信息",
              component: updateMaster
            },
            {
              path: "treatment",
              name: "治疗信息",
              component: treatment,
              meta: {
                keepAlive: true
              }
            },
            {
              path: "updateTreatment",
              name: "修改治疗信息",
              component: updateTreatment
            },
            {
              path: "addTreatment",
              name: "新增治疗信息",
              component: addTreatment
            },
            {
              path: "vaccine",
              name: "接种疫苗信息",
              component: vaccine,
              meta: {
                keepAlive: true
              }
            },
            {
              path: "addVaccine",
              name: "新增接种疫苗信息",
              component: addVaccine
            },
            {
              path: "updateVaccine",
              name: "修改接种疫苗信息",
              component: updateVaccine
            },
            {
              path: "disease",
              name: "病历信息",
              component: disease,
              meta: {
                keepAlive: true
              }
            },
            {
              path: "addDisease",
              name: "新增病历信息",
              component: addDisease
            },
            {
              path: "updateDisease",
              name: "修改病历信息",
              component: updateDisease
            },
            {
              path: "nailInfo",
              name: "钉甲信息",
              component: nailInfo,
              meta: {
                keepAlive: true
              }
            },
            {
              path: "teethInfo",
              name: "挫牙信息",
              component: teethInfo,
              meta: {
                keepAlive: true
              }
            }
          ]
        },
        {
          path: "hospital",
          redirect: "/hospital/appointment",
          name: "马医院信息管理",
          component: {
            render(c) {
              return c("router-view");
            }
          },
          children: [
            {
              path: "appointment",
              name: "预约日程管理",
              component: appointment,
              meta: {
                keepAlive: true
              }
            },
            {
              path: "addAppoint",
              name: "新增预约日程",
              component: addAppoint
            },
            {
              path: "updateAppoint",
              name: "修改预约日程",
              component: updateAppoint
            },
            {
              path: "vaccination",
              name: "接种疫苗管理",
              component: vaccination,
              meta: {
                keepAlive: true
              }
            },
            {
              path: "updateVacc",
              name: "修改接种疫苗管理",
              component: updateVacc
            },
            {
              path: "addVacc",
              name: "新增接种疫苗管理",
              component: addVacc
            },
            {
              path: "treatSchedule",
              name: "门诊治疗管理",
              component: treatSchedule,
              meta: {
                keepAlive: true
              }
            },
            {
              path: "addTreat",
              name: "新增门诊治疗",
              component: addTreat
            },
            {
              path: "updateTreat",
              name: "修改门诊治疗",
              component: updateTreat
            },
            {
              path: "operateRoom",
              name: "诊疗室管理",
              component: operateRoom,
              meta: {
                keepAlive: true
              }
            },
            {
              path: "addOperateR",
              name: "新增诊疗室",
              component: addOperateR
            },
            {
              path: "updateOperateR",
              name: "修改诊疗室",
              component: updateOperateR
            },
            {
              path: "nail",
              name: "钉甲管理",
              component: nail,
              meta: {
                keepAlive: true
              }
            },
            {
              path: "addNail",
              name: "新增钉甲",
              component: addNail
            },
            {
              path: "updateNail",
              name: "修改钉甲",
              component: updateNail
            },
            {
              path: "teeth",
              name: "挫牙管理",
              component: teeth,
              meta: {
                keepAlive: true
              }
            },
            {
              path: "addTeeth",
              name: "新增挫牙",
              component: addTeeth
            },
            {
              path: "updateTeeth",
              name: "修改挫牙",
              component: updateTeeth
            }
          ]
        },
        {
          path: "hosAssets",
          redirect: "/hosAssets/assets",
          name: "马医院固定资产管理",
          component: {
            render(c) {
              return c("router-view");
            }
          },
          children: [
            {
              path: "assets",
              name: "固定资产类品管理",
              component: assets,
              meta: {
                keepAlive: true
              }
            },
            {
              path: "addAssets",
              name: "新增固定资产类品",
              component: addAssets
            },
            {
              path: "updateAssets",
              name: "修改固定资产类品",
              component: updateAssets
            },
            {
              path: "assetsStock",
              name: "固定资产库存管理",
              component: assetsStock
            },
            {
              path: "consume",
              name: "消耗品类品管理",
              component: consume,
              meta: {
                keepAlive: true
              }
            },
            {
              path: "consumeStock",
              name: "消耗品库存管理",
              component: consumeStock
            },
            {
              path: "addConsume",
              name: "新增消耗品类品",
              component: addConsume
            },
            {
              path: "updateconsume",
              name: "修改消耗品类品",
              component: updateConsume
            }
          ]
        },

        {
          path: "equestrian",
          redirect: "/equestrian/horseAssets",
          name: "马术中心资产管理",
          component: {
            render(c) {
              return c("router-view");
            }
          },
          children: [
            {
              path: "horseAssets",
              name: "固定资产类品管理",
              component: horseAssets,
              meta: {
                keepAlive: true
              }
            },
            {
              path: "hAddAssets",
              name: "新增固定资产管理",
              component: hAddAssets
            },
            {
              path: "hUpdateAssets",
              name: "修改固定资产管理",
              component: hUpdateAssets
            },
            {
              path: "horseStock",
              name: "固定资产库存管理",
              component: horseStock
            }
          ]
        },
        {
          path: "resume",
          redirect: "/resume/horseResume",
          name: "马匹简历",
          component: {
            render(c) {
              return c("router-view");
            }
          },
          children: [
            {
              path: "horseResume",
              name: "简历查看",
              component: horseResume,
              meta: {
                keepAlive: true
              }
            },
            {
              path: "resumeDetail",
              name: "简历详情",
              component: resumeDetail
            }
          ]
        },

        {
          path: "system",
          redirect: "/system/user",
          name: "系统管理",
          component: {
            render(c) {
              return c("router-view");
            }
          },
          children: [
            {
              path: "user",
              name: "用户管理",
              component: user,
              meta: {
                keepAlive: true
              }
            },
            {
              path: "addUser",
              name: "新增用户",
              component: addUser
            },
            {
              path: "updateUser",
              name: "修改用户",
              component: updateUser,
            },
            {
              path: "department",
              name: "部门管理",
              component: department,
              meta: {
                keepAlive: true
              }
            },
            {
              path: "addDepart",
              name: "新增部门",
              component: addDepart
            },
            {
              path: "updateDepart",
              name: "修改部门",
              component: updateDepart
            },
            {
              path: "role",
              name: "角色管理",
              component: role,
              meta: {
                keepAlive: true
              }
            },
            {
              path: "addRole",
              name: "新增角色",
              component: addRole
            },
            {
              path: "updateRole",
              name: "修改角色",
              component: updateRole
            },
            {
              path: "dictionary",
              name: "字典管理",
              component: dictionary
            },
            {
              path: "assetsManage",
              name: "资产管理",
              component: assetsManage
            }
          ]
        }
      ]
    },
    {
      path: "/pages",
      name: "Pages",
      component: {
        render(c) {
          return c("router-view");
        }
      },
      children: [
        {
          path: "404",
          name: "page404",
          component: page404
        },
        {
          path: "500",
          name: "page500",
          component: page500
        },
        {
          path: "login",
          name: "login",
          component: login
        },
        {
          path: "register",
          name: "register",
          component: register
        }
      ]
    }
  ]
});

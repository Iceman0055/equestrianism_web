/* eslint-disable */
import Vue from "vue";
import Router from "vue-router";

// Containers
import Full from "@/containers/Full";

// Views
import Dashboard from "@/views/Dashboard";

// Views - Components
// 马匹信息管理
import BaseInfo from "@/views/components/horse/baseInfo/BaseInfo";
import AddBaseInfo from "@/views/components/horse/baseInfo/AddBaseInfo";
import UpdateBaseInfo from "@/views/components/horse/baseInfo/UpdateBaseInfo";
import AddAwards from "@/views/components/horse/awards/AddAwards";
import Awards from "@/views/components/horse/awards/Awards";
import UpdateAwards from "@/views/components/horse/awards/UpdateAwards";
import Disease from "@/views/components/horse/disease/Disease";
import AddDisease from "@/views/components/horse/disease/AddDisease";
import UpdateDisease from "@/views/components/horse/disease/UpdateDisease";
import Vaccine from "@/views/components/horse/vaccine/Vaccine";
import AddVaccine from "@/views/components/horse/vaccine/AddVaccine";
import UpdateVaccine from "@/views/components/horse/vaccine/UpdateVaccine";
import Master from "@/views/components/horse/master/Master";
import AddMaster from "@/views/components/horse/master/AddMaster";
import UpdateMaster from "@/views/components/horse/master/UpdateMaster";
import Breeder from "@/views/components/horse/breeder/Breeder";
import AddBreeder from "@/views/components/horse/breeder/AddBreeder";
import UpdateBreeder from "@/views/components/horse/breeder/UpdateBreeder";
import Treatment from "@/views/components/horse/treatment/Treatment";
import AddTreatment from "@/views/components/horse/treatment/AddTreatment";
import UpdateTreatment from "@/views/components/horse/treatment/UpdateTreatment";
import HorseResume from "@/views/components/resume/horseResume";
import ResumeDetail from "@/views/components/resume/ResumeDetail";
// 马医院信息管理
import Appointment from "@/views/components/hospital/appointment/Appointment";
import UpdateAppoint from "@/views/components/hospital/appointment/UpdateAppoint";
import AddAppoint from "@/views/components/hospital/appointment/AddAppoint";
import Vaccination from "@/views/components/hospital/vaccination/Vaccination";
import UpdateVacc from "@/views/components/hospital/vaccination/UpdateVacc";
import AddVacc from "@/views/components/hospital/vaccination/AddVacc";

import Assets from "@/views/components/hosAssets/assets/Assets";
import AddAssets from "@/views/components/hosAssets/assets/AddAssets";
import AssetsStock from "@/views/components/hosAssets/assetsStock/AssetsStock";
import ConsumeStock from "@/views/components/hosAssets/consumeStock/ConsumeStock";
import UpdateAssets from "@/views/components/hosAssets/assets/UpdateAssets";
import Consume from "@/views/components/hosAssets/consume/Consume";
import AddConsume from "@/views/components/hosAssets/consume/AddConsume";
import UpdateConsume from "@/views/components/hosAssets/consume/UpdateConsume";
import TreatSchedule from "@/views/components/hospital/treatSchedule/TreatSchedule";
import AddTreat from "@/views/components/hospital/treatSchedule/AddTreat";
import UpdateTreat from "@/views/components/hospital/treatSchedule/UpdateTreat";
import OperateRoom from "@/views/components/hospital/operateRoom/OperateRoom";
import AddOperateR from "@/views/components/hospital/operateRoom/AddOperateR";
import UpdateOperateR from "@/views/components/hospital/operateRoom/UpdateOperateR";

// 系统管理
import User from "@/views/components/system/user/User";
import AddUser from "@/views/components/system/user/AddUser";
import UpdateUser from "@/views/components/system/user/UpdateUser";
import Department from "@/views/components/system/department/Department";
import AddDepart from "@/views/components/system/department/AddDepart";
import UpdateDepart from "@/views/components/system/department/UpdateDepart";
import Role from "@/views/components/system/role/Role";
import AddRole from "@/views/components/system/role/AddRole";
import UpdateRole from "@/views/components/system/role/UpdateRole";
import Dictionary from "@/views/components/system/dictionary/Dictionary";
import AddDict from "@/views/components/system/dictionary/AddDict";
import UpdateDict from "@/views/components/system/dictionary/UpdateDict";
// 马术中心资产管理
import HorseAssets from "@/views/components/equestrian/horseAssets/HorseAssets";
import HorseAddAssets from "@/views/components/equestrian/horseAssets/HorseAddAssets";
import HorseUpdateAssets from "@/views/components/equestrian/horseAssets/HorseUpdateAssets";
import HorseAssetsStock from "@/views/components/equestrian/horseAssetsStock/HorseAssetsStock";


// Views - Pages
import Page404 from "@/views/components/pages/Page404";
import Page500 from "@/views/components/pages/Page500";
import Login from "@/views/components/pages/Login";
import Register from "@/views/components/pages/Register";

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
              component: BaseInfo
            },
            {
              path: "addBaseInfo",
              name: "新增马匹基本信息",
              component: AddBaseInfo
            },
            {
              path: "updateBaseInfo",
              name: "修改马匹基本信息",
              component: UpdateBaseInfo
            },
            {
              path: "awards",
              name: "获奖信息",
              component: Awards
            },
            {
              path: "addAwards",
              name: "新增获奖信息",
              component: AddAwards
            },
            {
              path: "updateAwards",
              name: "修改获奖信息",
              component: UpdateAwards
            },
            {
              path: "breeder",
              name: "饲养员信息",
              component: Breeder
            },
            {
              path: "addBreeder",
              name: "新增饲养员信息",
              component: AddBreeder
            },
            {
              path: "updateBreeder",
              name: "修改饲养员信息",
              component: UpdateBreeder
            },
            {
              path: "master",
              name: "马主信息",
              component: Master
            },
            {
              path: "addMaster",
              name: "新增马主信息",
              component: AddMaster
            },
            {
              path: "updateMaster",
              name: "修改马主信息",
              component: UpdateMaster
            },
            {
              path: "treatment",
              name: "治疗信息",
              component: Treatment
            },
            {
              path: "updateTreatment",
              name: "修改治疗信息",
              component: UpdateTreatment
            },
            {
              path: "addTreatment",
              name: "新增治疗信息",
              component: AddTreatment
            },
            {
              path: "vaccine",
              name: "接种疫苗信息",
              component: Vaccine
            },
            {
              path: "addVaccine",
              name: "新增接种疫苗信息",
              component: AddVaccine
            },
            {
              path: "updateVaccine",
              name: "修改接种疫苗信息",
              component: UpdateVaccine
            },
            {
              path: "disease",
              name: "病历信息",
              component: Disease
            },
            {
              path: "addDisease",
              name: "新增病历信息",
              component: AddDisease
            },
            {
              path: "updateDisease",
              name: "修改病历信息",
              component: UpdateDisease
            },
          
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
              component: Appointment
            },
            {
              path: "addAppoint",
              name: "新增预约日程",
              component: AddAppoint
            },
            {
              path: "updateAppoint",
              name: "修改预约日程",
              component: UpdateAppoint
            },
            {
              path: "vaccination",
              name: "接种疫苗管理",
              component: Vaccination
            },
            {
              path: "updateVacc",
              name: "修改接种疫苗管理",
              component: UpdateVacc
            },
            {
              path: "addVacc",
              name: "新增接种疫苗管理",
              component: AddVacc
            },
            {
              path: "treatSchedule",
              name: "门诊治疗管理",
              component: TreatSchedule
            },
            {
              path: "addTreat",
              name: "新增门诊治疗",
              component: AddTreat
            },
            {
              path: "updateTreat",
              name: "修改门诊治疗",
              component: UpdateTreat
            },
            {
              path: "operateRoom",
              name: "手术室管理",
              component: OperateRoom
            },
            {
              path: "addOperateR",
              name: "新增手术室",
              component: AddOperateR
            },
            {
              path: "updateOperateR",
              name: "修改手术室",
              component: UpdateOperateR
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
              component: Assets
            },
            {
              path: "addAssets",
              name: "新增固定资产类品",
              component: AddAssets
            },
            {
              path: "updateAssets",
              name: "修改固定资产类品",
              component: UpdateAssets
            },
            {
              path: "assetsStock",
              name: "固定资产库存管理",
              component: AssetsStock
            },
            {
              path: "consume",
              name: "消耗品类品管理",
              component: Consume
            },
            {
              path: "consumeStock",
              name: "消耗品库存管理",
              component: ConsumeStock
            },
            {
              path: "addConsume",
              name: "新增消耗品类品",
              component: AddConsume
            },
            {
              path: "updateconsume",
              name: "修改消耗品类品",
              component: UpdateConsume
            },      
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
              name: "固定资产管理",
              component: HorseAssets
            },
            {
              path: "horseAddAssets",
              name: "新增固定资产管理",
              component: HorseAddAssets
            },
            {
              path: "horseUpdateAssets",
              name: "修改固定资产管理",
              component: HorseUpdateAssets
            },
            {
              path: "horseAssetsStock",
              name: "固定资产库存管理",
              component: HorseAssetsStock
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
              component: HorseResume
            },
            {
              path: "resumeDetail",
              name: "简历详情",
              component: ResumeDetail
            },
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
              component: User
            },
            {
              path: "addUser",
              name: "新增用户",
              component: AddUser
            },
            {
              path: "updateUser",
              name: "修改用户",
              component: UpdateUser
            },
            {
              path: "department",
              name: "部门管理",
              component: Department
            },
            {
              path: "addDepart",
              name: "新增部门",
              component: AddDepart
            },
            {
              path: "updateDepart",
              name: "修改部门",
              component: UpdateDepart
            },
            {
              path: "role",
              name: "角色管理",
              component: Role
            },
            {
              path: "addRole",
              name: "新增角色",
              component: AddRole
            },
            {
              path: "updateRole",
              name: "修改角色",
              component: UpdateRole
            },
            {
              path: "dictionary",
              name: "字典管理",
              component: Dictionary
            },
            {
              path: "addDict",
              name: "新增字典",
              component: AddDict
            },
            {
              path: "updateDict",
              name: "修改字典",
              component: UpdateDict
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
          name: "Page404",
          component: Page404
        },
        {
          path: "500",
          name: "Page500",
          component: Page500
        },
        {
          path: "login",
          name: "Login",
          component: Login
        },
        {
          path: "register",
          name: "Register",
          component: Register
        }
      ]
    }
  ]
});

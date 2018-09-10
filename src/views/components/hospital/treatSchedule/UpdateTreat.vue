<template>
  <div class="content_page animated zoomIn">
    <div class="content-title">
      <div class="title" v-if="!useDisabled">修改门诊治疗</div>
      <div class="title" v-if="useDisabled">查看门诊治疗</div>
      <router-link class="btn btn-info back" :to="'/hospital/treatSchedule'">
        返回
      </router-link>
    </div>
    <div class="content-show">
      <div class="row list-search">
        <div class="col-md-4 search-field">
          <div class="label">门诊方式：</div>
          <el-select ref="selectWay" size="large" :disabled="useDisabled" v-model="treatWay" class="el-field-input" placeholder="请选择">
            <el-option v-for="(item,index) in treatWayOptions" :key="index" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="col-md-4 search-field" v-if="treatWay==2">
          <div class="label">预约号：</div>
          <input type="text" v-model="appointNum" :disabled="useDisabled" class="form-control input-field" />
        </div>
      </div>
      <div class="row list-search">
        <div class="col-md-4 search-field">
          <div class="label">马匹类型：</div>
          <el-select ref="selectType" size="large" :disabled="useDisabled" v-model="horseType" class="el-field-input" placeholder="请选择">
            <el-option v-for="(item,index) in horseTypeOptions" :key="index" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="col-md-4 search-field" v-if="horseType==1">
          <div class="label">马匹名称：</div>
          <el-select size="large" :disabled="useDisabled" filterable v-model="horseName" class="el-field-input">
            <el-option v-for="(item,index) in horseInfoName" :key="index" :label="item.horseName" :value="item.horseId">
            </el-option>
          </el-select>
        </div>
        <div class="col-md-4 search-field" v-if="horseType==2">
          <div class="label">马匹名称：</div>
          <input type="text" v-model="horseName" :disabled="useDisabled" class="form-control input-field" placeholder="请输入马匹名称" />
        </div>
      </div>
      <div class="row list-search">
        <div class="col-md-4 search-field">
          <div class="label">开始日期：</div>
          <el-date-picker :disabled="useDisabled" size="large" v-model="beginDate" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd">
          </el-date-picker>
        </div>
        <div class="col-md-4 search-field">
          <div class="label">开始时间：</div>
          <el-time-select :disabled="useDisabled" size="large" v-model="beginTime" :picker-options="{
                                                                                                                                start: '00:00',
                                                                                                                                step: '01:00',
                                                                                                                                end: '24:00'
                                                                                                                              }">
          </el-time-select>
        </div>
      </div>
      <div class="row list-search">
        <div class="col-md-4 search-field">
          <div class="label">结束日期：</div>
          <el-date-picker :disabled="useDisabled" size="large" v-model="endDate" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd">
          </el-date-picker>
        </div>
        <div class="col-md-4 search-field">
          <div class="label">结束时间：</div>
          <el-time-select :disabled="useDisabled" size="large" v-model="endTime" :picker-options="{
                                                                                                                                start: '00:00',
                                                                                                                                step: '01:00',
                                                                                                                                end: '24:00'
                                                                                                                              }">
          </el-time-select>
        </div>
      </div>
      <div class="row list-search">
        <div class="col-md-4 search-field">
          <div class="label">治疗名称：</div>
          <input type="text" v-model="treatName" :disabled="useDisabled" class="form-control input-field" />
        </div>
        <div class="col-md-4 search-field">
          <div class="label">手术室使用：</div>
          <el-select size="large" ref="selectUse" :disabled="useDisabled" v-model="useRoom" class="el-field-input" placeholder="请选择">
            <el-option v-for="(item,index) in consultingRoomList" :key="index" :label="item.consultingRoomName" :value="item.consultingRoomId">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="row list-search">
        <div class="col-md-4 search-field">
          <div class="label">设备使用：</div>
          <div type="text" rows="2" v-html="showAssetList" class="form-control addborder" @click="clickShowDialog" placeholder="点击查看详情">

          </div>
        </div>
        <div class="col-md-4 search-field">
          <div class="label">消耗品使用：</div>
          <div type="text" rows="2" v-html="showConsumeList" class="form-control addborder" @click="clickShowConsume" placeholder="点击查看详情"></div>
        </div>
      </div>
      <div class="row list-search">
        <div class="col-md-12 search-field">
          <div class="label">治疗概述：</div>
          <el-input type="textarea" :rows="3" :cols="2" :disabled="useDisabled" v-model="treatDesc" placeholder="请输入治疗概述"></el-input>
        </div>
      </div>
    </div>
    <div class="content-footer row" v-show="!useDisabled">
      <el-button class="col-md-1 btn btn-primary makesure" :plain="true" @click="updateTreat">确定</el-button>
    </div>

    <multi-select-dialog title="查看设备" width="800px" :disabled="true" :visible.sync="addItemDialog" :query="queryAssets" :columns="assetsColumns" :value="assetSelected" @submit="handleAssetsChange" id-field="assetId" inventory-field="inventory" count-field="useNumber"></multi-select-dialog>

  
<multi-select-dialog
    title="选用消耗品"
    width="800px"
    :visible.sync="addConsumeDialog"
    :query="queryConsume"
    :columns="consumeColumns"
    :value="consumeSelected"
    :disabled="true"
    @submit="handleConsumeChange"
    id-field="assetId"
    inventory-field="inventory"
    count-field="useNumber"
  ></multi-select-dialog>
   
  </div>
</template>
<script>
import {
  Form,
  DatePicker,
  Button,
  TimeSelect,
  Input,
  Message,
  Select
} from "element-ui";
import hospitalSrv from "../../../services/hospital.service.js";
import hosAssetsSrv from "../../../services/hosAssets.service.js";
import horseSrv from "../../../services/horse.service.js";
import MultiSelectDialog from "../../../../components/multiSelectDialog/index.vue";
export default {
  data() {
    return {
      disabled:true,
      showConsumeList:'',
      showAssetList:'',
      selectConsume: [],
      selectAssets: [],
      treatmentId: "",
      useDisabled: false,
      addConsumeDialog: false,
      addItemDialog: false,
      consultingRoomList: [],
      consumableAssetList: [],
      horseInfoName: [],
      horseName: "",
      treatName: "",
      consumeTreatName: "",
      assetsTreatName: "",
      treatDesc: "",
      appointNum: "",
      treatDate: "",
      useConsume: [],
      treatWay: "",
      beginDate: "",
      beginTime: "",
      endDate: "",
      endTime: "",
      horseType: "",
      useRoom: "",
      assetsName: "",
      currentPage: 1,
      pageRecorders: 5,
      totalRecorders: 0,
      current: 1,
      page: 5,
      total: 1,
      assetsList: [],
      consumeList: [],
      hospitalAssetList: [],
      treatWayOptions: [
        {
          value: 1,
          label: "普通"
        },
        {
          value: 2,
          label: "预约"
        }
      ],
      horseTypeOptions: [
        {
          value: 1,
          label: "中心"
        },
        {
          value: 2,
          label: "外来"
        }
      ],
       consumeColumns: [
        {
          title: "消耗品名称",
          dataIndex: "assetName",
          width: "120"
        },
        {
          title: "数量",
          dataIndex: "inventory",
          width: "120"
        }
      ],
      assetsColumns: [
        {
          title: "固定资产名称",
          dataIndex: "assetName",
          width: "120"
        },
        {
          title: "数量",
          dataIndex: "inventory",
          width: "120"
        }
      ],
    };
  },
  components: {
    "multi-select-dialog": MultiSelectDialog
  },
  beforeRouteLeave(to, from, next) {
    to.meta.keepAlive = true;
    next();
  },
  computed: {
    assetSelected() {
      let selected = {}
      this.selectAssets.map(item => {
        selected[item.assetId] = {
          count: item.count,
          ori: item
        };
      });
      return selected;
    },
    consumeSelected() {
      let selected = {};
      this.selectConsume.map(item => {
        selected[item.assetId] = {
          count: item.count,
          ori: item
        };
      });
      return selected;
    }
  },
  beforeRouteEnter: function(to, from, next) {
    next(vm => {
      vm.treatmentId = to.query.treatmentId;
      hospitalSrv.getTreatDetail(to.query.treatmentId).then(
        resp => {
          vm.treatWay = resp.data.outpatientType;
          vm.appointNum = resp.data.appointNumber;
          vm.beginDate = resp.data.beginDate;
          vm.beginTime = resp.data.beginTime.slice(0, 5);
          vm.endDate = resp.data.endDate;
          vm.endTime = resp.data.endTime.slice(0, 5);
          vm.horseType = resp.data.horseType;
          // if (vm.horseType == 1) {
          //   vm.horseName = resp.data.horseId;
          // } else {
          vm.horseName = resp.data.horseName;
          // }
          vm.treatName = resp.data.treatName;
          vm.treatDesc = resp.data.treatDesc;
          vm.useRoom = resp.data.consultingRoomId;
        },
        err => {
          vm.$message.error(err.msg);
        }
      );
      horseSrv.getHorseName().then(
        resp => {
          vm.horseInfoName = resp.data.horseList;
        },
        err => {
          vm.$message.error(err.msg);
        }
      );
      hospitalSrv.getOperateRoomBox().then(
        resp => {
          vm.consultingRoomList = resp.data.consultingRoomList;
        },
        err => {
          vm.$message.error(err.msg);
        }
      );
      vm.getSelectAsset()
      vm.getSelectConsume()
    });
  },
  mounted() {
    this.useDisabled = !!this.$route.query.disable;
    this.$el.addEventListener("animationend", this.resizeWay);
    this.$el.addEventListener("animationend", this.resizeType);
    this.$el.addEventListener("animationend", this.resizeUse);
  },
  methods: {
      handleConsumeChange(selected) {
      console.debug("handleAssetsChange: ", selected);
      let selectConsume = [];
      let addConsumeItem = [];
      let showConsumeList =''
      for (let key in selected) {
        selectConsume.push({
          assetId: key,
          count: selected[key].count,
          ori: selected[key].ori // 往后台存的时候记得清掉这个字段
        });
        addConsumeItem.push({
          assetId: key,
          count: selected[key].count
        });
        showConsumeList +=
          selected[key].ori.assetName + "&nbsp;&nbsp;&nbsp;*" + selected[key].count + "<br/>";
      }
      this.showConsumeList = showConsumeList
      this.selectConsume = selectConsume;
      this.addConsumeItem = addConsumeItem;
      this.addConsumeDialog = false;
    },
    handleAssetsChange(selected) {
      console.debug("handleAssetsChange: ", selected);
      let selectAssets = [];
      let addAssetsItem = [];
      let showAssetList = ''
      for (let key in selected) {
        selectAssets.push({
          assetId: key,
          count: selected[key].count,
          ori: selected[key].ori // 往后台存的时候记得清掉这个字段
        });
        addAssetsItem.push({
          assetId: key,
          count: selected[key].count
        });
        showAssetList +=
          selected[key].ori.assetName + "&nbsp;&nbsp;&nbsp;*" + selected[key].count + "<br/>";
      }
      this.showAssetList = showAssetList
      this.addAssetsItem = addAssetsItem;
      this.selectAssets = selectAssets;
      this.addItemDialog = false;
    },
    queryAssets(params, pageSize, current) {
      return hosAssetsSrv
        .assetsList(current, pageSize, "", "", params.key)
        .then(resp => {
          // 处理返回值的格式
          return Promise.resolve({
            list: resp.data.assetInfoList,
            total: resp.data.totalRecorders
          });
        });
    },
    queryConsume(params, pageSize, current) {
      return hosAssetsSrv
        .consumeList(current, pageSize, "", "", params.key)
        .then(resp => {
          // 处理返回值的格式
          return Promise.resolve({
            list: resp.data.assetInfoList,
            total: resp.data.totalRecorders
          });
        });
    },
    getSelectAsset() {
      hospitalSrv.getHospitalAsset(this.treatmentId).then(resp => {
        this.selectAssets = resp.data.assetList
      }, err => {
        this.$message.error(err.msg);
      })
    },
    getSelectConsume() {
      hospitalSrv.getConsumableAsset(this.treatmentId).then(resp => {
        this.selectConsume = resp.data.assetList
      }, err => {
        this.$message.error(err.msg);
      })
    },
    resizeWay() {
      this.$refs.selectWay.resetInputWidth();
    },
    resizeType() {
      this.$refs.selectType.resetInputWidth();
    },
    resizeUse() {
      this.$refs.selectUse.resetInputWidth();
    },
    clickShowDialog() {
      this.addItemDialog = true;
    },
    clickShowConsume() {
      this.addConsumeDialog = true;
    },
  
    updateTreat() {
      if (this.treatWay == 2 && !this.appointNum) {
        this.$message.error("预约号不能为空！");
        return;
      }
      if (
        !(
          this.treatWay &&
          this.beginDate &&
          this.beginTime &&
          this.endDate &&
          this.endTime &&
          this.horseType &&
          this.horseName &&
          this.treatName &&
          this.treatDesc &&
          this.useRoom
        )
      ) {
        this.$message.error("治疗信息不能为空！");
        return;
      }
      let treatInfo = {
        treatmentId: this.treatmentId,
        outpatientType: this.treatWay,
        // appointNumber: this.appointNum,
        beginDate: this.beginDate,
        beginTime: this.beginTime + ":00",
        endDate: this.endDate,
        endTime: this.endTime + ":00",
        horseType: this.horseType,
        horseId: this.horseName,
        horseName: this.horseName,
        treatName: this.treatName,
        treatDesc: this.treatDesc,
        consultingRoomId: this.useRoom
      };
      if (this.treatWay == 2) {
        treatInfo.appointNumber = this.appointNum;
      }
      hospitalSrv.updateTreat(treatInfo).then(
        resp => {
          this.$message.success("修改治疗信息成功");
          this.$router.push("/hospital/treatSchedule");
        },
        err => {
          this.$message.error(err.msg);
        }
      );
    },
  }
};
</script>

<style lang="scss" scoped>
.addborder {
  border-radius: 5px;
  padding: 10px 5px;
}
.addborder:empty::before {
  color: lightgrey;
  content: attr(placeholder);
}

.add-delete a {
  margin-left: 5px;
  cursor: pointer;
}

.add-delete {
  color: #409eff;
  margin-left: -40px;
  float: left;
  font-size: 40px;
  display: inline-flex;
}

.input-field {
  border-radius: 5px;
  height: 40px;
}

.Spinner {
  display: block;
  overflow: hidden;
  width: 160px;
}

.Spinner button {
  // display: inline-block;
  width: 35px;
  height: 35px;
  border: 1px solid #d9d9d9;
  background-color: #f7f7f7;
  float: left;
  cursor: pointer;
  outline: 0;
}

.Spinner .Amount {
  width: 50px;
  height: 35px;
  border-width: 1px 0;
  border-style: solid;
  border-color: #d9d9d9;
  float: left;
  text-align: center;
  color: #560606;
  outline: 0;
}

.Decrease {
  border-radius: 5px 0 0 5px;
}

.Increase {
  border-radius: 0 5px 5px 0;
}

.Decrease i {
  // padding-left: 10px;
  font-size: 20px;
  color: #409eff;
  margin-top: -18px;
}

.Increase i {
  // padding-left: 10px;
  margin-top: -18px;
  position: relative;
  top: 8px;
  font-size: 22px;
  color: #409eff;
}

.baseInfo-title {
  height: 30px;
  line-height: 30px;
  border-left: 2px solid #2db7f5;
  padding-left: 20px;
  padding-right: 20px;
  margin-bottom: 12px;
  .title {
    font-size: 16px;
    font-weight: bold;
    display: inline-block;
  }
}
</style>

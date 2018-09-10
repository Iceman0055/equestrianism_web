<template>
  <div class="content_page animated zoomIn">
    <div class="content-title">
      <div class="title">新增治疗日程</div>
      <router-link class="btn btn-info back" :to="'/hospital/treatSchedule'">
        返回
      </router-link>
    </div>
    <div class="content-show">
      <div class="row list-search">
        <div class="col-md-4 search-field">
          <div class="label">门诊方式：</div>
          <el-select ref="selectWay" size="large" v-model="treatWay" class="el-field-input" placeholder="请选择">
            <el-option v-for="(item,index) in treatWayOptions" :key="index" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="col-md-4 search-field" v-if="treatWay==2">
          <div class="label">预约号：</div>
          <input type="text" v-model="appointNum" class="form-control input-field" placeholder="请输入预约号称" />
        </div>
      </div>
      <div class="row list-search">
        <div class="col-md-4 search-field">
          <div class="label">马匹类型：</div>
          <el-select ref="selectType" size="large" v-model="horseType" class="el-field-input" placeholder="请选择">
            <el-option v-for="(item,index) in horseTypeOptions" :key="index" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="col-md-4 search-field" v-if="horseType==1">
          <div class="label">马匹名称：</div>
          <el-select size="large" filterable v-model="horseName" class="el-field-input" placeholder="请选择马匹名称">
            <el-option v-for="(item,index) in horseInfoName" :key="index" :label="item.horseName" :value="item.horseId">
            </el-option>
          </el-select>
        </div>
        <div class="col-md-4 search-field" v-if="horseType==2">
          <div class="label">马匹名称：</div>
          <input type="text" v-model="horseName" class="form-control input-field" placeholder="请输入马匹名称" />
        </div>
      </div>
      <div class="row list-search">
        <div class="col-md-4 search-field">
          <div class="label">开始日期：</div>
          <el-date-picker size="large" v-model="beginDate" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择日期时间">
          </el-date-picker>
        </div>
        <div class="col-md-4 search-field">
          <div class="label">开始时间：</div>
          <el-time-select size="large" v-model="beginTime" :picker-options="{
                                                                                      start: '00:00',
                                                                                       step: '01:00',
                                                                                         end: '24:00'
                                                                                        }" placeholder="选择时间">
          </el-time-select>
        </div>

      </div>
      <div class="row list-search">
        <div class="col-md-4 search-field">
          <div class="label">结束日期：</div>
          <el-date-picker size="large" v-model="endDate" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择日期时间">
          </el-date-picker>
        </div>
        <div class="col-md-4 search-field">
          <div class="label">结束时间：</div>
          <el-time-select size="large" v-model="endTime" :picker-options="{
                                                                                            start: '00:00',
                                                                                             step: '01:00',
                                                                                            end: '24:00'
                                                                                             }" placeholder="选择时间">
          </el-time-select>
        </div>
      </div>

      <div class="row list-search">
        <div class="col-md-4 search-field">
          <div class="label">治疗名称：</div>
          <input type="text" v-model="treatName" class="form-control input-field" placeholder="请输入治疗名称" />
        </div>
        <div class="col-md-4 search-field">
          <div class="label">手术室使用：</div>
          <el-select size="large" ref="selectUse" v-model="useRoom" class="el-field-input" placeholder="请选择">
            <el-option v-for="(item,index) in consultingRoomList" :key="index" :label="item.consultingRoomName" :value="item.consultingRoomId">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="row list-search">
        <div class="col-md-4 search-field">
          <div class="label">设备使用：</div>
          <div type="text" rows="2" v-html="showAssetList" class="form-control addborder" @click="clickShowDialog" placeholder="点击添加"> </div>
        </div>
        <div class="col-md-4 search-field">
          <div class="label">消耗品使用：</div>
          <div type="text" rows="2" v-html="showConsumeList" class="form-control addborder" @click="clickShowConsume" placeholder="点击添加"></div>
        </div>
      </div>
      <div class="row list-search">
        <div class="col-md-12 search-field">
          <div class="label">治疗概述：</div>
          <el-input type="textarea" :rows="3" :cols="2" v-model="treatDesc" placeholder="请输入治疗概述"></el-input>
        </div>
      </div>
    </div>
    <div class="content-footer row">
      <el-button class="col-md-1 btn btn-primary makesure" :plain="true" @click="addTreat">确定</el-button>
    </div>
    <!-- 设备的 -->
    <multi-select-dialog title="选用设备" width="800px" :visible.sync="addItemDialog" :query="queryAssets" :columns="assetsColumns" :value="assetSelected" :disabled="false" @submit="handleAssetsChange" id-field="assetId" inventory-field="inventory" count-field="useNumber"></multi-select-dialog>
    <!-- 消耗品 -->
    <multi-select-dialog title="选用消耗品" width="800px" :visible.sync="addConsumeDialog" :query="queryConsume" :columns="consumeColumns" :value="consumeSelected" :disabled="false" @submit="handleConsumeChange" id-field="assetId" inventory-field="inventory" count-field="useNumber"></multi-select-dialog>

  </div>
</template>
<script>
import {
  Form,
  DatePicker,
  Button,
  Input,
  TimeSelect,
  Upload,
  Message,
  Select,
  Table
} from "element-ui";
import AddAssets from "../../../../components/assetsDialog/addAssets.vue";
import MultiSelectDialog from "../../../../components/MultiSelectDialog/index.vue";
import hospitalSrv from "../../../services/hospital.service.js";
import hosAssetsSrv from "../../../services/hosAssets.service.js";
import horseSrv from "../../../services/horse.service.js";
export default {
  data() {
    return {
      addConsumeItem: [],
      addAssetsItem: [],
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
      selectAssets: [],
      addConsumeDialog: false,
      addItemDialog: false,
      consultingRoomList: [],
      showConsumeList: "",
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
      hospitalConsumeList:[],
      showAssetList: "",
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
      ]
    };
  },
  components: {
    "add-assets": AddAssets,
    "multi-select-dialog": MultiSelectDialog,
  },
  beforeRouteEnter: function(to, from, next) {
    next(vm => {
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
    });
  },
  mounted() {
    // this.checked();
    this.$el.addEventListener("animationend", this.resizeWay);
    this.$el.addEventListener("animationend", this.resizeType);
    this.$el.addEventListener("animationend", this.resizeUse);
  },

  beforeRouteLeave(to, from, next) {
    to.meta.keepAlive = true;
    next();
  },
  computed: {
    assetSelected() {
      let selected = {};
      this.hospitalAssetList.map(item => {
        selected[item.assetId] = {
          count: item.count,
          ori: item.ori
        };
      });
      return selected;
    },
    consumeSelected() {
      let selected = {};
      this.hospitalConsumeList.map(item => {
        selected[item.assetId] = {
          count: item.count,
          ori: item.ori
        };
      });
      return selected;
    }
  },
  methods: {
    queryAssets(params, pageSize, current) {
      console.debug("try to query: ", params, pageSize, current);
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
      console.debug("try to query: ", params, pageSize, current);
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
    clickShowDialog() {
      this.addItemDialog = true;
    },
    clickShowConsume() {
      this.addConsumeDialog = true;
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

    addTreat() {
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
          this.useRoom &&
          this.hospitalAssetList &&
          this.hospitalConsumeList
        )
      ) {
        this.$message.error("治疗信息不能为空！");
        return;
      }
      let treatInfo = {
        outpatientType: this.treatWay,
        appointNumber: this.appointNum,
        beginDate: this.beginDate,
        beginTime: this.beginTime + ":00",
        endDate: this.endDate,
        endTime: this.endTime + ":00",
        horseType: this.horseType,
        horseId: this.horseName,
        horseName: this.horseName,
        treatName: this.treatName,
        treatDesc: this.treatDesc,
        consultingRoomId: this.useRoom,
        hospitalAssetList: this.addAssetsItem,
        consumableAssetList: this.addConsumeItem
      };
      if (this.treatWay == 2) {
        treatInfo.appointNumber = this.appointNum;
      }
      hospitalSrv.addTreat(treatInfo).then(
        resp => {
          this.$message.success("添加治疗信息成功");
          this.$router.push("/hospital/treatSchedule");
        },
        err => {
          this.$message.error(err.msg);
        }
      );
    },
    handleConsumeChange(selected) {
      console.log('seleceefes', selected)
      let hospitalConsumeList = [];
      let addConsumeItem = [];
      let showConsumeList = ''
      for (let key in selected) {
        hospitalConsumeList.push({
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
      this.hospitalConsumeList = hospitalConsumeList;
      this.addConsumeItem = addConsumeItem;
      this.addConsumeDialog = false;
    },
    handleAssetsChange(selected) {
      console.debug("handleAssetsChange: ", selected);
      let hospitalAssetList = [];
      let addAssetsItem = [];
      let showAssetList = ''
      for (let key in selected) {
        hospitalAssetList.push({
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
      this.hospitalAssetList = hospitalAssetList;
      this.addItemDialog = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.el-select-dropdown__list {
  height: 139px !important;
  overflow-y: scroll !important;
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
  color: #565656;
  outline: 0;
}

.Decrease {
  border-radius: 5px 0 0 5px;
}

.Increase {
  border-radius: 0 5px 5px 0;
}

.Decrease i {
  font-size: 20px;
  color: #409eff;
}

.Increase i {
  position: relative;
  top: 8px;
  font-size: 22px;
  color: #409eff;
}
</style>

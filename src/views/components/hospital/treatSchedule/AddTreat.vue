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
            <el-option v-for="item in treatWayOptions" :key="item.value" :label="item.label" :value="item.value">
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
          <div class="label">马匹类型：</div>
          <el-select ref="selectType" size="large" v-model="horseType" class="el-field-input" placeholder="请选择">
            <el-option v-for="item in horseTypeOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="col-md-4 search-field" v-if="horseType==1">
          <div class="label">马匹名称：</div>
          <el-select size="large" filterable v-model="horseName" class="el-field-input" placeholder="请选择马匹名称">
            <el-option v-for="item in horseInfoName" :key="item.horseId" :label="item.horseName" :value="item.horseId">
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
          <div class="label">治疗名称：</div>
          <input type="text" v-model="treatName" class="form-control input-field" placeholder="请输入治疗名称" />
        </div>
        <div class="col-md-4 search-field">
          <div class="label">治疗概述：</div>
          <input type="text" v-model="treatDesc" class="form-control input-field" placeholder="请输入治疗概述" />
        </div>
        <div class="col-md-4 search-field">
          <div class="label">手术室使用：</div>
          <el-select size="large" ref="selectUse" v-model="useRoom" class="el-field-input" placeholder="请选择">
            <el-option v-for="item in consultingRoomList" :key="item.consultingRoomId" :label="item.consultingRoomName" :value="item.consultingRoomId">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="row list-search">
        <div class="col-md-4 search-field">
          <div class="label">设备使用：</div>
          <textarea type="text" rows="2" v-model="hospitalAssetList" class="form-control addborder" @click="getAssetsList(1)" placeholder="点击添加"></textarea>

        </div>
        <div class="col-md-4 search-field">
          <div class="label">消耗品使用：</div>
          <textarea type="text" rows="2" v-model="consumableAssetList" class="form-control addborder" @click="getConsumeList(1)" placeholder="点击添加"></textarea>
        </div>
      </div>

    </div>
    <div class="content-footer row">
      <el-button class="col-md-1 btn btn-primary makesure" :plain="true" @click="addTreat">确定</el-button>
    </div>

    <el-dialog title="选用设备" :modal-append-to-body="false" class="content-show" :visible.sync="addItemDialog" width="52%" center>
      <div class="row list-search">
        <div class="col-md-8 search-field">
          <div class="label">资产名称：</div>
          <input type="text" v-model="assetsTreatName" class="form-control input-field" placeholder="请输入资产名称" />
        </div>
      </div>
      <div class="list-empty" v-show="assetsList.length==0">
        暂无数据
      </div>
      <div class="row mb-3" v-for="(item,index) in assetsList" :key="item">
        <div class="col-md-1">
          <el-checkbox v-model="item.checked" @change="selectItem(item)"></el-checkbox>
        </div>
        <div class="col-md-3">
          <input type="text" v-model="item.assetName" class="form-control input-field" placeholder="资产名称" />
        </div>
        <div class="col-md-3">
          <input type="text" v-model="item.inventory" class="form-control input-field" placeholder="库存" />
        </div>
        <div class="col-md-5">
          <div class="Spinner">
            <a class="Decrease" @click="decrease(index,item.useNumber)">
              <i class="fa fa-sort-desc"></i>
            </a>
            <input class="Amount" v-model="item.useNumber" placeholder="使用数量" autocomplete="off">
            <a class="Increase" @click="increase(index,item.useNumber,item.inventory)">
              <i class="fa fa-sort-asc"></i>
            </a>
          </div>
        </div>
      </div>
      <div class="page" style="float: right">
        <el-pagination @current-change="getAssetsList" :current-page="currentPage" :page-size="pageRecorders" background layout="prev, pager, next" :total="totalRecorders">
        </el-pagination>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addItemDialog = false">取 消</el-button>
        <el-button type="primary" @click="addItemDialog = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="选用消耗品" :modal-append-to-body="false" class="content-show" :visible.sync="addConsumeDialog" width="52%" center>
      <div class="row list-search">
        <div class="col-md-8 search-field">
          <div class="label">资产名称：</div>
          <input type="text" v-model="consumeTreatName" class="form-control input-field" placeholder="请输入资产名称" />
        </div>
      </div>
      <div class="list-empty" v-show="consumeList.length==0">
        暂无数据
      </div>
      <div class="row mb-3" v-for="(item,index) in consumeList" :key="item">
        <div class="col-md-1">
          <el-checkbox v-model="item.checked" @change="selectConsumeItem(item)"></el-checkbox>
        </div>
        <div class="col-md-3">
          <input type="text" v-model="item.assetName" class="form-control input-field" placeholder="资产名称" />
        </div>
        <div class="col-md-3">
          <input type="text" v-model="item.inventory" class="form-control input-field" placeholder="库存" />
        </div>
        <div class="col-md-5">
          <div class="Spinner">
            <a class="Decrease" @click="decreaseConsume(index,item.useNumber)">
              <i class="fa fa-sort-desc"></i>
            </a>
            <input class="Amount" v-model="item.useNumber" placeholder="使用数量" autocomplete="off">
            <a class="Increase" @click="increaseConsume(index,item.useNumber,item.inventory)">
              <i class="fa fa-sort-asc"></i>
            </a>
          </div>
        </div>
      </div>
      <div class="page" style="float: right">
        <el-pagination @current-change="getConsumeList" :current-page="current" :page-size="page" background layout="prev, pager, next" :total="total">
        </el-pagination>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addConsumeDialog = false">取 消</el-button>
        <el-button type="primary" @click="addConsumeDialog = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  DatePicker,
  Button,
  Input,
  TimeSelect,
  Upload,
  Message,
  Select
} from "element-ui";
import hospitalSrv from "../../../services/hospital.service.js";
import hosAssetsSrv from "../../../services/hosAssets.service.js";
import horseSrv from "../../../services/horse.service.js";
export default {
  data() {
    return {
      addConsumeDialog: false,
      addItemDialog: false,
      consultingRoomList: [],
      consumableAssetList: [],
      horseInfoName: [],
      treatInfo: {},
      horseName: "",
      treatName: "",
      consumeTreatName: '',
      assetsTreatName: '',
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
      pageRecorders: 10,
      totalRecorders: 1,
      current: 1,
      page: 10,
      total: 1,
      assetsList: [],
      consumeList: [],
      hospitalAssetList: [],
      treatWayOptions: [
        {
          value: "1",
          label: "普通"
        },
        {
          value: "2",
          label: "预约"
        }
      ],
      horseTypeOptions: [
        {
          value: "1",
          label: "中心"
        },
        {
          value: "2",
          label: "外来"
        }
      ],
    };
  },
  components: {
    "el-date-picker": DatePicker,
    "el-button": Button,
    "el-time-select": TimeSelect,
    "el-input": Input,
    "el-select": Select
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
    this.$el.addEventListener("animationend", this.resizeWay);
    this.$el.addEventListener("animationend", this.resizeType);
    this.$el.addEventListener("animationend", this.resizeUse);
  },
  methods: {
    resizeWay() {
      this.$refs.selectWay.resetInputWidth();
    },
    resizeType() {
      this.$refs.selectType.resetInputWidth();
    },
    resizeUse() {
      this.$refs.selectUse.resetInputWidth();
    },
    getAssetsList(currentPage = this.currentPage) {
      this.addItemDialog = true;
      hosAssetsSrv
        .assetsList(currentPage, this.pageRecorders, "", "", this.assetsTreatName)
        .then(
        resp => {
          this.currentPage = currentPage;
          this.totalRecorders = resp.data.totalRecorders;
          let assetsList = resp.data.assetInfoList;
          let len = assetsList.length;
          for (let i = 0; i < len; i++) {
            assetsList[i].checked = false;
            assetsList[i].useNumber = 1;
          }
          this.assetsList = assetsList;
        },
        err => {
          this.$message.error(err.msg);
        }
        );
    },
    getConsumeList(currentPage = this.current) {
      this.addConsumeDialog = true
      hosAssetsSrv
        .consumeList(currentPage, this.page, '', '', this.consumeTreatName)
        .then(
        resp => {
          this.current = currentPage;
          this.total = resp.data.totalRecorders;
          let consumeList = resp.data.assetInfoList;
          let len = consumeList.length;
          for (let i = 0; i < len; i++) {
            consumeList[i].checked = false;
            consumeList[i].useNumber = 1;
          }
          this.consumeList = consumeList;
        },
        err => {
          this.$message.error(err.msg);
        }
        );
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
          this.consumableAssetList
        )
      ) {
        this.$message.error("治疗信息不能为空！");
        return;
      }
      this.treatInfo = {
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
        consultingRoomId: this.useRoom,
        hospitalAssetList: this.hospitalAssetList,
        consumableAssetList: this.consumableAssetList,

      };
      if (this.treatWay == 2) {
        this.treatInfo.appointNumber = this.appointNum;
      }
      hospitalSrv.addTreat(this.treatInfo).then(
        resp => {
          this.$message.success("添加治疗信息成功");
          this.$router.push("/hospital/treatSchedule");
        },
        err => {
          this.$message.error(err.msg);
        }
      );
    },
    selectItem(item) {
      if (item.checked) {
        this.hospitalAssetList.push({
          assetId: item.assetId,
          count: item.useNumber
        });
      }
    },
    selectConsumeItem(item) {
      if (item.checked) {
        this.consumableAssetList.push({
          assetId: item.assetId,
          count: item.useNumber
        });
      }
    },

    increase(index, value, inventory) {
      if (value >= inventory) {
        return inventory;
      } else {
        return this.assetsList[index].useNumber++;
      }
    },
    //减少
    decrease(index, value) {
      this.index = index;
      if (value <= 0) {
        return 0;
      } else {
        return this.assetsList[index].useNumber--;
      }
    },
    increaseConsume(index, value, inventory) {
      if (value >= inventory) {
        return inventory;
      } else {
        return this.consumeList[index].useNumber++;
      }
    },
    //减少
    decreaseConsume(index, value) {
      this.index = index;
      if (value <= 0) {
        return 0;
      } else {
        return this.consumeList[index].useNumber--;
      }
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
  margin-top: 3px;
}

.Spinner a {
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

.Decrease i {
  padding-left: 10px;
  font-size: 20px;
  color: #409eff;
}

.Increase i {
  padding-left: 10px;
  position: relative;
  top: 8px;
  font-size: 22px;
  color: #409eff;
}
</style>

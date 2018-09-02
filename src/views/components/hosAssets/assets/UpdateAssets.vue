<template>
    <div class="content_page animated zoomIn">
        <div class="content-title">
            <div class="title" v-if="!useDisabled">修改固定资产</div>
            <div class="title" v-if="useDisabled">查看固定资产</div>
            <router-link class="btn btn-info back" :to="'/hosAssets/assets'">
                返回
            </router-link>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-4"></div>
                <div class="col-md-4 search-field text-cente">
                    <div class="label">条形码：</div>
                    <input type="text" :disabled="useDisabled" v-model="barCode" class="form-control input-field" />
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">资产大类：</div>
                    <el-select ref="selectCate" size="large" :disabled="useDisabled" v-model="assetType" class="el-field-input">
                        <el-option v-for="(item,index) in assetTypeList" :key="index" :label="item.typeName" :value="item.typeId">
                        </el-option>
                    </el-select>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">资产分类：</div>
                    <el-select @focus="getAssetsType" ref="selectClass" size="large" :disabled="useDisabled" v-model="typeDetail" class="el-field-input">
                        <el-option v-for="(item,index) in typeDetailList" :key="index" :label="item.typeDetailName" :value="item.typeDetailId">
                        </el-option>
                    </el-select>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">资产编号：</div>
                    <input type="text" v-model="assetsNum" :disabled="useDisabled" class="form-control input-field" />
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">资产名称：</div>
                    <input type="text" v-model="assetsName" :disabled="useDisabled" class="form-control input-field" />
                </div>

                <div class="col-md-4 search-field">
                    <div class="label">价值：</div>
                    <input type="text" v-model="value" :disabled="useDisabled" class="form-control input-field" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">面积：</div>
                    <input type="text" v-model="area" :disabled="useDisabled" class="form-control input-field" />
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">规格型号：</div>
                    <input type="text" v-model="format" :disabled="useDisabled" class="form-control input-field" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">价值类型：</div>
                    <el-select ref="selectValue" size="large" :disabled="useDisabled" v-model="valueType" class="el-field-input" placeholder="请选择">
                        <el-option v-for="(item,index) in valueOptions" :key="index" :label="item.itemValue" :value="item.dictionaryDetailId">
                        </el-option>
                    </el-select>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">取得方式：</div>
                    <el-select ref="selectWay" size="large" :disabled="useDisabled" v-model="getWay" class="el-field-input" placeholder="请选择">
                        <el-option v-for="(item,index) in wayOptions" :key="index" :label="item.itemValue" :value="item.dictionaryDetailId">
                        </el-option>
                    </el-select>
                </div>
            </div>

            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">财务出账日期：</div>
                    <el-date-picker :disabled="useDisabled" class="el-field-input" size="large" v-model="financialDate" format="yyyy-MM-dd HH:mm:00" value-format="yyyy-MM-dd HH:mm:00" type="datetime">
                    </el-date-picker>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">制单日期：</div>
                    <el-date-picker :disabled="useDisabled" class="el-field-input" size="large" v-model="makeDate" format="yyyy-MM-dd HH:mm:00" value-format="yyyy-MM-dd HH:mm:00" type="datetime">
                    </el-date-picker>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">保修截止日期：</div>
                    <el-date-picker :disabled="useDisabled" class="el-field-input" size="large" v-model="endDate" format="yyyy-MM-dd HH:mm:00" value-format="yyyy-MM-dd HH:mm:00" type="datetime">
                    </el-date-picker>
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">管理部门：</div>
                    <el-select size="large" :disabled="useDisabled" ref="selectDepart" v-model="departName" class="el-field-input">
                        <el-option v-for="(item,index) in departList" :key="index" :label="item.departmentName" :value="item.departmentId">
                        </el-option>
                    </el-select>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">管理人：</div>
                    <el-select size="large" @focus="getManageUser" :disabled="useDisabled" ref="selectPeople" v-model="managePeople" class="el-field-input">
                        <el-option v-for="(item,index) in userList" :key="index" :label="item.realname" :value="item.userId">
                        </el-option>
                    </el-select>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">设计用途：</div>
                    <input type="text" :disabled="useDisabled" v-model="designPurpose" class="form-control input-field" />
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">品牌：</div>
                    <input type="text" v-model="brand" :disabled="useDisabled" class="form-control input-field" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">会记凭证号：</div>
                    <input type="text" v-model="voucherNum" :disabled="useDisabled" class="form-control input-field" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">采购组织形式：</div>
                    <input type="text" v-model="buyForm" :disabled="useDisabled" class="form-control input-field" />
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">备注：</div>
                    <input type="text" v-model="note" :disabled="useDisabled" class="form-control input-field" />
                </div>
                <div class="col-md-4 search-field" v-show="useDisabled">
                    <div class="label">数量：</div>
                    <input type="text" v-model="inventory" :disabled="useDisabled" class="form-control input-field" />
                </div>

            </div>
        </div>
        <div class="content-footer row" v-show="!useDisabled">
            <el-button class="col-md-1 btn btn-primary makesure" :plain="true" @click="updateAssets">确定</el-button>
        </div>
    </div>
</template>

<script>
import { DatePicker, Button, Select, Message } from "element-ui";
import hosAssetsSrv from "../../../services/hosAssets.service.js";
import systemSrv from "../../../services/system.service.js";
export default {
  data() {
    return {
      managePeople: "",
      note: "",
      designPurpose: "",
      format: "",
      brand: "",
      voucherNum: "",
      buyForm: "",
      assetsNum: "",
      assetsName: "",
      value: "",
      area: "",
      valueType: "",
      getWay: "",
      useDisabled: false,
      financialDate: "",
      makeDate: "",
      endDate: "",
      typeDetail: "",
      assetType: "",
      assetTypeList: [],
      typeDetailList: [],
      assetId: "",
      departName: "",
      departList: [],
      userList: [],
      valueOptions: [],
      wayOptions: [],
      barCode: "",
      inventory: ""
    };
  },
  mounted() {
    this.useDisabled = !!this.$route.query.disable;
    this.$el.addEventListener("animationend", this.valueResize);
    this.$el.addEventListener("animationend", this.wayResize);
    this.$el.addEventListener("animationend", this.cateResize);
    this.$el.addEventListener("animationend", this.classResize);
    this.$el.addEventListener("animationend", this.departResize);
    this.$el.addEventListener("animationend", this.peopleResize);
  },
  beforeRouteLeave(to, from, next) {
    to.meta.keepAlive = true;
    next();
  },
  beforeRouteEnter: function(to, from, next) {
    next(vm => {
      vm.assetId = to.query.assetId;
      hosAssetsSrv.getAssetsDetail(vm.assetId).then(
        resp => {
          vm.inventory = resp.data.inventory;
          vm.barCode = resp.data.barCode;
          vm.assetType = resp.data.typeId;
          vm.typeDetail = resp.data.typeDetailId;
          vm.assetsNum = resp.data.assetNumber;
          vm.assetsName = resp.data.assetName;
          vm.value = resp.data.price;
          vm.area = resp.data.acreage;
          vm.valueType = resp.data.priceType;
          vm.getWay = resp.data.acquireWay;
          vm.financialDate = resp.data.financeAccountsDate;
          vm.makeDate = resp.data.tabDate;
          vm.endDate = resp.data.guaranteeDate;
          vm.departName = resp.data.manageDepartment;
          vm.managePeople = resp.data.manageUser;
          vm.note = resp.data.remark;
          vm.designPurpose = resp.data.purpose;
          vm.format = resp.data.specificationModel;
          vm.brand = resp.data.brand;
          vm.voucherNum = resp.data.voucherNumber;
          vm.buyForm = resp.data.purchaseOrganize;
        },
        err => {
          vm.$message.error(err.msg);
        }
      );
      systemSrv.assetsInfoComboBox().then(
        resp => {
          vm.assetTypeList = resp.data.assetTypeList;
        },
        err => {
          vm.$message.error(err.msg);
        }
      );
      systemSrv.getDepart().then(
        resp => {
          vm.departList = resp.data.departmentList;
        },
        err => {
          vm.$message.error(err.msg);
        }
      );
      systemSrv.dictionary().then(
        resp => {
          let dictDetail = resp.data.dictionaryInfoList;
          let len = dictDetail.length;
          for (let i = 0; i < len; i++) {
            if (dictDetail[i].typeCode == "PRICE_TYPE") {
              vm.valueOptions = dictDetail[i].dictionaryDetailList;
            }
            if (dictDetail[i].typeCode == "ACQUIRE_WAY") {
              vm.wayOptions = dictDetail[i].dictionaryDetailList;
            }
          }
        },
        err => {
          vm.$message.error(err.msg);
        }
      );

    //  vm.getManageUser()
    });
  },
  methods: {
    getManageUser() {
      if (!this.departName) {
        this.$message.error("管理部门不能为空");
        return;
      }
      systemSrv.userComboBox(this.departName).then(
        resp => {
          this.userList = resp.data.userList;
        },
        err => {
          this.$message.error(err.msg);
        }
      );
    },
    getAssetsType() {
      if (!this.assetType) {
        this.$message.error("请先选择资产大类");
        return;
      }
      systemSrv.assetsDetailComboBox(this.assetType).then(
        resp => {
          this.typeDetailList = resp.data.typeDetailList;
        },
        err => {
          this.$message.error(err.msg);
        }
      );
    },
    updateAssets() {
      if (
        !(
          this.barCode &&
          this.assetType &&
          this.typeDetail &&
          this.assetsNum &&
          this.assetsName &&
          this.value &&
          this.area &&
          this.valueType &&
          this.getWay &&
          this.financialDate &&
          this.makeDate &&
          this.endDate &&
          this.departName &&
          this.managePeople &&
          this.note &&
          this.designPurpose &&
          this.format &&
          this.brand &&
          this.voucherNum &&
          this.buyForm
        )
      ) {
        this.$message.error("固定资产信息不能为空！");
        return;
      }
      let assetsInfo = {
        barCode: this.barCode,
        assetId: this.assetId,
        typeId: this.assetType,
        typeDetailId: this.typeDetail,
        assetNumber: this.assetsNum,
        assetName: this.assetsName,
        price: this.value,
        acreage: this.area,
        priceType: this.valueType,
        acquireWay: this.getWay,
        financeAccountsDate: this.financialDate,
        tabDate: this.makeDate,
        guaranteeDate: this.endDate,
        manageDepartment: this.departName,
        manageUser: this.managePeople,
        remark: this.note,
        purpose: this.designPurpose,
        specificationModel: this.format,
        brand: this.brand,
        voucherNumber: this.voucherNum,
        purchaseOrganize: this.buyForm
      };
      hosAssetsSrv.updateAssets(assetsInfo).then(
        resp => {
          this.$message.success("修改固定资产信息成功");
          this.$router.push("/hosAssets/assets");
        },
        err => {
          this.$message.error(err.msg);
        }
      );
    },
    cateResize() {
      this.$refs.selectCate.resetInputWidth();
    },
    classResize() {
      this.$refs.selectClass.resetInputWidth();
    },
    valueResize() {
      this.$refs.selectValue.resetInputWidth();
    },
    wayResize() {
      this.$refs.selectWay.resetInputWidth();
    },
    departResize() {
      this.$refs.selectDepart.resetInputWidth();
    },
    peopleResize() {
      this.$refs.selectPeople.resetInputWidth();
    }
  }
};
</script>
<style lang="scss" scoped>
.content_page .content-show .list-search .search-field {
  padding-left: 84px;
}
</style>

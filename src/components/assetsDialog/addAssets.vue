<template>
   <el-dialog title="选用设备" :modal-append-to-body="false" class="content-show" :visible.sync="addItemDialog" width="52%" center>
      <div class="row list-search">
        <div class="col-md-8 search-field">
          <div class="label" style="left:-18px">固定资产名称：</div>
          <input type="text" v-model="assetsTreatName" class="form-control input-field" placeholder="请输入固定资产名称" />
        </div>
        <div class="col-md-1 search-field search-field_controls">
          <button @click="getAssetsList(1)" class="btn btn-primary search-btn">搜索</button>
        </div>
      </div>
      <div class="list-empty" v-show="assetsList.length==0">
        暂无数据
      </div>
      <el-table
            ref="multipleTable"
            :data="assetsList"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
         type="selection"
         width="55">
    </el-table-column>
    <el-table-column
      label="固定资产名称"
      width="120"
      prop="assetName"
      >
      <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
    </el-table-column>
    <el-table-column
      prop="inventory"
      label="数量"
      width="120">
    </el-table-column>
    <el-table-column
      label="操作">
      <template slot-scope="scope">
        <div class="Spinner">
            <button class="Decrease" @click="decrease(scope.$index,scope.row.useNumber)">
              <i class="fa fa-sort-desc"></i>
            </button>
            <input class="Amount" v-model="scope.row.useNumber" placeholder="使用数量" autocomplete="off">
            <button class="Increase" @click="increase(scope.$index,scope.row.useNumber,scope.row.inventory)">
              <i class="fa fa-sort-asc"></i>
            </button>
          </div>
      </template>
    </el-table-column>
  </el-table>
    
      <div class="page">
        <el-pagination @current-change="getAssetsList" :current-page="currentPage" :page-size="pageRecorders" background layout="prev, pager, next" :total="totalRecorders">
        </el-pagination>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addItemDialog = false">取 消</el-button>
        <el-button type="primary" @click="addItemSureFun">确 定</el-button>
      </span>
    </el-dialog>
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
import hosAssetsSrv from "../../views/services/hosAssets.service.js";
export default {
  props: ["addItemDialog"],
  data() {
    return {
        assetsList:[],
      selectAssets: [],
      showAssetList: [],
      hospitalAssetList: [],
      currentPage: 1,
      pageRecorders: 5,
      totalRecorders: 1,
      assetsTreatName:'',
    };
  },
  mounted() {
    this.getAssetsList();
  },
  methods: {
    handleSelectionChange(val) {
      this.selectAssets = val;
    },
    addItemSureFun() {
      let len = this.selectAssets.length;
      for (let i = 0; i < len; i++) {
        this.hospitalAssetList.push({
          assetId: this.selectAssets[i].assetId,
          count: this.selectAssets[i].useNumber
        });
        this.showAssetList +=
          this.selectAssets[i].assetName +
          "  *" +
          this.selectAssets[i].useNumber +
          "<br/>";
      }
      this.$emit("change", this.hospitalAssetList, this.showAssetList);
      this.addItemDialog = false;
    },
    getAssetsList(currentPage = this.currentPage) {
      //   this.addItemDialog = true;
      hosAssetsSrv
        .assetsList(
          currentPage,
          this.pageRecorders,
          "",
          "",
          this.assetsTreatName
        )
        .then(
          resp => {
            this.currentPage = currentPage;
            this.totalRecorders = resp.data.totalRecorders;
            let assetsList = resp.data.assetInfoList;
            let len = assetsList.length;
            for (let i = 0; i < len; i++) {
              // assetsList[i].checked = false;
              assetsList[i].useNumber = 1;
            }
            this.assetsList = assetsList;
          },
          err => {
            this.$message.error(err.msg);
          }
        );
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

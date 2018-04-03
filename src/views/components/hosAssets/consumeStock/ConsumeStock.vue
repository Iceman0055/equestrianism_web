<template>
    <div class="p-insurance-list content_page">
        <div class="content-title">
            <div class="title">消耗品库存信息</div>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-3 search-field">
                    <div class="label">资产大类：</div>
                    <el-select size="large" v-model="assetType" class="el-field-input" placeholder="请选择">
                        <el-option v-for="item in assetTypeList" :key="item.typeId" :label="item.typeName" :value="item.typeId">
                        </el-option>
                    </el-select>
                </div>
                <div class="col-md-3 search-field">
                    <div class="label">资产分类：</div>
                    <el-select @focus="getAssetsType" size="large" v-model="typeDetail" class="el-field-input" placeholder="请选择">
                        <el-option v-for="item in typeDetailList" :key="item.typeDetailId" :label="item.typeDetailName" :value="item.typeDetailId">
                        </el-option>
                    </el-select>
                </div>
                <div class="col-md-3 search-field">
                    <div class="label">资产名称：</div>
                    <input type="text" v-model="assetsName" placeholder="请输入资产名称" class="form-control input-field" />
                </div>
                <div class="col-md-1 search-field search-field_controls">
                    <button @click="getConsumeList(1)" class="btn btn-primary search-btn">搜索</button>
                </div>
                <div class="col-md-1 search-field search-field_controls">
                    <button class="btn btn-success" @click="addDialog=true">
                        增加库存
                    </button>
                </div>
            </div>
            <div class="wait-loading" v-show="showLoading"><img src="/static/img/loading.gif"></div>
            <div class="row" v-show="!showLoading">
                <div class="col-lg-12">
                    <table class="table table-bordered table-striped table-sm">
                        <thead>
                            <tr>
                                <th>资产大类</th>
                                <th>资产分类</th>
                                <th>资产编号</th>
                                <th>资产名称</th>
                                <th>条形码号</th>
                                <th>库存</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in assetsList" :key="item">
                                <td>{{item.typeName}}</td>
                                <td>{{item.typeDetailName}}</td>
                                <td>{{item.assetNumber}}</td>
                                <td>{{item.assetName}}</td>
                                <td>{{item.barCode}}</td>
                                <td>{{item.inventory}}</td>
                                <td>
                                    <a @click="addDialogShow(item.barCode)">增加库存</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="list-empty" v-show="assetsList.length===0">
                        暂无数据
                    </div>
                    <div class="page">
                        <el-pagination @current-change="getConsumeList" :current-page="currentPage" :page-size="pageRecorders" background layout="prev, pager, next" :total="totalRecorders">
                        </el-pagination>
                    </div>
                    <el-dialog title="增加库存" :modal-append-to-body="false" :visible.sync="addDialog" width="52%" center>
                        <div class="row mb-3 list-search distance" v-for="(item,index) in assets" :key="item">
                            <el-switch class="top-distance" v-model="item.switch" active-color="#13ce66" inactive-color="#ff4949" active-text="扫描仪" inactive-text="人工输入">
                            </el-switch>
                            <div class="col-md-4 search-field" v-show="!item.switch">
                                <div class="label">条形码：</div>
                                <input type="text" v-model="item.barCode" @keyup="keyUpHandle($event,item)" class="form-control input-field" placeholder="条形码" />
                            </div>
                            <div class="col-md-4 search-field" v-show="item.switch">
                                <div class="label">条形码：</div>
                                <input type="text" autofocus v-model="item.barCode" v-on:input="changeHandle(item)" class="form-control input-field" placeholder="条形码" />
                            </div>
                            <div class="col-md-3 search-field">
                                <div class="label">资产名称：</div>
                                <input type="text" disabled v-model="item.assetsName" class="form-control input-field" placeholder="资产名称" />
                            </div>
                            <div class="col-md-3 search-field">
                                <div class="label">增加库存数：</div>
                                <div class="Spinner">
                                    <a class="Decrease" @click="decrease(index,item.value)">
                                        <i class="fa fa-sort-desc"></i>
                                    </a>
                                    <input class="Amount" v-model="item.value" autocomplete="off">
                                    <a class="Increase" @click="increase(index,item.value)">
                                        <i class="fa fa-sort-asc"></i>
                                    </a>
                                </div>
                            </div>
                            <div class="col-md-2 search-field">
                                <div class="add-delete">
                                    <a @click="addData">
                                        <i class="fa fa-plus-circle"></i>
                                    </a>
                                    <a @click="confirmDialog=true">
                                        <i class="fa fa-minus-circle"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="addDialog = false">取 消</el-button>
                            <el-button type="primary" @click="addFun">确 定</el-button>
                        </span>
                    </el-dialog>
                    <el-dialog title="增加库存" :modal-append-to-body="false" :visible.sync="addPerDialog" width="52%" center>
                        <div class="row mb-3 list-search">
                            <div class="col-md-4 search-field">
                                <div class="label">条形码：</div>
                                <input type="text" v-model="barCode" class="form-control input-field" placeholder="条形码" />
                            </div>
                            <div class="col-md-4 search-field">
                                <div class="label">资产名称：</div>
                                <input type="text" disabled v-model="assetName" class="form-control input-field" placeholder="库存" />
                            </div>
                            <div class="col-md-3 search-field">
                                <div class="label">增加库存数：</div>
                                <div class="Spinner">
                                    <a class="Decrease" @click="decreasePer()">
                                        <i class="fa fa-sort-desc"></i>
                                    </a>
                                    <input class="Amount" v-model="inventory" autocomplete="off">
                                    <a class="Increase" @click="increasePer()">
                                        <i class="fa fa-sort-asc"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="addDialog = false">取 消</el-button>
                            <el-button type="primary" @click="addPerFun">确 定</el-button>
                        </span>
                    </el-dialog>
                    <el-dialog title="提示" :modal-append-to-body="false" :visible.sync="confirmDialog" width="25%" center>
                        <div class="text-center">
                            <span>确定要删除这一条数据吗？</span>
                        </div>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="confirmDialog = false">取 消</el-button>
                            <el-button type="primary" @click="deleteData(index)">确 定</el-button>
                        </span>
                    </el-dialog>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { Pagination, Dialog, Message } from "element-ui";
import hosAssetsSrv from '../../../services/hosAssets.service.js'
import systemSrv from '../../../services/system.service.js'
export default {
    data() {
        return {
            showLoading: false,
            assetsName: '',
            assetName: '',
            barCode: '',
            typeDetail: '',
            assetType: "",
            currentPage: 1,
            pageRecorders: 10,
            totalRecorders: 1,
            assetTypeList: [],
            typeDetailList: [],
            addDialog: false,
            addPerDialog: false,
            confirmDialog: false,
            index: 0,
            inventory: 1,
            assetsList: [],
            assets: [
                { switch: false, barCode: "", assetId: '', assetsName: "", value: "1" },
            ],
        };
    },
    beforeRouteEnter: function(to, from, next) {
        next(vm => {
            vm.showLoading = true
            hosAssetsSrv.consumeList(vm.currentPage, vm.pageRecorders, vm.assetType, vm.typeDetail, vm.assetsName).then(resp => {
                vm.showLoading = false
                vm.totalRecorders = resp.data.totalRecorders
                vm.assetsList = resp.data.assetInfoList
            }, err => {
                vm.showLoading = false
                vm.$message.error(err.msg)
            })
            systemSrv.assetsInfoComboBox().then(resp => {
                vm.assetTypeList = resp.data.assetTypeList
            }, err => {
                vm.$message.error(err.msg)
            })
        })
    },
    methods: {
        getConsumeList(currentPage = this.currentPage) {
            this.showLoading = true
            hosAssetsSrv.consumeList(currentPage, this.pageRecorders, this.assetType, this.typeDetail, this.assetsName).then((resp) => {
                this.showLoading = false
                this.currentPage = currentPage
                this.totalRecorders = resp.data.totalRecorders
                this.assetsList = resp.data.assetInfoList
            }, (err) => {
                this.showLoading = false
                this.$message.error(err.msg)
            })
        },
        changeHandle(item) {
            hosAssetsSrv.getConsumeInfo(item.barCode).then(resp => {
                item.assetId = resp.data.assetId
                item.assetsName = resp.data.assetName
            }, err => {
                this.$message.error(err.msg)
            })
        },
        keyUpHandle(e, item) {
            if (!item.barCode) {
                this.$message.error('请输入条形码')
                return
            }
            if (e.keyCode == 13) {
                hosAssetsSrv.getConsumeInfo(item.barCode).then(resp => {
                    item.assetId = resp.data.assetId
                    item.assetsName = resp.data.assetName
                }, err => {
                    this.$message.error(err.msg)
                })
            }
        },
        addFun() {
            let arrList = []
            let len = this.assets.length
            for (let i = 0; i < len; i++) {
                arrList.push({
                    assetId: this.assets[i].assetId,
                    inventory: this.assets[i].value
                })
                hosAssetsSrv.addConsumeInventory(arrList).then(resp => {
                    this.$message.success('增加库存成功')
                    this.addDialog = false
                    this.getConsumeList()
                }, err => {
                    this.$message.error(err.msg)
                })
            }
        },
        addDialogShow(barCode) {
            this.barCode = barCode
            this.addPerDialog = true
            hosAssetsSrv.getConsumeInfo(barCode).then(resp => {
                this.assetId = resp.data.assetId
                this.assetName = resp.data.assetName
            }, err => {
                this.$message.error(err.msg)
            })

        },
        addPerFun() {
            let arrList = []
            arrList.push({
                assetId: this.assetId,
                inventory: this.inventory
            })
            hosAssetsSrv.addConsumeInventory(arrList).then(resp => {
                this.$message.success('增加库存成功')
                this.addPerDialog = false
                this.getConsumeList()
            }, err => {
                this.$message.error(err.msg)
            })
        },
        getAssetsType() {
            if (!this.assetType) {
                this.$message.error('请先选择资产大类')
                return;
            }
            systemSrv.assetsDetailComboBox(this.assetType).then(resp => {
                this.typeDetailList = resp.data.typeDetailList
            }, err => {
                this.$message.error(err.msg)
            })
        },
        deleteData(index) {
            this.assets.splice(index, 1)
            this.confirmDialog = false
        },
        addData() {
            this.assets.push({
                switch: false,
                barCode: "",
                assetsName: '',
                value: 1
            });
        },
        //增加
        increase(index, value) {
            return this.assets[index].value++;
        },
        //减少
        decrease(index, value) {
            this.index = index
            if (value <= 0) {
                return 0;
            } else {
                return this.assets[index].value--;
            }
        },
        //单条增加
        increasePer() {
            return this.inventory++;
        },
        //单条减少
        decreasePer() {
            if (this.inventory <= 0) {
                return 0;
            } else {
                return this.inventory--;
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.distance {
    position: relative;
    .top-distance {
        position: absolute;
        top: -36px;
        margin-top: 10px;
    }
}

.list-search {
    padding: 6px 15px;
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

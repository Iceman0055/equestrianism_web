<template>
    <div class="p-insurance-list content_page">
        <div class="content-title">
            <div class="title">固定资产明细</div>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-3 search-field">
                    <div class="label">资产大类：</div>
                    <el-select size="large" v-model="assetType" class="el-field-input" placeholder="请选择">
                        <el-option v-for="(item,index) in assetTypeList" :key="index" :label="item.typeName" :value="item.typeId">
                        </el-option>
                    </el-select>
                </div>
                <div class="col-md-3 search-field">
                    <div class="label">资产分类：</div>
                    <el-select @focus="getAssetsType" size="large" v-model="typeDetail" class="el-field-input" placeholder="请选择">
                        <el-option v-for="(item,index) in typeDetailList" :key="index" :label="item.typeDetailName" :value="item.typeDetailId">
                        </el-option>
                    </el-select>
                </div>
                <div class="col-md-2 search-field">
                    <div class="label">资产编号：</div>
                    <input type="text" v-model="assetNumber" placeholder="请输入资产编号" class="form-control input-field" />
                </div>
                <div class="col-md-2 search-field">
                    <div class="label">条形码：</div>
                    <input type="text" v-model="barCode" placeholder="请输入条形码" class="form-control input-field" />
                </div>
                <div class="col-md-1 search-field search-field_controls">
                    <button @click="getAssetsList(1)" class="btn btn-primary search-btn">搜索</button>
                </div>
                <div class="col-md-1 search-field search-field_controls">
                    <button class="btn btn-success">
                        导出
                    </button>
                </div>
            </div>
            <div class="wait-loading" v-show="showLoading"><img src="/static/img/loading.gif"></div>
            <div class="row" v-show="!showLoading">
                <div class="col-lg-12">
                    <table class="table table-bordered table-striped table-sm">
                        <thead>
                            <tr>
                                <th>条形码</th>
                                <th>资产大类</th>
                                <th>资产分类</th>
                                <th>资产编号</th>
                                <th>资产名称</th>
                                <th>价值</th>
                                <th>面积</th>

                                <th>价值类型</th>
                                <th>取得方式</th>
                                <th>财务出账日期</th>
                                <th>制单日期</th>

                                <th>保修截止日期</th>
                                <th>管理部门</th>
                                <th>管理人</th>

                                <th>备注</th>
                                <th>设计用途</th>
                                <th>规格型号</th>
                                <th>品牌</th>

                                <th>会记凭证号</th>
                                <th>采购组织形式</th>
                                <th>状态</th>

                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>

                            <tr v-for="(item,index) in assetsList" :key="index">
                                <td>{{item.barCode}}</td>
                                <td>{{item.typeName}}</td>
                                <td>{{item.typeDetailName}}</td>
                                <td>{{item.assetNumber}}</td>
                                <td>{{item.assetName}}</td>
                                <td>{{item.price}}</td>
                                <td>{{item.acreage}}</td>

                                <td>{{item.priceTypeName}}</td>
                                <td>{{item.acquireWayName}}</td>
                                <td>{{item.financeAccountsDate}}</td>
                                <td>{{item.tabDate}}</td>
                                <td>{{item.guaranteeDate}}</td>

                                <td>{{item.departmentName}}</td>
                                <td>{{item.realname}}</td>
                                <td>{{item.remark}}</td>
                                <td>{{item.purpose}}</td>
                                <td>{{item.specificationModel}}</td>
                                <td>{{item.brand}}</td>
                                <td>{{item.voucherNumber}}</td>
                                <td>{{item.purchaseOrganize}}</td>
                                <td>{{statusMap[item.scrapType]}}</td>
                                <td>
                                    <!-- <router-link :to="{path: '/equestrian/updateDetail',       
                                                  query: { disable: 1,assetId:item.assetId}}"> 查看</router-link> -->

                                    <a @click="deleteInfo(item.assetDetailId)">{{operateState[item.scrapType]}}</a>
                                </td>

                            </tr>
                        </tbody>
                    </table>
                    <div class="list-empty" v-show="assetsList.length===0">
                        暂无数据
                    </div>
                    <div class="page">
                        <div class="total"> 总共 {{totalRecorders}} 条</div>
                        <el-pagination @current-change="getAssetsList" :current-page="currentPage" :page-size="pageRecorders" background layout="prev, pager, next" :total="totalRecorders">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog title="操作" :modal-append-to-body="false" :visible.sync="deleteDialog" width="20%" center>
            <div class="text-center">
                <span>确定要修改此状态吗?</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="deleteDialog = false">取 消</el-button>
                <el-button type="primary" @click="deleteAssets">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { Pagination, Message, Select } from 'element-ui'
import equestrianSrv from '../../../services/equestrian.service.js'
import systemSrv from '../../../services/system.service.js'
export default {
    data() {
        return {
            operateState:{
                1:'正常',
                0:'已报废'
            },
            statusMap: {
                1: "报废",
                0: '正常'
            },
            assetNumber: '',
            deleteDialog: false,
            typeDetail: '',
            assetType: "",
            currentPage: 1,
            pageRecorders: 10,
            totalRecorders: 0,
            assetTypeList: [],
            typeDetailList: [],
            deleteContent: {},
            showLoading: false,
            assetsName: '',
            assetsList: [],
            barCode: ''
        }
    },
    beforeRouteEnter: function(to, from, next) {
        next(vm => {
            vm.showLoading = true
            equestrianSrv.assetDetailList(vm.currentPage, vm.pageRecorders, vm.assetType, vm.typeDetail, vm.assetNumber, vm.barCode).then(resp => {
                vm.showLoading = false
                vm.totalRecorders = resp.data.totalRecorders
                vm.assetsList = resp.data.assetDetailList
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
        getAssetsList(currentPage = this.currentPage) {
            this.showLoading = true
            equestrianSrv.assetDetailList(currentPage, this.pageRecorders, this.assetType, this.typeDetail, this.assetNumber, this.barCode).then((resp) => {
                this.showLoading = false
                this.currentPage = currentPage
                this.totalRecorders = resp.data.totalRecorders
                this.assetsList = resp.data.assetDetailList
            }, (err) => {
                this.showLoading = false
                this.$message.error(err.msg)
            })
        },
        deleteInfo(assetDetailId) {
            this.deleteDialog = true
            this.deleteContent.assetDetailId = assetDetailId
        },
        deleteAssets() {
            equestrianSrv.deleteAssetsDetail(this.deleteContent).then(resp => {
                this.$message.success('删除成功')
                this.deleteDialog = false
                this.getAssetsList()
            }, err => {
                this.$message.error(err.msg)
            })
        }
    },
}
</script>

<style lang="scss" scoped>
.content_page .content-show .page {
    justify-content: flex-end;
    display: flex;
    float: none;
    .total {
        line-height: 2.2;
        color: #867a7a;
    }
}
</style>

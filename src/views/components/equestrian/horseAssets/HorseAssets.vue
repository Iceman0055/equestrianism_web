<template>
    <div class="p-insurance-list content_page">
        <div class="content-title">
            <div class="title">固定资产类品管理</div>
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
                <div class="col-md-3 search-field">
                    <div class="label">资产名称：</div>
                    <input type="text" v-model="assetsName" placeholder="请输入资产名称" class="form-control input-field" />
                </div>
                <div class="col-md-1 search-field search-field_controls">
                    <button @click="getAssetsList(1)" class="btn btn-primary search-btn">搜索</button>
                </div>
                <div class="col-md-1 search-field search-field_controls">
                    <router-link class="btn btn-success" :to="'/equestrian/hAddAssets'">
                        新增
                    </router-link>
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-1 search-field search-field_controls">
                    <button class="btn btn-info" @click="batchImportDialog=true">批量导入</button>
                </div>
                <div class="col-md-1 search-field search-field_controls">
                    <button class="btn btn-info">
                        <a target="_blank" class="clearText" href="/static/assets/固定资产导入模板.xls" download="">
                            模板下载
                        </a>
                    </button>
                </div>
                <div class="col-md-1 search-field search-field_controls">
                    <button class="btn btn-info">
                        <a class="clearText" v-bind:href="exportExcel" target="_blank" download="data.xls">导出</a>
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
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>

                            <tr v-for="(item,index) in assetsList" :key="index">
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
                                <td>
                                    <router-link :to="{path: '/equestrian/hUpdateAssets',       
                                                                                                                     query: { disable: 1,assetId:item.assetId,departmentId:item.departmentId}}"> 查看</router-link>
                                    <router-link :to="{path:'/equestrian/hUpdateAssets',query:{assetId:item.assetId,departmentId:item.departmentId}}">
                                        修改
                                    </router-link>
                                    <a @click="deleteInfo(item.assetId)">删除</a>
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
        <el-dialog title="删除" :modal-append-to-body="false" :visible.sync="deleteDialog" width="20%" center>
            <div class="text-center">
                <span>确定要删除吗?</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="deleteDialog = false">取 消</el-button>
                <el-button type="primary" @click="deleteAssets">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="批量导入" :modal-append-to-body="false" :visible.sync="batchImportDialog" width="40%" center>
            <div class="text-center">
                <el-upload :headers="headers" class="upload-demo" name="filename" action="/equestrianismApi/centerAssetInfo/batchImport" :on-success="handleSuccess" :file-list="fileList">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传xls格式的Excel文件</div>
                </el-upload>
            </div>
            <span slot="footer" class="dialog-footer">
                <!-- <el-button @click="batchImportDialog = false">取 消</el-button> -->
                <el-button type="primary" @click="batchImportDialog=false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { Pagination, Message, Select, Upload } from 'element-ui'
import equestrianSrv from '../../../services/equestrian.service.js'
import systemSrv from '../../../services/system.service.js'
export default {
    data() {
        return {
            fileList: [],
            batchImportDialog: false,
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
            assetsList: []
        }
    },
    computed: {
        exportExcel() {
            var sessionId = window.localStorage.getItem('sessionId')
            return "/equestrianismApi/centerAssetInfo/exportExcel?sessionId=" + sessionId + "&typeId=" + this.assetType + '&typeDetailId=' + this.typeDetail + '&assetName=' + this.assetName
        },
        headers() {
            return {
                'sessionId': window.localStorage.getItem("sessionId")
            }
        }
    },
    beforeRouteEnter: function(to, from, next) {
        next(vm => {
            vm.showLoading = true
            equestrianSrv.horseAssetsList(vm.currentPage, vm.pageRecorders, vm.assetType, vm.typeDetail, vm.assetsName).then(resp => {
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
        handleSuccess(response, file, fileList) {
            if (response.code == 10200) {
                this.$message.success('批量导入成功')
            }
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
        getAssetsList(currentPage = this.currentPage) {
            this.showLoading = true
            equestrianSrv.horseAssetsList(currentPage, this.pageRecorders, this.assetType, this.typeDetail, this.assetsName).then((resp) => {
                this.showLoading = false
                this.currentPage = currentPage
                this.totalRecorders = resp.data.totalRecorders
                this.assetsList = resp.data.assetInfoList
            }, (err) => {
                this.showLoading = false
                this.$message.error(err.msg)
            })
        },
        deleteInfo(assetId) {
            this.deleteDialog = true
            this.deleteContent.assetId = assetId
            this.deleteContent.deleteFlag = 1
        },
        deleteAssets() {
            equestrianSrv.deleteHorseAssets(this.deleteContent).then(resp => {
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
.clearText {
    text-decoration: none;
    color: #fff;
}

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

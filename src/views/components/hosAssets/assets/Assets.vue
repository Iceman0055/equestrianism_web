<template>
    <div class="p-insurance-list content_page">
        <div class="content-title">
            <div class="title">固定资产信息</div>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">资产大类：</div>
                    <el-select size="large" v-model="assetType" class="el-field-input" placeholder="请选择">
                        <el-option v-for="item in assetTypeList" :key="item.typeId" :label="item.typeName" :value="item.typeId">
                        </el-option>
                    </el-select>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">资产分类：</div>
                    <el-select @focus="getAssetsType" size="large" v-model="typeDetail" class="el-field-input" placeholder="请选择">
                        <el-option v-for="item in typeDetailList" :key="item.typeDetailId" :label="item.typeDetailName" :value="item.typeDetailId">
                        </el-option>
                    </el-select>
                </div>
                <div class="col-md-1 search-field search-field_controls">
                    <button @click="getAssetsList(1)" class="btn btn-primary search-btn">搜索</button>
                </div>
                <div class="col-md-1 search-field search-field_controls">
                    <router-link class="btn btn-success" :to="'/hosAssets/addAssets'">
                        新增
                    </router-link>
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
                                <th>数量</th>
                                <th>价值</th>
                                <th>面积</th>

                                <th>价值类型</th>
                                <th>取得方式</th>
                                <th>财务出账日期</th>
                                <th>制单日期</th>

                                <th>保修截止日期</th>
                                <th>管理部门</th>
                                <th>管理人</th>
                                <th>使用状态</th>

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

                            <tr>
                                <td>上海市</td>
                                <td>一等奖</td>
                                <td>无</td>
                                <td>无</td>
                                <td>无</td>
                                <td>无</td>
                                <td>无</td>
                                <td>无</td>
                                <td>无</td>
                                <td>无</td>
                                <td>无</td>
                                <td>无</td>

                                <td>无</td>
                                <td>无</td>
                                <td>无</td>
                                <td>无</td>
                                <td>无</td>
                                <td>无</td>
                                <td>无</td>
                                <td>无</td>
                                <td>无</td>
                                <td>
                                    <router-link :to="{path: '/hosAssets/updateAssets',       
                                                                             query: { disable: 1,}}"> 查看</router-link>
                                    <router-link :to="'/hosAssets/updateAssets'">
                                        修改
                                    </router-link>
                                    <!-- <a @click="deleteInfo(item.hospitalAppointId)">删除</a> -->
                                </td>

                            </tr>
                        </tbody>
                    </table>
                    <!-- <div class="list-empty" v-show="assetsList.length===0">
                                                                            暂无数据
                                                                        </div> -->
                    <div class="page">
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
    </div>
</template>

<script>
import { Pagination, Message,Select } from 'element-ui'
import hosAssetsSrv from '../../../services/hosAssets.service.js'
import systemSrv from '../../../services/system.service.js'
export default {
    data() {
        return {
            deleteDialog: false,
            typeDetail: '',
            assetType: "",
            currentPage: 1,
            pageRecorders: 10,
            totalRecorders: 1,
            assetTypeList: [],
            typeDetailList: [],
            deleteContent: {},
            showLoading: false,
        }
    },
    beforeRouteEnter: function(to, from, next) {
        next(vm => {
            vm.showLoading = true
            hosAssetsSrv.assetsList(vm.currentPage, vm.pageRecorders, vm.assetType, vm.typeDetail).then(resp => {
                vm.showLoading = false
                // vm.totalRecorders = resp.data.totalRecorders
                // vm.assetsList = resp.data.appointInfoList
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
            hosAssetsSrv.assetsList(currentPage, this.pageRecorders, this.assetType, this.typeDetail).then((resp) => {
                this.showLoading = false
                this.currentPage = currentPage
                // this.totalRecorders = resp.data.totalRecorders
                // this.assetsList = resp.data.appointInfoList
            }, (err) => {
                this.showLoading = false
                this.$message.error(err.msg)
            })
        },
        deleteInfo(hospitalAppointId) {
            this.deleteDialog = true
            this.deleteContent.hospitalAppointId = hospitalAppointId
            this.deleteContent.deleteFlag = 1
        },
        deleteAssets() {
            hosAssetsSrv.deleteAsseta(this.deleteContent).then(resp => {
                this.$message.success('删除成功')
                this.deleteDialog = false
                this.getAssetsList()
            }, err => {
                this.$message.error(err.msg)
            })
        }
    },
    components: {
        'el-pagination': Pagination,
        'el-select':Select
    }
}
</script>

<style lang="scss" scoped>

</style>

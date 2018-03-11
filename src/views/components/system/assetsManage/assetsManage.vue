<template>
    <div class="content_page animated fadeIn">
        <div class="content-title">
            <div class="title">资产分类管理</div>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">资产名称：</div>
                    <input type="text" v-model="typeName" class="form-control input-field" placeholder="请输入资产名称" />
                </div>
                <div class="col-md-1 search-field search-field_controls">
                    <button @click="getAssets(1)" class="btn btn-primary search-btn">搜索</button>
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-1 search-field search-field_controls">
                    <button class="btn btn-success" @click="addAssetsDialog(1)">新增</button>
                </div>
            </div>
            <div class="wait-loading" v-show="showLoading"><img src="/static/img/loading.gif"></div>
            <div class="row" v-show="!showLoading">
                <div class="col-lg-12">
                    <table class="table table-bordered table-striped table-sm">
                        <thead>
                            <tr>
                                <th></th>
                                <th>资产名称</th>
                                <th>备注</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in assetsList" :key="item">
                                <td><input type="radio" class="input-pointer" name="select" @click="getDetailList(item.typeId)"></td>
                                <td>{{item.typeName}}</td>
                                <td>{{item.remark}}</td>
                                <td>
                                    <a @click="addAssetsDialog(2,item.typeId)">修改</a>
                                    <a @click="deleteInfo(item.typeId)">删除</a>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                    <div class="list-empty" v-show="assetsList.length===0">
                        暂无数据 </div>

                    <div class="page">
                        <el-pagination @current-change="getAssets" :current-page="currentPage" :page-size="pageRecorders" background layout="prev, pager, next" :total="totalRecorders">
                        </el-pagination>
                    </div>
                </div>
            </div>

            <div class="row list-search">
                <div class="col-md-1 search-field search-field_controls">
                    <button class="btn btn-success" @click="addDictTextDialog(1)">新增详情</button>
                </div>
            </div>
            <div class="row ">
                <div class="col-lg-12">
                    <table class="table table-bordered table-striped table-sm">
                        <thead>
                            <tr>
                                <th>详情名称</th>
                                <th>备注</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <!-- <tr v-for="item in dictDetailList" :key="item">
                                <td>{{item.dictionaryId}}</td>
                                <td>{{item.itemValue}}</td>
                                <td>{{item.itemCode}}</td>
                                <td>
                                    <a @click="addDictTextDialog(2,item.dictionaryDetailId)">修改 </a>
                                    <a @click="deleteDetailInfo(item.dictionaryDetailId)">删除</a>
                                </td>
                            </tr> -->

                        </tbody>
                    </table>
                    <div class="list-empty" v-show="dictDetailList.length===0">
                        暂无数据
                    </div>

                    <div class="page">
                        <el-pagination @current-change="dictDetailList" :current-page="current" :page-size="page" background layout="prev, pager, next" :total="total">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog title="提示" :modal-append-to-body="false" :visible.sync="deleteDialog" width="20%" center>
            <div class="text-center">
                <span>确定要删除这项内容吗?</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="deleteDialog = false">取 消</el-button>
                <el-button type="primary" @click="deleteAssets">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="提示" :modal-append-to-body="false" :visible.sync="deleteTextDialog" width="20%" center>
            <div class="text-center">
                <span>确定要删除这项内容吗?</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="deleteTextDialog = false">取 消</el-button>
                <el-button type="primary" @click="deleteTextDetail">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 修改 -->
        <el-dialog :title="dialogTitle" :modal-append-to-body="false" :close-on-click-modal="false" :visible.sync="updateDialog" width="50%" center>
            <div class="content-show text-center">
                <div class="row mb-1 list-search">
                    <div class="col-md-6 search-field">
                        <div class="label">资产名称：</div>
                        <input type="text" v-model="assetsName" class="form-control input-field" placeholder="资产名称" />
                    </div>
                    <div class="col-md-6 search-field">
                        <div class="label">备注：</div>
                        <input type="text" v-model="remark" class="form-control input-field" placeholder="备注" />
                    </div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="updateDialog = false">取 消</el-button>
                <el-button v-if="dialogTitle=='新增'" type="primary" @click="addAssets">新增</el-button>
                <el-button v-if="dialogTitle=='修改'" type="primary" @click="updateAssets">修改</el-button>
            </span>
        </el-dialog>
        <el-dialog :title="dialogTextTitle" :modal-append-to-body="false" :close-on-click-modal="false" :visible.sync="updateTextDialog" width="50%" center>
            <div class="content-show text-center">
                <div class="row mb-1 list-search">
                    <div class="col-md-6 search-field">
                        <div class="label">详情名称：</div>
                        <input type="text" v-model="itemValue" class="form-control input-field" placeholder="详情名称" />
                    </div>
                    <div class="col-md-6 search-field">
                        <div class="label">备注：</div>
                        <input type="text" v-model="itemCode" class="form-control input-field" placeholder="备注" />
                    </div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="updateTextDialog = false">取 消</el-button>
                <el-button v-if="dialogTextTitle=='新增'" type="primary" @click="addDictDetail">新增</el-button>
                <el-button v-if="dialogTextTitle=='修改'" type="primary" @click="updateDictDetail">修改</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { Pagination, Dialog, Message } from 'element-ui'
import systemSrv from '../../../services/system.service.js'
export default {
    data() {
        return {
            dialogTitle: '',
            dialogTextTitle: '',
            deleteTextDialog: false,
            updateTextDialog: false,
            updateDialog: false,
            deleteDialog: false,
            showLoading: false,
            pageRecorders: 10,
            totalRecorders: 1,
            currentPage: 1,
            page: 10,
            total: 1,
            current: 1,
            typeCode: '',
            typeName: '',
            assetsList: [],
            assetsName: '',
            dictType: '',
            remark: '',
            sort: '',
            deleteContent: {},
            deleteContentInfo: {},
            typeId: '',
            dictionaryDetailId: '',
            dictDetailList: [],
            fatherCode: '',
            itemCode: '',
            itemValue: '',
            updateDetailInfo: {},
            addDetailInfo: {}
        }
    },
    beforeRouteEnter: function(to, from, next) {
        next(vm => {
            vm.showLoading = true
            systemSrv.assetsList(vm.currentPage, vm.pageRecorders, vm.typeName, ).then(resp => {
                vm.showLoading = false
                vm.totalRecorders = resp.data.totalRecorders
                vm.assetsList = resp.data.assetTypeList
            }, err => {
                vm.showLoading = false
                vm.$message.error(err.msg)
            })

        })
    },
    methods: {
        getAssets(currentPage = this.currentPage) {
            this.showLoading = true
            systemSrv.assetsList(currentPage, this.pageRecorders, this.typeName).then(resp => {
                this.currentPage = currentPage
                this.showLoading = false
                this.total = resp.data.totalRecorders
                this.assetsList = resp.data.assetTypeList
            }, err => {
                this.showLoading = false
                this.$message.error(err.msg)
            })
        },
        getDetailList(id) {
            systemSrv.dicDetailList(id).then(resp => {
                this.total = resp.data.totalRecorders
                this.dictDetailList = resp.data.dictionaryDetailList
            }, err => {
                this.$message.error(err.msg)
            })
        },
        addAssetsDialog(index, typeId) {
            this.updateDialog = true
            if (index == 1) {
                this.dialogTitle = '新增'       
                this.assetsName = ''
                this.remark = ''
            } else {
                this.typeId = typeId
                this.dialogTitle = '修改'
                systemSrv.getAssets(typeId).then(resp => {
                    this.assetsName = resp.data.typeName
                    this.remark = resp.data.remark
                }, err => {
                    this.$message.error(err.msg)
                })

            }
        },
        addDictTextDialog(index, dictionaryDetailId) {
            this.updateTextDialog = true
            if (index == 1) {
                this.dialogTextTitle = '新增'
            } else {
                this.dictionaryDetailId = dictionaryDetailId
                this.dialogTextTitle = '修改'
                systemSrv.getDicDetail(dictionaryDetailId).then(resp => {
                    this.fatherCode = resp.data.dictionaryId
                    this.itemCode = resp.data.itemCode
                    this.itemValue = resp.data.itemValue
                }, err => {
                    this.$message.error(err.msg)
                })
            }
        },
        addAssets() {
            if (!(this.assetsName && this.remark)) {
                this.$message.error('资产信息不能为空！')
                return;
            }
            this.addInfo = {
                typeName: this.assetsName,
                remark: this.remark,
            }
            systemSrv.addAssets(this.addInfo).then((resp) => {
                this.$message.success('添加资产典成功')
                this.updateDialog = false
                this.getAssets()
            }, (err) => {
                this.$message.error(err.msg)
            })
        },
        addDictDetail() {
            if (!(this.fatherCode && this.itemCode && this.itemValue)) {
                this.$message.error('字项信息不能为空！')
                return;
            }
            this.addDetailInfo = {
                dictionaryId: this.fatherCode,
                itemCode: this.itemCode,
                itemValue: this.itemValue,
            }
            systemSrv.addDicDetail(this.addDetailInfo).then((resp) => {
                this.$message.success('添加字项成功')
                this.updateTextDialog = false
                this.getDetailList()
            }, (err) => {
                this.$message.error(err.msg)
            })
        },
        updateDictDetail() {
            if (!(this.fatherCode && this.itemCode && this.itemValue)) {
                this.$message.error('字项信息不能为空！')
                return;
            }
            this.updateDetailInfo = {
                dictionaryDetailId: this.dictionaryDetailId,
                itemCode: this.itemCode,
                itemValue: this.itemValue,
            }
            systemSrv.updateDicDetail(this.updateDetailInfo).then((resp) => {
                this.$message.success('修改字项成功')
                this.updateTextDialog = false
                this.getDetailList()
            }, (err) => {
                this.$message.error(err.msg)
            })
        },
        updateAssets() {
            if (!(this.assetsName && this.remark)) {
                this.$message.error('资产信息不能为空！')
                return;
            }
            this.updateInfo = {
                typeId: this.typeId,
                typeName: this.assetsName,
                remark: this.remark,
            }
            systemSrv.updateAssets(this.updateInfo).then((resp) => {
                this.$message.success('修改资产信息成功')
                this.updateDialog = false
                this.getAssets()
            }, (err) => {
                this.$message.error(err.msg)
            })
        },
        deleteInfo(typeId) {
            this.deleteDialog = true
            this.deleteContent.typeId = typeId
            this.deleteContent.deleteFlag = 1
        },
        deleteAssets() {
            systemSrv.deleteAssets(this.deleteContent).then((resp) => {
                this.$message.success('删除成功')
                this.deleteDialog = false
                this.getAssets()
            }, (err) => {
                this.$message.error(err.msg)
            })
        },
        deleteDetailInfo(dicDetailId) {
            this.deleteTextDialog = true
            this.deleteContentInfo.dictionaryDetailId = dicDetailId
            this.deleteContentInfo.deleteFlag = 1
        },
        deleteTextDetail() {
            systemSrv.deleteDicDetail(this.deleteContentInfo).then(resp => {
                this.$message.success('删除成功')
                this.deleteTextDialog = false
                this.getDetailList()
            }, err => {
                this.$message.error(err.msg)
            })

        }

    },
    components: {
        'el-pagination': Pagination,
        'el-dialog': Dialog,
    }
}
</script>

<style lang="scss" scoped>
.input-pointer {
    cursor: pointer;
}
</style>

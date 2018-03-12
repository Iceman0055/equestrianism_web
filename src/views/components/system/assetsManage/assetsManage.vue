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
                            <tr style="cursor:pointer" v-for="item in assetsList" :key="item" @click="getAssetsDetail(1, item)">
                                <td><input type="radio" class="input-pointer" name="select" :checked="item.checked" ></td>
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
                    <button class="btn btn-success" :disabled="!activeItem" @click="addAssetsTextDialog(1,searchDetailId)">新增详情</button>
                </div>
            </div>
            <div class="wait-loading" v-show="loading"><img src="/static/img/loading.gif"></div>
            <div class="row" v-show="!loading">
                <div class="col-lg-12">
                    <table class="table table-bordered table-striped table-sm">
                        <thead>
                            <tr>
                                <th>父节点</th>
                                <th>详情名称</th>
                                <th>备注</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in assetsDetailList" :key="item">
                                <td>{{item.typeId}}</td>
                                <td>{{item.typeDetailName}}</td>
                                <td>{{item.remark}}</td>
                                <td>
                                    <a @click="addAssetsTextDialog(2,item.typeDetailId)">修改 </a>
                                    <a @click="deleteDetailInfo(item.typeDetailId)">删除</a>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                    <div class="list-empty" v-show="assetsDetailList.length===0">
                        暂无数据
                    </div>

                    <div class="page">
                        <el-pagination @current-change="getAssetsDetail" :current-page="current" :page-size="page" background layout="prev, pager, next" :total="total">
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
                        <div class="label">父节点：</div>
                        <input type="text" v-model="fatherCode" disabled class="form-control input-field" placeholder="父节点" />
                    </div>
                    <div class="col-md-6 search-field">
                        <div class="label">详情名称：</div>
                        <input type="text" v-model="detailName" class="form-control input-field" placeholder="详情名称" />
                    </div>
                </div>
                <div class="row mb-1 list-search">
                    <div class="col-md-6 search-field">
                        <div class="label">备注：</div>
                        <input type="text" v-model="detailRemark" class="form-control input-field" placeholder="备注" />
                    </div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="updateTextDialog = false">取 消</el-button>
                <el-button v-if="dialogTextTitle=='新增'" type="primary" @click="addAssetsDetail">新增</el-button>
                <el-button v-if="dialogTextTitle=='修改'" type="primary" @click="updateAssetsDetail">修改</el-button>
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
             activeItem: undefined,
            deleteTextDialog: false,
            updateTextDialog: false,
            updateDialog: false,
            deleteDialog: false,
            showLoading: false,
            loading:false,
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
            detailRemark: '',
            detailName: '',
            deleteContent: {},
            deleteContentInfo: {},
            typeId: '',
            typeDetailId: '',
            dictionaryDetailId: '',
            assetsDetailList: [],
            updateDetailInfo: {},
            addDetailInfo: {},
            searchDetailId:'',
            fatherCode:'',
            editDetail:true,
            checked:false
        }
    },
    beforeRouteEnter: function(to, from, next) {
        next(vm => {
            vm.showLoading = true
            systemSrv.assetsList(vm.currentPage, vm.pageRecorders, vm.typeName, ).then(resp => {
                vm.showLoading = false
                vm.totalRecorders = resp.data.totalRecorders              
                let assetsList = resp.data.assetTypeList
                let len = assetsList.length
                let checkedArray = []
                for(let i=0;i<len;i++){
                    checkedArray.push({
                        typeId:assetsList[i].typeId,
                        typeName:assetsList[i].typeName,
                        remark:assetsList[i].remark,
                        checked: false
                    })
                }
                vm.assetsList = checkedArray
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
                this.totalRecorders = resp.data.totalRecorders
                this.assetsList = resp.data.assetTypeList
            }, err => {
                this.showLoading = false
                this.$message.error(err.msg)
            })
        },
        getAssetsDetail(currentPage, item = this.activeItem) {
            this.activeItem && (this.activeItem.checked = false);
            item.checked = true;
            this.activeItem = item;
            this.loading = true
            this.searchDetailId = item.typeId
            systemSrv.assetsDetailList(currentPage, this.page, item.typeId).then(resp => {
                this.current = currentPage
                this.loading = false
                this.total = resp.data.totalRecorders
                this.assetsDetailList = resp.data.assetTypeDetailList
            }, err => {
                this.loading = false
                this.$message.error(err.msg)
            })
        },
        addAssetsDialog(index, typeId) {
            event.stopPropagation()
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
        addAssetsTextDialog(index, id) {
            this.updateTextDialog = true
            if (index == 1) {
                this.dialogTextTitle = '新增'
                this.fatherCode = id
                this.detailName = ''
                this.detailRemark = ''
            } else {
                this.typeDetailId = id
                this.dialogTextTitle = '修改'
                systemSrv.getAssetsDetail(this.typeDetailId).then(resp => {
                    this.fatherCode = resp.data.typeId
                    this.detailName = resp.data.typeDetailName
                    this.detailRemark = resp.data.remark
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
        addAssetsDetail() {
            if (!(this.fatherCode && this.detailName && this.detailRemark)) {
                this.$message.error('资产详情信息不能为空！')
                return;
            }
            this.addDetailInfo = {
                typeId: this.fatherCode,
                typeDetailName: this.detailName,
                remark: this.detailRemark,
            }
            systemSrv.addAssetsDetail(this.addDetailInfo).then((resp) => {
                this.$message.success('添加资产详情成功')
                this.updateTextDialog = false
                this.getAssetsDetail(1,this.fatherCode)
            }, (err) => {
                this.$message.error(err.msg)
            })
        },
        updateAssetsDetail() {
            if (!(this.typeDetailId&&this.detailName && this.detailRemark)) {
                this.$message.error('资产详情信息不能为空！')
                return;
            }
            this.updateDetailInfo = {
                typeDetailId: this.typeDetailId,
                typeDetailName: this.detailName,
                remark: this.detailRemark,
            }
            systemSrv.updateAssetsDetail(this.updateDetailInfo).then((resp) => {
                this.$message.success('修改资产详情成功')
                this.updateTextDialog = false
                this.getAssetsDetail(1,this.fatherCode)
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
            event.stopPropagation()
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
        deleteDetailInfo(typeDetailId) {
            this.deleteTextDialog = true
            this.deleteContentInfo.typeDetailId = typeDetailId
            this.deleteContentInfo.deleteFlag = 1
        },
        deleteTextDetail() {
            systemSrv.deleteAssetsDetail(this.deleteContentInfo).then(resp => {
                this.$message.success('删除成功')
                this.deleteTextDialog = false
                this.getAssetsDetail(1,this.fatherCode)
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

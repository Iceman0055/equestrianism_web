<template>
    <div class="content_page animated fadeIn">
        <div class="content-title">
            <div class="title">部门管理</div>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">部门名称：</div>
                    <el-select size="large" v-model="departName" class="el-field-input" placeholder="请选择部门名称">
                        <el-option v-for="item in departList" :key="item.departmentId" :label="item.departmentName" :value="item.departmentId">
                        </el-option>
                    </el-select>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">状态：</div>
                    <el-select size="large" v-model="status" class="el-field-input" placeholder="请选择状态">
                        <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="col-md-1 search-field search-field_controls">
                    <button @click="getDepart(1)" class="btn btn-primary search-btn">搜索</button>
                </div>
                <div class="col-md-1 search-field search-field_controls">
                    <router-link class="btn btn-success" :to="'/system/AddDepart'">
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
                                <th>部门名称</th>
                                <th>部门简称</th>
                                <th>状态</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in departInfoList" :key="item">
                                <td>{{item.departmentName}}</td>
                                <td>{{item.shortName}}</td>
                                <td>{{convertStatus[item.status]}}</td>
                                <td>
                                    <a @click="stuffDialog=true">成员管理</a>
                                    <a @click="permissionDialog=true">分配权限</a>
                                    <router-link :to="{path:'/system/updateDepart',query:{departmentId:item.departmentId}}">
                                        修改
                                    </router-link>
                                    <router-link :to="{path: '/system/updateDepart',  query: { disable: 1,departmentId:item.departmentId}}"> 查看</router-link>
                                    <a @click="statusInfo(item.departmentId,item.status)">{{convertStatus[1-item.status]}}</a>
                                    <a @click="deleteInfo(item.departmentId)">删除</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="list-empty" v-show="departInfoList.length===0">
                        暂无数据 </div>
                    <div class="page">
                        <el-pagination @current-change="getDepart" :current-page="currentPage" :page-size="pageRecorders" background layout="prev, pager, next" :total="totalRecorders">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>
        <!-- 分配权限 -->
        <el-dialog title="分配权限" :modal-append-to-body="false" :visible.sync="permissionDialog" width="30%" center>
            <div class="row mb-3">
                <div class="col-md-3">
                    <button class="btn btn-info" @click="selectChecked">全选</button>
                </div>
                <div class="col-md-3">
                    <button class="btn btn-info" @click="resetChecked">全不选</button>
                </div>
            </div>
            <el-tree @check-change="selectNode" :data="data2" show-checkbox default-expand-all node-key="id" ref="tree" highlight-current :props="defaultProps">
            </el-tree>
            <span slot="footer" class="dialog-footer">
                <el-button @click="permissionDialog = false">取 消</el-button>
                <el-button type="primary" @click="permissionDialog = false">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 成员管理 -->
        <el-dialog title="成员管理" :modal-append-to-body="false" :visible.sync="stuffDialog" width="30%" center>
            <el-tree :data="data3" show-checkbox default-expand-all node-key="id" ref="tree" highlight-current :props="defaultProps">
            </el-tree>
            <span slot="footer" class="dialog-footer">
                <el-button @click="stuffDialog = false">取 消</el-button>
                <el-button type="primary" @click="stuffDialog = false">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="删除" :modal-append-to-body="false" :visible.sync="deleteDialog" width="20%" center>
            <div class="text-center">
                <span>确定要删除吗?</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="deleteDialog = false">取 消</el-button>
                <el-button type="primary" @click="deleteDepart">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="状态" :modal-append-to-body="false" :visible.sync="statusDialog" width="20%" center>
            <div class="text-center">
                <span>确定要修改此状态吗?</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="statusDialog = false">取 消</el-button>
                <el-button type="primary" @click="statusManage">确 定</el-button>
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
            departInfoList: [],
            departList: [],
            pageRecorders: 10,
            totalRecorders: 1,
            currentPage: 1,
            status: '',
            departName: '',
            stuffDialog: false,
            showLoading: false,
            permissionDialog: false,
            statusDialog: false,
            deleteDialog: false,
            deleteContent: {},
            stopContent: {},
            convertStatus: {
                "1": "启用",
                "0": "停用"
            },
            statusOptions: [{
                value: '1',
                label: '启用'
            }, {
                value: '0',
                label: '禁用'
            }],
            data2: [{
                id: 0,
                label: '控制台',
            }, {
                id: 1,
                label: '马匹信息管理',
                children: [{
                    id: 5,
                    label: '基本信息',
                }, {
                    id: 6,
                    label: '获奖信息',
                }]
            }, {
                id: 2,
                label: '马医院信息管理',
                children: [{
                    id: 7,
                    label: '固定资产管理'
                }, {
                    id: 8,
                    label: '消耗品管理'
                }]
            }, {
                id: 3,
                label: '马术中心资产管理',
                children: [{
                    id: 9,
                    label: '固定资产管理'
                }, {
                    id: 10,
                    label: '固定资产库存管理'
                },]
            }, {
                id: 4,
                label: '系统管理',
                children: [{
                    id: 11,
                    label: '用户管理'
                }, {
                    id: 12,
                    label: '部门管理'
                }]
            }],
            data3: [{
                id: 1,
                label: '产品部',
                children: [{
                    id: 5,
                    label: '前端',
                }, {
                    id: 6,
                    label: '后台',
                }]
            }],
            defaultProps: {
                children: 'children',
                label: 'label'
            }
        }
    },
    components: {
        'el-pagination': Pagination,
        'el-dialog': Dialog
    },
    beforeRouteEnter: function(to, from, next) {
        next(vm => {
            vm.showLoading = true
            systemSrv.departList(vm.currentPage, vm.pageRecorders, vm.departName,vm.status).then(resp => {
                vm.showLoading = false
                vm.totalRecorders = resp.data.totalRecorders
                vm.departInfoList = resp.data.departmentInfoList
            }, err => {
                vm.showLoading = false
                vm.$message.error(err.msg)
            })
            systemSrv.getDepart().then((resp) => {
                vm.departList = resp.data.departmentList
            }, (err) => {
                vm.$message.error(err.msg)
            })
        })
    },
    methods: {
        getDepart(currentPage = this.currentPage) {
            this.showLoading = true
            systemSrv.departList(currentPage, this.pageRecorders, this.departName,this.status).then(resp => {
                this.currentPage = currentPage
                this.showLoading = false
                this.totalRecorders = resp.data.totalRecorders
                this.departInfoList = resp.data.departmentInfoList
            }, err => {
                this.showLoading = false
                this.$message.error(err.msg)
            })
        },
        deleteInfo(departId) {
            this.deleteDialog = true
            this.deleteContent.departmentId = departId
            this.deleteContent.deleteFlag = 1
        },

        deleteDepart() {
            systemSrv.deleteDepart(this.deleteContent).then((resp) => {
                this.$message.success('删除成功')
                this.deleteDialog = false
                this.getDepart()
            }, (err) => {
                this.$message.error(err.msg)
            })
        },
        statusInfo(departId, status) {
            this.statusDialog = true
            this.stopContent.departmentId = departId
            this.stopContent.status = 1 - status
        },
        statusManage() {
            systemSrv.deleteDepart(this.stopContent).then((resp) => {
                this.$message.success('修改状态成功')
                this.statusDialog = false
                this.getDepart()
            }, (err) => {
                this.$message.error(err.msg)
            })
        },
        selectChecked() {
            this.$refs.tree.setCheckedKeys([0, 1, 2, 3, 4]);
        },
        resetChecked() {
            this.$refs.tree.setCheckedKeys([]);
        },
        //传递3个参数，传递给 data 属性的数组中该节点所对应的对象、节点本身是否被选中、节点的子树中是否有被选中的节点
        selectNode(object, selfCheck, childCheck) {

        }
    }
}
</script>

<style lang="scss" scoped>

</style>

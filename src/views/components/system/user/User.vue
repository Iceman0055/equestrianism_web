<template>
    <div class="content_page animated fadeIn">
        <div class="content-title" key="0">
            <div class="title">用户管理</div>
        </div>
        <div class="content-show" key="1">
            <div class="row list-search">
                <div class="col-md-2 search-field">
                    <div class="label">工号：</div>
                    <input type="text" v-model="list_jobNumber" class="form-control input-field" placeholder="请输入工号" />
                </div>
                <div class="col-md-2 search-field">
                    <div class="label">姓名：</div>
                    <input type="text" v-model="list_name" class="form-control input-field" placeholder="请输入姓名" />
                </div>
                <div class="col-md-2 search-field">
                    <div class="label">状态：</div>
                    <el-select size="large" v-model="list_status" class="el-field-input" placeholder="请选择">
                        <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="col-md-2 search-field">
                    <div class="label">部门：</div>
                    <el-select size="large" v-model="list_depart" class="el-field-input" placeholder="请选择">
                        <el-option v-for="item in departList" :key="item.departmentId" :label="item.departmentName" :value="item.departmentId">
                        </el-option>
                    </el-select>
                </div>
                <div class="col-md-2 search-field">
                    <div class="label">角色：</div>
                    <el-select size="large" v-model="list_role" class="el-field-input" placeholder="请选择">
                        <el-option v-for="item in roleList" :key="item.roleId" :label="item.roleName" :value="item.roleId">
                        </el-option>
                    </el-select>
                </div>
                <div class="col-md-1 search-field search-field_controls">
                    <button @click="getUser(1)" class="btn btn-primary search-btn">搜索</button>
                </div>
                <div class="col-md-1 search-field search-field_controls">
                    <router-link class="btn btn-success" :to="'/system/AddUser'">
                        新增
                    </router-link>
                </div>
            </div>
            <div class="wait-loading" v-show="showLoading"><img src="/static/img/loading.gif"></div>
            <div class="row ">
                <div class="col-lg-12">
                    <table class="table table-bordered table-striped table-sm">
                        <thead>
                            <tr>
                                <th>工号</th>
                                <th>姓名</th>
                                <th>用户登录名</th>
                                <th>部门</th>
                                <th>角色</th>
                                <th>联系方式</th>
                                <th>邮箱</th>
                                <th>状态</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in userList" :key="item">
                                <td>{{item.jobNumber}}</td>
                                <td>{{item.realname}}</td>
                                <td>{{item.loginName}}</td>
                                <td>{{item.departmentName}}</td>
                                <td>{{item.roleName}}</td>
                                <td>{{item.contactWay}}</td>
                                <td>{{item.email}}</td>
                                <td>{{convertStatus[item.status]}}</td>
                                <td>
                                    <router-link :to="{path:'/system/updateUser',query:{userId:item.userId}}">
                                        修改
                                    </router-link>
                                    <router-link :to="{path: '/system/updateUser',  query: { disable: 1,userId:item.userId}}"> 查看</router-link>
                                    <a @click="statusInfo(item.userId,item.status)">{{convertStatus[1-item.status]}}</a>
                                    <a @click="deleteInfo(item.userId)">删除</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="list-empty" v-show="userList.length===0">
                        暂无数据
                    </div>
                    <div class="page">
                        <el-pagination @current-change="getUser" :current-page="currentPage" :page-size="pageRecorders" background layout="prev, pager, next" :total="totalRecorders">
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
                <el-button type="primary" @click="deleteUser">确 定</el-button>
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
/* eslint-disable */
export default {
    data() {
        return {
            departList:[],
            roleList: [],
            statusDialog: false,
            showLoading: false,
            deleteDialog: false,
            userList: [],
            pageRecorders: 10,
            totalRecorders: 1,
            list_name: '',
            list_jobNumber: '',
            list_status: '',
            list_role: '',
            list_depart: '',
            currentPage: 1,
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
                label: '停用'
            }],
        }
    },
    components: {
        'el-pagination': Pagination,
        'el-dialog': Dialog
    },
    beforeRouteEnter: function(to, from, next) {
        next(vm => {
            vm.showLoading = true
            systemSrv.userList(vm.currentPage, vm.list_name, vm.list_jobNumber, vm.list_status, vm.list_depart, vm.list_role, vm.pageRecorders).then((resp) => {
                vm.showLoading = false
                vm.totalRecorders = resp.data.totalRecorders
                vm.userList = resp.data.userInfoList
            }, (err) => {
                vm.showLoading = false
                vm.$message.error(err.note)
            })
            systemSrv.getRole().then((resp) => {
                vm.roleList = resp.data.roleList
            }, (err) => {
                vm.$message.error(err.note)
            })
            systemSrv.getDepart().then((resp) => {
                vm.departList = resp.data.departmentList
            }, (err) => {
                vm.$message.error(err.note)
            })
        })
    },
    methods: {
        getUser(currentPage = this.currentPage) {
            this.showLoading = true
            systemSrv.userList(currentPage, this.list_name, this.list_jobNumber, this.list_status, this.list_depart, this.list_role, this.pageRecorders).then((resp) => {
                this.showLoading = false
                this.currentPage = currentPage;
                this.totalRecorders = resp.data.totalRecorders
                this.userList = resp.data.userInfoList
            }, (err) => {
                this.showLoading = false
                this.$message.error(err.note)
            })
        },
        deleteInfo(userId) {
            this.deleteDialog = true
            this.deleteContent.userId = userId
            this.deleteContent.deleteFlag = 1
        },

        deleteUser() {
            systemSrv.deleteUser(this.deleteContent).then((resp) => {
                this.$message.success('删除成功')
                this.deleteDialog = false
                this.getUser()
            }, (err) => {
                this.$message.error(err.note)
            })
        },
        statusInfo(userId, status) {
            this.statusDialog = true
            this.stopContent.userId = userId
            this.stopContent.status = 1 - status
        },
        statusManage() {
            systemSrv.deleteUser(this.stopContent).then((resp) => {
                this.$message.success('修改状态成功')
                this.statusDialog = false
                this.getUser()
            }, (err) => {
                this.$message.error(err.note)
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.content_page {
    .content-show {
        .list-search {
            .search-field {
                .label {
                    position: absolute;
                    left: 20px;
                    top: 8px;
                    text-align: right;
                }
            }
        }
    }
}
</style>

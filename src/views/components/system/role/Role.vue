<template>
    <div class="content_page animated fadeIn">
        <div class="content-title">
            <div class="title">角色管理</div>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-1 search-field search-field_controls">
                    <router-link class="btn btn-success" :to="'/system/AddRole'">
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
                                <th>角色名称</th>
                                <th>角色简称</th>
                                <th>备注</th>
                                <th>状态</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in roleList" :key="index">
                                <td>{{item.roleName}}</td>
                                <td>{{item.shortName}}</td>
                                <td>{{item.remark}}</td>
                                <td>{{convertStatus[item.status]}}</td>
                                <td>
                                    <a @click="getMenuOriginList(item.roleId)">分配权限</a>
                                    <router-link :to="{path:'/system/updateRole',query:{roleId:item.roleId}}">
                                        修改
                                    </router-link>
                                    <router-link :to="{path: '/system/updateRole',  query: { disable: 1,roleId:item.roleId}}"> 查看</router-link>
                                    <a @click="statusInfo(item.roleId,item.status)">{{convertStatus[1-item.status]}}</a>
                                    <a @click="deleteInfo(item.roleId)">删除</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="list-empty" v-show="roleList.length===0">
                        暂无数据 </div>
                    <div class="page">
                        <el-pagination @current-change="getRole" :current-page="currentPage" :page-size="pageRecorders" background layout="prev, pager, next" :total="totalRecorders">
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
                <el-button type="primary" @click="deleteRole">确 定</el-button>
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
            <el-tree :data="menuList" show-checkbox default-expand-all node-key="id" ref="tree" highlight-current :props="defaultProps">
            </el-tree>
            <span slot="footer" class="dialog-footer">
                <el-button @click="permissionDialog = false">取 消</el-button>
                <el-button type="primary" @click="updateMenuList">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { Pagination, Dialog, Tree, Message } from 'element-ui'
import systemSrv from '../../../services/system.service.js'
/* eslint-disable */
export default {
    data() {
        return {
            deleteMenuList: [],
            addMenuList: [],
            origin: [],
            roleId: '',
            pageRecorders: 10,
            totalRecorders: 1,
            currentPage: 1,
            statusDialog: false,
            showLoading: false,
            deleteDialog: false,
            expandAll: false,
            permissionDialog: false,
            deleteContent: {},
            stopContent: {},
            convertStatus: {
                "1": "启用",
                "0": "停用"
            },
            roleList: [],
            menuList: [],
            defaultProps: {
                children: 'children',
                label: 'label'
            }
        }

    },
    beforeRouteEnter: function(to, from, next) {
        next(vm => {
            vm.showLoading = true
            systemSrv.roleList(vm.currentPage, vm.pageRecorders).then((resp) => {
                vm.showLoading = false
                vm.totalRecorders = resp.data.totalRecorders
                vm.roleList = resp.data.roleInfoList
            }, (err) => {
                vm.showLoading = false
                vm.$message.error(err.msg)
            })
            systemSrv.getMenuList().then(resp => {
                let menuList = resp.data.menuList
                vm.menuList = menuList.map((menu) => {
                    let convert = {
                        id: menu.menuId,
                        label: menu.menuName
                    }
                    if (menu.subMenuList) {
                        convert.children = menu.subMenuList.map((sub) => {
                            return {
                                id: sub.subMenuId,
                                label: sub.subMenuName
                            }
                        })
                    }
                    return convert;
                })
            }, err => {
                vm.$message.error(err.msg)
            })

        })
    },
    methods: {
        updateMenuList() {
            this.collectChange()
            let updateInfo = {
                roleId: this.roleId,
                deleteMenuList: this.deleteMenuList,
                addMenuList: this.addMenuList
            }
            systemSrv.updateMenuList(updateInfo).then(resp => {
                this.$message.success('分配权限成功')
                this.permissionDialog = false
                this.getRole()
            }, err => {
                this.$message.error(err.msg)
            })
        },
        //数组去重
        unique(array) {
            var r = [];
            for (var i = 0, l = array.length; i < l; i++) {
                for (var j = i + 1; j < l; j++)
                    if (array[i] === array[j]) j = ++i;
                r.push(array[i]);
            }
            return r;
        },
        collectChange() {
            let changed = this.$refs.tree.getCheckedKeys();
            this.deleteMenuList = this.unique(this.origin.filter(i => { return changed.indexOf(i) === -1 }))
            this.addMenuList = this.unique(changed.filter(i => { return this.origin.indexOf(i) === -1 }))
        },
        getMenuOriginList(roleId) {
            this.roleId = roleId
            this.permissionDialog = true
            systemSrv.getRoleMenuList(roleId).then(resp => {
                this.origin = resp.data.menuList
                this.$refs.tree.setCheckedKeys(this.origin);
            }, err => {
                this.$message.error(err.msg)
            })
        },
        getRole(currentPage = this.currentPage) {
            this.showLoading = true
            systemSrv.roleList(currentPage, this.pageRecorders).then((resp) => {
                this.showLoading = false
                this.currentPage = currentPage
                this.totalRecorders = resp.data.totalRecorders
                this.roleList = resp.data.roleInfoList
            }, (err) => {
                this.showLoading = false
                this.$message.error(err.msg)
            })
        },
        deleteInfo(roleId) {
            this.deleteDialog = true
            this.deleteContent.roleId = roleId
            this.deleteContent.deleteFlag = 1
        },

        deleteRole() {
            systemSrv.deleteRole(this.deleteContent).then((resp) => {
                this.$message.success('删除成功')
                this.deleteDialog = false
                this.getRole()
            }, (err) => {
                this.$message.error(err.msg)
            })
        },
        statusInfo(roleId, status) {
            this.statusDialog = true
            this.stopContent.roleId = roleId
            this.stopContent.status = 1 - status
        },
        statusManage() {
            systemSrv.deleteRole(this.stopContent).then((resp) => {
                this.$message.success('修改状态成功')
                this.statusDialog = false
                this.getRole()
            }, (err) => {
                this.$message.error(err.msg)
            })
        },
        //全选
        selectChecked() {
            this.$refs.tree.setCheckedKeys([0, 1, 2, 3, 4, 5, 6, 7]);
        },
        //全不选
        resetChecked() {
            this.$refs.tree.setCheckedKeys([]);
        },
    },
}
</script>

<style lang="scss" scoped>

</style>

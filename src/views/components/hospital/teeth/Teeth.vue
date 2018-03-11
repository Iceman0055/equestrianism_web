<template>
    <div class="animated fadeIn content_page">
        <div class="content-title">
            <div class="title">挫牙管理</div>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-3 search-field">
                    <div class="label">马匹名称：</div>
                    <el-select size="large" filterable v-model="horseName" class="el-field-input" placeholder="请选择马匹名称">
                        <el-option v-for="item in horseInfoName" :key="item.horseId" :label="item.horseName" :value="item.horseId">
                        </el-option>
                    </el-select>
                </div>
                <div class="col-md-1 search-field search-field_controls">
                    <button @click="getTeethList(1)" class="btn btn-primary search-btn">搜索</button>
                </div>
                <div class="col-md-1 search-field search-field_controls">
                    <router-link class="btn btn-success" :to="'/hospital/addTeeth'">
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
                                <th>时间</th>
                                <th>马匹名称</th>
                                <th>操作人</th>
                                <th>备注</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in teethList" :key="item">
                                <td>{{item.operateDate}}</td>
                                <td>{{item.horseName}}</td>
                                <td>{{item.realname}}</td>
                                <td>{{item.remark}}</td>
                                <td>
                                    <router-link :to="{path: '/hospital/updateTeeth',       
                                                                 query: { disable: 1,contusionTeethId:item.contusionTeethId}}"> 查看</router-link>
                                    <router-link :to="{path:'/hospital/updateTeeth',query:{contusionTeethId:item.contusionTeethId}}">修改</router-link>
                                    <a @click="deleteInfo(item.contusionTeethId)">删除</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="list-empty" v-show="teethList.length===0">
                                暂无数据
                            </div>
                    <div class="page">
                        <el-pagination @current-change="getTeethList" :current-page="currentPage" :page-size="pageRecorders" background layout="prev, pager, next" :total="totalRecorders">
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
                <el-button type="primary" @click="deleteTeeth">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { Pagination, Message, Select } from 'element-ui'
import hospitalSrv from '../../../services/hospital.service.js'
import horseSrv from '../../../services/horse.service.js'
export default {
    data() {
        return {
            currentPage: 1,
            pageRecorders: 10,
            totalRecorders: 1,
            horseName: '',
            horseInfoName: [],
            showLoading: false,
            teethList: [],
            deleteContent: {},
            deleteDialog: false,
        }
    },
    beforeRouteEnter: function(to, from, next) {
        next(vm => {
            vm.showLoading = true
            hospitalSrv.teethList(vm.currentPage, vm.pageRecorders, vm.horseName).then(resp => {
                vm.showLoading = false
                vm.totalRecorders = resp.data.totalRecorders
                vm.teethList = resp.data.contusionTeethList
            }, err => {
                vm.showLoading = false
                vm.$message.error(err.msg)
            })
            horseSrv.getHorseName().then((resp) => {
                vm.horseInfoName = resp.data.horseList
            }, (err) => {
                vm.$message.error(err.msg)
            })
        })
    },
    methods: {
        getTeethList(currentPage = this.currentPage) {
            this.showLoading = true
            hospitalSrv.teethList(currentPage, this.pageRecorders, this.horseName).then((resp) => {
                this.showLoading = false
                this.currentPage = currentPage
                this.totalRecorders = resp.data.totalRecorders
                this.teethList = resp.data.contusionTeethList
            }, (err) => {
                this.showLoading = false
                this.$message.error(err.msg)
            })
        },
        deleteInfo(teethId) {
            this.deleteDialog = true
            this.deleteContent.contusionTeethId = teethId
            this.deleteContent.deleteFlag = 1
        },
        deleteTeeth() {
            hospitalSrv.deleteTeeth(this.deleteContent).then(resp => {
                this.$message.success('删除成功')
                this.deleteDialog = false
                this.getTeethList()
            }, err => {
                this.$message.error(err.msg)
            })
        }
    },
    components: {
        'el-pagination': Pagination,
        'el-select': Select
    }
}
</script>

<style lang="scss" scoped>

</style>

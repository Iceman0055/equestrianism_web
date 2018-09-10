<template>
    <div class="animated fadeIn content_page">
        <div class="content-title">
            <div class="title">钉甲管理</div>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-3 search-field">
                    <div class="label">马匹名称：</div>
                    <el-select size="large" filterable v-model="horseName" class="el-field-input" placeholder="请选择马匹名称">
                        <el-option v-for="(item,index) in horseInfoName" :key="index" :label="item.horseName" :value="item.horseId">
                        </el-option>
                    </el-select>
                </div>
                <div class="col-md-1 search-field search-field_controls">
                    <button @click="getNailList(1)" class="btn btn-primary search-btn">搜索</button>
                </div>
                <div class="col-md-1 search-field search-field_controls">
                    <router-link class="btn btn-success" :to="'/hospital/addNail'">
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
                            <tr v-for="(item,index) in nailList" :key="index">
                                <td>{{item.brigandineDate}}</td>
                                <td>{{item.horseName}}</td>
                                <td>{{item.realname}}</td>
                                <td>{{item.remark}}</td>
                                <td>
                                    <router-link :to="{path: '/hospital/updateNail',       
                                                         query: { disable: 1,brigandineId:item.brigandineId}}"> 查看</router-link>
                                    <router-link :to="{path:'/hospital/updateNail',query:{brigandineId:item.brigandineId}}">修改</router-link>
                                    <a @click="deleteInfo(item.brigandineId)">删除</a>

                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="list-empty" v-show="nailList.length===0">
                        暂无数据
                    </div>
                    <div class="page">
                        <div class="total"> 总共 {{totalRecorders}} 条</div>
                        <el-pagination @current-change="getNailList" :current-page="currentPage" :page-size="pageRecorders" background layout="prev, pager, next" :total="totalRecorders">
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
                <el-button type="primary" @click="deleteNail">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { Pagination, Message ,Select} from 'element-ui'
import hospitalSrv from '../../../services/hospital.service.js'
import horseSrv from '../../../services/horse.service.js'
export default {
    data() {
        return {
            currentPage: 1,
            pageRecorders: 10,
            totalRecorders: 0,
            horseName: '',
            horseInfoName: [],
            nailList: [],
            showLoading:false,
            deleteContent: {},
            deleteDialog: false
        }
    },
    beforeRouteEnter: function(to, from, next) {
        next(vm => {
            vm.showLoading = true
            hospitalSrv.nailList(vm.currentPage, vm.pageRecorders, vm.horseName).then(resp => {
                vm.showLoading = false
                vm.totalRecorders = resp.data.totalRecorders
                vm.nailList = resp.data.brigandineList
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
        getNailList(currentPage = this.currentPage) {
            this.showLoading = true
            hospitalSrv.nailList(currentPage, this.pageRecorders, this.horseName).then((resp) => {
                this.showLoading = false
                this.currentPage = currentPage
                this.totalRecorders = resp.data.totalRecorders
                this.nailList = resp.data.brigandineList
            }, (err) => {
                this.showLoading = false
                this.$message.error(err.msg)
            })
        },
        deleteInfo(brigandineId) {
            this.deleteDialog = true
            this.deleteContent.brigandineId = brigandineId
            this.deleteContent.deleteFlag = 1
        },
        deleteNail() {
            hospitalSrv.deleteNail(this.deleteContent).then(resp => {
                this.$message.success('删除成功')
                this.deleteDialog = false
                this.getNailList()
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

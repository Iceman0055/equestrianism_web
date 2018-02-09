<template>
    <div class="content_page animated fadeIn">
        <div class="content-title">
            <div class="title">马匹基本信息</div>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">护照号码：</div>
                    <input type="text" v-model="passportNumber" class="form-control input-field" placeholder="请输入护照号码" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">马匹名称：</div>
                    <el-select size="large" v-model="horseName" class="el-field-input" placeholder="请选择马匹名称">
                        <el-option v-for="item in horseInfoName" :key="item.horseId" :label="item.horseName" :value="item.horseName">
                        </el-option>
                    </el-select>
                </div>

                <div class="col-md-1 search-field search-field_controls">
                    <button class="btn btn-primary search-btn" @click="getHorseList(1)">搜索</button>
                </div>
                <div class="col-md-1 search-field search-field_controls">
                    <router-link class="btn btn-success" :to="'/horse/addBaseInfo'">
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
                                <th>护照号码</th>
                                <th>马名</th>
                                <th>性别</th>
                                <th>变更马名</th>
                                <th>变更日期</th>
                                <th>出生年</th>
                                <th>出生国家</th>
                                <th>身高(公分)</th>
                                <th>毛色</th>
                                <th>皮下微型条码</th>
                                <th>状态</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in horseList" :key="item">
                                <td>{{item.passportNumber}}</td>
                                <td>{{item.horseName}}</td>
                                <td>{{item.sex}}</td>
                                <td>{{item.usedName}}</td>
                                <td>{{item.changeDate}}</td>
                                <td>{{item.birthday}}</td>
                                <td>{{item.country}}</td>
                                <td>{{item.height}}</td>
                                <td>{{item.coatColour}}</td>
                                <td>{{item.barCode}}</td>
                                <td>{{convertStatus[item.status]}}</td>
                                <td>
                                    <router-link :to="{path: '/horse/updateBaseInfo', query: { disable: 1,horseId:item.horseId}}"> 查看</router-link>
                                    <router-link :to="{path:'/horse/updateBaseInfo',query:{horseId:item.horseId}}">
                                        修改
                                    </router-link>
                                    <a @click="statusInfo(item.horseId,item.status)">{{convertStatus[1-item.status]}}</a>
                                    <a @click="deleteInfo(item.horseId)">删除</a>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                    <div class="list-empty" v-show="horseList.length===0">
                        暂无数据 </div>
                    <div class="page">
                        <el-pagination @current-change="getHorseList" :current-page="currentPage" :page-size="pageRecorders" background layout="prev, pager, next" :total="totalRecorders">
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
                <el-button type="primary" @click="deleteHorse">确 定</el-button>
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
import { Pagination, Dialog, Message } from "element-ui";
import horseSrv from '../../../services/horse.service.js'
export default {
    data() {
        return {
            deleteDialog: false,
            statusDialog: false,
            currentPage: 1,
            pageRecorders: 10,
            showLoading: false,
            totalRecorders: 1,
            horseList: [],
            passportNumber: '',
            horseName: '',
            horseInfoName: [],
            deleteContent: {},
            stopContent: {},
            convertStatus: {
                "1": "启用",
                "0": "停用"
            },
        };
    },
    components: {
        "el-pagination": Pagination,
        "el-dialog": Dialog
    },
    beforeRouteEnter: function(to, from, next) {
        next(vm => {
            vm.showLoading = true
            horseSrv.horseInfoList(vm.currentPage, vm.pageRecorders, vm.passportNumber, vm.horseName).then((resp) => {
                vm.showLoading = false
                vm.totalRecorders = resp.data.totalRecorders
                vm.horseList = resp.data.horseList
            }, (err) => {
                vm.showLoading = false
                vm.$message.error(err.note)
            })
            horseSrv.getHorseName().then((resp) => {
                vm.horseInfoName = resp.data.horseList
            }, (err) => {
                vm.$message.error(err.note)
            })
        })
    },
    methods: {
        getHorseList(currentPage = this.currentPage) {
            this.showLoading = true
            horseSrv.horseInfoList(currentPage, this.pageRecorders, this.passportNumber, this.horseName).then((resp) => {
                this.showLoading = false
                this.currentPage = currentPage
                this.totalRecorders = resp.data.totalRecorders
                this.horseList = resp.data.horseList
            }, (err) => {
                this.showLoading = false
                this.$message.error(err.note)
            })
        },
        deleteInfo(horseId) {
            this.deleteDialog = true
            this.deleteContent.horseId = horseId
            this.deleteContent.deleteFlag = 1
        },

        deleteHorse() {
            horseSrv.deleteHorse(this.deleteContent).then((resp) => {
                this.$message.success('删除成功')
                this.deleteDialog = false
                this.getHorseList()
            }, (err) => {
                this.$message.error(err.note)
            })
        },
        statusInfo(horseId, status) {
            this.statusDialog = true
            this.stopContent.horseId = horseId
            this.stopContent.status = 1 - status
        },
        statusManage() {
            horseSrv.deleteHorse(this.stopContent).then((resp) => {
                this.$message.success('修改状态成功')
                this.statusDialog = false
                this.getHorseList()
            }, (err) => {
                this.$message.error(err.note)
            })
        },
    }
};
</script>

<style lang="scss" scoped>

</style>

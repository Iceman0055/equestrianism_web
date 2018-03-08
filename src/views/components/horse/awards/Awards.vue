<template>
    <div class="animated fadeIn content_page">
        <div class="content-title">
            <div class="title">马匹获奖信息</div>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-3 search-field">
                    <div class="label">马匹名称：</div>
                    <el-select size="large" v-model="horseName" class="el-field-input" placeholder="请选择马匹名称">
                        <el-option v-for="item in horseInfoName" :key="item.horseId" :label="item.horseName" :value="item.horseId">
                        </el-option>
                    </el-select>
                </div>
                <div class="col-md-3 search-field">
                    <div class="label">赛事名称：</div>
                    <input type="text" v-model="eventName" class="form-control input-field" placeholder="请输入赛事名称" />
                </div>
                <div class="col-md-3 search-field">
                    <div class="label">比赛时间：</div>
                    <el-date-picker class="el-field-input" value-format="yyyy-MM" size="large" v-model="eventDate" type="month" placeholder="选择时间">
                    </el-date-picker>
                </div>

                <div class="col-md-1 search-field search-field_controls">
                    <button @click="getAwardsList(1)" class="btn btn-primary search-btn">搜索</button>
                </div>
                <div class="col-md-1 search-field search-field_controls">
                    <router-link class="btn btn-success" :to="'/horse/addAwards'">
                        新增
                    </router-link>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <table class="table table-bordered table-striped table-sm">
                        <thead>
                            <tr>
                                <th>马匹名称</th>
                                <th>赛事名称</th>
                                <th>比赛时间</th>
                                <th>比赛地点</th>
                                <th>奖项</th>
                                <th>罚分项</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in awardsList" :key="item">
                                <td>{{item.horseName}}</td>
                                <td>{{item.eventName}}</td>
                                <td>{{item.eventDate}}</td>
                                <td>{{item.eventPlace}}</td>
                                <td>{{item.prizeName}}</td>
                                <td>{{item.penaltyTerm}}</td>
                                <td>
                                    <router-link :to="{path: '/horse/updateAwards',       
                                                                                         query: { disable: 1,horsePrizeId:item.horsePrizeId}}"> 查看</router-link>
                                    <router-link :to="{path:'/horse/updateAwards',query:{horsePrizeId:item.horsePrizeId}}">
                                        修改
                                    </router-link>
                                    <a @click="deleteInfo(item.horsePrizeId)">删除</a>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                    <div class="list-empty" v-show="awardsList.length===0">
                        暂无数据
                    </div>
                    <div class="page">
                        <el-pagination @current-change="getAwardsList" :current-page="currentPage" :page-size="pageRecorders" background layout="prev, pager, next" :total="totalRecorders">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog title="提示" :modal-append-to-body="false" :visible.sync="deleteDialog" width="20%" center>
            <div class="text-center">
                <span>确定要删除吗?</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="deleteDialog = false">取 消</el-button>
                <el-button type="primary" @click="deleteAwards">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { Pagination, Dialog, Message, DatePicker } from 'element-ui'
import horseSrv from '../../../services/horse.service.js'
export default {
    data() {
        return {
            deleteDialog: false,
            currentPage: 1,
            totalRecorders: 1,
            pageRecorders: 10,
            horseInfoName: [],
            horseName: '',
            showLoading: false,
            eventName: '',
            eventDate: '',
            awardsList: [],
            deleteContent: {}
        }
    },
    beforeRouteEnter: function(to, from, next) {
        next(vm => {
            vm.showLoading = true
            horseSrv.awardsList(vm.currentPage, vm.pageRecorders, vm.horseName, vm.eventName, vm.eventDate).then((resp) => {
                vm.showLoading = false
                vm.totalRecorders = resp.data.totalRecorders
                vm.awardsList = resp.data.horsePrizeList
            }, (err) => {
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
        getAwardsList(currentPage = this.currentPage) {
            this.showLoading = true
            horseSrv.awardsList(currentPage, this.pageRecorders,this.horseName, this.eventName, this.eventDate).then((resp) => {
                this.showLoading = false
                this.currentPage = currentPage
                this.totalRecorders = resp.data.totalRecorders
                this.awardsList = resp.data.horsePrizeList
            }, (err) => {
                this.showLoading = false
                this.$message.error(err.msg)
            })
        },
        deleteInfo(horsePrizeId) {
            this.deleteDialog = true
            this.deleteContent.horsePrizeId = horsePrizeId
            this.deleteContent.deleteFlag = 1
        },
        deleteAwards() {
            horseSrv.deleteAwards(this.deleteContent).then(resp => {
                this.$message.success('删除成功')
                this.deleteDialog = false
                this.getAwardsList()
            }, err => {
                this.$message.error(err.msg)
            })
        },
    },
    components: {
        'el-pagination': Pagination,
        "el-dialog": Dialog
    }
}
</script>

<style lang="scss" scoped>

</style>

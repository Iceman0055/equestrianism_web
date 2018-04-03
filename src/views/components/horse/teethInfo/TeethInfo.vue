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
            </div>
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
    </div>
</template>

<script>
import { Pagination, Message ,Select} from 'element-ui'
import hospitalSrv from '../../../services/hospital.service.js'
import horseSrv from '../../../services/horse.service.js'
/* eslint-disable */
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
        }
    },
    beforeRouteEnter: function(to, from, next) {
        next(vm => {
            vm.showLoading = true
            if(to.query.horseId){
                vm.horseName = to.query.horseId
            }
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
        }
    },
}
</script>

<style lang="scss" scoped>

</style>

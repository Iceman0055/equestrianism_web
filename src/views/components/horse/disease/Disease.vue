<template>
    <div class="animated fadeIn content_page">
        <div class="content-title">
            <div class="title">马匹病历信息</div>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-3 search-field">
                    <div class="label">标签：</div>
                    <input type="text" v-model="titleTag" class="form-control input-field" placeholder="请输入标签" />
                </div>
                <div class="col-md-3 search-field">
                    <div class="label">马匹名称：</div>
                    <el-select size="large" filterable v-model="horseName" class="el-field-input" placeholder="请选择马匹名称">
                        <el-option v-for="(item,index) in horseInfoName" :key="index" :label="item.horseName" :value="item.horseId">
                        </el-option>
                    </el-select>
                </div>
                <div class="col-md-1 search-field search-field_controls">
                    <button @click="getTreatCaseList(1)" class="btn btn-primary search-btn">搜索</button>
                </div>
                <!-- <div class="col-md-1 search-field search-field_controls">
                                                    <router-link class="btn btn-success" :to="'/horse/addDisease'">
                                                        新增
                                                    </router-link>
                                                </div> -->
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <table class="table table-bordered table-striped table-sm">
                        <thead>
                            <tr>
                                <th>马匹</th>
                                <th>时间</th>
                                <th>地点</th>
                                <th>临诊</th>
                                <th>初诊</th>
                                <th>医嘱</th>
                                <th>标题标签</th>
                                <th>备注</th>
                                <!-- <th>操作</th> -->
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in treatCaseList" :key="index">
                                <td v-if="item.horseType==1">{{item.horseId}}</td>
                                <td v-if="item.horseType==2">{{item.horseName}}</td>
                                <td>{{item.operatorDate}}</td>
                                <td>{{item.place}}</td>
                                <td>{{item.clinical}}</td>
                                <td>{{item.firstVisit}}</td>
                                <td>{{item.advice}}</td>
                                <td>{{item.titleTag}}</td>
                                <td>{{item.remark}}</td>
                                <!-- <td> -->
                                    <!-- <router-link :to="{path: '/horse/updateDisease',       
                                                                     query: { disable: 1,treatmentCaseId:item.treatmentCaseId}}"> 查看</router-link> -->
                                    <!-- <router-link :to="'/horse/updateDisease'">修改</router-link> -->
                                <!-- </td> -->
                            </tr>
                        </tbody>
                    </table>
                    <div class="list-empty" v-show="treatCaseList.length===0">
                        暂无数据
                    </div>
                    <div class="page">
                        <div class="total"> 总共 {{totalRecorders}} 条</div>
                        <el-pagination @current-change="getTreatCaseList" :current-page="currentPage" :page-size="pageRecorders" background layout="prev, pager, next" :total="totalRecorders">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Pagination, Message } from 'element-ui'
import horseSrv from '../../../services/horse.service.js'
import hospitalSrv from "../../../services/hospital.service.js";

export default {
    data() {
        return {
            horseName: "",
            horseInfoName: [],
            titleTag: '',
            currentPage: 1,
            pageRecorders: 10,
            totalRecorders: 0,
            showLoading: false,
            treatCaseList: [],
        }
    },
    beforeRouteEnter: function(to, from, next) {
        next(vm => {
            vm.showLoading = true;
            if (to.query.horseId) {
                vm.horseName = to.query.horseId
            }
            hospitalSrv.treatCaseList(vm.currentPage, vm.pageRecorders, vm.titleTag, vm.horseName)
                .then(
                resp => {
                    vm.showLoading = false;
                    vm.totalRecorders = resp.data.totalRecorders;
                    vm.treatCaseList = resp.data.treatmentCaseList;
                },
                err => {
                    vm.showLoading = false;
                    vm.$message.error(err.msg);
                }
                );
            horseSrv.getHorseName().then(
                resp => {
                    vm.horseInfoName = resp.data.horseList;
                },
                err => {
                    vm.$message.error(err.msg);
                }
            );
        });
    },
    methods: {
        getTreatCaseList(currentPage = this.currentPage) {
            this.showLoading = true;
            hospitalSrv
                .treatCaseList(currentPage, this.pageRecorders, this.titleTag, this.horseName)
                .then(
                resp => {
                    this.showLoading = false;
                    this.currentPage = currentPage;
                    this.totalRecorders = resp.data.totalRecorders;
                    this.treatCaseList = resp.data.treatmentCaseList;
                },
                err => {
                    this.showLoading = false;
                    this.$message.error(err.msg);
                }
                );
        },
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

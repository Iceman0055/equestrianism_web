<template>
    <div class="animated fadeIn content_page">
        <div class="content-title">
            <div class="title">治疗信息管理</div>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">治疗名称：</div>
                    <input type="text" v-model="treatName" class="form-control input-field" placeholder="请输入治疗名称" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">马匹名称：</div>
                    <el-select size="large" filterable v-model="horseName" class="el-field-input" placeholder="请选择马匹名称">
                        <el-option v-for="(item,index) in horseInfoName" :key="index" :label="item.horseName" :value="item.horseId">
                        </el-option>
                    </el-select>
                </div>
                <div class="col-md-1 search-field search-field_controls">
                    <button @click="getTreatList(1)" class="btn btn-primary search-btn">搜索</button>
                </div>

            </div>
            <div class="wait-loading" v-show="showLoading"><img src="/static/img/loading.gif"></div>
            <div class="row" v-show="!showLoading">
                <div class="col-lg-12">
                    <table class="table table-bordered table-striped table-sm">
                        <thead>
                            <tr>
                                <th>门诊方式</th>
                                <th>预约号</th>
                                <th>马匹类型</th>
                                <th>马匹名称</th>
                                <th>治疗名称</th>
                                <th>治疗概述</th>
                                <th>手术室使用</th>
                                <th>设备使用</th>
                                <th>消耗品使用</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in treatmentList" :key="index">
                                <td>{{treatWayOptions[item.outpatientType]}}</td>
                                <td>{{item.appointNumber}}</td>
                                <td>{{horseTypeOptions[item.horseType]}}</td>
                                <td v-if="item.horseType==1">{{item.horseId}}</td>
                                <td v-if="item.horseType==2">{{item.horseName}}</td>
                                <td>{{item.treatName}}</td>
                                <td>{{item.treatDesc}}</td>
                                <td>{{item.consultingRoomName}}</td>
                                <td>
                                    <a @click="watchAssetsDetail(item.treatmentId)">查看详情</a>
                                </td>
                                <td>
                                    <a @click="watchConsumeDetail(item.treatmentId)">查看详情</a>
                                </td>
                                <td>
                                    <router-link :to="{path: '/hospital/updateTreat',       
                                                                             query: { disable:1,treatmentId:item.treatmentId}}"> 查看</router-link>

                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="list-empty" v-show="treatmentList.length===0">
                        暂无数据
                    </div>
                    <div class="page">
                        <el-pagination @current-change="getTreatList" :current-page="currentPage" :page-size="pageRecorders" background layout="prev, pager, next" :total="totalRecorders">
                        </el-pagination>
                    </div>

                </div>
            </div>
        </div>
        <!-- 固定资产  -->
        <el-dialog title="提示" :modal-append-to-body="false" :visible.sync="assetsDialog" width="22%" center>
            <div class="text-center">
                <div class="row" v-for="(item,index) in assetList" :key="index">
                    <div class="col-md-7">名称：{{item.assetName}}</div>
                    <div class="col-md-5">数量：{{item.count}}</div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="assetsDialog = false">取 消</el-button>
                <el-button type="primary" @click="assetsDialog = false">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 显示消耗品 -->
        <el-dialog title="提示" :modal-append-to-body="false" :visible.sync="consumeDialog" width="22%" center>
            <div class="text-center">
                <div class="row" v-for="(item,index) in consumeList" :key="index">
                    <div class="col-md-7">名称：{{item.assetName}}</div>
                    <div class="col-md-5">数量：{{item.count}}</div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="consumeDialog = false">取 消</el-button>
                <el-button type="primary" @click="consumeDialog = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { Pagination, DatePicker, Message, Select } from 'element-ui'
import hospitalSrv from "../../../services/hospital.service.js";
import horseSrv from "../../../services/horse.service.js"; export default {
    data() {
        return {
            assetList: [],
            consumeList: [],
            consumeDialog: false,
            assetsDialog: false,
            currentPage: 1,
            pageRecorders: 10,
            totalRecorders: 1,
            horseName: "",
            horseInfoName: [],
            showLoading: false,
            deleteContent: {},
            deleteDialog: false,
            treatName: "",
            treatmentList: [],
            treatWayOptions: {
                "1": "普通",
                "2": "预约"
            },
            horseTypeOptions: {
                "1": "中心",
                "2": "外来"
            }
        };
    },
    beforeRouteEnter: function(to, from, next) {
        next(vm => {
            vm.showLoading = true;
            if (to.query.horseId) {
                vm.horseName = to.query.horseId
            }
            hospitalSrv.treatList(vm.currentPage, vm.pageRecorders, vm.treatName, vm.horseName)
                .then(
                resp => {
                    vm.showLoading = false;
                    vm.totalRecorders = resp.data.totalRecorders;
                    vm.treatmentList = resp.data.treatmentList;
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
        watchAssetsDetail(treatmentId) {
            this.assetsDialog = true
            hospitalSrv.getHospitalAsset(treatmentId).then(
                resp => {
                    this.assetList = resp.data.assetList;
                },
                err => {
                    this.$message.error(err.msg);
                }
            );
        },
        watchConsumeDetail(treatmentId) {
            this.consumeDialog = true
            hospitalSrv.getConsumableAsset(treatmentId).then(
                resp => {
                    this.consumeList = resp.data.assetList;
                },
                err => {
                    this.$message.error(err.msg);
                }
            );
        },
        getTreatList(currentPage = this.currentPage) {
            this.showLoading = true;
            hospitalSrv
                .treatList(currentPage, this.pageRecorders, this.treatName, this.horseName)
                .then(
                resp => {
                    this.showLoading = false;
                    this.currentPage = currentPage;
                    this.totalRecorders = resp.data.totalRecorders;
                    this.treatmentList = resp.data.treatmentList;
                },
                err => {
                    this.showLoading = false;
                    this.$message.error(err.msg);
                }
                );
        },
    }
}
</script>
<style lang="scss" scoped>
.fieldInput {
    width: 90%;
}
</style>

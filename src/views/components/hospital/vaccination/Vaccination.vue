<template>
    <div class=" animated fadeIn content_page">
        <div class="content-title">
            <div class="title">接种疫苗信息</div>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-3 search-field">
                    <div class="label">时间：</div>
                    <el-date-picker class="el-field-input" format="yyyy-MM-dd HH:mm:00" value-format="yyyy-MM-dd HH:mm:00" size="large" v-model="time" type="datetime" placeholder="选择时间">
                    </el-date-picker>
                </div>
                <div class="col-md-3 search-field">
                    <div class="label">地点：</div>
                    <input type="text" v-model="address" class="form-control input-field" placeholder="请输入地址" />
                </div>
                <div class="col-md-3 search-field">
                    <div class="label">马匹名称：</div>
                    <el-select size="large" filterable v-model="horseName" class="el-field-input" placeholder="请选择马匹名称">
                        <el-option v-for="(item,index) in horseInfoName" :key="index" :label="item.horseName" :value="item.horseId">
                        </el-option>
                    </el-select>
                </div>
                <div class="col-md-1 search-field search-field_controls">
                    <button @click="getVaccList(1)" class="btn btn-primary search-btn">搜索</button>
                </div>
                <div class="col-md-1 search-field search-field_controls">
                    <router-link class="btn btn-success" :to="'/hospital/addVacc'">
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
                                <th>马匹名称</th>
                                <th>时间</th>
                                <th>地点</th>
                                <th>名称</th>
                                <th>预防疾病</th>
                                <th>医生</th>
                                <th>疫苗编号</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in vaccList" :key="index">
                                <td>{{item.horseName}}</td>
                                <td>{{item.operateDate}}</td>
                                <td>{{item.operatePlace}}</td>
                                <td>{{item.name}}</td>
                                <td>{{item.vaccinationName}}</td>
                                <td>{{item.realname}}</td>
                                <td>{{item.vaccinationNumber}}</td>
                                <td>
                                    <router-link :to="{path: '/hospital/updateVacc',       
                                                             query: { disable: 1,vaccinationId:item.vaccinationId}}"> 查看</router-link>
                                    <router-link :to="{path:'/hospital/updateVacc',query:{vaccinationId:item.vaccinationId}}">修改</router-link>
                                    <a @click="deleteInfo(item.vaccinationId)">删除</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="list-empty" v-show="vaccList.length===0">
                        暂无数据
                    </div>
                    <div class="page">
                        <div class="total"> 总共 {{totalRecorders}} 条</div>
                        <el-pagination @current-change="getVaccList" :current-page="currentPage" :page-size="pageRecorders" background layout="prev, pager, next" :total="totalRecorders">
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
                <el-button type="primary" @click="deleteVacc">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { Pagination, Select, DatePicker, Message } from "element-ui";
import hospitalSrv from "../../../services/hospital.service.js";
import horseSrv from '../../../services/horse.service.js'
export default {
    data() {
        return {
            time: "",
            address: '',
            currentPage: 1,
            pageRecorders: 10,
            totalRecorders: 0,
            deleteDialog: false,
            showLoading: false,
            horseInfoName: [],
            horseName: '',
            deleteContent: {},
            vaccList: [],
        };
    },
      beforeRouteLeave(to, from, next) {
        to.meta.keepAlive = true
        next()
    },
    beforeRouteEnter: function(to, from, next) {
        next(vm => {
            vm.showLoading = true
            hospitalSrv.vaccInfoList(vm.currentPage, vm.pageRecorders, vm.horseName, vm.time, vm.address).then(resp => {
                vm.showLoading = false
                vm.totalRecorders = resp.data.totalRecorders
                vm.vaccList = resp.data.vaccinationInfoList
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
        getVaccList(currentPage = this.currentPage) {
            this.showLoading = true
            hospitalSrv.vaccInfoList(currentPage, this.pageRecorders, this.horseName, this.time, this.address).then((resp) => {
                this.showLoading = false
                this.currentPage = currentPage
                this.totalRecorders = resp.data.totalRecorders
                this.vaccList = resp.data.vaccinationInfoList
            }, (err) => {
                this.showLoading = false
                this.$message.error(err.msg)
            })
        },
        deleteInfo(vaccinationId) {
            this.deleteDialog = true
            this.deleteContent.vaccinationId = vaccinationId
            this.deleteContent.deleteFlag = 1
        },
        deleteVacc() {
            hospitalSrv.deleteVacc(this.deleteContent).then(resp => {
                this.$message.success('删除成功')
                this.deleteDialog = false
                this.getVaccList()
            }, err => {
                this.$message.error(err.msg)
            })
        }
    },
};
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

<template>
    <div class="animated fadeIn content_page">
        <div class="content-title">
            <div class="title">预约日程管理</div>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-3 search-field">
                    <div style="left:-14px" class="label">预约开始日期：</div>
                    <el-date-picker size="large" v-model="appointDate" format="yyyy-MM-dd HH:mm:00" value-format="yyyy-MM-dd HH:mm:00" type="datetime" placeholder="选择日期时间">
                    </el-date-picker>
                </div>
                <div class="col-md-3 search-field">
                    <div class="label">预约医生：</div>
                    <el-select size="large" v-model="doctor" class="el-field-input" placeholder="请选择">
                        <el-option v-for="item in doctorList" :key="item.userId" :label="item.realname" :value="item.userId">
                        </el-option>
                    </el-select>
                </div>
                <div class="col-md-3 search-field">
                    <div class="label">预约号：</div>
                    <input type="text" v-model="appointNumber" class="form-control input-field" placeholder="请输入预约号" />
                </div>

                <div class="col-md-1 search-field search-field_controls">
                    <button @click="getAppointList(1)" class="btn btn-primary search-btn">搜索</button>
                </div>
                <div class="col-md-1 search-field search-field_controls">
                    <router-link class="btn btn-success" :to="'/hospital/addAppoint'">
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
                                <th>预约时间</th>
                                <th>预约医生</th>
                                <th>预约号</th>
                                <th>预约状态</th>
                                <th>预约描述</th>
                                <th>联系人</th>
                                <th>联系方式</th>
                                <th>备注</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in appointList" :key="item">
                                <td>{{item.appointDate}}</td>
                                <td>{{item.realname}}</td>
                                <td>{{item.appointNumber}}</td>
                                <td>{{convertStatus[item.appointStatus]}}</td>
                                <td>{{item.appointDesc}}</td>
                                <td>{{item.contacts}}</td>
                                <td>{{item.contactWay}}</td>
                                <td>{{item.remark}}</td>
                                <td>
                                    <!-- <router-link :to="{path: '/horse/updateTreatment',       
                                                                                                     query: { disable: 1,hospitalAppointId:item.hospitalAppointId}}"> 查看治疗</router-link>
                                    <router-link :to="'/horse/AddTreatment'">
                                        添加治疗
                                    </router-link> -->
                                    <router-link :to="{path:'/hospital/updateAppoint',query:{hospitalAppointId:item.hospitalAppointId}}">
                                        修改
                                    </router-link>
                                    <a @click="deleteInfo(item.hospitalAppointId)">删除</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="list-empty" v-show="appointList.length===0">
                        暂无数据
                    </div>
                    <div class="page">
                        <el-pagination @current-change="getAppointList" :current-page="currentPage" :page-size="pageRecorders" background layout="prev, pager, next" :total="totalRecorders">
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
                <el-button type="primary" @click="deleteAppoint">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { Pagination, DatePicker, Message } from "element-ui";
import hospitalSrv from '../../../services/hospital.service.js'
export default {
    data() {
        return {
            appointDate: '',
            doctor: '',
            appointNumber: '',
            deleteDialog: false,
            currentPage: 1,
            pageRecorders: 10,
            totalRecorders: 1,
            doctorList: [],
            deleteContent: {},
            showLoading: false,
            appointList: [],
            convertStatus: {
                "1": "已预约",
                "2": "已治疗",
                "3": "取消",
            }

        };
    },
    beforeRouteEnter: function(to, from, next) {
        next(vm => {
            vm.showLoading = true
            hospitalSrv.appointList(vm.currentPage, vm.pageRecorders, vm.appointDate, vm.doctor, vm.appointNumber).then(resp => {
                vm.showLoading = false
                vm.totalRecorders = resp.data.totalRecorders
                vm.appointList = resp.data.appointInfoList
            }, err => {
                vm.showLoading = false
                vm.$message.error(err.msg)

            })
            hospitalSrv.getDoctor().then((resp) => {
                vm.doctorList = resp.data.veterinarianList
            }, (err) => {
                vm.$message.error(err.msg)
            })

        })
    },
    methods: {
        getAppointList(currentPage = this.currentPage) {
            this.showLoading = true
            hospitalSrv.appointList(currentPage, this.pageRecorders, this.appointDate, this.doctor, this.appointNumber).then((resp) => {
                this.showLoading = false
                this.currentPage = currentPage
                this.totalRecorders = resp.data.totalRecorders
                this.appointList = resp.data.appointInfoList
            }, (err) => {
                this.showLoading = false
                this.$message.error(err.msg)
            })
        },
        deleteInfo(hospitalAppointId) {
            this.deleteDialog = true
            this.deleteContent.hospitalAppointId = hospitalAppointId
            this.deleteContent.deleteFlag = 1
        },
        deleteAppoint() {
            hospitalSrv.deleteAppoint(this.deleteContent).then(resp => {
                this.$message.success('删除成功')
                this.deleteDialog = false
                this.getAppointList()
            }, err => {
                this.$message.error(err.msg)
            })
        }
    },
    components: {
        "el-pagination": Pagination,
        "el-date-picker": DatePicker
    }
};
</script>

<style lang="scss" scoped>

</style>

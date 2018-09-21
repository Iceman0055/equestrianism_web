<template>
    <div class=" animated fadeIn content_page">
        <div class="content-title">
            <div class="title">诊疗室管理</div>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">诊疗室名称：</div>
                    <el-select size="large" v-model="name" class="el-field-input">
                        <el-option v-for="(item,index) in consultingRoomList" :key="index" :label="item.consultingRoomName" :value="item.consultingRoomId">
                        </el-option>
                    </el-select>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">诊疗室简称：</div>
                    <input type="text" v-model="shortName" class="form-control input-field" placeholder="请输入手术室简称" />
                </div>

                <div class="col-md-1 search-field search-field_controls">
                    <button @click="getOperateRoomList(1)" class="btn btn-primary search-btn">搜索</button>
                </div>
                <div class="col-md-1 search-field search-field_controls">
                    <router-link class="btn btn-success" :to="'/hospital/addOperateR'">
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
                                <th>诊疗室名称</th>
                                <th>诊疗室简称</th>
                                <th>状态</th>
                                <th>备注</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in operateRoomList" :key="index">
                                <td>{{item.name}}</td>
                                <td>{{item.shortName}}</td>
                                <td>{{convertStatus[item.status]}}</td>
                                <td>{{item.remark}}</td>
                                <td>
                                    <router-link :to="{path: '/hospital/addOperateR',       
                                                     query: { disable: 1,queryId:item.consultingRoomId}}"> 查看</router-link>
                                    <router-link :to="{path:'/hospital/addOperateR',query:{queryId:item.consultingRoomId}}">修改</router-link>
                                    <a @click="statusInfo(item.consultingRoomId,item.status)">{{convertStatus[1-item.status]}}</a>
                                    <a @click="deleteInfo(item.consultingRoomId)">删除</a>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                    <div class="list-empty" v-show="operateRoomList.length===0">
                        暂无数据
                    </div>
                    <div class="page">
                        <div class="total"> 总共 {{totalRecorders}} 条</div>
                        <el-pagination @current-change="getOperateRoomList" :current-page="currentPage" :page-size="pageRecorders" background layout="prev, pager, next" :total="totalRecorders">
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
                <el-button type="primary" @click="deleteOperateRoom">确 定</el-button>
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
import { Pagination, Message } from "element-ui";
import hospitalSrv from "../../../services/hospital.service.js";
export default {
    data() {
        return {
            statusDialog:false,
            deleteDialog: false,
            currentPage: 1,
            pageRecorders: 10,
            totalRecorders: 0,
            showLoading: false,
            name: "",
            shortName: "",
            operateRoomList: [],
            deleteContent: {},
            stopContent:{},
            convertStatus: {
                "1": "启用",
                "0": "停用"
            },
            consultingRoomList: []
        };
    },
    beforeRouteEnter: function(to, from, next) {
        next(vm => {
            vm.showLoading = true
            hospitalSrv
                .operateRoomList(
                vm.currentPage,
                vm.pageRecorders,
                vm.name,
                vm.shortName
                )
                .then(
                resp => {
                    vm.showLoading = false;
                    vm.totalRecorders = resp.data.totalRecorders;
                    vm.operateRoomList = resp.data.consultingRoomList;
                },
                err => {
                    vm.showLoading = false;
                    vm.$message.error(err.msg);
                }
                );
            hospitalSrv.getOperateRoomBox().then(
                resp => {
                    vm.consultingRoomList = resp.data.consultingRoomList;
                },
                err => {
                    vm.$message.error(err.msg);
                }
            );
        });
    },
    methods: {
        getOperateRoomList(currentPage = this.currentPage) {
            this.showLoading = true;
            hospitalSrv
                .operateRoomList(
                currentPage,
                this.pageRecorders,
                this.appointDate,
                this.doctor,
                this.appointNumber
                )
                .then(
                resp => {
                    this.showLoading = false;
                    this.currentPage = currentPage;
                    this.totalRecorders = resp.data.totalRecorders;
                    this.operateRoomList = resp.data.consultingRoomList;
                },
                err => {
                    this.showLoading = false;
                    this.$message.error(err.msg);
                }
                );
        },
        deleteInfo(consultingRoomId) {
            this.deleteDialog = true
            this.deleteContent.consultingRoomId = consultingRoomId
            this.deleteContent.deleteFlag = 1
        },
        deleteOperateRoom() {
            hospitalSrv.deleteOperateRoom(this.deleteContent).then(resp => {
                this.$message.success('删除成功')
                this.deleteDialog = false
                this.getOperateRoomList()
            }, err => {
                this.$message.error(err.msg)
            })
        },
         statusInfo(consultingRoomId, status) {
            this.statusDialog = true
            this.stopContent.consultingRoomId = consultingRoomId
            this.stopContent.status = 1 - status
        },
        statusManage() {
            hospitalSrv.deleteOperateRoom(this.stopContent).then((resp) => {
                this.$message.success('修改状态成功')
                this.statusDialog = false
                this.getOperateRoomList()
            }, (err) => {
                this.$message.error(err.msg)
            })
        },
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

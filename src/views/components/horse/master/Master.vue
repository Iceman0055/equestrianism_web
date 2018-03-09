<template>
    <div class="animated fadeIn content_page">
        <div class="content-title">
            <div class="title">马主信息</div>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-3 search-field">
                    <div class="label">姓名：</div>
                    <input type="text" v-model="hostName" class="form-control input-field" placeholder="请输入姓名" />
                </div>
                <div class="col-md-3 search-field">
                    <div class="label">联系方式：</div>
                    <input type="text" v-model="contactWay" class="form-control input-field" placeholder="请输入联系方式" />
                </div>

                <div class="col-md-1 search-field search-field_controls">
                    <button @click="getMasterList(1)" class="btn btn-primary search-btn">搜索</button>
                </div>
                <div class="col-md-1 search-field search-field_controls">
                    <router-link class="btn btn-success" :to="'/horse/addMaster'">
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
                                <th>马主姓名</th>
                                <th>性别</th>
                                <th>联系方式</th>
                                <th>职业</th>
                                <th>住址</th>
                                <th>马匹名称</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in masterList" :key="item">
                                <td>{{item.hostName}}</td>
                                <td>{{convertSex[item.sex]}}</td>
                                <td>{{item.contactWay}}</td>
                                <td>{{item.occupation}}</td>
                                <td>{{item.address}}</td>
                                <td>{{item.horseName}}</td>
                                <td>
                                    <router-link :to="{path: '/horse/updateMaster',       
                                                                           query: { disable: 1,hostId:item.hostId}}"> 查看</router-link>
                                    <router-link :to="{path:'/horse/updateMaster',query:{hostId:item.hostId}}">修改</router-link>
                                    <a @click="deleteInfo(item.hostId)">删除</a>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                    <div class="list-empty" v-show="masterList.length===0">
                        暂无数据
                    </div>
                    <div class="page">
                        <el-pagination @current-change="getMasterList" :current-page="currentPage" :page-size="pageRecorders" background layout="prev, pager, next" :total="totalRecorders">
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
                <el-button type="primary" @click="deleteHost">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { Pagination, Message } from 'element-ui'
import horseSrv from '../../../services/horse.service.js'
import systemSrv from '../../../services/system.service.js'
export default {
    data() {
        return {
            deleteDialog: false,
            hostName: '',
            contactWay: '',
            currentPage: 1,
            pageRecorders: 10,
            totalRecorders: 1,
            showLoading: false,
            masterList: [],
            convertSex: {},
            deleteContent: {},
            dictInfoList: []
        }
    },
    beforeRouteEnter: function(to, from, next) {
        next(vm => {
            vm.showLoading = true
            systemSrv.dictionary().then(resp => {
                vm.dictInfoList = systemSrv.formatDic(resp.data.dictionaryInfoList);
                vm.convertSex = vm.dictInfoList.SEX
                return horseSrv.masterList(vm.currentPage, vm.pageRecorders, vm.hostName,vm.contactWay)
            }).then(resp => {
                vm.showLoading = false
                vm.totalRecorders = resp.data.totalRecorders
                vm.masterList = resp.data.hostInfoList
            }).catch(err => {
                vm.showLoading = false
                vm.$message.error(err.msg)
            })

        })
    },
    methods: {
        getMasterList(currentPage = this.currentPage) {
            this.showLoading = true
            horseSrv.masterList(currentPage, this.pageRecorders, this.hostName,this.contactWay).then((resp) => {
                this.showLoading = false
                this.currentPage = currentPage
                this.totalRecorders = resp.data.totalRecorders
                this.masterList = resp.data.hostInfoList
            }, (err) => {
                this.showLoading = false
                this.$message.error(err.msg)
            })
        },
        deleteInfo(hostId) {
            this.deleteDialog = true
            this.deleteContent.hostId = hostId
            this.deleteContent.deleteFlag = 1
        },
        deleteHost() {
            horseSrv.deleteMaster(this.deleteContent).then(resp => {
                this.$message.success('删除成功')
                this.deleteDialog = false
                this.getMasterList()
            }, err => {
                this.$message.error(err.msg)
            })
        }
    },
    components: {
        'el-pagination': Pagination,
    }
}
</script>

<style lang="scss" scoped>

</style>

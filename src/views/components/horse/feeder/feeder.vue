<template>
    <div class="content_page animated fadeIn">
        <div class="content-title">
            <div class="title">饲养员信息</div>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">姓名：</div>
                    <input type="text" v-model="feederName" class="form-control input-field" placeholder="请输入姓名" />
                </div>
                <div class="col-md-1 search-field search-field_controls">
                    <button @click="getFeederList(1)" class="btn btn-primary search-btn">搜索</button>
                </div>
                <div class="col-md-1 search-field search-field_controls">
                    <router-link class="btn btn-success" :to="'/horse/addFeeder'">
                        新增
                    </router-link>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <table class="table table-bordered table-striped table-sm">
                        <thead>
                            <tr>
                                <th>姓名</th>
                                <th>性别</th>
                                <th>身份证照片</th>
                                <th>职能描述</th>
                                <th>匹配马匹</th>
                                <th>入职时间</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in feederList" :key="item">
                                <td>{{item.feederName}}</td>
                                <td>{{convertSex[item.sex]}}</td>
                                <td>
                                    <a @click="watchImage(item.idCardImage)">查看</a>
                                </td>
                                <td>{{item.skillDesc}}</td>
                                <td>{{item.horseName}}</td>
                                <td>{{item.hireDate}}</td>
                                <td>
                                    <router-link :to="{path: '/horse/updateFeeder',       
                                                     query: { disable: 1,feederId:item.feederId}}"> 查看</router-link>
                                    <router-link :to="{path:'/horse/updateFeeder',query:{feederId:item.feederId}}">修改</router-link>
                                    <a @click="deleteInfo(item.feederId)">删除</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="list-empty" v-show="feederList.length===0">
                        暂无数据
                    </div>
                    <div class="page">
                        <el-pagination @current-change="getFeederList" :current-page="currentPage" :page-size="pageRecorders" background layout="prev, pager, next" :total="totalRecorders">
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
                <el-button type="primary" @click="deleteFeeder">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="查看" :modal-append-to-body="false" :visible.sync="imageDialog" width="30%" center>
            <div class="text-center showImage">
                <img :src="imageInfo">
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="imageDialog = false">确 定</el-button>
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
            imageInfo: '',
            imageDialog: false,
            deleteDialog: false,
            feederName: '',
            currentPage: 1,
            totalRecorders: 1,
            pageRecorders: 10,
            showLoading: false,
            feederList: [],
            convertSex: {},
            deleteContent: {}
        }
    },
    beforeRouteEnter: function(to, from, next) {
        next(vm => {
            vm.showLoading = true
            systemSrv.dictionary().then(resp => {
                vm.dictInfoList = systemSrv.formatDic(resp.data.dictionaryInfoList);
                vm.convertSex = vm.dictInfoList.SEX
                if (to.query.feederName) {
                    vm.feederName = to.query.feederName
                    return horseSrv.feederList(vm.currentPage, vm.pageRecorders, vm.feederName)
                } else {
                    return horseSrv.feederList(vm.currentPage, vm.pageRecorders, vm.feederName)
                }
            }).then(resp => {
                vm.showLoading = false
                vm.totalRecorders = resp.data.totalRecorders
                vm.feederList = resp.data.feederInfoList
            }).catch(err => {
                vm.showLoading = false
                vm.$message.error(err.msg)
            })

        })
    },
    methods: {
        getFeederList(currentPage = this.currentPage) {
            this.showLoading = true
            horseSrv.feederList(currentPage, this.pageRecorders, this.feederName).then((resp) => {
                this.showLoading = false
                this.currentPage = currentPage
                this.totalRecorders = resp.data.totalRecorders
                this.feederList = resp.data.feederInfoList
            }, (err) => {
                this.showLoading = false
                this.$message.error(err.msg)
            })
        },
        deleteInfo(feederId) {
            this.deleteDialog = true
            this.deleteContent.feederId = feederId
            this.deleteContent.deleteFlag = 1
        },
        deleteFeeder() {
            horseSrv.deleteFeeder(this.deleteContent).then(resp => {
                this.$message.success('删除成功')
                this.deleteDialog = false
                this.getFeederList()
            }, err => {
                this.$message.error(err.msg)
            })
        },
        watchImage(image) {
            this.imageDialog = true
            this.imageInfo = `data:image/jpeg;base64,${image}`
        }
    },
    components: {
        'el-pagination': Pagination,
    }
}
</script>

<style lang="scss" scoped>
.showImage {
    width: 100%; // border:1px solid #ddd;
}
</style>

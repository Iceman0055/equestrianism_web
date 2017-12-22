<template>
    <div class="animated fadeIn content_page">
        <div class="content-title">
            <div class="title">治疗日程管理</div>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">治疗名称：</div>
                    <input type="text" class="form-control input-field" placeholder="请输入治疗名称" />
                </div>
                <div class="col-md-1 search-field search-field_controls">
                    <button class="btn btn-primary search-btn">搜索</button>
                </div>
                <div class="col-md-1 search-field search-field_controls">
                    <router-link class="btn btn-success" :to="'/hospital/addTreat'">
                        新增
                    </router-link>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <table class="table table-bordered table-striped table-sm">
                        <thead>
                            <tr>
                                <th>治疗时间</th>
                                <th>治疗名称</th>
                                <th>治疗概述</th>
                                <th>手术室使用</th>
                                <th>固定资产使用</th>
                                <th>消耗品使用</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>2016-11-09 9:00</td>
                                <td>治疗马</td>
                                <td>胃疼</td>
                                <td>一号手术室</td>
                                <td>无</td>
                                <td>无</td>
                                <td>
                                    <a @click="uploadDialog=true">添加病历</a>
                                    <router-link :to="{path: '/hospital/updateTreat',       
                                                                                         query: { disable: 'true',}}"> 查看</router-link>
                                    <router-link :to="'/hospital/updateTreat'">
                                        更新
                                    </router-link>
                                </td>
                            </tr>
                            <tr>
                                <td>2016-11-09 9:00</td>
                                <td>治疗马</td>
                                <td>胃疼</td>
                                <td>一号手术室</td>
                                <td>无</td>
                                <td>无</td>
                                <td>
                                    <a @click="uploadDialog=true">添加病历</a>
                                    <router-link :to="{path: '/hospital/updateTreat',       
                                                                                         query: { disable: 'true',}}"> 查看</router-link>
                                    <router-link :to="'/hospital/updateTreat'">
                                        更新
                                    </router-link>
                                </td>
                            </tr>
                            <tr>
                                <td>2016-11-09 9:00</td>
                                <td>治疗马</td>
                                <td>胃疼</td>
                                <td>一号手术室</td>
                                <td>无</td>
                                <td>无</td>
                                <td>
                                    <a @click="uploadDialog=true">添加病历</a>
                                    <router-link :to="{path: '/hospital/updateTreat',       
                                                                                         query: { disable: 'true',}}"> 查看</router-link>
                                    <router-link :to="'/hospital/updateTreat'">
                                        更新
                                    </router-link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <!-- <div class="list-empty" ng-show="content.orderList.length===0">
                                                                                        没有可以显示的订单
                                                                                    </div> -->
                    <div class="page">

                        <el-pagination background layout="prev, pager, next" :total="1000">
                        </el-pagination>
                    </div>
                    <!-- 添加病历 -->
                    <el-dialog title="添加病历" :modal="false" :visible.sync="uploadDialog" width="50%" center>
                        <div class="content-show text-center">
                            <div class="row mb-1 list-search">
                                <div class="col-md-4 search-field">
                                    <div class="label">时间：</div>
                                    <el-date-picker size="large" v-model="value" type="datetime" placeholder="选择日期时间">
                                    </el-date-picker>
                                </div>
                                <div class="col-md-4 search-field">
                                    <div class="label">地点：</div>
                                    <input type="text" class="form-control input-field" placeholder="请输入地点" />
                                </div>
                                <div class="col-md-4 search-field">
                                    <div class="label">临诊：</div>
                                    <input type="text" class="form-control input-field" placeholder="请输入临诊" />
                                </div>
                            </div>
                            <div class="row mb-1 list-search">
                                <div class="col-md-4 search-field">
                                    <div class="label">初诊：</div>
                                    <input type="text" class="form-control input-field" placeholder="请输入初诊" />
                                </div>
                                <div class="col-md-4 search-field">
                                    <div class="label">处方用药：</div>
                                    <input type="text" class="form-control input-field" placeholder="请输入处方用药" />
                                </div>
                                <div class="col-md-4 search-field">
                                    <div class="label">医嘱：</div>
                                    <input type="text" class="form-control input-field" placeholder="请输入医嘱" />
                                </div>
                            </div>
                            <div class="row mb-1 list-search">
                                <div class="col-md-4 search-field">
                                    <div class="label">标题标签：</div>
                                    <input type="text" class="form-control input-field" placeholder="请输入标题标签" />
                                </div>
                                <div class="col-md-4 search-field">
                                    <div class="label">备注：</div>
                                    <input type="text" class="form-control input-field" placeholder="请输入备注" />
                                </div>
                            </div>
                            <div class="row mb-1 list-search">
                                <div class="col-md-4 search-field">
                                    <div class="label">x光照片：</div>
                                    <el-upload class="avatar-uploader" action="" :auto-upload="false" :on-change="submitFile" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                    </el-upload>
                                </div>
                                <div class="col-md-4 search-field">
                                    <div class="label">数据照片：</div>
                                    <el-upload class="avatar-uploader" action="" :auto-upload="false" :on-change="submitFile" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                                        <img v-if="imageUrl1" :src="imageUrl1" class="avatar">
                                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                    </el-upload>
                                </div>

                            </div>
                        </div>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="uploadDialog = false">取 消</el-button>
                            <el-button type="primary" @click="uploadDialog = false">确 定</el-button>
                        </span>
                    </el-dialog>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Pagination, Upload, DatePicker } from 'element-ui'
/* eslint-disable */
export default {
    data() {
        return {
            value: '',
            uploadDialog: false,
            currentPage: 1,
            imageUrl: '',
            // imageUrl1:''
        }
    },
    components: {
        'el-pagination': Pagination,
        'el-upload': Upload,
        'el-date-picker': DatePicker
    },
    methods: {
        open() {
            this.$message.success('修改成功')
        },
        preview(file) {
            var fr = new FileReader()
            fr.onloadend = () => {
                this.imageUrl = fr.result;
            }
            fr.readAsDataURL(file.raw)
        },
        submitFile(file, fileList) {
            var formData = new FormData(); //调用接口上传data:formData
            formData.append('file', file.raw);
            this.preview(file);
        },
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        }
    }
}
</script>

<style lang="scss" scoped>
.fieldInput {
    width: 90%;
}
</style>

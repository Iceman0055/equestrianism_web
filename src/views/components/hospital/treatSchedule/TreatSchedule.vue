<template>
    <div class="animated fadeIn content_page">
        <div class="content-title">
            <div class="title">门诊治疗管理</div>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">治疗名称：</div>
                    <input type="text" v-model="treatName" class="form-control input-field" placeholder="请输入治疗名称" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">马匹名称：</div>
                    <el-select size="large" filterable v-model="searchHorseId" class="el-field-input" placeholder="请选择马匹名称">
                        <el-option v-for="(item,index) in horseInfoName" :key="index" :label="item.horseName" :value="item.horseId">
                        </el-option>
                    </el-select>
                </div>
                <div class="col-md-1 search-field search-field_controls">
                    <button @click="getTreatList(1)" class="btn btn-primary search-btn">搜索</button>
                </div>
                <div class="col-md-1 search-field search-field_controls">
                    <router-link class="btn btn-success" :to="'/hospital/addTreat'">
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
                                    <a v-if="!item.treatmentCaseId" @click="showTreatCase(item.treatmentId,item.treatmentCaseId)">添加病历</a>
                                    <a v-if="item.treatmentCaseId" @click="getTreatCaseDetail(item.treatmentCaseId,item.treatmentId)">修改病历</a>
                                    <router-link :to="{path: '/hospital/updateTreat',       
                                                                                                                                                                                                                                     query: { disable:1,treatmentId:item.treatmentId}}"> 查看</router-link>
                                    <router-link :to="{path:'/hospital/updateTreat',query:{treatmentId:item.treatmentId}}">
                                        修改
                                    </router-link>
                                    <a @click="deleteInfo(item.treatmentId)">删除</a>
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
                    <!-- 添加病历 -->
                    <el-dialog title="添加病历" :modal-append-to-body="false" :visible.sync="addDialog" width="60%" center>
                        <div class="content-show">
                            <div class="row mb-1 list-search">
                                <div class="col-md-4 search-field">
                                    <div class="label">时间：</div>
                                    <el-date-picker size="large" format="yyyy-MM-dd HH:mm:00" value-format="yyyy-MM-dd HH:mm:00" v-model="operatorDate" type="datetime" placeholder="选择日期时间">
                                    </el-date-picker>
                                </div>
                                <div class="col-md-4 search-field">
                                    <div class="label">地点：</div>
                                    <input type="text" v-model="address" class="form-control input-field" placeholder="请输入地点" />
                                </div>
                                <div class="col-md-4 search-field">
                                    <div class="label">标题标签：</div>
                                    <input type="text" v-model="titleTag" class="form-control input-field" placeholder="请输入标题标签" />
                                </div>
                            </div>
                            <div class="row mb-1 list-search">
                                <div class="col-md-12 search-field">
                                    <div class="label">临诊：</div>
                                    <el-input type="text" :rows="3" :col="2" v-model="clinical" placeholder="请输入临诊"></el-input>
                                </div>
                            </div>
                            <div class="row mb-1 list-search">
                                <div class="col-md-12 search-field">
                                    <div class="label">初诊：</div>
                                    <el-input type="text" :rows="3" :col="2" v-model="firstVisit" placeholder="请输入初诊"></el-input>
                                </div>
                            </div>
                            <div class="row mb-1 list-search">
                                <div class="col-md-12 search-field">
                                    <div class="label">医嘱：</div>
                                    <el-input type="text" :rows="3" :col="2" v-model="advice" placeholder="请输入医嘱"></el-input>
                                </div>
                            </div>
                            <div class="row mb-1 list-search">
                                <div class="col-md-12 search-field">
                                    <div class="label">备注：</div>
                                    <el-input type="text" :rows="3" :col="2" v-model="remark" placeholder="请输入备注"></el-input>
                                </div>
                            </div>
                            <div class="row mb-1 list-search">
                                <div class="col-md-12 search-field">
                                    <div class="label">x光照片：</div>
                                    <el-upload list-type="picture-card" :name="'photo'" :data="{photoType: 1}" :file-list="xrayList" :action="'/equestrianismApi/treatmentCasePhoto/add'" :on-success="successXRay" :on-remove="removeXRay">
                                        <i class="el-icon-plus"></i>
                                    </el-upload>
                                </div>
                            </div>
                            <div class="row mb-1 list-search">
                                <div class="col-md-12 search-field">
                                    <div class="label">数据照片：</div>
                                    <el-upload list-type="picture-card" :name="'photo'" :data="{photoType: 2}" :file-list="dataList" :action="'/equestrianismApi/treatmentCasePhoto/add'" :on-success="successData" :on-remove="removeData">
                                        <i class="el-icon-plus"></i>
                                    </el-upload>
                                </div>
                            </div>
                        </div>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="addDialog = false">取 消</el-button>
                            <el-button type="primary" @click="addTreatCase">确 定</el-button>
                        </span>
                    </el-dialog>
                    <el-dialog title="修改病历" :modal-append-to-body="false" :visible.sync="updateDialog" width="60%" center>
                        <div class="content-show">
                            <div class="row mb-1 list-search">
                                <div class="col-md-4 search-field">
                                    <div class="label">时间：</div>
                                    <el-date-picker size="large" format="yyyy-MM-dd HH:mm:00" value-format="yyyy-MM-dd HH:mm:00" v-model="operatorDate" type="datetime" placeholder="选择日期时间">
                                    </el-date-picker>
                                </div>
                                <div class="col-md-4 search-field">
                                    <div class="label">地点：</div>
                                    <input type="text" v-model="address" class="form-control input-field" placeholder="请输入地点" />
                                </div>
                                <div class="col-md-4 search-field">
                                    <div class="label">标题标签：</div>
                                    <input type="text" v-model="titleTag" class="form-control input-field" placeholder="请输入标题标签" />
                                </div>
                            </div>
                            <div class="row mb-1 list-search">
                                <div class="col-md-12 search-field">
                                    <div class="label">临诊：</div>
                                    <el-input type="textarea" :rows="3" :cols="2" v-model="clinical"></el-input>
                                </div>
                            </div>
                            <div class="row mb-1 list-search">
                                <div class="col-md-12 search-field">
                                    <div class="label">初诊：</div>
                                    <el-input type="textarea" :rows="3" :cols="2" v-model="firstVisit"></el-input>
                                </div>
                            </div>
                            <div class="row mb-1 list-search">
                                <div class="col-md-12 search-field">
                                    <div class="label">医嘱：</div>
                                    <el-input type="textarea" :rows="3" :cols="2" v-model="advice"></el-input>
                                </div>
                            </div>
                            <div class="row mb-1 list-search">
                                <div class="col-md-12 search-field">
                                    <div class="label">备注：</div>
                                    <el-input type="textarea" :rows="3" :cols="2" v-model="remark"></el-input>
                                </div>
                            </div>
                            <div class="row mb-1 list-search">
                            </div>
                            <div class="row mb-1 list-search">
                                <div class="col-md-12 search-field">
                                    <div class="label">x光照片：</div>
                                    <el-upload list-type="picture-card" :on-preview="previewImage" :name="'photo'" :data="{photoType: 1}" :file-list="xrayList" :action="'/equestrianismApi/treatmentCasePhoto/add'" :on-success="successXRay" :on-remove="removeXRay">
                                        <i class="el-icon-plus"></i>
                                    </el-upload>
                                </div>
                            </div>
                            <div class="row mb-1 list-search">
                                <div class="col-md-12 search-field">
                                    <div class="label">数据照片：</div>
                                    <el-upload list-type="picture-card" :on-preview="previewImage" :name="'photo'" :data="{photoType: 2}" :file-list="dataList" :action="'/equestrianismApi/treatmentCasePhoto/add'" :on-success="successData" :on-remove="removeData">
                                        <i class="el-icon-plus"></i>
                                    </el-upload>
                                </div>
                            </div>
                        </div>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="updateDialog = false">取 消</el-button>
                            <el-button type="primary" @click="updateTreatCaseFun">确 定</el-button>
                        </span>
                    </el-dialog>
                </div>

            </div>
        </div>
        <!-- 固定资产  -->
        <el-dialog title="设备使用详情" :modal-append-to-body="false" :visible.sync="assetsDialog" width="22%" center>
            <div class="text-center">
                <div class="row" v-for="(item,index) in assetList" :key="index">
                    <div class="col-md-7">名称：{{item.assetName}}</div>
                    <div class="col-md-5">数量：{{item.count}}</div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer text-center">
                <!-- <el-button @click="assetsDialog = false">取 消</el-button> -->
                <el-button type="primary" @click="assetsDialog = false">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 显示消耗品 -->
        <el-dialog title="消耗品使用详情" :modal-append-to-body="false" :visible.sync="consumeDialog" width="22%" center>
            <div class="text-center">
                <div class="row" v-for="(item,index) in consumeList" :key="index">
                    <div class="col-md-7">名称：{{item.assetName}}</div>
                    <div class="col-md-5">数量：{{item.count}}</div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer text-center">
                <!-- <el-button @click="consumeDialog = false">取 消</el-button> -->
                <el-button type="primary" @click="consumeDialog = false">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="删除" :modal-append-to-body="false" :visible.sync="deleteDialog" width="20%" center>
            <div class="text-center">
                <span>确定要删除吗?</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="deleteDialog = false">取 消</el-button>
                <el-button type="primary" @click="deleteTreat">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="查看图片" :modal-append-to-body="false" :visible.sync="dialogVisible" center>
            <div class="text-center">
                <img width="60%" :src="imageUrl" alt="">
            </div>
        </el-dialog>
    </div>
</template>

<script>
import Vue from "vue";
import { Pagination, Upload, DatePicker, Message, Select, Input } from "element-ui";
import UploadImg from "../../../../components/uploadImg/uploadImg.vue";
import hospitalSrv from "../../../services/hospital.service.js";
import horseSrv from "../../../services/horse.service.js";
const PHOTO_TYPE = {
    XRAY: 1,
    DATA: 2,
};
const PHOTO_TYPE_MAP = {
    1: 'xrayList',
    2: 'dataList',
};
export default {
    data() {
        return {
            dialogVisible: false,
            imageUrl: '',
            updateTreatCaseId: '',
            updateTreatId: '',
            xrayList: [],
            dataList: [],
            casePhotoList: [[], [], []],
            treatmentId: '',
            treatmentCaseId: '',
            searchHorseId: '',
            photo: '',
            advice: "",
            files: {},
            titleTag: "",
            remark: "",
            address: "",
            firstVisit: "",
            clinical: "",
            assetList: [],
            consumeList: [],
            xRayImg: "",
            dataImg: "",
            consumeDialog: false,
            assetsDialog: false,
            operatorDate: "",
            addDialog: false,
            updateDialog: false,
            imageUrl: "",
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
    components: {
        "upload-img": UploadImg,
    },
    beforeRouteEnter: function(to, from, next) {
        next(vm => {
            vm.showLoading = true;
            hospitalSrv.treatList(vm.currentPage, vm.pageRecorders, vm.treatName, vm.searchHorseId)
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
        getImageList(treatmentCaseId, photoType) {
            hospitalSrv.getImageList(treatmentCaseId, photoType).then(resp => {
                this[PHOTO_TYPE_MAP[photoType]] = resp.data.casePhotoList.map(photo => ({
                    url: `data:image/jpeg;base64,${photo.photo}`,
                    name: photo.casePhotoId,
                }));
            }, err => {
                this.$message.error(err.msg);
            })
        },
        successXRay(response, file) {
            Vue.set(this.xrayList, this.xrayList.length, Object.assign(file, {
                name: response.data.casePhotoId,
            }));
        },
        successData(response, file) {
            Vue.set(this.dataList, this.dataList.length, Object.assign(file, {
                name: response.data.casePhotoId,
            }));
        },
        previewImage(file) {
            this.imageUrl = file.url;
            this.dialogVisible = true;
        },
        removeXRay(response, file) {
            hospitalSrv.deleteImage(response.name).then(resp => {
                this.xrayList = file.filter(_file => file.name !== _file.name);
                this.$message.success('删除成功');
                this.getTreatList();
            }, err => {
                this.$message.error(err.msg);
            })
        },
        removeData(response, file) {
            hospitalSrv.deleteImage(file.name).then(resp => {
                this.dataList = file.filter(_file => file.name !== _file.name);
                this.$message.success('删除成功');
                this.getTreatList();
            }, err => {
                this.$message.error(err.msg);
            })
        },
        showTreatCase(treatmentId, treatmentCaseId) {
            this.addDialog = true;
            this.treatmentId = treatmentId
            this.treatmentCaseId = treatmentCaseId
        },
        addTreatCase() {
            if (!(
                this.operatorDate &&
                this.address &&
                this.clinical &&
                this.firstVisit &&
                this.advice &&
                this.titleTag &&
                this.remark
            )) {
                this.$message.error("病历信息不能为空");
                return;
            }
            let treatCase = {
                treatmentId: this.treatmentId,
                operatorDate: this.operatorDate,
                place: this.address,
                clinical: this.clinical,
                firstVisit: this.firstVisit,
                advice: this.advice,
                titleTag: this.titleTag,
                remark: this.remark,
                photoList: this.xrayList.concat(this.dataList).map(file => file.name)
            };
            hospitalSrv.addTreatCase(treatCase).then(
                resp => {
                    this.addDialog = false;
                    this.$message.success("添加病历信息成功");
                    this.$router.push("/hospital/treatSchedule");
                    this.getTreatList();
                },
                err => {
                    this.$message.error(err.msg);
                }
            );
        },
        getTreatCaseDetail(treatmentCaseId, treatmentId) {
            this.updateTreatCaseId = treatmentCaseId
            this.updateTreatId = treatmentId
            this.getImageList(treatmentCaseId, PHOTO_TYPE.XRAY);
            this.getImageList(treatmentCaseId, PHOTO_TYPE.DATA);
            hospitalSrv.getTreatCaseDetail(treatmentCaseId).then(resp => {
                this.updateDialog = true
                this.advice = resp.data.advice
                this.clinical = resp.data.clinical
                this.firstVisit = resp.data.firstVisit
                this.horseType = resp.data.horseType
                if (this.horseType == 1) {
                    this.horseName = resp.data.horseId
                } else {
                    this.horseName = resp.data.horseName
                }
                this.operatorDate = resp.data.operatorDate
                this.address = resp.data.place
                this.remark = resp.data.remark
                this.titleTag = resp.data.titleTag

            }, err => {
                this.$message.error(err.msg);
            })
        },
        updateTreatCaseFun() {
            if (!(
                this.operatorDate &&
                this.address &&
                this.clinical &&
                this.firstVisit &&
                this.advice &&
                this.titleTag &&
                this.remark
            )
            ) {
                this.$message.error("病历信息不能为空");
                return;
            }
            let updateTreatCase = {
                treatmentId: this.updateTreatId,
                treatmentCaseId: this.updateTreatCaseId,
                operatorDate: this.operatorDate,
                place: this.address,
                clinical: this.clinical,
                firstVisit: this.firstVisit,
                advice: this.advice,
                titleTag: this.titleTag,
                remark: this.remark,
                photoList: this.xrayList.concat(this.dataList).map(file => file.name)
            };
            hospitalSrv.updateTreatCase(updateTreatCase).then(
                resp => {
                    this.updateDialog = false;
                    this.$message.success("修改病历信息成功");
                    this.getTreatList();
                },
                err => {
                    this.$message.error(err.msg);
                }
            );
        },

        watchAssetsDetail(treatmentId) {
            this.assetsDialog = true;
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
            this.consumeDialog = true;
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
                .treatList(
                currentPage,
                this.pageRecorders,
                this.treatName,
                this.searchHorseId
                )
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
        deleteInfo(treatmentId) {
            this.deleteDialog = true;
            this.deleteContent.treatmentId = treatmentId;
            this.deleteContent.deleteFlag = 1;
        },
        deleteTreat() {
            hospitalSrv.deleteTreat(this.deleteContent).then(
                resp => {
                    this.$message.success("删除成功");
                    this.deleteDialog = false;
                    this.getTreatList();
                },
                err => {
                    this.$message.error(err.msg);
                }
            );
        }
    }
};
</script>

<style lang="scss" scoped>
.fieldInput {
    width: 90%;
}
</style>

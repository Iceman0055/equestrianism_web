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
                    <el-select size="large" filterable v-model="horseName" class="el-field-input" placeholder="请选择马匹名称">
                        <el-option v-for="item in horseInfoName" :key="item.horseId" :label="item.horseName" :value="item.horseId">
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
                            <tr v-for="item in treatmentList" :key="item">
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
                                    <a v-if="item.treatmentCaseId" @click="getTreatCaseDetail(item.treatmentCaseId)">修改病历</a>
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
                        <div class="content-show text-center">
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
                                    <div class="label">临诊：</div>
                                    <input type="text" v-model="clinical" class="form-control input-field" placeholder="请输入临诊" />
                                </div>
                            </div>
                            <div class="row mb-1 list-search">
                                <div class="col-md-4 search-field">
                                    <div class="label">初诊：</div>
                                    <input type="text" v-model="firstVisit" class="form-control input-field" placeholder="请输入初诊" />
                                </div>
                                <div class="col-md-4 search-field">
                                    <div class="label">医嘱：</div>
                                    <input type="text" v-model="advice" class="form-control input-field" placeholder="请输入医嘱" />
                                </div>
                                <div class="col-md-4 search-field">
                                    <div class="label">标题标签：</div>
                                    <input type="text" v-model="titleTag" class="form-control input-field" placeholder="请输入标题标签" />
                                </div>
                            </div>
                            <div class="row mb-1 list-search">
                                <div class="col-md-4 search-field">
                                    <div class="label">备注：</div>
                                    <input type="text" v-model="remark" class="form-control input-field" placeholder="请输入备注" />
                                </div>
                            </div>
                            <div class="row mb-1 list-search">
                                <div class="col-md-4 search-field">
                                    <div class="label">x光照片：</div>
                                    <multiple-img :name="'photo'" :data="{photoType:1}" v-on:successFile="successXRay" v-on:removeFile="removeXRay" :action="'/equestrianismApi/treatmentCasePhoto/add'" :imageUrl="xRayImg">
                                    </multiple-img>
                                </div>

                                <div class="col-md-4 search-field">
                                    <div class="label">数据照片：</div>
                                    <multiple-img :name="'photo'" :data="{photoType:2}" v-on:successFile="successData" v-on:removeFile="removeData" :action="'/equestrianismApi/treatmentCasePhoto/add'" :imageUrl="dataImg">
                                    </multiple-img>
                                </div>
                            </div>
                        </div>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="addDialog = false">取 消</el-button>
                            <el-button type="primary" @click="addTreatCase">确 定</el-button>
                        </span>
                    </el-dialog>
                    <el-dialog title="修改病历" :modal-append-to-body="false" :visible.sync="updateDialog" width="60%" center>
                        <div class="content-show text-center">
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
                                    <div class="label">临诊：</div>
                                    <input type="text" v-model="clinical" class="form-control input-field" placeholder="请输入临诊" />
                                </div>
                            </div>
                            <div class="row mb-1 list-search">
                                <div class="col-md-4 search-field">
                                    <div class="label">初诊：</div>
                                    <input type="text" v-model="firstVisit" class="form-control input-field" placeholder="请输入初诊" />
                                </div>
                                <div class="col-md-4 search-field">
                                    <div class="label">医嘱：</div>
                                    <input type="text" v-model="advice" class="form-control input-field" placeholder="请输入医嘱" />
                                </div>
                                <div class="col-md-4 search-field">
                                    <div class="label">标题标签：</div>
                                    <input type="text" v-model="titleTag" class="form-control input-field" placeholder="请输入标题标签" />
                                </div>
                            </div>
                            <div class="row mb-1 list-search">
                                <div class="col-md-4 search-field">
                                    <div class="label">备注：</div>
                                    <input type="text" v-model="remark" class="form-control input-field" placeholder="请输入备注" />
                                </div>
                            </div>
                            <div class="row mb-1 list-search">
                                <div class="col-md-4 search-field">
                                    <div class="label">x光照片：</div>
                                    <el-upload
                                        list-type="picture-card"
                                        :name="'photo'"
                                        :data="{photoType: 1}"
                                        :file-list="xrayList"
                                        :action="'/equestrianismApi/treatmentCasePhoto/add'"
                                        :on-success="successXRay"
                                        :on-remove="removeXRay"
                                    ><i class="el-icon-plus"></i>
                                    </el-upload>
                                </div>
                                <div class="col-md-4 search-field">
                                    <div class="label">数据照片：</div>
                                    <el-upload></el-upload>
                                    <!-- <multiple-img :name="'photo'" :data="{photoType:2}" v-on:successFile="successData" v-on:removeFile="removeData" :action="'/equestrianismApi/treatmentCasePhoto/add'" :imageUrl="dataImg" v-model="dataImg">
                                    </multiple-img> -->
                                    <!-- <multiple-img name='photo' :action="'/equestrianismApi/treatmentCasePhoho/addXRay'" :imageUrl="dataImg" v-on:successFile="successFile" v-on:removeFile="removeFile"></multiple-img> -->
                                    <!-- </multiple-img> <multiple-img v-on:successFile="successFile" :useDisabled="useDisabled" v-on:removeFile="removeFile" :imageUrl="dataImg">
                                                                                                    </multiple-img> -->
                                </div>
                            </div>
                        </div>
                        <!-- <div class="row mb-1 list-search">
                                                                                                                
                                                                                                        </div> -->
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="updateDialog = false">取 消</el-button>
                            <el-button type="primary" @click="updateTreatCase">确 定</el-button>
                        </span>
                    </el-dialog>
                </div>
            </div>
        </div>
        <!-- 固定资产  -->
        <el-dialog title="提示" :modal-append-to-body="false" :visible.sync="assetsDialog" width="22%" center>
            <div class="text-center">
                <div class="row" v-for="item in assetList" :key="item">
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
                <div class="row" v-for="item in consumeList" :key="item">
                    <div class="col-md-7">名称：{{item.assetName}}</div>
                    <div class="col-md-5">数量：{{item.count}}</div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="consumeDialog = false">取 消</el-button>
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
    </div>
</template>

<script>
import { Pagination, Upload, DatePicker, Message, Select } from "element-ui";
import MultipleImg from "../../../../components/uploadImg/multipleImg.vue";
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
            xrayList: [],
            dataList: [],
            casePhotoList: [[], [], []],
            xRayPhoto: [],
            dataPhoto: [],
            treatmentId: '',
            treatmentCaseId: '',
            updateTreatCase: {},
            photo: '',
            advice: "",
            files: {},
            titleTag: "",
            remark: "",
            address: "",
            firstVisit: "",
            clinical: "",
            treatCase: {},
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
        "el-pagination": Pagination,
        "el-upload": Upload,
        "el-date-picker": DatePicker,
        "multiple-img": MultipleImg,
        "el-select": Select,
        "upload-img": UploadImg
    },
    beforeRouteEnter: function(to, from, next) {
        next(vm => {
            vm.showLoading = true;
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
        uploadFun(file) {
            this.files[file.name] = file.file.raw
        },
        successXRay(res) {
            this.xRayPhoto.push(res.data.casePhotoId)
        },
        successData(res) {
            this.dataPhoto.push(res.data.casePhotoId)
        },
        removeXRay(file, fileList) {
            ajax.success(() => {
                this.xrayList = fileList.filter(_file => file.name !== _file.name);
            })
            
            console.log(res)
            console.log(this.xRayImg)
        },
        removeData(res) {

        },
        removeFile(file) {
            console.log(file);
        },
        showTreatCase(treatmentId, treatmentCaseId) {
            this.addDialog = true;
            this.treatmentId = treatmentId
            this.treatmentCaseId = treatmentCaseId
        },
        addTreatCase() {
            if (
                !(
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
            this.treatCase = {
                treatmentId: this.treatmentId,
                operatorDate: this.operatorDate,
                place: this.address,
                clinical: this.clinical,
                firstVisit: this.firstVisit,
                advice: this.advice,
                titleTag: this.titleTag,
                remark: this.remark,
                photoList: this.xRayPhoto.concat(this.dataPhoto)

            };
            this.xrayList.concat(this.dataList).map(file => file.name);
            hospitalSrv.addTreatCase(this.treatCase).then(
                resp => {
                    this.addDialog = false;
                    this.$message.success("添加病历信息成功");
                    this.$router.push("/hospital/treatSchedule");
                },
                err => {
                    this.$message.error(err.msg);
                }
            );
        },
        getTreatCaseDetail(treatmentCaseId) {

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
        updateTreatCase() {
            if (
                !(
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
            this.updateTreatCase = {
                treatmentId: this.treatmentId,
                treatmentCaseId: this.treatmentCaseId,
                operatorDate: this.operatorDate,
                place: this.address,
                clinical: this.clinical,
                firstVisit: this.firstVisit,
                advice: this.advice,
                titleTag: this.titleTag,
                remark: this.remark,
                photoList: this.xRayPhoto.concat(this.dataPhoto)

            };
            hospitalSrv.updateTreatCase(this.updateTreatCase).then(
                resp => {
                    this.updateDialog = false;
                    this.$message.success("修改病历信息成功");
                    this.$router.push("/hospital/treatSchedule");
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
                this.horseName
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

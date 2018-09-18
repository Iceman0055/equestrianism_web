<template>
    <div class="content_page animated zoomIn">
        <div class="content-title">
            <div class="title" v-if="useDisabled">查看获奖信息</div>
            <div class="title" v-if="!useDisabled &&queryId">修改获奖信息</div>
            <div class="title" v-if="!queryId">新增获奖信息</div>
            <router-link class="btn btn-info back" :to="'/horse/awards'">
                返回
            </router-link>
        </div>
        <div class="content-show">
            <el-form :model="horseInfo" label-width="120px" ref="horseInfo" class="demo-ruleForm" inline-message>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="马匹名称：" prop="horseId" :rules="[{ required: true, message: '请选择马匹名称', trigger: 'blur' },]">
                            <el-select ref="selectInput" :disabled="useDisabled" filterable size="large" v-model="horseInfo.horseId" class="el-field-input" placeholder="请选择马匹名称">
                                <el-option v-for="(item,index) in horseInfoName" :key="index" :label="item.horseName" :value="item.horseId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="赛事名称：" prop="eventName" :rules="[{ required: true, message: '请输入赛事名称', trigger: 'blur' },  ]">
                            <el-input size="large" :disabled="useDisabled" v-model="horseInfo.eventName" placeholder="请输入赛事名称"></el-input>

                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="比赛时间："  prop="eventDate" :rules="[ { required: true, message: '请输入比赛时间', trigger: 'blur' },  ]">
                            <el-date-picker class="el-field-input" :disabled="useDisabled" value-format="yyyy-MM" size="large" v-model="horseInfo.eventDate" type="month" placeholder="选择时间">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="比赛地点：" prop="eventPlace" :rules="[{ required: true, message: '请输入比赛地点', trigger: 'blur' },]">
                            <el-input size="large" :disabled="useDisabled" v-model="horseInfo.eventPlace" placeholder="请输入比赛地点"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="奖项：" prop="prizeName" :rules="[ { required: true, message: '请输入奖项', trigger: 'blur' },  ]">
                            <el-input size="large" :disabled="useDisabled" v-model="horseInfo.prizeName" placeholder="请输入奖项"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="罚分项：" prop="penaltyTerm">
                            <el-input size="large" :disabled="useDisabled" v-model="horseInfo.penaltyTerm" placeholder="请输入罚分项"></el-input>
                        </el-form-item>
                    </el-col>

                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="颁奖方：" prop="awarder" :rules="[{ required: true, message: '请输入颁奖方', trigger: 'blur' },]">
                            <el-input size="large" :disabled="useDisabled" v-model="horseInfo.awarder" placeholder="请输入颁奖方"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="图片描述：">
                            <upload-img v-on:uploadFun="uploadFun" v-model="descImage" :disabled="useDisabled" name="descImage" :imageUrl="descImage">
                            </upload-img>
                        </el-form-item>
                    </el-col>

                </el-row>
            </el-form>
        </div>
        <div class="content-footer row" v-show="!useDisabled">
            <el-button v-if="!queryId" class="col-md-1 btn btn-primary makesure" :plain="true" @click="addAwards('horseInfo')">确定</el-button>
            <el-button v-if="queryId" class="col-md-1 btn btn-primary makesure" :plain="true" @click="updateAwards('horseInfo')">修改</el-button>
        </div>
    </div>
</template>
<script>
import { DatePicker, Button, Upload, Select, Message, Form } from "element-ui";
import UploadImg from '../../../../components/uploadImg/uploadImg.vue'
import horseSrv from '../../../services/horse.service.js'
export default {
    data() {
        return {
            horseInfo: {
                horseId: '',
                eventName: '',
                eventDate: '',
                eventPlace: '',
                prizeName: '',
                penaltyTerm: '',
                awarder: ''
            },
            useDisabled: false,
            files: {},
            horseInfoName: [],
            descImage: '',
            queryId: ''
        };
    },
    components: {
        'upload-img': UploadImg,
    },
    mounted() {
        this.useDisabled = !!this.$route.query.disable;
        this.$el.addEventListener('animationend', this.resizeSelect)
    },
    beforeRouteEnter: function(to, from, next) {
        next(vm => {
            horseSrv.getHorseName().then((resp) => {
                vm.horseInfoName = resp.data.horseList
            }, (err) => {
                vm.$message.error(err.msg)
            })
            if (to.query.queryId) {
                vm.queryId = to.query.queryId
                horseSrv.getAwardsDetail(vm.queryId).then(resp => {
                    vm.horseInfo = resp.data
                    vm.descImage = resp.data.descImage
                }, err => {
                    vm.$message.error(err.msg)
                })
            }
        })
    },
    methods: {
        resizeSelect() {
            this.$refs.selectInput.resetInputWidth()
        },
        uploadFun(file) {
            this.files[file.name] = file.file.raw
        },
        addAwards(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    var formData = new FormData()
                    for (let key in this.files) {
                        formData.append(key, this.files[key])
                    }
                    for (let key in this.horseInfo) {
                        formData.append(key, this.horseInfo[key])
                    }
                    horseSrv.addAwards(formData).then((resp) => {
                        this.$message.success('添加获奖信息成功')
                        this.$router.push('/horse/awards')
                    }, err => {
                        this.$message.error(err.msg)
                    })
                } else {
                    return false;
                }
            });
        },
        updateAwards(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let horseInfo = {
                        horsePrizeId: this.horseInfo.horsePrizeId,
                        horseId: this.horseInfo.horseId,
                        eventName: this.horseInfo.eventName,
                        eventDate: this.horseInfo.eventDate,
                        eventPlace: this.horseInfo.eventPlace,
                        prizeName: this.horseInfo.prizeName,
                        penaltyTerm: this.horseInfo.penaltyTerm,
                        awarder: this.horseInfo.awarder
                    }
                    var formData = new FormData()
                    for (let key in this.files) {
                        formData.append(key, this.files[key])
                    }
                    for (let key in horseInfo) {
                        formData.append(key, horseInfo[key])
                    }
                    horseSrv.updateAwards(formData).then((resp) => {
                        this.$message.success('修改获奖信息成功')
                        this.$router.push('/horse/awards')
                    }, err => {
                        this.$message.error(err.msg)
                    })
                } else {
                    return false;
                }
            });

        },
        // addAwards() {
        //     if (!(this.horseName && this.eventName && this.eventDate && this.eventPlace &&
        //         this.prizeName && this.penaltyTerm && this.awarder)) {
        //         this.$message.error('获奖信息不能为空！')
        //         return;
        //     }
        //     let awardsInfo = {
        //         horseId: this.horseName,
        //         eventName: this.eventName,
        //         eventDate: this.eventDate,
        //         eventPlace: this.eventPlace,
        //         prizeName: this.prizeName,
        //         penaltyTerm: this.penaltyTerm,
        //         awarder: this.awarder
        //     }
        //     var formData = new FormData()
        //     for (let key in this.files) {
        //         formData.append(key, this.files[key])
        //     }
        //     for (let key in awardsInfo) {
        //         formData.append(key, awardsInfo[key])
        //     }
        //     horseSrv.addAwards(formData).then((resp) => {
        //         this.$message.success('添加获奖信息成功')
        //         this.$router.push('/horse/awards')
        //     }, err => {
        //         this.$message.error(err.msg)
        //     })
        // }
    }
};
</script>
<style lang="scss" scoped>

</style>

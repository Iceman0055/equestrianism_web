<template>
    <div class="content_page animated zoomIn">
        <div class="content-title">
            <div class="title" v-if="useDisabled">查看马匹基本信息</div>
            <div class="title" v-if="!useDisabled &&horseId">修改马匹基本信息</div>
            <div class="title" v-if="!horseId">新增马匹基本信息</div>
            <router-link class="btn btn-info back" :to="'/horse/baseInfo'">
                返回
            </router-link>
        </div>
        <div class="content-show">
            <el-form :model="horseInfo" label-width="120px" ref="horseInfo" class="demo-ruleForm" inline-message>
                <div class="baseInfo-title">
                    <div class="title">基本信息</div>
                </div>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="护照号码：" prop="passportNumber" :rules="[
                                                                                                                                                                                                              { required: true, message: '请输入护照号码', trigger: 'blur' },
                                                                                                                                                                                                            ]">
                            <el-input size="large" :disabled="useDisabled" v-model="horseInfo.passportNumber" placeholder="请输入护照号码"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="马匹名称：" prop="horseName" :rules="[
                                                                                                                                                                                                              { required: true, message: '请输入马匹名称', trigger: 'blur' },
                                                                                                                                                                                                            ]">
                            <el-input size="large" :disabled="useDisabled" v-model="horseInfo.horseName" placeholder="请输入马匹名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="变更马名：" prop="usedName" :rules="[
                                                                                                                                                                                                              { required: true, message: '请输入变更马名', trigger: 'blur' },
                                                                                                                                                                                                            ]">
                            <el-input size="large" :disabled="useDisabled" v-model="horseInfo.usedName" placeholder="请输入变更马名"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="出生国家：" prop="country" :rules="[
                                                                                                                                                                                                              { required: true, message: '请输入出生国家', trigger: 'blur' },
                                                                                                                                                                                                            ]">
                            <el-input size="large" :disabled="useDisabled" v-model="horseInfo.country" placeholder="请输入出生国家"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="变更日期：" prop="changeDate" :rules="[
                                                                                                                                                                                                              { required: true, message: '请选择变更日期', trigger: 'blur' },
                                                                                                                                                                                                            ]">
                            <el-date-picker class="el-field-input" :disabled="useDisabled" size="large" value-format="yyyy-MM-dd" format="yyyy-MM-dd" v-model="horseInfo.changeDate" type="date" placeholder="选择变更日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="出生年：" prop="birthday" :rules="[
                                                                                                                                                                                                              { required: true, message: '请选择出生年', trigger: 'blur' },
                                                                                                                                                                                                            ]">
                            <el-date-picker class="el-field-input" :disabled="useDisabled" size="large" value-format="yyyy" v-model="horseInfo.birthday" type="year" placeholder="选择出生日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="8">
                        <el-form-item label="身高(公分)：" prop="height" :rules="[
                                                                                                                                                                                                              { required: true, message: '请输入身高(公分)', trigger: 'blur' },
                                                                                                                                                                                                            ]">
                            <el-input size="large" :disabled="useDisabled" v-model="horseInfo.height" placeholder="请输入身高(公分)"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="性别：" prop="sex" :rules="[
                                                                                                                                                                                                              { required: true, message: '请选择性别', trigger: 'blur' },
                                                                                                                                                                                                            ]">
                            <el-select ref="selectInput" size="large" :disabled="useDisabled" v-model="horseInfo.sex" class="el-field-input" placeholder="请选择性别">
                                <el-option v-for="(item,index) in sexOptions" :key="index" :label="item.itemValue" :value="item.dictionaryDetailId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="皮下条码：" prop="barCode" :rules="[
                                                                                                                                                                                                              { required: true, message: '请输入皮下条码', trigger: 'blur' },
                                                                                                                                                                                                            ]">
                            <el-input size="large" :disabled="useDisabled" v-model="horseInfo.barCode" placeholder="请输入皮下条码"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>

                    <el-col :span="8">
                        <el-form-item label="毛色：" prop="coatColour" :rules="[
                                                                                                                                                                                                              { required: true, message: '请选择毛色', trigger: 'blur' },
                                                                                                                                                                                                            ]">
                            <el-select ref="selectColor" :disabled="useDisabled" size="large" v-model="horseInfo.coatColour" class="el-field-input" placeholder="请选择">
                                <el-option v-for="(item,index) in colorOptions" :key="index" :label="item.itemValue" :value="item.dictionaryDetailId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <div class="baseInfo-title">
                    <div class="title">描述</div>
                </div>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="头部：" prop="headDesc" :rules="[
                                                                                                                                                                                                              { required: true, message: '请输入马的头部描述', trigger: 'blur' },
                                                                                                                                                                                                            ]">
                            <el-input size="large" :disabled="useDisabled" v-model="horseInfo.headDesc" placeholder="请输入马的头部描述"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="左前肢：" prop="leftForeDesc" :rules="[
                                                                                                                                                                                                              { required: true, message: '请输入马的左前肢描述', trigger: 'blur' },
                                                                                                                                                                                                            ]">
                            <el-input size="large" :disabled="useDisabled" v-model="horseInfo.leftForeDesc" placeholder="请输入马的左前肢描述"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="右前肢：" prop="rightForeDesc" :rules="[
                                                                                                                                                                                                              { required: true, message: '请输入马的右前肢描述', trigger: 'blur' },
                                                                                                                                                                                                            ]">
                            <el-input size="large" :disabled="useDisabled" v-model="horseInfo.rightForeDesc" placeholder="请输入马的右前肢描述"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="左后肢：" prop="leftHindDesc" :rules="[
                                                                                                                                                                                                              { required: true, message: '请输入马的左后肢描述', trigger: 'blur' },
                                                                                                                                                                                                            ]">
                            <el-input size="large" :disabled="useDisabled" v-model="horseInfo.leftHindDesc" placeholder="请输入马的左后肢描述"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="右后肢：" prop="rightHindDesc" :rules="[
                                                                                                                                                                                                              { required: true, message: '请输入马的右后肢描述', trigger: 'blur' },
                                                                                                                                                                                                            ]">
                            <el-input size="large" :disabled="useDisabled" v-model="horseInfo.rightHindDesc" placeholder="请输入马的右后肢描述"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="体躯：" prop="bodyDesc" :rules="[
                                                                                                                                                                                                              { required: true, message: '请输入马的体躯肢描述', trigger: 'blur' },
                                                                                                                                                                                                            ]">
                            <el-input size="large" :disabled="useDisabled" v-model="horseInfo.bodyDesc" placeholder="请输入马的体躯肢描述"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <div class="baseInfo-title">
                    <div class="title">轮廓图解</div>
                </div>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="右侧：">
                            <upload-img v-on:uploadFun="uploadFun" v-model="rightImage" :disabled="useDisabled" name="rightImage" :imageUrl="rightImage">
                            </upload-img>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="左侧：">
                            <upload-img v-on:uploadFun="uploadFun" v-model="leftImage" :disabled="useDisabled" name="leftImage" :imageUrl="leftImage">
                            </upload-img>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="上眼线：">
                            <upload-img v-on:uploadFun="uploadFun" v-model="upperEyelinerImage" :disabled="useDisabled" name="upperEyelinerImage" :imageUrl="upperEyelinerImage">
                            </upload-img>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="前肢-后视：">
                            <upload-img v-on:uploadFun="uploadFun" v-model="foreImage" :disabled="useDisabled" name="foreImage" :imageUrl="foreImage">
                            </upload-img>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="颈部仰视：">
                            <upload-img v-on:uploadFun="uploadFun" v-model="neckImage" :disabled="useDisabled" name="neckImage" :imageUrl="neckImage">
                            </upload-img>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="后肢-后视：">
                            <upload-img v-on:uploadFun="uploadFun" v-model="hindImage" :disabled="useDisabled" name="hindImage" :imageUrl="hindImage">
                            </upload-img>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="唇：">
                            <upload-img v-on:uploadFun="uploadFun" v-model="lipImage" :disabled="useDisabled" name="lipImage" :imageUrl="lipImage">
                            </upload-img>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>

        </div>
        <div class="content-footer row" v-show="!useDisabled">
            <el-button class="col-md-1 btn btn-primary makesure" v-if="!horseId" :plain="true" @click="addHorseInfo('horseInfo')">确定</el-button>
            <el-button class="col-md-1 btn btn-primary makesure" v-if="horseId" :plain="true" @click="updateHorseInfo('horseInfo')">修改</el-button>

        </div>
    </div>
</template>

<script>
import { DatePicker, Button, Select, Message, Form } from 'element-ui'
import UploadImg from '../../../../components/uploadImg/uploadImg.vue'
import horseSrv from '../../../services/horse.service.js'
import dicSrv from '../../../services/system.service.js'
import systemSrv from '../../../services/system.service.js'
export default {
    data() {
        return {
            horseInfo: {
                passportNumber: '',
                horseName: '',
                usedName: '',
                country: '',
                changeDate: '',
                birthday: '',
                height: '',
                sex: '',
                barCode: '',
                coatColour: '',
                headDesc: '',
                leftForeDesc: '',
                rightForeDesc: '',
                leftHindDesc: '',
                rightHindDesc: '',
                bodyDesc: '',

            },
            rightImage: '',
            leftImage: '',
            upperEyelinerImage: '',
            foreImage: '',
            neckImage: '',
            hindImage: '',
            lipImage: '',
            useDisabled: false,
            files: {},
            colorOptions: [],
            sexOptions: [],
            horseId: ''
        }
    },
    components: {
        'upload-img': UploadImg
    },
    mounted() {
        this.useDisabled = !!this.$route.query.disable;
        this.$el.addEventListener('animationend', this.resizeSelect);
        this.$el.addEventListener('animationend', this.resizeColor)
    },
    beforeRouteLeave(to, from, next) {
        to.meta.keepAlive = true
        next()
    },
    beforeRouteEnter: function(to, from, next) {
        next(vm => {
            vm.horseId = to.query.queryId
            systemSrv.dictionary().then(resp => {
                let dictDetail = resp.data.dictionaryInfoList
                let len = dictDetail.length
                for (let i = 0; i < len; i++) {
                    if (dictDetail[i].typeCode == 'HORSE_SEX') {
                        vm.sexOptions = dictDetail[i].dictionaryDetailList
                    }
                    if (dictDetail[i].typeCode == 'HORSE_COAT_COLOUR') {
                        vm.colorOptions = dictDetail[i].dictionaryDetailList
                    }
                }
                // vm.dictInfoList = systemSrv.formatDic(dictDetail)
                if (vm.horseId) {
                    return horseSrv.getHorseDetail(to.query.queryId)
                }
            }).then(resp => {
                vm.horseInfo = resp.data
                vm.rightImage = resp.data.rightImage
                vm.leftImage = resp.data.leftImage
                vm.upperEyelinerImage = resp.data.upperEyelinerImage
                vm.foreImage = resp.data.foreImage
                vm.neckImage = resp.data.neckImage
                vm.hindImage = resp.data.hindImage
                vm.lipImage = resp.data.lipImage
                vm.horseInfo.sex = parseInt(resp.data.sex)
                vm.horseInfo.coatColour = parseInt(resp.data.coatColour)
            }).catch(err => {
                vm.$message.error(err.msg)
            });
        })
    },
    methods: {
        //修改
        updateHorseInfo(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    var horseInfo = {
                        horseId: this.horseInfo.horseId,
                        passportNumber: this.horseInfo.passportNumber,
                        horseName: this.horseInfo.horseName,
                        usedName: this.horseInfo.usedName,
                        country: this.horseInfo.country,
                        changeDate: this.horseInfo.changeDate,
                        birthday: this.horseInfo.birthday,
                        height: this.horseInfo.height,
                        sex: this.horseInfo.sex,
                        barCode: this.horseInfo.barCode,
                        coatColour: this.horseInfo.coatColour,
                        headDesc: this.horseInfo.headDesc,
                        leftForeDesc: this.horseInfo.leftForeDesc,
                        rightForeDesc: this.horseInfo.rightForeDesc,
                        leftHindDesc: this.horseInfo.leftHindDesc,
                        rightHindDesc: this.horseInfo.rightHindDesc,
                        bodyDesc: this.horseInfo.bodyDesc,
                    }
                    var formData = new FormData()
                    for (let key in this.files) {
                        formData.append(key, this.files[key])
                    }
                    for (let key in horseInfo) {
                        formData.append(key, horseInfo[key])
                    }
                    horseSrv.updateHorseInfo(formData).then(resp => {
                        this.$message.success('修改马匹成功')
                        this.$router.push('/horse/baseInfo')
                    }, err => {
                        this.$message.error(err.msg)
                    })
                } else {
                    return false;
                }
            });
        },
        //新增
        addHorseInfo(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    var formData = new FormData()
                    for (let key in this.files) {
                        formData.append(key, this.files[key])
                    }
                    for (let key in this.horseInfo) {
                        formData.append(key, this.horseInfo[key])
                    }
                    horseSrv.addHorseInfo(formData).then((resp) => {
                        this.$message.success('添加马匹成功')
                        this.$router.push('/horse/baseInfo')
                    }, err => {
                        this.$message.error(err.msg)
                    })
                } else {
                    return false;
                }
            });
        },
        resizeSelect() {
            this.$refs.selectInput.resetInputWidth();
        },
        resizeColor() {
            this.$refs.selectColor.resetInputWidth()
        },
        uploadFun(file) {
            this.files[file.name] = file.file.raw;
        },
    }
}
</script>
<style lang="scss" scoped>
.baseInfo-title {
    height: 30px;
    line-height: 30px;
    border-left: 2px solid #2db7f5;
    padding-left: 20px;
    padding-right: 20px;
    margin-bottom: 12px;
    .title {
        font-size: 16px;
        font-weight: bold;
        display: inline-block;
    }
}
</style>

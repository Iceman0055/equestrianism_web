<template>
    <div class="content_page">
        <div class="content-title">
            <div class="title" v-if="!useDisabled">修改马匹基本信息</div>
            <div class="title" v-if="useDisabled">查看马匹基本信息</div>
            <router-link class="btn btn-info back" :to="'/horse/baseInfo'">
                返回
            </router-link>
        </div>
        <div class="content-show">
            <div class="baseInfo-title">
                <div class="title">基本信息</div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">护照号码：</div>
                    <input type="text" v-model="passport" :disabled="useDisabled" class="form-control input-field" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">马匹名称：</div>
                    <input type="text" v-model="horseName" :disabled="useDisabled" class="form-control input-field" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">变更马名：</div>
                    <input type="text" v-model="changeName" :disabled="useDisabled" class="form-control input-field" />
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">出生国家：</div>
                    <input type="text" v-model="bornCountry" :disabled="useDisabled" class="form-control input-field" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">变更日期：</div>
                    <el-date-picker :disabled="useDisabled" value-format="yyyy-MM-dd" format="yyyy-MM-dd" class="el-field-input" size="large" v-model="changeDate" type="date">
                    </el-date-picker>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">出生年：</div>
                    <el-date-picker :disabled="useDisabled" class="el-field-input" value-format="yyyy" size="large" v-model="birthDate" type="year">
                    </el-date-picker>
                </div>

            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">身高(公分)：</div>
                    <input type="text" v-model="height" :disabled="useDisabled" class="form-control input-field" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">马匹性别：</div>
                    <el-select ref="selectInput" size="large" v-model="gender" :disabled="useDisabled" class="el-field-input" placeholder="请选择">
                        <el-option v-for="item in sexOptions" :key="item.dictionaryDetailId" :label="item.itemValue" :value="item.dictionaryDetailId">
                        </el-option>
                    </el-select>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">皮下条码：</div>
                    <input type="text" v-model="barCode" :disabled="useDisabled" class="form-control input-field" />
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">毛色：</div>
                    <el-select ref="selectColor" size="large" v-model="color" :disabled="useDisabled" class="el-field-input" placeholder="请选择">
                        <el-option v-for="item in colorOptions" :key="item.dictionaryDetailId" :label="item.itemValue" :value="item.dictionaryDetailId">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="baseInfo-title">
                <div class="title">描述</div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">头部：</div>
                    <input type="text" v-model="head" :disabled="useDisabled" class="form-control input-field" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">左前肢：</div>
                    <input type="text" v-model="leftFore" :disabled="useDisabled" class="form-control input-field" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">右前肢：</div>
                    <input type="text" v-model="rightFore" :disabled="useDisabled" class="form-control input-field" />
                </div>

            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">左后肢：</div>
                    <input type="text" v-model="leftHind" :disabled="useDisabled" class="form-control input-field" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">右后肢：</div>
                    <input type="text" v-model="rightHind" :disabled="useDisabled" class="form-control input-field" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">体躯：</div>
                    <input type="text" v-model="body" :disabled="useDisabled" class="form-control input-field" />
                </div>

            </div>
            <div class="baseInfo-title">
                <div class="title">轮廓图解</div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">右侧：</div>
                    <upload-img v-on:uploadFun="uploadFun" :useDisabled="useDisabled" v-model="rightImage" name="rightImage" :imageUrl="rightImage">
                    </upload-img>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">左侧：</div>
                    <upload-img v-on:uploadFun="uploadFun" :useDisabled="useDisabled" v-model="leftImage" name="leftImage" :imageUrl="leftImage">
                    </upload-img>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">上眼线：</div>
                    <upload-img v-on:uploadFun="uploadFun" :useDisabled="useDisabled" v-model="upperEyelinerImage" name="upperEyelinerImage" :imageUrl="upperEyelinerImage">
                    </upload-img>
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">前肢-后视：</div>
                    <upload-img v-on:uploadFun="uploadFun" :useDisabled="useDisabled" v-model="foreImage" name="foreImage" :imageUrl="foreImage">
                    </upload-img>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">颈部仰视：</div>
                    <upload-img v-on:uploadFun="uploadFun" :useDisabled="useDisabled" v-model="neckImage" name="neckImage" :imageUrl="neckImage">
                    </upload-img>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">后肢-后视：</div>
                    <upload-img v-on:uploadFun="uploadFun" :useDisabled="useDisabled" v-model="hindImage" name="hindImage" :imageUrl="hindImage">
                    </upload-img>
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">唇：</div>
                    <upload-img v-on:uploadFun="uploadFun" :useDisabled="useDisabled" v-model="lipImage" name="lipImage" :imageUrl="lipImage">
                    </upload-img>
                </div>
            </div>
        </div>
        <div class="content-footer row" v-show="!useDisabled">
            <el-button class="col-md-1 btn btn-primary makesure" :plain="true" @click="updateHorseInfo">确定</el-button>
        </div>
    </div>
</template>

<script>
import { DatePicker, Button, Upload, Select, Message } from 'element-ui'
import UploadImg from '../../../../components/uploadImg/uploadImg.vue'
import horseSrv from '../../../services/horse.service.js'
import systemSrv from '../../../services/system.service.js'
export default {
    data() {
        return {
            horseId: '',
            passport: '',
            horseName: '',
            changeName: '',
            bornCountry: '',
            height: '',
            barCode: '',
            color: '',
            head: '',
            leftFore: '',
            rightFore: '',
            leftHind: '',
            rightHind: '',
            body: '',
            imageUrl: '',
            rightImage: '',
            leftImage: '',
            upperEyelinerImage: '',
            foreImage: '',
            neckImage: '',
            hindImage: '',
            lipImage: '',
            changeDate: '',
            birthDate: "",
            useDisabled: false,
            gender: '',
            files: {},
            updateInfo: {},
            sexOptions: [],
            colorOptions: [],
            horseInfoName: [],
            convertColor: {},
            dictInfoList: {},
            list: '',
        }
    },
    components: {
        'el-date-picker': DatePicker,
        'el-button': Button,
        'upload-img': UploadImg,
        'el-select': Select
    },
    mounted() {
        this.useDisabled = !!this.$route.query.disable
        this.$el.addEventListener('animationend', this.resizeSelect)
        this.$el.addEventListener('animationend', this.resizeColor)
    },
    beforeRouteEnter: function(to, from, next) {
        next(vm => {
            vm.horseId = to.query.horseId
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
                vm.dictInfoList = systemSrv.formatDic(dictDetail)
                return horseSrv.getHorseDetail(to.query.horseId)
            }).then(resp => {
                vm.passport = resp.data.passportNumber
                vm.horseName = resp.data.horseName
                vm.changeName = resp.data.usedName
                vm.bornCountry = resp.data.country
                vm.changeDate = resp.data.changeDate
                vm.birthDate = resp.data.birthday
                vm.height = resp.data.height
                vm.gender = parseInt(resp.data.sex)
                vm.barCode = resp.data.barCode
                vm.color = parseInt(resp.data.coatColour)
                vm.head = resp.data.headDesc
                vm.leftFore = resp.data.leftForeDesc
                vm.rightFore = resp.data.rightForeDesc
                vm.leftHind = resp.data.leftHindDesc
                vm.rightHind = resp.data.rightHindDesc
                vm.body = resp.data.bodyDesc
                vm.rightImage = resp.data.rightImage
                vm.leftImage = resp.data.leftImage
                vm.upperEyelinerImage = resp.data.upperEyelinerImage
                vm.foreImage = resp.data.foreImage
                vm.neckImage = resp.data.neckImage
                vm.hindImage = resp.data.hindImage
                vm.lipImage = resp.data.lipImage
            }).catch(err => {
                vm.$message.error(err.msg)
            });
            horseSrv.getHorseName().then((resp) => {
                vm.horseInfoName = resp.data.horseList
            }, (err) => {
                vm.$message.error(err.msg)
            })
        })
    },
    methods: {
        resizeSelect() {
            this.$refs.selectInput.resetInputWidth()
        },
        resizeColor() {
            this.$refs.selectColor.resetInputWidth()
        },
        uploadFun(file) {
            this.files[file.name] = file.file.raw
        },
        updateHorseInfo() {
            if (!(this.passport && this.horseName && this.changeName && this.bornCountry &&
                this.changeDate && this.birthDate && this.height && this.gender
                && this.barCode && this.color)) {
                this.$message.error('马匹信息不能为空！')
                return;
            }
            this.updateInfo = {
                horseId: this.horseId,
                passportNumber: this.passport,
                horseName: this.horseName,
                usedName: this.changeName,
                country: this.bornCountry,
                changeDate: this.changeDate,
                birthday: this.birthDate,
                height: this.height,
                sex: this.gender,
                barCode: this.barCode,
                coatColour: this.color,
                headDesc: this.head,
                leftForeDesc: this.leftFore,
                rightForeDesc: this.rightFore,
                leftHindDesc: this.leftHind,
                rightHindDesc: this.rightHind,
                bodyDesc: this.body,
            }
            var formData = new FormData()
            for (let key in this.files) {
                formData.append(key, this.files[key])
            }
            for (let key in this.updateInfo) {
                formData.append(key, this.updateInfo[key])
            }
            horseSrv.updateHorseInfo(formData).then(resp => {
                this.$message.success('修改马匹成功')
                this.$router.push('/horse/baseInfo')
            }, err => {
                this.$message.error(err.msg)
            })
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

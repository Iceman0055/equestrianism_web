<template>
    <div class="content_page animated zoomIn">
        <div class="content-title">
            <div class="title">新增马匹基本信息</div>
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
                    <input type="text" v-model="passport" class="form-control input-field" placeholder="请输入护照号码" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">马匹名称：</div>
                    <input type="text" v-model="horseName" class="form-control input-field" placeholder="请输入马匹名称" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">变更马名：</div>
                    <input type="text" v-model="changeName" class="form-control input-field" placeholder="请输入变更马名" />
                </div>

            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">出生国家：</div>
                    <input type="text" v-model="bornCountry" class="form-control input-field" placeholder="请输入马的出生国家" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">变更日期：</div>
                    <el-date-picker class="el-field-input" size="large" value-format="yyyy-MM-dd" format="yyyy-MM-dd" v-model="changeDate" type="date" placeholder="选择变更日期">
                    </el-date-picker>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">出生年：</div>
                    <el-date-picker class="el-field-input" size="large" value-format="yyyy" v-model="birthDate" type="year" placeholder="选择出生日期">
                    </el-date-picker>
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">身高(公分)：</div>
                    <input type="text" v-model="height" class="form-control input-field" placeholder="请输入马的身高" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">性别：</div>
                    <el-select ref="selectInput" size="large" v-model="gender" class="el-field-input" placeholder="请选择">
                        <el-option v-for="(item,index) in sexOptions" :key="index" :label="item.itemValue" :value="item.dictionaryDetailId">
                        </el-option>
                    </el-select>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">皮下条码：</div>
                    <input type="text" v-model="barCode" class="form-control input-field" placeholder="请输入马的皮下条码" />
                </div>
            </div>

            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">毛色：</div>
                    <el-select ref="selectColor" size="large" v-model="color" class="el-field-input" placeholder="请选择">
                        <el-option v-for="(item,index) in colorOptions" :key="index" :label="item.itemValue" :value="item.dictionaryDetailId">
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
                    <input type="text" v-model="head" class="form-control input-field" placeholder="请输入马的头部描述" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">左前肢：</div>
                    <input type="text" v-model="leftFore" class="form-control input-field" placeholder="请输入马的左前肢描述" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">右前肢：</div>
                    <input type="text" v-model="rightFore" class="form-control input-field" placeholder="请输入马的右前肢描述" />
                </div>

            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">左后肢：</div>
                    <input type="text" v-model="leftHind" class="form-control input-field" placeholder="请输入马的左后肢描述" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">右后肢：</div>
                    <input type="text" v-model="rightHind" class="form-control input-field" placeholder="请输入马的右后肢描述" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">体躯：</div>
                    <input type="text" v-model="body" class="form-control input-field" placeholder="请输入马的体躯描述" />
                </div>
            </div>
            <div class="baseInfo-title">
                <div class="title">轮廓图解</div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">右侧：</div>
                    <upload-img v-on:uploadFun="uploadFun" name="rightImage" :imageUrl="rightImage">
                    </upload-img>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">左侧：</div>
                    <upload-img v-on:uploadFun="uploadFun" name="leftImage" :imageUrl="leftImage">
                    </upload-img>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">上眼线：</div>
                    <upload-img v-on:uploadFun="uploadFun" name="upperEyelinerImage" :imageUrl="upperEyelinerImage">
                    </upload-img>
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">前肢-后视：</div>
                    <upload-img v-on:uploadFun="uploadFun" name="foreImage" :imageUrl="foreImage">
                    </upload-img>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">颈部仰视：</div>
                    <upload-img v-on:uploadFun="uploadFun" name="neckImage" :imageUrl="neckImage">
                    </upload-img>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">后肢-后视：</div>
                    <upload-img v-on:uploadFun="uploadFun" name="hindImage" :imageUrl="hindImage">
                    </upload-img>
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">唇：</div>
                    <upload-img v-on:uploadFun="uploadFun" name="lipImage" :imageUrl="lipImage">
                    </upload-img>
                </div>
            </div>
        </div>
        <div class="content-footer row">
            <el-button class="col-md-1 btn btn-primary makesure" :plain="true" @click="addHorseInfo">确定</el-button>
        </div>
    </div>
</template>

<script>
import { DatePicker, Button, Select, Message } from 'element-ui'
import UploadImg from '../../../../components/uploadImg/uploadImg.vue'
import horseSrv from '../../../services/horse.service.js'
import dicSrv from '../../../services/system.service.js'
export default {
    data() {
        return {
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
            gender: '',
            changeDate: '',
            birthDate: '',
            files: {},
            rightImage: '',
            leftImage: '',
            upperEyelinerImage: '',
            foreImage: '',
            neckImage: '',
            hindImage: '',
            lipImage: '',
            colorOptions: [],
            sexOptions: []
        }
    },
    components: {
        'upload-img': UploadImg
    },
    mounted() {
        this.$el.addEventListener('animationend', this.resizeSelect);
        this.$el.addEventListener('animationend', this.resizeColor)
    },
    beforeRouteEnter: function(to, from, next) {
        next(vm => {
            dicSrv.dictionary().then(resp => {
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
            }, err => {
                vm.$message.error(err.msg)
            })
        })
    },
    methods: {
        resizeSelect() {
            this.$refs.selectInput.resetInputWidth();
        },
        resizeColor() {
            this.$refs.selectColor.resetInputWidth()
        },
        uploadFun(file) {
            this.files[file.name] = file.file.raw;
        },
        addHorseInfo() {
            if (!(this.passport && this.horseName && this.changeName && this.bornCountry &&
                this.changeDate && this.birthDate && this.height && this.gender
                && this.barCode && this.color)) {
                this.$message.error('马匹信息不能为空！')
                return;
            }
            let horseInfo = {
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
            for (let key in horseInfo) {
                formData.append(key, horseInfo[key])
            }
            horseSrv.addHorseInfo(formData).then((resp) => {
                this.$message.success('添加马匹成功')
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

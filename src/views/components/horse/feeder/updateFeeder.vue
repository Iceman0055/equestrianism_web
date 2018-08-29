<template>
    <div class="content_page animated zoomIn">
        <div class="content-title">
            <div class="title" v-if="!useDisabled">修改饲养员信息</div>
            <div class="title" v-if="useDisabled">查看饲养员信息</div>
            <router-link class="back btn btn-info" :to="'/horse/feeder'">
                返回
            </router-link>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">姓名：</div>
                    <input type="text" v-model="name" :disabled="useDisabled" class="form-control input-field" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">性别：</div>
                    <el-select ref="selectInput" :disabled="useDisabled" size="large" v-model="sex" class="el-field-input" placeholder="请选择">
                        <el-option v-for="(item,index) in sexOptions" :key="index" :label="item.itemValue" :value="item.dictionaryDetailId">
                        </el-option>
                    </el-select>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">技能描述：</div>
                    <input type="text" v-model="skill" :disabled="useDisabled" class="form-control input-field" />
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">匹配马匹：</div>
                    <el-select ref="selectHorse" filterable :disabled="useDisabled" size="large" v-model="horseName" class="el-field-input" placeholder="请选择">
                        <el-option v-for="(item,index) in horseInfoName" :key="index" :label="item.horseName" :value="item.horseId">
                        </el-option>
                    </el-select>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">入职时间：</div>
                    <el-date-picker :disabled="useDisabled" value-format="yyyy-MM-dd" format="yyyy-MM-dd" class="el-field-input" size="large" v-model="workTime" type="date">
                    </el-date-picker>
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">身份证照片：</div>
                    <upload-img v-on:uploadFun="uploadFun" name="idCardImage" :useDisabled="useDisabled" :imageUrl="idCardImage">
                    </upload-img>
                </div>
            </div>
        </div>
        <div class="content-footer row" v-show="!useDisabled">
            <el-button class="col-md-1 btn btn-primary makesure" :plain="true" @click="updateFeeder">确定</el-button>
        </div>
    </div>
</template>
<script>
import { DatePicker, Button, Select, ButtonSelect, Message } from 'element-ui'
import UploadImg from '../../../../components/uploadImg/uploadImg.vue'
import horseSrv from '../../../services/horse.service.js'
import systemSrv from '../../../services/system.service.js'
export default {
    data() {
        return {
            workTime: '',
            matchHorse: '',
            skill: '',
            name: '',
            matchHorse: '',
            idCardImage: '',
            useDisabled: false,
            sex: '',
            files: {},
            feederId: '',
            horseInfoName: [],
            horseName: '',
            sexOptions: [],
        }
    },
    components: {
        'upload-img': UploadImg,
    },
    mounted() {
        this.useDisabled = !!this.$route.query.disable
        this.$el.addEventListener('animationend', this.resizeSelect)
        this.$el.addEventListener('animationend', this.resizeHorse)
    },
    beforeRouteEnter: function(to, from, next) {
        next(vm => {
            vm.feederId = to.query.feederId
            horseSrv.getHorseName().then((resp) => {
                vm.horseInfoName = resp.data.horseList
            }, (err) => {
                vm.$message.error(err.msg)
            })
            systemSrv.dictionary().then(resp => {
                let dictDetail = resp.data.dictionaryInfoList
                let len = dictDetail.length
                for (let i = 0; i < len; i++) {
                    if (dictDetail[i].typeCode == 'SEX') {
                        vm.sexOptions = dictDetail[i].dictionaryDetailList
                    }
                }
                // vm.dictInfoList = systemSrv.formatDic(dictDetail);
                return horseSrv.getFeederDetail(vm.feederId);
            }).then(resp => {
                vm.name = resp.data.feederName
                vm.sex = parseInt(resp.data.sex)
                vm.skill = resp.data.skillDesc
                vm.horseName = resp.data.horseId
                vm.workTime = resp.data.hireDate
                vm.idCardImage = resp.data.idCardImage
            }).catch(err => {
                vm.$message.error(err.msg)
            });
        })
    },
    methods: {
        resizeSelect() {
            this.$refs.selectInput.resetInputWidth()
        },
        resizeHorse() {
            this.$refs.selectHorse.resetInputWidth()
        },
        uploadFun(file) {
            this.files[file.name] = file.file.raw
        },
        updateFeeder() {
            if (!(this.name && this.sex && this.skill && this.horseName &&
                this.workTime)) {
                this.$message.error('饲养员信息不能为空！')
                return;
            }
            let feederInfo = {
                feederId: this.feederId,
                feederName: this.name,
                sex: this.sex,
                skillDesc: this.skill,
                horseId: this.horseName,
                hireDate: this.workTime,
            }
            var formData = new FormData()
            for (let key in this.files) {
                formData.append(key, this.files[key])
            }
            for (let key in feederInfo) {
                formData.append(key, feederInfo[key])
            }
            horseSrv.updateFeeder(formData).then((resp) => {
                this.$message.success('修改饲养员信息成功')
                this.$router.push('/horse/feeder')
            }, err => {
                this.$message.error(err.msg)
            })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>

<template>
    <div class="content_page animated zoomIn">
        <div class="content-title">
            <div class="title" v-if="!useDisabled">修改饲养员信息</div>
            <div class="title" v-if="useDisabled">查看饲养员信息</div>
            <router-link class="back btn btn-info" :to="'/horse/breeder'">
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
                    <el-select ref="selectInput" size="large" v-model="gender" class="el-field-input" placeholder="请选择">
                        <el-option v-for="item in genderOptions" :key="item.value" :label="item.label" :value="item.value">
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
                    <el-select size="large" :disabled="useDisabled" v-model="matchHorse" class="el-field-input" placeholder="请选择">
                        <el-option v-for="item in matchHorseOptions" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">入职时间：</div>
                    <el-date-picker :disabled="useDisabled" class="el-field-input" size="large" v-model="workTime" type="date">
                    </el-date-picker>
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">身份证照片：</div>
                    <upload-img v-on:uploadFun="uploadFun" :useDisabled="useDisabled" :imageUrl="idCardImg">
                    </upload-img>
                </div>
            </div>
        </div>
        <div class="content-footer row" v-show="!useDisabled">
            <el-button class="col-md-1 btn btn-primary makesure" :plain="true" @click="updateBreeder">确定</el-button>
        </div>
    </div>
</template>
<script>
import { DatePicker, Button, Select, ButtonSelect, Message } from 'element-ui'
import UploadImg from '../../../../components/uploadImg/uploadImg.vue'
import horseSrv from '../../../services/horse.service.js'
export default {
    data() {
        return {
            workTime: '',
            matchHorse: '',
            skill: '',
            name: '',
            matchHorse: '',
            idCardImg: '',
            useDisabled: false,
            gender: '',
            files: {},
            matchHorseOptions: [
                {
                    value: "选项1",
                    label: "马匹1"
                },
                {
                    value: "选项2",
                    label: "马匹2"
                }
            ],
            genderOptions: [
                {
                    value: "公",
                    label: "公"
                },
                {
                    value: "母",
                    label: "母"
                }
            ]
        }
    },
    components: {
        'el-date-picker': DatePicker,
        'el-button': Button,
        "el-select": Select,
        'upload-img': UploadImg,
    },
    mounted() {
        this.useDisabled = !!this.$route.query.disable
        this.$el.addEventListener('animationend', this.resizeSelect)
    },
    methods: {
        resizeSelect() {
            this.$refs.selectInput.resetInputWidth()
        },
        uploadFun(file) {
            this.files[file.name] = file.file.raw
        },
        updateBreeder() {
            if (!(this.name && this.gender && this.skill && this.matchHorse &&
                this.workTime && this.awardParty && this.horse && this.horseImg)) {
                this.$message.error('饲养员信息不能为空！')
                return;
            }
            this.breederInfo = {
                name: this.name,
                gender: this.gender,
                skill: this.skill,
                matchHorse: this.matchHorse,
                workTime: this.workTime,
                awardParty: this.awardParty,
                horse: this.horse,
            }
            var formData = new FormData()
            for (let key in this.files) {
                formData.append(key, this.files[key])
            }
            for (let key in this.breederInfo) {
                formData.append(key, this.breederInfo[key])
            }
            horseSrv.updateBreeder(formData).then((resp) => {
                this.$message.success('更新饲养员信息成功')
                this.$router.push('/horse/breeder')
            }, err => {
                this.$message.error(err.msg)
            })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>

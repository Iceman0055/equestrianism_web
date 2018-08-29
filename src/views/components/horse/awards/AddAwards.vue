<template>
    <div class="content_page animated zoomIn">
        <div class="content-title">
            <div class="title">新增获奖信息</div>
            <router-link class="btn btn-info back" :to="'/horse/awards'">
                返回
            </router-link>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">马匹名称：</div>
                    <el-select ref="selectInput" filterable size="large" v-model="horseName" class="el-field-input" placeholder="请选择马匹名称">
                        <el-option v-for="(item,index) in horseInfoName" :key="index" :label="item.horseName" :value="item.horseId">
                        </el-option>
                    </el-select>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">赛事名称：</div>
                    <input type="text" v-model="eventName" class="form-control input-field" placeholder="请输入赛事名称" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">比赛时间：</div>
                    <el-date-picker class="el-field-input" value-format="yyyy-MM" size="large" v-model="eventDate" type="month" placeholder="选择时间">
                    </el-date-picker>
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">比赛地点：</div>
                    <input type="text" v-model="eventPlace" class="form-control input-field" placeholder="请输入马的出生国家" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">奖项：</div>
                    <input type="text" v-model="prizeName" class="form-control input-field" placeholder="请输入马获奖的奖项" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">罚分项：</div>
                    <input type="text" v-model="penaltyTerm" class="form-control input-field" placeholder="请输入罚分项" />
                </div>

            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">颁奖方：</div>
                    <input type="text" v-model="awarder" class="form-control input-field" placeholder="请输入颁奖方" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">图片描述：</div>
                    <upload-img v-on:uploadFun="uploadFun" name="descImage" :imageUrl="descImage">
                    </upload-img>
                </div>
            </div>
        </div>
        <div class="content-footer row">
            <el-button class="col-md-1 btn btn-primary makesure" :plain="true" @click="addAwards">确定</el-button>
        </div>
    </div>
</template>
<script>
import { DatePicker, Button, Upload, Select, Message } from "element-ui";
import UploadImg from '../../../../components/uploadImg/uploadImg.vue'
import horseSrv from '../../../services/horse.service.js'
export default {
    data() {
        return {
            files: {},
            horseName: '',
            horseInfoName: [],
            eventName: "",
            eventDate: '',
            eventPlace: '',
            prizeName: '',
            penaltyTerm: '',
            awarder: '',
            descImage:''
        };
    },
    components: {
        'upload-img': UploadImg,
    },
    mounted() {
        this.$el.addEventListener('animationend', this.resizeSelect)
    },
    beforeRouteEnter: function(to, from, next) {
        next(vm => {
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
        uploadFun(file) {
            this.files[file.name] = file.file.raw
        },
        addAwards() {
            if (!(this.horseName && this.eventName && this.eventDate && this.eventPlace &&
                this.prizeName && this.penaltyTerm && this.awarder)) {
                this.$message.error('获奖信息不能为空！')
                return;
            }
            let awardsInfo = {
                horseId: this.horseName,
                eventName: this.eventName,
                eventDate: this.eventDate,
                eventPlace: this.eventPlace,
                prizeName: this.prizeName,
                penaltyTerm: this.penaltyTerm,
                awarder: this.awarder
            }
            var formData = new FormData()
            for (let key in this.files) {
                formData.append(key, this.files[key])
            }
            for (let key in awardsInfo) {
                formData.append(key, awardsInfo[key])
            }
            horseSrv.addAwards(formData).then((resp) => {
                this.$message.success('添加获奖信息成功')
                this.$router.push('/horse/awards')
            }, err => {
                this.$message.error(err.msg)
            })
        }
    }
};
</script>
<style lang="scss" scoped>

</style>

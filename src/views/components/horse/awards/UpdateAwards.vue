<template>
    <div class="content_page animated zoomIn">
        <div class="content-title">
            <div class="title" v-if="!useDisabled">修改获奖信息</div>
            <div class="title" v-if="useDisabled">查看获奖信息</div>
            <router-link class="btn btn-info back" :to="'/horse/awards'">
                返回
            </router-link>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">马匹名称：</div>
                    <el-select ref="selectInput" filterable size="large" disabled v-model="horseName" class="el-field-input" placeholder="请选择">
                        <el-option v-for="item in horseInfoName" :key="item.horseId" :label="item.horseName" :value="item.horseId">
                        </el-option>
                    </el-select>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">赛事名称：</div>
                    <input type="text" v-model="eventName" :disabled="useDisabled" class="form-control input-field" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">比赛时间：</div>
                    <el-date-picker v-model="eventDate" value-format="yyyy-MM" :disabled="useDisabled" class="el-field-input" size="large" type="month">
                    </el-date-picker>
                </div>

            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">比赛地点：</div>
                    <input type="text" v-model="eventPlace" :disabled="useDisabled" class="form-control input-field" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">奖项：</div>
                    <input type="text" v-model="prizeName" :disabled="useDisabled" class="form-control input-field" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">罚分项：</div>
                    <input type="text" v-model="penaltyTerm" :disabled="useDisabled" class="form-control input-field" />
                </div>

            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">颁奖方：</div>
                    <input type="text" v-model="awarder" :disabled="useDisabled" class="form-control input-field" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">照片：</div>
                    <upload-img v-on:uploadFun="uploadFun" :useDisabled="useDisabled" name="descImage" :imageUrl="descImage">
                    </upload-img>
                </div>
            </div>
        </div>
        <div class="content-footer row" v-show="!useDisabled">
            <el-button class="col-md-1 btn btn-primary makesure" :plain="true" @click="updateAwards">确定</el-button>
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
            eventName: "",
            eventDate: '',
            eventPlace: '',
            prizeName: '',
            penaltyTerm: '',
            awarder: '',
            descImage: '',
            useDisabled: false,
            files: {},
            horsePrizeId: '',
            horseInfoName: [],
            horseName: '',
        }
    },
    components: {
        'upload-img': UploadImg,
    },
    mounted() {
        this.useDisabled = !!this.$route.query.disable
        this.$el.addEventListener('animationend', this.resizeSelect)
    },
    beforeRouteEnter: function(to, from, next) {
        next(vm => {
            vm.horsePrizeId = to.query.horsePrizeId
            horseSrv.getAwardsDetail(vm.horsePrizeId).then(resp => {
                vm.horseName = resp.data.horseId
                vm.eventName = resp.data.eventName
                vm.eventDate = resp.data.eventDate
                vm.eventPlace = resp.data.eventPlace
                vm.prizeName = resp.data.prizeName
                vm.penaltyTerm = resp.data.penaltyTerm
                vm.awarder = resp.data.awarder
                vm.descImage = resp.data.descImage
            }, err => {
                vm.$message.error(err.msg)
            })
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
        updateAwards() {
            if (!(this.horseName && this.eventName && this.eventDate && this.eventPlace &&
                this.prizeName && this.penaltyTerm && this.awarder)) {
                this.$message.error('获奖信息不能为空！')
                return;
            }
            let awardsInfo = {
                horsePrizeId: this.horsePrizeId,
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
            horseSrv.updateAwards(formData).then((resp) => {
                this.$message.success('修改获奖信息成功')
                this.$router.push('/horse/awards')
            }, err => {
                this.$message.error(err.msg)
            })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>

<template>
    <div class="content_page animated zoomIn">
        <div class="content-title">
            <div class="title" v-if="!useDisabled">修改接种疫苗信息</div>
            <div class="title" v-if="useDisabled">查看接种疫苗信息</div>
            <router-link class="btn btn-info back" :to="'/hospital/Vaccination'">
                返回
            </router-link>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">马匹名称：</div>
                    <el-select ref="selectHorse" :disabled="useDisabled" size="large" filterable v-model="horseName" class="el-field-input" placeholder="请选择马匹名称">
                        <el-option v-for="item in horseInfoName" :key="item.horseId" :label="item.horseName" :value="item.horseId">
                        </el-option>
                    </el-select>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">地点：</div>
                    <input type="text" v-model="address" :disabled="useDisabled" class="form-control input-field" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">时间：</div>
                    <el-date-picker class="el-field-input" :disabled="useDisabled" format="yyyy-MM-dd HH:mm:00" value-format="yyyy-MM-dd HH:mm:00" size="large" v-model="time" type="datetime" placeholder="选择时间">
                    </el-date-picker>
                </div>

            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">名称：</div>
                    <input type="text" v-model="name" :disabled="useDisabled" class="form-control input-field" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">预防疾病：</div>
                    <input type="text" v-model="preventDisease" :disabled="useDisabled" class="form-control input-field" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">处理人：</div>
                    <el-select ref="selectPeople" :disabled="useDisabled" size="large" v-model="dealPeople" class="el-field-input" placeholder="请选择">
                        <el-option v-for="item in feederInfo" :key="item.userId" :label="item.realname" :value="item.userId">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">疫苗编号：</div>
                    <input type="text" :disabled="useDisabled" v-model="vaccineNum" class="form-control input-field" placeholder="请输入疫苗编号" />
                </div>
            </div>

        </div>
        <div class="content-footer row" v-show="!useDisabled">
            <el-button class="col-md-1 btn btn-primary makesure" :plain="true" @click="updateVacc">确定</el-button>
        </div>
    </div>
</template>

<script>
import { DatePicker, Button, Message, Select } from 'element-ui'
import hospitalSrv from '../../../services/hospital.service.js'
import horseSrv from '../../../services/horse.service.js'
export default {
    data() {
        return {
            useDisabled: false,
            address: '',
            name: '',
            time: '',
            dealPeople: '',
            preventDisease: '',
            vaccineNum: '',
            feederInfo: [],
            horseInfoName: [],
            horseName: '',
            vaccinationId: ''
        }
    },
    beforeRouteEnter: function(to, from, next) {
        next(vm => {
            vm.vaccinationId = to.query.vaccinationId
            hospitalSrv.getVaccDetail(vm.vaccinationId).then(resp => {
                vm.time = resp.data.operateDate
                vm.horseName = resp.data.horseId
                vm.dealPeople = resp.data.userId
                vm.address = resp.data.operatePlace
                vm.name = resp.data.name
                vm.preventDisease = resp.data.vaccinationName
                vm.vaccineNum = resp.data.vaccinationNumber
            }, err => {
                vm.$message.error(err.msg)
            })
            horseSrv.getHorseName().then(
                resp => {
                    vm.horseInfoName = resp.data.horseList;
                },
                err => {
                    vm.$message.error(err.msg);
                }
            );
            hospitalSrv.getFeeder().then(
                resp => {
                    vm.feederInfo = resp.data.veterinarianList;
                },
                err => {
                    vm.$message.error(err.msg);
                }
            );
        });
    },
    mounted() {
        this.useDisabled = !!this.$route.query.disable;
        this.$el.addEventListener('animationend', this.resizeHorse)
        this.$el.addEventListener('animationend', this.resizePeople)
    },
    methods: {
        updateVacc() {
            if (!(this.dealPeople && this.horseName && this.time && this.address
                && this.name && this.preventDisease && this.vaccineNum)) {
                this.$message.error('接种疫苗信息不能为空！')
                return;
            }
            let vaccInfo = {
                vaccinationId: this.vaccinationId,
                userId: this.dealPeople,
                horseId: this.horseName,
                operateDate: this.time,
                operatePlace: this.address,
                name: this.name,
                vaccinationName: this.preventDisease,
                vaccinationNumber: this.vaccineNum
            }
            hospitalSrv.updateVacc(vaccInfo).then((resp) => {
                this.$message.success('修改疫苗信息成功')
                this.$router.push('/hospital/Vaccination')
            }, (err) => {
                this.$message.error(err.msg)
            })
        },
        resizeHorse() {
            this.$refs.selectHorse.resetInputWidth()
        },
        resizePeople() {
            this.$refs.selectPeople.resetInputWidth()
        },
    }
}
</script>

<style lang="scss" scoped>

</style>

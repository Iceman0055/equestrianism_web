<template>
    <div class="content_page animated zoomIn">
        <div class="content-title">
            <div class="title" v-if="!useDisabled">修改挫牙</div>
            <div class="title" v-if="useDisabled">查看挫牙</div>
            <router-link class="btn btn-info back" :to="'/hospital/teeth'">
                返回
            </router-link>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">时间：</div>
                    <el-date-picker class="el-field-input" :disabled="useDisabled" format="yyyy-MM-dd HH:mm:00" value-format="yyyy-MM-dd HH:mm:00" size="large" v-model="time" type="datetime">
                    </el-date-picker>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">马匹：</div>
                    <el-select ref="selectHorse" :disabled="useDisabled" size="large" filterable v-model="horseName" class="el-field-input" placeholder="请选择马匹名称">
                        <el-option v-for="item in horseInfoName" :key="item.horseId" :label="item.horseName" :value="item.horseId">
                        </el-option>
                    </el-select>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">操作人：</div>
                     <el-select ref="selectPeople" size="large" :disabled="useDisabled" v-model="operatePeople" class="el-field-input">
                        <el-option v-for="item in feederInfo" :key="item.userId" :label="item.realname" :value="item.userId">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">备注：</div>
                    <input type="text" v-model="remark" :disabled="useDisabled" class="form-control input-field" />
                </div>
            </div>
        </div>
        <div class="content-footer row" v-show="!useDisabled">
            <el-button class="col-md-1 btn btn-primary makesure" :plain="true" @click="updateTeeth">确定</el-button>
        </div>
    </div>
</template>

<script>
import { DatePicker, Button, Select, Message } from 'element-ui'
import hospitalSrv from '../../../services/hospital.service.js'
import horseSrv from '../../../services/horse.service.js'
export default {
    data() {
        return {
            useDisabled: false,
            time: '',
            horseName: '',
            operatePeople: '',
            horseInfoName: [],
            contusionTeethId: '',
            feederInfo:[],
            remark:'',
        }
    },
    beforeRouteEnter: function(to, from, next) {
        next(vm => {
            vm.contusionTeethId = to.query.contusionTeethId
            hospitalSrv.getTeethDetail(vm.contusionTeethId).then(resp => {
                vm.time = resp.data.operateDate
                vm.horseName = resp.data.horseId
                vm.operatePeople = resp.data.userId
                vm.remark = resp.data.remark
            }, err => {
                vm.$message.error(err.msg)
            })
            horseSrv.getHorseName().then((resp) => {
                vm.horseInfoName = resp.data.horseList
            }, (err) => {
                vm.$message.error(err.msg)
            })
            hospitalSrv.getFeeder().then(resp => {
                vm.feederInfo = resp.data.veterinarianList
            }, err => {
                vm.$message.error(err.msg)
            })
        })
    },
    mounted() {
        this.useDisabled = !!this.$route.query.disable;
        this.$el.addEventListener('animationend', this.resizeHorse)
        this.$el.addEventListener('animationend', this.resizePeople)
    },
    methods: {
        updateTeeth() {
            if (!(this.time && this.horseName && this.operatePeople&& this.remark)) {
                this.$message.error('挫牙信息不能为空！')
                return;
            }
            let teethInfo = {
                contusionTeethId: this.contusionTeethId,
                operateDate: this.time,
                horseId: this.horseName,
                userId: this.operatePeople,
                remark:this.remark
            }
            hospitalSrv.updateTeeth(teethInfo).then((resp) => {
                this.$message.success('修改挫牙成功')
                this.$router.push('/hospital/teeth')
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

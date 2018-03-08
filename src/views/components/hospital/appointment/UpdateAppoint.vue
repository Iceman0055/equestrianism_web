<template>
    <div class="content_page animated zoomIn">
        <div class="content-title">
            <div class="title">修改预约日程</div>
            <router-link class="btn btn-info back" :to="'/hospital/appointment'">
                返回
            </router-link>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">预约时间：</div>
                    <el-date-picker v-model="appointDate" :disabled="useDisabled" format="yyyy-MM-dd HH:mm:00" value-format="yyyy-MM-dd HH:mm:00" size="large" type="datetime">
                    </el-date-picker>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">预约医生：</div>
                    <el-select ref="selectDoctor" size="large" v-model="doctor" :disabled="useDisabled" class="el-field-input" placeholder="请选择">
                        <el-option v-for="item in doctorList" :key="item.userId" :label="item.realname" :value="item.userId">
                        </el-option>
                    </el-select>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">预约状态：</div>
                    <el-select ref="selectStatus" size="large" v-model="appointStatus" :disabled="useDisabled" class="el-field-input" placeholder="请选择">
                        <el-option v-for="item in statusList" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">预约号：</div>
                    <input type="text" v-model="appointNumber" :disabled="useDisabled" class="form-control input-field" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">预约描述：</div>
                    <input type="text" v-model="appointDesc" :disabled="useDisabled" class="form-control input-field" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">联系人：</div>
                    <input type="text" v-model="contactPer" :disabled="useDisabled" class="form-control input-field" />
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">联系方式：</div>
                    <input type="text" v-model="contactWay" :disabled="useDisabled" class="form-control input-field" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">备注：</div>
                    <input type="text" v-model="note" :disabled="useDisabled" class="form-control input-field" />
                </div>
            </div>
        </div>
        <div class="content-footer row" v-show="!useDisabled">
            <el-button class="col-md-1 btn btn-primary makesure" :plain="true" @click="updateAppoint">确定</el-button>
        </div>
    </div>
</template>
<script>
import { DatePicker, Button, Message } from "element-ui";
import hospitalSrv from '../../../services/hospital.service.js'
/* eslint-disable */
export default {
    data() {
        return {
            appointNumber: '',
            appointDate: '',
            appointDesc: '',
            note: '',
            contactPer: '',
            contactWay: '',
            doctorList: [],
            doctor: '',
            appointStatus: '',
            appointInfo: {},
            useDisabled: false,
            hospitalAppointId: '',
            statusList: [{
                value: '1',
                label: '已预约'
            }, {
                value: '2',
                label: '已治疗'
            }, {
                value: '3',
                label: '取消'
            }],
            convertStatus: {
                "1": "已预约",
                "2": "已治疗",
                "3": "取消",
            }

        };
    },
    beforeRouteEnter: function(to, from, next) {
        next(vm => {
            vm.hospitalAppointId = to.query.hospitalAppointId
            hospitalSrv.getAppointDetail(vm.hospitalAppointId).then(resp => {
                vm.appointDate = resp.data.appointDate
                vm.doctor = resp.data.userId
                vm.appointDesc = resp.data.appointDesc
                vm.contactPer = resp.data.contacts
                vm.contactWay = resp.data.contactWay
                vm.note = resp.data.remark
                vm.appointNumber = resp.data.appointNumber
                vm.appointStatus = resp.data.appointStatus
            }, err => {
                vm.$message.error(err.msg)
            })
            hospitalSrv.getDoctor().then((resp) => {
                vm.doctorList = resp.data.veterinarianList
            }, (err) => {
                vm.$message.error(err.msg)
            })
        })
    },
    components: {
        "el-date-picker": DatePicker,
        "el-button": Button,
    },
    mounted() {
        this.useDisabled = !!this.$route.query.disable
        this.$el.addEventListener('animationend', this.resizeDoctor)
        this.$el.addEventListener('animationend', this.resizeStatus)
    },
    methods: {
        updateAppoint() {
            if (!(this.appointDate && this.doctor && this.appointStatus && this.appointNumber && this.appointDesc && this.note)) {
                this.$message.error('预约日程信息不能为空！')
                return;
            }
            this.appointInfo = {
                hospitalAppointId: this.hospitalAppointId,
                userId: this.doctor,
                appointDate: this.appointDate,
                contacts: this.contactPer,
                contactWay: this.contactWay,
                appointNumber: this.appointNumber,
                appointDesc: this.appointDesc,
                remark: this.note,
                appointStatus: this.appointStatus,
            }
            hospitalSrv.updateAppoint(this.appointInfo).then((resp) => {
                this.$message.success('修改预约日程成功')
                this.$router.push('/hospital/appointment')
            }, (err) => {
                this.$message.error(err.msg)
            })
        },
        resizeDoctor() {
            this.$refs.selectDoctor.resetInputWidth()
        },
        resizeStatus() {
            this.$refs.selectStatus.resetInputWidth()
        },

    }
};
</script>

<style lang="scss" scoped>

</style>

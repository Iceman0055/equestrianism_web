<template>
    <div class="content_page animated zoomIn">
        <div class="content-title">
            <div class="title" v-if="!useDisabled">修改诊疗室信息</div>
            <div class="title" v-if="useDisabled">查看诊疗室信息</div>
            <router-link class="btn btn-info back" :to="'/hospital/operateRoom'">
                返回
            </router-link>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">诊疗室名称：</div>
                    <input type="text" v-model="name" :disabled="useDisabled" class="form-control input-field" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">诊疗室简称：</div>
                    <input type="text" v-model="shortName" :disabled="useDisabled" class="form-control" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">备注：</div>
                    <input type="text" v-model="remark" :disabled="useDisabled" class="form-control" />

                </div>
            </div>
        </div>
        <div class="content-footer row" v-show="!useDisabled">
            <el-button class="col-md-1 btn btn-primary makesure" :plain="true" @click="updateOperateRoom">确定</el-button>
        </div>
    </div>
</template>

<script>
import { DatePicker, Button, Message } from 'element-ui'
import hospitalSrv from '../../../services/hospital.service.js'
export default {
    data() {
        return {
            name: '',
            shortName: '',
            useDisabled: false,
            remark: '',
            consultingRoomId: '',
        }
    },
    beforeRouteEnter: function(to, from, next) {
        next(vm => {
            vm.consultingRoomId = to.query.consultingRoomId
            hospitalSrv.operateRoomDetail(vm.consultingRoomId).then(resp => {
                vm.name = resp.data.name
                vm.shortName = resp.data.shortName
                vm.remark = resp.data.remark
            }, err => {
                vm.$message.error(err.msg)
            })
        })
    },
    mounted() {
        this.useDisabled = !!this.$route.query.disable
    },
    components: {
        'el-date-picker': DatePicker,
        'el-button': Button,
    },
    methods: {
        updateOperateRoom() {
            if (!(this.name && this.shortName && this.remark)) {
                this.$message.error('诊疗室信息不能为空！')
                return;
            }
            let operateInfo = {
                consultingRoomId: this.consultingRoomId,
                name: this.name,
                shortName: this.shortName,
                remark: this.remark,
            }
            hospitalSrv.updateOperateRoom(operateInfo).then((resp) => {
                this.$message.success('修改诊疗室成功')
                this.$router.push('/hospital/operateRoom')
            }, (err) => {
                this.$message.error(err.msg)
            })
        },
    }
}
</script>

<style lang="scss" scoped>

</style>

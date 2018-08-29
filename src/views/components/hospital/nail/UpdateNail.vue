<template>
    <div class="content_page animated zoomIn">
        <div class="content-title">
            <div class="title" v-if="!useDisabled">修改钉甲</div>
            <div class="title" v-if="useDisabled">查看钉甲</div>
            <router-link class="btn btn-info back" :to="'/hospital/nail'">
                返回
            </router-link>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">时间：</div>
                    <el-date-picker class="el-field-input" format="yyyy-MM-dd HH:mm:00" value-format="yyyy-MM-dd HH:mm:00" :disabled="useDisabled" size="large" v-model="time" type="datetime">
                    </el-date-picker>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">马匹：</div>
                    <el-select ref="selectHorse" :disabled="useDisabled" size="large" filterable v-model="horseName" class="el-field-input">
                        <el-option v-for="(item,index) in horseInfoName" :key="index" :label="item.horseName" :value="item.horseId">
                        </el-option>
                    </el-select>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">操作人：</div>
                    <el-select ref="selectPeople" size="large" :disabled="useDisabled" v-model="operatePeople" class="el-field-input">
                        <el-option v-for="(item,index) in feederInfo" :key="index" :label="item.realname" :value="item.userId">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">备注：</div>
                    <input type="text" :disabled="useDisabled" v-model="remark" class="form-control input-field" placeholder="请输入备注" />
                </div>
            </div>
        </div>
        <div class="content-footer row" v-show="!useDisabled">
            <el-button class="col-md-1 btn btn-primary makesure" :plain="true" @click="updateNail">确定</el-button>
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
            remark:'',
            horseName: '',
            operatePeople: '',
            horseInfoName: [],
            brigandineId: '',
            feederInfo: [],
        }
    },
    beforeRouteEnter: function(to, from, next) {
        next(vm => {
            vm.brigandineId = to.query.brigandineId
            hospitalSrv.getNailDetail(vm.brigandineId).then(resp => {
                vm.time = resp.data.brigandineDate
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
        updateNail() {
            if (!(this.time && this.horseName && this.operatePeople&& this.remark)) {
                this.$message.error('钉甲信息不能为空！')
                return;
            }
            let nailInfo = {
                brigandineId: this.brigandineId,
                time: this.brigandineDate,
                horseName: this.horseId,
                operatePeople: this.userId,
                remark:this.remark
            }
            hospitalSrv.updateNail(nailInfo).then((resp) => {
                this.$message.success('修改钉甲成功')
                this.$router.push('/hospital/nail')
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

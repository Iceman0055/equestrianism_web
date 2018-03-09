<template>
    <div class="content_page animated zoomIn">
        <div class="content-title">
            <div class="title">新增挫牙</div>
            <router-link class="btn btn-info back" :to="'/hospital/teeth'">
                返回
            </router-link>
        </div>
        <div class="content-show">

            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">时间：</div>
                    <el-date-picker class="el-field-input" size="large" v-model="time" type="date" placeholder="选择日期">
                    </el-date-picker>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">马匹：</div>
                    <el-select ref="selectHorse" size="large" filterable v-model="horseName" class="el-field-input" placeholder="请选择马匹名称">
                        <el-option v-for="item in horseInfoName" :key="item.horseId" :label="item.horseName" :value="item.horseId">
                        </el-option>
                    </el-select>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">操作人：</div>
                   <el-select ref="selectPeople" size="large" v-model="operatePeople" class="el-field-input" placeholder="请选择">
                        <el-option v-for="item in feederInfo" :key="item.userId" :label="item.realname" :value="item.userId">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">备注：</div>
                    <input type="text" v-model="remark" class="form-control input-field" placeholder="请输入备注" />
                </div>
            </div>
        </div>
        <div class="content-footer row">
            <el-button class="col-md-1 btn btn-primary makesure" :plain="true" @click="addTeeth">确定</el-button>
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
            time: '',
            horseName: '',
            operatePeople: '',
            teethInfo:{},
            horseInfoName: [],
            remark:'',
        }
    },
    beforeRouteEnter: function(to, from, next) {
        next(vm => {
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
        this.$el.addEventListener('animationend', this.resizeHorse)
        this.$el.addEventListener('animationend', this.resizePeople)
    },
    components: {
        'el-date-picker': DatePicker,
        'el-button': Button,
        "el-select": Select
    },
    methods: {
        addTeeth() {
            if (!(this.time && this.horseName && this.operatePeople && this.remark)) {
                this.$message.error('挫牙信息不能为空！')
                return;
            }
            this.teethInfo = {
                time: this.time,
                horseName: this.horseName,
                operatePeople: this.operatePeople,
                remark:this.remark
            }
            hospitalSrv.addTeeth(this.teethInfo).then((resp) => {
                this.$message.success('添加挫牙成功')
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

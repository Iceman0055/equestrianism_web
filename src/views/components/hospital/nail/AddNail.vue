<template>
    <div class="content_page animated zoomIn">
        <div class="content-title">
            <div class="title" v-if="useDisabled">查看钉甲</div>
            <div class="title" v-if="!useDisabled &&queryId">修改钉甲</div>
            <div class="title" v-if="!queryId">新增钉甲</div>
            <router-link class="btn btn-info back" :to="'/hospital/nail'">
                返回
            </router-link>
        </div>
        <div class="content-show">
            <el-form :model="hospitalInfo" label-width="120px" ref="hospitalInfo" class="demo-ruleForm" inline-message>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="时间：" prop="brigandineDate" :rules="[{ required: true, message: '请选择时间', trigger: 'change' },
                                                                                                                                                                ]">
                            <el-date-picker :disabled="useDisabled" class="el-field-input" format="yyyy-MM-dd HH:mm:00" value-format="yyyy-MM-dd HH:mm:00" size="large" v-model="hospitalInfo.brigandineDate" type="datetime" placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="马匹：" prop="horseId" :rules="[{ required: true, message: '请选择马匹', trigger: 'change' }, ]">
                            <el-select :disabled="useDisabled" ref="selectHorse" size="large" filterable v-model="hospitalInfo.horseId" class="el-field-input" placeholder="请选择马匹名称">
                                <el-option v-for="(item,index) in horseInfoName" :key="index" :label="item.horseName" :value="item.horseId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="操作人：" prop="userId" :rules="[ { required: true, message: '请选择操作人', trigger: 'change' }, ]">
                            <el-select :disabled="useDisabled" ref="selectPeople" size="large" v-model="hospitalInfo.userId" class="el-field-input" placeholder="请选择">
                                <el-option v-for="(item,index) in feederInfo" :key="index" :label="item.realname" :value="item.userId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="备注：" prop="remark">
                            <el-input size="large" :disabled="useDisabled" v-model="hospitalInfo.remark" placeholder="请输入备注"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div class="content-footer row" v-show="!useDisabled">
            <el-button v-if="!queryId" class="col-md-1 btn btn-primary makesure" :plain="true" @click="addNail('hospitalInfo')">确定</el-button>
            <el-button v-if="queryId" class="col-md-1 btn btn-primary makesure" :plain="true" @click="updateNail('hospitalInfo')">修改</el-button>
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
            hospitalInfo: {
                brigandineDate: '',
                horseId: '',
                userId: '',
                remark: ''
            },
            queryId: '',
            useDisabled: false,
            horseInfoName: [],
            feederInfo: []
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
            if (to.query.queryId) {
                vm.queryId = to.query.queryId
                hospitalSrv.getNailDetail(vm.queryId).then(resp => {
                    vm.hospitalInfo = resp.data
                }, err => {
                    vm.$message.error(err.msg)
                })
            }
        })
    },
    beforeRouteLeave(to, from, next) {
        to.meta.keepAlive = true
        next()
    },
    mounted() {
        this.useDisabled = !!this.$route.query.disable;
        this.$el.addEventListener('animationend', this.resizeHorse)
        this.$el.addEventListener('animationend', this.resizePeople)
    },
    methods: {
        //新增
        addNail(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    hospitalSrv.addNail(this.hospitalInfo).then((resp) => {
                        this.$message.success('添加钉甲成功')
                        this.$router.push('/hospital/nail')
                    }, (err) => {
                        this.$message.error(err.msg)
                    })
                } else {
                    return false;
                }
            });
        },
        //修改
        updateNail(formName) {
            this.hospitalInfo.brigandineId = this.queryId
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    hospitalSrv.updateNail(this.hospitalInfo).then((resp) => {
                        this.$message.success('修改钉甲成功')
                        this.$router.push('/hospital/nail')
                    }, (err) => {
                        this.$message.error(err.msg)
                    })
                } else {
                    return false;
                }
            });
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

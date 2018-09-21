<template>
    <div class="content_page animated zoomIn">
        <div class="content-title">
            <div class="title" v-if="useDisabled">查看诊疗室信息</div>
            <div class="title" v-if="!useDisabled &&queryId">修改诊疗室信息</div>
            <div class="title" v-if="!queryId">新增诊疗室信息</div>
            <router-link class="btn btn-info back" :to="'/hospital/operateRoom'">
                返回
            </router-link>
        </div>
        <div class="content-show">
            <el-form :model="hospitalInfo" label-width="120px" ref="hospitalInfo" class="demo-ruleForm" inline-message>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="诊疗室名称：" prop="name" :rules="[ { required: true, message: '请输入诊疗室名称', trigger: 'blur' }, ]">
                            <el-input size="large" :disabled="useDisabled" v-model="hospitalInfo.name" placeholder="请输入诊疗室名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="诊疗室简称：" prop="shortName" :rules="[ { required: true, message: '请输入诊疗室简称', trigger: 'blur' }, ]">
                            <el-input size="large" :disabled="useDisabled" v-model="hospitalInfo.shortName" placeholder="请输入诊疗室简称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="备注：" prop="remark">
                            <el-input size="large" :disabled="useDisabled" v-model="hospitalInfo.remark" placeholder="请输入备注"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div class="content-footer row" v-show="!useDisabled">
            <el-button v-if="!queryId" class="col-md-1 btn btn-primary makesure" :plain="true" @click="addOperateRoom('hospitalInfo')">确定</el-button>
            <el-button v-if="queryId" class="col-md-1 btn btn-primary makesure" :plain="true" @click="updateOperateRoom('hospitalInfo')">修改</el-button>
        </div>
    </div>
</template>

<script>
import { DatePicker, Button, Message, Form } from 'element-ui'
import hospitalSrv from '../../../services/hospital.service.js'
export default {
    data() {
        return {
            hospitalInfo: {
                name: '',
                shortName: '',
                remark: '',
            },
            queryId: "",
            useDisabled: false,
        }
    },
    beforeRouteEnter: function(to, from, next) {
        next(vm => {
            if (to.query.queryId) {
                vm.queryId = to.query.queryId
                hospitalSrv.operateRoomDetail(vm.queryId).then(resp => {
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
    },
    methods: {
        //新增
        addOperateRoom(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    hospitalSrv.addOperateRoom(this.hospitalInfo).then((resp) => {
                        this.$message.success('添加诊疗室成功')
                        this.$router.push('/hospital/operateRoom')
                    }, (err) => {
                        this.$message.error(err.msg)
                    })
                } else {
                    return false;
                }
            });
        },
        //修改
        updateOperateRoom(formName) {
            delete this.hospitalInfo.status
            this.hospitalInfo.consultingRoomId = this.queryId
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    hospitalSrv.updateOperateRoom(this.hospitalInfo).then((resp) => {
                        this.$message.success('修改诊疗室成功')
                        this.$router.push('/hospital/operateRoom')
                    }, (err) => {
                        this.$message.error(err.msg)
                    })
                } else {
                    return false;
                }
            });
        },

    }
}
</script>

<style lang="scss" scoped>

</style>

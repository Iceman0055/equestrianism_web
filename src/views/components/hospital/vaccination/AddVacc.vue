<template>
    <div class="content_page animated zoomIn">
        <div class="content-title">
            <div class="title" v-if="useDisabled">查看接种疫苗信息</div>
            <div class="title" v-if="!useDisabled &&queryId">修改接种疫苗信息</div>
            <div class="title" v-if="!queryId">新增接种疫苗信息</div>
            <router-link class="btn btn-info back" :to="'/hospital/Vaccination'">
                返回
            </router-link>
        </div>
        <div class="content-show">
            <el-form :model="hospitalInfo" label-width="120px" ref="hospitalInfo" class="demo-ruleForm" inline-message>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="马匹名称：" prop="horseId" :rules="[{ required: true, message: '请选择马匹名称', trigger: 'change' },]">
                            <el-select ref="selectHorse" :disabled="useDisabled" size="large" filterable v-model="hospitalInfo.horseId" class="el-field-input" placeholder="请选择马匹名称">
                                <el-option v-for="(item,index) in horseInfoName" :key="index" :label="item.horseName" :value="item.horseId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="地点：" prop="operatePlace" :rules="[{ required: true, message: '请输入地点', trigger: 'blur' },]">
                            <el-input size="large" :disabled="useDisabled" v-model="hospitalInfo.operatePlace" placeholder="请输入地点"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="时间："  prop="operateDate" :rules="[ { required: true, message: '请选择时间', trigger: 'change' }, ]">
                            <el-date-picker :disabled="useDisabled" class="el-field-input" format="yyyy-MM-dd HH:mm:00" value-format="yyyy-MM-dd HH:mm:00" size="large" v-model="hospitalInfo.operateDate" type="datetime" placeholder="选择时间">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="名称：" prop="name" :rules="[{ required: true, message: '请输入名称', trigger: 'blur' },]">
                            <el-input size="large" :disabled="useDisabled" v-model="hospitalInfo.name" placeholder="请输入名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="预防疾病：" prop="vaccinationName" :rules="[{ required: true, message: '请输入预防疾病', trigger: 'blur' },]">
                            <el-input size="large" :disabled="useDisabled" v-model="hospitalInfo.vaccinationName" placeholder="请输入预防疾病"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="处理人：" prop="userId" :rules="[ { required: true, message: '请选择处理人', trigger: 'change' }, ]">
                            <el-select :disabled="useDisabled" ref="selectPeople" size="large" v-model="hospitalInfo.userId" class="el-field-input" placeholder="请选择处理人">
                                <el-option v-for="(item,index) in feederInfo" :key="index" :label="item.realname" :value="item.userId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="疫苗编号：" prop="vaccinationNumber" :rules="[{ required: true, message: '请输入疫苗编号', trigger: 'blur' },]">
                            <el-input size="large" :disabled="useDisabled" v-model="hospitalInfo.vaccinationNumber" placeholder="请输入疫苗编号"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div class="content-footer row" v-show="!useDisabled">
            <el-button v-if="!queryId" class="col-md-1 btn btn-primary makesure" :plain="true" @click="addVacc('hospitalInfo')">确定</el-button>
            <el-button v-if="queryId" class="col-md-1 btn btn-primary makesure" :plain="true" @click="updateVacc('hospitalInfo')">修改</el-button>
        </div>
    </div>
</template>

<script>
import { DatePicker, Button, Select, Message } from "element-ui";
import hospitalSrv from "../../../services/hospital.service.js";
import horseSrv from '../../../services/horse.service.js'
export default {
    data() {
        return {
            hospitalInfo: {
                userId: '',
                horseId: '',
                operateDate: '',
                operatePlace: '',
                name: '',
                vaccinationName: '',
                vaccinationNumber: ''
            },
            horseInfoName: [],
            feederInfo: [],
            queryId: "",
            useDisabled: false
        };
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
    beforeRouteEnter: function(to, from, next) {
        next(vm => {
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
            if (to.query.queryId) {
                vm.queryId = to.query.queryId
                hospitalSrv.getVaccDetail(vm.queryId).then(resp => {
                    vm.hospitalInfo = resp.data
                }, err => {
                    vm.$message.error(err.msg)
                })
            }
        });
    },
    methods: {
        //新增
        addVacc(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    hospitalSrv.addVacc(this.hospitalInfo).then((resp) => {
                        this.$message.success('添加疫苗信息成功')
                        this.$router.push('/hospital/Vaccination')
                    }, (err) => {
                        this.$message.error(err.msg)
                    })
                } else {
                    return false;
                }
            });
        },
        //修改
        updateVacc(formName) {
            this.hospitalInfo.vaccinationId = this.queryId
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    hospitalSrv.updateVacc(this.hospitalInfo).then((resp) => {
                        this.$message.success('修改疫苗信息成功')
                        this.$router.push('/hospital/Vaccination')
                    }, (err) => {
                        this.$message.error(err.msg)
                    })
                } else {
                    return false;
                }
            });
        },
        // addVacc() {
        //     if (!(this.dealPeople && this.horseName && this.time && this.address
        //         && this.name && this.preventDisease && this.vaccineNum)) {
        //         this.$message.error('接种疫苗信息不能为空！')
        //         return;
        //     }
        //     let vaccInfo = {
        //         userId: this.dealPeople,
        //         horseId: this.horseName,
        //         operateDate: this.time,
        //         operatePlace: this.address,
        //         name: this.name,
        //         vaccinationName: this.preventDisease,
        //         vaccinationNumber: this.vaccineNum
        //     }
        //     hospitalSrv.addVacc(vaccInfo).then((resp) => {
        //         this.$message.success('添加疫苗信息成功')
        //         this.$router.push('/hospital/Vaccination')
        //     }, (err) => {
        //         this.$message.error(err.msg)
        //     })
        // },
        resizeHorse() {
            this.$refs.selectHorse.resetInputWidth()
        },
        resizePeople() {
            this.$refs.selectPeople.resetInputWidth()
        },
    }
};
</script>

<style lang="scss" scoped>

</style>

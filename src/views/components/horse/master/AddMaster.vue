<template>
    <div class="content_page animated zoomIn">
        <div class="content-title">
            <div class="title" v-if="useDisabled">查看马主信息</div>
            <div class="title" v-if="!useDisabled &&queryId">修改马主信息</div>
            <div class="title" v-if="!queryId">新增马主信息</div>
            <router-link class="btn btn-info back" :to="'/horse/master'">
                返回
            </router-link>
        </div>
        <div class="content-show">
            <el-form :model="horseInfo" label-width="120px" ref="horseInfo" class="demo-ruleForm" inline-message>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="姓名：" prop="hostName" :rules="[{ required: true, message: '请输入姓名', trigger: 'blur' },]">
                            <el-input size="large" :disabled="useDisabled" v-model="horseInfo.hostName" placeholder="请输入姓名"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="性别：" prop="sex" :rules="[{ required: true, message: '请输入马匹名称', trigger: 'blur' },  ]">
                            <el-select ref="selectSex" :disabled="useDisabled" size="large" v-model="horseInfo.sex" class="el-field-input" placeholder="请选择">
                                <el-option v-for="(item,index) in sexOptions" :key="index" :label="item.itemValue" :value="item.dictionaryDetailId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="职业：" prop="occupation" :rules="[ { required: true, message: '请输入职业', trigger: 'blur' },  ]">
                            <el-input size="large" :disabled="useDisabled" v-model="horseInfo.occupation" placeholder="请输入职业"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="联系方式：" prop="contactWay" :rules="[{ required: true, message: '请输入联系方式', trigger: 'blur' },]">
                            <el-input size="large" :disabled="useDisabled" v-model="horseInfo.contactWay" placeholder="请输入联系方式"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="住址：" prop="address" :rules="[ { required: true, message: '请输入住址', trigger: 'blur' },  ]">
                            <el-input size="large" :disabled="useDisabled" v-model="horseInfo.address" placeholder="请输入住址"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="马匹名称：" prop="horseId" :rules="[{ required: true, message: '请输入马匹名称', trigger: 'blur' },  ]">
                            <el-select ref="selectHorse" :disabled="useDisabled" filterable size="large" v-model="horseInfo.horseId" class="el-field-input" placeholder="请选择">
                                <el-option v-for="(item,index) in horseInfoName" :key="index" :label="item.horseName" :value="item.horseId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                </el-row>
            </el-form>
        </div>
        <div class="content-footer row" v-show="!useDisabled">
            <el-button v-if="!queryId" class="col-md-1 btn btn-primary makesure" :plain="true" @click="addMaster('horseInfo')">确定</el-button>
            <el-button v-if="queryId" class="col-md-1 btn btn-primary makesure" :plain="true" @click="updateMaster('horseInfo')">修改</el-button>

        </div>
    </div>
</template>

<script>
import { DatePicker, Button, Select, Message, Form } from 'element-ui'
import horseSrv from '../../../services/horse.service.js'
import systemSrv from '../../../services/system.service.js'
export default {
    data() {
        return {
            horseInfo: {
                hostName: '',
                sex: '',
                occupation: '',
                contactWay: '',
                address: '',
                horseId: '',
            },
            queryId: '',
            useDisabled: false,
            horseInfoName: [],
            sexOptions: [],
        }
    },
    beforeRouteEnter: function(to, from, next) {
        next(vm => {
            horseSrv.getHorseName().then((resp) => {
                vm.horseInfoName = resp.data.horseList
            }, (err) => {
                vm.$message.error(err.msg)
            })
            vm.queryId = to.query.queryId
            systemSrv.dictionary().then(resp => {
                let dictDetail = resp.data.dictionaryInfoList
                let len = dictDetail.length
                for (let i = 0; i < len; i++) {
                    if (dictDetail[i].typeCode == 'SEX') {
                        vm.sexOptions = dictDetail[i].dictionaryDetailList
                    }
                }
                if (vm.queryId) {
                    return horseSrv.getMasterDetail(vm.queryId);
                }
            }).then(resp => {
                vm.horseInfo = resp.data
                vm.horseInfo.sex = parseInt(resp.data.sex)
            }).catch(err => {
                vm.$message.error(err.msg)
            });
        })
    },
    beforeRouteLeave(to, from, next) {
        to.meta.keepAlive = true
        next()
    },
    mounted() {
        this.useDisabled = !!this.$route.query.disable
        this.$el.addEventListener('animationend', this.resizeSex)
        this.$el.addEventListener('animationend', this.resizeHorse)
    },
    methods: {
        //修改
        updateMaster(formName) {
            this.horseInfo.hostId = this.queryId
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    horseSrv.updateMaster(this.horseInfo).then((resp) => {
                        this.$message.success('修改马主信息成功')
                        this.$router.push('/horse/master')
                    }, (err) => {
                        this.$message.error(err.msg)
                    })
                } else {
                    return false;
                }
            });
        },
        addMaster(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    horseSrv.addMaster(this.horseInfo).then((resp) => {
                        this.$message.success('添加马主信息成功')
                        this.$router.push('/horse/master')
                    }, (err) => {
                        this.$message.error(err.msg)
                    })
                } else {
                    return false;
                }
            });
        },
        resizeSex() {
            this.$refs.selectSex.resetInputWidth()
        },
        resizeHorse() {
            this.$refs.selectHorse.resetInputWidth()
        },
    }
}
</script>
<style lang="scss" scoped>

</style>

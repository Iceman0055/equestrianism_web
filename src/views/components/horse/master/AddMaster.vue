<template>
    <div class="content_page animated zoomIn">
        <div class="content-title">
            <div class="title">新增马主信息</div>
            <router-link class="btn btn-info back" :to="'/horse/master'">
                返回
            </router-link>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">姓名：</div>
                    <input type="text" v-model="name" class="form-control input-field" placeholder="请输入姓名" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">性别：</div>
                    <el-select ref="selectSex" size="large" v-model="sex" class="el-field-input" placeholder="请选择">
                        <el-option v-for="item in sexOptions" :key="item.dictionaryDetailId" :label="item.itemValue" :value="item.dictionaryDetailId">
                        </el-option>
                    </el-select>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">职业：</div>
                    <input type="text" v-model="career" class="form-control input-field" placeholder="请输入职业" />
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">联系方式：</div>
                    <input type="text" v-model="contact" class="form-control input-field" placeholder="请输入联系方式" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">住址：</div>
                    <input type="text" v-model="address" class="form-control input-field" placeholder="请输入住址" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">马匹名称：</div>
                    <el-select ref="selectHorse" filterable size="large" v-model="horseName" class="el-field-input" placeholder="请选择">
                        <el-option v-for="item in horseInfoName" :key="item.horseId" :label="item.horseName" :value="item.horseId">
                        </el-option>
                    </el-select>
                </div>
            </div>
        </div>
        <div class="content-footer row">
            <el-button class="col-md-1 btn btn-primary makesure" :plain="true" @click="addMaster">确定</el-button>
        </div>
    </div>
</template>

<script>
import { DatePicker, Button, Select, Message } from 'element-ui'
import horseSrv from '../../../services/horse.service.js'
import systemSrv from '../../../services/system.service.js'
export default {
    data() {
        return {
            career: '',
            contact: '',
            address: '',
            name: '',
            sex: '',
            horseName: '',
            horseInfoName: [],
            sexOptions: [],
        }
    },
    components: {
        'el-date-picker': DatePicker,
        'el-button': Button,
        "el-select": Select
    },
    beforeRouteEnter: function(to, from, next) {
        next(vm => {
            horseSrv.getHorseName().then((resp) => {
                vm.horseInfoName = resp.data.horseList
            }, (err) => {
                vm.$message.error(err.msg)
            })
            systemSrv.dictionary().then(resp => {
                let dictDetail = resp.data.dictionaryInfoList
                let len = dictDetail.length
                for (let i = 0; i < len; i++) {
                    if (dictDetail[i].typeCode == 'SEX') {
                        vm.sexOptions = dictDetail[i].dictionaryDetailList
                    }
                }
            }, err => {
                vm.$message.error(err.msg)
            })
        })
    },
    mounted() {
        this.$el.addEventListener('animationend', this.resizeSex)
        this.$el.addEventListener('animationend', this.resizeHorse)
    },
    methods: {
        addMaster() {
            if (!(this.name && this.sex && this.career && this.contact && this.address && this.horseName)) {
                this.$message.error('马主信息不能为空！')
                return;
            }
           let masterInfo = {
                hostName: this.name,
                sex: this.sex,
                occupation: this.career,
                contactWay: this.contact,
                address: this.address,
                horseId: this.horseName,
            }
            horseSrv.addMaster(masterInfo).then((resp) => {
                this.$message.success('添加马主信息成功')
                this.$router.push('/horse/master')
            }, (err) => {
                this.$message.error(err.msg)
            })
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

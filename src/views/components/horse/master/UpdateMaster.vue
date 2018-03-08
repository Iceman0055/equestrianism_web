<template>
    <div class="content_page animated zoomIn">
        <div class="content-title">
            <div class="title" v-if="!useDisabled">修改马主信息</div>
            <div class="title" v-if="useDisabled">查看马主信息</div>
            <router-link class="btn btn-info back" :to="'/horse/master'">
                返回
            </router-link>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">姓名：</div>
                    <input type="text" v-model="name" :disabled="useDisabled" class="form-control input-field" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">性别：</div>
                    <el-select ref="selectInput" size="large" :disabled="useDisabled" v-model="sex" class="el-field-input">
                        <el-option v-for="item in sexOptions" :key="item.dictionaryDetailId" :label="item.itemValue" :value="item.dictionaryDetailId">
                        </el-option>
                    </el-select>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">职业：</div>
                    <input type="text" v-model="career" :disabled="useDisabled" class="form-control input-field" />
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">联系方式：</div>
                    <input type="text" v-model="contact" :disabled="useDisabled" class="form-control input-field" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">住址：</div>
                    <input type="text" v-model="address" :disabled="useDisabled" class="form-control input-field" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">马匹名称：</div>
                    <el-select size="large" filterable :disabled="useDisabled" v-model="horseName" class="el-field-input">
                        <el-option v-for="item in horseInfoName" :key="item.horseId" :label="item.horseName" :value="item.horseId">
                        </el-option>
                    </el-select>
                </div>
            </div>
        </div>
        <div class="content-footer row" v-show="!useDisabled">
            <el-button class="col-md-1 btn btn-primary makesure" :plain="true" @click="updateMaster">确定</el-button>
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
            useDisabled: false,
            horseInfoName: [],
            sexOptions: [],
            masterInfo: {},
            hostId: '',
            dictInfoList: {},
            dictionaryInfoList: []
        }
    },
    mounted() {
        this.useDisabled = !!this.$route.query.disable
        this.$el.addEventListener('animationend', this.resizeSelect)
    },
    beforeRouteEnter: function(to, from, next) {
        next(vm => {
            vm.hostId = to.query.hostId
            systemSrv.dictionary().then(resp => {
                vm.dictionaryInfoList = resp.data.dictionaryInfoList
                vm.sexOptions = resp.data.dictionaryInfoList[2].dictionaryDetailList
                vm.dictInfoList = systemSrv.formatDic(vm.dictionaryInfoList);
                return horseSrv.getMasterDetail(to.query.hostId);
            }).then(resp => {
                vm.name = resp.data.hostName
                vm.sex = resp.data.sex
                vm.career = resp.data.occupation
                vm.contact = resp.data.contactWay
                vm.address = resp.data.address
                vm.horseName = resp.data.horseId
            }).catch(err => {
                vm.$message.error(err.msg)
            });

            horseSrv.getHorseName().then((resp) => {
                vm.horseInfoName = resp.data.horseList
            }, (err) => {
                vm.$message.error(err.msg)
            })

        })
    },
    methods: {
        resizeSelect() {
            this.$refs.selectInput.resetInputWidth()
        },
        updateMaster() {
            if (!(this.name && this.sex && this.career && this.contact && this.address && this.horseName)) {
                this.$message.error('马主信息不能为空！')
                return;
            }
            this.masterInfo = {
                hostId: this.hostId,
                hostName: this.name,
                sex: this.sex,
                occupation: this.career,
                contactWay: this.contact,
                address: this.address,
                horseId: this.horseName,
            }
            horseSrv.updateMaster(this.masterInfo).then((resp) => {
                this.$message.success('修改马主信息成功')
                this.$router.push('/horse/master')
            }, (err) => {
                this.$message.error(err.msg)
            })
        },
    },
    components: {
        'el-date-picker': DatePicker,
        'el-button': Button,
        "el-select": Select
    },
}
</script>

<style lang="scss" scoped>

</style>

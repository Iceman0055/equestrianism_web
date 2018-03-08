<template>
    <div class="content_page animated zoomIn">
        <div class="content-title">
            <div class="title" v-if="!useDisabled">修改部门信息</div>
            <div class="title" v-if="useDisabled">查看部门信息</div>
            <router-link class="btn btn-info back" :to="'/system/department'">
                返回
            </router-link>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">部门名称</div>
                    <input type="text" v-model="departName" :disabled="useDisabled" class="form-control input-field" />

                </div>
                <div class="col-md-4 search-field">
                    <div class="label">部门简称：</div>
                    <input type="text" v-model="departShortName" :disabled="useDisabled" class="form-control input-field" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">备注：</div>
                    <input type="text" v-model="note" :disabled="useDisabled" class="form-control input-field" />
                </div>
            </div>
        </div>
        <div class="content-footer row" v-show="!useDisabled">
            <el-button class="col-md-1 btn btn-primary makesure" :plain="true" @click="updateDepart">确定</el-button>
        </div>
    </div>
</template>

<script>
import { DatePicker, Button } from 'element-ui'
import systemSrv from '../../../services/system.service.js'
export default {
    data() {
        return {
            departName: '',
            departShortName: '',
            note: '',
            useDisabled: false,
        }
    },
    components: {
        'el-date-picker': DatePicker,
        'el-button': Button,
    },
    mounted() {
        this.useDisabled = !!this.$route.query.disable
    },
    beforeRouteEnter: function(to, from, next) {
        next(vm => {
            systemSrv.departDetail(to.query.departmentId).then((resp) => {
                vm.departName = resp.data.departmentName
                vm.departShortName = resp.data.shortName
                vm.note = resp.data.remark
            }, (err) => {
                vm.$message.error(err.msg)
            })
        })
    },
    methods: {
        updateDepart() {
            if (!(this.roleName && this.roleMark && this.note)) {
                this.$message.error('部门信息不能为空！')
                return;
            }
            this.updateInfo = {
                departmentId: this.$route.query.departmentId,
                departmentName: this.departName,
                shortName: this.departShortName,
                remark: this.note,
            }
            systemSrv.updateDepart(this.updateInfo).then((resp) => {
                this.$message.success('修改部门成功')
                this.$router.push('/system/department')
            }, (err) => {
                this.$message.error(err.msg)
            })
        },
    }
}
</script>

<style lang="scss" scoped>

</style>

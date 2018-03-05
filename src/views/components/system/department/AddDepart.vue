<template>
    <div class="content_page animated zoomIn">
        <div class="content-title">
            <div class="title">新增部门信息</div>
            <router-link class="btn btn-info back" :to="'/system/department'">
                返回
            </router-link>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">部门名称</div>
                    <el-select ref="selectDepart" size="large" v-model="departName" class="el-field-input" placeholder="请选择部门名称">
                        <el-option v-for="item in departList" :key="item.departmentId" :label="item.departmentName" :value="item.departmentId">
                        </el-option>
                    </el-select>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">部门简称：</div>
                    <input type="text" v-model="departShortName" class="form-control input-field" placeholder="请输入部门简称" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">备注：</div>
                    <input type="text" v-model="note" class="form-control input-field" placeholder="请输入备注" />
                </div>
            </div>
        </div>
        <div class="content-footer row">
            <el-button class="col-md-1 btn btn-primary makesure" :plain="true" @click="addDepart">确定</el-button>
        </div>
    </div>
</template>

<script>
import { DatePicker, Button } from 'element-ui'
import systemSrv from '../../../services/system.service.js'
export default {
    data() {
        return {
            departList: [],
            departName: '',
            departShortName: '',
            note: '',
        }
    },
    mounted() {
        this.$el.addEventListener('animationend', this.resizeDepart)
    },
    components: {
        'el-date-picker': DatePicker,
        'el-button': Button,
    },
    beforeRouteEnter: function(to, from, next) {
        next(vm => {
            systemSrv.getDepart().then((resp) => {
                vm.departList = resp.data.departmentList
            }, (err) => {
                vm.$message.error(err.msg)
            })
        })
    },
    methods: {
        addDepart() {
            if (!(this.departName && this.departShortName && this.note)) {
                this.$message.error('部门信息不能为空！')
                return;
            }
            this.addInfo = {
                departmentName: this.departName,
                shortName: this.departShortName,
                remark: this.note,
            }
            systemSrv.addDepart(this.addInfo).then((resp) => {
                this.$message.success('添加部门成功')
                this.$router.push('/system/department')
            }, (err) => {
                this.$message.error(err.msg)
            })
        },
        resizeDepart() {
            this.$refs.selectDepart.resetInputWidth()
        },
    }
}
</script>

<style lang="scss" scoped>

</style>

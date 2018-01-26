<template>
    <div class="content_page animated zoomIn">
        <div class="content-title">
            <div class="title" v-if="!useDisabled">修改角色</div>
            <div class="title" v-if="useDisabled">查看角色</div>
            <router-link class="btn btn-info back" :to="'/system/role'">
                返回
            </router-link>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">角色名称：</div>
                    <el-select ref="selectRole" size="large" v-model="roleName" :disabled="useDisabled" class="el-field-input" placeholder="请选择">
                        <el-option v-for="item in roleList" :key="item.roleId" :label="item.roleName" :value="item.roleId">
                        </el-option>
                    </el-select>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">角色标示：</div>
                    <input type="text" v-model="roleMark" :disabled="useDisabled" class="form-control input-field" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">备注：</div>
                    <input type="text" v-model="note" :disabled="useDisabled" class="form-control input-field" />
                </div>
            </div>
        </div>
        <div class="content-footer row" v-show="!useDisabled">
            <el-button class="col-md-1 btn btn-primary makesure" :plain="true" @click="updateRole">确定</el-button>
        </div>

    </div>
</template>

<script>
import { DatePicker, Button, Message } from 'element-ui'
import systemSrv from '../../../services/system.service.js'
/* eslint-disable */
export default {
    data() {
        return {
            useDisabled: false,
            note: '',
            roleName: '',
            roleMark: '',
            updateInfo: {},
            roleList: [],
        }
    },
    components: {
        'el-date-picker': DatePicker,
        'el-button': Button,
    },
    beforeRouteEnter: function(to, from, next) {
        next(vm => {
            systemSrv.roleDetail(to.query.roleId).then((resp) => {
                vm.roleName = resp.data.roleName
                vm.shortName = resp.data.roleMark
                vm.remark = resp.data.note
            }, (err) => {
                vm.$message.error(err.note)
            })
            systemSrv.getRole().then((resp) => {
                vm.roleList = resp.data.roleList
            }, (err) => {
                vm.$message.error(err.note)
            })
        })

    },

    mounted() {
        this.useDisabled = !!this.$route.query.disable
        this.$el.addEventListener('animationend', this.resizeRole)

    },
    methods: {
        updateRole() {
            if (!(this.roleName && this.roleMark && this.note)) {
                this.$message.error('角色信息不能为空！')
                return;
            }
            this.updateInfo = {
                roleId: this.$route.query.roleId,
                roleName: this.roleName,
                shortName: this.roleMark,
                remark: this.note,
            }
            systemSrv.updateRole(this.updateInfo).then((resp) => {
                this.$message.success('更新角色成功')
                this.$router.push('/system/role')
            }, (err) => {
                this.$message.error(err.note)
            })
        },
        resizeRole() {
            this.$refs.selectRole.resetInputWidth()
        },

    }
}
</script>

<style lang="scss" scoped>

</style>

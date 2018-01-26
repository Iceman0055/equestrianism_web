<template>
    <div class="content_page animated zoomIn">
        <div class="content-title">
            <div class="title">新增角色</div>
            <router-link class="btn btn-info back" :to="'/system/role'">
                返回
            </router-link>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">角色名称：</div>
                    <el-select ref="selectRole" size="large" v-model="roleName" class="el-field-input" placeholder="请选择">
                        <el-option v-for="item in roleList" :key="item.roleId" :label="item.roleName" :value="item.roleId">
                        </el-option>
                    </el-select>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">角色标示：</div>
                    <input type="text" v-model="roleMark" class="form-control input-field" placeholder="请输入角色唯一标示" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">备注：</div>
                    <input type="text" v-model="note" class="form-control input-field" placeholder="请输入备注" />
                </div>
            </div>
        </div>
        <div class="content-footer row">
            <el-button class="col-md-1 btn btn-primary makesure" :plain="true" @click="addRole">确定</el-button>
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
            roleList: [],
            roleName: '',
            roleMark: '',
            note: '',
            addInfo:{}
        }
    },
    components: {
        'el-date-picker': DatePicker,
        'el-button': Button,
    },
    beforeRouteEnter: function(to, from, next) {
        next(vm => {
            systemSrv.getRole().then((resp) => {
                vm.roleList = resp.data.roleList
            }, (err) => {
                vm.$message.error(err.note)
            })
        })
    },
    mounted() {
        this.$el.addEventListener('animationend', this.resizeRole)
    },
    methods: {
           addRole() {
            if (!(this.roleName && this.roleMark && this.note)) {
                this.$message.error('角色信息不能为空！')
                return;
            }
            this.addInfo = {
                roleName: this.roleName,
                shortName: this.roleMark,
                remark: this.note,
            }
            systemSrv.addRole(this.addInfo).then((resp) => {
                this.$message.success('添加角色成功')
                this.$router.push('/system/user')
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

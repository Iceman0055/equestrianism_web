<template>
    <div class="content_page animated zoomIn">
        <div class="content-title">
            <div class="title">新增用户信息</div>
            <router-link class="btn btn-info back" :to="'/system/user'">
                返回
            </router-link>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">工号：</div>
                    <input type="text" v-model="jobNumber" class="form-control input-field" placeholder="请输入工号" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">姓名：</div>
                    <input type="text" v-model="name" class="form-control input-field" placeholder="请输入姓名" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">邮箱：</div>
                    <input type="text" v-model="email" class="form-control input-field" placeholder="请输入邮箱" />
                </div>

            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">用户登录名：</div>
                    <input type="text" v-model="loginName" class="form-control input-field" placeholder="请输入用户登录名" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">登录密码：</div>
                    <input type="password" v-model="loginPassword" class="form-control input-field" placeholder="请输入用户登录密码" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">联系方式：</div>
                    <input type="text" v-model="contact" class="form-control input-field" placeholder="请输入联系方式" />
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">部门：</div>
                    <el-select ref="selectDepart" size="large" v-model="depart" class="el-field-input" placeholder="请选择">
                        <el-option v-for="item in departList" :key="item.departmentId" :label="item.departmentName" :value="item.departmentId">
                        </el-option>
                    </el-select>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">角色：</div>
                    <el-select ref="selectRole" size="large" v-model="role" class="el-field-input" placeholder="请选择">
                        <el-option v-for="item in roleList" :key="item.roleId" :label="item.roleName" :value="item.roleId">
                        </el-option>
                    </el-select>
                </div>
            </div>
        </div>
        <div class="content-footer row">
            <el-button class="col-md-1 btn btn-primary makesure" @click="addUser" :plain="true">确定</el-button>
        </div>
    </div>
</template>
<script>
import md5 from 'js-md5';
import { DatePicker, Button, Message } from 'element-ui'
import systemSrv from '../../../services/system.service.js'
export default {
    data() {
        return {
            departList:[],
            roleList: [],
            jobNumber: '',
            name: '',
            loginName: '',
            loginPassword: '',
            depart: '',
            email: '',
            contact: '',
            depart: '',
            role: '',
        }
    },
    mounted() {
        this.$el.addEventListener('animationend', this.resizeRole)
        this.$el.addEventListener('animationend', this.resizeDepart)
    },
    beforeRouteEnter: function(to, from, next) {
        next(vm => {
            systemSrv.getRole().then((resp) => {
                vm.roleList = resp.data.roleList
            }, (err) => {
                vm.$message.error(err.msg)
            })
            systemSrv.getDepart().then((resp) => {
                vm.departList = resp.data.departmentList
            }, (err) => {
                vm.$message.error(err.msg)
            })
        })
    },
    methods: {
        addUser() {
            if (!(this.jobNumber && this.name && this.loginName && this.loginPassword &&
                this.depart && this.role && this.email && this.contact)) {
                this.$message.error('用户信息不能为空！')
                return;
            }
            let addInfo = {
                jobNumber: this.jobNumber,
                realname: this.name,
                loginName: this.loginName,
                loginPassword: md5(this.loginPassword),
                departmentId: this.depart,
                roleId: this.role,
                email: this.email,
                contactWay: this.contact
            }
            systemSrv.addUser(addInfo).then((resp) => {
                this.$message.success('添加用户成功')
                this.$router.push('/system/user')
            }, (err) => {
                this.$message.error(err.msg)
            })
        },
        resizeRole() {
            this.$refs.selectRole.resetInputWidth()
        },
        resizeDepart() {
            this.$refs.selectDepart.resetInputWidth()
        },
    }
}
</script>

<style lang="scss" scoped>

</style>

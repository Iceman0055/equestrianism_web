<template>
    <div class="content_page animated zoomIn">
        <div class="content-title">
            <div class="title" v-if="!useDisabled">修改用户信息</div>
            <div class="title" v-if="useDisabled">查看用户信息</div>
            <router-link class="btn btn-info back" :to="'/system/user'">
                返回
            </router-link>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">工号：</div>
                    <input type="text" v-model="jobNumber" :disabled="useDisabled" class="form-control input-field" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">姓名：</div>
                    <input type="text" v-model="name" :disabled="useDisabled" class="form-control input-field" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">邮箱：</div>
                    <input type="text" v-model="email" :disabled="useDisabled" class="form-control input-field" />
                </div>

            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">用户登录名：</div>
                    <input type="text" v-model="loginName" :disabled="useDisabled" class="form-control input-field" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">联系方式：</div>
                    <input type="text" v-model="contact" :disabled="useDisabled" class="form-control input-field" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">部门：</div>
                    <el-select ref="selectDepart" size="large" :disabled="useDisabled" v-model="depart" class="el-field-input">
                        <el-option v-for="(item,index) in departList" :key="index" :label="item.departmentName" :value="item.departmentId">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">角色：</div>
                    <el-select ref="selectRole" size="large" :disabled="useDisabled" v-model="role" class="el-field-input">
                        <el-option v-for="(item,index) in roleList" :key="index" :label="item.roleName" :value="item.roleId">
                        </el-option>
                    </el-select>
                </div>
            </div>
        </div>
        <div class="content-footer row" v-show="!useDisabled">
            <el-button class="col-md-1 btn btn-primary makesure" :plain="true" @click="updateUser">确定</el-button>
        </div>
    </div>
</template>

<script>
import { DatePicker, Button, Message } from 'element-ui'
import systemSrv from '../../../services/system.service.js'
export default {
    data() {
        return {
            departList: [],
            roleList: [],
            useDisabled: false,
            jobNumber: '',
            name: '',
            loginName: '',
            depart: '',
            email: '',
            contact: '',
            depart: '',
            role: '',
        }
    },
    mounted() {
        this.useDisabled = !!this.$route.query.disable
        this.$el.addEventListener('animationend', this.resizeRole)
        this.$el.addEventListener('animationend', this.resizeDepart)
    },
        beforeRouteLeave(to, from, next) {
        to.meta.keepAlive = true
        next()
    },
    beforeRouteEnter: function(to, from, next) {
        next(vm => {
            systemSrv.userDetail(to.query.userId).then((resp) => {
                vm.jobNumber = resp.data.jobNumber
                vm.name = resp.data.realname
                vm.loginName = resp.data.loginName
                vm.depart = resp.data.departmentId
                vm.role = resp.data.roleId
                vm.contact = resp.data.contactWay
                vm.email = resp.data.email
            }, (err) => {
                vm.$message.error(err.msg)
            })
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
        updateUser() {
            if (!(this.jobNumber && this.name && this.loginName &&
                this.depart && this.role && this.email && this.contact)) {
                this.$message.error('用户信息不能为空！')
                return;
            }
            let updateInfo = {
                userId: this.$route.query.userId,
                jobNumber: this.jobNumber,
                realname: this.name,
                loginName: this.loginName,
                departmentId: this.depart,
                roleId: this.role,
                email: this.email,
                contactWay: this.contact
            }
            systemSrv.updateUser(updateInfo).then((resp) => {
                this.$message.success('修改用户成功')
                this.$router.push('/system/user')
            }, (err) => {
                this.$message.error(err.msg)
            })
        },
        resizeDepart() {
            this.$refs.selectDepart.resetInputWidth()
        },
        resizeRole() {
            this.$refs.selectRole.resetInputWidth()
        },
    }
}
</script>

<style lang="scss" scoped>

</style>

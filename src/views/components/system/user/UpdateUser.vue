<template>
    <div class="content_page animated zoomIn">
        <div class="content-title">
                <div class="title" v-if="!useDisabled">更新用户信息</div>
            <div class="title" v-if="useDisabled">查看用户信息</div>
            <router-link class="btn btn-info back" :to="'/system/user'">
                返回
            </router-link>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">工号：</div>
                    <input type="text" :disabled="useDisabled" class="form-control input-field" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">姓名：</div>
                    <input type="text" :disabled="useDisabled" class="form-control input-field"/>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">用户登录名：</div>
                    <input type="text" :disabled="useDisabled" class="form-control input-field"  />
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">部门：</div>
                    <el-select size="large" :disabled="useDisabled" v-model="value" class="el-field-input" >
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">角色：</div>
                    <el-select size="large" :disabled="useDisabled" v-model="value" class="el-field-input">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">状态：</div>
                    <el-select size="large" :disabled="useDisabled" v-model="value" class="el-field-input">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">邮箱：</div>
                    <input type="text" :disabled="useDisabled" class="form-control input-field" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">联系方式：</div>
                    <input type="text" :disabled="useDisabled" class="form-control input-field" />
                </div>
            </div>
        </div>
        <div class="content-footer row">
            <el-button class="col-md-1 btn btn-primary makesure" :plain="true" @click="open">确定</el-button>
        </div>
    </div>
</template>

<script>
import { DatePicker, Button} from 'element-ui'
/* eslint-disable */
export default {
    data() {
        return {
            useDisabled: false,
            value: '',
            options: [{
                value: '选项1',
                label: '假数据1'
            }, {
                value: '选项2',
                label: '假数据2'
            }],
        }
    },
    components: {
        'el-date-picker': DatePicker,
        'el-button': Button,
    },
     mounted() {
        this.useDisabled = this.$route.query.disable
    },
    methods: {
        open() {
            this.$message.success('修改成功')
        },

    }
}
</script>

<style lang="scss" scoped>

</style>

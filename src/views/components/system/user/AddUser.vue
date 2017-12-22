<template>
    <div class="content_page animated zoomIn">
        <div class="content-title">
            <div class="title">增加用户信息</div>
            <router-link class="btn btn-info back" :to="'/system/user'">
                返回
            </router-link>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">工号：</div>
                    <input type="text" class="form-control input-field" placeholder="请输入工号" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">姓名：</div>
                    <input type="text" class="form-control input-field" placeholder="请输入姓名" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">用户登录名：</div>
                    <input type="text" class="form-control input-field" placeholder="请输入用户登录名" />

                </div>

            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">部门：</div>
                    <el-select size="large" v-model="value" class="el-field-input" placeholder="请选择">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">角色：</div>

                    <el-select size="large" v-model="value" class="el-field-input" placeholder="请选择">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>

                </div>
                <div class="col-md-4 search-field">
                    <div class="label">状态：</div>
                    <el-select size="large" v-model="value" class="el-field-input" placeholder="请选择">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">邮箱：</div>
                    <input type="text" class="form-control input-field" placeholder="请输入邮箱" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">联系方式：</div>
                    <input type="text" class="form-control input-field" placeholder="请输入联系方式" />
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
    methods: {
        open() {
            this.$message.success('修改成功')
        },
    
    }
}
</script>

<style lang="scss" scoped>

</style>

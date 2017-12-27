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
                    <input type="text" class="form-control input-field" placeholder="请输入角色名称" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">角色标示：</div>
                    <input type="text" class="form-control input-field" placeholder="请输入角色唯一标示" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">备注：</div>
                    <input type="text" class="form-control input-field" placeholder="请输入用户备注" />

                </div>

            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">状态：</div>
                    <el-select size="large" v-model="value" class="el-field-input" placeholder="请选择">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>      
            </div>
          
        </div>
        <div class="content-footer row">
            <el-button class="col-md-1 btn btn-primary makesure" :plain="true" @click="open">确定</el-button>
        </div>

    </div>
</template>

<script>
import { DatePicker, Button } from 'element-ui'
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

<template>
    <div class="content_page animated zoomIn">
        <div class="content-title">
            <div class="title" v-if="!useDisabled">更新马主信息</div>
            <div class="title" v-if="useDisabled">查看马主信息</div>
            <router-link class="btn btn-info back" :to="'/horse/master'">
                返回
            </router-link>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">姓名：</div>
                    <input type="text" :disabled="useDisabled" class="form-control input-field" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">性别：</div>
<el-select size="large" :disabled="useDisabled" v-model="selectValue1" class="el-field-input" placeholder="请选择">
                        <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>                  </div>
                <div class="col-md-4 search-field">
                    <div class="label">职业：</div>
                    <input type="text" :disabled="useDisabled" class="form-control input-field"  />
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">联系方式：</div>
                    <input type="text" :disabled="useDisabled" class="form-control input-field" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">住址：</div>
                    <input type="text" :disabled="useDisabled" class="form-control input-field"/>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">马匹：</div>
                  <el-select size="large" :disabled="useDisabled" v-model="selectValue" class="el-field-input" placeholder="请选择">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>                </div>
            </div>
        </div>
        <div class="content-footer row" v-show="!useDisabled">
            <el-button class="col-md-1 btn btn-primary makesure" :plain="true" @click="open">确定</el-button>
        </div>
    </div>
</template>

<script>
import { DatePicker, Button,Select } from 'element-ui'
/* eslint-disable */
export default {
    data() {
        return {
            selectValue:'',
            selectValue1:'',
            useDisabled: false,
            value: '',
            value1: '',
            imageUrl: '',
              options: [{
                value: '选项1',
                label: '马匹1'
            }, {
                value: '选项2',
                label: '马匹2'
            }],
              options1: [{
                value: '选项1',
                label: '男'
            }, {
                value: '选项2',
                label: '女'
            }],
        }
    },
    mounted() {
        this.useDisabled = this.$route.query.disable
    },
    components: {
        'el-date-picker': DatePicker,
        'el-button': Button,
        "el-select":Select
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

<template>
    <div class="content_page animated zoomIn">
        <div class="content-title">
            <div class="title" v-if="!useDisabled">更新固定资产</div>
            <div class="title" v-if="useDisabled">查看固定资产</div>
            <router-link class="btn btn-info back" :to="'/hosAssets/consume'">
                返回
            </router-link>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">资产大类：</div>
                    <input type="text" :disabled="useDisabled" class="form-control input-field" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">资产分类：</div>
                    <input type="text" :disabled="useDisabled" class="form-control input-field" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">资产编号：</div>
                    <input type="text" :disabled="useDisabled" class="form-control input-field" />
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">资产名称：</div>
                    <input type="text" :disabled="useDisabled" class="form-control input-field" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">数量：</div>
                    <input type="text" :disabled="useDisabled" class="form-control input-field"  />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">价值：</div>
                    <input type="text" :disabled="useDisabled" class="form-control input-field" />
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">面积：</div>
                    <input type="text" :disabled="useDisabled" class="form-control input-field" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">价值类型：</div>
                    <input type="text" :disabled="useDisabled" class="form-control input-field" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">取得方式：</div>
                    <input type="text" :disabled="useDisabled" class="form-control input-field"  />
                </div>
            </div>

            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">财务出账日期：</div>
                    <el-date-picker :disabled="useDisabled" class="el-field-input" size="large" v-model="value" type="date">
                    </el-date-picker>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">制单日期：</div>
                    <el-date-picker :disabled="useDisabled" class="el-field-input" size="large" v-model="value" type="date" >
                    </el-date-picker>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">保修截止日期：</div>
                    <el-date-picker :disabled="useDisabled" class="el-field-input" size="large" v-model="value1" type="date" >
                    </el-date-picker>
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">管理部门：</div>
                    <input type="text" :disabled="useDisabled" class="form-control input-field"  />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">管理人：</div>
                    <input type="text" :disabled="useDisabled" class="form-control input-field" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">使用状态：</div>
                    <el-select size="large" :disabled="useDisabled" v-model="selectValue" class="el-field-input">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">备注：</div>
                    <input type="text" :disabled="useDisabled" class="form-control input-field"  />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">设计用途：</div>
                    <input type="text" :disabled="useDisabled" class="form-control input-field"  />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">规格型号：</div>
                    <input type="text" :disabled="useDisabled" class="form-control input-field" />
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">品牌：</div>
                    <input type="text" :disabled="useDisabled" class="form-control input-field" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">会记凭证号：</div>
                    <input type="text" :disabled="useDisabled" class="form-control input-field" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">采购组织形式：</div>
                    <input type="text" :disabled="useDisabled" class="form-control input-field" />
                </div>
            </div>
        </div>
        <div class="content-footer row" v-show="!useDisabled">
            <el-button class="col-md-1 btn btn-primary makesure" :plain="true" @click="open">确定</el-button>
        </div>

    </div>
</template>

<script>
import { DatePicker, Button,  Select } from 'element-ui'
/* eslint-disable */
export default {
    data() {
        return {
            selectValue:"",
            useDisabled: false,
            value: '',
            value1: '',
             options: [{
                value: '选项1',
                label: '使用中'
            }, {
                value: '选项2',
                label: '使用结束'
            }],
        }
    },
    mounted() {
        this.useDisabled = this.$route.query.disable
    },
    components: {
        'el-date-picker': DatePicker,
        'el-button': Button,
        'el-select': Select
    },
    methods: {
        open() {
            this.$message.success('修改成功')
        },
      
    }
}
</script>

<style lang="scss" scoped>
.content_page .content-show .list-search .search-field {
    padding-left: 84px;
}

</style>

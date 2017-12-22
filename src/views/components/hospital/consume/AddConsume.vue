<template>
    <div class="content_page animated zoomIn">
        <div class="content-title">
            <div class="title">增加消耗品</div>
            <router-link class="btn btn-info back" :to="'/hospital/consume'">
                返回
            </router-link>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">资产大类：</div>
                    <input type="text" class="form-control input-field" placeholder="请输入资产大类" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">资产分类：</div>
                    <input type="text" class="form-control input-field" placeholder="请输入资产分类" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">资产编号：</div>
                    <input type="text" class="form-control input-field" placeholder="请输入资产编号" />
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">资产名称：</div>
                    <input type="text" class="form-control input-field" placeholder="请输入资产名称" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">数量：</div>
                    <input type="text" class="form-control input-field" placeholder="请输入数量" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">价值：</div>
                    <input type="text" class="form-control input-field" placeholder="请输入价值" />
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">面积：</div>
                    <input type="text" class="form-control input-field" placeholder="请输入面积" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">价值类型：</div>
                    <input type="text" class="form-control input-field" placeholder="请输入价值类型" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">取得方式：</div>
                    <input type="text" class="form-control input-field" placeholder="请输入取得方式" />
                </div>
            </div>

            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">财务出账日期：</div>
                    <el-date-picker class="el-field-input" size="large" v-model="value" type="date" placeholder="选择财务出账日期">
                    </el-date-picker>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">制单日期：</div>
                    <el-date-picker class="el-field-input" size="large" v-model="value" type="date" placeholder="选择制单日期">
                    </el-date-picker>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">保修截止日期：</div>
                    <el-date-picker class="el-field-input" size="large" v-model="value1" type="date" placeholder="选择保修截止日期">
                    </el-date-picker>
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">管理部门：</div>
                    <input type="text" class="form-control input-field" placeholder="请输入管理部门" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">管理人：</div>
                    <input type="text" class="form-control input-field" placeholder="请输入管理人" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">使用状态：</div>
                    <el-select size="large" v-model="selectValue" class="el-field-input" placeholder="请选择">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">备注：</div>
                    <input type="text" class="form-control input-field" placeholder="请输入备注" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">设计用途：</div>
                    <input type="text" class="form-control input-field" placeholder="请输入设计用途" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">规格型号：</div>
                    <input type="text" class="form-control input-field" placeholder="请输入规格型号" />
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">品牌：</div>
                    <input type="text" class="form-control input-field" placeholder="请输入马的父亲" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">会记凭证号：</div>
                    <input type="text" class="form-control input-field" placeholder="请输入会记凭证号" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">采购组织形式：</div>
                    <input type="text" class="form-control input-field" placeholder="请输入采购组织形式" />
                </div>
            </div>
        </div>
        <div class="content-footer row">
            <el-button class="col-md-1 btn btn-primary makesure" :plain="true" @click="open">确定</el-button>
        </div>

    </div>
</template>

<script>
import { DatePicker, Button, Upload, Select } from 'element-ui'
/* eslint-disable */
export default {
    data() {
        return {
            selectValue:'',
            value: '',
            value1: '',
            imageUrl1: '',
            options: [{
                value: '选项1',
                label: '使用中'
            }, {
                value: '选项2',
                label: '使用结束'
            }],
        }
    },
    components: {
        'el-date-picker': DatePicker,
        'el-button': Button,
        'el-upload': Upload,
        'el-select': Select
    },
    methods: {
        open() {
            this.$message.success('修改成功')
        },
        preview(file) {
            var fr = new FileReader()
            fr.onloadend = () => {
                this.imageUrl = fr.result;
            }
            fr.readAsDataURL(file.raw)
        },
        submitFile(file, fileList) {
            var formData = new FormData(); //调用接口上传data:formData
            formData.append('file', file.raw);
            this.preview(file);
        },
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        }
    }
}
</script>

<style lang="scss" scoped>
.content_page .content-show .list-search .search-field {
    padding-left: 92px;
}

</style>

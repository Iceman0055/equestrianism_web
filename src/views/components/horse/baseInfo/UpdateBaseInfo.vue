<template>
    <div class="content_page">
        <div class="content-title">
            <div class="title" v-if="!useDisabled">修改马匹基本信息</div>
            <div class="title" v-if="useDisabled">查看马匹基本信息</div>
            <router-link class="btn btn-info back" :to="'/horse/baseInfo'">
                返回
            </router-link>
        </div>
        <div class="content-show">
            <div class="baseInfo-title">
                <div class="title">基本信息</div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">护照号码：</div>
                    <input type="text" :disabled="useDisabled" class="form-control input-field" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">马名：</div>
                    <input type="text" :disabled="useDisabled" class="form-control input-field" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">变更马名：</div>
                    <input type="text" :disabled="useDisabled" class="form-control input-field" />
                </div>

            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">出生国家：</div>
                    <input type="text" :disabled="useDisabled" class="form-control input-field" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">变更日期：</div>
                    <el-date-picker :disabled="useDisabled" class="el-field-input" size="large" v-model="value" type="date">
                    </el-date-picker>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">出生日期：</div>
                    <el-date-picker :disabled="useDisabled" class="el-field-input" size="large" v-model="value1" type="date">
                    </el-date-picker>
                </div>

            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">身高(公分)：</div>
                    <input type="text" :disabled="useDisabled" class="form-control input-field" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">性别：</div>
                    <el-select size="large" v-model="selectValue" :disabled="useDisabled" class="el-field-input" placeholder="请选择">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">皮下条码：</div>
                    <input type="text" :disabled="useDisabled" class="form-control input-field" />
                </div>

            </div>

            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">毛色：</div>
                    <input type="text" :disabled="useDisabled" class="form-control input-field" />
                </div>
            </div>
            <div class="baseInfo-title">
                <div class="title">描述</div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">头部：</div>
                    <input type="text" :disabled="useDisabled" class="form-control input-field" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">左前肢：</div>
                    <input type="text" :disabled="useDisabled" class="form-control input-field" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">右前肢：</div>
                    <input type="text" :disabled="useDisabled" class="form-control input-field" />
                </div>

            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">左后肢：</div>
                    <input type="text" :disabled="useDisabled" class="form-control input-field" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">右后肢：</div>
                    <input type="text" :disabled="useDisabled" class="form-control input-field" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">体躯：</div>
                    <input type="text" :disabled="useDisabled" class="form-control input-field" />
                </div>

            </div>
            <div class="baseInfo-title">
                <div class="title">轮廓图解</div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">右侧：</div>
                    <upload-img :useDisabled="useDisabled" :imageUrl="rightImg">
                    </upload-img>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">左侧：</div>
                    <upload-img :useDisabled="useDisabled" :imageUrl="leftImg">
                    </upload-img>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">上眼线：</div>
                    <upload-img :useDisabled="useDisabled" :imageUrl="upLineImg">
                    </upload-img>
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">前肢-后视：</div>
                    <upload-img :useDisabled="useDisabled" :imageUrl="foreImg">
                    </upload-img>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">颈部仰视：</div>
                    <upload-img :useDisabled="useDisabled" :imageUrl="neckImg">
                    </upload-img>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">后肢-后视：</div>
                    <upload-img :useDisabled="useDisabled" :imageUrl="backImg">
                    </upload-img>
                </div>
            </div>

            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">唇：</div>
                    <upload-img :useDisabled="useDisabled" :imageUrl="lipImg">
                    </upload-img>
                </div>
            </div>
        </div>
        <div class="content-footer row" v-show="!useDisabled">
            <el-button class="col-md-1 btn btn-primary makesure" :plain="true" @click="open">确定</el-button>
        </div>

    </div>
</template>

<script>
import { DatePicker, Button, Upload, Select } from 'element-ui'
import UploadImg from '../../../uploadImg/UploadImg.vue'
/* eslint-disable */
export default {
    data() {
        return {
            imageUrl: '',
            rightImg: '',
            leftImg: '',
            upLineImg: '',
            foreImg: '',
            neckImg: '',
            backImg: '',
            lipImg: '',
            selectValue: '',
            useDisabled: false,
            value: '',
            value1: '',
            imageUrl1: '',
            options: [{
                value: '选项1',
                label: '男'
            }, {
                value: '选项2',
                label: '女'
            }],
        }
    },
    components: {
        'el-date-picker': DatePicker,
        'el-button': Button,
        'upload-img': UploadImg,
        'el-select': Select
    },
    mounted() {
        this.useDisabled = !!this.$route.query.disable
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
.baseInfo-title {
    height: 30px;
    line-height: 30px;
    border-left: 2px solid #2db7f5;
    padding-left: 20px;
    padding-right: 20px;
    margin-bottom: 12px;
    .title {
        font-size: 16px;
        font-weight: bold;
        display: inline-block;
    }
}
</style>

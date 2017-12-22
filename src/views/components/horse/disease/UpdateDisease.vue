<template>
    <div class="content_page animated zoomIn">
        <div class="content-title">
            <div class="title" v-if="!useDisabled">修改病历信息</div>
            <div class="title" v-if="useDisabled">查看病历信息</div>
            <router-link class="btn btn-info back" :to="'/horse/disease'">
                返回
            </router-link>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">地点：</div>
                    <input type="text" :disabled="useDisabled" class="form-control input-field" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">时间：</div>
                    <el-date-picker :disabled="useDisabled" class="el-field-input" size="large" v-model="value" type="date">
                    </el-date-picker>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">医生：</div>
                    <input type="text" :disabled="useDisabled" class="form-control input-field"  />
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">临诊：</div>
                    <input type="text" :disabled="useDisabled" class="form-control input-field"  />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">初诊：</div>
                    <input type="text" :disabled="useDisabled" class="form-control input-field" />

                </div>
                <div class="col-md-4 search-field">
                    <div class="label">处方用药：</div>
                    <input type="text" :disabled="useDisabled" class="form-control input-field" />
                </div>

            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">医嘱：</div>
                    <input type="text" :disabled="useDisabled" class="form-control input-field" >
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">标题标签：</div>
                    <input type="text" :disabled="useDisabled" class="form-control input-field" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">备注：</div>
                    <input type="text" :disabled="useDisabled" class="form-control input-field" />
                </div>

            </div>

            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">马匹：</div>
                  <el-select size="large" :disabled="useDisabled" v-model="selectValue" class="el-field-input" placeholder="请选择">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>                </div>
                <div class="col-md-4 search-field">
                    <div class="label">x光照片：</div>
                    <el-upload :disabled="useDisabled" class="avatar-uploader" action="" :auto-upload="false" :on-change="submitFile" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">数据照片：</div>
                    <el-upload :disabled="useDisabled" class="avatar-uploader" action="" :auto-upload="false" :on-change="submitFile" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </div>
            </div>

        </div>
        <div class="content-footer row" v-show="!useDisabled">
            <el-button class="col-md-1 btn btn-primary makesure" :plain="true" @click="open">确定</el-button>
        </div>
    </div>
</template>

<script>
import { DatePicker, Button, Upload,Select } from 'element-ui'
/* eslint-disable */
export default {
    data() {
        return {
            selectValue:'',
            useDisabled:false,
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
        }
    },
    components: {
        'el-date-picker': DatePicker,
        'el-button': Button,
        'el-upload': Upload,
        "el-select":Select
    },
    mounted() {
        this.useDisabled = this.$route.query.disable
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


</style>

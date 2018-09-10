<template>
    <el-upload class="avatar-uploader" :disabled="useDisabled" action="" :auto-upload="false" :on-change="submitFile" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
        <img v-if="previewUrl" :src="previewUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
</template>

<script>
import { Upload } from 'element-ui'
export default {
    props: ['imageUrl', 'useDisabled', 'name'],
    data() {
        return {
            url: undefined,
            disabled: false
        }
    },
    components: {
        "el-upload": Upload
    },
    computed: {
        previewUrl() {
            if (this.url) {
                return this.url;
            }
            let reg = /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}(=)?|[A-Za-z0-9+/]{2}(==)?|[A-Za-z0-9+/]{1}(===)?)$/
            if (reg.test(this.imageUrl)) {
                if (this.imageUrl.indexOf('data:image', 0) == -1) {
                    return `data:image/jpeg;base64,${this.imageUrl}`;
                }
            }
            return this.imageUrl
        }
    },
    methods: {
        preview(file) {
            var fr = new FileReader()
            fr.onloadend = () => {
                this.url = fr.result;
            }
            fr.readAsDataURL(file.raw)
        },
        submitFile(file) {
            // var formData = new FormData(); //调用接口上传data:formData
            // formData.append('file', file.raw);
            this.preview(file);
            this.$emit('uploadFun', {
                name: this.name,
                file
            })
            // console.log(formData)
        },
        handleAvatarSuccess(res, file) {
            this.url = URL.createObjectURL(file.raw);
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

<style>

</style>


<template>
    <div>
        <el-upload :disabled="useDisabled" action="https://jsonplaceholder.typicode.com/posts/" :on-success="handleSuccess" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog style="width: 60%;text-align: center; margin: 0 auto;" class="mt-5" :modal-append-to-body="false" :visible.sync="dialogVisible" width="50%">
            <img width="80%" :src="url" alt="">
            <div class="text-center mt-3">
                <el-button size="medium" type="primary" @click="dialogVisible = false">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { Upload, Dialog } from 'element-ui'
export default {
    props: ['imageUrl', 'useDisabled'],
    data() {
        return {
            url: this.imageUrl,
            disabled: false,
            dialogVisible: false
        }
    },
    components: {
        "el-upload": Upload,
        "el-dialog": Dialog
    },
    methods: {
        handleSuccess(res, file) {
            this.$emit('successFile', res)
        },
        handleRemove(file, fileList) {
            this.$emit('removeFile', file)
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.url = file.url;
            this.dialogVisible = true;
        }
    }
}
</script>

<style scoped>

</style>

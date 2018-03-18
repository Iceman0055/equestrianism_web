<template>
    <div>
         <el-upload
            :name="name"
            :disabled="useDisabled"
            :action="action"
            :data="data"
            :on-success="handleSuccess"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
        >
        <img v-if="previewUrl" :src="previewUrl" class="avatar">
            <i class="el-icon-plus"></i>
        </el-upload>
        <!-- <el-upload :disabled="useDisabled" :action="action" :on-change="submitFile" :on-success="handleSuccess" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
        </el-upload> -->
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
    props: ['imageUrl', 'useDisabled','action','name','data'],
    data() {
        return {
            url: this.imageUrl,
            disabled: false,
            dialogVisible: false
        }
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
        }
    },
    components: {
        "el-upload": Upload,
        "el-dialog": Dialog
    },
    methods: {
          preview(file) {
            var fr = new FileReader()
            fr.onloadend = () => {
                this.url = fr.result;
            }
            fr.readAsDataURL(file.raw)
        },
        handleSuccess(res, file) {
            this.$emit('successFile', res)
        },
        handleRemove(file, fileList) {
            this.$emit('removeFile', file)
        },
        handlePictureCardPreview(file) {
            this.url = file.url;
            this.dialogVisible = true;
        },
    }
}
</script>

<style scoped>

</style>

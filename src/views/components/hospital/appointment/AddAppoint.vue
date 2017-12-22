<template>
    <div class="content_page animated zoomIn">
        <div class="content-title">
            <div class="title">新增预约日程</div>
                <router-link  class="btn btn-info back" :to="'/hospital/appointment'">
                    返回
                </router-link>
        </div>
            <div class="content-show">
                <div class="row list-search">
                    <div class="col-md-4 search-field">
                        <div class="label">预约时间：</div>
  <el-date-picker size="large"
      v-model="value1"
      type="datetime"
      placeholder="选择日期时间">
    </el-date-picker>                     </div>
                    <div class="col-md-4 search-field">
                        <div class="label">预约描述：</div>
                   <input type="text" class="form-control input-field" placeholder="请输入预约描述" />

                    </div>
                     <div class="col-md-4 search-field">
                        <div class="label">预约号：</div>
                        <input type="text" class="form-control input-field" placeholder="请输入预约号" />
                    </div>
                </div>
                <div class="row list-search">    
                    <div class="col-md-4 search-field">
                        <div class="label">备注：</div>
                        <input type="text" class="form-control input-field" placeholder="请输入备注" />

                    </div>          
                    <div class="col-md-4 search-field">
                        <div class="label">联系人：</div>
                        <input type="text" class="form-control input-field" placeholder="请输入联系人(非必填)" />

                    </div>
                    <div class="col-md-4 search-field">
                        <div class="label">联系方式：</div>
                        <input type="text" class="form-control input-field" placeholder="请输入联系方式(非必填)" />
                    </div>
                </div>
               
            </div>
            <div class="content-footer row">
                <el-button class="col-md-1 btn btn-primary makesure" :plain="true" @click="open">确定</el-button>
            </div>    
    </div>
</template>
<script>
import { DatePicker, Button } from "element-ui";
/* eslint-disable */
export default {
  data() {
    return {
      value: "",
      value1: "",
      imageUrl: ""
    };
  },
  components: {
    "el-date-picker": DatePicker,
    "el-button": Button,
  },
  methods: {
    open() {
      this.$message.success("修改成功");
    },
    preview(file) {
      var fr = new FileReader();
      fr.onloadend = () => {
        this.imageUrl = fr.result;
      };
      fr.readAsDataURL(file.raw);
    },
    submitFile(file, fileList) {
      var formData = new FormData(); //调用接口上传data:formData
      formData.append("file", file.raw);
      this.preview(file);
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style lang="scss" scoped>

</style>

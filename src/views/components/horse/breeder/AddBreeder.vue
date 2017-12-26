<template>
  <div class="content_page animated zoomIn">
    <div class="content-title">
      <div class="title">新增饲养员信息</div>
      <router-link class="back btn btn-info" :to="'/horse/breeder'">
        返回
      </router-link>
    </div>
    <div class="content-show">
      <div class="row list-search">
        <div class="col-md-4 search-field">
          <div class="label">姓名：</div>
          <input type="text" class="form-control input-field" placeholder="请输入地点" />
        </div>
        <div class="col-md-4 search-field">
          <div class="label">性别：</div>
          <el-select size="large" v-model="selectValue1" class="el-field-input" placeholder="请选择">
            <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="col-md-4 search-field">
          <div class="label">技能描述：</div>
          <input type="text" class="form-control input-field" placeholder="请输入医生" />
        </div>
      </div>
      <div class="row list-search">
        <div class="col-md-4 search-field">
          <div class="label">匹配马匹：</div>
          <el-select size="large" v-model="selectValue" class="el-field-input" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="col-md-4 search-field">
          <div class="label">入职时间：</div>
          <el-date-picker class="el-field-input" size="large" v-model="value" type="date" placeholder="选择时间">
          </el-date-picker>
        </div>
      </div>
      <div class="row list-search">
        <div class="col-md-4 search-field">
          <div class="label">身份证照片：</div>
            <upload-img :imageUrl="idCardImg">
                    </upload-img>
        </div>
      </div>
    </div>
    <div class="content-footer row">
      <el-button class="col-md-1 btn btn-primary makesure" :plain="true" @click="open">确定</el-button>
    </div>
  </div>
</template>

<script>
import { DatePicker, Button, Upload, Select } from "element-ui";
import UploadImg from '../../../uploadImg/UploadImg.vue'
/* eslint-disable */
export default {
  data() {
    return {
      idCardImg:'',
      value: "",
      value1: "",
      imageUrl: "",
      selectValue: "",
      selectValue1: "",
      options: [
        {
          value: "选项1",
          label: "马匹1"
        },
        {
          value: "选项2",
          label: "马匹2"
        }
      ],
      options1: [
        {
          value: "选项1",
          label: "男"
        },
        {
          value: "选项2",
          label: "女"
        }
      ]
    };
  },
  components: {
    "el-date-picker": DatePicker,
    "el-button": Button,
    'upload-img': UploadImg,
    "el-select": Select
  },
  methods: {
    open() {
      this.$message.success("修改成功");
    },
  }
};
</script>

<style lang="scss" scoped>

</style>

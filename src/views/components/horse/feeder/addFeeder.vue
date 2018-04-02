<template>
  <div class="content_page animated zoomIn">
    <div class="content-title">
      <div class="title">新增饲养员信息</div>
      <router-link class="back btn btn-info" :to="'/horse/feeder'">
        返回
      </router-link>
    </div>
    <div class="content-show">
      <div class="row list-search">
        <div class="col-md-4 search-field">
          <div class="label">姓名：</div>
          <input type="text" v-model="name" class="form-control input-field" placeholder="请输入姓名" />
        </div>
        <div class="col-md-4 search-field">
          <div class="label">性别：</div>
          <el-select ref="selectInput" size="large" v-model="sex" class="el-field-input" placeholder="请选择">
            <el-option v-for="item in sexOptions" :key="item.dictionaryDetailId" :label="item.itemValue" :value="item.dictionaryDetailId">
            </el-option>
          </el-select>
        </div>
        <div class="col-md-4 search-field">
          <div class="label">技能描述：</div>
          <input type="text" v-model="skill" class="form-control input-field" placeholder="请输入技能描述" />
        </div>
      </div>
      <div class="row list-search">
        <div class="col-md-4 search-field">
          <div class="label">匹配马匹：</div>
          <el-select ref="selectHorse" filterable size="large" v-model="horseName" class="el-field-input" placeholder="请选择">
            <el-option v-for="item in horseInfoName" :key="item.horseId" :label="item.horseName" :value="item.horseId">
            </el-option>
          </el-select>
        </div>
        <div class="col-md-4 search-field">
          <div class="label">入职时间：</div>
          <el-date-picker class="el-field-input" size="large" value-format="yyyy-MM-dd" format="yyyy-MM-dd" v-model="workTime" type="date" placeholder="选择时间">
          </el-date-picker>
        </div>
      </div>
      <div class="row list-search">
        <div class="col-md-4 search-field">
          <div class="label">身份证照片：</div>
          <upload-img v-on:uploadFun="uploadFun" :imageUrl="idCardImage" name="idCardImage">
          </upload-img>
        </div>
      </div>
    </div>
    <div class="content-footer row">
      <el-button class="col-md-1 btn btn-primary makesure" :plain="true" @click="addFeeder">确定</el-button>
    </div>
  </div>
</template>

<script>
import { DatePicker, Button, Upload, Select, Message } from "element-ui";
import UploadImg from '../../../../components/uploadImg/uploadImg.vue'
import horseSrv from '../../../services/horse.service.js'
import systemSrv from '../../../services/system.service.js'
export default {
  data() {
    return {
      workTime: '',
      skill: '',
      name: '',
      idCardImage: '',
      sex: "",
      imageUrl: "",
      files: {},
      horseInfoName: [],
      horseName: '',
      sexOptions: [],
    };
  },
  components: {
    "el-date-picker": DatePicker,
    "el-button": Button,
    'upload-img': UploadImg,
    "el-select": Select
  },
  mounted() {
    this.$el.addEventListener('animationend', this.resizeSelect)
    this.$el.addEventListener('animationend', this.resizeHorse)
  },
  beforeRouteEnter: function(to, from, next) {
    next(vm => {
      horseSrv.getHorseName().then((resp) => {
        vm.horseInfoName = resp.data.horseList
      }, (err) => {
        vm.$message.error(err.msg)
      })
      systemSrv.dictionary().then(resp => {
        let dictDetail = resp.data.dictionaryInfoList
        let len = dictDetail.length
        for (let i = 0; i < len; i++) {
          if (dictDetail[i].typeCode == 'SEX') {
            vm.sexOptions = dictDetail[i].dictionaryDetailList
          }
        }
      }, err => {
        vm.$message.error(err.msg)
      })

    })
  },
  methods: {
    resizeSelect() {
      this.$refs.selectInput.resetInputWidth()
    },
    resizeHorse() {
      this.$refs.selectHorse.resetInputWidth()
    },
    uploadFun(file) {
      this.files[file.name] = file.file.raw
    },
    addFeeder() {
      if (!(this.name && this.sex && this.skill && this.horseName &&
        this.workTime)) {
        this.$message.error('饲养员信息不能为空！')
        return;
      }
      let feederInfo = {
        feederName: this.name,
        sex: this.sex,
        skillDesc: this.skill,
        horseId: this.horseName,
        hireDate: this.workTime,
      }
      var formData = new FormData()
      for (let key in this.files) {
        formData.append(key, this.files[key])
      }
      for (let key in feederInfo) {
        formData.append(key, feederInfo[key])
      }
      horseSrv.addFeeder(formData).then((resp) => {
        this.$message.success('添加饲养员信息成功')
        this.$router.push('/horse/feeder')
      }, err => {
        this.$message.error(err.msg)
      })
    }

  }
};
</script>

<style lang="scss" scoped>

</style>

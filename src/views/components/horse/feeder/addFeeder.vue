<template>
  <div class="content_page animated zoomIn">
    <div class="content-title">
      <div class="title" v-if="useDisabled">查看饲养员信息</div>
      <div class="title" v-if="!useDisabled &&queryId">修改饲养员信息</div>
      <div class="title" v-if="!queryId">新增饲养员信息</div>
      <router-link class="back btn btn-info" :to="'/horse/feeder'">
        返回
      </router-link>
    </div>
    <div class="content-show">
      <el-form :model="horseInfo" label-width="120px" ref="horseInfo" class="demo-ruleForm" inline-message>
        <el-row>
          <el-col :span="8">
            <el-form-item label="姓名：" prop="feederName" :rules="[{ required: true, message: '请输入姓名', trigger: 'blur' },]">
              <el-input size="large" :disabled="useDisabled" v-model="horseInfo.feederName" placeholder="请输入姓名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="性别：" prop="sex" :rules="[{ required: true, message: '请选择性别', trigger: 'blur' },  ]">
              <el-select ref="selectSex" :disabled="useDisabled" size="large" v-model="horseInfo.sex" class="el-field-input" placeholder="请选择">
                <el-option v-for="(item,index) in sexOptions" :key="index" :label="item.itemValue" :value="item.dictionaryDetailId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="技能描述：" prop="skillDesc" :rules="[ { required: true, message: '请输入技能描述', trigger: 'blur' },  ]">
              <el-input size="large" :disabled="useDisabled" v-model="horseInfo.skillDesc" placeholder="请输入技能描述"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="匹配马匹：" prop="horseId" :rules="[{ required: true, message: '请选择匹配马匹', trigger: 'blur' },]">
              <el-select ref="selectHorse" :disabled="useDisabled" filterable size="large" v-model="horseInfo.horseId" class="el-field-input" placeholder="请选择">
                <el-option v-for="(item,index) in horseInfoName" :key="index" :label="item.horseName" :value="item.horseId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="入职时间：" prop="hireDate" :rules="[{ required: true, message: '请输入入职时间', trigger: 'blur' },  ]">
              <el-date-picker class="el-field-input" :disabled="useDisabled" size="large" value-format="yyyy-MM-dd" format="yyyy-MM-dd" v-model="horseInfo.hireDate" type="date" placeholder="选择时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="身份证照片：">
              <upload-img v-on:uploadFun="uploadFun" v-model="idCardImage" :disabled="useDisabled" :imageUrl="idCardImage" name="idCardImage">
              </upload-img>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="content-footer row" v-show="!useDisabled">
      <el-button v-if="!queryId" class="col-md-1 btn btn-primary makesure" :plain="true" @click="addFeeder('horseInfo')">确定</el-button>
      <el-button v-if="queryId" class="col-md-1 btn btn-primary makesure" :plain="true" @click="updateFeeder('horseInfo')">修改</el-button>
    </div>
  </div>
</template>

<script>
import { DatePicker, Button, Upload, Select, Message, Form } from "element-ui";
import UploadImg from '../../../../components/uploadImg/uploadImg.vue'
import horseSrv from '../../../services/horse.service.js'
import systemSrv from '../../../services/system.service.js'
export default {
  data() {
    return {
      horseInfo: {
        feederName: '',
        sex: '',
        skillDesc: '',
        horseId: '',
        hireDate: '',
      },
      idCardImage: '',
      files: {},
      horseInfoName: [],
      sexOptions: [],
      queryId: '',
      useDisabled: false
    };
  },
  components: {
    'upload-img': UploadImg,
  },
  mounted() {
     this.useDisabled = !!this.$route.query.disable;
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
      vm.queryId = to.query.queryId
      systemSrv.dictionary().then(resp => {
        let dictDetail = resp.data.dictionaryInfoList
        let len = dictDetail.length
        for (let i = 0; i < len; i++) {
          if (dictDetail[i].typeCode == 'SEX') {
            vm.sexOptions = dictDetail[i].dictionaryDetailList
          }
        }
        if (vm.queryId) {
          return horseSrv.getFeederDetail(vm.queryId);
        }
      }).then(resp => {
        vm.horseInfo = resp.data
        vm.horseInfo.sex = parseInt(resp.data.sex)
        vm.idCardImage = resp.data.idCardImage
      }).catch(err => {
        vm.$message.error(err.msg)
      });


    })
  },
  beforeRouteLeave(to, from, next) {
    to.meta.keepAlive = true
    next()
  },
  methods: {
    addFeeder(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var formData = new FormData()
          for (let key in this.files) {
            formData.append(key, this.files[key])
          }
          for (let key in this.horseInfo) {
            formData.append(key, this.horseInfo[key])
          }
          horseSrv.addFeeder(formData).then((resp) => {
            this.$message.success('添加饲养员信息成功')
            this.$router.push('/horse/feeder')
          }, (err) => {
            this.$message.error(err.msg)
          })
        } else {
          return false;
        }
      });
    },

    updateFeeder(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let horseInfo = {
            feederId: this.queryId,
            feederName: this.horseInfo.feederName,
            sex: this.horseInfo.sex,
            skillDesc: this.horseInfo.skillDesc,
            horseId: this.horseInfo.horseId,
            hireDate: this.horseInfo.hireDate,
          }
          var formData = new FormData()
          for (let key in this.files) {
            formData.append(key, this.files[key])
          }
          for (let key in horseInfo) {
            formData.append(key, horseInfo[key])
          }
          horseSrv.updateFeeder(formData).then((resp) => {
            this.$message.success('修改饲养员信息成功')
            this.$router.push('/horse/feeder')
          }, err => {
            this.$message.error(err.msg)
          })
        } else {
          return false;
        }
      });

    },
    resizeSelect() {
      this.$refs.selectSex.resetInputWidth()
    },
    resizeHorse() {
      this.$refs.selectHorse.resetInputWidth()
    },
    uploadFun(file) {
      this.files[file.name] = file.file.raw
    },

  }
};
</script>

<style lang="scss" scoped>

</style>

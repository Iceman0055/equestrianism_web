<template>
  <div class="content_page animated zoomIn">
    <div class="content-title">
      <div class="title" v-if="useDisabled">查看预约日程</div>
      <div class="title" v-if="!useDisabled &&queryId">修改预约日程</div>
      <div class="title" v-if="!queryId">新增预约日程</div>
      <router-link class="btn btn-info back" :to="'/hospital/appointment'">
        返回
      </router-link>
    </div>
    <div class="content-show">
      <el-form :model="hospitalInfo" label-width="120px" ref="hospitalInfo" class="demo-ruleForm" inline-message>
        <el-row>
          <el-col :span="8">
            <el-form-item label="预约时间：" prop="appointDate" :rules="[
                                                                                                                      { required: true, message: '请选择预约时间', trigger: 'change' },
                                                                                                                    ]">
              <el-date-picker :disabled="useDisabled" size="large" v-model="hospitalInfo.appointDate" format="yyyy-MM-dd HH:mm:00" value-format="yyyy-MM-dd HH:mm:00" type="datetime" placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="预约医生：" prop="userId" :rules="[
                                                                                                                      { required: true, message: '请选择预约医生', trigger: 'change' },
                                                                                                                    ]">
              <el-select :disabled="useDisabled" ref="selectDoctor" size="large" v-model="hospitalInfo.userId" class="el-field-input" placeholder="请选择">
                <el-option v-for="(item,index) in doctorList" :key="index" :label="item.realname" :value="item.userId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="预约状态：" prop="appointStatus" :rules="[
                                                                                                                      { required: true, message: '请选择预约状态', trigger: 'blur' },
                                                                                                                    ]">
              <el-select :disabled="useDisabled" ref="selectStatus" size="large" v-model="hospitalInfo.appointStatus" class="el-field-input" placeholder="请选择">
                <el-option v-for="(item,index) in statusList" :key="index" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="预约号：" prop="appointNumber" :rules="[
                                                                                                              { required: true, message: '请输入预约号', trigger: 'change' },
                                                                                                            ]">
              <el-input size="large" :disabled="useDisabled" v-model="hospitalInfo.appointNumber" placeholder="请输入预约号"></el-input>

            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="预约描述：" prop="appointDesc">
              <el-input size="large" :disabled="useDisabled" v-model="hospitalInfo.appointDesc" placeholder="请输入预约描述"></el-input>

            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系人：" prop="contacts" :rules="[ { required: true, message: '请输入联系人', trigger: 'blur' },
                                                                                                            ]">
              <el-input size="large" :disabled="useDisabled" v-model="hospitalInfo.contacts" placeholder="请输入联系人"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="联系方式：" prop="contactWay" :rules="[ { required: true, message: '请输入联系方式', trigger: 'blur' },
                                                                                                            ]">
              <el-input size="large" :disabled="useDisabled" v-model="hospitalInfo.contactWay" placeholder="请输入联系方式"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="备注：" prop="remark">
              <el-input size="large" :disabled="useDisabled" v-model="hospitalInfo.remark" placeholder="请输入备注"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="content-footer row" v-show="!useDisabled">
      <el-button v-if="!queryId" class="col-md-1 btn btn-primary makesure" :plain="true" @click="addAppoint('hospitalInfo')">确定</el-button>
      <el-button v-if="queryId" class="col-md-1 btn btn-primary makesure" :plain="true" @click="updateAppoint('hospitalInfo')">修改</el-button>
    </div>
  </div>
</template>
<script>
import { DatePicker, Button, Message, Form } from "element-ui";
import hospitalSrv from '../../../services/hospital.service.js'
export default {
  data() {
    return {
      hospitalInfo: {
        userId: '',
        appointDate: '',
        contacts: '',
        contactWay: '',
        appointNumber: '',
        appointDesc: '',
        remark: '',
        appointStatus: '',
      },
      queryId: '',
      useDisabled: false,

      doctorList: [],
      statusList: [{
        value: '1',
        label: '已预约'
      }, {
        value: '2',
        label: '已治疗'
      }, {
        value: '3',
        label: '取消'
      }],
    };
  },
  beforeRouteEnter: function(to, from, next) {
    next(vm => {
      hospitalSrv.getDoctor().then((resp) => {
        vm.doctorList = resp.data.veterinarianList
      }, (err) => {
        vm.$message.error(err.msg)
      })
      if (to.query.queryId) {
        vm.queryId = to.query.queryId
        hospitalSrv.getAppointDetail(vm.queryId).then(resp => {
          vm.hospitalInfo = resp.data
        }, err => {
          vm.$message.error(err.msg)
        })
      }
    })
  },
  mounted() {
    this.useDisabled = !!this.$route.query.disable;
    this.$el.addEventListener('animationend', this.resizeDoctor)
    this.$el.addEventListener('animationend', this.resizeStatus)
  },
  beforeRouteLeave(to, from, next) {
    to.meta.keepAlive = true
    next()
  },
  methods: {
    //新增
    addAppoint(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          hospitalSrv.addAppoint(this.hospitalInfo).then((resp) => {
            this.$message.success('添加预约日程成功')
            this.$router.push('/hospital/appointment')
          }, (err) => {
            this.$message.error(err.msg)
          })
        } else {
          return false;
        }
      });
    },
    //修改
    updateAppoint(formName) {
      this.hospitalInfo.hospitalAppointId = this.queryId
      this.$refs[formName].validate((valid) => {
        if (valid) {
          hospitalSrv.updateAppoint(this.hospitalInfo).then((resp) => {
            this.$message.success('修改预约日程成功')
            this.$router.push('/hospital/appointment')
          }, (err) => {
            this.$message.error(err.msg)
          })
        } else {
          return false;
        }
      });
    },
    // addAppoint() {
    //   if (!(this.appointDate && this.doctor && this.appointStatus && this.appointNumber && this.appointDesc && this.note)) {
    //     this.$message.error('预约日程信息不能为空！')
    //     return;
    //   }
    //   let appointInfo = {
    //     userId: this.doctor,
    //     appointDate: this.appointDate,
    //     contacts: this.contactPer,
    //     contactWay: this.contactWay,
    //     appointNumber: this.appointNumber,
    //     appointDesc: this.appointDesc,
    //     remark: this.note,
    //     appointStatus: this.appointStatus,
    //   }
    //   hospitalSrv.addAppoint(appointInfo).then((resp) => {
    //     this.$message.success('添加预约日程成功')
    //     this.$router.push('/hospital/appointment')
    //   }, (err) => {
    //     this.$message.error(err.msg)
    //   })
    // },
    resizeDoctor() {
      this.$refs.selectDoctor.resetInputWidth()
    },
    resizeStatus() {
      this.$refs.selectStatus.resetInputWidth()
    },
  }
}; 
</script>

<style lang="scss" scoped>

</style>

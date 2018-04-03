<template>
  <div class="content_page animated zoomIn">
    <div class="content-title">
      <div class="title">新增预约日程</div>
      <router-link class="btn btn-info back" :to="'/hospital/appointment'">
        返回
      </router-link>
    </div>
    <div class="content-show">
      <div class="row list-search">
        <div class="col-md-4 search-field">
          <div class="label">预约时间：</div>
          <el-date-picker size="large" v-model="appointDate" format="yyyy-MM-dd HH:mm:00" value-format="yyyy-MM-dd HH:mm:00" type="datetime" placeholder="选择日期时间">
          </el-date-picker>
        </div>
        <div class="col-md-4 search-field">
          <div class="label">预约医生：</div>
          <el-select ref="selectDoctor" size="large" v-model="doctor" class="el-field-input" placeholder="请选择">
            <el-option v-for="item in doctorList" :key="item.userId" :label="item.realname" :value="item.userId">
            </el-option>
          </el-select>
        </div>
        <div class="col-md-4 search-field">
          <div class="label">预约状态：</div>
          <el-select ref="selectStatus" size="large" v-model="appointStatus" class="el-field-input" placeholder="请选择">
            <el-option v-for="item in statusList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="row list-search">
        <div class="col-md-4 search-field">
          <div class="label">预约号：</div>
          <input type="text" v-model="appointNumber" class="form-control input-field" placeholder="请输入预约号" />
        </div>
        <div class="col-md-4 search-field">
          <div class="label">预约描述：</div>
          <input type="text" v-model="appointDesc" class="form-control input-field" placeholder="请输入预约描述" />
        </div>
        <div class="col-md-4 search-field">
          <div class="label">联系人：</div>
          <input type="text" v-model="contactPer" class="form-control input-field" placeholder="请输入联系人(非必填)" />
        </div>
      </div>
      <div class="row list-search">
        <div class="col-md-4 search-field">
          <div class="label">联系方式：</div>
          <input type="text" v-model="contactWay" class="form-control input-field" placeholder="请输入联系方式(非必填)" />
        </div>
        <div class="col-md-4 search-field">
          <div class="label">备注：</div>
          <input type="text" v-model="note" class="form-control input-field" placeholder="请输入备注" />
        </div>
      </div>

    </div>
    <div class="content-footer row">
      <el-button class="col-md-1 btn btn-primary makesure" :plain="true" @click="addAppoint">确定</el-button>
    </div>
  </div>
</template>
<script>
import { DatePicker, Button, Message } from "element-ui";
import hospitalSrv from '../../../services/hospital.service.js'
export default {
  data() {
    return {
      appointNumber: '',
      appointDate: '',
      appointDesc: '',
      note: '',
      contactPer: '',
      contactWay: '',
      doctorList: [],
      doctor: '',
      appointStatus: '',
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
    })
  },
  mounted() {
    this.$el.addEventListener('animationend', this.resizeDoctor)
    this.$el.addEventListener('animationend', this.resizeStatus)
  },
  methods: {
    addAppoint() {
      if (!(this.appointDate && this.doctor && this.appointStatus && this.appointNumber && this.appointDesc && this.note)) {
        this.$message.error('预约日程信息不能为空！')
        return;
      }
      let appointInfo = {
        userId: this.doctor,
        appointDate: this.appointDate,
        contacts: this.contactPer,
        contactWay: this.contactWay,
        appointNumber: this.appointNumber,
        appointDesc: this.appointDesc,
        remark: this.note,
        appointStatus: this.appointStatus,
      }
      hospitalSrv.addAppoint(appointInfo).then((resp) => {
        this.$message.success('添加预约日程成功')
        this.$router.push('/hospital/appointment')
      }, (err) => {
        this.$message.error(err.msg)
      })
    },
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

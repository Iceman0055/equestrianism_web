<template>
    <div class="content_page animated zoomIn">
        <div class="content-title">
            <div class="title">增加诊疗室信息</div>
            <router-link class="btn btn-info back" :to="'/hospital/operateRoom'">
                返回
            </router-link>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">诊疗室名称：</div>
                    <input type="text" v-model="name" class="form-control input-field" placeholder="请输入诊疗室名称" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">诊疗室简称：</div>
                    <input type="text" v-model="shortName" class="form-control" placeholder="请输入诊疗室简称" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">备注：</div>
                 <input type="text" v-model="remark" class="form-control" placeholder="请输入备注" />
                </div>
            </div>
        </div>
        <div class="content-footer row">
            <el-button class="col-md-1 btn btn-primary makesure" :plain="true" @click="addOperateRoom">确定</el-button>
        </div>
    </div>
</template>

<script>
import { DatePicker, Button, Message } from 'element-ui'
import hospitalSrv from '../../../services/hospital.service.js'
export default {
    data() {
        return {
            name: '',
            shortName: '',
            remark:'',
        }
    },
    methods: {
        addOperateRoom() {
      if (!(this.name && this.shortName && this.remark)) {
        this.$message.error('诊疗室信息不能为空！')
        return;
      }
      let operateInfo = {
        name: this.name,
        shortName: this.shortName,
        remark: this.remark,
      }
      hospitalSrv.addOperateRoom(operateInfo).then((resp) => {
        this.$message.success('添加诊疗室成功')
        this.$router.push('/hospital/operateRoom')
      }, (err) => {
        this.$message.error(err.msg)
      })
    },
    }
}
</script>

<style lang="scss" scoped>

</style>

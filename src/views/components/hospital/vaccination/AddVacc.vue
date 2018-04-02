<template>
    <div class="content_page animated zoomIn">
        <div class="content-title">
            <div class="title">新增接种疫苗信息</div>
            <router-link class="btn btn-info back" :to="'/hospital/Vaccination'">
                返回
            </router-link>
        </div>
        <div class="content-show">
            <div class="row list-search">
                 <div class="col-md-4 search-field">
                    <div class="label">马匹名称：</div>
                    <el-select ref="selectHorse" size="large" filterable v-model="horseName" class="el-field-input" placeholder="请选择马匹名称">
                        <el-option v-for="item in horseInfoName" :key="item.horseId" :label="item.horseName" :value="item.horseId">
                        </el-option>
                    </el-select>               
                 </div>
                <div class="col-md-4 search-field">
                    <div class="label">地点：</div>
                    <input type="text" v-model="address" class="form-control input-field" placeholder="请输入地点" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">时间：</div>
                    <el-date-picker class="el-field-input" format="yyyy-MM-dd HH:mm:00" value-format="yyyy-MM-dd HH:mm:00" size="large" v-model="time" type="datetime" placeholder="选择时间">
                    </el-date-picker>
                </div>
                
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">名称：</div>
                    <input type="text" v-model="name" class="form-control input-field" placeholder="请输入名称" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">预防疾病：</div>
                    <input type="text" v-model="preventDisease" class="form-control input-field" placeholder="请输入预防疾病" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">处理人：</div>
<el-select ref="selectPeople" size="large" v-model="dealPeople" class="el-field-input" placeholder="请选择">
                        <el-option v-for="item in feederInfo" :key="item.userId" :label="item.realname" :value="item.userId">
                        </el-option>
                    </el-select>                </div>
               
            </div>
              <div class="row list-search">
                 <div class="col-md-4 search-field">
                    <div class="label">疫苗编号：</div>
                    <input type="text" v-model="vaccineNum" class="form-control input-field" placeholder="请输入疫苗编号" />
                </div>
              </div>

        </div>
        <div class="content-footer row">
            <el-button class="col-md-1 btn btn-primary makesure" :plain="true" @click="addVacc">确定</el-button>
        </div>
    </div>
</template>

<script>
import { DatePicker, Button, Select, Message } from "element-ui";
import hospitalSrv from "../../../services/hospital.service.js";
import horseSrv from '../../../services/horse.service.js'
export default {
  data() {
    return {
      address: "",
      name: "",
      time: "",
      dealPeople: "",
      preventDisease: "",
      vaccineNum: "",
      horseInfoName: [],
      horseName: "",
      feederInfo:[],
    };
  },
    mounted() {
        this.$el.addEventListener('animationend', this.resizeHorse)
        this.$el.addEventListener('animationend', this.resizePeople)
    },
  components: {
    "el-date-picker": DatePicker,
    "el-button": Button,
    "el-select": Select
  },
  beforeRouteEnter: function(to, from, next) {
    next(vm => {
      horseSrv.getHorseName().then(
        resp => {
          vm.horseInfoName = resp.data.horseList;
        },
        err => {
          vm.$message.error(err.msg);
        }
      );
      hospitalSrv.getFeeder().then(
        resp => {
          vm.feederInfo = resp.data.veterinarianList;
        },
        err => {
          vm.$message.error(err.msg);
        }
      );
    });
  },
  methods: {
       addVacc() {
            if (!(this.dealPeople && this.horseName && this.time&& this.address
            && this.name&& this.preventDisease&& this.vaccineNum)) {
                this.$message.error('接种疫苗信息不能为空！')
                return;
            }
            let vaccInfo = {
                userId: this.dealPeople,
                horseId: this.horseName,
                operateDate: this.time,
                operatePlace:this.address,
                name:this.name,
                vaccinationName:this.preventDisease,
                vaccinationNumber:this.vaccineNum
            }
            hospitalSrv.addVacc(vaccInfo).then((resp) => {
                this.$message.success('添加疫苗信息成功')
                this.$router.push('/hospital/Vaccination')
            }, (err) => {
                this.$message.error(err.msg)
            })
        },
    resizeHorse() {
            this.$refs.selectHorse.resetInputWidth()
        },
        resizePeople() {
            this.$refs.selectPeople.resetInputWidth()
        },
  }
};
</script>

<style lang="scss" scoped>

</style>

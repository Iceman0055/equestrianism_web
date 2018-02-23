<template>
    <div class="content_page animated zoomIn">
        <div class="content-title">
            <div class="title">新增获奖信息</div>
            <router-link class="btn btn-info back" :to="'/horse/awards'">
                返回
            </router-link>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">比赛名称：</div>
                    <input type="text" v-model="gameName" class="form-control input-field" placeholder="请输入变更马名" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">获奖时间：</div>
                    <el-date-picker class="el-field-input" size="large" v-model="awardsTime" type="date" placeholder="选择获奖时间">
                    </el-date-picker>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">地点：</div>
                    <input type="text" v-model="address" class="form-control input-field" placeholder="请输入马的出生国家" />
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">奖项：</div>
                    <input type="text" v-model="awards" class="form-control input-field" placeholder="请输入马获奖的奖项" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">罚分项：</div>
                    <input type="text" v-model="penalty" class="form-control input-field" placeholder="请输入罚分项" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">颁奖方：</div>
                    <input type="text" v-model="awardParty" class="form-control input-field" placeholder="请输入颁奖方" />
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">马匹：</div>
                    <el-select ref="selectInput" size="large" v-model="horse" class="el-field-input" placeholder="请选择">
                        <el-option v-for="item in horseOptions" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">照片：</div>
                    <upload-img v-on:uploadFun="uploadFun" name="horseImg" :imageUrl="horseImg">
                    </upload-img>
                </div>
            </div>
        </div>
        <div class="content-footer row">
            <el-button class="col-md-1 btn btn-primary makesure" :plain="true" @click="addAwards">确定</el-button>
        </div>
    </div>
</template>
<script>
import { DatePicker, Button, Upload, Select, Message} from "element-ui";
import UploadImg from '../../../../components/uploadImg/uploadImg.vue'
import horseSrv from '../../../services/horse.service.js'
export default {
    data() {
        return {
            awardParty: '',
            penalty: '',
            awards: '',
            gameName: '',
            awardsTime: '',
            address: '',
            horseImg: '',
            selectValue: '',
            horse: "",
            files: {},
            awardsInfo:{},
            horseOptions: [{
                value: '1',
                label: '马匹1'
            }, {
                value: '2',
                label: '马匹2'
            }],
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
    },
    methods: {
        resizeSelect() {
            this.$refs.selectInput.resetInputWidth()
        },
        uploadFun(file) {
            this.files[file.name] = file.file.raw
        },
        addAwards(){      
            if (!(this.gameName && this.awardsTime && this.address && this.awards &&
                this.penalty && this.awardParty && this.horse && this.horseImg)) {
                this.$message.error('获奖信息不能为空！')
                return;
            }
            this.awardsInfo = {
                gameName: this.gameName,
                awardsTime: this.awardsTime,
                address: this.address,
                awards: this.awards,
                penalty: this.penalty,
                awardParty: this.awardParty,
                horse: this.horse,
            }
            var formData = new FormData()
            for (let key in this.files) {
                formData.append(key, this.files[key])
            }
            for (let key in this.awardsInfo) {
                formData.append(key, this.awardsInfo[key])
            }
            horseSrv.addAwardsInfo(formData).then((resp) => {
                this.$message.success('添加获奖信息成功')
                this.$router.push('/horse/awards')
            }, err => {
                this.$message.error(err.note)
            }) 
        
        }
    }
};
</script>

<style lang="scss" scoped>

</style>

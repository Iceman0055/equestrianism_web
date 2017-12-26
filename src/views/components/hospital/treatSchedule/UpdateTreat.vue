<template>
    <div class="content_page animated zoomIn">
        <div class="content-title">
            <div class="title" v-if="!useDisabled">修改门诊治疗</div>
            <div class="title" v-if="useDisabled">查看门诊治疗</div>
            <router-link class="btn btn-info back" :to="'/hospital/treatSchedule'">
                返回
            </router-link>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">门诊方式：</div>
                    <el-select size="large" :disabled="useDisabled" v-model="selectValue22" class="el-field-input">
                        <el-option v-for="item in options12" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="col-md-4 search-field" v-if="selectValue22==1">
                    <div class="label">预约号：</div>
                    <input type="text" :disabled="useDisabled" class="form-control input-field" />
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">开始日期：</div>
                    <el-date-picker :disabled="useDisabled" size="large" v-model="value122" type="date" format="yyyy-MM-dd">
                    </el-date-picker>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">开始时间：</div>
                    <el-time-select :disabled="useDisabled" size="large" v-model="value34" :picker-options="{
                                                    start: '00:00',
                                                    step: '01:00',
                                                    end: '24:00'
                                                  }">
                    </el-time-select>
                </div>

            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">结束日期：</div>
                    <el-date-picker :disabled="useDisabled" size="large" v-model="value222" type="date" format="yyyy-MM-dd">
                    </el-date-picker>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">结束时间：</div>
                    <el-time-select :disabled="useDisabled" size="large" v-model="value44" :picker-options="{
                                                    start: '00:00',
                                                    step: '01:00',
                                                    end: '24:00'
                                                  }">
                    </el-time-select>
                </div>

            </div>
            <div class="row list-search">

                <div class="col-md-4 search-field">
                    <div class="label">马匹类型：</div>
                    <el-select size="large" v-model="selectValue223" :disabled="useDisabled" class="el-field-input">
                        <el-option v-for="item in options123" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">马匹名称：</div>
                    <input type="text" :disabled="useDisabled" class="form-control input-field" />
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">治疗时间：</div>
                    <el-date-picker class="el-field-input" :disabled="useDisabled" format="yyyy-MM-dd HH:mm:ss" size="large" v-model="value" type="date">
                    </el-date-picker>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">治疗名称：</div>
                    <input type="text" :disabled="useDisabled" class="form-control input-field" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">治疗概述：</div>
                    <input type="text" :disabled="useDisabled" class="form-control input-field" />
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">手术室使用：</div>
                    <el-select size="large" :disabled="useDisabled" v-model="selectValue" class="el-field-input">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label" style="left:-14px">固定资产使用：</div>
                    <el-select size="large" :disabled="useDisabled" v-model="value5" class="el-field-input" multiple>
                        <el-input v-model="input" style="padding:0 10px;" size="small">
                            <el-button slot="append" icon="el-icon-search"></el-button>
                        </el-input>
                        <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
                            <span style="float: left">{{ item.label }}</span>
                            <span style="margin-left:12px; color: #8492a6; font-size: 13px">{{ item.value }}</span>
                        </el-option>
                    </el-select>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">消耗品使用：</div>
                    <el-select size="large" :disabled="useDisabled" v-model="selectValue" class="el-field-input">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="baseInfo-title">
                <div class="title">增加病历</div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">时间：</div>
                    <el-date-picker :disabled="useDisabled" size="large" v-model="value22" type="datetime">
                    </el-date-picker>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">地点：</div>
                    <input type="text" :disabled="useDisabled" class="form-control input-field" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">临诊：</div>
                    <input type="text" :disabled="useDisabled" class="form-control input-field" />
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">初诊：</div>
                    <input type="text" :disabled="useDisabled" class="form-control input-field" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">处方用药：</div>
                    <input type="text" :disabled="useDisabled" class="form-control input-field" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">医嘱：</div>
                    <input type="text" :disabled="useDisabled" class="form-control input-field" />
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">标题标签：</div>
                    <input type="text" :disabled="useDisabled" class="form-control input-field" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">备注：</div>
                    <input type="text" :disabled="useDisabled" class="form-control input-field" />
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">x光照片：</div>
                    <upload-img :useDisabled="useDisabled" :imageUrl="xRayImg">
                    </upload-img>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">数据照片：</div>
                    <upload-img :useDisabled="useDisabled" :imageUrl="dataImg">
                    </upload-img>
                </div>
            </div>
        </div>
        <div class="content-footer row" v-show="!useDisabled">
            <el-button class="col-md-1 btn btn-primary makesure" :plain="true" @click="open">确定</el-button>
        </div>
    </div>
</template>
<script>
import { DatePicker, Button, TimeSelect, Input } from "element-ui";
import UploadImg from '../../../uploadImg/UploadImg.vue'
/* eslint-disable */
export default {
    data() {
        return {
            input:'',
            value122: "",
            value123: "",
            value222: "",
            value223: "",
            value22: "",
            xRayImg: '',
            dataImg: '',
            selectValue223: '',
            selectValue22: "",
            selectValue: '',
            value5: [],
            value: '',
            useDisabled: false,
               options: [
                {
                    value: "选项1",
                    label: "数据1"
                },
                {
                    value: "选项2",
                    label: "数据2"
                }
            ],
            options12: [
                {
                    value: "1",
                    label: "预约"
                },
                {
                    value: "2",
                    label: "普通"
                }
            ],
            options123: [
                {
                    value: "1",
                    label: "中心"
                },
                {
                    value: "2",
                    label: "外来"
                }
            ],
            options2: [{
                value: '库存1',
                label: '数据1'
            }, {
                value: '库存2',
                label: '数据2'
            }, {
                value: '库存3',
                label: '数据3'
            }],
        };
    },
    components: {
        "el-date-picker": DatePicker,
        "el-button": Button,
        "el-time-select": TimeSelect,
        "el-input": Input,
        'upload-img': UploadImg,
    },
    mounted() {
        this.useDisabled = !!this.$route.query.disable
    },
    methods: {
        open() {
            this.$message.success("修改成功");
        },

    }
};
</script>

<style lang="scss" scoped>
.baseInfo-title {
    height: 30px;
    line-height: 30px;
    border-left: 2px solid #2db7f5;
    padding-left: 20px;
    padding-right: 20px;
    margin-bottom: 12px;
    .title {
        font-size: 16px;
        font-weight: bold;
        display: inline-block;
    }
}
</style>

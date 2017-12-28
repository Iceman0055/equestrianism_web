<template>
    <div class="content_page animated zoomIn">
        <div class="content-title">
            <div class="title">新增治疗日程</div>
            <router-link class="btn btn-info back" :to="'/hospital/treatSchedule'">
                返回
            </router-link>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">门诊方式：</div>
                    <el-select size="large" v-model="selectValue22" class="el-field-input" placeholder="请选择">
                        <el-option v-for="item in options12" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="col-md-4 search-field" v-if="selectValue22==1">
                    <div class="label">预约号：</div>
                    <input type="text" class="form-control input-field" placeholder="请输入预约号称" />
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">开始日期：</div>
                    <el-date-picker size="large" v-model="value122" type="date" format="yyyy-MM-dd" placeholder="选择日期时间">
                    </el-date-picker>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">开始时间：</div>
                    <el-time-select size="large" v-model="value34" :picker-options="{
                                                                start: '00:00',
                                                                step: '01:00',
                                                                end: '24:00'
                                                              }" placeholder="选择时间">
                    </el-time-select>
                </div>

            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">结束日期：</div>
                    <el-date-picker size="large" v-model="value222" type="date" format="yyyy-MM-dd" placeholder="选择日期时间">
                    </el-date-picker>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">结束时间：</div>
                    <el-time-select size="large" v-model="value44" :picker-options="{
                                                                start: '00:00',
                                                                step: '01:00',
                                                                end: '24:00'
                                                              }" placeholder="选择时间">
                    </el-time-select>
                </div>

            </div>

            <div class="row list-search">

                <div class="col-md-4 search-field">
                    <div class="label">马匹类型：</div>
                    <el-select size="large" v-model="selectValue223" class="el-field-input" placeholder="请选择">
                        <el-option v-for="item in options123" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">马匹名称：</div>
                    <input type="text" class="form-control input-field" placeholder="请输入马匹名称" />
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">治疗时间：</div>
                    <el-date-picker class="el-field-input" format="yyyy-MM-dd HH:mm:ss" size="large" v-model="value" type="date" placeholder="选择获奖时间">
                    </el-date-picker>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">治疗名称：</div>
                    <input type="text" class="form-control input-field" placeholder="请输入治疗名称" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">治疗概述：</div>
                    <input type="text" class="form-control input-field" placeholder="请输入治疗概述" />
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">手术室使用：</div>
                    <el-select size="large" v-model="selectValue1" class="el-field-input" placeholder="请选择">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">设备使用：</div>
                    <el-select size="large" v-model="value5" class="el-field-input" multiple placeholder="请选择">
                          <el-input v-model="input1" style="padding:0 10px;" size="small" placeholder="请输入内容">
                            <el-button slot="append" icon="el-icon-search"></el-button>
                        </el-input>
                          <div class="row mb-3" v-for="(item,index) in assets" :key="item">
                            <div class="col-md-2 search-field">
                                <input type="text" v-model="item.id" class="form-control input-field" placeholder="编号" />
                            </div>
                            <div class="col-md-2 search-field">
                                <input type="text" disabled v-model="item.name" class="form-control input-field" placeholder="名称" />
                            </div>
                            <div class="col-md-2 search-field">
                                <div class="Spinner">
                                    <a class="Decrease" @click="decrease(index,item.value)">
                                        <i class="fa fa-sort-desc"></i>
                                    </a>
                                    <input class="Amount" v-model="item.value" autocomplete="off">
                                    <a class="Increase" @click="increase(index,item.value)">
                                        <i class="fa fa-sort-asc"></i>
                                    </a>
                                </div>
                            </div>
                            <div class="col-md-1 search-field">
                                <div class="add-delete">
                                    <a @click="addData">
                                        <i class="fa fa-plus-circle"></i>
                                    </a>
                                    <a @click="confirmDialog=true">
                                        <i class="fa fa-minus-circle"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
                            <span style="float: left">{{ item.label }}</span>
                            <span style="margin-left:12px; color: #8492a6; font-size: 13px">{{ item.value }}</span>
                        </el-option>
                    </el-select>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">消耗品使用：</div>
                    <el-select size="large" v-model="value6" @change="centerDialogVisible=true" class="el-field-input" multiple placeholder="请选择">
                        <el-input v-model="input1" style="padding:0 10px;" size="small" placeholder="请输入内容">
                            <el-button slot="append" icon="el-icon-search"></el-button>
                        </el-input>
                        <el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value">
                            <span style="float: left">{{ item.label }}</span>
                            <span style="margin-left:12px; color: #8492a6; font-size: 13px">{{ item.value }}</span>
                        </el-option>
                    </el-select>
                </div>
            </div>

            <div class="baseInfo-title">
                <div class="title">新增病历</div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">时间：</div>
                    <el-date-picker size="large" v-model="value22" type="datetime" placeholder="选择日期时间">
                    </el-date-picker>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">地点：</div>
                    <input type="text" class="form-control input-field" placeholder="请输入地点" />
                </div>

                <div class="col-md-4 search-field">
                    <div class="label">处方用药：</div>
                    <input type="text" class="form-control input-field" placeholder="请输入处方用药" />
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">初诊：</div>
                    <el-input type="textarea" :rows="2" placeholder="请输入初诊" v-model="firstTreat">
                    </el-input>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">临诊：</div>
                    <el-input type="textarea" :rows="2" placeholder="请输入临诊" v-model="secondTreat">
                    </el-input>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">医嘱：</div>
                    <el-input type="textarea" :rows="2" placeholder="请输入医嘱" v-model="advice">
                    </el-input>
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">标题标签：</div>
                    <input type="text" class="form-control input-field" placeholder="请输入标题标签" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">备注：</div>
                    <input type="text" class="form-control input-field" placeholder="请输入备注" />
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">x光照片：</div>
                    <multiple-img v-on:successFile="successFile" v-on:removeFile="removeFile" :imageUrl="xRayImg">
                    </multiple-img>
                </div>
            </div>

            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">数据照片：</div>
                    <multiple-img v-on:successFile="successFile" v-on:removeFile="removeFile" :imageUrl="dataImg">
                    </multiple-img>
                </div>
            </div>
        </div>
        <div class="content-footer row">
            <el-button class="col-md-1 btn btn-primary makesure" :plain="true" @click="open">确定</el-button>
        </div>
        <el-dialog title="增加库存" :modal-append-to-body="false" :visible.sync="centerDialogVisible" width="52%" center>
                        <div class="row mb-3" v-for="(item,index) in assets" :key="item">
                            <div class="col-md-4 search-field">
                                <input type="text" v-model="item.id" class="form-control input-field" placeholder="编号" />
                            </div>
                            <div class="col-md-4 search-field">
                                <input type="text" disabled v-model="item.name" class="form-control input-field" placeholder="名称" />
                            </div>
                            <div class="col-md-3 search-field">
                                <div class="Spinner">
                                    <a class="Decrease" @click="decrease(index,item.value)">
                                        <i class="fa fa-sort-desc"></i>
                                    </a>
                                    <input class="Amount" v-model="item.value" autocomplete="off">
                                    <a class="Increase" @click="increase(index,item.value)">
                                        <i class="fa fa-sort-asc"></i>
                                    </a>
                                </div>
                            </div>
                            <div class="col-md-1 search-field">
                                <div class="add-delete">
                                    <a @click="addData">
                                        <i class="fa fa-plus-circle"></i>
                                    </a>
                                    <a @click="confirmDialog=true">
                                        <i class="fa fa-minus-circle"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="centerDialogVisible = false">取 消</el-button>
                            <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
                        </span>
                    </el-dialog>
    </div>
</template>
<script>
import { DatePicker, Button, Input, TimeSelect, Upload } from "element-ui";
import MultipleImg from '../../../uploadImg/MultipleImg.vue'
/* eslint-disable */
export default {
    data() {
        return {
            centerDialogVisible:false,
            firstTreat:'',
            secondTreat:'',
            advice:'',
            input: '',
            input1: '',
            dialogImageUrl: '',
            files: {},
            xRayImg: '',
            dataImg: '',
            selectValue223: '',
            selectValue22: "",
            value44: "",
            value34: "",
            value5: [],
            value6: [],
            beginValue: "",
            selectValue: "",
            selectValue1: "",
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
            options2: [
                {
                    value: "库存1",
                    label: "数据1"
                },
                {
                    value: "库存2",
                    label: "数据2"
                },
                {
                    value: "库存3",
                    label: "数据3"
                }
            ],
            options3: [
                {
                    value: "库存1",
                    label: "假数据1"
                },
                {
                    value: "库存2",
                    label: "假数据2"
                },
                {
                    value: "库存3",
                    label: "假数据3"
                }
            ],

            value122: "",
            value123: "",
            value222: "",
            value223: "",
            value22: "",
            value: "",
             index: 0,
            assets: [
                { id: "1", name: "123", value: "123" },
                { id: "2", name: "123", value: "123" },
                { id: "3", name: "123", value: "123" }
            ]
        };
    },
    components: {
        "el-date-picker": DatePicker,
        "el-button": Button,
        "el-time-select": TimeSelect,
        "el-input": Input,
        'multiple-img': MultipleImg,
    },
    methods: {
        successFile(res) {
            //上传成功后，接口返回的值，点击确定把这个值再传过去
            console.log(res)
        },
        removeFile(file) {
            console.log(file)
        },
        open() {
            this.$message.success('修改成功')
        },
         deleteData(index) {
            this.assets.splice(index, 1)
            this.confirmDialog = false
        },
        addData() {
            this.assets.push({
                id: "",
                name: "",
                value: 0
            });
        },
        //增加
        increase(index, value) {
            return this.assets[index].value++;
        },
        //减少
        decrease(index, value) {
            this.index = index
            if (value <= 0) {
                return 0;
            } else {
                return this.assets[index].value--;
            }
        }

    }
};
</script>

<style lang="scss" scoped>
.el-select-dropdown__list {
    height: 139px !important;
    overflow-y: scroll !important;
}

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

.add-delete a {
    margin-left: 5px;
    cursor: pointer;
}

.add-delete {
    color: #409eff;
    margin-left: -40px;
    float: left;
    font-size: 40px;
    display: inline-flex;
}

.input-field {
    border-radius: 5px;
    height: 40px;
}

.Spinner {
    display: block;
    overflow: hidden;
    width: 160px;
    margin-top: 3px;
}

.Spinner a {
    display: inline-block;
    width: 35px;
    height: 35px;
    border: 1px solid #d9d9d9;
    background-color: #f7f7f7;
    float: left;
    cursor: pointer;
    outline: 0;
}

.Spinner .Amount {
    width: 50px;
    height: 35px;
    border-width: 1px 0;
    border-style: solid;
    border-color: #d9d9d9;
    float: left;
    text-align: center;
    color: #565656;
    outline: 0;
}

.Decrease i {
    padding-left: 10px;
    font-size: 20px;
    color: #409eff;
}

.Increase i {
    padding-left: 10px;
    position: relative;
    top: 8px;
    font-size: 22px;
    color: #409eff;
}
</style>

<template>
    <div class="content_page animated zoomIn">
        <div class="content-title">
            <div class="title">新增固定资产管理</div>
            <router-link class="btn btn-info back" :to="'/equestrian/horseAssets'">
                返回
            </router-link>
        </div>
        <div class="content-show">
            <el-form :model="assetsInfo" label-width="120px" ref="ruleForm" class="demo-ruleForm" inline-message>
                <el-row>
                    <el-col :offset="8" :span="8">
                        <el-form-item label="条形码：" prop="barCode" :rules="[
                                  { required: true, message: '请输入条形码', trigger: 'blur' },
                                ]">
                            <el-input size="large" v-model="assetsInfo.barCode" placeholder="请输入条形码"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="资产大类：" prop="assetType" :rules="[
                                  { required: true, message: '请选择资产大类', trigger: 'change' },
                                ]">
                            <el-select ref="selectCate" size="large" v-model="assetsInfo.assetType" class="el-field-input" placeholder="请选择">
                                <el-option v-for="(item,index) in assetTypeList" :key="index" :label="item.typeName" :value="item.typeId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="资产分类：" prop="typeDetail" :rules="[
                                  { required: true, message: '请选择资产分类', trigger: 'change' },
                                ]">
                            <el-select @focus="getAssetsType" ref="selectClass" size="large" v-model="assetsInfo.typeDetail" class="el-field-input" placeholder="请选择">
                                <el-option v-for="(item,index) in typeDetailList" :key="index" :label="item.typeDetailName" :value="item.typeDetailId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="资产编号：" prop="assetsNum" :rules="[
                                  { required: true, message: '请输入资产编号', trigger: 'blur' },
                                ]">
                            <el-input size="large" v-model="assetsInfo.assetsNum" placeholder="请输入资产编号"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="资产名称：" prop="assetsName" :rules="[
                                  { required: true, message: '请输入资产名称', trigger: 'blur' },
                                ]">
                            <el-input size="large" v-model="assetsInfo.assetsName" placeholder="请输入资产名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="价值：" prop="value">
                            <el-input size="large" v-model="assetsInfo.value" placeholder="请输入价值"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="面积：" prop="area">
                            <el-input size="large" v-model="assetsInfo.area" placeholder="请输入面积"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="规格型号：" prop="format">
                            <el-input size="large" v-model="assetsInfo.format" placeholder="请输入规格型号"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="价值类型：" prop="valueType">
                            <el-select ref="selectValue" size="large" v-model="assetsInfo.valueType" class="el-field-input" placeholder="请选择">
                                <el-option v-for="(item,index) in valueOptions" :key="index" :label="item.itemValue" :value="item.dictionaryDetailId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="取得方式：" prop="getWay">
                            <el-select ref="selectWay" size="large" v-model="assetsInfo.getWay" class="el-field-input" placeholder="请选择">
                                <el-option v-for="(item,index) in wayOptions" :key="index" :label="item.itemValue" :value="item.dictionaryDetailId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="财务入账日期：" prop="financialDate">
                            <el-date-picker class="el-field-input" size="large" v-model="assetsInfo.financialDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="date" placeholder="选择财务出账日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="制单日期：" prop="makeDate">
                            <el-date-picker class="el-field-input" size="large" v-model="assetsInfo.makeDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="date" placeholder="选择制单日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="保修截止日期：" prop="endDate">
                            <el-date-picker class="el-field-input" size="large" v-model="assetsInfo.endDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="date" placeholder="选择保修截止日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="管理部门：" prop="departName">
                            <el-select size="large" ref="selectDepart" v-model="assetsInfo.departName" class="el-field-input" placeholder="请选择管理部门">
                                <el-option v-for="(item,index) in departList" :key="index" :label="item.departmentName" :value="item.departmentId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="管理人：" prop="managePeople">
                            <el-input size="large" v-model="assetsInfo.managePeople" placeholder="请输入管理人"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="设计用途：" prop="designPurpose">
                            <el-input size="large" v-model="assetsInfo.designPurpose" placeholder="请输入设计用途"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="品牌：" prop="brand">
                            <el-input size="large" v-model="assetsInfo.brand" placeholder="请输入品牌"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="会记凭证号：" prop="voucherNum">
                            <el-input size="large" v-model="assetsInfo.voucherNum" placeholder="请输入会记凭证号"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="采购组织形式：" prop="buyForm">
                            <el-input size="large" v-model="assetsInfo.buyForm" placeholder="请输入采购组织形式"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="备注：" prop="note">
                            <el-input size="large" v-model="assetsInfo.note" placeholder="请输入备注"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="数量：" prop="inventory">
                            <el-input size="large" min="0" type="number" v-model="assetsInfo.inventory" placeholder="请输入数量"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="使用状态：" prop="useStatus">
                            <el-input size="large" v-model="assetsInfo.useStatus" placeholder="请输入使用状态"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="资金来源：" prop="financeSource">
                            <el-input size="large" v-model="assetsInfo.financeSource" placeholder="请输入资金来源"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="报废日期：" prop="scrapDate">
                            <el-date-picker class="el-field-input" size="large" @change="changeDate" v-model="assetsInfo.scrapDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="date" placeholder="选择制单日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="报废剩余日期：" prop="leftDate">
                            <el-input size="large" v-model="assetsInfo.leftDate"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div class="content-footer row">
            <el-button class="col-md-1 btn btn-primary makesure" :plain="true" @click="addAssets">确定</el-button>
        </div>
    </div>
</template>

<script>
import { DatePicker, Button, Select, Message, Form } from "element-ui";
import equestrianSrv from "../../../services/equestrian.service.js";
import systemSrv from "../../../services/system.service.js";
import moment from "moment";
export default {
    data() {
        return {
            assetsInfo: {
                barCode: "",
                assetType: '',
                typeDetail: '',
                assetsNum: '',
                assetsName: '',
                value: '',
                area: '',
                format: '',
                valueType: '',
                getWay: '',
                financialDate: '',
                makeDate: '',
                endDate: '',
                departName: '',
                managePeople: '',
                designPurpose: '',
                brand: '',
                voucherNum: '',
                buyForm: '',
                note: '',
                inventory: '',
                useStatus: '',
                financeSource: '',
                scrapDate: '',
                leftDate: '',
            },
            note: "",
            designPurpose: "",
            format: "",
            brand: "",
            voucherNum: "",
            buyForm: "",
            assetsNum: "",
            assetsName: "",
            value: "",
            area: "",
            valueType: "",
            getWay: "",
            financialDate: "",
            makeDate: "",
            endDate: "",
            typeDetail: "",
            assetType: "",
            assetTypeList: [],
            typeDetailList: [],
            valueOptions: [],
            wayOptions: [],
            departName: "",
            //   userList: [],
            departList: [],
            managePeople: "",
            barCode: "",
            inventory: "",
            useStatus: "",
            financeSource: "",
            scrapDate: "",
            leftDate: ""
        };
    },
    mounted() {
        this.$el.addEventListener("animationend", this.valueResize);
        this.$el.addEventListener("animationend", this.wayResize);
        this.$el.addEventListener("animationend", this.cateResize);
        this.$el.addEventListener("animationend", this.classResize);
        this.$el.addEventListener("animationend", this.departResize);
        // this.$el.addEventListener("animationend", this.peopleResize);
    },
    beforeRouteEnter: function(to, from, next) {
        next(vm => {
            systemSrv.assetsInfoComboBox().then(
                resp => {
                    vm.assetTypeList = resp.data.assetTypeList;
                },
                err => {
                    vm.$message.error(err.msg);
                }
            );
            systemSrv.getDepart().then(
                resp => {
                    vm.departList = resp.data.departmentList;
                },
                err => {
                    vm.$message.error(err.msg);
                }
            );

            systemSrv.dictionary().then(
                resp => {
                    let dictDetail = resp.data.dictionaryInfoList;
                    let len = dictDetail.length;
                    for (let i = 0; i < len; i++) {
                        if (dictDetail[i].typeCode == "PRICE_TYPE") {
                            vm.valueOptions = dictDetail[i].dictionaryDetailList;
                        }
                        if (dictDetail[i].typeCode == "ACQUIRE_WAY") {
                            vm.wayOptions = dictDetail[i].dictionaryDetailList;
                        }
                    }
                },
                err => {
                    vm.$message.error(err.msg);
                }
            );
        });
    },
    methods: {
        changeDate(date) {
            this.leftDate = moment(date).diff(moment(), "days");
        },
        addAssets() {
            if (
                !(
                    this.inventory &&
                    this.barCode &&
                    this.assetType &&
                    this.typeDetail &&
                    this.assetsNum &&
                    this.assetsName &&
                    this.value &&
                    this.area &&
                    this.valueType &&
                    this.getWay &&
                    this.financialDate &&
                    this.makeDate &&
                    this.endDate &&
                    this.departName &&
                    this.managePeople &&
                    this.note &&
                    this.designPurpose &&
                    this.format &&
                    this.brand &&
                    this.voucherNum &&
                    this.buyForm &&
                    this.useStatus &&
                    this.financeSource &&
                    this.scrapDate
                )
            ) {
                this.$message.error("固定资产信息不能为空！");
                return;
            }
            let assetsInfo = {
                inventory: this.inventory,
                barCode: this.barCode,
                typeId: this.assetType,
                typeDetailId: this.typeDetail,
                assetNumber: this.assetsNum,
                assetName: this.assetsName,
                price: this.value,
                acreage: this.area,
                priceType: this.valueType,
                acquireWay: this.getWay,
                financeAccountsDate: this.financialDate,
                tabDate: this.makeDate,
                guaranteeDate: this.endDate,
                manageDepartment: this.departName,
                manageUser: this.managePeople,
                remark: this.note,
                purpose: this.designPurpose,
                specificationModel: this.format,
                brand: this.brand,
                voucherNumber: this.voucherNum,
                purchaseOrganize: this.buyForm,
                useStatus: this.useStatus,
                financeSource: this.financeSource,
                scrapDate: this.scrapDate
            };
            equestrianSrv.addHorseAssets(assetsInfo).then(
                resp => {
                    this.$message.success("添加固定资产信息成功");
                    this.$router.push("/equestrian/horseAssets");
                },
                err => {
                    this.$message.error(err.msg);
                }
            );
        },
        // getManageUser() {
        //   if (!this.departName) {
        //     this.$message.error("管理部门不能为空");
        //     return;
        //   }
        //   systemSrv.userComboBox(this.departName).then(
        //     resp => {
        //       this.userList = resp.data.userList;
        //     },
        //     err => {
        //       this.$message.error(err.msg);
        //     }
        //   );
        // },
        getAssetsType() {
            if (!this.assetType) {
                this.$message.error("请先选择资产大类");
                return;
            }
            systemSrv.assetsDetailComboBox(this.assetType).then(
                resp => {
                    this.typeDetailList = resp.data.typeDetailList;
                },
                err => {
                    this.$message.error(err.msg);
                }
            );
        },
        cateResize() {
            this.$refs.selectCate.resetInputWidth();
        },
        classResize() {
            this.$refs.selectClass.resetInputWidth();
        },
        valueResize() {
            this.$refs.selectValue.resetInputWidth();
        },
        wayResize() {
            this.$refs.selectWay.resetInputWidth();
        },
        departResize() {
            this.$refs.selectDepart.resetInputWidth();
        }
        // peopleResize() {
        //   this.$refs.selectPeople.resetInputWidth();
        // }
    }
};
</script>

<style lang="scss" scoped>
.content_page .content-show .list-search .search-field {
    padding-left: 84px;
}
</style>

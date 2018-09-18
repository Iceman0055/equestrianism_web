<template>
    <div class="content_page animated zoomIn">
        <div class="content-title">
            <div class="title" v-if="useDisabled">查看固定资产管理</div>
            <div class="title" v-if="!useDisabled &&assetId">修改固定资产管理</div>
            <div class="title" v-if="!assetId">新增固定资产管理</div>
            <router-link class="btn btn-info back" :to="'/equestrian/horseAssets'">
                返回
            </router-link>
        </div>
        <div class="content-show">
            <el-form :model="assetsInfo" label-width="120px" ref="assetsInfo" class="demo-ruleForm" inline-message>
                <el-row>
                    <el-col :offset="8" :span="8">
                        <el-form-item label="条形码：" prop="barCode" :rules="[
                                                                                  { required: true, message: '请输入条形码', trigger: 'blur' },
                                                                                ]">
                            <el-input size="large" :disabled="useDisabled" v-model="assetsInfo.barCode" placeholder="请输入条形码"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="资产大类：" prop="typeId" :rules="[
                                                                                  { required: true, message: '请选择资产大类', trigger: 'change' },
                                                                                ]">
                            <el-select ref="selectCate" :disabled="useDisabled" size="large" v-model="assetsInfo.typeId" class="el-field-input" placeholder="请选择">
                                <el-option v-for="(item,index) in assetTypeList" :key="index" :label="item.typeName" :value="item.typeId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="资产分类：" prop="typeDetailId" :rules="[
                                                                                  { required: true, message: '请选择资产分类', trigger: 'change' },
                                                                                ]">
                            <el-select @focus="getAssetsType" :disabled="useDisabled" ref="selectClass" size="large" v-model="assetsInfo.typeDetailId" class="el-field-input" placeholder="请选择">
                                <el-option v-for="(item,index) in typeDetailList" :key="index" :label="item.typeDetailName" :value="item.typeDetailId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="资产编号：" prop="assetNumber" :rules="[
                                                                                  { required: true, message: '请输入资产编号', trigger: 'blur' },
                                                                                ]">
                            <el-input size="large" :disabled="useDisabled" v-model="assetsInfo.assetNumber" placeholder="请输入资产编号"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="资产名称：" prop="assetName" :rules="[
                                                                                  { required: true, message: '请输入资产名称', trigger: 'blur' },
                                                                                ]">
                            <el-input size="large" :disabled="useDisabled" v-model="assetsInfo.assetName" placeholder="请输入资产名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="价值：" prop="price" :rules="[
                                                                                  { required: true, message: '请输入价值', trigger: 'blur' },
                                                                                ]">
                            <el-input size="large" :disabled="useDisabled" v-model="assetsInfo.price" placeholder="请输入价值"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="面积：" prop="acreage" :rules="[
                                                                                  { required: true, message: '请输入面积', trigger: 'blur' },
                                                                                ]">
                            <el-input size="large" :disabled="useDisabled" v-model="assetsInfo.acreage" placeholder="请输入面积"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="规格型号：" prop="specificationModel" :rules="[
                                                                                  { required: true, message: '请输入规格型号', trigger: 'blur' },
                                                                                ]">
                            <el-input size="large" :disabled="useDisabled" v-model="assetsInfo.specificationModel" placeholder="请输入规格型号"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="价值类型：" prop="priceType" :rules="[
                                                                                  { required: true, message: '请选择价值类型', trigger: 'blur' },
                                                                                ]">
                            <el-select ref="selectValue" :disabled="useDisabled" size="large" v-model="assetsInfo.priceType" class="el-field-input" placeholder="请选择">
                                <el-option v-for="(item,index) in valueOptions" :key="index" :label="item.itemValue" :value="item.dictionaryDetailId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="取得方式：" prop="acquireWay" :rules="[
                                                                                  { required: true, message: '请选择取得方式', trigger: 'blur' },
                                                                                ]">
                            <el-select ref="selectWay" :disabled="useDisabled" size="large" v-model="assetsInfo.acquireWay" class="el-field-input" placeholder="请选择">
                                <el-option v-for="(item,index) in wayOptions" :key="index" :label="item.itemValue" :value="item.dictionaryDetailId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="财务入账日期：" prop="financeAccountsDate" :rules="[
                                                                                  { required: true, message: '请选择财务入账日期', trigger: 'blur' },
                                                                                ]">
                            <el-date-picker :disabled="useDisabled" class="el-field-input" size="large" v-model="assetsInfo.financeAccountsDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="date" placeholder="选择财务入账日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="制单日期：" prop="tabDate" :rules="[
                                                                                  { required: true, message: '请选择制单日期', trigger: 'blur' },
                                                                                ]">
                            <el-date-picker :disabled="useDisabled" class="el-field-input" size="large" v-model="assetsInfo.tabDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="date" placeholder="选择制单日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="保修截止日期：" prop="guaranteeDate" :rules="[
                                                                                  { required: true, message: '请选择保修截止日期', trigger: 'blur' },
                                                                                ]">
                            <el-date-picker :disabled="useDisabled" class="el-field-input" size="large" v-model="assetsInfo.guaranteeDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="date" placeholder="选择保修截止日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="管理部门：" prop="manageDepartment" :rules="[
                                                                                  { required: true, message: '请选择管理部门', trigger: 'blur' },
                                                                                ]">
                            <el-select size="large" :disabled="useDisabled" ref="selectDepart" v-model="assetsInfo.manageDepartment" class="el-field-input" placeholder="请选择管理部门">
                                <el-option v-for="(item,index) in departList" :key="index" :label="item.departmentName" :value="item.departmentId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="管理人：" prop="manageUser" :rules="[
                                                                                  { required: true, message: '请输入管理人', trigger: 'blur' },
                                                                                ]">
                            <el-input size="large" :disabled="useDisabled" v-model="assetsInfo.manageUser" placeholder="请输入管理人"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="设计用途：" prop="purpose" :rules="[
                                                                                  { required: true, message: '请输入设计用途', trigger: 'blur' },
                                                                                ]">
                            <el-input size="large" :disabled="useDisabled" v-model="assetsInfo.purpose" placeholder="请输入设计用途"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="品牌：" prop="brand" :rules="[
                                                                                  { required: true, message: '请输入品牌', trigger: 'blur' },
                                                                                ]">
                            <el-input size="large" :disabled="useDisabled" v-model="assetsInfo.brand" placeholder="请输入品牌"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="会记凭证号：" prop="voucherNumber" :rules="[
                                                                                  { required: true, message: '请输入会记凭证号', trigger: 'blur' },
                                                                                ]">
                            <el-input size="large" :disabled="useDisabled" v-model="assetsInfo.voucherNumber" placeholder="请输入会记凭证号"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="采购组织形式：" prop="purchaseOrganize" :rules="[
                                                                                  { required: true, message: '请输入采购组织形式', trigger: 'blur' },
                                                                                ]">
                            <el-input size="large" :disabled="useDisabled" v-model="assetsInfo.purchaseOrganize" placeholder="请输入采购组织形式"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="备注：" prop="remark">
                            <el-input size="large" :disabled="useDisabled" v-model="assetsInfo.remark" placeholder="请输入备注"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="数量：" v-show="!assetId" prop="inventory">
                            <el-input size="large" :disabled="useDisabled" min="0" type="number" v-model="assetsInfo.inventory" placeholder="请输入数量"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="使用状态：" prop="useStatus" :rules="[
                                                                                  { required: true, message: '请输入使用状态', trigger: 'blur' },
                                                                                ]">
                            <el-input size="large" :disabled="useDisabled" v-model="assetsInfo.useStatus" placeholder="请输入使用状态"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="资金来源：" prop="financeSource" :rules="[
                                                                                  { required: true, message: '请输入资金来源', trigger: 'blur' },
                                                                                ]">
                            <el-input size="large" :disabled="useDisabled" v-model="assetsInfo.financeSource" placeholder="请输入资金来源"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="报废日期：" prop="scrapDate" :rules="[
                                                                                  { required: true, message: '请选择报废日期', trigger: 'blur' },
                                                                                ]">
                            <el-date-picker :disabled="useDisabled" class="el-field-input" size="large" @change="changeDate" v-model="assetsInfo.scrapDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="date" placeholder="选择报废日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="报废剩余日期：">
                            <el-input size="large" disabled v-model="leftDate" placeholder="报废剩余日期"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div class="content-footer row" v-show="!useDisabled">
            <el-button v-if="!assetId" class="col-md-1 btn btn-primary makesure" :plain="true" @click="addAssets('assetsInfo')">确定</el-button>
            <el-button v-if="assetId" class="col-md-1 btn btn-primary makesure" :plain="true" @click="updateAssets('assetsInfo')">修改</el-button>
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
                typeId: '',
                typeDetailId: '',
                assetNumber: '',
                assetName: '',
                price: '',
                acreage: '',
                specificationModel: '',
                priceType: '',
                acquireWay: '',
                financeAccountsDate: '',
                tabDate: '',
                guaranteeDate: '',
                manageDepartment: '',
                manageUser: '',
                purpose: '',
                brand: '',
                voucherNumber: '',
                purchaseOrganize: '',
                remark: '',
                inventory: '',
                useStatus: '',
                financeSource: '',
                scrapDate: '',

            },
            assetTypeList: [],
            departList: [],
            valueOptions: [],
            wayOptions: [],
            leftDate: '',
            useDisabled: false,
            typeDetailList: [],
            assetId: ''
        };
    },
    mounted() {
        this.useDisabled = !!this.$route.query.disable;
        this.$el.addEventListener("animationend", this.valueResize);
        this.$el.addEventListener("animationend", this.wayResize);
        this.$el.addEventListener("animationend", this.cateResize);
        this.$el.addEventListener("animationend", this.classResize);
        this.$el.addEventListener("animationend", this.departResize);
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
            //获取部门
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
            if (to.query.assetId) {
                vm.assetId = to.query.assetId
                equestrianSrv
                    .getHorseAssetsDetail(to.query.assetId)
                    .then(resp => {
                        vm.assetsInfo = resp.data
                        if (resp.data.scrapDate) {
                            vm.leftDate = moment(resp.data.scrapDate).diff(moment(), "days");
                        }
                        return systemSrv.assetsDetailComboBox(resp.data.typeId);
                    })
                    .then(resp => {
                        vm.typeDetailList = resp.data.typeDetailList;
                    })
                    .catch(err => {
                        vm.$message.error(err.msg);
                    });
            }
        })
    },
    methods: {
        changeDate(date) {
            this.leftDate = moment(date).diff(moment(), "days");
        },
        //修改
        updateAssets(formName) {
            delete this.assetsInfo.inventory
            this.assetsInfo.assetId = this.assetId
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    equestrianSrv.updateHorseAssets(this.assetsInfo).then(
                        resp => {
                            this.$message.success("修改固定资产信息成功");
                            this.$router.push("/equestrian/horseAssets");
                        },
                        err => {
                            this.$message.error(err.msg);
                        }
                    );
                } else {
                    return false;
                }
            });
        },
        //新增
        addAssets(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    equestrianSrv.addHorseAssets(this.assetsInfo).then(
                        resp => {
                            this.$message.success("添加固定资产信息成功");
                            this.$router.push("/equestrian/horseAssets");
                        },
                        err => {
                            this.$message.error(err.msg);
                        }
                    );
                } else {
                    return false;
                }
            });
        },
        getAssetsType() {
            if (!this.assetsInfo.typeId) {
                this.$message.error("请先选择资产大类");
                return;
            }
            systemSrv.assetsDetailComboBox(this.assetsInfo.typeId).then(
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
    }
};
</script>

<style lang="scss" scoped>
.content_page .content-show .list-search .search-field {
    padding-left: 84px;
}
</style>

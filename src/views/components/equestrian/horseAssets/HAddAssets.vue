<template>
    <div class="content_page animated zoomIn">
        <div class="content-title">
            <div class="title">新增固定资产</div>
            <router-link class="btn btn-info back" :to="'/equestrian/horseAssets'">
                返回
            </router-link>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-4"></div>
                <div class="col-md-4 search-field text-cente">
                    <div class="label">条形码：</div>
                    <input type="text" class="form-control input-field" placeholder="请输入条形码" />
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">资产大类：</div>
                    <el-select ref="selectCate" size="large" v-model="assetType" class="el-field-input" placeholder="请选择">
                        <el-option v-for="item in assetTypeList" :key="item.typeId" :label="item.typeName" :value="item.typeId">
                        </el-option>
                    </el-select>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">资产分类：</div>
                    <el-select @focus="getAssetsType" ref="selectClass" size="large" v-model="typeDetail" class="el-field-input" placeholder="请选择">
                        <el-option v-for="item in typeDetailList" :key="item.typeDetailId" :label="item.typeDetailName" :value="item.typeDetailId">
                        </el-option>
                    </el-select>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">资产编号：</div>
                    <input type="text" v-model="assetsNum" class="form-control input-field" placeholder="请输入资产编号" />
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">资产名称：</div>
                    <input type="text" v-model="assetsName" class="form-control input-field" placeholder="请输入资产名称" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">数量：</div>
                    <input type="text" v-model="number" class="form-control input-field" placeholder="请输入数量" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">价值：</div>
                    <input type="text" v-model="value" class="form-control input-field" placeholder="请输入价值" />
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">面积：</div>
                    <input type="text" v-model="area" class="form-control input-field" placeholder="请输入面积" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">价值类型：</div>
                    <input type="text" v-model="valueType" class="form-control input-field" placeholder="请输入价值类型" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">取得方式：</div>
                    <input type="text" v-model="getWay" class="form-control input-field" placeholder="请输入取得方式" />
                </div>
            </div>

            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">财务出账日期：</div>
                    <el-date-picker class="el-field-input" size="large" v-model="financialDate" type="date" placeholder="选择财务出账日期">
                    </el-date-picker>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">制单日期：</div>
                    <el-date-picker class="el-field-input" size="large" v-model="makeDate" type="date" placeholder="选择制单日期">
                    </el-date-picker>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">保修截止日期：</div>
                    <el-date-picker class="el-field-input" size="large" v-model="endDate" type="date" placeholder="选择保修截止日期">
                    </el-date-picker>
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">管理部门：</div>
                    <input type="text" v-model="manageDep" class="form-control input-field" placeholder="请输入管理部门" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">管理人：</div>
                    <input type="text" v-model="administrator" class="form-control input-field" placeholder="请输入管理人" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">使用状态：</div>
                    <el-select ref="selectStatus" size="large" v-model="useStatus" class="el-field-input" placeholder="请选择">
                        <el-option v-for="item in useStatusOptions" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">备注：</div>
                    <input type="text" v-model="note" class="form-control input-field" placeholder="请输入备注" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">设计用途：</div>
                    <input type="text" v-model="designPurpose" class="form-control input-field" placeholder="请输入设计用途" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">规格型号：</div>
                    <input type="text" v-model="format" class="form-control input-field" placeholder="请输入规格型号" />
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">品牌：</div>
                    <input type="text" v-model="brand" class="form-control input-field" placeholder="请输入马的父亲" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">会记凭证号：</div>
                    <input type="text" v-model="voucherNum" class="form-control input-field" placeholder="请输入会记凭证号" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">采购组织形式：</div>
                    <input type="text" v-model="buyForm" class="form-control input-field" placeholder="请输入采购组织形式" />
                </div>
            </div>
        </div>
        <div class="content-footer row">
            <el-button class="col-md-1 btn btn-primary makesure" :plain="true" @click="open">确定</el-button>
        </div>

    </div>
</template>

<script>
import { DatePicker, Button, Select, Message } from 'element-ui'
import equestrianSrv from '../../../services/equestrian.service.js'
import systemSrv from '../../../services/system.service.js'
export default {
    data() {
        return {
            manageDep: '',
            administrator: '',
            note: '',
            designPurpose: '',
            format: '',
            brand: '',
            voucherNum: '',
            buyForm: '',
            assetsNum: '',
            assetsName: '',
            number: '',
            value: '',
            area: '',
            valueType: '',
            getWay: '',
            financialDate: '',
            makeDate: '',
            endDate: '',
            useStatus: '',
            useStatusOptions: [{
                value: '选项1',
                label: '使用中'
            }, {
                value: '选项2',
                label: '使用结束'
            }],
            typeDetail: '',
            assetType: "",
            assetTypeList: [],
            typeDetailList: [],
        }
    },
    components: {
        'el-date-picker': DatePicker,
        'el-button': Button,
        'el-select': Select
    },
    mounted() {
        this.$el.addEventListener('animationend', this.statusResize)
        this.$el.addEventListener('animationend', this.cateResize)
        this.$el.addEventListener('animationend', this.classResize)
    },
    beforeRouteEnter: function(to, from, next) {
        next(vm => {
            systemSrv.assetsInfoComboBox().then(resp => {
                vm.assetTypeList = resp.data.assetTypeList
            }, err => {
                vm.$message.error(err.msg)
            })
        })
    },
    methods: {
        getAssetsType() {
            if(!this.assetType){
                this.$message.error('请先选择资产大类')
                return;
            }
            systemSrv.assetsDetailComboBox(this.assetType).then(resp => {
                this.typeDetailList = resp.data.typeDetailList
            }, err => {
                this.$message.error(err.msg)
            })
        },
        statusResize() {
            this.$refs.selectStatus.resetInputWidth()
        },
        cateResize() {
            this.$refs.selectCate.resetInputWidth()
        },
        classResize() {
            this.$refs.selectClass.resetInputWidth()
        },
        open() {
            this.$message.success('修改成功')
        },
    }
}
</script>

<style lang="scss" scoped>
.content_page .content-show .list-search .search-field {
    padding-left: 84px;
}
</style>

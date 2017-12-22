<template>
    <div class="content_page animated zoomIn">
        <div class="content-title">
            <div class="title">增加治疗日程</div>
            <router-link class="btn btn-info back" :to="'/horse/treatment'">
                返回
            </router-link>
        </div>
        <div class="content-show">
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
                    <input type="text" class="form-control input-field" placeholder="请输入手术室使用" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">固定资产使用：</div>
                    <input type="text" class="form-control input-field" placeholder="请输入固定资产使用" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">消耗品使用：</div>
                    <input type="text" class="form-control input-field" placeholder="请输入消耗品使用" />
                </div>
            </div>
        </div>
        <div class="content-footer row">
            <el-button class="col-md-1 btn btn-primary makesure" :plain="true" @click="open">确定</el-button>
        </div>
    </div>
</template>
<script>
import { DatePicker, Button} from "element-ui";
/* eslint-disable */
export default {
    data() {
        return {
            value:'',
        };
    },
    components: {
        "el-date-picker": DatePicker,
        "el-button": Button,
    },
    methods: {
        open() {
            this.$message.success("修改成功");
        },
    }
};
</script>

<style lang="scss" scoped>

</style>

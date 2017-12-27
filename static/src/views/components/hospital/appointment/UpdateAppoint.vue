<template>
    <div class="content_page animated zoomIn">
        <div class="content-title">
            <div class="title">修改预约日程</div>
            <router-link class="btn btn-info back" :to="'/hospital/appointment'">
                返回
            </router-link>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">预约时间：</div>
                    <el-date-picker :disabled="useDisabled" size="large" v-model="value1" type="datetime">
                    </el-date-picker>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">预约描述：</div>
                    <input type="text" :disabled="useDisabled" class="form-control input-field" />

                </div>
                <div class="col-md-4 search-field">
                    <div class="label">预约号：</div>
                    <input type="text" :disabled="useDisabled" class="form-control input-field" />
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">备注：</div>
                    <input type="text" :disabled="useDisabled" class="form-control input-field" />

                </div>
                <div class="col-md-4 search-field">
                    <div class="label">联系人：</div>
                    <input type="text" :disabled="useDisabled" class="form-control input-field" />

                </div>
                <div class="col-md-4 search-field">
                    <div class="label">联系方式：</div>
                    <input type="text" :disabled="useDisabled" class="form-control input-field" />
                </div>
            </div>

        </div>
        <div class="content-footer row">
            <el-button class="col-md-1 btn btn-primary makesure" :plain="true" @click="open">确定</el-button>
        </div>
    </div>
</template>
<script>
import { DatePicker, Button } from "element-ui";
/* eslint-disable */
export default {
    data() {
        return {
            value: "",
            value1: "",
            useDisabled: false,
        };
    },
    components: {
        "el-date-picker": DatePicker,
        "el-button": Button,
    },
    mounted() {
        this.useDisabled = !!this.$route.query.disable
    },
    methods: {
        open() {
            this.$message.success("修改成功");
        }

    }
};
</script>

<style lang="scss" scoped>

</style>

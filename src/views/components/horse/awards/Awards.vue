<template>
    <div class="animated fadeIn content_page">
        <div class="content-title">
            <div class="title">马匹获奖信息</div>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">比赛时间：</div>
                    <input type="text" class="form-control input-field" placeholder="请输入比赛时间" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">地点：</div>
                    <input type="text" class="form-control input-field" placeholder="请输入地点" />
                </div>

                <div class="col-md-1 search-field search-field_controls">
                    <button class="btn btn-primary search-btn">搜索</button>
                </div>
                <div class="col-md-1 search-field search-field_controls">
                        <router-link class="btn btn-success" :to="'/horse/addAwards'">
                            新增
                        </router-link>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <table class="table table-bordered table-striped table-sm">
                        <thead>
                            <tr>
                                <th>比赛时间</th>
                                <th>赛事名称</th>
                                <th>地点</th>
                                <th>奖项</th>
                                <th>罚分项</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>2016.11</td>
                                <td>赛马比赛</td>
                                <td>上海市</td>
                                <td>一等奖</td>
                                <td>无</td>
                                <td>
                                    <router-link :to="{path: '/horse/updateAwards',       
                                             query: { disable: 'true',}}"> 查看</router-link>
                                    <router-link :to="'/horse/updateAwards'">
                                        更新
                                    </router-link>
                                </td>
                            </tr>
                            <tr>
                                <td>2016.11</td>
                                <td>赛马比赛</td>
                                <td>上海市</td>
                                <td>一等奖</td>
                                <td>无</td>
                                <td>
                                    <router-link :to="{path: '/horse/updateAwards',       
                                             query: { disable: 'true',}}"> 查看</router-link>
                                    <router-link :to="'/horse/updateAwards'">
                                        更新
                                    </router-link>
                                </td>
                            </tr>
                            <tr>
                                <td>2016.11</td>
                                <td>赛马比赛</td>
                                <td>上海市</td>
                                <td>一等奖</td>
                                <td>无</td>
                                <td>
                                    <router-link :to="{path: '/horse/updateAwards',       
                                             query: { disable: 'true',}}"> 查看</router-link>
                                    <router-link :to="'/horse/updateAwards'">
                                        更新
                                    </router-link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <!-- <div class="list-empty" ng-show="content.orderList.length===0">
                                            没有可以显示的订单
                                        </div> -->
                    <div class="page">

                        <el-pagination background layout="prev, pager, next" :total="1000">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Pagination } from 'element-ui'
/* eslint-disable */
export default {
    data() {
        return {
            currentPage: 1
        }
    },
    components: {
        'el-pagination': Pagination,
    }
}
</script>

<style lang="scss" scoped>

</style>

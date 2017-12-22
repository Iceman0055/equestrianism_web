<template>
    <div class="animated fadeIn content_page">
        <div class="content-title">
            <div class="title">马匹获奖信息</div>
        </div>
        <div class="resume">
            <div class="row">
                <div class="col-md-3 distance">
                    <div class="resume-list">
                        <div class="resume-img">
                            <img src="/static/img/horse.png">
                        </div>
                        <div class="resume-footer">
                            <div class="resume-name">小大马</div>
                            <div class="resume-detail">
                                <router-link :to="'/resume/resumeDetail'">
                                    查看详情
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 distance">
                    <div class="resume-list">
                        <div class="resume-img">
                            <img src="/static/img/horse.png">
                        </div>
                        <div class="resume-footer">
                            <div class="resume-name">小大马</div>
                            <div class="resume-detail">
                                <router-link :to="'/resume/resumeDetail'">
                                    查看详情
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 distance">
                    <div class="resume-list">
                        <div class="resume-img">
                            <img src="/static/img/horse.png">
                        </div>
                        <div class="resume-footer">
                            <div class="resume-name">小大马</div>
                            <div class="resume-detail">
                                <router-link :to="'/resume/resumeDetail'">
                                    查看详情
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 distance">
                    <div class="resume-list">
                        <div class="resume-img">
                            <img src="/static/img/horse.png">
                        </div>
                        <div class="resume-footer">
                            <div class="resume-name">小大马</div>
                            <div class="resume-detail">
                                <router-link :to="'/resume/resumeDetail'">
                                    查看详情
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div class="row reverse">
                <div class="page">
                    <el-pagination background layout="prev, pager, next" :total="1000">
                    </el-pagination>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { Pagination } from "element-ui";
/* eslint-disable */
export default {
    data() {
        return {
            currentPage: 1
        };
    },
    components: {
        "el-pagination": Pagination
    }
};
</script>

<style lang="scss" scoped>
.reverse {
    flex-direction: row-reverse;
}

.resume {
    margin-right: 42px;
}

.page {
    margin: 20px 0;
}

.distance {
    position: relative;
    left: 10px;
}

.resume-list {
    text-align: center;
    border: 1px solid #ddd;
    width: 100%;
    height: 100%;
    margin-left: 10px;
    .resume-img {
        text-align: center;
        img {
            width: 100%;
            height:200px;
            text-align: center;
            margin: 0 auto;
        }
    }
    .resume-footer {
        padding: 14px;
        display: flex;
        font-size: 16px;
        justify-content: space-between;
      
    }
}
</style>

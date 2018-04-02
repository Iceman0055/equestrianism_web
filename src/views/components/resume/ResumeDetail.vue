<template>
    <div class="content_page">
        <div class="content-title">
            <div class="title">马匹简历
                <div class="pre-next">
                    <router-link v-if="prevItem" :to="prevItem" class="btn btn-primary">上一条</router-link>
                    <router-link v-if="nextItem" :to="nextItem" class=" btn btn-primary">下一条</router-link>
                </div>
            </div>
            <router-link class="btn btn-info back-on" :to="'/resume/horseResume'">
                返回
            </router-link>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-6 resume-title">
                    <div class="title">基本信息</div>
                </div>
            </div>
            <div class="row list-search resume-bottom mb-2" v-if="horseInfo">
                <div class="col-md-3">
                    <img class="img-show" src="/static/img/horse.png">
                    <div class="horse-name">{{horseInfo.horseName}}</div>
                </div>
                <div class="col-md-7 mb-3">
                    <table id="tab1" class="table table-striped">
                        <tbody>
                            <tr>
                                <th>马匹名称</th>
                                <th>护照号码</th>
                                <th>变更马名</th>
                                <th>身高</th>
                                <th>性别</th>
                                <th>出生国家</th>
                                <th>毛色</th>
                            </tr>
                            <tr>
                                <td>{{horseInfo.horseName}}</td>
                                <td>{{horseInfo.passportNumber}}</td>
                                <td>{{horseInfo.usedName}}</td>
                                <td>{{horseInfo.height}}</td>
                                <td>{{convertHorseSex[horseInfo.sex]}}</td>
                                <td>{{horseInfo.country}}</td>
                                <td>{{horseInfo.coatColour}}</td>
                            </tr>
                        </tbody>
                    </table>
                    <table id="tab2" class="table table-striped">
                        <tbody>
                            <tr>
                                <th>皮下微型条码</th>
                                <th>头部描述</th>
                                <th>左前肢描述</th>
                                <th>右前肢描述</th>
                                <th>左后肢描述</th>
                                <th>右后肢描述</th>
                                <th>体躯描述</th>
                            </tr>
                            <tr>
                                <td>{{horseInfo.barCode}}</td>
                                <td>{{horseInfo.headDesc}}</td>
                                <td>{{horseInfo.leftForeDesc}}</td>
                                <td>{{horseInfo.rightForeDesc}}</td>
                                <td>{{horseInfo.leftHindDesc}}</td>
                                <td>{{horseInfo.rightHindDesc}}</td>
                                <td>{{horseInfo.bodyDesc}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="resume-more-baseInfo col-md-2">
                    <router-link :to="{path: '/horse/baseInfo',       
                                                                                                     query: {horseName:horseInfo.horseName}}"> 更多</router-link>
                    <i class="fa fa-angle-right fa-lg"></i>
                </div>
            </div>

            <div class="row list-search">
                <div class="col-md-6 resume-title">
                    <div class="title">马主信息</div>
                </div>
                <div class="col-md-6 resume-title">
                    <div class="title">饲养员信息</div>
                </div>

            </div>
            <div class="row list-search">
                <div class="col-md-5 addHeight" v-if="!hostInfo">暂无数据</div>
                <div class="col-md-5" v-if="hostInfo">
                    <ul class="resume-ul">
                        <li>{{hostInfo.hostName}}</li>
                        <li>{{convertSex[hostInfo.sex]}}</li>
                        <li>{{hostInfo.occupation}}</li>
                        <li>{{hostInfo.contactWay}}</li>
                        <li>{{hostInfo.address}}</li>
                    </ul>
                    <div class="resume-more">
                        <router-link :to="{path: '/horse/master',query:{hostName:hostInfo.hostName}}"> 更多</router-link>
                        <i class="fa fa-angle-right fa-lg"></i>
                    </div>
                </div>
                <div class="col-md-1"></div>
                <div class="col-md-5 addHeight" v-if="!feederInfo">暂无数据</div>
                <div class="col-md-5" v-if="feederInfo">
                    <ul class="resume-ul">
                        <li>{{feederInfo.feederName}}</li>
                        <li>{{feederInfo.horseName}}</li>
                        <li>{{convertSex[feederInfo.sex]}}</li>
                        <li>{{feederInfo.skillDesc}}</li>
                    </ul>
                    <div class="resume-more">
                        <router-link :to="{path: '/horse/feeder',       
                                                                                                query: { feederName: feederInfo.feederName,}}"> 更多</router-link>
                        <i class="fa fa-angle-right fa-lg"></i>
                    </div>
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-6 resume-title">
                    <div class="title">病历信息</div>
                </div>
                <div class="col-md-6 resume-title">
                    <div class="title">获奖信息</div>
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-5 addHeight" v-if="treatmentCaseList.length==0">暂无数据</div>
                <div class="col-md-5 addHeight" v-if="treatmentCaseList.length!=0">
                    <ul class="resume-ul" v-for="item in treatmentCaseList" :key="item">
                        <li v-if="item.horseType==1">{{item.horseId}}</li>
                        <li v-if="item.horseType==2">{{item.horseName}}</li>
                        <li>{{item.operatorDate}}</li>
                        <li>{{item.place}}</li>
                        <li>{{item.titleTag}}</li>
                    </ul>
                    <div class="resume-more">
                        <router-link :to="{path: '/horse/disease',query:{horseId:searchHorseId}}"> 更多</router-link>
                        <i class="fa fa-angle-right fa-lg"></i>
                    </div>
                </div>
                <div class="col-md-1"></div>
                <div class="col-md-5 addHeight" v-if="prizeList.length==0">暂无数据</div>
                <div class="col-md-5 addHeight" v-if="prizeList.length!=0">
                    <ul class="resume-ul" v-for="item in prizeList" :key="item">
                        <li>{{item.horseName}}</li>
                        <li>{{item.eventName}}</li>
                        <li>{{item.eventPlace}}</li>
                        <li>{{item.prizeName}}</li>
                    </ul>
                    <div class="resume-more">
                        <router-link :to="{path: '/horse/awards',query:{horseId:searchHorseId}}"> 更多</router-link>
                        <i class="fa fa-angle-right fa-lg"></i>
                    </div>
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-6 resume-title">
                    <div class="title">接种疫苗信息</div>
                </div>
                <div class="col-md-6 resume-title">
                    <div class="title">治疗信息</div>
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-5 addHeight" v-if="vaccinationList.length==0">暂无数据</div>
                <div class="col-md-5 addHeight" v-if="vaccinationList.length!=0">
                    <ul class="resume-ul" v-for="item in vaccinationList" :key="item">
                        <li>{{item.operateDate}}</li>
                        <li>{{item.operatePlace}}</li>
                        <li>{{item.name}}</li>
                        <li>{{item.realname}}</li>
                    </ul>
                    <div class="resume-more">
                        <router-link :to="{path: '/horse/vaccine',       
                                            query: {horseId:searchHorseId}}"> 更多</router-link>
                        <i class="fa fa-angle-right fa-lg"></i>
                    </div>
                </div>
                <div class="col-md-1"></div>
                <div class="col-md-5 addHeight" v-if="treatmentInfoList.length==0">暂无数据</div>
                <div class="col-md-5  col-md-offset-1 addHeight" v-if="treatmentInfoList.length!=0">
                    <ul class="resume-ul" v-for="item in treatmentInfoList" :key="item">
                        <li v-if="item.horseType==1">{{item.horseId}}</li>
                        <li v-if="item.horseType==2">{{item.horseName}}</li>
                        <li>{{convertWay[item.outpatientType]}}</li>
                        <li v-if="item.outpatientType==2">{{item.appointNumber}}</li>
                        <li>{{item.treatDesc}}</li>
                        <li>{{item.treatName}}</li>
                    </ul>
                    <div class="resume-more">
                        <router-link :to="{path: '/horse/treatment',query: {horseId:searchHorseId}}"> 更多</router-link>
                        <i class="fa fa-angle-right fa-lg"></i>
                    </div>
                </div>

            </div>
            <div class="row list-search">
                <div class="col-md-6 resume-title">
                    <div class="title">钉甲信息</div>
                </div>
                <div class="col-md-6 resume-title">
                    <div class="title">挫牙信息</div>
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-5 addHeight" v-if="brigandineList.length==0">暂无数据</div>
                <div class="col-md-5 addHeight" v-if="brigandineList.length!=0">
                    <ul class="resume-ul" v-for="item in brigandineList" :key="item">
                        <li>{{item.brigandineDate}}</li>
                        <li>{{item.realname}}</li>
                        <li>{{item.remark}}</li>
                    </ul>
                    <div class="resume-more">
                        <router-link :to="{path: '/horse/nailInfo',query:{horseId:searchHorseId}}"> 更多</router-link>
                        <i class="fa fa-angle-right fa-lg"></i>
                    </div>
                </div>
                <div class="col-md-1"></div>
                <div class="col-md-5 addHeight" v-if="contusionTeethList.length==0">暂无数据</div>
                <div class="col-md-5 addHeight col-md-offset-1" v-if="contusionTeethList.length!=0">
                    <ul class="resume-ul" v-for="item in contusionTeethList" :key="item">
                        <li>{{item.operateDate}}</li>
                        <li>{{item.realname}}</li>
                        <li>{{item.remark}}</li>
                    </ul>
                    <div class="resume-more">
                        <router-link :to="{path: '/horse/teethInfo',query:{horseId:searchHorseId}}"> 更多</router-link>
                        <i class="fa fa-angle-right fa-lg"></i>
                    </div>
                </div>

            </div>

        </div>
    </div>
</template>
<script>
import { Button, Message } from "element-ui";
import resumeSrv from "../../services/resume.service.js";
import systemSrv from '../../services/system.service.js'
/* eslint-disable */
export default {
    data() {
        return {
            convertWay: { '1': '普通', '2': '预约' },
            convertSex: {},
            convertHorseSex: {},
            horseInfo: {},
            hostInfo: {},
            horseIdList: [],
            horseId: '',
            vaccinationList: [],
            brigandineList: [],
            treatmentCaseList: [],
            prizeList: [],
            contusionTeethList: [],
            treatmentInfoList: [],
            feederInfo: {},
            searchHorseId: ''
        };
    },
    components: {
        "el-button": Button
    },
    computed: {
        prevItem() {
            if (this.horseIdList && this.horseId) {
                let i = this.horseIdList.indexOf(this.horseId);
                if (i != 0) {
                    return {
                        path: '/resume/resumeDetail',
                        query: {
                            horseId: this.horseIdList[i - 1],
                        },
                    };
                }
            }
            return;
        },
        nextItem() {
            if (this.horseIdList && this.horseId) {
                let i = this.horseIdList.indexOf(this.horseId);
                if (i < this.horseIdList.length - 1) {
                    return {
                        path: '/resume/resumeDetail',
                        query: {
                            horseId: this.horseIdList[i + 1],
                        },
                    };
                }
            }
            return;

        }
    },
    beforeRouteUpdate: function(to, from, next) {
        var horseIdList = window.localStorage.getItem('horseIdList')
        if (horseIdList) {
            this.horseIdList = horseIdList.split(',')
        }
        this.horseId = to.query.horseId;
        resumeSrv.getResumeDetail(this.horseId).then(
            resp => {
                this.horseInfo = resp.data.horseInfo;
                this.searchHorseId = resp.data.horseInfo.horseId
                this.hostInfo = resp.data.hostInfo
                this.vaccinationList = resp.data.vaccinationList
                this.brigandineList = resp.data.brigandineList
                this.treatmentCaseList = resp.data.treatmentCaseList
                this.prizeList = resp.data.prizeList
                this.contusionTeethList = resp.data.contusionTeethList
                this.feederInfo = resp.data.feederInfo
                this.treatmentInfoList = resp.data.treatmentInfoList
            },
            err => {
                this.$message.error(err.msg);
            }
        );
        systemSrv.dictionary().then(resp => {
            let dictInfoList = systemSrv.formatDic(resp.data.dictionaryInfoList);
            this.convertSex = dictInfoList.SEX
            this.convertHorseSex = dictInfoList.HORSE_SEX
        }, err => {
            this.$message.error(err.msg);
        })
        next();
    },
    beforeRouteEnter: function(to, from, next) {
        next(vm => {
            var horseIdList = window.localStorage.getItem('horseIdList')
            vm.horseIdList = horseIdList.split(',')
            vm.horseId = to.query.horseId;
            resumeSrv.getResumeDetail(vm.horseId).then(
                resp => {
                    vm.horseInfo = resp.data.horseInfo;
                    vm.searchHorseId = resp.data.horseInfo.horseId
                    vm.hostInfo = resp.data.hostInfo
                    vm.vaccinationList = resp.data.vaccinationList
                    vm.brigandineList = resp.data.brigandineList
                    vm.treatmentCaseList = resp.data.treatmentCaseList
                    vm.prizeList = resp.data.prizeList
                    vm.contusionTeethList = resp.data.contusionTeethList
                    vm.feederInfo = resp.data.feederInfo
                    vm.treatmentInfoList = resp.data.treatmentInfoList
                },
                err => {
                    vm.$message.error(err.msg);
                }
            );
            systemSrv.dictionary().then(resp => {
                let dictInfoList = systemSrv.formatDic(resp.data.dictionaryInfoList);
                vm.convertSex = dictInfoList.SEX
                vm.convertHorseSex = dictInfoList.HORSE_SEX
            }, err => {
                vm.$message.error(err.msg);
            })
        });
    },
    methods: {
    }
};
</script>

<style lang="scss" scoped>
.addHeight {
    height: 229px;
    text-align: center;
}

.back-on {
    float: right;
}

#tab1 {
    line-height: 20px;
    border-left: 1px solid #ddd;
    border-right: 1px solid #ddd;
}

#tab2 {
    line-height: 20px;
    border-left: 1px solid #ddd;
    border-right: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
}

.resume-more-baseInfo {
    cursor: pointer;
    text-align: center;
    position: relative;
    bottom: -80px;
    color: #409eff;
}

.img-show {
    width: 100%;
    height: 200px;
}

.resume-bottom {
    border-bottom: 1px solid #ddd;
}

.resume-more {
    cursor: pointer;
    color: #409eff;
    float: right;
}

.resume-ul {
    height: 36px;
    list-style: none;
    font-size: 16px;
    li {
        padding-left: 12px;
        float: left;
    }
}

.resume-title {
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

.pre-next {
    display: inline-block;
    margin-left: 42px;
}

.horse-name {
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    width: 250px;
    padding: 10px 0;
}

.resume-detail {
    position: relative;
    top: 10px;
    left: 41%;
    height: 60px;
}

.content-footer {
    position: relative;
    left: 20%;
    top: 20px;
}

.makesure {
    margin-left: 130px;
}
</style>

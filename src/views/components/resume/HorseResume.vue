<template>
  <div class="animated fadeIn content_page">
    <div class="content-title">
      <div class="title">马匹简历列表</div>
    </div>
    <div class="content-show">
      <div class="row list-search">

        <div class="col-md-4 search-field">
          <div class="label">马匹名称：</div>
          <el-select size="large" filterable v-model="horseName" class="el-field-input" placeholder="请选择马匹名称">
            <el-option v-for="item in horseInfoName" :key="item.horseId" :label="item.horseName" :value="item.horseId">
            </el-option>
          </el-select>
        </div>

        <div class="col-md-1 search-field search-field_controls">
          <button @click="getHorseResumeList(1)" class="btn btn-primary search-btn">搜索</button>
        </div>
      </div>
      <div class="resume">
        <div class="wait-loading" v-show="showLoading"><img src="/static/img/loading.gif"></div>
        <div class="row" v-show="!showLoading">
          <div class="col-md-3 distance" v-for="item in horseResumeList" :key="item">
            <div class="resume-list">
              <div class="resume-img">
                <img :src="'data:image/jpeg;base64,'+item.image">
              </div>
              <div class="resume-footer">
                <div class="resume-name">{{item.horseName}}</div>
                <div class="resume-detail">
                  <router-link :to="{path:'/resume/resumeDetail',query:{horseId:item.horseId}}">
                    查看详情
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row reverse">
          <div class="page">
            <el-pagination @current-change="getHorseResumeList" :current-page="currentPage" :page-size="pageRecorders" background layout="prev, pager, next" :total="totalRecorders">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Pagination, Message, Select } from "element-ui";
import resumeSrv from "../../services/resume.service.js";
import horseSrv from '../../services/horse.service.js'
/* eslint-disable */
export default {
  data() {
    return {
      currentPage: 1,
      pageRecorders: 4,
      totalRecorders: 1,
      horseInfoName: [],
      horseName: "",
      horseResumeList: [],
      showLoading: false,
    };
  },
  beforeRouteEnter: function(to, from, next) {
    next(vm => {
      resumeSrv.getHorseResume(vm.currentPage, vm.pageRecorders, vm.horseName).then(
        resp => {
          vm.totalRecorders = resp.data.totalRecorders;
          vm.horseResumeList = resp.data.horseResumeList;
          window.localStorage.setItem('horseIdList', resp.data.horseIdList)
        },
        err => {
          vm.$message.error(err.msg);
        }
      );
      horseSrv.getHorseName().then(
        resp => {
          vm.horseInfoName = resp.data.horseList;
        },
        err => {
          vm.$message.error(err.msg);
        }
      );
    });
  },
  components: {
    "el-pagination": Pagination,
    "el-select": Select
  },
  methods: {
    getHorseResumeList(currentPage = this.currentPage) {
      this.showLoading = true;
      resumeSrv
        .getHorseResume(currentPage, this.pageRecorders, this.horseName)
        .then(
        resp => {
          this.showLoading = false;
          this.currentPage = currentPage;
          this.totalRecorders = resp.data.totalRecorders;
          this.horseResumeList = resp.data.horseResumeList;
          this.horseIdList = resp.data.horseIdList;
        },
        err => {
          this.showLoading = false;
          this.$message.error(err.msg);
        }
        );
    }
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
      height: 200px;
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

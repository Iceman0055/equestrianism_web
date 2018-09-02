<template>
    <div class="content_page animated fadeIn">
        <div class="content-title">
            <div class="title">字典管理</div>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">字典类型：</div>
                    <input type="text" v-model="typeName" class="form-control input-field" placeholder="请输入字典类型" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">类型代码：</div>
                    <input type="text" v-model="typeCode" class="form-control input-field" placeholder="请输入类型代码" />

                </div>
                <div class="col-md-1 search-field search-field_controls">
                    <button @click="getDict(1)" class="btn btn-primary search-btn">搜索</button>
                </div>
                <!-- <div class="col-md-1 search-field search-field_controls">
                                                                                                                                <button type="reset" class="btn btn-default">重置</button>
                                                                                                                            </div> -->
            </div>
            <div class="row list-search">
                <div class="col-md-1 search-field search-field_controls">
                    <button class="btn btn-success" @click="addDictDialog(1)">新增</button>
                </div>
            </div>
            <div class="wait-loading" v-show="showLoading"><img src="/static/img/loading.gif"></div>
            <div class="row ">
                <div class="col-lg-12">
                    <table class="table table-bordered table-striped table-sm">
                        <thead>
                            <tr>
                                <th></th>
                                <th>字典类型</th>
                                <th>类型代码</th>
                                <th>备注</th>
                                <th>排序</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style="cursor:pointer" v-for="(item,index) in dictInfoList" :key="index" @click="getDetailList(1,item)">
                                <td><input type="radio" class="input-pointer" name="select" :checked="item.checked"></td>
                                <td >{{item.typeName}}</td>
                                <td>{{item.typeCode}}</td>
                                <td>{{item.remark}}</td>
                                <td>{{item.sort}}</td>
                                <td>
                                    <a @click="addDictDialog(2,item.dictionaryId)">修改</a>
                                    <a @click="deleteInfo(item.dictionaryId)">删除</a>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                    <div class="list-empty" v-show="dictInfoList.length===0">
                        暂无数据 </div>

                    <div class="page">
                        <el-pagination @current-change="getDict" :current-page="currentPage" :page-size="pageRecorders" background layout="prev, pager, next" :total="totalRecorders">
                        </el-pagination>
                    </div>
                </div>
            </div>

            <div class="row list-search">
                <div class="col-md-1 search-field search-field_controls">
                    <button class="btn btn-success" :disabled="!activeItem" @click="addDictTextDialog(1,searchDetailId)">新增字项</button>
                </div>
            </div>
             <div class="wait-loading" v-show="loading"><img src="/static/img/loading.gif"></div>
            <div class="row" v-show="!loading">
                <div class="col-lg-12">
                    <table class="table table-bordered table-striped table-sm">
                        <thead>
                            <tr>
                                <th>父节点</th>
                                <th>名称</th>
                                <th>代码</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in dictDetailList" :key="index">
                                <td>{{item.dictionaryId}}</td>
                                <td>{{item.itemValue}}</td>
                                <td>{{item.itemCode}}</td>
                                <td>
                                    <a @click="addDictTextDialog(2,item.dictionaryDetailId)">修改 </a>
                                    <a @click="deleteDetailInfo(item.dictionaryDetailId)">删除</a>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                    <div class="list-empty" v-show="dictDetailList.length===0">
                        暂无数据
                    </div>
                    <div class="page">
                        <el-pagination @current-change="getDetailList" :current-page="current" :page-size="page" background layout="prev, pager, next" :total="total">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog title="提示" :modal-append-to-body="false" :visible.sync="deleteDialog" width="20%" center>
            <div class="text-center">
                <span>确定要删除这项内容吗?</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="deleteDialog = false">取 消</el-button>
                <el-button type="primary" @click="deleteDict">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="提示" :modal-append-to-body="false" :visible.sync="deleteTextDialog" width="20%" center>
            <div class="text-center">
                <span>确定要删除这项内容吗?</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="deleteTextDialog = false">取 消</el-button>
                <el-button type="primary" @click="deleteTextDetail">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 修改 -->
        <el-dialog :title="dialogTitle" :modal-append-to-body="false" :close-on-click-modal="false" :visible.sync="updateDialog" width="50%" center>
            <div class="content-show text-center">
                <div class="row mb-1 list-search">
                    <div class="col-md-6 search-field">
                        <div class="label">字典类型：</div>
                        <input type="text" v-model="dictName" class="form-control input-field" placeholder="字典类型" />
                    </div>
                    <div class="col-md-6 search-field">
                        <div class="label">类型代码：</div>
                        <input type="text" v-model="dictType" class="form-control input-field" placeholder="类型代码" />
                    </div>
                </div>
                <div class="row mb-1 list-search">
                    <div class="col-md-6 search-field">
                        <div class="label">排序：</div>
                        <input type="text" v-model="sort" class="form-control input-field" placeholder="排序" />
                    </div>
                    <div class="col-md-6 search-field">
                        <div class="label">备注：</div>
                        <input type="text" v-model="remark" class="form-control input-field" placeholder="备注" />
                    </div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="updateDialog = false">取 消</el-button>
                <el-button v-if="dialogTitle=='新增'" type="primary" @click="addDict">新增</el-button>
                <el-button v-if="dialogTitle=='修改'" type="primary" @click="updateDict">修改</el-button>
            </span>
        </el-dialog>
        <el-dialog :title="dialogTextTitle" :modal-append-to-body="false" :close-on-click-modal="false" :visible.sync="updateTextDialog" width="50%" center>
            <div class="content-show text-center">
                <div class="row mb-1 list-search">
                    <div class="col-md-6 search-field">
                        <div class="label">父节点：</div>
                        <input type="text" disabled v-model="fatherCode" class="form-control input-field" placeholder="父节点" />
                    </div>
                    <div class="col-md-6 search-field">
                        <div class="label">字典名称：</div>
                        <input type="text" v-model="itemValue" class="form-control input-field" placeholder="字典名称" />
                    </div>
                </div>
                <div class="row mb-1 list-search">
                    <div class="col-md-6 search-field">
                        <div class="label">字典代码：</div>
                        <input type="text" v-model="itemCode" class="form-control input-field" placeholder="字典代码" />
                    </div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="updateTextDialog = false">取 消</el-button>
                <el-button v-if="dialogTextTitle=='新增'" type="primary" @click="addDictDetail">新增</el-button>
                <el-button v-if="dialogTextTitle=='修改'" type="primary" @click="updateDictDetail">修改</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { Pagination, Dialog, Message } from "element-ui";
import systemSrv from "../../../services/system.service.js";
export default {
  data() {
    return {
      dialogTitle: "",
      dialogTextTitle: "",
      activeItem: undefined,
      deleteTextDialog: false,
      updateTextDialog: false,
      updateDialog: false,
      deleteDialog: false,
      showLoading: false,
      loading: false,
      pageRecorders: 10,
      totalRecorders: 1,
      currentPage: 1,
      page: 10,
      total: 1,
      current: 1,
      typeCode: "",
      typeName: "",
      dictInfoList: [],
      dictName: "",
      dictType: "",
      remark: "",
      sort: "",
      deleteContent: {},
      deleteContentInfo: {},
      dictionaryId: "",
      dictionaryDetailId: "",
      dictDetailList: [],
      fatherCode: "",
      itemCode: "",
      itemValue: "",
      searchDetailId: ""
    };
  },
  beforeRouteEnter: function(to, from, next) {
    next(vm => {
      vm.showLoading = true;
      systemSrv
        .dictionaryList(
          vm.currentPage,
          vm.pageRecorders,
          vm.typeName,
          vm.typeCode
        )
        .then(
          resp => {
            vm.showLoading = false;
            vm.totalRecorders = resp.data.totalRecorders;
            let dictInfoList = resp.data.dictionaryInfoList;
            let len = dictInfoList.length;
            let checkedArray = [];
            for (let i = 0; i < len; i++) {
              checkedArray.push({
                typeName: dictInfoList[i].typeName,
                typeCode: dictInfoList[i].typeCode,
                remark: dictInfoList[i].remark,
                sort: dictInfoList[i].sort,
                dictionaryId: dictInfoList[i].dictionaryId,
                checked: false
              });
            }
            vm.dictInfoList = checkedArray;
          },
          err => {
            vm.showLoading = false;
            vm.$message.error(err.msg);
          }
        );
    });
  },
  methods: {
    getDict(currentPage = this.currentPage) {
      this.showLoading = true;
      systemSrv
        .dictionaryList(
          currentPage,
          this.pageRecorders,
          this.typeName,
          this.typeCode
        )
        .then(
          resp => {
            this.currentPage = currentPage;
            this.showLoading = false;
            this.totalRecorders = resp.data.totalRecorders;
            this.dictInfoList = resp.data.dictionaryInfoList;
          },
          err => {
            this.showLoading = false;
            this.$message.error(err.msg);
          }
        );
    },
    getDetailList(currentPage, item = this.activeItem) {
      this.activeItem && (this.activeItem.checked = false);
      item.checked = true;
      this.activeItem = item;
      this.loading = true;
      this.searchDetailId = item.dictionaryId;
      systemSrv.dicDetailList(currentPage, this.page, item.dictionaryId).then(
        resp => {
          this.current = currentPage;
          this.loading = false;
          this.total = resp.data.totalRecorders;
          this.dictDetailList = resp.data.dictionaryDetailList;
        },
        err => {
          this.loading = false;
          this.$message.error(err.msg);
        }
      );
    },
    addDictDialog(index, dictionaryId) {
      event.stopPropagation();
      this.updateDialog = true;
      if (index == 1) {
        this.dialogTitle = "新增";
      } else {
        this.dictionaryId = dictionaryId;
        this.dialogTitle = "修改";
        systemSrv.getDict(dictionaryId).then(
          resp => {
            this.dictName = resp.data.typeName;
            this.dictType = resp.data.typeCode;
            this.sort = resp.data.sort;
            this.remark = resp.data.remark;
          },
          err => {
            this.$message.error(err.msg);
          }
        );
      }
    },
    addDictTextDialog(index, id) {
      this.updateTextDialog = true;
      if (index == 1) {
        this.dialogTextTitle = "新增";
        this.fatherCode = id;
        this.itemCode = "";
        this.itemValue = "";
      } else {
        this.dictionaryDetailId = id;
        this.dialogTextTitle = "修改";
        systemSrv.getDicDetail(this.dictionaryDetailId).then(
          resp => {
            this.fatherCode = resp.data.dictionaryId;
            this.itemCode = resp.data.itemCode;
            this.itemValue = resp.data.itemValue;
          },
          err => {
            this.$message.error(err.msg);
          }
        );
      }
    },
    addDict() {
      if (!(this.dictName && this.dictType && this.remark && this.sort)) {
        this.$message.error("字典信息不能为空！");
        return;
      }
      let addInfo = {
        typeCode: this.dictType,
        typeName: this.dictName,
        remark: this.remark,
        sort: this.sort
      };
      systemSrv.addDict(addInfo).then(
        resp => {
          this.$message.success("添加字典成功");
          this.updateDialog = false;
          this.getDict();
        },
        err => {
          this.$message.error(err.msg);
        }
      );
    },
    addDictDetail() {
      var reg = /^[0-9]*$/;
      if (!(this.fatherCode && this.itemCode && this.itemValue)) {
        this.$message.error("字项信息不能为空！");
        return;
      }
      if (!reg.test(this.itemCode)) {
        this.$message.error("字典代码必须为数字！");
        return;
      }
      let addDetailInfo = {
        dictionaryId: this.fatherCode,
        itemCode: this.itemCode,
        itemValue: this.itemValue
      };
      systemSrv.addDicDetail(addDetailInfo).then(
        resp => {
          this.$message.success("添加字项成功");
          this.updateTextDialog = false;
          this.getDetailList(1, this.fatherCode);
        },
        err => {
          this.$message.error(err.msg);
        }
      );
    },
    updateDictDetail() {
      var reg = /^[0-9]*$/;
      if (!(this.fatherCode && this.itemCode && this.itemValue)) {
        this.$message.error("字项信息不能为空！");
        return;
      }
      if (!reg.test(this.itemCode)) {
        this.$message.error("字典代码必须为数字！");
        return;
      }
      let updateDetailInfo = {
        dictionaryDetailId: this.dictionaryDetailId,
        itemCode: this.itemCode,
        itemValue: this.itemValue
      };
      systemSrv.updateDicDetail(updateDetailInfo).then(
        resp => {
          this.$message.success("修改字项成功");
          this.updateTextDialog = false;
          this.getDetailList(1, this.fatherCode);
        },
        err => {
          this.$message.error(err.msg);
        }
      );
    },
    updateDict() {
      if (!(this.dictName && this.dictType && this.remark && this.sort)) {
        this.$message.error("字典信息不能为空！");
        return;
      }
      let updateInfo = {
        dictionaryId: this.dictionaryId,
        typeCode: this.dictType,
        typeName: this.dictName,
        remark: this.remark,
        sort: this.sort
      };
      systemSrv.updateDict(updateInfo).then(
        resp => {
          this.$message.success("修改字典成功");
          this.updateDialog = false;
          this.getDict();
        },
        err => {
          this.$message.error(err.msg);
        }
      );
    },
    deleteInfo(dictId) {
      event.stopPropagation();
      this.deleteDialog = true;
      this.deleteContent.dictionaryId = dictId;
      this.deleteContent.deleteFlag = 1;
    },
    deleteDict() {
      systemSrv.deleteDict(this.deleteContent).then(
        resp => {
          this.$message.success("删除成功");
          this.deleteDialog = false;
          this.getDict();
        },
        err => {
          this.$message.error(err.msg);
        }
      );
    },
    deleteDetailInfo(dicDetailId) {
      this.deleteTextDialog = true;
      this.deleteContentInfo.dictionaryDetailId = dicDetailId;
      this.deleteContentInfo.deleteFlag = 1;
    },
    deleteTextDetail() {
      systemSrv.deleteDicDetail(this.deleteContentInfo).then(
        resp => {
          this.$message.success("删除成功");
          this.deleteTextDialog = false;
          this.getDetailList(1, this.fatherCode);
        },
        err => {
          this.$message.error(err.msg);
        }
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.input-pointer {
  cursor: pointer;
}
</style>

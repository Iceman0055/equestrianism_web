<template>
    <el-dialog
        :title="title"
        :width="width"
        :visible.sync="visible"
        :modal-append-to-body="false"
        class="content-show"
        center
    >
        <div class="row list-search">
        <div class="col-md-8 search-field">
            <div class="label" style="left:-18px">固定资产名称：</div>
            <input type="text" v-model="key" class="form-control input-field" placeholder="请输入固定资产名称" />
        </div>
        <div class="col-md-1 search-field search-field_controls">
            <button @click="handleSearch()" class="btn btn-primary search-btn">搜索</button>
        </div>
    </div>
        <div class="list-empty" v-show="tableData.length==0">
            暂无数据
        </div>
        <el-table
            ref="multipleTable"
            :data="tableData"
            @select="handleSelect"
            tooltip-effect="dark"
            style="width: 100%"
        >
            <el-table-column
                type="selection"
                width="55"
            ></el-table-column>
            <el-table-column
                v-for="(column, index) in columns"
                v-bind:key="index"
                :prop="column.dataIndex"
                :label="column.title"
                :width="column.width"
            ></el-table-column>
            <el-table-column
                label="操作"
            >
                <template slot-scope="scope">
                    <div class="Spinner">
                        <button class="Decrease" @click="decrease(scope.$index, scope.row)">
                            <i class="fa fa-sort-desc"></i>
                        </button>
                        <input class="Amount" v-model="scope.row[countField]" placeholder="使用数量" autocomplete="off">
                        <button class="Increase" @click="increase(scope.$index, scope.row)">
                            <i class="fa fa-sort-asc"></i>
                        </button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <div class="page">
            <el-pagination
                @current-change="paginationChange"
                :current-page="current"
                :page-size="pageSize"
                :total="total"
                background
                layout="prev, pager, next"
            ></el-pagination>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button
                @click="handleCancel()"
            >取 消</el-button>
            <el-button
                type="primary"
                @click="handleSubmit()"
            >确 定</el-button>
        </span>
    </el-dialog>
</template>
<script>
export default {
    props: [
        'title', // 标题
        'width', // 宽度
        'query', // 请求函数 (params: object, pageSize: number, current: number) => Promise<Array<any>>
        'visible', // 可见与否
        'columns', // 与antd一致（默认增加选择框）
        'value', // Array<{ id: count }>
        'idField', // 指定作为id的属性
        'countField', // 指定数量的属性
        'inventoryField', // 指定库存属性
    ],
    data() {
        return {
            key: '',
            list: [],
            tableData: [],
            selected: {},
            counts: {}, // 缓存临时的数据变化
            current: 1,
            pageSize: 5,
            total: 0,
            index: -1,
        };
    },
    mounted() {
        this.watch();
        this.reset();
    },
    destroyed() {
        this.watchVisible();
        this.watchValue();
    },
    methods: {
        watch() {
            // 监控visible的变化
            this.watchVisible = this.$watch('visible', (newVal, oldVal) => {
                if (newVal) {
                    this.reset();
                }
            });

            this.watchValue = this.$watch('value', (newVal, oldVal) => {
                console.debug('value change: ', newVal);
                this.selected = Object.assign({}, newVal);
                this.updateTableData();
            });
        },
        reset() {
            console.debug('will reset')
            // 初始化请求
            this.key = '';
            this.current = 1;
            this.pageSize = 5;
            this.counts = {};
            this.search();
        },
        applySelectStatus() {
            let { selected, counts } = this;
            this.list.map((item) => {
                const id = item[this.idField];
                if (typeof selected[id] !== 'undefined') {
                    this.$refs.multipleTable.toggleRowSelection(item, true);
                } else {
                    this.$refs.multipleTable.toggleRowSelection(item, false);
                }
                return item;
            });
        },
        updateTableData() {
            console.debug('tableData update: ', this.selected, this.value);

            let { selected, counts } = this;
            this.tableData = this.list.map((item) => {
                console.debug('item: ', item[this.idField], ',v: ', this.selected, selected, item[this.idField], selected[item[this.idField]]);
                const id = item[this.idField];
                if (typeof selected[id] !== 'undefined') {
                    // 注意此处，当把list给this的时候，vue会初始化item
                    // 但是当再次把item组合成一个新的list给tableData的时候
                    // vue会认为item已经初始化过了，而不会自动给item上新增的属性加getter和setter
                    this.$set(item, this.countField, selected[id].count);
                } else {
                    this.$set(item, this.countField, counts[id] || 1); // 没有选的时候检查下counts里有缓存不
                }
                return item;
            });
            setImmediate(this.applySelectStatus);
            // this.applySelectStatus();
        },
        search() {
            console.debug('search: ', this.key);
            // 搜索
            this.query({
                key: this.key,
            }, this.pageSize, this.current)
                .then((resp) => {
                    this.list = resp.list;
                    this.total = resp.total;
                    this.updateTableData()
                })
                .catch(this.loadTableDataError);
        },
        handleSearch() {
            this.current = 1;
            this.search();
        },
        paginationChange(current = this.current) {
            this.current = current;
            this.search();
        },
        handleSelect(selections, row) {
            console.debug('handleSelect: ', selections, row);
            const { selected, counts } = this;
            if (selections.filter((selection) => selection[this.idField] === row[this.idField]).length > 0) {
                selected[row[this.idField]] = {
                    count: counts[row[this.idField]] || 1,
                    ori: Object.assign({}, row),
                };
            } else {
                // 取消选择
                counts[row[this.idField]] = selected[row[this.idField]]
                delete selected[row[this.idField]];
            }
        },
        decrease(index, data) {
            const id = data[this.idField];
            this.index = index;
            const { countField, counts } = this;
            if (data[countField] <= 0) {
                return;
            }
            this.tableData[index][countField]--;
            counts[id] = this.tableData[index][countField];
            this.selected[id] && (this.selected[id].count = counts[id]);
        },
        increase(index, data) {
            const id = data[this.idField];
            this.index = index;
            const { countField, inventoryField, counts } = this;
            if (data[countField] >= data[inventoryField]) {
                return;
            }
            this.tableData[index][countField]++;
            counts[id] = this.tableData[index][countField];
            this.selected[id] && (this.selected[id].count = counts[id]);
        },
        handleSubmit() {
            // 整理数据格式在页面上处理
            this.$emit('submit', this.selected);
        },
        handleCancel() {
            // 清理掉数据
            this.counts = {};
            this.selected = Object.assign({}, this.value);
            this.$emit('update:visible', false)
        }
    }
}
</script>

<style lang="scss" scoped>
.el-select-dropdown__list {
  height: 139px !important;
  overflow-y: scroll !important;
}

.baseInfo-title {
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

.addborder {
  border-radius: 5px;
}

.add-delete a {
  margin-left: 5px;
  cursor: pointer;
}

.add-delete {
  color: #409eff;
  margin-left: -40px;
  float: left;
  font-size: 40px;
  display: inline-flex;
}

.input-field {
  border-radius: 5px;
  height: 40px;
}

.Spinner {
  display: block;
  overflow: hidden;
  width: 160px;
}

.Spinner button {
  // display: inline-block;
  width: 35px;
  height: 35px;
  border: 1px solid #d9d9d9;
  background-color: #f7f7f7;
  float: left;
  cursor: pointer;
  outline: 0;
}

.Spinner .Amount {
  width: 50px;
  height: 35px;
  border-width: 1px 0;
  border-style: solid;
  border-color: #d9d9d9;
  float: left;
  text-align: center;
  color: #565656;
  outline: 0;
}
.Decrease {
  border-radius: 5px 0 0 5px;
}

.Increase {
  border-radius: 0 5px 5px 0;
}
.Decrease i {
  font-size: 20px;
  color: #409eff;
}

.Increase i {
  position: relative;
  top: 8px;
  font-size: 22px;
  color: #409eff;
}
</style>

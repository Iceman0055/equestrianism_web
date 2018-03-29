<template>
  <div class="content_page background">
    <div class="content-title-reuse">
      <div class="title">日程</div>
    </div>
    <vue-event-calendar :events="demoEvents" @month-changed="monthChange" @day-changed="dayChange">
      <template scope="props">
        <div class="event-item" v-for="(event,index) in props.showEvents" :key="event">
          <div class="reuse-head">
            <div class="reuse-title">{{index+1}}. {{event.title}}</div>
            <div class="reuse-date">{{event.date}}</div>
            <!-- <el-button type="primary" v-if="otherAdd" icon="el-icon-edit" circle @click="showOtherAdd(event)"></el-button> -->
            <el-button @click="showDelete(event)" type="warning" icon="el-icon-delete" circle></el-button>
          </div>
          <div class="reuse-foot">
            {{event.desc}}
          </div>
        </div>
      </template>
    </vue-event-calendar>
    <!-- <el-dialog title="添加事件" :modal-append-to-body="false" :visible.sync="addDialog" width="40%" center>
      <div class="text-center content-show">
        <div class="row list-search">
          <div class="col-md-12 search-field">
            <div class="label">标题：</div>
            <input type="text" v-model="title" class="form-control input-field" placeholder="请输入标题" />
          </div>
        </div>
        <div class="row list-search">
          <div class="col-md-12 search-field">
            <div class="label" style="left:-15px">描述(非必填)：</div>
            <input type="text" v-model="desc" class="form-control input-field" placeholder="请输入描述" />
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer text-center">
        <el-button @click="addDialog = false">取 消</el-button>
        <el-button type="primary" @click="addEvent">确 定</el-button>
      </span>
    </el-dialog> -->
    <el-dialog title="删除" :modal-append-to-body="false" :visible.sync="deleteDialog" width="20%" center>
      <div class="text-center">
        <span>确定要删除吗?</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialog = false">取 消</el-button>
        <el-button type="primary" @click="deleteEvent">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { Message, Button } from 'element-ui'
import vueEventCalendar from 'vue-event-calendar'
export default {
  data() {
    return {
      // date: '',
      // title: '',
      // desc: '',
      deleteDialog: false,
      // otherAdd: false,
      deleteContent: {},
      // addDialog: false,
      demoEvents: [ {
        date: '2018/3/15',
        title: 'eat',
        desc: 'longlonglong description'
      }, {
        date: '2018/3/12',
        title: 'this is a title'
      }]
    }
  },
  methods: {
    showDelete(event) {
      this.deleteDialog = true
      this.deleteContent = event
    },
    deleteEvent() {
      // let deleteArr = [this.deleteContent].length = 0
      this.$message.success('删除成功')
      this.deleteDialog = false
    },
    // addEvent() {
    //   if (!(this.date && this.title)) {
    //     this.$message.error('添加事件信息不能为空！')
    //     return;
    //   }
    //   this.demoEvents.push({
    //     date: this.date,
    //     title: this.title,
    //     desc: this.desc
    //   })
    //   this.$message.success('添加成功！')
    //   this.addDialog = false
    // },
    monthChange(month) {
      console.log(month)
    },
    dayChange(day) {
      // this.title = ''
      // this.desc = ''
      // this.date = day.date
      // this.addDialog = true
      console.log(day)
    }
  },
  name: 'dashboard',
  components: {
    'el-button': Button
  }
}
</script>
<style lang="scss" scoped>
.reuse-head {
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  .reuse-title {
    font-weight: 500;
  }
  .reuse-date {
    color: #999;
  }
}

.reuse-foot {
  font-size: 16px;
  color: #999;
  padding-top: 8px;
  margin-bottom: 8px;
  border-top: 1px solid #ddd;
}

.content_page {
  overflow-y: hidden
}

.content-title-reuse {
  border-radius: 5px;
  padding-left: 20px;
  padding-right: 20px;
  padding: 0.65rem 1.25rem;
  background-color: #DCEDF5;
  border-bottom: 1px solid #cfd8dc;
}

.background {
  background: #E5ECDA;
}
</style>

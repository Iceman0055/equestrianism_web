<template>
  <keep-alive>
    <router-view>
    </router-view>
  </keep-alive>
</template>

<script>
import { Message } from 'element-ui'
export default {
  name: 'app',
  data() {
    return {
    }
  },

}
</script>

<style lang="scss">
.__vev_calendar-wrapper .cal-wrapper .cal-header .title{
  font-size: 18px;
}
.__vev_calendar-wrapper .cal-wrapper .cal-body {
    border: 1px solid #ddd;
}
.__vev_calendar-wrapper .events-wrapper .date {
    height: 30px;
    line-height: 30px;
    font-size: 20px;
}
.__vev_calendar-wrapper .cal-wrapper .cal-body .dates .item .date-num{
  cursor: pointer;
}
.__vev_calendar-wrapper .cal-wrapper .date-num{
  line-height: 70px;
}
.__vev_calendar-wrapper .cal-wrapper .cal-body {
    background: #fff;
}
.el-checkbox__input.is-disabled.is-checked .el-checkbox__inner {
  background-color: #409EFF;
  border-color: #409EFF;
}

.breadcrumb .breadcrumb-item:first-child {
  display: none;
}

.breadcrumb-item+.breadcrumb-item::before {
  content: "";
}

.breadcrumb-item+.breadcrumb-item+.breadcrumb-item::before {
  display: inline-block;
  padding-right: 0.5rem;
  padding-left: 0.5rem;
  color: #b0bec5;
  content: "/";
}

// .full-calendar-body .dates .dates-events .events-week .events-day {
//   cursor: pointer;
//   flex: 1;
//   min-height: 110px;
//   overflow: hidden;
//   text-overflow: ellipsis;
// }


// .full-calendar-body .dates .week-row .day-cell {
//   flex: 1;
//   min-height: 100px;
//   // padding: 4px;
//   border-right: 1px solid #e0e0e0;
//   border-bottom: 1px solid #e0e0e0;
// }


// .fc-state-disabled {
//   opacity: .45;
// }

// .fc-button {
//   background: #20A8D8;
//   color: #fff;
//   width: 50px;
// }

.el-dialog {
  border-radius: 5px;
}

// .comp-full-calendar {
//   box-sizing: content-box;
//   max-width: 100%;
//   background: #E5ECDA
// }

// //重写日历样式
// .full-calendar-header .header-center {
//   font-size: 16px
// }
// .full-calendar-body .dates .dates-events .events-week .events-day .event-box .event-item.is-start{
//   margin-left: 0;
// }
// .full-calendar-body .dates .dates-events .events-week .events-day .event-box .more-link {
//   color: red
// }

// .full-calendar-body .weeks {
//   height: 40px;
//   border-radius: 5px 5px 0 0;
//   line-height: 40px;
//   background: #ECF0CB
// }

// .full-calendar-body .dates .more-events {
//   width: 230px;
//   border: none;
//   box-shadow: none;
// }

// .full-calendar-body .dates .dates-events .events-week .events-day .event-box .event-item {
//   background: #3794E6;
//   color: #ddd;
// }

.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}

.el-field-input {
  width: 100%;
}

.input-field {
  border-radius: 5px;
  height: 40px;
}

.align-items-center {
  background-image: url(/static/img/admin-horse.png);
  background-size: 100% 100%,
}

.el-button.is-plain:hover,
.el-button.is-plain:focus {
  background: #20a8d8;
  color: #fff;
}

.content-footer {
  position: relative;
  left: 46%;
  bottom: 10px;
  text-align: center;
  .makesure {
    background: #20a8d8;
    color: #fff;
    font-size: 16px;
  }
}

.el-textarea.is-disabled .el-textarea__inner,
.el-input.is-disabled .el-input__inner {
  color: #607d8b;
  background: #eee;
}

.form-control:disabled {
  opacity: 1;
  border-color: #ddd;
  background: #eee;
}

.back {
  float: right;
  margin-top: -4px;
}

.wait-loading {
  text-align: center;
  margin-top: 20px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 100%;
  height: 180px;
  display: block;
}

.astyle {
  width: 30px;
  height: 30px;
  padding: 15px;
  color: #fff;
  text-decoration: none;
  &:hover {
    color: #fff;
    text-decoration: none;
  }
}

input:focus {
  border-color: #409EFF
}

.modal-content {
  border-radius: 10px;
  .modal-body {
    font-size: 16px;
    text-align: center;
  }
}

.btn {
  border-radius: 5px;
  cursor: pointer;
}

.content_page {
  background-color: #fff;
  min-height: 100%;
  border: 1px solid #cfd8dc;
  .table {
    line-height: 2rem;
    font-size: 14px;
    tr {
      th {
        text-align: center
      }
      td {
        text-align: center;
        a {
          cursor: pointer;
          color: #20a8d8;
          &:hover {
            color: #1985ac;
          }
        }
      }
    }
  }
  .content-title {
    border-radius: 5px;
    padding-left: 20px;
    padding-right: 20px;
    padding: 0.65rem 1.25rem;
    margin-bottom: 12px;
    background-color: #DCEDF5;
    border-bottom: 1px solid #cfd8dc;
    .title {
      font-size: 16px;
      font-weight: bold;
      display: inline-block;
      &-sub {
        font-size: 14px;
        font-weight: normal;
        margin-left: 30px;
        display: inline-block;
      }
    }

    .controls {
      float: right;
      margin-top: -5px;
      .btn-info {
        background: #337ab7;
        border-color: #337ab7;
      }
    }
  }
  .content-show {
    padding: 20px;
    .list-search {
      padding: 0 15px;
      .search-field {
        position: relative;
        padding-left: 75px;
        margin-bottom: 1em;
        &_controls {
          padding-left: 0;
        }
        .label {
          // width: 78px;
          position: absolute;
          left: -6px;
          top: 8px;
          text-align: right;
        }
        .search-btn {
          cursor: pointer;
          margin-left: 15px; // width: 100%;
        }
      }
    }
    .list-empty {
      width: 100%;
      text-align: center;
      border: 1px solid #cfd8dc;
      border-top: none;
      line-height: 30px;
      background: #eceff1;
    }
    .table {
      margin-bottom: 0;
    }
    .page {
      display: flex;
      justify-content: flex-end;
      margin-top: 20px;
      .itemCount {
        position: absolute;
        right: 0;
        line-height: 35px;
      }
    }
    .detail-table {
      border: 1px solid #ddd;
      border-bottom: none;
      line-height: 35px;
      .item {
        border-bottom: 1px solid #DDD;
        position: relative;
        padding-left: 0;
        .key {
          display: block;
          width: 75px;
          text-align: center;
          background-color: #e4e4e4;
          position: absolute;
        }
        .value {
          width: 100%;
          text-align: center;
          display: block;
          padding-left: 75px;
        }
      }
    }
  }
}
</style>


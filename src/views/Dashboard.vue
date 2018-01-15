<template>
  <div class="content_page setBack">
    <!-- <div class="content-title-reuse">
          <div class="title">日程</div>
        </div>
        <full-calendar id="element" class="test-fc animated slideInDown"  :events="fcEvents" lang="zh">
          <template slot="fc-event-card" scope="p">
            <p>
              <i class="fa">sadfsd</i> {{ p.event.title }} test</p>
          </template>
        </full-calendar> -->

    <div id='calendar'></div>

  </div>
</template>

<script>
let demoEvents = [
  {
    title: '上班',
    start: '2017-12-12',
    end: '2017-12-12',
    cssClass: 'family'
  },
  {
    title: '上班2',
    start: '2017-12-12',
    end: '2017-12-12',
  }, {
    title: '上班2',
    start: '2017-12-12',
    end: '2017-12-12',
  },
  {
    title: '上班2',
    start: '2017-12-12',
    end: '2017-12-12',
  },
  {
    title: '上班2',
    start: '2017-12-12',
    end: '2017-12-12',
  },
  {
    title: '上班2',
    start: '2017-12-12',
    end: '2017-12-12',
  }, {
    title: '上班2',
    start: '2017-12-06',
  },
  {
    title: '休息',
    start: '2017-12-01',
    end: '2017-12-02',
  }, {
    title: '休息',
    start: '2017-12-01',
    end: '2017-12-02',
  },
  {
    title: '休息',
    start: '2017-12-01',
    end: '2017-12-02',
  },
  {
    title: '休息',
    start: '2017-12-01',
    end: '2017-12-02',
  },
  {
    title: '休息',
    start: '2017-12-01',
    end: '2017-12-02',
  },
  {
    title: '验收',
    start: '2017-12-20',
  },
  {
    title: '验收',
    start: '2017-12-20',
  },
  {
    title: '验收',
    start: '2017-12-20',
  },
  {
    title: '验收',
    start: '2017-12-20',
  },
  {
    title: '验收',
    start: '2018-1-20',
  },
];
// import fullCalendar from 'vue-fullcalendar'
import $ from 'jquery'
import fullcalendar from 'fullcalendar'
import 'fullcalendar/dist/fullcalendar.min.css'
import 'fullcalendar/dist/locale/zh-cn.js'
export default {
  data() {
    return {
      fcEvents: demoEvents
    }
  },
  methods: {

  },
  mounted() {
    //初始化FullCalendar 
    $('#calendar').fullCalendar({
      height:650,
      //设置头部信息，如果不想显示，可以设置header为false
      header: {
        //日历头部左边：初始化切换按钮
        left: 'prev,next today',
        //日历头部中间：显示当前日期信息
        center: 'title',
        //日历头部右边：初始化视图
        right: 'month'
        // right: 'month,agendaWeek,agendaDay'
      },
      //设置是否显示周六和周日，设为false则不显示  
      weekends: true,
      //日历初始化时显示的日期，月视图显示该月，周视图显示该周，日视图显示该天，和当前日期没有关系
      defaultDate: new Date(),
      //日程数据 
      events: [
        {
          title: '圣诞节',
          start: '2017-12-25'
        },
        {
          title: '圣诞节',
          start: '2017-12-25'
        },  
        {
          title: '事件1',
          start: '2017-12-26 09:00',
          end: '2017-12-26 18:00',
          color: 'red',
          className: 'doing',
          textColor: '#fff'
        },
        {
          title: '事件2',
          start: '2017-12-26 09:00',
          end: '2017-12-26 18:00',
          color: 'red',
          className: 'doing',
          textColor: '#fff'
        },
      ]
    });
  },
  name: 'dashboard',
  components: {
    // 'full-calendar': fullCalendar
  }
}
</script>
<style scoped>
/* 日历 */

#calendar {
  margin: 40px auto;
  padding: 0 10px;
}
/* Event 参数 className 的值 */

.done:before {
  content: "【 已完成 】";
  background-color: yellow;
  color: green;
  text-align: center;
  font-weight: bold;
  width: 100%;
}
/* Event 参数 className 的值 */

.doing:before {
  content: "【 未完成 】";
  background-color: yellow;
  color: red;
  text-align: center;
  font-weight: bold;
}

#element {
  animation-duration: 1.5s;
}

.content-title-reuse {
  border-radius: 5px;
  padding-left: 20px;
  padding-right: 20px;
  padding: 0.65rem 1.25rem;
  background-color: #DCEDF5;
  border-bottom: 1px solid #cfd8dc;
}

.setBack {
  background: #E5ECDA;
}
</style>

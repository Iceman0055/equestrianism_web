<template>
  <div class="content_page">
    <div class="content-title-reuse">
      <div class="title">日程</div>
    </div>
    <full-calendar id="element" class="test-fc animated slideInDown"  :events="fcEvents" lang="zh">
      <template slot="fc-event-card" scope="p">
        <p>
          <i class="fa">sadfsd</i> {{ p.event.title }} test</p>
      </template>
    </full-calendar>

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
  },    {
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
import fullCalendar from 'vue-fullcalendar'

export default {
  data() {
    return {
      fcEvents: demoEvents
    }
  },
  methods: {

  },
  name: 'dashboard',
  components: {
    'full-calendar': fullCalendar
  }
}
</script>
<style scoped>
#element {
  animation-duration: 1.5s;
}
.content-title-reuse{
    border-radius: 5px;
    padding-left: 20px;
    padding-right: 20px;
    padding: 0.65rem 1.25rem; 
    background-color: #DCEDF5;
    border-bottom: 1px solid #cfd8dc;
}
</style>

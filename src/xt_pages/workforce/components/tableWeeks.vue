<template>
  <div>
    <el-table
        :data="scheduleData"
        border
        style="width: 100%">
        <el-table-column prop="Monday" :label="'周一 (' + weekTitle[0] +')'" min-width="120" align="center">
          <week-item slot-scope="scope" :schedule-detail="scope.row.Monday"></week-item>
        </el-table-column>
        <el-table-column prop="Tuesday" :label="'周二 (' + weekTitle[1] +')'" min-width="120" align="center">
          <week-item slot-scope="scope" :schedule-detail="scope.row.Tuesday"></week-item>
        </el-table-column>
        <el-table-column prop="Wednesday" :label="'周三 (' + weekTitle[2] +')'" min-width="120" align="center">
          <week-item slot-scope="scope" :schedule-detail="scope.row.Wednesday"></week-item>
        </el-table-column>
        <el-table-column prop="Thursday" :label="'周四 (' + weekTitle[3] +')'" min-width="120" align="center">
          <week-item slot-scope="scope" :schedule-detail="scope.row.Thursday"></week-item>
        </el-table-column>
        <el-table-column prop="Friday" :label="'周五 (' + weekTitle[4] +')'" min-width="120" align="center">
          <week-item slot-scope="scope" :schedule-detail="scope.row.Friday"></week-item>
        </el-table-column>
        <el-table-column prop="Saturday" :label="'周六 (' + weekTitle[5] +')'" min-width="120" align="center">
          <week-item slot-scope="scope" :schedule-detail="scope.row.Saturday"></week-item>
        </el-table-column>
        <el-table-column prop="Sunday" :label="'周日 (' + weekTitle[6] +')'" min-width="120" align="center">
          <week-item slot-scope="scope" :schedule-detail="scope.row.Sunday"></week-item>
        </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {getSchedules} from '@/api/schedule';
import WeekItem from './WeekItem';

export default {
    name:'tableWeeks',
    props: {
      weekTime: {
        type: String,
        default: "thisWeek"
      },
    },

    data() {
      return {
        weekTitle:["","","","","","",""],
        weekData:{
          Monday:[],
          Tuesday:[],
          Wednesday:[],
          Thursday:[],
          Friday:[],
          Saturday:[],
          Sunday:[],
        },
        scheduleData: [],
        modeOptions:null,
      }
    },
    watch:{
      weekTime:function(){
        var theType = this.weekType(this.weekTime);
        this.getSchedules(theType);
      },
    },

    methods: {
      getSchedules(weekType){
        getSchedules(weekType).then(response=>{
          this.scheduleData = [];
          if(response.data.state==1){
            this.weekTitle = response.data.data.weekTitle;
            var theSchedules = response.data.data.schdules;
            var that = this;
            theSchedules.forEach(function (schedule){
              schedule['mode_name'] =  typeof(that.modeOptions[schedule.mode_id]) == 'undefined' ? '' : that.modeOptions[schedule.mode_id].name;
              var weekPath = that.weekPath(schedule.schedule_week);
              if (weekPath.length>0) {
                that.weekData[weekPath].push(schedule);
              }
            });
            var rowNum = 0;
            console.log(that.weekData);
            for(var index in that.weekData){
              var thisLen = that.weekData[index].length;
              rowNum = rowNum>=thisLen?rowNum:thisLen;
            }
            console.log(rowNum);
            for (let index = 0; index < rowNum; index++) {
              var dataItem = {};
              for(var weekIndex in that.weekData){
                var weekItem = that.weekData[weekIndex].shift();
                console.log("weekItem", weekItem);
                if (typeof(weekItem) != 'undefined') {
                  dataItem[weekIndex] = weekItem;
                }
              }
              that.scheduleData.push(dataItem)
            }

            console.log(that.scheduleData);

          }else {
            this.$message.error("网络错误");
            return false;
          }
        });
      },
      weekType(weekTime) {
        var theType = 2;
        switch (weekTime) {
          case 'lastWeek':
            theType = 1;
            break;
          case 'thisWeek':
            theType = 2;
            break;
          case 'nextWeek':
            theType = 3;
            break;
          case 'nextTwoWeek':
            theType = 4;
            break;
          default:
            theType = 2;
            break;
        }
        return theType;
      },
      weekPath(week){
        var weekArr = {1:'Monday',2:'Tuesday',3:'Wednesday',4:'Thursday',5:'Friday',6:'Saturday',7:"Sunday"};
        if (typeof(weekArr[week]) == "undefined") {
          return "";
        } 
        return weekArr[week];
      },
    },
    components:{
      WeekItem
    },
    created(){
      this.modeOptions = this.$store.getters.treatment_mode;
        var theType = this.weekType(this.weekTime);
        this.getSchedules(theType);
    },
}
</script>

<style rel="stylesheet/css" lang="scss" scoped>

    
</style>


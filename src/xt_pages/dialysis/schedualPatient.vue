<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input style="width: 400px;" v-model="search_input" class="filter-item"/>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="searchAction">搜索</el-button>
    </div>
    <div class="cell">
      <label class="title"><span class="name">日期查询</span> : </label>
      <el-date-picker v-model="selected_date" prefix-icon="el-icon-date" @change="handleScheduleDateChange" :editable="false" :clearable="false" style="width: 196px;" type="date" placeholder="选择日期时间" align="right" :picker-options="date_picker_options" format="yyyy-MM-dd"></el-date-picker>
    </div>
    <div class="cell clearfix">
      <label class="title"><span class="name">排班班次</span> : </label>
      <div class="time ">
        <ul class="">
          <li v-for="option in schedule_type_options" :key="option.value" @click="handletimeType(option.value)" :class="schedule_type_selected == option.value ? 'active' : ''" >
            {{option.text}}
          </li>
        </ul>
      </div>
    </div>
    <div class="cell clearfix">
      <label class="title"><span class="name">分区</span> : </label>
      <div class="time ">
        <ul class="">
          <li v-for="option in zone_options" :key="option.id" :class="option.id == zone_selected ? 'active' : ''" @click='handleZoneChange(option.id)'>{{ option.text }}
          </li>
        </ul>
      </div>
    </div>

    <div class="PatientArea">
      <div v-for="zone_schedule in filtedSchedules" :key="zone_schedule.zone_id" class="list clearfix">
        <h3 class="title">{{zone_schedule.zone_name}}</h3>
        <patient-box :schedules="zone_schedule.schedules"></patient-box>
      </div>
      <div class="NoData" v-show="filtedSchedules.length == 0">
        <img src="@/assets/img/data.jpg" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  import PatientBox from './PatientBox';
  import { getDialysisRecordInitData, getDialysisSchedules } from "@/api/dialysis_record"
  import { parseTime } from "@/utils"

  export default {
    name: "Patient",
    components: {
      PatientBox
    },
    data() {
      return {
        selected_date: new Date(), // this.$store.getters.app.dialysis_area.schedule_date,
        schedule_type_selected: 0, //this.$store.getters.app.dialysis_area.schedule_type_select_index,
        schedule_type_options: [
          { value: 0, text: "全部班" },
          { value: 1, text: "上午" },
          { value: 2, text: "下午" },
          { value: 3, text: "晚上" },
        ],
        zone_selected: 0,// this.$store.getters.app.dialysis_area.zone_select_index,
        zone_options:[
          { id: 0, text: "全部分区" }
        ],
        zone_schedules:[],

        date_picker_options: {
          shortcuts: [
            {
              text: "今天",
              onClick(picker) {
                picker.$emit("pick", new Date());
              }
            },
            {
              text: "昨天",
              onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24);
                picker.$emit("pick", date);
              }
            },
            {
              text: "一周前",
              onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit("pick", date);
              }
            },
          ]
        },

        // search_input 和 search_keyword，使输入关键字时不会经常刷新 filtedSchedules
        search_keyword: "", // 确定用于搜索的关键字
        search_input: "", // 输入中的关键字
      }
    },
    computed: {
      filtedSchedules: function() {
        var search_keyword = this.search_keyword
        if (search_keyword.length > 0) {
          var schedules = []
          for (let o_i = 0; o_i < this.zone_schedules.length; o_i++) {
            const scheduleInfo = this.zone_schedules[o_i];
            var originSchedules = scheduleInfo.schedules
            if (originSchedules.length == 0) {
              continue
            }
            var filtedSchedules = []
            for (let s_i = 0; s_i < originSchedules.length; s_i++) {
              const schedule = originSchedules[s_i];
              if (schedule.patient.name.indexOf(search_keyword) != -1) {
                filtedSchedules.push(schedule)
                break
              }
            }
            if (filtedSchedules.length > 0) {
              schedules.push({zone_id:scheduleInfo.zone_id, zone_name: scheduleInfo.zone_name, schedules: filtedSchedules})
            }
          }
          return schedules
        }

        var zone_selected = this.zone_selected
        var timetype_selected = this.schedule_type_selected
        if ((zone_selected == 0 && timetype_selected == 0) || this.zone_options.length <= 1) {
          var schedules = []
          for (let index = 0; index < this.zone_schedules.length; index++) {
            const scheduleInfo = this.zone_schedules[index];
            if (scheduleInfo.schedules.length != 0) {
              schedules.push(scheduleInfo)
            }
          }
          return schedules
        }

        var schedules = []
        for (let o_i = 0; o_i < this.zone_schedules.length; o_i++) {
          const scheduleInfo = this.zone_schedules[o_i];
          if (zone_selected == scheduleInfo.zone_id && timetype_selected == 0) {
            if (scheduleInfo.schedules.length == 0) {
              return []
            } else {
              return [scheduleInfo]
            }
          }
          var originSchedules = scheduleInfo.schedules
          if (originSchedules.length == 0) {
            continue
          }
          var filtedSchedules = []
          for (let s_i = 0; s_i < originSchedules.length; s_i++) {
            const schedule = originSchedules[s_i];
            if (zone_selected != 0) {
              if (zone_selected == schedule.device_zone.id) {
                if (timetype_selected == 0 || schedule.schedule_type == timetype_selected) {
                  filtedSchedules.push(schedule)
                }
              }
            } else {
              if (timetype_selected == 0 || schedule.schedule_type == timetype_selected) {
                filtedSchedules.push(schedule)
              }
            }
          }
          if (filtedSchedules.length > 0) {
            schedules.push({zone_id:scheduleInfo.zone_id, zone_name: scheduleInfo.zone_name, schedules: filtedSchedules})
          }
        }
        return schedules
      }
    },
    created() {
      this.getInitData()
    },
    methods: {
      handletimeType: function(index) {
        this.schedule_type_selected = index;
        this.search_keyword = this.search_input = ""
        // this.$store.dispatch("SaveDialysisAreaSelectIndexs", {
        //   zone: this.zone_selected, 
        //   schedule_type: this.schedule_type_selected, 
        //   schedule_date: this.selected_date,
        // })
      },
      handleZoneChange:function(index) {
        this.zone_selected = index;
        this.search_keyword = this.search_input = ""
        // this.$store.dispatch("SaveDialysisAreaSelectIndexs", {
        //   zone: this.zone_selected, 
        //   schedule_type: this.schedule_type_selected, 
        //   schedule_date: this.selected_date,
        // })
      },
      handleScheduleDateChange: function() {
        this.zone_selected = 0
        this.schedule_type_selected = 0
        this.search_keyword = this.search_input = ""
        // this.$store.dispatch("SaveDialysisAreaSelectIndexs", {
        //   zone: this.zone_selected, 
        //   schedule_type: this.schedule_type_selected, 
        //   schedule_date: this.selected_date,
        // })
        this.requestDialysisSchedules()
      },
      searchAction: function() {
        this.search_keyword = this.search_input
        this.schedule_type_selected = 0
        this.zone_selected = 0
      },
      getInitData: function() {
        getDialysisRecordInitData().then(rs => {
          var resp = rs.data
          if (resp.state == 1) {
            var zones = resp.data.zones
            var schedules = resp.data.schedules
            var zone_options = [{ id: 0, text: "全部分区" }]
            for (let z_i = 0; z_i < zones.length; z_i++) {
              const zone = zones[z_i];
              zone_options.push({ id: zone.id, text: zone.name, })
            }
            this.zone_options = zone_options
            this.zone_schedules = this.processedDialysisSchedules(schedules, this.zone_options)

          } else {
            this.$message.error(resp.msg)
          }
        })
      },
      requestDialysisSchedules: function() {
        var ymd = parseTime(this.selected_date, "{y}-{m}-{d}")
        getDialysisSchedules(ymd).then(rs => {
          var resp = rs.data
          if (resp.state == 1) {
            var schedules = resp.data.schedules
            this.zone_schedules = this.processedDialysisSchedules(schedules, this.zone_options)

          } else {
            this.$message.error(resp.msg)
          }
        })
      },
      processedDialysisSchedules: function(schedules, zone_options) {
        var zoneMap = {}
        var scheduleMap = {}
        for (let z_i = 0; z_i < zone_options.length; z_i++) {
          const zone = zone_options[z_i];
          if (zone.id == 0) {
            continue
          }
          scheduleMap[zone.id] = []
        }
        for (let index = 0; index < schedules.length; index++) {
          const schedule = schedules[index]
          scheduleMap[schedule.device_zone.id].push(schedule)
        }
        var zone_schedules = []
        for (let index = 0; index < zone_options.length; index++) {
          const zone = zone_options[index]
          if (zone.id == 0) {
            continue
          }
          var schedules = scheduleMap[zone.id]
          zone_schedules.push({zone_id: zone.id, zone_name: zone.text, schedules: schedules})
        }
        return zone_schedules
      },
    },
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-container {
    // margin: 20px;
    font-size: 15px;
    .filter-container {
      padding-bottom: 5px;
    }
    .search-component {
      width: 500px;
      .searchBox {
        width: 300px;
        height: 36px;
        line-height: 36px;
        padding-left: 15px;
        border: 1px #dcdfe6 solid;
        border-right: none;
        outline: none;
        float: left;
        border-radius: 6px 0 0 6px;
        font-size: 14px;
        color: #333;
        background: #fff;
        box-shadow: 3px 3px 4px rgba(135, 135, 135, 0.05);
      }
      .searchBtn {
        background-color: #409eff;
        color: #fff;
        font-size: 15px;
        text-align: center;
        height: 36px;
        line-height: 36px;
        float: left;
        outline: none;
        width: 70px;
        border: none;
        border-radius: 0 6px 6px 0;
        font-family: "Microsoft Yahei";
        cursor: pointer;
      }
    }
    .cell {
      margin: 0px 0 15px 0;
      -moz-box-sizing: border-box;
      -webkit-box-sizing: border-box;
      -o-box-sizing: border-box;
      -ms-box-sizing: border-box;
      box-sizing: border-box;
      display: -webkit-box;
      display: -ms-flexbox;
      // display: flex;
      -webkit-box-align: flex-start;
      -ms-flex-align: flex-start;
      align-items: flex-start;
      text-align: left;
      justify-content: flex-start;
      color: #333;
      .title {
        width: 80px;
        display: inline-block;
        font-weight: normal;
        color: #909399;
        padding: 6px 0;
        font-weight: 700;
        .name {
          width: 60px;
          text-align: justify;
          text-justify: distribute-all-lines;
          text-align-last: justify;
          -moz-text-align-last: justify;
          -webkit-text-align-last: justify;
          display: inline-block;
        }
      }
      .time {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        ul {
          padding: 0;
          margin: 0;
          li {
            float: left;
            list-style: none;
            cursor: pointer;
            padding: 3px 0;
            width: 70px;
            color: #606266;
            border-radius: 4px;
            margin: 0 10px 10px 0;
            color: #409eff;
            border: 1px #409eff solid;
            text-align: center;
            &:hover {
              background: #409eff;
              color: #fff;
            }
          }
          .active {
            background: #409eff;
            color: #fff;
          }
        }
      }
    }
    .amount {
      font-weight: normal;
      padding: 10px 0 0 0;
      color: #606266;
      font-size: 14px;
      span {
        color: #ef2525;
        font-family: "Arial";
        padding: 0 2px;
      }
    }
  }
  .PatientArea{
    .list{
      .title{
        font-size: 16px;
        color: #34495e;
        height:50px ;
        line-height: 50px;
        font-weight: bold;
      }
    }
  }
  .NoData {
    text-align: center;
  }
</style>


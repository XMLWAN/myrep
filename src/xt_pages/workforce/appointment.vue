<template>
  <div class="app-container">
    <el-row>
      <el-col :span="19">
        <el-tabs v-model="activeName" :tab-position="tabPosition" :stretch="true" >
          <el-tab-pane name="lastWeek">
              <span slot="label"><i class="el-icon-arrow-up"></i> 上周 ({{theWeek.lastWeek}})</span>
          </el-tab-pane>
          <el-tab-pane name="thisWeek" >
              <span slot="label"><i class="el-icon-date"></i> 本周 ({{theWeek.thisWeek}})</span>
          </el-tab-pane>
          <el-tab-pane name="nextWeek">
              <span slot="label"><i class="el-icon-arrow-down"></i> 下一周 ({{theWeek.nextWeek}})</span>
          </el-tab-pane>
          <el-tab-pane name="nextTwoWeek" >
              <span slot="label"><i class="el-icon-circle-plus-outline"></i> 下两周 ({{theWeek.nextTwoWeek}})</span>
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="5" style="text-align: right;">
        <el-button type="primary" @click="printScheduleAction">打印</el-button>
        <el-button type="primary" @click="setScheduleTemplateAction">排班模板</el-button>
      </el-col>
    </el-row>
    
    <table-data :week-time="activeName" :partitions-prop="partitions" :schedule-zone-row-prop="scheduleZoneRow" :schedule-zone-prop="scheduleZone" title=""></table-data>
  </div>   
</template>

<script>
import tableData from './components/tableData';
import {getWeekPanels} from '@/api/schedule';

export default {
    name:'appointment',
    data(){
        return {
            activeName:"thisWeek",
            tabPosition: 'top',
            partitions:{},
            scheduleZone:[],
            scheduleZoneRow:[],
            theWeek:{
                lastWeek:0,thisWeek:0,nextWeek:0,nextTwoWeek:0
            }
        }
    },
    components:{
        tableData
    },
    methods:{
      getWeekPanels(){
        getWeekPanels(1).then(response=>{
          if (response.data.state==0) {
            return false
          }
          var partitions = response.data.data.partitions;
          this.theWeek.thisWeek = response.data.data.theWeek;
          this.theWeek.lastWeek = this.theWeek.thisWeek-1;
          this.theWeek.nextWeek = this.theWeek.thisWeek+1;
          this.theWeek.nextTwoWeek = this.theWeek.thisWeek+2;
          var that = this;
          if (partitions.length>0) {
            partitions.forEach(function(partition){
              if (partition.jihaos.length==0) {
                return false;
              }
              that.scheduleZoneRow.push(partition.jihaos.length);
              that.partitions[partition.id] = partition;
              partition.jihaos.forEach(function(jihao){
                var thisPa = {
                  area:partition.name,
                  zone_id: partition.id,
                  zone_type: partition.type,
                  cut:jihao.number,
                  jihao_id:jihao.id,
                  Mon_M:{schedule_id:0, mode_id:0, mode_name:"", patient_id:0, patient:""},
                  Mon_A:{schedule_id:0, mode_id:0, mode_name:"", patient_id:0, patient:""},
                  Mon_N:{schedule_id:0, mode_id:0, mode_name:"", patient_id:0, patient:""},
                  Tue_M:{schedule_id:0, mode_id:0, mode_name:"", patient_id:0, patient:""},
                  Tue_A:{schedule_id:0, mode_id:0, mode_name:"", patient_id:0, patient:""},
                  Tue_N:{schedule_id:0, mode_id:0, mode_name:"", patient_id:0, patient:""},  
                  Wed_M:{schedule_id:0, mode_id:0, mode_name:"", patient_id:0, patient:""},
                  Wed_A:{schedule_id:0, mode_id:0, mode_name:"", patient_id:0, patient:""},
                  Wed_N:{schedule_id:0, mode_id:0, mode_name:"", patient_id:0, patient:""},
                  Thurs_M:{schedule_id:0, mode_id:0, mode_name:"", patient_id:0, patient:""},
                  Thurs_A:{schedule_id:0, mode_id:0, mode_name:"", patient_id:0, patient:""},
                  Thurs_N:{schedule_id:0, mode_id:0, mode_name:"", patient_id:0, patient:""},
                  Fri_M:{schedule_id:0, mode_id:0, mode_name:"", patient_id:0, patient:""},
                  Fri_A:{schedule_id:0, mode_id:0, mode_name:"", patient_id:0, patient:""},
                  Fri_N:{schedule_id:0, mode_id:0, mode_name:"", patient_id:0, patient:""},
                  Sat_M:{schedule_id:0, mode_id:0, mode_name:"", patient_id:0, patient:""},          
                  Sat_A:{schedule_id:0, mode_id:0, mode_name:"", patient_id:0, patient:""},
                  Sat_N:{schedule_id:0, mode_id:0, mode_name:"", patient_id:0, patient:""},
                  Sun_A:{schedule_id:0, mode_id:0, mode_name:"", patient_id:0, patient:""},
                  Sun_N:{schedule_id:0, mode_id:0, mode_name:"", patient_id:0, patient:""},
                  Sun_M:{schedule_id:0, mode_id:0, mode_name:"", patient_id:0, patient:""},
                  total:0
                }
                that.scheduleZone.push(thisPa);
              });
            });
          }
        });
      },
      setScheduleTemplateAction: function() {
        this.$router.push({ path: "/workforce/template" })
      },
      printScheduleAction: function() {
        var date = (new Date()).getTime()
        if (this.activeName == "lastWeek") {
          date = date - 7 * 24 * 60 * 60 * 1000
        } else if (this.activeName == "nextWeek") {
          date = date + 7 * 24 * 60 * 60 * 1000
        } else if (this.activeName == "nextTwoWeek") {
          date = date + 14 * 24 * 60 * 60 * 1000
        }
        this.$router.push({ path: "/workforce/schedule/print", query: { date: date } })
      },
    },
    created(){
      this.getWeekPanels();
    }
}
</script>

<style rel="stylesheet/css" lang="scss">

</style>


<template>
  <div class="patient-container">
    <patient-sidebar :id="patientID" defaultActive="2-4"></patient-sidebar>
    <div class="patient-app-container app-container ">
      <table-title title="排班记录列表"></table-title>
      <div class="sum">
          <!-- <span>治疗频率 : 两周5次 </span> -->
      </div> 
      
      <el-table
          :data="schedules"
          border
          style="width: 100%">
          <el-table-column
          prop="schedule_date"
          label="日期"
          align="center"
          min-width="60">
            <template slot-scope="scope" >
             {{scope.row.week}}周 ({{scope.row.schedule_date | parseTime('{y}-{m}-{d}')}})
            </template>
          </el-table-column>
          <el-table-column
          prop="schedule_type"
          label="班次"
          align="center"
          min-width="60">
          <template slot-scope="scope">{{scheduleType(scope.row.schedule_type)}}</template>
          </el-table-column>
          <el-table-column
          prop="zone.name"
          label="分区"
          align="center"
          min-width="60">
          </el-table-column>
          <el-table-column
          prop="bed.number"
          label="机号"
          align="center"
          min-width="60">
          </el-table-column>
          <el-table-column
          prop="mode_id"
          label="治疗模式"
          align="center"
          min-width="80">
          <template slot-scope="scope">{{modeName(scope.row.mode_id)}}</template>
          </el-table-column>
          <!-- <el-table-column 
          prop="apply"
          label="申请调班日期"
          align="center"
          min-width="120">
          </el-table-column>
          <el-table-column
          prop="reason"
          label="申请理由"
          align="center"
          min-width="70">
          </el-table-column>  
          <el-table-column
          prop="status"
          label="申请状态"
          align="center"
          min-width="70">
          </el-table-column>
          <el-table-column
          prop="operation"
          label="操作"
          align="center"
          min-width="60">
          </el-table-column> -->
      </el-table>               

    </div>
  </div>    
</template>

<script>
import tableTitle from './components/tableTitle'
import PatientSidebar from './components/PatientSidebar'

import {GetPatientSchedules} from '@/api/schedule';
export default {
    name:'scheduling',
    data() {
      return {
        modeOptions:null,
        schedules: [],
        patientID:0,
      }
    },
    components:{
        tableTitle,
        PatientSidebar
    },
    methods:{
      GetPatientSchedules(id){
        GetPatientSchedules(id).then(response=>{
          if (response.data.state==1) {
            this.schedules = response.data.data.schedules;
          }
        });
      },
      scheduleType(scheduleType) {
        var typeName = "";
        switch (scheduleType) {
          case 1:
            typeName = "上午";
            break;
          case 2:
            typeName = "下午";
            break;
          case 3:
            typeName = "晚上";
            break;
        
          default:
            break;
        }
        return typeName;
      },
      modeName(mode_id) {
        return typeof(this.modeOptions[mode_id]) != 'undefined' && typeof(this.modeOptions[mode_id].name) != 'undefined'?this.modeOptions[mode_id].name:'';
      }
    },
    created(){
      const id = this.$route.params && this.$route.params.id;
      this.patientID = parseInt(id);
      if (isNaN(this.patientID) || this.patientID <= 0) {
        this.$notify.error({
          title: "错误",
          message: "无效的id"
        });
        this.$router.push('/patients/patients');
      }
      
      this.modeOptions = this.$store.getters.treatment_mode;
      this.GetPatientSchedules(this.patientID);

    }
}
</script>

<style rel="stylesheet/css" lang="scss" scoped>
 .sum{
    border: 1px #ebeef5 solid;
    border-top: none;  
    border-bottom: none;  
    padding:10px 0 10px 15px;
    font-size: 15px;
    color: #909399;  
  }

</style>

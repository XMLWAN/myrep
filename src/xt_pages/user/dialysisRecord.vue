<template>

  <div class="patient-container">
   <patient-sidebar :id="patientID" defaultActive="2-2" v-on:tran-patient="onTranPatient"></patient-sidebar>
    <div class="patient-app-container app-container">
        <div>
          <el-form ref="form" :model="queryParams" label-width="80px" :inline="true">
            <!-- <el-form-item label="患者时间 : " >
              <el-select v-model="form.date"   >
              <el-option v-for="item in dateOptions " :label="item.label" :value="item.value" :key="item.value" ></el-option>
              </el-select>
            </el-form-item> -->
            <el-form-item label="患者时间 :" >
                  <el-col :span="11">
                    <el-date-picker type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择开始时间" style="width:150px" v-model="queryParams.start_time" @change="changeSearch" ></el-date-picker>
                  </el-col>
                  <el-col class="line" :span="2">-</el-col>
                  <el-col :span="11">
                    <el-date-picker type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择结束时间" style="width:150px" v-model="queryParams.end_time" @change="changeSearch" ></el-date-picker>
                  </el-col>
            </el-form-item>
            <el-form-item label="透析模式 : "  style="margin-left:15px;">
              <el-select v-model="queryParams.mode_id" @change="changeSearch" clearable style="width:150px"  >
              <el-option v-for="item in modeOptions " :label="item.name" :value="item.id" :key="item.id" ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="" >
                <el-button style="float:right;" @click="printThisInfo()" type="primary" icon="el-icon-printer" >打印</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div>
          <!-- <span class="total">共0条记录</span> -->
          <el-table :data="recordData" border style="width: 100%" @current-change="clickCurrent">
              <el-table-column prop="dialysis_date" label="透析日期" align="center" min-width="50">
                <template slot-scope="scope"><span>{{scope.row.dialysis_date | parseTime('{y}-{m}-{d}')}}</span></template>
              </el-table-column>
              <el-table-column prop="schedule_type" label="班次" align="center" min-width="60">
                <template slot-scope="scope"><span>{{scheduleType(scope.row.schedule_type)}}</span></template>
              </el-table-column>
              <el-table-column prop="partition" min-width="60" align="center" label="分区 - 机号">
                <template slot-scope="scope"><span>{{scope.row.partition_name}}-{{scope.row.device_number}}</span></template>
              </el-table-column>
              <el-table-column prop="mode" min-width="60" align="center" label="透析模式">
                <template slot-scope="scope">{{modeName(scope.row.prescription.mode_id)}}</template>
              </el-table-column>
              <el-table-column prop="prescription.dialysis_duration" width="80" align="center" label="透析时长 h">
              </el-table-column>
              <el-table-column prop="prescription.dry_weight" width="70" align="center" label="干体重 kg">
              </el-table-column>
              <el-table-column prop="predialysis_evaluation.weight_before" width="80" align="center" label="透前体重 kg">
              </el-table-column>
              <el-table-column prop="assessment_after_dislysis.weight_after" width="80" align="center" label="透后体重 kg">
              </el-table-column>
              <el-table-column prop="predialysis_evaluation" width="80" align="center" label="透前血压 mmhg">
                <template slot-scope="scope"><span>{{scope.row.predialysis_evaluation.systolic_blood_pressure}}/{{scope.row.predialysis_evaluation.diastolic_blood_pressure}}</span></template>
              </el-table-column>
              <el-table-column prop="assessment_after_dislysis" width="80" align="center" label="透后血压 mmhg">
                <template slot-scope="scope"><span>{{scope.row.assessment_after_dislysis.systolic_blood_pressure}}/{{scope.row.assessment_after_dislysis.diastolic_blood_pressure}}</span></template>
              </el-table-column>
              <el-table-column prop="predialysis_evaluation.ultrafiltration_amount" width="80" align="center" label="超滤总量 L">
              </el-table-column>
              <el-table-column  prop="access" min-width="60" align="center" label="血管通路">
                <template slot-scope="scope"><span>{{setVascularAccess(scope.row.prescription)}}</span></template>
              </el-table-column>
              <el-table-column prop="type" width="110" align="center" label="抗凝剂种类 首剂/维持/总量">
              <template slot-scope="scope">
                <span>{{setAnticoagulantsConfit(scope.row.prescription)}}</span>
              </template>
              </el-table-column>
              <el-table-column prop="model" min-width="60" align="center" label="透析器型号">
                <template slot-scope="scope"><span>{{setDialyzerModel(scope.row.prescription)}}</span></template>
              </el-table-column>
              <el-table-column  prop="nurse" min-width="60" align="center" label="治疗护士">
                <template slot-scope="scope"><span>{{getNurseName(scope.row.treatment_summary)}}</span></template>
              </el-table-column>
              <el-table-column prop="doctor" min-width="60" align="center" label="治疗医生">
                <template slot-scope="scope"><span>{{getDoctorName(scope.row.treatment_summary)}}</span></template>
              </el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="queryParams.page"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="10"
            background
            style="margin-top:20px;"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
        
        <div style="display:none;">
            <div id="printRecord" class="record-order">
                <div class="rd-title">{{orgname}}</div>
                <div class="rd-name">
                    <span>姓名：<span class="item-value">{{currentPatient.name}}</span></span>
                    <span style="margin-left:10px;">透析号：<span class="item-value">{{currentPatient.dialysis_no}}</span></span>
                </div>
                <table cellspacing="0" cellpadding="0" border="1" class="el-table__body" style="width: 100%;">
                    <thead>
                      <th>透析日期</th>
                      <th>班次</th>
                      <th>分区机号</th>
                      <th>透析模式</th>
                      <th>透析时长（h）</th>
                      <th>干体重（kg）</th>
                      <th>透前体重（kg）</th>
                      <th>透后体重（kg）</th>
                      <th>透前血压（mmhg）</th>
                      <th>透后血压（mmhg）</th>
                      <th>超滤总量（L）</th>
                      <th>血管通路</th>
                      <th>抗凝剂种类 首剂/维持/总量</th>
                      <th>透析器型号</th>
                      <th>治疗护士</th>
                      <th>治疗医生</th>
                    </thead>
                    <tbody>
                      <tr v-for="item in recordData" :key="item.id">
                        <td>{{item.dialysis_date | parseTime('{y}-{m}-{d}')}}</td>
                        <td>{{scheduleType(item.schedule_type)}}</td>
                        <td>{{item.partition_name}}-{{item.device_number}}</td>
                        <td>{{modeName(item.prescription.mode_id)}}</td>
                        <td>{{item.prescription.dialysis_duration}}</td>
                        <td>{{item.prescription.dry_weight}}</td>
                        <td>{{item.predialysis_evaluation.weight_before}}</td>
                        <td>{{item.assessment_after_dislysis.weight_after}}</td>
                        <td>{{item.predialysis_evaluation.systolic_blood_pressure}}/{{item.predialysis_evaluation.diastolic_blood_pressure}}</td>
                        <td>{{item.assessment_after_dislysis.systolic_blood_pressure}}/{{item.assessment_after_dislysis.diastolic_blood_pressure}}</td>
                        <td>{{item.predialysis_evaluation.ultrafiltration_amount}}</td>
                        <td>{{setVascularAccess(item.prescription)}}</td>
                        <td>{{setAnticoagulantsConfit(item.prescription)}}</td>
                        <td>{{setAnticoagulantsConfit(item.prescription)}}</td>
                        <td>{{getNurseName(item.treatment_summary)}}</td>
                        <td>{{getDoctorName(item.treatment_summary)}}</td>
                      </tr>

                    </tbody>
                </table>

            </div>
        </div>
    </div>
  </div>
</template>
<script>
import PatientSidebar from './components/PatientSidebar';
import {getPatientDialysisRecords} from '@/api/patient';
import {uParseTime} from "@/utils/tools";
import { fetchAllDoctorAndNurse } from "@/api/doctor";
import print from "print-js";

export default {
  name: "dialysisRecord",
  data() {
    return {
      orgname:'',
      currentPatient:{},
      patientID:0,
      total:0,
      queryParams: {
        // date: "",
        mode_id:'',
        start_time: "",
        end_time: "",
        page:1,
        patient_id:0,
        limit:10,
      },
      recordData: [],
      dateOptions: [
        { value: "0", label: "本月" },
        { value: "1", label: "本年" }
      ],
      modeOptions: [],
      anticoagulantsConfit:[],
      blood_filters:[],
      perfusion_apparatus:[],
      hemodialysis_machines:[],
      doctorOptions: [],
      nurseOptions: [],
      vascularAccess: [],
      vascularAccessDesc: [],
    };
  },
  components: {
    PatientSidebar
  },
  methods:{
    changeSearch(){
      this.getPatientDialysisRecords();
    },
    handleSizeChange(val) {
      this.queryParams.limit = val;
      this.getPatientDialysisRecords();
    },
    handleCurrentChange(val) {
      this.queryParams.page = val;
      this.getPatientDialysisRecords();
    },
    getPatientDialysisRecords() {
      getPatientDialysisRecords(this.queryParams).then(response=>{
        if (response.data.state==1) {
          this.total = response.data.data.total;
          this.recordData = response.data.data.records;
        }
      });
    },
    fetchAllDoctorAndNurse(){
      fetchAllDoctorAndNurse().then(response=>{
        if (response.data.state==1) {
            this.doctorOptions = response.data.data.doctors === null ? [] : response.data.data.doctors;
            this.nurseOptions = response.data.data.nursers === null ? [] : response.data.data.nursers;
        }
      });
    },
    scheduleType(schedule_type) {
      var typeName = "未知"
      switch (schedule_type) {
        case 1:
          typeName = '上午';
          break;
        case 2:
          typeName = '下午';
          break;
        case 3:
          typeName = '晚上';
          break;
        default:
          break;
      }
      return typeName;
    },
    modeName(mode_id) {
      return typeof(this.modeOptions[mode_id]) != 'undefined' && typeof(this.modeOptions[mode_id].name) != 'undefined'?this.modeOptions[mode_id].name:'';
    },
    setAnticoagulantsConfit(prescription){
      if (typeof(this.anticoagulantsConfit[prescription.anticoagulant]) == 'undefined') {
        return '';
      }else {
        if (this.anticoagulantsConfit[prescription.anticoagulant].shouji != 1) {
          return this.anticoagulantsConfit[prescription.anticoagulant].name;
        }else {
          return this.anticoagulantsConfit[prescription.anticoagulant].name + '/' + prescription.anticoagulant_shouji + '/' + prescription.anticoagulant_weichi + '/' + prescription.anticoagulant_zongliang;
        }
      }
    },
    setVascularAccess(prescription){
      if (typeof(this.vascularAccess[prescription.vascular_access_mode]) == 'undefined') {
        return '';
      }else {
        if ( typeof(this.vascularAccessDesc[prescription.vascular_access]) == 'undefined') {
          return this.vascularAccess[prescription.vascular_access_mode].name;
        }else {
          return this.vascularAccess[prescription.vascular_access_mode].name + '-' + this.vascularAccessDesc[prescription.vascular_access].name;
        }
      }
    },
    setDialyzerModel(prescription){
      var models = [];
      if (prescription.hemodialysis_machine>0) {
         var ml = this.hemodialysis_machines.length;
         if(ml>0) {
           for (let index = 0; index < ml; index++) {
             if (this.hemodialysis_machines[index].id==prescription.hemodialysis_machine) {
                models.push(this.hemodialysis_machines[index].name);
             }
           }
         }
      }
      if (prescription.blood_filter>0 ) {
        var ml = this.blood_filters.length;
         if(ml>0) {
           for (let index = 0; index < ml; index++) {
             if (this.blood_filters[index].id==prescription.blood_filter) {
                models.push(this.blood_filters[index].name);
             }
           }
         }
      }
      if (prescription.perfusion_apparatus>0 ) {
        var ml = this.perfusion_apparatus.length;
         if(ml>0) {
           for (let index = 0; index < ml; index++) {
             if (this.perfusion_apparatus[index].id==prescription.perfusion_apparatus) {
                models.push(this.perfusion_apparatus[index].name);
             }
           }
         }
      }
      return models.join('，');
    },
    getDoctorName(summary){
      var dl = this.doctorOptions.length;
      if (dl>0) {
        for (let index = 0; index < dl; index++) {
          if (this.doctorOptions[index].id=summary.zl_doctor) {
            return this.doctorOptions[index].name;
          }
        }
      }
      return '';
    },
    getNurseName(summary){
      var dl = this.nurseOptions.length;
      if (dl>0) {
        for (let index = 0; index < dl; index++) {
          if (this.nurseOptions[index].id=summary.zl_nurse) {
            return this.nurseOptions[index].name;
          }
        }
      }
      return '';
    },
    onTranPatient:function (tranPatient) {
        this.currentPatient = tranPatient;
    },
    printThisInfo() {
      const style = '@media print { .record-order .rd-title{  text-align: center; font-weight: 600; font-size: 30px; line-height: 80px; margin-bottom: 20px; } .record-order .rd-type{ text-align: center;  margin-bottom: 20px; } .record-order .rd-name { align-items: center; justify-content: space-between; padding: 30px 2em; } .record-order .el-table__body{ border: 1px solid #333; } .record-order .el-table__body td{ border: 1px solid #333; } .record-order .item-value {  border-bottom: 1px solid #333; padding: 0 20px;} .record-order th, .record-order td {  padding: 5px 10px; }}';
      setTimeout(() => { 
          printJS({
          printable: "printRecord",
          type: "html",
          style: style,
          scanStyles: false
          });
      }, 1);
    },clickCurrent(val){
      this.$router.push({ path: "/dialysis/details", query: {patient_id: val.patient_id, date: val.dialysis_date}})
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
      this.$router.back(-1);
    }
    this.queryParams.patient_id = this.patientID;
    this.modeOptions = this.$store.getters.treatment_mode;
    this.anticoagulantsConfit = this.$store.getters.anticoagulants_confit;
    this.blood_filters = this.$store.getters.blood_filters;
    this.perfusion_apparatus = this.$store.getters.perfusion_apparatus;
    this.hemodialysis_machines = this.$store.getters.hemodialysis_machines;
      this.vascularAccess = this.$store.getters.vascular_access;
      this.vascularAccessDesc = this.$store.getters.vascular_access_desc;

    this.fetchAllDoctorAndNurse();
    this.getPatientDialysisRecords();

    
    var xtuser = this.$store.getters.xt_user;
    this.orgname = xtuser.org.org_name;
  }
};
</script>
<style rel='stylesheet/scss' lang="scss" scoped >
.total {
  font-size: 14px;
  line-height: 32px;
  height: 32px;
  color: #6caef7;
}

.record-order .rd-title{
    text-align: center;
    font-weight: 600;
    font-size: 30px;
    line-height: 80px;
    margin-bottom: 20px;
}
.record-order .rd-type{
    text-align: center;
    margin-bottom: 20px;
}
.record-order .rd-name {
    align-items: center;
    justify-content: space-between;
    padding: 30px 2em;
}
</style>
<style>
.record-order .el-table__body{
    border: 1px solid #333;
}
.record-order .el-table__body td{
    border: 1px solid #333;
}
.record-order .item-value {  border-bottom: 1px solid #333; padding: 0 20px;}
.record-order th, .record-order td {
    padding: 5px 10px;
}
</style>
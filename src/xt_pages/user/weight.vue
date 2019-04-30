<template>
  <div class="patient-container">
    <patient-sidebar :id="patientID" defaultActive="2-3"></patient-sidebar>
    <div class="patient-app-container app-container ">
      <table-title title="干体重调整记录"></table-title>
        <div class="sum" :inline="true" >
            <span>当前时间 : <el-input  style="width:180px" v-model="current_date" disabled></el-input></span>
            <span class="weight">干体重 : <el-input  v-model="current_weight" style="width:180px;" disabled></el-input></span>
            <el-button class="Adjust" type="primary" icon="el-icon-refresh" size="medium" @click="dialogFormVisible = true">调整</el-button>
        </div> 
      <el-table
      :data="weightList"
      border
      style="width: 100%">
        <el-table-column
          prop="date"
          label="日期"
          align="center"
          min-width="120">
          <template slot-scope="scope">
            <span >{{scope.row.created_time | parseTime('{y}-{m}-{d}')}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="Adjust"
          label="调整值"
          align="center"
          min-width="120">
          <template slot-scope="scope">
            <span >{{calculateAdjustedValue(scope.row.adjusted_value)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="weight"
          align="center"
          min-width="120"
          label="干体重">
        </el-table-column>
        <el-table-column
          prop="doctor"
          align="center"
          min-width="180"
          label="医生">
        </el-table-column>
        <el-table-column
          prop="remark"
          align="center"    
          min-width="180"
          label="备注">
        </el-table-column>
      </el-table>


    </div>


  <el-dialog title="调整干体重  " :visible.sync="dialogFormVisible" width="30%"   > 
    <el-form :model="weight_adjust" ref="weight_adjust" :rules="rules">
      <el-form-item label="干体重 :" :label-width="formLabelWidth" prop="weight" >
        <el-input v-model="weight_adjust.weight" auto-complete="off" style="width:200px;"></el-input>
      </el-form-item>
      <el-form-item label="医生 : " :label-width="formLabelWidth" prop="doctor">
        <el-select v-model="weight_adjust.doctor" placeholder="请选择医生"  >
          <el-option v-for="item in doctorOptions" :label="item.name" :value="item.id" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注 : " :label-width="formLabelWidth" >
        <el-input
          type="textarea"
          :rows="2"
          style="width:280px;"
          placeholder="请输入内容"
          v-model="weight_adjust.remark">
        </el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitDryWeight('weight_adjust')">确 定</el-button>      
      <el-button @click="dialogFormVisible = false">取 消</el-button>
    </div>
  </el-dialog>
  
  </div> 
</template>

<script>
import tableTitle from './components/tableTitle';
import PatientSidebar from './components/PatientSidebar';
import { fetchAllDoctorAndNurse } from "@/api/doctor";
import {isPositiveNumber, uParseTime} from "@/utils/tools";
import {createDryWeight,getDryWeights} from "@/api/patient";

export default {
    name:'weight',
    data(){
        var checkWeight = (rule, value, callback)=>{
          if (!isPositiveNumber(value)) {
            return callback(new Error('干体重请填写大于0的数字（eg:70.5）'));
          }
          if(value.indexOf('.')>-1) {
            var t = value.split('.');
            if (t[1].length>2) {
              return callback(new Error('干体重小数位请保留不大于两位'));
            } 
          }
          if (value.length>10) {
            return callback(new Error('干体重太大了,长度不能超过10位'));
          }
          callback();
        };
        return{
          total:0,
          patientID:0,
          dialogFormVisible: false,
          formLabelWidth: '80px',
          current_date:"",
          current_weight:"",
          weight_adjust:{
            weight:'',
            remark:'',
            doctor:''
          },
          doctorOptions:null,
          weightList: null,
          rules:{
            weight:[
              { required: true, message: "请填写干体重", trigger: "blur" },
              { validator: checkWeight, trigger: "blur" },
            ],
            doctor:[{ required: true, message: "请选择医生", trigger: "blur" }],
          },
          listQuery: {
            page: 0,
            limit: 0,
            id:0,
          },
        }
    },
    methods:{
      calculateAdjustedValue(value){
        if (value>0){
          return value + '(上调)';
        }else if (value<0) {
          return Math.abs(value) + '(下调)';
        }
        return value;
      },
      submitDryWeight(formName){
        this.$refs[formName].validate(valid=>{
          if(valid) {
            createDryWeight(this.patientID, this.weight_adjust).then(response=>{
              if (response.data.state == 0) {
                this.$message.error(response.data.msg);
                return false;
              }else{
                this.$notify({
                  title: "成功",
                  message: "新增成功",
                  type: "success",
                  duration: 2000
                });
                this.weightList.unshift(response.data.data.weight);
                if (this.weightList.length>10) {
                  this.weightList.pop();
                }
                this.$refs[formName].resetFields();
                this.dialogFormVisible = false;
                this.current_date = uParseTime(response.data.data.weight.created_time, '{y}-{m}-{d}');
                this.current_weight = response.data.data.weight.weight;
                this.total +=1;
              }
            });
          }
        });
      },
      fetchAllDoctorAndNurse() {
        fetchAllDoctorAndNurse().then(response => {
          if (response.data.state == 1) {
            this.doctorOptions = response.data.data.doctors;
          }
        });
      },
      fetchAllWeights() {
        getDryWeights(this.listQuery).then(response => {
          if (response.data.state == 1) {
            this.weightList = response.data.data.weights;
            this.total = response.data.data.total;
            if (this.weightList.length>0) {
              this.current_date = uParseTime(this.weightList[0].created_time, '{y}-{m}-{d}');
              this.current_weight = this.weightList[0].weight;
            }
          }
        });
      },
    },
    components:{
        tableTitle,
        PatientSidebar
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
      this.listQuery.id = this.patientID;
      this.fetchAllDoctorAndNurse();
      this.fetchAllWeights();
    },
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
    .weight,
    .Adjust{
        margin: 0 0 0 4px;
    } 
}

</style>


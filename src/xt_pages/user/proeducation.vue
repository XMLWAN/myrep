<template>
    <div class="patient-container">
        <patient-sidebar :id="patientID" defaultActive="2-5" v-on:tran-patient="onTranPatient"></patient-sidebar>
        <div class="patient-app-container advice-container app-container">
            <div class="cell">
                <label class="title"><span class="name">日期查询</span> : </label>
                <el-date-picker v-model="listQuery.start_time"  prefix-icon="el-icon-date" @change="changeTime" :editable="false" style="width: 196px;" type="date" placeholder="选择日期时间" align="right" format="yyyy-MM-dd" value-format="yyyy-MM-dd" > </el-date-picker>
                <span class="">-</span>
                <el-date-picker v-model="listQuery.end_time"  prefix-icon="el-icon-date" @change="changeTime" :editable="false" style="width: 196px;" type="date" placeholder="选择日期时间" align="right"  format="yyyy-MM-dd" value-format="yyyy-MM-dd"> </el-date-picker>       
            </div>  
            <el-table ref="multipleTable" :data="edusTableData" border fit highlight-current-row  style="width: 100%;margin-top: 10px;" >
                <el-table-column type="index"  label="序号" width="60px" align="center"></el-table-column>
                <el-table-column  label="日期" width="200px" property="assessment_date" align="center">
                <template slot-scope="scope">
                    {{scope.row.assessment_date | parseTime("{y}-{m}-{d}")}}
                </template>
                </el-table-column>       
                <el-table-column  label="宣教" min-width="80"  property="mission" align="center"> </el-table-column>
            </el-table>
            
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="listQuery.page"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="10"
                background
                style="margin-top:20px;"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
        
    </div>
</template>
<script>

import PatientSidebar from './components/PatientSidebar';
import { fetchAllDoctorAndNurse,fetchAllAdminUsers } from "@/api/doctor";
import { getPatientProEducation } from "@/api/patient";
import {uParseTime} from "@/utils/tools";
import print from "print-js";

let rowIndex = 1;

export default {
    name:'proeducation',

    data(){
        return {
            total:0,
            orgname:'',
            edusTableData:[],
            currentPatient:{},
            patientID:0,
            listQuery:{
                start_time:"",
                end_time:"",
                page:1,
                limit:10,
                patient_id:0
            },
        }
    },
    methods:{
        onTranPatient:function (tranPatient) {
            this.currentPatient = tranPatient;
        },
        changeTime(){
            this.getList();
        },
        handleSizeChange(val) {
        this.listQuery.limit = val;
        this.getList();
        },
        handleCurrentChange(val) {
        this.listQuery.page = val;
        this.getList();
        },
        
        getList(){
            getPatientProEducation(this.listQuery).then(response=>{
                if (response.data.state == 1) {
                    this.edusTableData = response.data.data.edus;
                    this.total = response.data.data.total;
                }else {
                    this.edusTableData = [];
                }
            });
        },

    },
    components:{
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
        this.listQuery.patient_id = this.patientID;

        this.getList();
        
        var xtuser = this.$store.getters.xt_user;
        this.orgname = xtuser.org.org_name;
    }
}
</script>


<style rel="stylesheet/scss" lang="scss" scoped>
.advice-container{
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
          padding: 6px 10px;
          color: #606266;
          border-radius: 4px;
          margin: 0 4px 0 0;
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
  .el-dropdown-link {
      cursor: pointer;
  }
}

.advice-order .ls-title{
    text-align: center;
    font-weight: 600;
    font-size: 30px;
    line-height: 80px;
    margin-bottom: 20px;
}
.advice-order .ls-type{
    text-align: center;
    margin-bottom: 20px;
}
.advice-order .ls-name {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 30px 2em;
}
</style>
<style>
.advice-order .el-table__body{
    border: 1px solid #333;
}
.advice-order .el-table__body td{
    border: 1px solid #333;
}
.advice-order .item-value { flex: 1; border-bottom: 1px solid #333; }
.advice-order th, .advice-order td {
    padding: 5px 10px;
}
</style>


<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input style="width: 400px;" v-model="searchKey" class="filter-item"/>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
    </div>
    <div class="cell">
      <label class="title"><span class="name">日期查询</span> : </label>
      <el-date-picker v-model="time" prefix-icon="el-icon-date" @change="changeTime" :editable="false"
                      style="width: 196px;" type="date" placeholder="选择日期时间" align="right"
                      :picker-options="pickerOptions1"  format="yyyy-MM-dd"
                      value-format="timestamp"></el-date-picker>
    </div>
    <div class="cell clearfix">
      <label class="title"><span class="name">排班班次</span> : </label>
      <div class="time ">
        <ul class="">
          <li :class="item.value==schedulType?'active':''" @click='selectSchedulType(item.value)'
              v-for="item in schedulArr" :key="item.value">{{item.label}}
          </li>
        </ul>
      </div>
    </div>
    <div class="cell clearfix">
      <label class="title"><span class="name">分区</span> : </label>
      <div class="time ">
        <ul class="">
          <li :class="item.id==partitionType?'active':''" @click='selectPartitionType(item.id)'
              v-for="item in partitionArr" :key="item.id">{{item.name}}
          </li>
        </ul>
      </div>
    </div>

    <el-table
      ref="multipleTable" :data="SchedualPatientsTableData" border fit highlight-current-row style="width: 100%;margin-top: 10px;"
      @selection-change="handleSelectionChange">

      <el-table-column property="number"  label="机号" width="60px" align="center"></el-table-column>
      <el-table-column  label="透析号" min-width="80" property="dialysis_no" align="center"></el-table-column>
      <el-table-column property="name" label="姓名" min-width="80" align="center">
        <template slot-scope="scope">
          <router-link :to="'/dialysis/record/'+scope.row.patient_id" style="color:#409eff">{{scope.row.name}}</router-link>
        </template>
      </el-table-column>
      <el-table-column label="性别" min-width="80" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.gender==1">男</span>
          <span v-else-if="scope.row.gender==2">女</span>
          <span v-else>未知</span>
        </template>
      </el-table-column>

      <el-table-column label="来源" min-width="80" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.source==1">住院</span>
          <span v-else-if="scope.row.source==2">门诊</span>
          <span v-else>未知</span>
        </template>
      </el-table-column>

    </el-table>

    <!--@current-change="handleCurrentChange"-->
    <el-pagination
      :current-page="listQuery.pate"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="10"
      background
      style="margin-top:20px;"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

    <!-- 病人 -->

    <!-- <div class="PatientArea">
       <div class="list clearfix">
         <h3 class="title">A区</h3>
         <patient-box></patient-box>
       </div>
       <div class="list clearfix">
         <h3 class="title">B区</h3>
         <patient-box></patient-box>
       </div>
       <div class="list clearfix">
         <h3 class="title">C区</h3>
         <patient-box></patient-box>
       </div>


    </div> -->


  </div>

</template>


<script>
  // import pagiNation from '@/components/pagimg/pagiNation'
  import PatientBox from './PatientBox';
  import {
    getSchedualPatient,
    GetAllZone,
  } from "@/api/dialysis"


  export default {
    name: "Patient",
    data() {
      return {
        time : '',
        checkAll: false,
        isIndeterminate: true,
        wechatbindimg: "",
        SchedualPatientsTableData: [],
        active: true,
        schedulType: 0,
        schedulArr: [
          {value: 0, label: "全部"},
          {value: 1, label: "上午"},
          {value: 2, label: "下午"},
          {value: 3, label: "晚上"}
        ],

        partitionType: 0,
        sourceType: 0,
        sourceID: 0,
        lapsetoType: 0,
        sourceArr: [
          {value: 0, label: "全部", source: 0, lapseto: 0},
          {value: 1, label: "门诊", source: 0, lapseto: 0},
          {value: 2, label: "住院", source: 0, lapseto: 0}
        ],

        tableData: null,
        pickerOptions1: {
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
            {
              text: "清空",
              onClick(picker) {
                picker.$emit("pick");
              }
            }
          ]
        },
        searchKey: "",
        total: 0,
        pageTotal: 0,
        pageSelect: 0,
        listQuery: {
          page: 1,
          limit: 10,
          schedul_type: 0,
          partition_type: 0,
          schedul_time: "",
          keywords: "",
        },
        multipleSelection: [],
        partitionArr: [],
      };
    },
    created() {
      var date = new Date()
      this.time = date
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var day = date.getDate()
      if (month < 10) {
        month = "0" + month
      }
      if (day < 10) {
        day = "0" + day
      }
      var nowDate = year + "-" + month + "-" + day
      var date = new Date(nowDate + " 00:00:00")
      this.listQuery.schedul_time = date.getTime()
      this.getAllZone()
      this.getSchedualPatientList();
    },
    methods: {

      handleSelectionChange(val) {
        this.multipleSelection = val;
        this.pageSelect = this.multipleSelection.length;
      },

      selectSchedulType(scheduleType) {
        // alert(scheduleType);/
        this.schedulType = scheduleType;
        this.listQuery.schedul_type = scheduleType;
        this.getSchedualPatientList();
      },
      selectPartitionType(partitionType) {
        this.partitionType = partitionType;
        this.listQuery.partition_type = partitionType;
        this.getSchedualPatientList();
      },

      changeTime() {
        console.log(this.time)
        this.listQuery.schedul_time = this.time;
        this.getSchedualPatientList();
      },
      search() {
        this.listQuery.keywords = this.searchKey;
        this.getSchedualPatientList();
      },
      changeOtherSearch() {
        this.getList();
      }, getAllZone: function () {
        GetAllZone().then(response => {
          if (response.data.state == 0) {
            this.$message.error(response.data.msg);
            return false;
          } else {
            this.partitionArr = response.data.data.zone
            this.partitionArr.unshift({"id": 0, "name": '全部'})
          }
        });
      }, getSchedualPatientList: function () {
        this.SchedualPatientsTableData = []
        getSchedualPatient(this.listQuery).then(response => {
          if (response.data.state == 0) {
            this.$message.error(response.data.msg);
            return false;
          } else {
            for (let i = 0; i < response.data.data.schedule.length; i++) {
              if(response.data.data.schedule[i].SchedualPatient.id > 0) {
                let SchedualPatientsTable = {}
                SchedualPatientsTable['dialysis_no'] = response.data.data.schedule[i].SchedualPatient.dialysis_no
                SchedualPatientsTable['name'] = response.data.data.schedule[i].SchedualPatient.name
                SchedualPatientsTable['number'] = response.data.data.schedule[i].DeviceNumber.number
                SchedualPatientsTable['gender'] = response.data.data.schedule[i].SchedualPatient.gender
                SchedualPatientsTable['source'] = response.data.data.schedule[i].SchedualPatient.source
                SchedualPatientsTable['patient_id'] = response.data.data.schedule[i].patient_id
                this.SchedualPatientsTableData.unshift(SchedualPatientsTable)
              }
            }
          }
        });

        this.total = this.SchedualPatientsTableData.length

      }

      //  components:{
      //    pagiNation
      //  }
    },
    components:{
      PatientBox
    }
    
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
            margin: 0 10px 0 0;
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
</style>

